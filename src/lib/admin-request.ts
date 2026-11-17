import { NextResponse } from "next/server";
import { checkAdmin } from "@/lib/admin-auth";
import { getDb } from "@/lib/db";
import type { Db } from "@/lib/db/types";

// T-056: what both owner-page routes do first: find the database, check the owner is signed in, and
// answer with the right status if not. Pages and answers are never cached and never indexed.
export const ADMIN_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
} as const;

export async function authorizeAdmin(
  request: Request,
): Promise<{ db: Db } | { response: NextResponse }> {
  const db = getDb();
  const hashSecret = process.env.ENQUIRY_HASH_SECRET;
  if (!db || !hashSecret) {
    return {
      response: new NextResponse("Not available.", { status: 503, headers: ADMIN_HEADERS }),
    };
  }
  const clientIp =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const check = await checkAdmin({
    authorization: request.headers.get("authorization"),
    clientIp,
    db,
    now: Date.now(),
    hashSecret,
  });
  if (!check.ok) {
    return {
      response: new NextResponse(check.status === 503 ? "Not available." : "Sign in required.", {
        status: check.status,
        headers: { ...ADMIN_HEADERS, ...check.headers },
      }),
    };
  }
  return { db };
}

// The replay form is an action taken with the browser's saved sign-in, so it must come from this
// site (a browser always sends Origin on a cross-site POST).
export function isSameSiteRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}
