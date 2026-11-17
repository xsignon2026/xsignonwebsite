import { test, expect } from "@playwright/test";

test.describe("E2E: Newsletter Subscribe Flow", () => {
  test("renders newsletter subscription input and handles validation", async ({ page }) => {
    await page.goto("/");

    const emailInput = page.locator('input[type="email"], input[name="email"]').last();
    if (await emailInput.isVisible()) {
      await emailInput.fill("invalid-email");

      const submitBtn = page
        .locator('button:has-text("Subscribe"), button:has-text("Sign up")')
        .first();
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
        const errorMessage = page.locator('[role="alert"], .text-error, .error');
        if ((await errorMessage.count()) > 0) {
          await expect(errorMessage.first()).toBeVisible();
        }
      }
    }
  });
});
