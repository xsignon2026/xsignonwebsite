import { randomUUID } from "node:crypto";
import type { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import {
  deliveryHealth,
  LEASE_MS,
  listDeliveries,
  MAX_ATTEMPTS,
  processDeliveries,
  replayDelivery,
  STALE_AFTER_MS,
} from "../lib/contact/deliver";
import { handleContact } from "../lib/contact/handler";
import type { Db } from "../lib/db/types";
import { getMailConfig, type MailConfig } from "../lib/mail/config";
import { MailError, type Mail, type Mailer } from "../lib/mail/types";
import { createTestDb } from "./helpers/pglite-db";

let db: Db;
let pg: PGlite;
beforeAll(async () => {
  ({ db, pg } = await createTestDb());
}, 60_000);
afterAll(async () => pg.close());
beforeEach(async () => {
  await pg.exec("truncate enquiries, deliveries, rate_limits restart identity cascade");
});

// A minute ahead of the real clock, so deliveries created just now are already due at T0.
const T0 = Date.now() + 60_000;
let ip = 0;

// A mailer we control: records every send, and can be made to fail.
function fakeMailer(behaviour: (mail: Mail, call: number) => void = () => {}) {
  const sent: Mail[] = [];
  const mailer: Mailer = {
    send: async (mail) => {
      sent.push(mail);
      behaviour(mail, sent.length);
    },
  };
  return { mailer, sent };
}

function config(mailer: Mailer, production = true): MailConfig {
  return getMailConfig(
    {
      RESEND_API_KEY: "k",
      EMAIL_FROM: "hello@mail.example.com",
      ENQUIRY_INBOX: "team@example.com",
      NEXT_PUBLIC_SITE_ENV: production ? "production" : "staging",
    },
    mailer,
  )!;
}

async function submit(email = "ada@example.com") {
  const result = await handleContact(
    {
      name: "Ada Lovelace",
      email,
      reason: "strategy-call",
      message: "We would like to see a demo of PostureOne.",
      submissionKey: randomUUID(),
      elapsedMs: 20_000,
      hp_check: "",
    },
    { db, now: () => T0, hashSecret: "x".repeat(40), clientIp: `10.1.0.${++ip}` },
  );
  expect(result.status).toBe(200);
}

const statuses = async () =>
  (
    await pg.query<{
      kind: string;
      status: string;
      attempts: number;
      last_error_code: string | null;
    }>(`select kind, status, attempts, last_error_code from deliveries order by kind`)
  ).rows;

describe("sending", () => {
  it("sends the team email and the thank-you, and marks both sent", async () => {
    await submit();
    const { mailer, sent } = fakeMailer();
    const outcome = await processDeliveries({ db, config: config(mailer), now: () => T0 });
    expect(outcome).toEqual({ sent: 2, retried: 0, failed: 0 });
    expect(sent.map((m) => m.to).sort()).toEqual(["ada@example.com", "team@example.com"]);
    expect((await statuses()).map((s) => s.status)).toEqual(["sent", "sent"]);
  });

  it("does not send again what is already sent", async () => {
    await submit();
    const { mailer, sent } = fakeMailer();
    await processDeliveries({ db, config: config(mailer), now: () => T0 });
    await processDeliveries({ db, config: config(mailer), now: () => T0 + 10 * 60_000 });
    expect(sent).toHaveLength(2);
  });

  it("sends the same delivery key every time, so the provider can ignore a repeat", async () => {
    await submit();
    const failOnce = fakeMailer((mail, call) => {
      if (call === 1) throw new MailError("http_503", true);
    });
    await processDeliveries({ db, config: config(failOnce.mailer), now: () => T0 });
    await processDeliveries({ db, config: config(failOnce.mailer), now: () => T0 + 3 * 60_000 });
    const keys = failOnce.sent
      .filter((m) => m.to === "team@example.com")
      .map((m) => m.idempotencyKey);
    expect(keys).toHaveLength(2); // sent twice: it failed once
    expect(keys[0]).toBe(keys[1]); // under one key
  });

  it("on staging, sends only to the test inbox and never emails the visitor", async () => {
    await submit();
    const { mailer, sent } = fakeMailer();
    await processDeliveries({ db, config: config(mailer, false), now: () => T0 });
    expect(sent.map((m) => m.to)).toEqual(["team@example.com"]);
    expect(sent[0].subject.startsWith("[staging]")).toBe(true);
    const rows = await statuses();
    expect(rows.find((r) => r.kind === "confirm")).toMatchObject({
      status: "sent",
      last_error_code: "skipped_not_production",
    });
  });
});

describe("when sending fails", () => {
  it("keeps the enquiry pending, waits longer each time, and records only a short code", async () => {
    await submit();
    const down = fakeMailer(() => {
      throw new MailError("http_503", true);
    });
    const cfg = config(down.mailer);

    await processDeliveries({ db, config: cfg, now: () => T0 });
    let notify = (await statuses()).find((s) => s.kind === "notify")!;
    expect(notify).toMatchObject({ status: "pending", attempts: 1, last_error_code: "http_503" });

    // Too early: nothing is tried.
    const early = await processDeliveries({ db, config: cfg, now: () => T0 + 60_000 });
    expect(early).toEqual({ sent: 0, retried: 0, failed: 0 });

    // After the wait it tries again, and waits even longer.
    const first = (
      await pg.query<{ w: string }>(
        `select extract(epoch from next_attempt_at) * 1000 as w from deliveries where kind = 'notify'`,
      )
    ).rows[0];
    await processDeliveries({ db, config: cfg, now: () => Number(first.w) + 1 });
    notify = (await statuses()).find((s) => s.kind === "notify")!;
    expect(notify.attempts).toBe(2);
    const second = (
      await pg.query<{ w: string }>(
        `select extract(epoch from next_attempt_at) * 1000 as w from deliveries where kind = 'notify'`,
      )
    ).rows[0];
    expect(Number(second.w) - Number(first.w)).toBeGreaterThan(Number(first.w) - T0);
  });

  it("marks a permanent error failed straight away and reports it once", async () => {
    await submit();
    const rejected = fakeMailer(() => {
      throw new MailError("http_422", false);
    });
    const onPermanentFailure = vi.fn();
    const outcome = await processDeliveries({
      db,
      config: config(rejected.mailer),
      now: () => T0,
      onPermanentFailure,
    });
    expect(outcome.failed).toBe(2);
    expect((await statuses()).map((s) => s.status)).toEqual(["failed", "failed"]);
    expect(onPermanentFailure).toHaveBeenCalledTimes(1); // the team email only, with a code
    expect(onPermanentFailure).toHaveBeenCalledWith("http_422");
  });

  it("gives up after the maximum number of attempts", async () => {
    await submit();
    const down = fakeMailer(() => {
      throw new MailError("http_500", true);
    });
    const onPermanentFailure = vi.fn();
    let now = T0;
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      await processDeliveries({
        db,
        config: config(down.mailer),
        now: () => now,
        onPermanentFailure,
      });
      now += 2 * 60 * 60_000; // far past any wait
    }
    expect((await statuses()).map((s) => s.status)).toEqual(["failed", "failed"]);
    expect(onPermanentFailure).toHaveBeenCalledTimes(1);
  });

  it("treats an unexpected error as retryable and records the code 'unknown', not its text", async () => {
    await submit();
    const odd = fakeMailer(() => {
      throw new Error("secret details with ada@example.com");
    });
    await processDeliveries({ db, config: config(odd.mailer), now: () => T0 });
    const stored = JSON.stringify(await statuses());
    expect(stored).toContain("unknown");
    expect(stored).not.toContain("secret details");
    expect(stored).not.toContain("ada@example.com");
  });
});

