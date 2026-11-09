import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("T-061: First Customer Journey (Product Discovery -> Inquiry -> Thank You)", () => {
  test.setTimeout(60000);

  test("visitor discovers PostureOne, navigates to inquiry, and submits successfully", async ({
    page,
  }) => {
    // The server answer is faked so no database is needed; the real route is tested in src/tests.
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: {
          "set-cookie": "contact_sent=1; Path=/contact; Max-Age=600; HttpOnly; SameSite=Lax",
        },
        body: JSON.stringify({ ok: true }),
      }),
    );

    // 1. Visit Product Page
    await page.goto("/products/postureone", { waitUntil: "networkidle" });

    // Validate WCAG AA on product page
    const productA11y = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(productA11y.violations).toEqual([]);

    // Check Hero and Primary CTA
    const heading = page.locator("h1");
    await expect(heading).toContainText("PostureOne");

    const primaryCta = page.getByRole("link", { name: "Book a strategy call" });
    await expect(primaryCta).toBeVisible();

    // 2. Click CTA to initiate inquiry
    await primaryCta.click();
    await page.waitForURL("**/contact**");

    // Select Reason
    await page.selectOption("select#cfReason", "strategy-call");

    // 3. Fill in Contact Form
    await page.fill("input#cfName", "Jordan Lee");
    await page.fill("input#cfEmail", "jordan.lee@cyberguard.net");
    await page.fill("input#cfCompany", "CyberGuard Solutions");
    await page.fill(
      "textarea#cfMsg",
      "Requesting technical architecture review for zero-trust posture.",
    );

    // 4. Wait for minimum human interaction time (the server drops forms sent faster than a person could)
    await page.waitForTimeout(1600);

    // 5. Submit Contact Form
    const submitBtn = page.getByRole("button", { name: /Send message/i });
    await submitBtn.click();

    // 5. Assert Redirection to Thank You Page
    await page.waitForURL("**/contact/thank-you**");
    await page.waitForLoadState("networkidle");
    const thankYouHeading = page.getByRole("heading", { level: 1 });
    await expect(thankYouHeading).toHaveText("Thank you.");

    // Allow CSS theme transition (200ms) to settle before running axe
    await page.waitForTimeout(300);

    // Validate WCAG AA on thank you page
    const thankYouA11y = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(thankYouA11y.violations).toEqual([]);
  });
});
