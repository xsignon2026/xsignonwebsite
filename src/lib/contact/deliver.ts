import type { Db } from "@/lib/db/types";
import { composeConfirmation, composeNotification, type EnquiryRow } from "@/lib/mail/compose";
import type { MailConfig } from "@/lib/mail/config";
import { MailError } from "@/lib/mail/types";

// T-056: sends the emails an enquiry produced, and keeps trying until they arrive.
//
// How an enquiry cannot be lost: it is saved together with a pending delivery record (handler.ts).
// This worker claims pending records, sends them, and marks them sent. It can crash at any point:
//   - a claimed record is "leased" for a few minutes; if the worker dies, the lease runs out and the
//     record is claimed again,
//   - the provider is sent the delivery's own key, so a repeat of a send it already accepted is
//     ignored by the provider rather than emailed twice,
//   - failures are retried with a growing wait, up to MAX_ATTEMPTS, then marked failed.
// Two workers at once never claim the same record (FOR UPDATE SKIP LOCKED).
//
// Errors are stored as a short code only, never the text of a provider response.

export const MAX_ATTEMPTS = 8;
export const LEASE_MS = 5 * 60_000;
export const STALE_AFTER_MS = 15 * 60_000;
const backoffMs = (attempts: number) => Math.min(2 ** attempts, 60) * 60_000; // 2, 4, 8 ... 60 minutes

type Claimed = {
  id: string;
  enquiry_id: string;
  kind: "notify" | "confirm";
  attempts: number;
  delivery_key: string;
};
export type DeliveryOutcome = { sent: number; retried: number; failed: number };

async function markSent(db: Db, id: string, code: string | null) {
  await db.query(
    `update deliveries set status = 'sent', sent_at = now(), last_error_code = $2 where id = $1`,
    [id, code],
  );
}

async function markFailed(db: Db, id: string, code: string) {
  await db.query(`update deliveries set status = 'failed', last_error_code = $2 where id = $1`, [
    id,
    code,
  ]);
}

export async function processDeliveries(deps: {
  db: Db;
  config: MailConfig;
  now: () => number;
  limit?: number;
  /** Called with a short code when an enquiry's team email has failed for good. */
  onPermanentFailure?: (code: string) => void;
}): Promise<DeliveryOutcome> {
  const { db, config, now, limit = 10 } = deps;
  const t = now();
  const claimed = await db.query<Claimed>(
    `update deliveries
       set attempts = attempts + 1,
           next_attempt_at = to_timestamp($2::double precision / 1000)
     where id in (
       select id from deliveries
       where status = 'pending' and next_attempt_at <= to_timestamp($1::double precision / 1000)
       order by next_attempt_at, id
       limit $3
       for update skip locked
     )
     returning id, enquiry_id, kind, attempts, delivery_key`,
    [t, t + LEASE_MS, limit],
  );

  const outcome: DeliveryOutcome = { sent: 0, retried: 0, failed: 0 };
  for (const delivery of claimed.rows) {
    const { rows } = await db.query<EnquiryRow>(
      `select id, name, email, company, phone, reason, message, created_at from enquiries where id = $1`,
      [delivery.enquiry_id],
    );
    const enquiry = rows[0];
    if (!enquiry) {
      await markFailed(db, delivery.id, "enquiry_missing");
      outcome.failed++;
      continue;
    }
    // Staging and previews never email visitors (T-060).
    if (delivery.kind === "confirm" && !config.sendConfirmations) {
      await markSent(db, delivery.id, "skipped_not_production");
      continue;
    }

    const mail =
      delivery.kind === "notify"
        ? composeNotification(enquiry, config, delivery.delivery_key)
        : composeConfirmation(enquiry, config, delivery.delivery_key);
    try {
      await config.mailer.send(mail);
      await markSent(db, delivery.id, null);
      outcome.sent++;
    } catch (error) {
      const code = error instanceof MailError ? error.code : "unknown";
      const retryable = error instanceof MailError ? error.retryable : true;
      if (!retryable || delivery.attempts >= MAX_ATTEMPTS) {
        await markFailed(db, delivery.id, code);
        outcome.failed++;
        if (delivery.kind === "notify") deps.onPermanentFailure?.(code);
      } else {
        await db.query(
          `update deliveries set next_attempt_at = to_timestamp($2::double precision / 1000), last_error_code = $3
           where id = $1`,
          [delivery.id, now() + backoffMs(delivery.attempts), code],
        );
        outcome.retried++;
      }
    }
  }
  return outcome;
}

// The independent alarm (section 6 of the build plan). It does not depend on the worker running:
// it only looks at the database. An uptime monitor polls it (see /api/health/deliveries); when the
// team email of any enquiry has been waiting too long, or has failed, it reports unhealthy.
export async function deliveryHealth(
  db: Db,
  now: number,
): Promise<{ ok: boolean; stale: number; failed: number }> {
  const { rows } = await db.query<{ stale: string; failed: string }>(
    `select
       count(*) filter (where status = 'pending' and kind = 'notify'
                        and created_at < to_timestamp(($1::double precision - $2::double precision) / 1000)) as stale,
       count(*) filter (where status = 'failed' and kind = 'notify') as failed
     from deliveries`,
    [now, STALE_AFTER_MS],
  );
  const stale = Number(rows[0].stale);
  const failed = Number(rows[0].failed);
  return { ok: stale === 0 && failed === 0, stale, failed };
}

// For the owner's page: what is waiting, what failed, and what was sent in the last week.
export type DeliveryListItem = {
  id: string;
  enquiry_id: string;
  kind: string;
  status: string;
  attempts: number;
  last_error_code: string | null;
  created_at: Date | string;
  sent_at: Date | string | null;
};

export async function listDeliveries(db: Db): Promise<DeliveryListItem[]> {
  const { rows } = await db.query<DeliveryListItem>(
    `select id, enquiry_id, kind, status, attempts, last_error_code, created_at, sent_at
     from deliveries
     where status <> 'sent' or created_at > now() - interval '7 days'
     order by created_at desc, id desc
     limit 100`,
  );
  return rows;
}

// Puts a failed delivery back in the queue. The provider key is unchanged, so if the provider had in
// fact accepted the earlier attempt it will not email twice.
export async function replayDelivery(db: Db, id: string): Promise<boolean> {
  const { rows } = await db.query<{ id: string }>(
    `update deliveries
       set status = 'pending', attempts = 0, next_attempt_at = now(), last_error_code = null
     where id = $1 and status = 'failed'
     returning id`,
    [id],
  );
  return rows.length > 0;
}
