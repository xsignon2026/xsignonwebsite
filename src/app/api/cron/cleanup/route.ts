// T-078: scheduled housekeeping for the private database: unconfirmed sign-ups after 7 days, download
// records after 90 days, enquiries after 12 months, and finished rate-limit counters.
import { connection, type NextRequest, NextResponse } from "next/server";
import { purgeExpired } from "@/lib/contact/retention";
import { getDb } from "@/lib/db";
import { safeEqual } from "@/lib/safe-equal";
import { cleanup } from "@/lib/subscriptions/core";

export async function POST(request: NextRequest) {
  await connection();

  const token = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  const expected = process.env.CRON_SECRET;
  // Closed by default: with no secret (or a short one) configured, nobody can call this route.
  if (!expected || expected.length < 16 || !safeEqual(token, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  if (!db) return NextResponse.json({ error: "Unavailable" }, { status: 503 });

  const subscriptions = await cleanup(db);
  const enquiries = await purgeExpired(db, Date.now());
  return NextResponse.json({ success: true, report: { ...subscriptions, ...enquiries } });
}

// Vercel's scheduler calls with GET.
export const GET = POST;
