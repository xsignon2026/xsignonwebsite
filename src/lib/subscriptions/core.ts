import { createHash, randomBytes } from "node:crypto";
import type { Db, Queryable } from "@/lib/db/types";

// T-063 to T-078: the rules for newsletter sign-ups and gated white-paper downloads, on the private
// database (tables in db/migrations/003_subscriptions.sql). Every function takes the database, so the
// same code runs in production (Postgres) and in tests (an in-process Postgres).

export const VERIFY_TTL_HOURS = 24;
export const LOG_RETENTION_DAYS = 90;
export const PENDING_RETENTION_DAYS = 7;

export type Purpose = "newsletter" | "whitepaper_download";

export const hashToken = (raw: string) => createHash("sha256").update(raw).digest("hex");

export function newToken(): { raw: string; hash: string } {
  const raw = randomBytes(32).toString("base64url");
  return { raw, hash: hashToken(raw) };
}

export type VerificationRequest = {
  email: string; // already lower-cased and validated by the caller
  purpose: Purpose;
  targetSlug?: string;
  sourcePage?: string;
  wordingVersion: string;
};

// Saves a pending confirmation and returns the raw token to put in the email. Returns null, saving
// nothing, when no email should go out: the address bounced or complained before, or (newsletter) it is
// already subscribed. The caller answers the visitor the same way in every case, so the response never
// reveals which addresses are known.
export async function requestVerification(
  db: Queryable,
  req: VerificationRequest,
): Promise<string | null> {
  const blocked = await db.query(`select 1 from suppressions where email = $1`, [req.email]);
  if (blocked.rows.length > 0) return null;
  if (req.purpose === "newsletter") {
    const active = await db.query(
      `select 1 from subscribers where email = $1 and unsubscribed_at is null`,
      [req.email],
    );
    if (active.rows.length > 0) return null;
  }
  const token = newToken();
  await db.query(
    `insert into verifications
       (token_hash, email, purpose, target_slug, source_page, wording_version, expires_at)
     values ($1, $2, $3, $4, $5, $6, now() + make_interval(hours => $7))`,
    [
      token.hash,
      req.email,
      req.purpose,
      req.targetSlug ?? null,
      req.sourcePage ?? null,
      req.wordingVersion,
      VERIFY_TTL_HOURS,
    ],
  );
  return token.raw;
}

export type ConfirmResult =
  | {
      status: "ok";
      purpose: Purpose;
      targetSlug: string | null;
      verificationId: string;
    }
  | { status: "invalid" | "expired" | "used" | "bounced" };

// Uses a token. It works exactly once: the first caller flips pending to verified in one statement, so
// two requests at the same moment cannot both win. A newsletter confirmation also records the
// subscriber in the same transaction.
export async function confirmVerification(
  db: Db,
  rawToken: string,
  ipHash: string,
): Promise<ConfirmResult> {
  const hash = hashToken(rawToken);
  return db.transaction(async (tx) => {
    const won = await tx.query<{
      id: string;
      email: string;
      purpose: Purpose;
      target_slug: string | null;
      source_page: string | null;
      wording_version: string;
    }>(
      `update verifications
          set status = 'verified', verified_at = now(), verified_ip_hash = $2
        where token_hash = $1 and status = 'pending' and expires_at > now()
        returning id, email, purpose, target_slug, source_page, wording_version`,
      [hash, ipHash],
    );
    const row = won.rows[0];
    if (row) {
      if (row.purpose === "newsletter") {
        await tx.query(
          `insert into subscribers (email, consented_at, source, wording_version)
           values ($1, now(), $2, $3)
           on conflict (email) do update
             set consented_at = now(), source = excluded.source,
                 wording_version = excluded.wording_version, unsubscribed_at = null`,
          [row.email, row.source_page, row.wording_version],
        );
      }
      return {
        status: "ok" as const,
        purpose: row.purpose,
        targetSlug: row.target_slug,
        verificationId: row.id,
      };
    }
    const found = await tx.query<{ status: string; expired: boolean }>(
      `select status, expires_at <= now() as expired from verifications where token_hash = $1`,
      [hash],
    );
    const old = found.rows[0];
    if (!old) return { status: "invalid" as const };
    if (old.status === "verified") return { status: "used" as const };
    if (old.status === "bounced") return { status: "bounced" as const };
    return { status: old.expired ? ("expired" as const) : ("invalid" as const) };
  });
}

// True when this confirmation allows a download of this paper (and the address has not since bounced).
export async function mayDownload(
  db: Queryable,
  verificationId: string,
  slug: string,
): Promise<boolean> {
  const { rows } = await db.query(
    `select 1 from verifications v
      where v.id = $1 and v.status = 'verified' and v.purpose = 'whitepaper_download'
        and v.target_slug = $2
        and not exists (select 1 from suppressions s where s.email = v.email)`,
    [verificationId, slug],
  );
  return rows.length > 0;
}

export async function logDownload(db: Queryable, verificationId: string, slug: string) {
  await db.query(`insert into download_log (verification_id, slug) values ($1, $2)`, [
    verificationId,
    slug,
  ]);
}

// Stops all marketing to an address. Safe to call twice, and for an address we never had.
export async function unsubscribe(db: Queryable, email: string) {
  await db.query(
    `update subscribers set unsubscribed_at = coalesce(unsubscribed_at, now()) where email = $1`,
    [email],
  );
}

// A bounce or a spam complaint: never send to this address again, and cancel anything waiting.
export async function suppress(db: Queryable, email: string, reason: string) {
  await db.query(
    `insert into suppressions (email, reason) values ($1, $2) on conflict (email) do nothing`,
    [email, reason.slice(0, 40)],
  );
  await db.query(
    `update verifications set status = 'bounced' where email = $1 and status = 'pending'`,
    [email],
  );
  await unsubscribe(db, email);
}

// Housekeeping, run on the schedule: unconfirmed requests are removed after 7 days, download records
// after 90 days.
export async function cleanup(db: Queryable) {
  const pending = await db.query(
    `delete from verifications
      where status <> 'verified' and created_at < now() - make_interval(days => $1) returning id`,
    [PENDING_RETENTION_DAYS],
  );
  const log = await db.query(
    `delete from download_log where downloaded_at < now() - make_interval(days => $1) returning id`,
    [LOG_RETENTION_DAYS],
  );
  return { unconfirmed: pending.rows.length, downloads: log.rows.length };
}
