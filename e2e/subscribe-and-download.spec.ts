import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { generateVerificationToken } from "../src/lib/verification/tokens";
import { saveVerificationRequest } from "../src/lib/verification/store";
import { generateUnsubscribeToken } from "../src/lib/newsletter/tokens";
import { CONSENT_VERSION } from "../src/lib/consent/wording";

test.describe("Epic E04: Subscribe, White Paper & Unsubscribe E2E Journeys", () => {
  test("Subscribe block (.news-band) in footer submits and shows check-email state", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const newsBand = page.locator(".news-band");
    await expect(newsBand).toBeVisible();

    const emailInput = newsBand.locator('input[type="email"]');
    const consentCheckbox = newsBand.locator('input[type="checkbox"]');
    const submitBtn = newsBand.locator('button[type="submit"]');

    const testEmail = `footer-test-${Date.now()}@example.org`;

    await emailInput.fill(testEmail);
    await consentCheckbox.check();
    await submitBtn.click();

    // Verify confirmation container appears (.news-done)
    const doneBox = newsBand.locator(".news-done");
    await expect(doneBox).toBeVisible({ timeout: 10000 });
    await expect(doneBox).toContainText("Check your email");
    await expect(doneBox).toContainText(testEmail);
  });

  test("White paper detail page renders gated form and passes WCAG 2.2 AA", async ({ page }) => {
    await page.goto("/white-papers/zero-trust-posture-guide");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText(
      "Zero-Trust Device & Cloud Security Posture Guide",
    );

    // Form interaction (scoped to gated download panel)
    const emailInput = page.locator('.lg\\:sticky input[type="email"]');
    const consentCheckbox = page.locator('.lg\\:sticky input[type="checkbox"]');
    const submitBtn = page.locator('.lg\\:sticky button[type="submit"]');

    const testEmail = `wp-lead-${Date.now()}@company.com`;
    await emailInput.fill(testEmail);
    await consentCheckbox.check();
    await submitBtn.click();

    await expect(page.locator("text=Check your email")).toBeVisible({ timeout: 10000 });

    // Accessibility validation
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .exclude(".sanity-studio")
      .analyze();

    expect(axeResults.violations).toEqual([]);
  });

  test("Verification page renders success state for verified white paper request", async ({
    page,
  }) => {
    const testEmail = `verified-wp-${Date.now()}@example.com`;
    const tokenData = generateVerificationToken();
    const id = `ver_e2e_wp_${Date.now()}`;

    await saveVerificationRequest({
      id,
      tokenHash: tokenData.tokenHash,
      email: testEmail,
      purpose: "whitepaper_download",
      targetSlug: "zero-trust-posture-guide",
      sourcePage: "/white-papers/zero-trust-posture-guide",
      wordingVersion: CONSENT_VERSION,
      status: "pending",
      createdAt: new Date().toISOString(),
      expiresAt: tokenData.expiresAt,
    });

    await page.goto(
      `/subscribe/verify?token=${tokenData.rawToken}&email=${encodeURIComponent(testEmail)}`,
    );
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h2")).toContainText("Verification confirmed");
    await expect(page.locator('a:has-text("Download PDF")')).toBeVisible();

    // Verify accessibility of confirmation screen
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();

    expect(axeResults.violations).toEqual([]);
  });

  test("Verification page handles expired tokens and displays re-request form", async ({
    page,
  }) => {
    const testEmail = `expired-e2e-${Date.now()}@example.com`;
    const tokenData = generateVerificationToken();
    const pastExpiresAt = new Date(Date.now() - 25 * 3600 * 1000).toISOString();
    const id = `ver_e2e_exp_${Date.now()}`;

    await saveVerificationRequest({
      id,
      tokenHash: tokenData.tokenHash,
      email: testEmail,
      purpose: "newsletter",
      sourcePage: "/footer",
      wordingVersion: CONSENT_VERSION,
      status: "pending",
      createdAt: pastExpiresAt,
      expiresAt: pastExpiresAt,
    });

    await page.goto(
      `/subscribe/verify?token=${tokenData.rawToken}&email=${encodeURIComponent(testEmail)}`,
    );
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h2")).toContainText("Verification link expired");
    await expect(page.locator('button:has-text("Send new verification link")')).toBeVisible();
  });

  test("One-click unsubscribe endpoint redirects to confirmation screen", async ({ page }) => {
    const testEmail = `oneclick-e2e-${Date.now()}@domain.org`;
    const token = generateUnsubscribeToken(testEmail);

    await page.goto(
      `/api/unsubscribe/one-click?email=${encodeURIComponent(testEmail)}&token=${token}`,
    );
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/.*\/unsubscribe\?status=confirmed/);
    await expect(page.locator("text=Request confirmed")).toBeVisible();
    await expect(page.locator("#unsubDone")).toContainText(
      "The address you entered has been recorded for removal",
    );
  });
});
