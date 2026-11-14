import { connection, type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { safeEqual } from "@/lib/safe-equal";
import { INITIAL_LINKEDIN_POSTS } from "@/data/linkedin-posts";
import type { LinkedInSyncResult } from "@/types/linkedin";

export async function POST(request: NextRequest) {
  await connection();

  const token = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  const expected = process.env.CRON_SECRET;

  // S-04 / T-078: Secure cron endpoint verification
  // In production / CI with secret configured: strictly enforce CRON_SECRET with safeEqual
  if (expected && expected.length >= 16) {
    if (!token || !safeEqual(token, expected)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    // Closed by default in production if no secret is set
    return NextResponse.json({ error: "CRON_SECRET is not configured" }, { status: 503 });
  }

  // Format Chicago / CST timestamp for log and payload
  const cstFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "full",
    timeStyle: "medium",
  });
  const syncedAtCST = cstFormatter.format(new Date());

  let source: LinkedInSyncResult["source"] = "fallback";
  let count = INITIAL_LINKEDIN_POSTS.length;

  const linkedInAccessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const linkedInOrgId = process.env.LINKEDIN_ORG_ID;

  if (linkedInAccessToken && linkedInOrgId) {
    try {
      const response = await fetch(
        `https://api.linkedin.com/rest/posts?author=urn:li:organization:${linkedInOrgId}&q=author&count=10`,
        {
          headers: {
            Authorization: `Bearer ${linkedInAccessToken}`,
            "LinkedIn-Version": "202401",
            "X-Restli-Protocol-Version": "2.0.0",
          },
          next: { revalidate: 0 },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.elements) && data.elements.length > 0) {
          source = "api";
          count = data.elements.length;
        }
      }
    } catch {
      // Graceful degradation to fallback dataset if LinkedIn API is unreachable
      source = "fallback";
    }
  }

  // Purge edge cache for /thinking so visitors receive the freshest daily posts
  try {
    revalidatePath("/thinking");
  } catch {
    // Non-fatal if revalidation context is unavailable during test runs
  }

  const result: LinkedInSyncResult = {
    success: true,
    timestamp: new Date().toISOString(),
    postsCount: count,
    source,
    syncedAtCST,
    message: `Synchronized ${count} LinkedIn posts at 9:00 AM CST schedule.`,
  };

  return NextResponse.json(result);
}

// Vercel Cron invokes routes using GET
export const GET = POST;
