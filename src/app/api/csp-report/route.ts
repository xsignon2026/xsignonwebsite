import { NextResponse } from "next/server";

// In-memory rate limiting map for CSP reports: max 30 reports per IP/window (60 seconds)
const WINDOW_MS = 60 * 1000;
const MAX_REPORTS_PER_WINDOW = 30;
const ipRateMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRateMap.get(ip);

  if (!record || now > record.expiresAt) {
    ipRateMap.set(ip, { count: 1, expiresAt: now + WINDOW_MS });
    return false;
  }

  record.count += 1;
  return record.count > MAX_REPORTS_PER_WINDOW;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return new NextResponse(null, { status: 429 });
    }

    const contentType = request.headers.get("content-type") || "";
    if (
      !contentType.includes("application/csp-report") &&
      !contentType.includes("application/json") &&
      !contentType.includes("application/reports+json")
    ) {
      return new NextResponse(null, { status: 400 });
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return new NextResponse(null, { status: 400 });
    }

    // Sanitize and structure the CSP violation record
    const report = body["csp-report"] || body;
    const documentUri = typeof report["document-uri"] === "string" ? report["document-uri"] : "";
    const blockedUri = typeof report["blocked-uri"] === "string" ? report["blocked-uri"] : "";
    const violatedDirective =
      typeof report["violated-directive"] === "string" ? report["violated-directive"] : "";

    // In production, log warning if legitimate anomaly detected
    if (process.env.NODE_ENV === "production") {
      console.warn(
        `[CSP-VIOLATION] Doc: ${documentUri.slice(0, 100)} | Blocked: ${blockedUri.slice(0, 100)} | Directive: ${violatedDirective.slice(0, 60)}`
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
