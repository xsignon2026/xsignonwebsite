import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Tools & Utility Batch QA (T-136)", () => {
  test.setTimeout(60000);

  test.describe("ROI Calculator (/roi-calculator)", () => {
    test.beforeEach(async ({ page }) => {
      // Clear consent to prevent banner overlapping clicks
      await page.addInitScript(() => {
        window.localStorage.setItem("xsignon_consent_status", "accepted");
      });
      await page.goto("/roi-calculator");
    });

    test("renders header, hero, and interactive calculation fields", async ({ page }) => {
      const h1 = page.locator("h1");
      await expect(h1).toHaveText("ROI Calculator");

      const staffInput = page.locator("#roiStaff");
      const resetsInput = page.locator("#roiResets");
      const minsInput = page.locator("#roiMins");
      const rateInput = page.locator("#roiRate");

      await expect(staffInput).toHaveValue("500");
      await expect(resetsInput).toHaveValue("4");
      await expect(minsInput).toHaveValue("20");
      await expect(rateInput).toHaveValue("45");

      // Verify default calculated output: $30,000, 2000 resets, 667 hours
      await expect(page.locator("#roiCost")).toHaveText("$30,000");
      await expect(page.locator("#roiN")).toHaveText("2,000");
      await expect(page.locator("#roiH")).toHaveText("667");
    });

    test("updates live calculated output when inputs change", async ({ page }) => {
      const staffInput = page.locator("#roiStaff");
      await staffInput.fill("1000");

      // 1000 staff * 4 resets = 4,000 resets
      // 4000 * 20 / 60 = 1,333 hours
      // 1333 * $45 = $60,000
      await expect(page.locator("#roiCost")).toHaveText("$60,000");
      await expect(page.locator("#roiN")).toHaveText("4,000");
      await expect(page.locator("#roiH")).toHaveText("1,333");
    });

    test("redirects /roi and /products/roi to /roi-calculator", async ({ page }) => {
      await page.goto("/roi");
      await expect(page).toHaveURL(/\/roi-calculator$/);

      await page.goto("/products/roi");
      await expect(page).toHaveURL(/\/roi-calculator$/);
    });

    test("satisfies WCAG 2.2 AA accessibility requirements", async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  });

  test.describe("Privacy & Terms Pages (/privacy, /terms)", () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(() => {
        window.localStorage.setItem("xsignon_consent_status", "accepted");
      });
    });

    test("renders Privacy page with legal sections and timestamp", async ({ page }) => {
      await page.goto("/privacy");
      await expect(page.locator("h1")).toHaveText("Privacy Policy");
      await expect(page.locator(".pmeta")).toContainText("Updated January 2026");

      await expect(page.getByRole("heading", { name: "Information we collect" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "How we use information" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Sharing and disclosure" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Your rights" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });

    test("renders Terms page with legal sections and timestamp", async ({ page }) => {
      await page.goto("/terms");
      await expect(page.locator("h1")).toHaveText("Terms");
      await expect(page.locator(".pmeta")).toContainText("Updated January 2026");

      await expect(page.getByRole("heading", { name: "Use of the site" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Products and services" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Intellectual property" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Limitation of liability" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  });

  test.describe("404 and Error Recovery (/not-found)", () => {
    test("returns 404 HTTP status code and recovery navigation for unmatched paths", async ({
      page,
    }) => {
      const response = await page.goto("/non-existent-page-route-random-404");
      expect(response?.status()).toBe(404);

      const view404 = page.locator("#view-404");
      await expect(view404.locator("h1")).toHaveText("This page has moved.");
      await expect(view404.getByRole("link", { name: /Back to home/i })).toBeVisible();
      await expect(view404.getByRole("link", { name: "Our products" })).toBeVisible();
      await expect(view404.getByRole("link", { name: "Contact us" })).toBeVisible();
    });
  });

  test.describe("Consent Banner (T-135)", () => {
    test("displays on fresh visit, accepts consent, and remains hidden on subsequent visits", async ({
      page,
    }) => {
      // Clear storage
      await page.goto("/");
      await page.evaluate(() => window.localStorage.clear());
      await page.reload();

      const banner = page.getByRole("region", { name: "Cookie consent" });
      await expect(banner).toBeVisible();

      // Click Accept All
      const acceptBtn = banner.getByRole("button", { name: "Accept All" });
      await acceptBtn.click();

      // Banner should disappear
      await expect(banner).toBeHidden();

      // Check localStorage
      const status = await page.evaluate(() =>
        window.localStorage.getItem("xsignon_consent_status"),
      );
      expect(status).toBe("accepted");

      // Reload - banner stays hidden
      await page.reload();
      await expect(page.getByRole("region", { name: "Cookie consent" })).toBeHidden();
    });
  });

  test.describe("Mobile 320px Responsiveness Check", () => {
    test("does not introduce horizontal overflow at 320px viewport", async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 640 });

      for (const route of ["/roi-calculator", "/privacy", "/terms"]) {
        await page.goto(route);
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        expect(hasOverflow, `Horizontal scroll detected on ${route} at 320px`).toBe(false);
      }
    });
  });
});
