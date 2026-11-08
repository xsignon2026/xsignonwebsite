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

    // 2. Fill in Email
    await page.fill("input#unEmail", "optout-user@company.com");

    // 3. Submit Form
    const submitBtn = page.getByRole("button", { name: "Unsubscribe" });
    await submitBtn.click();

    // 4. Verify Request Confirmed State
    const doneContainer = page.locator("#unsubDone");
    await expect(doneContainer).toBeVisible();
    await expect(doneContainer).toContainText("Request confirmed.");
    await expect(doneContainer).toContainText(
      "The address you entered has been recorded for removal from XSignOn marketing emails."
    );
  });
});
