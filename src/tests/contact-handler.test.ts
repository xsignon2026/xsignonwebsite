import { randomUUID } from "node:crypto";
import type { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { handleContact, MIN_FILL_MS, RATE_LIMITS, type ContactDeps } from "../lib/contact/handler";
import type { Db } from "../lib/db/types";
import { createTestDb } from "./helpers/pglite-db";

// The handler runs against a real Postgres (in-process) with the real migrations.
let db: Db;
let pg: PGlite;

beforeAll(async () => {
  ({ db, pg } = await createTestDb());
}, 60_000);
afterAll(async () => pg.close());
beforeEach(async () => {
  await pg.exec("truncate enquiries, deliveries, rate_limits restart identity cascade");
});

const SECRET = "x".repeat(40);
let ip = 0;

function body(overrides: Record<string, unknown> = {}) {
  return {
    name: "Ada Lovelace",
    email: "ada@example.com",
    company: "Analytical Engines",
    phone: "+1 555 010 0100",
    reason: "strategy-call",
    message: "We would like to see a demo of PostureOne.",
    submissionKey: randomUUID(),
    elapsedMs: 20_000,
    hp_check: "",
    ...overrides,
  };
}

function deps(overrides: Partial<ContactDeps> = {}): ContactDeps {
  return {
    db,
    now: () => 1_700_000_000_000,
    hashSecret: SECRET,
    clientIp: `10.0.0.${++ip}`,
    ...overrides,
  };
}

const count = async (table: string) =>
  Number((await pg.query<{ n: string }>(`select count(*) as n from ${table}`)).rows[0].n);

describe("a valid enquiry", () => {
  it("is saved with its two pending deliveries (team email and thank-you), and the visitor sees success", async () => {
    const result = await handleContact(body(), deps());
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(await count("enquiries")).toBe(1);
    const deliveries = (
      await pg.query<{ kind: string; status: string; attempts: number; delivery_key: string }>(
        `select * from deliveries`,
      )
    ).rows;
    expect(deliveries.map((d) => d.kind).sort()).toEqual(["confirm", "notify"]);
    for (const d of deliveries) {
      expect(d).toMatchObject({ status: "pending", attempts: 0 });
      expect(d.delivery_key).toMatch(/^[0-9a-f-]{36}$/);
    }
    expect(new Set(deliveries.map((d) => d.delivery_key)).size).toBe(2);
  });

  it("stores the cleaned values, and treats blank optional fields as empty", async () => {
    await handleContact(body({ email: "  ADA@Example.COM ", company: "", phone: "" }), deps());
    const row = (await pg.query<Record<string, unknown>>(`select * from enquiries`)).rows[0];
    expect(row).toMatchObject({ email: "ada@example.com", company: null, phone: null });
  });
});

describe("retries and double clicks", () => {
  it("resolves a retry with the same key to the original enquiry", async () => {
    const payload = body();
    await handleContact(payload, deps());
    const again = await handleContact(payload, deps());
    expect(again.status).toBe(200);
    expect(await count("enquiries")).toBe(1);
    expect(await count("deliveries")).toBe(2);
  });

  it("creates one enquiry and one pair of deliveries when two identical requests arrive together", async () => {
    const payload = body();
    const [a, b] = await Promise.all([
      handleContact(payload, deps()),
      handleContact(payload, deps()),
    ]);
    expect([a.status, b.status]).toEqual([200, 200]);
    expect(await count("enquiries")).toBe(1);
    expect(await count("deliveries")).toBe(2);
  });
});

describe("checking the fields on the server", () => {
  it("rejects bad input with a message per field, and saves nothing", async () => {
    const result = await handleContact(
      body({ name: "", email: "nope", reason: "x", message: "short" }),
      deps(),
    );
    expect(result.status).toBe(400);
    if (result.status !== 400) return;
    expect(Object.keys(result.body.errors).sort()).toEqual(["email", "message", "name", "reason"]);
    expect(await count("enquiries")).toBe(0);
  });

  it("rejects line breaks in single-line fields, which stops email header injection", async () => {
    const name = await handleContact(body({ name: "Ada\r\nBcc: victim@example.com" }), deps());
    const email = await handleContact(
      body({ email: "ada@example.com\nBcc: victim@example.com" }),
      deps(),
    );
    const company = await handleContact(body({ company: "A B" }), deps());
    expect([name.status, email.status, company.status]).toEqual([400, 400, 400]);
    expect(await count("enquiries")).toBe(0);
  });

  it("stores a SQL-looking message as plain text and leaves the tables intact", async () => {
    const message = "Robert'); drop table enquiries; -- hello there";
    await handleContact(body({ message }), deps());
    const row = (await pg.query<{ message: string }>(`select message from enquiries`)).rows[0];
    expect(row.message).toBe(message);
  });

  it("rejects direction-changing and invisible characters in names", async () => {
    for (const name of [
      "Ada \u202eLovelace",
      "Ada\u0085Lovelace",
      "Ada\u200bLovelace",
      "Ada\ufeffLovelace",
    ]) {
      expect((await handleContact(body({ name }), deps())).status, name).toBe(400);
    }
    expect((await handleContact(body({ name: "Zo\u00eb Smith-Jones" }), deps())).status).toBe(200);
  });

  it("rejects a request without a submission key or timing, or with an over-long message", async () => {
    expect((await handleContact({ ...body(), submissionKey: "not-a-uuid" }, deps())).status).toBe(
      400,
    );
    expect((await handleContact({ ...body(), elapsedMs: undefined }, deps())).status).toBe(400);
    expect((await handleContact(null, deps())).status).toBe(400);
    expect((await handleContact(body({ message: "x".repeat(2001) }), deps())).status).toBe(400);
  });
});

describe("bots", () => {
  it("drops a submission with the hidden field filled, and answers as if it worked", async () => {
    const result = await handleContact(body({ hp_check: "http://spam.example" }), deps());
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(await count("enquiries")).toBe(0);
  });

  it("drops a form completed faster than a person could, and answers as if it worked", async () => {
    const result = await handleContact(body({ elapsedMs: MIN_FILL_MS - 1 }), deps());
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(await count("enquiries")).toBe(0);
  });
});

describe("rate limits", () => {
  it("allows a few enquiries from one address, then answers 429 with a wait time", async () => {
    const sameIp = deps({ clientIp: "203.0.113.9" });
    for (let i = 0; i < RATE_LIMITS.ip.max; i++) {
      expect((await handleContact(body({ email: `u${i}@example.com` }), sameIp)).status).toBe(200);
    }
    const blocked = await handleContact(body({ email: "late@example.com" }), sameIp);
    expect(blocked.status).toBe(429);
    if (blocked.status === 429) expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    expect(await count("enquiries")).toBe(RATE_LIMITS.ip.max);
  });

  it("limits one email address even when the sender address changes", async () => {
    for (let i = 0; i < RATE_LIMITS.email.max; i++) {
      expect((await handleContact(body({ email: "same@example.com" }), deps())).status).toBe(200);
    }
    expect((await handleContact(body({ email: "same@example.com" }), deps())).status).toBe(429);
  });

  it("starts counting again in the next window", async () => {
    const sameIp = { clientIp: "203.0.113.50" };
    const t0 = 1_700_000_000_000;
    for (let i = 0; i < RATE_LIMITS.ip.max; i++) {
      await handleContact(body({ email: `w${i}@example.com` }), deps({ ...sameIp, now: () => t0 }));
    }
    const later = deps({ ...sameIp, now: () => t0 + RATE_LIMITS.ip.windowMs });
    expect((await handleContact(body({ email: "next@example.com" }), later)).status).toBe(200);
  });

  it("counts a plus-address or dotted Gmail address as the same person", async () => {
    const variants = ["a.b@gmail.com", "ab+1@gmail.com", "A.B+news@googlemail.com"];
    for (const email of variants) {
      expect((await handleContact(body({ email }), deps())).status).toBe(200);
    }
    expect((await handleContact(body({ email: "a.b+4@gmail.com" }), deps())).status).toBe(429);
  });

  it("counts every address in one IPv6 block together", async () => {
    for (let i = 0; i < RATE_LIMITS.ip.max; i++) {
      const sender = deps({ clientIp: `2001:db8:1:2:${i}::${i + 1}` });
      expect((await handleContact(body({ email: `v6${i}@example.com` }), sender)).status).toBe(200);
    }
    const another = deps({ clientIp: "2001:db8:1:2:ffff::1" });
    expect((await handleContact(body({ email: "v6x@example.com" }), another)).status).toBe(429);
    // A different block is a different sender.
    const elsewhere = deps({ clientIp: "2001:db8:9:9::1" });
    expect((await handleContact(body({ email: "v6y@example.com" }), elsewhere)).status).toBe(200);
  });

  it("stops a flood from many senders with a site-wide cap", async () => {
    for (let i = 0; i < RATE_LIMITS.global.max; i++) {
      const result = await handleContact(body({ email: `flood${i}@example.com` }), deps());
      expect(result.status).toBe(200);
    }
    const next = await handleContact(body({ email: "flood-next@example.com" }), deps());
    expect(next.status).toBe(429);
    expect(await count("enquiries")).toBe(RATE_LIMITS.global.max);
  });

  it("tells the sender to wait as long as the limit that stopped them requires", async () => {
    const sameIp = deps({ clientIp: "203.0.113.31" });
    for (let i = 0; i < RATE_LIMITS.ip.max; i++) {
      await handleContact(body({ email: `ra${i}@example.com` }), sameIp);
    }
    const byIp = await handleContact(body({ email: "rb@example.com" }), sameIp);
    expect(byIp.status === 429 && byIp.retryAfterSeconds).toBe(RATE_LIMITS.ip.windowMs / 1000);

    for (let i = 0; i < RATE_LIMITS.email.max; i++) {
      await handleContact(body({ email: "wait@example.com" }), deps());
    }
    const byEmail = await handleContact(body({ email: "wait@example.com" }), deps());
    expect(byEmail.status === 429 && byEmail.retryAfterSeconds).toBe(
      RATE_LIMITS.email.windowMs / 1000,
    );
  });

  it("does not count a retry of an enquiry that is already saved", async () => {
    const sameIp = deps({ clientIp: "203.0.113.77" });
    const payload = body();
    await handleContact(payload, sameIp);
    for (let i = 0; i < 10; i++) expect((await handleContact(payload, sameIp)).status).toBe(200);
  });

  it("keeps neither the raw address nor the raw email in the database", async () => {
    await handleContact(
      body({ email: "private@example.com" }),
      deps({ clientIp: "198.51.100.23" }),
    );
    const keys = (await pg.query<{ key: string }>(`select key from rate_limits`)).rows
      .map((r) => r.key)
      .join(" ");
    expect(keys).not.toContain("198.51.100.23");
    expect(keys).not.toContain("private@example.com");
  });
});

describe("when saving fails", () => {
  // Wraps the real database and makes any statement containing `fragment` fail like a Postgres error.
  function failing(fragment: string): Db {
    const boom = (text: string) => {
      if (text.includes(fragment))
        throw Object.assign(new Error("secret message text"), { code: "57P01" });
    };
    return {
      query: async (text, params) => (boom(text), db.query(text, params)),
      transaction: (fn) =>
        db.transaction((tx) =>
          fn({ query: async (text, params) => (boom(text), tx.query(text, params)) }),
        ),
    };
  }

  it("rolls back the whole enquiry if the delivery record cannot be saved", async () => {
    const onSaveError = vi.fn();
    const result = await handleContact(
      body(),
      deps({ db: failing("insert into deliveries"), onSaveError }),
    );
    expect(result.status).toBe(503);
    expect(await count("enquiries")).toBe(0); // nothing half-saved
    expect(await count("deliveries")).toBe(0);
    expect(await count("rate_limits")).toBe(0); // the failed attempt used up nobody's allowance
    expect(onSaveError).toHaveBeenCalledWith("57P01");
  });

  it("never shows success when the database is unavailable, and reports only a code", async () => {
    const onSaveError = vi.fn();
    const result = await handleContact(
      body(),
      deps({ db: failing("select 1 from enquiries"), onSaveError }),
    );
    expect(result).toEqual({ status: 503, body: { ok: false, error: "unavailable" } });
    expect(JSON.stringify(onSaveError.mock.calls)).not.toContain("secret message text");
  });

  it("lets the same enquiry succeed once the database is back (same key)", async () => {
    const payload = body();
    expect(
      (await handleContact(payload, deps({ db: failing("insert into enquiries") }))).status,
    ).toBe(503);
    expect((await handleContact(payload, deps())).status).toBe(200);
    expect(await count("enquiries")).toBe(1);
  });
});
