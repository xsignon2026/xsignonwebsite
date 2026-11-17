import "server-only";
import { Pool } from "pg";
import type { Db, Queryable } from "./types";

// T-055: the private Postgres (D1, Neon). DATABASE_URL is server-only and should be the pooled
// connection string with sslmode=require. Returns null when it is not configured, so a route can
// answer "unavailable" instead of crashing.
let db: Db | null = null;

type Runner = { query(text: string, params?: unknown[]): Promise<{ rows: unknown[] }> };

function queryable(runner: Runner): Queryable {
  return {
    query: async <T>(text: string, params?: unknown[]) => ({
      rows: (await runner.query(text, params)).rows as T[],
    }),
  };
}

export function getDb(): Db | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  // In production the connection must be encrypted and the certificate checked.
  if (
    process.env.NODE_ENV === "production" &&
    !/sslmode=(require|verify-full|verify-ca)/.test(url)
  ) {
    console.error("DATABASE_URL must include sslmode=require in production.");
    return null;
  }
  if (!db) {
    const pool = new Pool({
      connectionString: url,
      max: 3, // serverless: a few connections per instance
      connectionTimeoutMillis: 5000,
      statement_timeout: 5000,
      idleTimeoutMillis: 10000,
    });
    // An idle connection dropping must not crash the process. The next query opens a new one.
    pool.on("error", () => {});
    db = {
      ...queryable(pool),
      transaction: async (fn) => {
        const client = await pool.connect();
        try {
          await client.query("begin");
          const result = await fn(queryable(client));
          await client.query("commit");
          return result;
        } catch (error) {
          await client.query("rollback").catch(() => {});
          throw error;
        } finally {
          client.release();
        }
      },
    };
  }
  return db;
}
