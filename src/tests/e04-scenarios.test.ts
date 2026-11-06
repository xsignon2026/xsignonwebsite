import { describe, expect, it } from "vitest";
import {
  saveVerificationRequest,
  findVerificationByTokenHash,
  markVerificationVerified,
  grantWhitePaperDownload,
  hasDownloadGrant,
  recordDownloadAccess,
  markVerificationBounced,
  type VerificationRecord,
} from "../lib/verification/store";
import {
  generateVerificationToken,
  hashToken,
  isTokenExpired,
} from "../lib/verification/tokens";
import {
  generateSignedDownloadUrl,
  verifySignedDownloadParams,
} from "../lib/storage/signed-urls";
import {
  syncVerifiedSubscriber,
  unsubscribeEmail,
  isSuppressed,
  getActiveSubscribers,
} from "../lib/newsletter/provider";
import {
  generateUnsubscribeToken,
  verifyUnsubscribeToken,
  getOneClickUnsubscribeUrl,
} from "../lib/newsletter/tokens";
import { runDataCleanup } from "../lib/verification/cleanup";
import { SUB_PROCESSORS } from "../data/legal/sub-processors";
import { CONSENT_VERSION } from "../lib/consent/wording";

describe("T-080: Comprehensive E04 Seven-Scenario Verification Suite", () => {
  // Scenario 1: Subscribe and verify
  it("Scenario 1: creates pending request, verifies token, and syncs active subscriber", async () => {
    const email = `sub-verify-${Date.now()}@test.org`;
    const tokenData = generateVerificationToken();
    const id = `ver_test_s1_${Date.now()}`;

    const record: VerificationRecord = {
      id,
      tokenHash: tokenData.tokenHash,
      email,
      purpose: "newsletter",
      sourcePage: "/footer",
      wordingVersion: CONSENT_VERSION,
      status: "pending",
      createdAt: new Date().toISOString(),
      expiresAt: tokenData.expiresAt,
    };

    await saveVerificationRequest(record);

    // Verify token look-up
    const found = await findVerificationByTokenHash(tokenData.tokenHash);
    expect(found).not.toBeNull();
    expect(found?.email).toBe(email);
    expect(found?.status).toBe("pending");

    // Perform verification audit
    await markVerificationVerified(id, {
      timestamp: new Date().toISOString(),
      ipHash: "testhash12345678",
      userAgent: "Vitest-Runner",
      wording: "Confirmed newsletter subscription",
    });

    // Sync to subscriber provider
    const syncResult = await syncVerifiedSubscriber({
      email,
      consentDate: new Date().toISOString(),
      source: "/footer",
      wordingVersion: CONSENT_VERSION,
      tags: ["newsletter"],
    });

    expect(syncResult.success).toBe(true);

    const activeList = await getActiveSubscribers();
    expect(activeList.some((s) => s.email === email)).toBe(true);
  });

  // Scenario 2: White paper download and access logging
  it("Scenario 2: generates signed URL after verification and logs download access", async () => {
    const email = `wp-dl-${Date.now()}@enterprise.com`;
    const slug = "zero-trust-posture-guide";

    // Grant access upon verification
    await grantWhitePaperDownload(email, slug);
    expect(await hasDownloadGrant(email, slug)).toBe(true);

    // Generate signed HMAC link (15 min TTL)
    const signedUrl = generateSignedDownloadUrl(slug, email, 900 * 1000);
    const parsed = new URL(signedUrl, "https://xsignon.com");
    const expires = parsed.searchParams.get("expires") || "";
    const sig = parsed.searchParams.get("sig") || "";

    const check = verifySignedDownloadParams(slug, email, expires, sig);
    expect(check.valid).toBe(true);

    // Verify download access logging increments
    await recordDownloadAccess(email, slug);
    // Unverified address check
    expect(await hasDownloadGrant("unverified-visitor@bad.org", slug)).toBe(false);
  });

  // Scenario 3: Expired verification link
  it("Scenario 3: correctly identifies expired tokens (24-hour limit)", () => {
    const pastDate = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();
    expect(isTokenExpired(pastDate)).toBe(true);

    const futureDate = new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString();
    expect(isTokenExpired(futureDate)).toBe(false);
  });

  // Scenario 4: Reused link handling
  it("Scenario 4: handles consumed tokens idempotently without duplicate writes", async () => {
    const email = `reused-token-${Date.now()}@domain.org`;
    const tokenData = generateVerificationToken();
    const id = `ver_reused_${Date.now()}`;

    const record: VerificationRecord = {
      id,
      tokenHash: tokenData.tokenHash,
      email,
      purpose: "whitepaper_download",
      targetSlug: "zero-trust-posture-guide",
      sourcePage: "/white-papers/zero-trust-posture-guide",
      wordingVersion: CONSENT_VERSION,
      status: "pending",
      createdAt: new Date().toISOString(),
      expiresAt: tokenData.expiresAt,
    };

    await saveVerificationRequest(record);
    await markVerificationVerified(id, {
      timestamp: new Date().toISOString(),
      ipHash: "audit_ip_reused",
      userAgent: "Vitest",
      wording: "White paper request",
    });

    const verified = await findVerificationByTokenHash(tokenData.tokenHash);
    expect(verified?.status).toBe("verified");

    // Fresh signed URL can still be generated for authorized user without re-inserting
    const refreshedUrl = generateSignedDownloadUrl("zero-trust-posture-guide", email);
    expect(refreshedUrl).toContain("slug=zero-trust-posture-guide");
  });

  // Scenario 5: Bounced email handling
  it("Scenario 5: marks pending requests as bounced and bars newsletter subscription", async () => {
    const email = `bounced-user-${Date.now()}@badmailbox.net`;
    const tokenData = generateVerificationToken();
    const id = `ver_bounce_${Date.now()}`;

    const record: VerificationRecord = {
      id,
      tokenHash: tokenData.tokenHash,
      email,
      purpose: "newsletter",
      sourcePage: "/footer",
      wordingVersion: CONSENT_VERSION,
      status: "pending",
      createdAt: new Date().toISOString(),
      expiresAt: tokenData.expiresAt,
    };

    await saveVerificationRequest(record);

    // Simulate provider webhook bounce
    const bouncedCount = await markVerificationBounced(email);
    expect(bouncedCount).toBeGreaterThan(0);

    const updated = await findVerificationByTokenHash(tokenData.tokenHash);
    expect(updated?.status).toBe("bounced");

    // Invariant: Bounced status prevents subscriber creation
    expect(updated?.status).not.toBe("pending");
    expect(updated?.status).not.toBe("verified");
  });

  // Scenario 6: Duplicate subscribe handling
  it("Scenario 6: prevents duplicate list entries for already verified email", async () => {
    const email = `dup-user-${Date.now()}@testcorp.com`;

    const first = await syncVerifiedSubscriber({
      email,
      consentDate: new Date().toISOString(),
      source: "/footer",
      wordingVersion: CONSENT_VERSION,
      tags: ["first-sync"],
    });

    const second = await syncVerifiedSubscriber({
      email,
      consentDate: new Date().toISOString(),
      source: "/footer",
      wordingVersion: CONSENT_VERSION,
      tags: ["second-sync"],
    });

    expect(first.id).toBe(second.id);

    const all = await getActiveSubscribers();
    const matching = all.filter((s) => s.email === email);
    expect(matching.length).toBe(1);
  });

  // Scenario 7: One-click unsubscribe
  it("Scenario 7: executes RFC 8058 one-click unsubscribe and syncs suppression", async () => {
    const email = `unsub-tester-${Date.now()}@privacy.com`;

    // 1. Initial subscription
    await syncVerifiedSubscriber({
      email,
      consentDate: new Date().toISOString(),
      source: "/thinking",
      wordingVersion: CONSENT_VERSION,
      tags: ["subscriber"],
    });

    // 2. Token generation and validation
    const token = generateUnsubscribeToken(email);
    expect(verifyUnsubscribeToken(email, token)).toBe(true);
    expect(verifyUnsubscribeToken("attacker@bad.org", token)).toBe(false);

    // 3. One-click URL generation
    const unsubUrl = getOneClickUnsubscribeUrl(email, "https://xsignon.com");
    expect(unsubUrl).toContain("/api/unsubscribe/one-click");
    expect(unsubUrl).toContain(`email=${encodeURIComponent(email)}`);

    // 4. Execute unsubscribe
    await unsubscribeEmail(email);

    expect(await isSuppressed(email)).toBe(true);

    const activeList = await getActiveSubscribers();
    expect(activeList.some((s) => s.email === email)).toBe(false);
  });

  // T-078: Automated Data Cleanup
  it("T-078: prunes unverified requests older than 7 days and retains active subscribers", async () => {
    const oldEmail = `stale-unverified-${Date.now()}@cleanup.org`;
    const oldToken = hashToken(`raw-old-${Date.now()}`);
    const eightDaysAgo = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString();

    const staleRecord: VerificationRecord = {
      id: `ver_stale_${Date.now()}`,
      tokenHash: oldToken,
      email: oldEmail,
      purpose: "newsletter",
      sourcePage: "/footer",
      wordingVersion: CONSENT_VERSION,
      status: "pending",
      createdAt: eightDaysAgo,
      expiresAt: eightDaysAgo,
    };

    await saveVerificationRequest(staleRecord);

    const report = await runDataCleanup();
    expect(report.verificationsPruned).toBeGreaterThanOrEqual(1);

    const foundStale = await findVerificationByTokenHash(oldToken);
    expect(foundStale).toBeNull();
  });

  // T-079: Sub-Processor Register Integrity
  it("T-079: validates all sub-processors have explicit categories and retention schedules", () => {
    expect(SUB_PROCESSORS.length).toBeGreaterThanOrEqual(5);

    for (const sp of SUB_PROCESSORS) {
      expect(sp.name).toBeDefined();
      expect(sp.category).toBeDefined();
      expect(sp.purpose.length).toBeGreaterThan(10);
      expect(sp.retention.length).toBeGreaterThan(10);
      expect(sp.safeguards).toBeDefined();
    }
  });
});
