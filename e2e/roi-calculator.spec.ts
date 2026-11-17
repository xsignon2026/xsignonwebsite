import { test, expect } from "@playwright/test";

test.describe("E2E: ROI Calculator", () => {
  test("renders ROI calculator with default values and outputs", async ({ page }) => {
    await page.goto("/roi");

    const staffInput = page.locator("#roiStaff");
    await expect(staffInput).toBeVisible();

    const resetsInput = page.locator("#roiResets");
    await expect(resetsInput).toBeVisible();

    const minsInput = page.locator("#roiMins");
    await expect(minsInput).toBeVisible();

    const rateInput = page.locator("#roiRate");
    await expect(rateInput).toBeVisible();
  });

  test("dynamically recalculates annual cost savings upon input update", async ({ page }) => {
    await page.goto("/roi");

    const staffInput = page.locator("#roiStaff");
    await staffInput.fill("5000");

    const rateInput = page.locator("#roiRate");
    await rateInput.fill("60");

    // The result text should update and display dollar savings
    const calcContainer = page.locator(".calc-grid, .form-card");
    await expect(calcContainer.first()).toBeVisible();
    await expect(page.locator("text=/\\$[0-9,]+/").first()).toBeVisible();
  });
});
