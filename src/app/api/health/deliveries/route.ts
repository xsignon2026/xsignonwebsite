import { connection, NextResponse } from "next/server";
import { deliveryHealth } from "@/lib/contact/deliver";
import { getDb } from "@/lib/db";

// T-056: the independent alarm. Point the uptime monitor (S-18) at this address and alert the named
// owner when it stops answering 200. It looks only at the database, so it still works if the sender,
// the scheduler or the whole delivery worker is down. It says 503 when a team email has been waiting
// too long or has failed, or when the database cannot be reached. It returns no counts and no data.
export async function GET() {
  await connection();
  const db = getDb();
  const headers = { "Cache-Control": "no-store" };
  if (!db) return NextResponse.json({ ok: false }, { status: 503, headers });
  try {
    const health = await deliveryHealth(db, Date.now());
    return NextResponse.json({ ok: health.ok }, { status: health.ok ? 200 : 503, headers });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503, headers });
  }
}
