import { describe, expect, it } from "vitest";
import { checkSubscribeRateLimit } from "../lib/subscribe/rate-limit";
import { renderVerificationEmail } from "../lib/email/templates/verification-email";
import {
  syncVerifiedSubscriber,
  unsubscribeEmail,
  isSuppressed,
  getActiveSubscribers,
} from "../lib/newsletter/provider";

describe("T-067: Subscribe Rate Limiting", () => {
  it("enforces max requests per IP", () => {
    const ip = `10.0.0.${Math.floor(Math.random() * 1000)}`;
    const email = "user@test.com";
    const now = Date.now();

    for (let i = 0; i < 5; i++) {
      expect(checkSubscribeRateLimit(ip, `${i}-${email}`, now).allowed).toBe(true);
    }

    // 6th request from same IP is blocked
    const blocked = checkSubscribeRateLimit(ip, "another@test.com", now);
    expect(blocked.allowed).toBe(false);
    expect(blocked.reason).toBe("ip_limit");
  });

  it("enforces max requests per email address", () => {
    const email = `target-${Date.now()}@domain.com`;
    const now = Date.now();

    for (let i = 0; i < 3; i++) {
      expect(checkSubscribeRateLimit(`192.168.2.${i}`, email, now).allowed).toBe(true);
    }

    // 4th request for same email is blocked even with different IP
    const blocked = checkSubscribeRateLimit("192.168.2.99", email, now);
    expect(blocked.allowed).toBe(false);
    expect(blocked.reason).toBe("email_limit");
  });
});

describe("T-068: Verification Email Templates", () => {
  it("renders compliant HTML and plain text with HTTPS link", () => {
    const rendered = renderVerificationEmail({
      email: "reader@enterprise.com",
      rawToken: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      purpose: "newsletter",
      baseUrl: "http://xsignon.com", // should be upgraded to https
    });

    // Verification link must be HTTPS
    expect(rendered.verificationUrl.startsWith("https://")).toBe(true);
    expect(rendered.verificationUrl).toContain("token=0123456789abcdef");

    // Both HTML and Plain text are rendered
    expect(rendered.html).toContain("<!DOCTYPE html>");
    expect(rendered.html).toContain("XSignOn");
    expect(rendered.html).toContain("Confirm Subscription");
    expect(rendered.text).toContain("Confirm your subscription");
    expect(rendered.text).toContain(rendered.verificationUrl);
  });
});

describe("T-070: Newsletter Provider & Suppression Management", () => {
  const testEmail = `subscriber-${Date.now()}@xsignon.test`;

  it("adds verified contact and handles duplicates idempotently", async () => {
    const initialResult = await syncVerifiedSubscriber({
      email: testEmail,
      consentDate: new Date().toISOString(),
      source: "/thinking",
      wordingVersion: "v2-2026-04",
      tags: ["newsletter"],
    });

    expect(initialResult.success).toBe(true);
    expect(initialResult.id).toBeTruthy();

    const activeList = await getActiveSubscribers();
    const countBefore = activeList.filter((s) => s.email === testEmail).length;
    expect(countBefore).toBe(1);

    // Duplicate sync should not create a duplicate row
    const dupResult = await syncVerifiedSubscriber({
      email: testEmail,
      consentDate: new Date().toISOString(),
      source: "/thinking",
      wordingVersion: "v2-2026-04",
      tags: ["newsletter", "updated"],
    });

    expect(dupResult.success).toBe(true);
    expect(dupResult.id).toBe(initialResult.id);

    const activeListAfter = await getActiveSubscribers();
    const countAfter = activeListAfter.filter((s) => s.email === testEmail).length;
    expect(countAfter).toBe(1);
  });

  it("handles unsubscribe and updates suppression list", async () => {
    expect(await isSuppressed(testEmail)).toBe(false);

    await unsubscribeEmail(testEmail, "User requested removal");
    expect(await isSuppressed(testEmail)).toBe(true);

    // After unsubscribe, contact is no longer in active subscribers
    const active = await getActiveSubscribers();
    expect(active.some((s) => s.email === testEmail)).toBe(false);

    // Attempting to re-add suppressed email fails unless un-suppressed
    const reAdd = await syncVerifiedSubscriber({
      email: testEmail,
      consentDate: new Date().toISOString(),
      source: "/thinking",
      wordingVersion: "v2-2026-04",
      tags: ["newsletter"],
    });
    expect(reAdd.success).toBe(false);
  });
});
