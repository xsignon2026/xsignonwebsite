import type { Db } from "@/lib/db/types";

// T-055, D11: housekeeping for the private database. Meant to run on a schedule (the T-056 job):
//   - enquiries older than 12 months are deleted (their delivery records go with them),
//   - rate-limit counters whose window is over are deleted, so the table cannot grow forever.
export const RETENTION_MONTHS = 12;

export async function purgeExpired(
  db: Db,
  now: number,
): Promise<{ enquiries: number; counters: number }> {
  const enquiries = await db.query<{ id: string }>(
    `delete from enquiries where created_at < now() - make_interval(months => $1) returning id`,
    [RETENTION_MONTHS],
  );
  const counters = await db.query<{ key: string }>(
    `delete from rate_limits where expires_at < $1 returning key`,
    [now],
  );
  return { enquiries: enquiries.rows.length, counters: counters.rows.length };
}
