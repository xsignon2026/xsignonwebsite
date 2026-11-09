import { createHmac } from "node:crypto";
import type { PGlite } from "@electric-sql/pglite";
import { NextRequest } from "next/server";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { Db } from "../lib/db/types";
import { createTestDb } from "./helpers/pglite-db";

// The public sign-up routes, end to end, with a real Postgres behind them.
let db: Db | null = null;
let pg: PGlite;

vi.mock("next/server", async (original) => ({
  ...(await original<typeof import("next/server")>()),
  connection: async () => {},
  after: () => {},
}));
vi.mock("@sentry/nextjs", () => ({ captureMessage: vi.fn() }));
vi.mock("@/lib/db", () => ({ getDb: () => db }));

const { POST: subscribe } = await import("@/app/api/subscribe/route");
const { POST: verify } = await import("@/app/api/subscribe/verify/route");
const { POST: unsubscribe } = await import("@/app/api/unsubscribe/route");
const { GET: oneClickGet } = await import("@/app/api/unsubscribe/one-click/route");
const { POST: webhook } = await import("@/app/api/webhooks/email/route");
const { requestVerification } = await import("@/lib/subscriptions/core");
const { generateUnsubscribeToken } = await import("@/lib/newsletter/tokens");

const HASH_SECRET = "h".repeat(40);
let testDb: Db;

beforeAll(async () => {
  const created = await createTestDb();
  testDb = created.db;
  pg = created.pg;
}, 60_000);
afterAll(async () => pg.close());
beforeEach(async () => {
  await pg.exec(
    "truncate verifications, subscribers, suppressions, download_log, rate_limits restart identity cascade",
  );
  db = testDb;
  process.env.ENQUIRY_HASH_SECRET = HASH_SECRET;
  delete process.env.RESEND_API_KEY; // no email goes out in these tests
});

const json = (url: string, body: unknown, headers: Record<string, string> = {}) =>
  new NextRequest(`http://localhost${url}`, {
    method: "POST",
    headers: { "content-type": "application/json", host: "localhost", ...headers },
    body: JSON.stringify(body),
  });

const count = async (table: string) =>
  Number((await testDb.query<{ n: string }>(`select count(*) as n from ${table}`)).rows[0].n);

const good = { email: "Ada@Example.com", consent: true, purpose: "newsletter", sourcePage: "/x" };

describe("POST /api/subscribe", () => {
  it("saves a pending confirmation (nothing is a subscriber yet)", async () => {
    const res = await subscribe(json("/api/subscribe", good));
    expect(res.status).toBe(200);
    expect(await count("verifications")).toBe(1);
    expect(await count("subscribers")).toBe(0);
    const { rows } = await testDb.query<{ email: string }>(`select email from verifications`);
    expect(rows[0].email).toBe("ada@example.com");
  });

  it("refuses without the consent tick, and with a bad address", async () => {
    expect((await subscribe(json("/api/subscribe", { ...good, consent: false }))).status).toBe(400);
    expect((await subscribe(json("/api/subscribe", { ...good, email: "nope" }))).status).toBe(400);
    expect(await count("verifications")).toBe(0);
  });

  it("gives the same answer for a new address and a blocked one", async () => {
    await testDb.query(`insert into suppressions (email, reason) values ('ada@example.com', 'x')`);
    const blocked = await subscribe(json("/api/subscribe", good));
    const fresh = await subscribe(json("/api/subscribe", { ...good, email: "new@example.com" }));
    expect(await blocked.json()).toEqual(await fresh.json());
    expect(await count("verifications")).toBe(1);
  });

  it("silently ignores bots (trap field filled)", async () => {
    const res = await subscribe(json("/api/subscribe", { ...good, hp_company: "spam" }));
    expect(res.status).toBe(200);
    expect(await count("verifications")).toBe(0);
  });

  it("checks origin, content type and unknown fields", async () => {
    expect(
      (await subscribe(json("/api/subscribe", good, { origin: "https://evil.example" }))).status,
    ).toBe(403);
    const form = new NextRequest("http://localhost/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", host: "localhost" },
      body: "email=a@example.com",
    });
    expect((await subscribe(form)).status).toBe(415);
  });

  it("limits one address to 3 requests an hour", async () => {
    const statuses = [];
    for (let i = 0; i < 5; i++) {
      statuses.push((await subscribe(json("/api/subscribe", good))).status);
    }
    expect(statuses).toEqual([200, 200, 200, 429, 429]);
  });

  it("is unavailable, not silent, when the database is not set up", async () => {
    db = null;
    expect((await subscribe(json("/api/subscribe", good))).status).toBe(503);
  });
});

