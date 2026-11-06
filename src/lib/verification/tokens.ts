// T-066: Cryptographic token engine for double opt-in and gated downloads.
// Invariant: Raw tokens must NEVER be persisted or written to logs/telemetry.
import crypto from "crypto";

export const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export type GeneratedToken = {
  rawToken: string; // Plain-text token (only sent in email, never stored)
  tokenHash: string; // SHA-256 hash (stored in verification data store)
  expiresAt: string; // ISO 8601 UTC timestamp
};

/**
 * Generates a cryptographically secure random token (256-bit CSPRNG entropy).
 * Returns the raw token for the email link and the SHA-256 hash for database storage.
 */
export function generateVerificationToken(now: number = Date.now()): GeneratedToken {
  // 32 bytes = 256 bits of entropy (exceeds the 128-bit requirement)
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(now + TOKEN_EXPIRY_MS).toISOString();

  return {
    rawToken,
    tokenHash,
    expiresAt,
  };
}

/**
 * Computes the SHA-256 hash of a plain-text token.
 */
export function hashToken(rawToken: string): string {
  return crypto.createHash("sha256").update(rawToken.trim()).digest("hex");
}

/**
 * Checks whether an ISO 8601 expiry timestamp has passed.
 */
export function isTokenExpired(expiresAtIso: string, now: number = Date.now()): boolean {
  const expiryTime = new Date(expiresAtIso).getTime();
  if (isNaN(expiryTime)) return true;
  return now > expiryTime;
}

/**
 * Sanitizes log messages to ensure raw tokens are never written to server logs.
 */
export function sanitizeLog(message: string): string {
  return message.replace(/token=[a-f0-9]{32,64}/gi, "token=REDACTED");
}
