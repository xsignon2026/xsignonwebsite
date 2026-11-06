import { describe, expect, it } from "vitest";
import {
  generateVerificationToken,
  hashToken,
  isTokenExpired,
  sanitizeLog,
} from "../lib/verification/tokens";
import {
  computeDownloadSignature,
  generateSignedDownloadUrl,
  verifySignedDownloadParams,
} from "../lib/storage/signed-urls";
import {
  saveVerificationRequest,
  findVerificationByTokenHash,
  markVerificationVerified,
  grantWhitePaperDownload,
  hasDownloadGrant,
  getVerifiedSubscribers,
  type VerificationRecord,
} from "../lib/verification/store";

describe("T-066: Cryptographic Token Engine", () => {
  it("generates 256-bit random tokens with deterministic SHA-256 hash", () => {
    const tokenData = generateVerificationToken();
    expect(tokenData.rawToken).toHaveLength(64); // 32 bytes hex = 64 chars
    expect(tokenData.tokenHash).toHaveLength(64); // SHA-256 hex = 64 chars

    // Hash matches
    expect(hashToken(tokenData.rawToken)).toBe(tokenData.tokenHash);
  });

  it("correctly identifies expired tokens", () => {
    const past = new Date(Date.now() - 1000).toISOString();
    const future = new Date(Date.now() + 100000).toISOString();

    expect(isTokenExpired(past)).toBe(true);
    expect(isTokenExpired(future)).toBe(false);
  });

  it("sanitizes raw tokens from log strings", () => {
    const raw = "https://xsignon.com/subscribe/verify?token=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef&user=test";
    const cleaned = sanitizeLog(raw);
    expect(cleaned).not.toContain("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef");
    expect(cleaned).toContain("token=REDACTED");
  });
});

describe("T-064: Signed URLs and Expiration", () => {
  const slug = "zero-trust-posture-guide";
  const email = "subscriber@company.com";

  it("generates and verifies valid signed download links", () => {
    const url = generateSignedDownloadUrl(slug, email, 10000);
    const parsed = new URL(`https://xsignon.com${url}`);
    const sig = parsed.searchParams.get("sig")!;
    const expires = parsed.searchParams.get("expires")!;

    const result = verifySignedDownloadParams(slug, email, expires, sig);
    expect(result.valid).toBe(true);
  });

  it("rejects expired signed links", () => {
    const pastExpires = Date.now() - 5000;
    const sig = computeDownloadSignature(slug, email, pastExpires);
    const result = verifySignedDownloadParams(slug, email, pastExpires.toString(), sig);
    expect(result.valid).toBe(false);
    expect(result.reason).toBe("expired");
  });

  it("rejects tampered signatures and mismatched parameters", () => {
    const futureExpires = Date.now() + 50000;
    const sig = computeDownloadSignature(slug, email, futureExpires);

    // Tampered slug
    const tamperedSlug = verifySignedDownloadParams("other-slug", email, futureExpires.toString(), sig);
    expect(tamperedSlug.valid).toBe(false);
    expect(tamperedSlug.reason).toBe("invalid_signature");

    // Tampered email
    const tamperedEmail = verifySignedDownloadParams(slug, "attacker@evil.com", futureExpires.toString(), sig);
    expect(tamperedEmail.valid).toBe(false);
    expect(tamperedEmail.reason).toBe("invalid_signature");
  });
});

describe("T-065: Verification Data Store & Download Grants", () => {
  it("persists pending requests and verifies tokens atomically", async () => {
    const tokenData = generateVerificationToken();
    const id = `ver_test_${Date.now()}`;
    const record: VerificationRecord = {
      id,
      tokenHash: tokenData.tokenHash,
      email: "optin@example.com",
      purpose: "newsletter",
      sourcePage: "/thinking",
      wordingVersion: "v2-2026-04",
      status: "pending",
      createdAt: new Date().toISOString(),
      expiresAt: tokenData.expiresAt,
    };

    await saveVerificationRequest(record);
    const found = await findVerificationByTokenHash(tokenData.tokenHash);
    expect(found).not.toBeNull();
    expect(found?.email).toBe("optin@example.com");
    expect(found?.status).toBe("pending");

    // Invariant: Unverified rows are NOT returned as verified subscribers
    const initialSubscribers = await getVerifiedSubscribers();
    expect(initialSubscribers.some((s) => s.id === id)).toBe(false);

    // Mark verified
    await markVerificationVerified(id, {
      timestamp: new Date().toISOString(),
      ipHash: "testhash",
      userAgent: "Vitest",
      wording: "I agree to receive the XSignOn newsletter.",
    });

    const verified = await findVerificationByTokenHash(tokenData.tokenHash);
    expect(verified?.status).toBe("verified");
    expect(verified?.consentAudit?.userAgent).toBe("Vitest");

    // Invariant: Now appears in verified subscribers
    const afterSubscribers = await getVerifiedSubscribers();
    expect(afterSubscribers.some((s) => s.id === id)).toBe(true);
  });

  it("records and checks download grants", async () => {
    const email = `download-tester-${Date.now()}@example.com`;
    const slug = "zero-trust-posture-guide";

    expect(await hasDownloadGrant(email, slug)).toBe(false);
    await grantWhitePaperDownload(email, slug);
    expect(await hasDownloadGrant(email, slug)).toBe(true);
    expect(await hasDownloadGrant("other@example.com", slug)).toBe(false);
  });
});