describe("crashes and two workers", () => {
  it("never lets two workers send the same delivery", async () => {
    await submit();
    const { mailer, sent } = fakeMailer();
    await Promise.all([
      processDeliveries({ db, config: config(mailer), now: () => T0 }),
      processDeliveries({ db, config: config(mailer), now: () => T0 }),
    ]);
    expect(sent).toHaveLength(2); // one team email, one thank-you
  });

  it("picks a delivery up again if the worker died after claiming it, once the lease runs out", async () => {
    await submit();
    // A worker claims the deliveries and dies before sending.
    await pg.query(
      `update deliveries set attempts = attempts + 1, next_attempt_at = to_timestamp($1::double precision / 1000)`,
      [T0 + LEASE_MS],
    );
    const { mailer, sent } = fakeMailer();
    expect(
      (await processDeliveries({ db, config: config(mailer), now: () => T0 + 1000 })).sent,
    ).toBe(0);
    expect(
      (await processDeliveries({ db, config: config(mailer), now: () => T0 + LEASE_MS + 1 })).sent,
    ).toBe(2);
    expect(sent).toHaveLength(2);
  });
});

describe("the independent alarm", () => {
  it("is healthy with nothing waiting, and while a delivery is still fresh", async () => {
    expect(await deliveryHealth(db, Date.now())).toEqual({ ok: true, stale: 0, failed: 0 });
    await submit();
    expect((await deliveryHealth(db, Date.now())).ok).toBe(true);
  });

  it("goes unhealthy when a team email has been waiting too long, with no worker involved", async () => {
    await submit();
    const later = Date.now() + STALE_AFTER_MS + 60_000;
    expect(await deliveryHealth(db, later)).toMatchObject({ ok: false, stale: 1 });
  });

  it("goes unhealthy when a team email has failed, and ignores a failed thank-you", async () => {
    await submit();
    await pg.query(`update deliveries set status = 'failed' where kind = 'confirm'`);
    expect((await deliveryHealth(db, Date.now())).ok).toBe(true);
    await pg.query(`update deliveries set status = 'failed' where kind = 'notify'`);
    expect(await deliveryHealth(db, Date.now())).toMatchObject({ ok: false, failed: 1 });
  });

  it("is healthy again once the owner replays it and it is sent", async () => {
    await submit();
    const rejected = fakeMailer(() => {
      throw new MailError("http_422", false);
    });
    await processDeliveries({ db, config: config(rejected.mailer), now: () => T0 });
    expect((await deliveryHealth(db, Date.now())).ok).toBe(false);

    const failed = (await listDeliveries(db)).find(
      (d) => d.kind === "notify" && d.status === "failed",
    )!;
    expect(await replayDelivery(db, failed.id)).toBe(true);
    const working = fakeMailer();
    await processDeliveries({ db, config: config(working.mailer), now: () => Date.now() + 1000 });
    expect((await deliveryHealth(db, Date.now())).ok).toBe(true);
    expect(working.sent.some((m) => m.to === "team@example.com")).toBe(true);
  });
});

describe("the owner's list and replay", () => {
  it("lists what is waiting and what failed, and replays only failed deliveries", async () => {
    await submit();
    const items = await listDeliveries(db);
    expect(items).toHaveLength(2);
    expect(JSON.stringify(items)).not.toContain("ada@example.com"); // no personal data in the list
    expect(await replayDelivery(db, items[0].id)).toBe(false); // pending, not failed
    expect(await replayDelivery(db, "999999")).toBe(false);
  });
});
