// T-078: Cron route for automated data cleanup (7-day unverified TTL & 90-day download log retention).
import { NextRequest, NextResponse } from "next/server";
import { runDataCleanup } from "@/lib/verification/cleanup";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  const expectedSecret = process.env.CRON_SECRET;

  if (expectedSecret && token !== expectedSecret) {
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
