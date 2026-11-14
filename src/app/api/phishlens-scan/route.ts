import * as Sentry from "@sentry/nextjs";
import { connection, type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { clientIp, readJson } from "@/lib/api-guard";
import { limitKey, senderGroup } from "@/lib/contact/keys";
import { getDb } from "@/lib/db";
import {
  PHISHLENS_URL,
  phishlensReportUrl,
  toDomain,
  type ScanCheckStatus,
  type ScanSummary,
} from "@/lib/phishlens";
import { overLimit, type Limit } from "@/lib/rate-limit-db";

// The home hero's "Scan your domain for free". PhishLens's public scan endpoint is called from the
// server (the browser cannot call it from this site), and only a short summary is sent back. The
// visitor then opens the full report on PhishLens by its scan id.

// A scan reads DNS, mail servers and the website, and takes up to about a minute.
export const maxDuration = 90;
const SCAN_TIMEOUT_MS = 85_000;

const LIMITS = {
  ip: { max: 10, windowMs: 60 * 60 * 1000 },
  global: { max: 500, windowMs: 60 * 60 * 1000 },
} satisfies Record<string, Limit>;

// Local development only, when the private database is not configured: one counter per server
// process. Production without the database answers "unavailable" instead, like /api/subscribe.
const memory = new Map<string, { bucket: number; count: number }>();
function overMemoryLimit(key: string, limit: Limit, now: number): boolean {
  const bucket = Math.floor(now / limit.windowMs);
  if (memory.size > 5000) {
    for (const [k, v] of memory) if (v.bucket !== bucket) memory.delete(k);
  }
  const entry = memory.get(key);
  const count = entry && entry.bucket === bucket ? entry.count + 1 : 1;
  memory.set(key, { bucket, count });
  return count > limit.max;
}

const NO_STORE = { "Cache-Control": "no-store" };
function reply(status: number, body: object, headers: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers: { ...NO_STORE, ...headers } });
}

const bodySchema = z.object({ domain: z.string().max(300) });

const checkSchema = z.object({
  key: z.string(),
  title: z.string(),
  status: z.string(),
  issues: z.array(z.string()).optional(),
});
const scanSchema = z.object({
  id: z.string().regex(/^[A-Za-z0-9_-]{8,64}$/),
  domain: z.string(),
  score: z.number(),
  grade: z.string(),
  result: z.object({
    checks: z.array(checkSchema),
    action_plan: z.array(z.object({ check: z.string() })).optional(),
  }),
});

// The checks that decide whether someone can send email as the domain, in this order.
const SHOWN = ["spf", "dmarc", "dkim", "mta-sts"];

function toStatus(s: string): ScanCheckStatus {
  return s === "pass" || s === "fail" ? s : "warn";
}

export async function POST(request: NextRequest) {
  await connection();

  const read = await readJson(request, 2 * 1024);
  if (!read.ok) return reply(read.status, { message: "Request not accepted." });

  const parsed = bodySchema.safeParse(read.body);
  const domain = parsed.success ? toDomain(parsed.data.domain) : null;
  if (!domain) {
    return reply(400, { message: "Enter a domain like yourcompany.com, or a work email." });
  }

  const now = Date.now();
  const sender = senderGroup(clientIp(request));
  const db = getDb();
  const hashSecret = process.env.ENQUIRY_HASH_SECRET;
  try {
    let limited: boolean;
    if (db && hashSecret && hashSecret.length >= 32) {
      const checks: [string, Limit][] = [
        [limitKey(hashSecret, "scan-ip", sender), LIMITS.ip],
        ["scan-global", LIMITS.global],
      ];
      limited = await db.transaction(async (tx) => {
        for (const [key, limit] of checks) {
          if (await overLimit(tx, key, limit, now)) return true;
        }
        return false;
      });
    } else if (process.env.NODE_ENV === "production") {
      console.error("Domain scan is not configured (DATABASE_URL, ENQUIRY_HASH_SECRET).");
      return reply(503, { message: "The scanner is unavailable right now. Please try later." });
    } else {
      limited =
        overMemoryLimit(`ip:${sender}`, LIMITS.ip, now) ||
        overMemoryLimit("global", LIMITS.global, now);
    }
    if (limited) {
      return reply(
        429,
        { message: "Too many scans from here. Please try again in an hour." },
        { "Retry-After": "3600" },
      );
    }
  } catch {
    Sentry.captureMessage("The scan rate limit could not be checked", { level: "error" });
    return reply(503, { message: "The scanner is unavailable right now. Please try later." });
  }

  let res: Response;
  try {
    res = await fetch(`${PHISHLENS_URL}/api/scans/public`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ domain }),
      signal: AbortSignal.timeout(SCAN_TIMEOUT_MS),
      cache: "no-store",
    });
  } catch {
    return reply(504, { message: "The scan took too long. Please try again." });
  }

  const data: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 400 || res.status === 422) {
      return reply(400, { message: `We could not scan ${domain}. Check the spelling and try again.` });
    }
    if (res.status === 429) {
      return reply(429, { message: "The scanner is busy. Please try again in a few minutes." });
    }
    Sentry.captureMessage("PhishLens scan failed", { level: "warning", extra: { status: res.status } });
    return reply(502, { message: "The scanner is unavailable right now. Please try later." });
  }

  const scan = scanSchema.safeParse(data);
  if (!scan.success) {
    Sentry.captureMessage("PhishLens scan answer not understood", { level: "warning" });
    return reply(502, { message: "The scanner is unavailable right now. Please try later." });
  }

  const { id, score, grade, result } = scan.data;
  const byKey = new Map(result.checks.map((c) => [c.key, c]));
  const checks = SHOWN.flatMap((key) => {
    const c = byKey.get(key);
    return c ? [{ key, title: c.title, status: toStatus(c.status) }] : [];
  });

  // The biggest gain first (PhishLens's own action plan), else the first failing check.
  const firstPlanned = result.action_plan?.[0]?.check;
  const risky =
    result.checks.find((c) => c.title === firstPlanned && c.issues?.length) ??
    result.checks.find((c) => c.status === "fail" && c.issues?.length);
  const topRisk = risky?.issues?.[0] ?? null;

  const summary: ScanSummary = {
    id,
    domain: scan.data.domain,
    score: Math.round(score),
    grade,
    checks,
    topRisk,
    reportUrl: phishlensReportUrl(id),
  };
  return reply(200, summary);
}
