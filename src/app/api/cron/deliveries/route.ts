import * as Sentry from "@sentry/nextjs";
import { connection, NextResponse } from "next/server";
import { processDeliveries } from "@/lib/contact/deliver";
import { purgeExpired } from "@/lib/contact/retention";
import { getDb } from "@/lib/db";
import { getMailConfig } from "@/lib/mail/config";
import { safeEqual } from "@/lib/safe-equal";

// T-056: the scheduled retry. Run it every few minutes from a scheduler (docs/runbook.md). It sends
// whatever is waiting, then deletes expired data (D11). The scheduler must send
// "Authorization: Bearer <CRON_SECRET>"; Vercel Cron does this by itself when CRON_SECRET is set.
// Without the secret the route does nothing, so nobody else can trigger it.
export async function GET(request: Request) {
  await connection();
  const secret = process.env.CRON_SECRET;
  const given = request.headers.get("authorization") ?? "";
  if (!secret || secret.length < 16 || !safeEqual(given, `Bearer ${secret}`)) {
    return NextResponse.json(
      { ok: false },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  const db = getDb();
  const config = getMailConfig();
  if (!db) return NextResponse.json({ ok: false, error: "no_database" }, { status: 503 });

  const sent = config
    ? await processDeliveries({
        db,
        config,
        now: Date.now,
        onPermanentFailure: (code) =>
          Sentry.captureMessage("An enquiry email failed permanently", {
            level: "error",
            extra: { code },
          }),
      })
    : null;
  const purged = await purgeExpired(db, Date.now());
  return NextResponse.json(
    { ok: true, mailConfigured: Boolean(config), sent, purged },
    { headers: { "Cache-Control": "no-store" } },
  );
}
