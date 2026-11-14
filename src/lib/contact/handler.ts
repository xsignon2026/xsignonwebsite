import { z } from "zod";
import type { Db, Queryable } from "@/lib/db/types";
import { emailLimitKey, limitKey, senderGroup } from "./keys";
import { validateContact, type ContactErrors } from "./schema";

// T-055: what happens to a contact form submission, in order. Kept free of Next.js so it can be tested
// against a real Postgres. The route (src/app/api/contact/route.ts) only adapts the request.
//
//   1. Bots: a filled-in hidden field, or a form completed faster than a person can, is dropped and
//      answered with the same success a real visitor gets, so the bot learns nothing.
//   2. The fields are checked on the server (the browser check is only a convenience).
//   3. A retry of an enquiry already saved is answered with success and saves nothing new.
//   4. Rate limits, counted in the same transaction as the save: per sender, per email address
//      (variants such as a+1@gmail.com count together), and one site-wide cap. If the save fails, the
//      counts roll back with it, so an outage does not use up anyone's allowance.
//   5. The enquiry and its delivery record are saved in ONE transaction. The visitor sees success only
//      after that commits. If the database is unavailable the visitor is told so, never shown a false success.
//
// Nothing here logs or reports submitted text.

export const MIN_FILL_MS = 1500; // a person cannot read and fill four fields faster than this
export const RATE_LIMITS = {
  ip: { max: 5, windowMs: 10 * 60_000 },
  email: { max: 3, windowMs: 60 * 60_000 },
  // Site-wide: a flood from many senders still cannot fill the database or the inbox. When it trips
  // for real traffic, raise it, or switch on the spam widget (docs/build-plan.md, D2).
  global: { max: 60, windowMs: 60 * 60_000 },
} as const;

type Limit = { max: number; windowMs: number };

const envelope = z.object({
  submissionKey: z.uuid(),
  elapsedMs: z.number().finite(),
  // The hidden trap field. Its name is deliberately not one that browsers autofill (email, phone, url).
  hp_check: z.string().optional(),
});

export type ContactResult =
  | { status: 200; body: { ok: true } }
  | { status: 400; body: { ok: false; errors: ContactErrors } }
  | { status: 429; body: { ok: false; error: "rate_limited" }; retryAfterSeconds: number }
  | { status: 503; body: { ok: false; error: "unavailable" } };

export type ContactDeps = {
  db: Db;
  now: () => number;
  /** Secret for hashing sender addresses and email addresses in the rate-limit table. */
  hashSecret: string;
  clientIp: string;
  /** Called with a short code (never submitted text) when saving fails, so it can be reported. */
  onSaveError?: (code: string) => void;
};

const OK: ContactResult = { status: 200, body: { ok: true } };

// Counts one attempt and says whether the sender is over the limit.
async function overLimit(db: Queryable, key: string, limit: Limit, now: number): Promise<boolean> {
  const bucket = Math.floor(now / limit.windowMs);
  const { rows } = await db.query<{ count: number }>(
    `insert into rate_limits (key, bucket, expires_at) values ($1, $2, $3)
     on conflict (key, bucket) do update set count = rate_limits.count + 1
     returning count`,
    [key, bucket, (bucket + 1) * limit.windowMs],
  );
  return rows[0].count > limit.max;
}

export async function handleContact(body: unknown, deps: ContactDeps): Promise<ContactResult> {
  const { db, now, hashSecret, clientIp } = deps;

  const meta = envelope.safeParse(body);
  if (!meta.success) return { status: 400, body: { ok: false, errors: {} } };

  // 1. Bots.
  if (meta.data.hp_check) return OK;
  if (meta.data.elapsedMs < MIN_FILL_MS) return OK;

  // 2. Fields.
  const fields = validateContact(body);
  if (!fields.ok) return { status: 400, body: { ok: false, errors: fields.errors } };
  const data = fields.data;

  try {
    // 3. A retry of something already saved.
    const existing = await db.query(`select 1 from enquiries where submission_key = $1`, [
      meta.data.submissionKey,
    ]);
    if (existing.rows.length > 0) return OK;

    // 4 and 5. Limits and save, together.
    const outcome = await db.transaction(async (tx) => {
      const t = now();
      const checks: [string, Limit][] = [
        [limitKey(hashSecret, "ip", senderGroup(clientIp)), RATE_LIMITS.ip],
        [limitKey(hashSecret, "email", emailLimitKey(data.email)), RATE_LIMITS.email],
        ["global:all", RATE_LIMITS.global],
      ];
      for (const [key, limit] of checks) {
        if (await overLimit(tx, key, limit, t)) return { limited: limit };
      }

      const saved = await tx.query<{ id: string }>(
        `insert into enquiries (submission_key, name, email, company, phone, reason, message)
         values ($1, $2, $3, $4, $5, $6, $7)
         on conflict (submission_key) do nothing
         returning id`,
        [
          meta.data.submissionKey,
          data.name,
          data.email,
          data.company ?? null,
          data.phone ?? null,
          data.reason,
          data.message,
        ],
      );
      // No row back means a parallel request with the same key saved it first: nothing more to do.
      if (saved.rows.length > 0) {
        // The team email and the visitor's thank-you, saved with the enquiry (T-056, T-057).
        await tx.query(
          `insert into deliveries (enquiry_id, kind) values ($1, 'notify'), ($1, 'confirm')`,
          [saved.rows[0].id],
        );
      }
      return { limited: null };
    });

    if (outcome.limited) {
      return {
        status: 429,
        body: { ok: false, error: "rate_limited" },
        // The wait that matches the limit that tripped (10 minutes for a sender, an hour for the others).
        retryAfterSeconds: Math.ceil(outcome.limited.windowMs / 1000),
      };
    }
    return OK;
  } catch (error) {
    // The error code only (for example 08006). Messages can contain submitted values.
    const code =
      typeof error === "object" && error && "code" in error ? String(error.code) : "unknown";
    deps.onSaveError?.(code);
    return { status: 503, body: { ok: false, error: "unavailable" } };
  }
}
