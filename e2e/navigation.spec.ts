import AxeBuilder from "@axe-core/playwright";
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

  test.describe("menus", () => {
    test("a menu opens as a wide panel, closes with Escape, and the pages in it work", async ({
      page,
    }) => {
      await page.goto("/");
      const trigger = page.getByRole("button", { name: "Products" });
      await expect(trigger).toHaveAttribute("aria-expanded", "false");

      await trigger.click();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      const panel = page.locator("#" + (await trigger.getAttribute("aria-controls")));
      await expect(panel).toBeVisible();
      await expect(panel.getByRole("link", { name: /PostureOne/ })).toBeVisible();
      await expect(panel.getByRole("link", { name: /All products/ })).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await expect(panel).toBeHidden();

      await trigger.click();
      await panel.getByRole("link", { name: /^EvalOne/ }).click();
      await expect(page).toHaveURL(/\/products\/evalone/);
      // going to another page closes the menu
      await expect(page.getByRole("button", { name: "Products" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    test("only one menu is open at a time, and a click elsewhere closes it", async ({ page }) => {
      await page.goto("/");
      const products = page.getByRole("button", { name: "Products" });
      const resources = page.getByRole("button", { name: "Resources" });
      await products.click();
      await resources.click();
      await expect(products).toHaveAttribute("aria-expanded", "false");
      await expect(resources).toHaveAttribute("aria-expanded", "true");
      await page.locator("main").click({ position: { x: 5, y: 400 } });
      await expect(resources).toHaveAttribute("aria-expanded", "false");
    });

    test("the open menu has no accessibility problems", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/about");
      await page.getByRole("button", { name: "Resources" }).click();
      const results = await new AxeBuilder({ page })
        .include("#siteHeader")
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });

    test("on a phone the menu is a card with one row per menu", async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 800 });
      await page.goto("/");
      await page.getByRole("button", { name: "Open menu" }).click();
      const products = page.getByRole("button", { name: "Products" });
      await products.click();
      await expect(products).toHaveAttribute("aria-expanded", "true");
      await expect(
        page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "PostureOne" }),
      ).toBeVisible();
      await page.getByRole("button", { name: "Close menu" }).click();
      await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
    });
  });
});
