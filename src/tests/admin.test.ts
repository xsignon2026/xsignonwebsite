import type { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { ADMIN_FAILURE_LIMIT, checkAdmin } from "../lib/admin-auth";
import { renderAdminPage } from "../lib/contact/admin-page";
import type { Db } from "../lib/db/types";
import { createTestDb } from "./helpers/pglite-db";

let db: Db;
let pg: PGlite;
let current: Db | null = null;

vi.mock("next/server", async (original) => ({
  ...(await original<typeof import("next/server")>()),
  connection: async () => {},
  after: () => {},
}));
vi.mock("@sentry/nextjs", () => ({ captureMessage: vi.fn() }));
vi.mock("@/lib/db", () => ({ getDb: () => current }));

beforeAll(async () => {
  ({ db, pg } = await createTestDb());
}, 60_000);
afterAll(async () => pg.close());
beforeEach(async () => {
  await pg.exec("truncate enquiries, deliveries, rate_limits restart identity cascade");
  current = db;
  process.env.ENQUIRY_HASH_SECRET = "h".repeat(40);
  process.env.ADMIN_USER = "owner";
  process.env.ADMIN_PASSWORD = "a-long-password-1234";
});

const basic = (user: string, password: string) =>
  `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;
const base = { clientIp: "203.0.113.5", now: 1_700_000_000_000, hashSecret: "h".repeat(40) };

describe("checkAdmin", () => {
  it("is switched off when the credentials are missing or the password is too short", async () => {
    const authorization = basic("owner", "a-long-password-1234");
    expect(await checkAdmin({ ...base, db, authorization, env: {} })).toMatchObject({
      status: 503,
    });
    expect(
      await checkAdmin({
        ...base,
        db,
        authorization,
        env: { ADMIN_USER: "owner", ADMIN_PASSWORD: "short" },
      }),
    ).toMatchObject({ status: 503 });
  });

  it("asks for a sign-in when there is none, and refuses wrong ones", async () => {
    const none = await checkAdmin({ ...base, db, authorization: null });
    expect(none).toMatchObject({ ok: false, status: 401 });
    expect(none.ok === false && none.headers["WWW-Authenticate"]).toContain("Basic");
    for (const authorization of [
      basic("owner", "wrong-password-0000"),
      basic("someone", "a-long-password-1234"),
      "Basic !!!not-base64",
      "Bearer a-long-password-1234",
    ]) {
      expect(await checkAdmin({ ...base, db, authorization }), authorization).toMatchObject({
        status: 401,
      });
    }
  });

  it("lets the owner in", async () => {
    expect(
      await checkAdmin({ ...base, db, authorization: basic("owner", "a-long-password-1234") }),
    ).toEqual({
      ok: true,
    });
  });

  it("locks a sender out after too many wrong guesses, even for the right password", async () => {
    for (let i = 0; i < ADMIN_FAILURE_LIMIT.max; i++) {
      await checkAdmin({ ...base, db, authorization: basic("owner", `wrong-guess-${i}-0000`) });
    }
    const right = await checkAdmin({
      ...base,
      db,
      authorization: basic("owner", "a-long-password-1234"),
    });
    expect(right).toMatchObject({ ok: false, status: 429 });
    // Another sender is not affected, and the lock ends with the window.
    expect(
      await checkAdmin({
        ...base,
        clientIp: "198.51.100.8",
        db,
        authorization: basic("owner", "a-long-password-1234"),
      }),
    ).toEqual({ ok: true });
    expect(
      await checkAdmin({
        ...base,
        now: base.now + ADMIN_FAILURE_LIMIT.windowMs,
        db,
        authorization: basic("owner", "a-long-password-1234"),
      }),
    ).toEqual({ ok: true });
  });
});

describe("the owner's page", () => {
  const item = (over: Record<string, unknown> = {}) => ({
    id: "7",
    enquiry_id: "3",
    kind: "notify",
    status: "failed",
    attempts: 8,
    last_error_code: "http_422",
    created_at: new Date("2026-11-05T10:00:00Z"),
    sent_at: null,
    ...over,
  });

  it("offers Send again for failed deliveries only, and says how many failed", () => {
    const html = renderAdminPage([item(), item({ id: "8", status: "sent", sent_at: new Date() })]);
    expect(html.match(/<button type="submit">Send again/g)).toHaveLength(1);
    expect(html).toContain("1 team email has failed");
    expect(html).toContain('<meta name="robots" content="noindex, nofollow">');
  });

  it("escapes every value, so stored text cannot become markup", () => {
    const html = renderAdminPage(
      [item({ last_error_code: '<script>alert(1)</script>"x' })],
      "<b>note</b>",
    );
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<b>note</b>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("has no column for names, emails or messages", () => {
    const html = renderAdminPage([item()]);
    for (const word of ["Name", "Message", "mailto"]) expect(html).not.toContain(word);
  });
});

describe("the owner's routes", () => {
  const url = "http://localhost:3000/admin/enquiries";
  const headers = (extra: Record<string, string> = {}) => ({
    host: "localhost:3000",
    authorization: basic("owner", "a-long-password-1234"),
    ...extra,
  });

  async function addFailed() {
    await pg.query(
      `insert into enquiries (submission_key, name, email, reason, message)
       values (gen_random_uuid(), 'A', 'a@example.com', 'strategy-call', 'A message long enough.')`,
    );
    await pg.query(
      `insert into deliveries (enquiry_id, kind, status, attempts) values (1, 'notify', 'failed', 8)`,
    );
  }

  it("refuses everyone who is not signed in, and has no cache or index", async () => {
    const { GET } = await import("../app/admin/enquiries/route");
    const res = await GET(new Request(url, { headers: { host: "localhost:3000" } }));
    expect(res.status).toBe(401);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(res.headers.get("x-robots-tag")).toContain("noindex");
    expect(await res.text()).not.toContain("<table");
  });

  it("shows the page to the signed-in owner, as HTML that is never cached", async () => {
    await addFailed();
    const { GET } = await import("../app/admin/enquiries/route");
    const res = await GET(new Request(url, { headers: headers() }));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/html");
    expect(await res.text()).toContain("Send again");
  });

  it("is unavailable when the database is not configured", async () => {
    current = null;
    const { GET } = await import("../app/admin/enquiries/route");
    expect((await GET(new Request(url, { headers: headers() }))).status).toBe(503);
  });

  it("re-queues a failed delivery for a signed-in owner acting from this site", async () => {
    await addFailed();
    const { POST } = await import("../app/admin/enquiries/replay/route");
    const res = await POST(
      new Request(`${url}/replay`, {
        method: "POST",
        headers: headers({
          origin: "http://localhost:3000",
          "content-type": "application/x-www-form-urlencoded",
        }),
        body: "id=1",
      }),
    );
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toContain("/admin/enquiries?done=1");
    const row = (
      await pg.query<{ status: string; attempts: number }>(
        `select status, attempts from deliveries`,
      )
    ).rows[0];
    expect(row).toEqual({ status: "pending", attempts: 0 });
  });

  it("refuses the action from another site or without an Origin (cross-site forgery)", async () => {
    await addFailed();
    const { POST } = await import("../app/admin/enquiries/replay/route");
    for (const origin of [undefined, "https://evil.example", "null"]) {
      const res = await POST(
        new Request(`${url}/replay`, {
          method: "POST",
          headers: headers({
            ...(origin ? { origin } : {}),
            "content-type": "application/x-www-form-urlencoded",
          }),
          body: "id=1",
        }),
      );
      expect(res.status, String(origin)).toBe(403);
    }
    expect((await pg.query(`select 1 from deliveries where status = 'failed'`)).rows).toHaveLength(
      1,
    );
  });

  it("refuses the action when not signed in, and a bad id", async () => {
    const { POST } = await import("../app/admin/enquiries/replay/route");
    const form = {
      "content-type": "application/x-www-form-urlencoded",
      origin: "http://localhost:3000",
    };
    const anonymous = await POST(
      new Request(`${url}/replay`, {
        method: "POST",
        headers: { host: "localhost:3000", ...form },
        body: "id=1",
      }),
    );
    expect(anonymous.status).toBe(401);
    const bad = await POST(
      new Request(`${url}/replay`, {
        method: "POST",
        headers: headers(form),
        body: "id=1%3B+drop+table",
      }),
    );
    expect(bad.status).toBe(400);
  });
});
