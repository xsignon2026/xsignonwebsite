import { NextRequest, NextResponse } from "next/server";
import { checkSubscribeRateLimit } from "@/lib/subscribe/rate-limit";
import {
  saveVerificationRequest,
  getVerifiedSubscribers,
  updateDeliveryStatus,
  type VerificationPurpose,
  type VerificationRecord,
} from "@/lib/verification/store";
import { generateVerificationToken } from "@/lib/verification/tokens";
import { sendVerificationEmail } from "@/lib/mailer";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const UNIFORM_SUCCESS_RESPONSE = {
  success: true,
  message: "If this is a valid email, you will receive a verification link shortly.",
};

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      purpose?: VerificationPurpose;
      targetSlug?: string;
      sourcePage?: string;
      hp_company?: string;
      timestamp?: number;
    };

    const rawEmail = (body.email || "").trim().toLowerCase();

    // 1. Bot Honeypot & Timestamp Check (silent uniform 200 return to prevent bot feedback)
    if (body.hp_company) {
      return NextResponse.json(UNIFORM_SUCCESS_RESPONSE, { status: 200 });
    }
    if (body.timestamp && Date.now() - body.timestamp < 600) {
      return NextResponse.json(UNIFORM_SUCCESS_RESPONSE, { status: 200 });
    }

    // 2. Syntax Validation
    if (!rawEmail || !EMAIL_REGEX.test(rawEmail) || rawEmail.length > 254) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid work email address." },
        { status: 400 },
      );
    }

    // 3. Dual Rate Limiting (per IP and per Email)
    const rateCheck = checkSubscribeRateLimit(ip, rawEmail);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many subscription requests. Please try again later.",
        },
        { status: 429 },
      );
    }

    const purpose: VerificationPurpose =
      body.purpose === "whitepaper_download" ? "whitepaper_download" : "newsletter";
    const sourcePage = (body.sourcePage || "/").slice(0, 200);
    const targetSlug = body.targetSlug ? body.targetSlug.slice(0, 100) : undefined;

    // 4. Anti-Enumeration & Duplicate Check:
    // If user is already a verified subscriber for newsletter, we do not re-send or disclose,
    // but return the identical uniform response.
    if (purpose === "newsletter") {
      const activeSubscribers = await getVerifiedSubscribers();
      const alreadySubscribed = activeSubscribers.some((s) => s.email.toLowerCase() === rawEmail);
      if (alreadySubscribed) {
        // Enforce baseline execution timing before returning
        const elapsed = Date.now() - startTime;
        if (elapsed < 50) {
          await new Promise((r) => setTimeout(r, 50 - elapsed));
        }
        return NextResponse.json(UNIFORM_SUCCESS_RESPONSE, { status: 200 });
      }
    }

    // 5. Generate Cryptographic Token & Record Pending Verification
    const tokenData = generateVerificationToken();
    const verificationId = `ver_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const record: VerificationRecord = {
      id: verificationId,
      tokenHash: tokenData.tokenHash,
      email: rawEmail,
      purpose,
      targetSlug,
      sourcePage,
      wordingVersion: "v2-2026-04",
      status: "pending",
      createdAt: new Date().toISOString(),
      expiresAt: tokenData.expiresAt,
    };

    await saveVerificationRequest(record);

    // 6. Send Double Opt-in Verification Email (T-075: Resilience queue on mailer outage)
    const origin = request.nextUrl.origin || "https://xsignon.com";
    const mailResult = await sendVerificationEmail({
      email: rawEmail,
      rawToken: tokenData.rawToken,
      purpose,
      targetSlug,
      baseUrl: origin,
    });

    if (!mailResult.success) {
      await updateDeliveryStatus(verificationId, "queued_retry", mailResult.error);
    } else {
      await updateDeliveryStatus(verificationId, "delivered");
    }

    // Enforce baseline execution timing to eliminate side-channel latency differences
    const elapsed = Date.now() - startTime;
    if (elapsed < 50) {
      await new Promise((r) => setTimeout(r, 50 - elapsed));
    }

    // 7. Uniform Response Guarantee
    return NextResponse.json(UNIFORM_SUCCESS_RESPONSE, { status: 200 });
  } catch (error) {
    console.error(
      "[Subscribe API] Error handling subscription:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(UNIFORM_SUCCESS_RESPONSE, { status: 200 });
  }
}
