import type { Queryable } from "@/lib/db/types";

// A fixed-window counter in the private database (table rate_limits). The key is already a keyed hash
// (see src/lib/contact/keys.ts), never a raw address. Returns true when this attempt is over the limit.
export type Limit = { max: number; windowMs: number };

export async function overLimit(
  db: Queryable,
  key: string,
  limit: Limit,
  now: number,
): Promise<boolean> {
  const bucket = Math.floor(now / limit.windowMs);
  const { rows } = await db.query<{ count: number }>(
    `insert into rate_limits (key, bucket, expires_at) values ($1, $2, $3)
     on conflict (key, bucket) do update set count = rate_limits.count + 1
     returning count`,
    [key, bucket, (bucket + 1) * limit.windowMs],
  );
  return rows[0].count > limit.max;
}
