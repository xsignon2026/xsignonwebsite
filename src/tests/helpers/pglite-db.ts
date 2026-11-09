import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PGlite } from "@electric-sql/pglite";
import type { Db } from "../../lib/db/types";

// A real Postgres running inside the test process, with the real migrations applied. The handler
// is tested against it, so the SQL, the constraints and the transactions are exercised for real.
export async function createTestDb(): Promise<{ db: Db; pg: PGlite }> {
  const pg = new PGlite();
  const dir = join(process.cwd(), "db", "migrations");
  for (const file of readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort()) {
    await pg.exec(readFileSync(join(dir, file), "utf8"));
  }
  const db: Db = {
    query: async (text, params) => ({ rows: (await pg.query(text, params)).rows as never[] }),
    transaction: (fn) =>
      pg.transaction((tx) =>
        fn({
          query: async (text, params) => ({ rows: (await tx.query(text, params)).rows as never[] }),
        }),
      ),
  };
  return { db, pg };
}
