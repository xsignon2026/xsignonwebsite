import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const VitalSchema = z.object({
  id: z.string().min(1).max(128),
  name: z.enum(["CLS", "FCP", "FID", "INP", "LCP", "TTFB"]),
  value: z.number().min(0).max(100000),
  rating: z.enum(["good", "needs-improvement", "poor"]).optional(),
  navigationType: z.string().max(64).optional(),
});

// Simple in-memory rate-limiter: max 120 beacons per minute per IP
const ipRateMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRateMap.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }
  if (entry.count >= 120) {
    return false;
  }
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const result = VitalSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid metric payload" }, { status: 400 });
    }

    // In production, metrics would be aggregated to monitoring sink (e.g. Datadog, Prometheus, BigQuery)
    // Here we log or record structured metric safely with zero PII
    return NextResponse.json(
      { ok: true, metric: result.data.name, rating: result.data.rating },
      {
        status: 200,
        headers: {
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  } catch {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
