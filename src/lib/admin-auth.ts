import { limitKey, senderGroup } from "@/lib/contact/keys";
import type { Db } from "@/lib/db/types";
import { safeEqual } from "@/lib/safe-equal";

// T-056: access to the owner's delivery page (/admin/enquiries). It shows no personal data (only
// delivery numbers, states and error codes) and its one action re-queues a failed email, so
// protection is HTTP Basic authentication over HTTPS with a long password, a lock-out after too many
// wrong guesses, and a same-site check on the action. If the credentials are not configured the page
// does not exist.

export const ADMIN_FAILURE_LIMIT = { max: 10, windowMs: 10 * 60_000 } as const;
const MIN_PASSWORD_LENGTH = 16;

export type AdminCheck =
  { ok: true } | { ok: false; status: 401 | 429 | 503; headers: Record<string, string> };

function parseBasic(header: string | null): { user: string; password: string } | null {
  if (!header?.startsWith("Basic ")) return null;
  const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  const split = decoded.indexOf(":");
  return split < 0 ? null : { user: decoded.slice(0, split), password: decoded.slice(split + 1) };
}

export async function checkAdmin(options: {
  authorization: string | null;
  clientIp: string;
  db: Db;
  now: number;
  env?: Record<string, string | undefined>;
  hashSecret: string;
}): Promise<AdminCheck> {
  const { env = process.env, db } = options;
  const user = env.ADMIN_USER;
  const password = env.ADMIN_PASSWORD;
  // Not configured, or a password too short to trust: the page is switched off.
  if (!user || !password || password.length < MIN_PASSWORD_LENGTH) {
    return { ok: false, status: 503, headers: {} };
  }

  const challenge = { "WWW-Authenticate": 'Basic realm="XSignOn enquiries", charset="UTF-8"' };
  const given = parseBasic(options.authorization);
  if (!given) return { ok: false, status: 401, headers: challenge };

  // A sender who has already guessed wrong too many times is locked out BEFORE anything is compared:
  // even the right password is refused until the window ends, so guessing cannot succeed by luck late.
  const bucket = Math.floor(options.now / ADMIN_FAILURE_LIMIT.windowMs);
  const key = limitKey(options.hashSecret, "admin", senderGroup(options.clientIp));
  const locked = {
    ok: false,
    status: 429,
    headers: { "Retry-After": String(ADMIN_FAILURE_LIMIT.windowMs / 1000) },
  } as const;
  const current = await db.query<{ count: number }>(
    `select count from rate_limits where key = $1 and bucket = $2`,
    [key, bucket],
  );
  if ((current.rows[0]?.count ?? 0) >= ADMIN_FAILURE_LIMIT.max) return locked;

  // Both comparisons always run, so timing does not reveal which one was wrong.
  const userOk = safeEqual(given.user, user);
  const passwordOk = safeEqual(given.password, password);
  if (userOk && passwordOk) return { ok: true };

  // A wrong guess counts against the sender.
  await db.query(
    `insert into rate_limits (key, bucket, expires_at) values ($1, $2, $3)
     on conflict (key, bucket) do update set count = rate_limits.count + 1`,
    [key, bucket, (bucket + 1) * ADMIN_FAILURE_LIMIT.windowMs],
  );
  return { ok: false, status: 401, headers: challenge };
}
