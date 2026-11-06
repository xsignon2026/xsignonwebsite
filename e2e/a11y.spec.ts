import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// S-19 sample accessibility check: axe must find no WCAG 2.2 AA violations on these pages.
// Add every new page template to this list as it is built.
const pages = [
  "/",
  "/styleguide",
  "/tokens",
  "/products",
  "/products/postureone",
  "/products/evalone",
  "/products/xsense",
  "/products/keys",
  "/products/ams",
  "/products/compare",
  "/contact",
  "/contact/thank-you",
  "/subscribe/verify",
  "/unsubscribe",
  "/white-papers/zero-trust-posture-guide",
  "/privacy",
  "/proof",
  "/proof/securing-bank-access-fido2",
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
