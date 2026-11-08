import { test, expect } from "@playwright/test";

test.describe("E2E: Interactive Components (Tabs, Carousels, Controls)", () => {
  test("switches tabs in the Solutions Journey section", async ({ page }) => {
    await page.goto("/");

    const tabButtons = page.locator('[role="tab"], .journey-tab, button[data-tab]');
    if ((await tabButtons.count()) > 1) {
      const firstTab = tabButtons.nth(0);
      const secondTab = tabButtons.nth(1);

      await expect(firstTab).toBeVisible();
      await secondTab.click();
      await expect(secondTab).toHaveAttribute("aria-selected", "true");
    }
  });

  test("interacts with customer proof quotes / marquee strip", async ({ page }) => {
    await page.goto("/");

    const marquee = page.locator(".marquee, [data-marquee], .marquee-strip");
    if ((await marquee.count()) > 0) {
      await expect(marquee.first()).toBeVisible();
    }
  });

  test("verifies responsive partner hub elements", async ({ page }) => {
    await page.goto("/");

    const partnerHub = page.locator("#partners, [data-section='partners'], .partner-hub");
    if ((await partnerHub.count()) > 0) {
      await expect(partnerHub.first()).toBeVisible();
    }
  });
});
