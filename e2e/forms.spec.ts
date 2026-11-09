import { test, expect } from "@playwright/test";

test.describe("E2E: Forms & Lead Capture", () => {
  test("renders contact form with all required inputs and honeypot", async ({ page }) => {
    await page.goto("/contact");

    const form = page.locator("form").first();
    await expect(form).toBeVisible();

    await expect(form.locator('input[name="name"]')).toBeVisible();
    await expect(form.locator('input[name="email"]')).toBeVisible();
    await expect(form.locator('input[name="company"]')).toBeVisible();
    await expect(form.locator('select[name="reason"]')).toBeVisible();
    await expect(form.locator('textarea[name="message"]')).toBeVisible();

    // Verify honeypot is hidden from sighted users
    const honeypot = form.locator('input[name="hp_check"]');
    await expect(honeypot).toBeAttached();
  });

  test("validates required fields on empty submit", async ({ page }) => {
    await page.goto("/contact");

    const form = page.locator("form").first();
    const submitBtn = form.locator('button[type="submit"]');
    await submitBtn.click();

    // Field errors or aria-invalid should appear
    const invalidFields = form.locator('[aria-invalid="true"]');
    await expect(invalidFields.first()).toBeVisible();
  });

  test("rejects invalid business email formats", async ({ page }) => {
    await page.goto("/contact");

    const form = page.locator("form").first();
    await form.locator('input[name="name"]').fill("Test User");
    await form.locator('input[name="email"]').fill("not-an-email");
    await form.locator('input[name="company"]').fill("Acme Corp");
    await form.locator('select[name="reason"]').selectOption({ index: 1 });
    await form.locator('textarea[name="message"]').fill("Interested in PostureOne demo.");

    const submitBtn = form.locator('button[type="submit"]');
    await submitBtn.click();

    await expect(form.locator('input[name="email"]')).toHaveAttribute("aria-invalid", "true");
  });
});
