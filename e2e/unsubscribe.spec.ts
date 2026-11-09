import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("T-070: Unsubscribe Flow (#view-unsubscribe)", () => {
  test("visitor submits unsubscribe request and receives confirmation", async ({ page }) => {
    // 1. Visit Unsubscribe Page
    await page.goto("/unsubscribe", { waitUntil: "networkidle" });

    // Validate WCAG AA
    const a11y = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(a11y.violations).toEqual([]);

    // Check Hero
    const heading = page.locator("h1");
    await expect(heading).toContainText("Unsubscribe");

    // The server answer is faked: the real route is tested in src/tests/subscription-routes.test.ts.
    await page.route("**/api/unsubscribe", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "If that address is subscribed, we have emailed it a link to confirm removal.",
        }),
      }),
    );

    // 2. Fill in Email
    await page.fill("input#unEmail", "optout-user@company.com");

    // 3. Submit Form
    const submitBtn = page.getByRole("button", { name: "Unsubscribe" });
    await submitBtn.click();

    // 4. Verify Request Confirmed State
    const doneContainer = page.locator("#unsubDone");
    await expect(doneContainer).toBeVisible();
    await expect(doneContainer).toContainText("Request confirmed.");
    await expect(doneContainer).toContainText("we have emailed it a link to confirm removal");
  });
});
