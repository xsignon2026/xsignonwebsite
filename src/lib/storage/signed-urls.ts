// T-064: short-lived signed download links for the private white papers. The link names the
// confirmation (not the email address), the paper and an expiry, and carries an HMAC over all three.
import { createHmac } from "node:crypto";
import { requireSecret } from "@/lib/require-secret";
import { safeEqual } from "@/lib/safe-equal";

export const DEFAULT_LINK_TTL_MS = 15 * 60 * 1000;

const sign = (slug: string, verificationId: string, expires: number) =>
  createHmac("sha256", requireSecret("SIGNED_URL_SECRET"))
    .update(`${slug}:${verificationId}:${expires}`)
    .digest("base64url");

export function signedDownloadPath(
  slug: string,
  verificationId: string,
  now = Date.now(),
  ttlMs = DEFAULT_LINK_TTL_MS,
): string {
  const expires = now + ttlMs;
  const query = new URLSearchParams({
    slug,
    v: verificationId,
    expires: String(expires),
    sig: sign(slug, verificationId, expires),
  });
  return `/api/white-papers/download?${query.toString()}`;
}

export function verifySignedDownload(
  slug: string,
  verificationId: string,
  expires: string,
  sig: string,
  now = Date.now(),
): { valid: true } | { valid: false; reason: "expired" | "invalid" } {
  const at = Number(expires);
  if (!slug || !verificationId || !sig || !Number.isSafeInteger(at)) {
    return { valid: false, reason: "invalid" };
  }
  if (!safeEqual(sig, sign(slug, verificationId, at))) return { valid: false, reason: "invalid" };
  return at < now ? { valid: false, reason: "expired" } : { valid: true };
}
