// T-064: Private PDF storage signed link engine.
// Issues HMAC SHA-256 signed URLs with short-lived expiration (e.g. 15 minutes).
import crypto from "crypto";

const SIGNED_URL_SECRET =
  process.env.SIGNED_URL_SECRET ||
  process.env.SESSION_SECRET ||
  "xsignon-private-pdf-storage-secret-2026-v2";

export const DEFAULT_LINK_TTL_MS = 15 * 60 * 1000; // 15 minutes

export type SignedUrlParams = {
  slug: string;
  email: string;
  expires: number; // Unix timestamp in ms
  sig: string;
};

/**
 * Computes an HMAC SHA-256 signature for a white paper download grant.
 */
export function computeDownloadSignature(
  slug: string,
  email: string,
  expires: number,
  secret: string = SIGNED_URL_SECRET,
): string {
  const payload = `${slug.toLowerCase().trim()}:${email.toLowerCase().trim()}:${expires}`;
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * Generates an HTTPS signed download link.
 */
export function generateSignedDownloadUrl(
  slug: string,
  email: string,
  ttlMs: number = DEFAULT_LINK_TTL_MS,
  baseUrl: string = "",
): string {
  const expires = Date.now() + ttlMs;
  const sig = computeDownloadSignature(slug, email, expires);
  const query = new URLSearchParams({
    slug: slug.trim(),
    email: email.trim(),
    expires: expires.toString(),
    sig,
  });

  const path = `/api/white-papers/download?${query.toString()}`;
  return baseUrl ? `${baseUrl.replace(/\/+$/, "")}${path}` : path;
}

/**
 * Validates a signed download URL parameters using timing-safe comparison.
 */
export function verifySignedDownloadParams(
  slug: string,
  email: string,
  expiresStr: string,
  sig: string,
  now: number = Date.now(),
  secret: string = SIGNED_URL_SECRET,
): { valid: boolean; reason?: "expired" | "invalid_signature" | "malformed" } {
  if (!slug || !email || !expiresStr || !sig) {
    return { valid: false, reason: "malformed" };
  }

  const expires = Number(expiresStr);
  if (isNaN(expires)) {
    return { valid: false, reason: "malformed" };
  }

  // 1. Expiration check
  if (now > expires) {
    return { valid: false, reason: "expired" };
  }

  // 2. Cryptographic signature check (timing-safe)
  const expectedSig = computeDownloadSignature(slug, email, expires, secret);
  try {
    const sigBuffer = Buffer.from(sig, "hex");
    const expectedBuffer = Buffer.from(expectedSig, "hex");

    if (sigBuffer.length !== expectedBuffer.length) {
      return { valid: false, reason: "invalid_signature" };
    }

    const match = crypto.timingSafeEqual(sigBuffer, expectedBuffer);
    if (!match) {
      return { valid: false, reason: "invalid_signature" };
    }

    return { valid: true };
  } catch {
    return { valid: false, reason: "invalid_signature" };
  }
}
