// T-076: Cryptographic token generator and validator for RFC 8058 one-click unsubscribe links.
import crypto from "crypto";

const SECRET =
  process.env.UNSUBSCRIBE_SECRET ||
  process.env.APP_SECRET ||
  "xsignon-prod-unsub-secret-key-32b-secure";

/**
 * Generates an HMAC SHA-256 token for an email address to allow safe one-click unsubscription.
 */
export function generateUnsubscribeToken(email: string): string {
  const normalized = email.toLowerCase().trim();
  return crypto
    .createHmac("sha256", SECRET)
    .update(`${normalized}:unsubscribe`)
    .digest("hex");
}

/**
 * Validates the HMAC SHA-256 unsubscribe token using constant-time comparison.
 */
export function verifyUnsubscribeToken(email: string, token: string): boolean {
  if (!email || !token || typeof token !== "string") return false;

  const expectedToken = generateUnsubscribeToken(email);
  if (token.length !== expectedToken.length) {
    return false;
  }

  const tokenBuffer = Buffer.from(token, "utf-8");
  const expectedBuffer = Buffer.from(expectedToken, "utf-8");

  return crypto.timingSafeEqual(tokenBuffer, expectedBuffer);
}

/**
 * Constructs the full RFC 8058 HTTPS URL for one-click unsubscribe.
 */
export function getOneClickUnsubscribeUrl(
  email: string,
  baseUrl = "https://xsignon.com"
): string {
  const token = generateUnsubscribeToken(email);
  const params = new URLSearchParams({
    email: email.toLowerCase().trim(),
    token,
  });
  const host = baseUrl.replace(/\/+$/, "");
  return `${host}/api/unsubscribe/one-click?${params.toString()}`;
}