describe("POST /api/subscribe/verify", () => {
  const confirm = (token: string) => verify(json("/api/subscribe/verify", { token }));

  it("confirms once, and a second use never gives a second download link", async () => {
    const token = (await requestVerification(testDb, {
      email: "a@example.com",
      purpose: "whitepaper_download",
      targetSlug: "zero-trust-posture-guide",
      wordingVersion: "v1",
    }))!;
    const first = await confirm(token);
    const body = await first.json();
    expect(first.status).toBe(200);
    expect(body.downloadUrl).toMatch(/^\/api\/white-papers\/download\?/);

    const second = await confirm(token);
    expect(second.status).toBe(409);
    expect((await second.json()).downloadUrl).toBeUndefined();
  });

  it("rejects a malformed or unknown token", async () => {
    expect((await confirm("short")).status).toBe(400);
    expect((await confirm("x".repeat(43))).status).toBe(400);
  });

  it("only accepts POST (a link scanner that fetches the page cannot use it up)", async () => {
    const { GET } = (await import("@/app/api/subscribe/verify/route")) as { GET?: unknown };
    expect(GET).toBeUndefined();
  });
});

describe("unsubscribing", () => {
  beforeEach(async () => {
    await testDb.query(
      `insert into subscribers (email, consented_at, wording_version) values ('a@example.com', now(), 'v1')`,
    );
  });
  const active = async () =>
    Number(
      (
        await testDb.query<{ n: string }>(
          `select count(*) as n from subscribers where unsubscribed_at is null`,
        )
      ).rows[0].n,
    );

  it("a typed address alone removes nobody", async () => {
    const res = await unsubscribe(json("/api/unsubscribe", { email: "a@example.com" }));
    expect(res.status).toBe(200);
    expect(await active()).toBe(1);
  });

  it("the token from our email removes that address, and only that one", async () => {
    const token = generateUnsubscribeToken("a@example.com");
    expect(
      (await unsubscribe(json("/api/unsubscribe", { email: "b@example.com", token }))).status,
    ).toBe(400);
    expect(await active()).toBe(1);
    expect(
      (await unsubscribe(json("/api/unsubscribe", { email: "a@example.com", token }))).status,
    ).toBe(200);
    expect(await active()).toBe(0);
  });

  it("opening the link in a browser (GET) changes nothing", async () => {
    const token = generateUnsubscribeToken("a@example.com");
    const res = await oneClickGet(
      new NextRequest(
        `http://localhost/api/unsubscribe/one-click?email=a%40example.com&token=${token}`,
      ),
    );
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/unsubscribe?");
    expect(await active()).toBe(1);
  });
});

describe("POST /api/webhooks/email", () => {
  const secretBytes = Buffer.from("0123456789abcdef0123456789abcdef");
  const secret = `whsec_${secretBytes.toString("base64")}`;
  const send = (payload: object, tamper = false) => {
    const body = JSON.stringify(payload);
    const ts = String(Math.floor(Date.now() / 1000));
    const sig = createHmac("sha256", secretBytes).update(`m1.${ts}.${body}`).digest("base64");
    return webhook(
      new NextRequest("http://localhost/api/webhooks/email", {
        method: "POST",
        headers: {
          "svix-id": "m1",
          "svix-timestamp": ts,
          "svix-signature": `v1,${tamper ? "AAAA" : sig}`,
        },
        body,
      }),
    );
  };
  beforeEach(() => {
    process.env.RESEND_WEBHOOK_SECRET = secret;
  });

  it("a bounce blocks the address and cancels waiting confirmations", async () => {
    await requestVerification(testDb, {
      email: "a@example.com",
      purpose: "newsletter",
      wordingVersion: "v1",
    });
    const res = await send({ type: "email.bounced", data: { to: ["Ada <A@Example.com>"] } });
    expect(res.status).toBe(200);
    expect(await count("suppressions")).toBe(1);
    const { rows } = await testDb.query<{ status: string }>(`select status from verifications`);
    expect(rows[0].status).toBe("bounced");
  });

  it("rejects a bad signature and changes nothing", async () => {
    const res = await send({ type: "email.bounced", data: { to: ["a@example.com"] } }, true);
    expect(res.status).toBe(401);
    expect(await count("suppressions")).toBe(0);
  });

  it("ignores events that are not bounces", async () => {
    await send({ type: "email.delivered", data: { to: ["a@example.com"] } });
    expect(await count("suppressions")).toBe(0);
  });
});
