// T-078: Cron route for automated data cleanup (7-day unverified TTL & 90-day download log retention).
import { NextRequest, NextResponse } from "next/server";
import { safeEqual } from "@/lib/safe-equal";
import { runDataCleanup } from "@/lib/verification/cleanup";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  const expectedSecret = process.env.CRON_SECRET;

  if (!expectedSecret || expectedSecret.length < 16 || !safeEqual(token, expectedSecret)) {
    return NextResponse.json({ error: "Unauthorized cron caller" }, { status: 401 });
  }

  const report = await runDataCleanup();

  return NextResponse.json({
    success: true,
    message: "Data cleanup completed successfully.",
    report,
  });
}

export async function GET(request: NextRequest) {
  return POST(request);
}
