import { connection, type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { clientIp, readJson } from "@/lib/api-guard";
import { limitKey, senderGroup } from "@/lib/contact/keys";
import { getDb } from "@/lib/db";
import { overLimit } from "@/lib/rate-limit-db";
import { signedDownloadPath } from "@/lib/storage/signed-urls";
import { confirmVerification } from "@/lib/subscriptions/core";

// T-066: the visitor opens the link in the email and the page sends the token here. It is a POST
// because it changes something (a link scanner that only fetches pages must not use up the link).
// The token works once; reusing it never hands out a second download link.
const NO_STORE = { "Cache-Control": "no-store" };
const bodySchema = z.object({ token: z.string().min(20).max(200) });

const MESSAGES = {
  invalid: { status: 400, message: "This verification link is not valid." },
  expired: {
    status: 410,
    message: "This verification link has expired (24-hour limit). Please request a new one.",
  },
  used: {
    status: 409,
    message:
      "This verification link has already been used. Please request a new one if you need it.",
  },
  bounced: {
    status: 400,
    message: "Email delivery bounced for this address. Verification cannot proceed.",
  },
} as const;

function reply(status: number, body: object) {
  return NextResponse.json(body, { status, headers: NO_STORE });
}

export async function POST(request: NextRequest) {
  await connection();

  const read = await readJson(request, 1024);
  if (!read.ok) return reply(read.status, { success: false, error: "invalid_token" });
  const parsed = bodySchema.safeParse(read.body);
  if (!parsed.success) {
    return reply(400, {
      success: false,
      error: "invalid_token",
      message: MESSAGES.invalid.message,
    });
  }

  const db = getDb();
  const hashSecret = process.env.ENQUIRY_HASH_SECRET;
  if (!db || !hashSecret || hashSecret.length < 32) {
    return reply(503, { success: false, error: "unavailable" });
  }

  // Guessing tokens is hopeless (256 random bits), but a limit keeps the endpoint cheap to defend.
  const ipKey = limitKey(hashSecret, "verify-ip", senderGroup(clientIp(request)));
  if (await overLimit(db, ipKey, { max: 30, windowMs: 60 * 60 * 1000 }, Date.now())) {
    return reply(429, { success: false, error: "rate_limited" });
  }

  // Kept for the consent record: who confirmed, as a keyed hash.
  const ipHash = limitKey(hashSecret, "consent-ip", senderGroup(clientIp(request))).slice(0, 80);
  const result = await confirmVerification(db, parsed.data.token, ipHash);

  if (result.status !== "ok") {
    const m = MESSAGES[result.status];
    return reply(m.status, {
      success: false,
      error: `${result.status}_token`,
      message: m.message,
    });
  }

  const isDownload = result.purpose === "whitepaper_download" && result.targetSlug;
  return reply(200, {
    success: true,
    purpose: result.purpose,
    targetSlug: result.targetSlug ?? undefined,
    downloadUrl: isDownload
      ? signedDownloadPath(result.targetSlug!, result.verificationId)
      : undefined,
    message: "Email address verified successfully.",
  });
}
