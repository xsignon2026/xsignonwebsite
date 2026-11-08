import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  findVerificationByTokenHash,
  markVerificationVerified,
  grantWhitePaperDownload,
} from "@/lib/verification/store";
import { hashToken, isTokenExpired } from "@/lib/verification/tokens";
import { generateSignedDownloadUrl } from "@/lib/storage/signed-urls";
import { syncVerifiedSubscriber } from "@/lib/newsletter/provider";
import { getWhitePaperBySlug } from "@/lib/white-paper";
import { sendWhitePaperDeliveryEmail } from "@/lib/mailer";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  if (!token || !email) {
    return NextResponse.json(
      { success: false, error: "missing_parameters", message: "Token and email are required." },
      { status: 400 }
    );
  }

  const tokenHash = hashToken(token);
  const record = await findVerificationByTokenHash(tokenHash);

  if (!record || record.email.toLowerCase() !== email.toLowerCase().trim()) {
    return NextResponse.json(
      { success: false, error: "invalid_token", message: "Verification link is invalid or has already been used." },
      { status: 400 }
    );
  }

  // Check 24-hour expiration
  if (isTokenExpired(record.expiresAt)) {
    return NextResponse.json(
      {
        success: false,
        error: "expired_token",
        message: "This verification link has expired (24-hour limit). Please request a new one.",
      },
      { status: 410 }
    );
  }

  // T-075 Invariant: A bounced verification NEVER creates an active subscription
  if (record.status === "bounced") {
    return NextResponse.json(
      {
        success: false,
        error: "bounced_email",
        message: "Email delivery bounced for this address. Verification cannot proceed.",
      },
      { status: 400 }
    );
  }

  // Idempotent check: if already verified, handle gracefully without creating duplicate records
  if (record.status === "verified") {
    let downloadUrl: string | undefined;
    if (record.purpose === "whitepaper_download" && record.targetSlug) {
      downloadUrl = generateSignedDownloadUrl(record.targetSlug, record.email);
    }

    return NextResponse.json({
      success: true,
      alreadyVerified: true,
      purpose: record.purpose,
      targetSlug: record.targetSlug,
      downloadUrl,
      message: "Email address is already verified.",
    });
  }

  // Record Consent Audit
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";
  const ipHash = crypto.createHash("sha256").update(clientIp).digest("hex").substring(0, 16);
  const userAgent = request.headers.get("user-agent") || "unknown";

  const consentAudit = {
    timestamp: new Date().toISOString(),
    ipHash,
    userAgent,
    wording:
      record.purpose === "whitepaper_download"
        ? "Verified email to receive technical white paper download link."
        : "Confirmed subscription to XSignOn updates and thinking.",
  };

  await markVerificationVerified(record.id, consentAudit);

  let downloadUrl: string | undefined;

  // Handle Purpose
  if (record.purpose === "newsletter") {
    await syncVerifiedSubscriber({
      email: record.email,
      consentDate: consentAudit.timestamp,
      source: record.sourcePage,
      wordingVersion: record.wordingVersion,
      tags: ["newsletter", "web-opt-in"],
    });
  } else if (record.purpose === "whitepaper_download" && record.targetSlug) {
    await grantWhitePaperDownload(record.email, record.targetSlug);
    downloadUrl = generateSignedDownloadUrl(record.targetSlug, record.email);

    // T-071: Dispatches backup email with short-lived signed link
    const wp = await getWhitePaperBySlug(record.targetSlug);
    const title = wp?.title || "Technical White Paper";
    await sendWhitePaperDeliveryEmail({
      email: record.email,
      whitePaperSlug: record.targetSlug,
      whitePaperTitle: title,
      downloadUrl,
    });
  }

  return NextResponse.json({
    success: true,
    alreadyVerified: false,
    purpose: record.purpose,
    targetSlug: record.targetSlug,
    downloadUrl,
    message: "Email address verified successfully.",
  });
}
