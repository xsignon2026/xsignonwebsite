import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// S-19 / T-156: Comprehensive axe accessibility check across all templates and states.
// Must find 0 critical, serious, or moderate violations under WCAG 2.2 AA.
const pages = [
  "/",
  "/about",
  "/about/what-we-do",
  "/about/who-we-are",
  "/about/how-we-work",
  "/enterprise",
  "/careers",
  "/case-studies",
  "/compare",
  "/styleguide",
  "/tokens",
  "/products",
  "/products/postureone",
  "/products/evalone",
  "/products/xsense",
  "/products/keys",
  "/products/ams",
  "/products/compare",
  "/roi",
  "/roi-calculator",
  "/contact",
  "/contact/thank-you",
  "/subscribe/verify",
  "/unsubscribe",
  "/white-papers/zero-trust-posture-guide",
  "/privacy",
  "/terms",
  "/login",
  "/register",
  "/proof",
  "/proof/securing-bank-access-fido2",
  "/proof/passwordless-access-global-healthcare",
  "/proof/biometric-fido2-air-gapped-industrial",
  "/proof/biometric-only-authentication-global-it",
  "/solutions",
  "/solutions/identity-governance",
  "/solutions/ai-and-digital-governance",
  "/solutions/quantum-safe-security",
  "/solutions/business-process",
  "/solutions/enterprise-technology",
  "/thinking",
  "/thinking/identity-first-controls",
  "/thinking/data-and-ai-security",
  "/thinking/modern-micro-segmentation",
  "/thinking/non-human-identities",
  "/thinking/agentic-ai-cybersecurity",
];

for (const path of pages) {
  test(`no accessibility violations on ${path}`, async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(path, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test("no accessibility violations with cookie consent banner active", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const banner = page.locator(
    "#consent-banner, [role='region'][aria-label*='cookie' i], [aria-label*='consent' i]",
  );
  if ((await banner.count()) > 0) {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
});
