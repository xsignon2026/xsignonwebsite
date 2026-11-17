import { randomUUID } from "node:crypto";
import type { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { Db } from "../lib/db/types";
import { createTestDb } from "./helpers/pglite-db";

// The route is tested end to end with a real Postgres behind it: the request checks (origin, type,
// size), the configuration checks, then a real save.
let db: Db | null = null;
let pg: PGlite;

vi.mock("next/server", async (original) => ({
  ...(await original<typeof import("next/server")>()),
  connection: async () => {},
}));
vi.mock("@sentry/nextjs", () => ({ captureMessage: vi.fn() }));
vi.mock("@/lib/db", () => ({ getDb: () => db }));

const SECRET = "s".repeat(40);
let testDb: Db;

beforeAll(async () => {
  const created = await createTestDb();
  testDb = created.db;
  pg = created.pg;
}, 60_000);
afterAll(async () => pg.close());
beforeEach(async () => {
  await pg.exec("truncate enquiries, deliveries, rate_limits restart identity cascade");
  db = testDb;
  process.env.ENQUIRY_HASH_SECRET = SECRET;
});

function valid(overrides: Record<string, unknown> = {}) {
  return {
    name: "Ada Lovelace",
    email: "ada@example.com",
    reason: "strategy-call",
    message: "We would like to see a demo of PostureOne.",
    submissionKey: randomUUID(),
    elapsedMs: 20_000,
    website: "",
    ...overrides,
  };
}

function request(
  body: string | object,
  headers: Record<string, string> = {},
): import("next/server").NextRequest {
  const text = typeof body === "string" ? body : JSON.stringify(body);
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    body: text,
    headers: {
      host: "localhost:3000",
      origin: "http://localhost:3000",
      "content-type": "application/json",
      ...headers,
    },
  }) as never;
}

async function post(req: import("next/server").NextRequest) {
  const { POST } = await import("../app/api/contact/route");
  return POST(req);
}

describe("POST /api/contact", () => {
  it("saves a valid enquiry and says so, without letting anything cache the answer", async () => {
    const res = await post(request(valid()));
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(await res.json()).toEqual({ ok: true });
    const rows = (await pg.query(`select 1 from enquiries`)).rows;
    expect(rows).toHaveLength(1);
  });

  it("refuses a request from another site (403) and a request that is not JSON (415)", async () => {
    const other = await post(request(valid(), { origin: "https://evil.example" }));
    expect(other.status).toBe(403);
    const form = await post(
      request("name=x", { "content-type": "application/x-www-form-urlencoded" }),
    );
    expect(form.status).toBe(415);
    expect((await pg.query(`select 1 from enquiries`)).rows).toHaveLength(0);
  });

  it("treats a malformed Origin as another site (403), never a crash", async () => {
    for (const origin of [
      "null",
      "x",
      "//evil.example",
      "http://",
      "https://localhost:3000.evil.example",
    ]) {
      expect((await post(request(valid(), { origin }))).status, origin).toBe(403);
    }
    expect((await pg.query(`select 1 from enquiries`)).rows).toHaveLength(0);
  });

  it("refuses an oversized body (413) and a body that is not JSON (400)", async () => {
    const big = await post(request(valid({ message: "x".repeat(20_000) })));
    expect(big.status).toBe(413);
    const broken = await post(request("{not json"));
    expect(broken.status).toBe(400);
  });

  it("returns the field errors for bad input and saves nothing", async () => {
    const res = await post(request(valid({ email: "nope" })));
    expect(res.status).toBe(400);
    const body = (await res.json()) as { errors: Record<string, string> };
    expect(body.errors.email).toBeTruthy();
    expect(JSON.stringify(body)).not.toContain("Ada Lovelace"); // submitted values are not echoed back
    expect((await pg.query(`select 1 from enquiries`)).rows).toHaveLength(0);
  });

  it("answers 429 with a Retry-After header when a sender sends too many", async () => {
    const headers = { "x-forwarded-for": "203.0.113.200" };
    let last = 200;
    for (let i = 0; i < 6; i++) {
      const res = await post(request(valid({ email: `r${i}@example.com` }), headers));
      last = res.status;
      if (res.status === 429) expect(res.headers.get("retry-after")).toBeTruthy();
    }
    expect(last).toBe(429);
  });

  it("counts different senders separately, using the first address in x-forwarded-for", async () => {
    for (let i = 0; i < 6; i++) {
      const res = await post(
        request(valid({ email: `s${i}@example.com` }), {
          "x-forwarded-for": `198.51.100.${i}, 10.0.0.1`,
        }),
      );
      expect(res.status).toBe(200);
    }
  });

  it("is unavailable, never a false success, when it is not configured", async () => {
    delete process.env.ENQUIRY_HASH_SECRET;
    expect((await post(request(valid()))).status).toBe(503);
    process.env.ENQUIRY_HASH_SECRET = "too short";
    expect((await post(request(valid()))).status).toBe(503);
    process.env.ENQUIRY_HASH_SECRET = SECRET;
    db = null;
    expect((await post(request(valid()))).status).toBe(503);
  });
});
