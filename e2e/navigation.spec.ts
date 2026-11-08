import { test, expect } from "@playwright/test";

test.describe("E2E: Navigation Flow", () => {
  test("loads the homepage and displays main navigation header", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/XSignOn/);

    const nav = page.locator("nav, header");
    await expect(nav.first()).toBeVisible();
  });

  test("navigates across primary header links", async ({ page }) => {
    await page.goto("/");

    // Navigate to Products
    const productsLink = page.locator('header a[href="/products"]').first();
    if (await productsLink.isVisible()) {
      await productsLink.click();
      await expect(page).toHaveURL(/\/products/);
      await expect(page.locator("h1").first()).toBeVisible();
    }

    // Navigate to Contact
    const contactLink = page.locator('header a[href="/contact"], a[href="/contact"]').first();
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await expect(page).toHaveURL(/\/contact/);
      await expect(page.locator("h1").first()).toBeVisible();
    }
  });

  test("displays footer with valid navigation links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    const privacyLink = footer.locator('a[href="/privacy"]');
    await expect(privacyLink).toBeVisible();

    const termsLink = footer.locator('a[href="/terms"]');
    await expect(termsLink).toBeVisible();
  });
});
