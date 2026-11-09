import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The production database wrapper is checked with a stand-in for node-postgres, so a missing
// begin, commit or rollback cannot go unnoticed (every other test uses the in-process Postgres).
const calls: string[] = [];

vi.mock("server-only", () => ({}));
vi.mock("pg", () => {
  class Pool {
    on() {}
    async query(text: string) {
      calls.push(`pool:${text}`);
      return { rows: [] };
    }
    async connect() {
      return {
        query: async (text: string) => {
          calls.push(text);
          return { rows: [] };
        },
        release: () => calls.push("release"),
      };
    }
  }
  return { Pool };
});

async function load() {
  vi.resetModules();
  return (await import("../lib/db")).getDb;
}

describe("getDb", () => {
  beforeEach(() => {
    calls.length = 0;
  });
  afterEach(() => vi.unstubAllEnvs());

  it("is null without a DATABASE_URL", async () => {
    vi.stubEnv("DATABASE_URL", "");
    expect((await load())()).toBeNull();
  });

  it("refuses an unencrypted connection string in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DATABASE_URL", "postgres://u:p@host/db");
    expect((await load())()).toBeNull();
    vi.stubEnv("DATABASE_URL", "postgres://u:p@host/db?sslmode=require");
    expect((await load())()).not.toBeNull();
  });

  it("commits a transaction that succeeds and always releases the connection", async () => {
    vi.stubEnv("DATABASE_URL", "postgres://u:p@host/db");
    const db = (await load())()!;
    await db.transaction(async (tx) => {
      await tx.query("select 1");
    });
    expect(calls).toEqual(["begin", "select 1", "commit", "release"]);
  });

  it("rolls back, does not commit, and still releases when something inside fails", async () => {
    vi.stubEnv("DATABASE_URL", "postgres://u:p@host/db");
    const db = (await load())()!;
    await expect(
      db.transaction(async () => {
        throw new Error("boom");
      }),
    ).rejects.toThrow("boom");
    expect(calls).toEqual(["begin", "rollback", "release"]);
  });
});
