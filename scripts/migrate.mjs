// Applies the SQL files in db/migrations to the private database, once each, in name order.
// Usage: DATABASE_URL=... npm run db:migrate
// Safe to run again: files already applied are skipped. Each file runs in its own transaction.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const client = new pg.Client({ connectionString: url });
await client.connect();
try {
  await client.query(
    "create table if not exists schema_migrations (name text primary key, applied_at timestamptz not null default now())",
  );
  const done = new Set(
    (await client.query("select name from schema_migrations")).rows.map((r) => r.name),
  );
  const dir = join(process.cwd(), "db", "migrations");
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  for (const file of files) {
    if (done.has(file)) continue;
    console.log(`Applying ${file}`);
    await client.query("begin");
    try {
      await client.query(readFileSync(join(dir, file), "utf8"));
      await client.query("insert into schema_migrations (name) values ($1)", [file]);
      await client.query("commit");
    } catch (error) {
      await client.query("rollback");
      throw error;
    }
  }
  console.log("Database is up to date.");
} finally {
  await client.end();
}
