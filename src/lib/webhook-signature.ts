import { createHmac } from "node:crypto";
import { safeEqual } from "./safe-equal";

// S-16 hardening: our own check of the Sanity webhook signature, run on the raw text BEFORE any JSON parsing.
// Format: "t=<unix ms>,v1=<base64url HMAC-SHA256 of '<t>.<body>'>". Unlike the library check, this compares in
// constant time and rejects old timestamps, so a captured delivery cannot be replayed later.
export const MAX_AGE_MS = 5 * 60 * 1000;
export const MAX_BODY_BYTES = 64 * 1024;

const HEADER = /^t=(\d+)[, ]+v1=([A-Za-z0-9_-]+)$/;

export function isValidWebhookSignature(
  rawBody: string,
  header: string | null,
  secret: string,
  now = Date.now(),
): boolean {
  const match = header?.trim().match(HEADER);
  if (!match || !rawBody || !secret) return false;
  const timestamp = Number(match[1]);
  if (!Number.isSafeInteger(timestamp) || Math.abs(now - timestamp) > MAX_AGE_MS) return false;
  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("base64url");
  return safeEqual(match[2], expected);
}
