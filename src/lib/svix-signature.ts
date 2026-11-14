import { createHmac } from "node:crypto";
import { safeEqual } from "./safe-equal";

// Resend signs its webhooks with the Svix scheme. The secret looks like "whsec_<base64>". The signature
// is base64(HMAC-SHA256(secret bytes, "<id>.<timestamp>.<raw body>")), sent as "v1,<signature>" (several
// can be listed, separated by spaces). Checked on the raw text, in constant time, and an old timestamp
// is refused so a captured delivery cannot be replayed later.
export const SVIX_MAX_AGE_SECONDS = 5 * 60;

export function isValidSvixSignature(
  rawBody: string,
  headers: { id: string | null; timestamp: string | null; signature: string | null },
  secret: string,
  nowMs = Date.now(),
): boolean {
  const { id, timestamp, signature } = headers;
  if (!rawBody || !id || !timestamp || !signature || !secret.startsWith("whsec_")) return false;
  const seconds = Number(timestamp);
  if (!Number.isSafeInteger(seconds)) return false;
  if (Math.abs(nowMs / 1000 - seconds) > SVIX_MAX_AGE_SECONDS) return false;

  const key = Buffer.from(secret.slice("whsec_".length), "base64");
  if (key.length === 0) return false;
  const expected = createHmac("sha256", key)
    .update(`${id}.${timestamp}.${rawBody}`)
    .digest("base64");

  return signature.split(" ").some((part) => {
    const [version, value] = part.split(",");
    return version === "v1" && Boolean(value) && safeEqual(value, expected);
  });
}
