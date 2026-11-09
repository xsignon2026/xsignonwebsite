import type { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { purgeExpired } from "../lib/contact/retention";
import type { Db } from "../lib/db/types";
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

const KEY = "11111111-1111-4111-8111-111111111111";
const KEY2 = "22222222-2222-4222-8222-222222222222";

async function addEnquiry(key: string, createdAt: string) {
  const { rows } = await pg.query<{ id: string }>(
    `insert into enquiries (submission_key, name, email, reason, message, created_at)
     values ($1, 'A', 'a@example.com', 'strategy-call', 'A message long enough.', $2) returning id`,
    [key, createdAt],
  );
  await pg.query(`insert into deliveries (enquiry_id) values ($1)`, [rows[0].id]);
}

describe("purgeExpired", () => {
  it("deletes enquiries older than 12 months with their delivery records, and keeps newer ones", async () => {
    await addEnquiry(KEY, "2000-01-01T00:00:00Z");
    await addEnquiry(KEY2, new Date().toISOString());
    const result = await purgeExpired(db, Date.now());
    expect(result.enquiries).toBe(1);
    expect((await pg.query(`select 1 from enquiries`)).rows).toHaveLength(1);
    expect((await pg.query(`select 1 from deliveries`)).rows).toHaveLength(1);
  });

  it("deletes counters whose window is over, and keeps those still in force", async () => {
    const now = 1_700_000_000_000;
    await pg.query(
      `insert into rate_limits (key, bucket, expires_at) values ('old', 1, $1), ('live', 2, $2)`,
      [now - 1, now + 60_000],
    );
    const result = await purgeExpired(db, now);
    expect(result.counters).toBe(1);
    const left = (await pg.query<{ key: string }>(`select key from rate_limits`)).rows;
    expect(left).toEqual([{ key: "live" }]);
  });
});
