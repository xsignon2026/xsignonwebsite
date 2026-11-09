import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Company Batch QA (T-129)", () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("xsignon_consent_status", "accepted");
    });
  });

  test.describe("About Page (/about)", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/about");
    });

    test("renders the hero and the five sections of the approved design", async ({ page }) => {
      await expect(page.locator("h1")).toContainText("About XSignOn");
      for (const id of ["who", "what", "how", "why", "a-thinking"]) {
        await expect(page.locator(`#${id}`)).toBeAttached();
      }
      await expect(page.getByRole("heading", { name: "Who we are", level: 2 })).toBeVisible();
    });

    test("expanding What We Do cards toggle aria-expanded properly", async ({ page }) => {
      const firstCardBtn = page.getByRole("button", { name: /Identity governance/i });
      await expect(firstCardBtn).toBeVisible();
      await expect(firstCardBtn).toHaveAttribute("aria-expanded", "false");

      await firstCardBtn.click();
      await expect(firstCardBtn).toHaveAttribute("aria-expanded", "true");

      const panel = page.locator("#wc-0");
      await expect(panel).toBeVisible();
      await expect(panel.getByRole("link", { name: /View more/i })).toBeVisible();
    });

    test("Why XSignOn hub rotates and switches tabs", async ({ page }) => {
      // Verify tabs switch active selection
      const tab2 = page.getByRole("tab", { name: /Autonomy within authority/i });
      await tab2.click();
      await expect(tab2).toHaveAttribute("aria-selected", "true");
    });

    test("satisfies WCAG 2.2 AA accessibility requirements", async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  });

  test.describe("Enterprise Page (/enterprise)", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/enterprise");
    });

    test("renders enterprise headline, dashboard preview, and deployment models", async ({
      page,
    }) => {
      await expect(page.locator("h1")).toContainText("Every identity. Fully in control.");
      await expect(page.getByText("command.xsignon.app")).toBeVisible();
      await expect(page.getByRole("heading", { name: "Deployment models" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Standards posture" })).toBeVisible();
    });

    test("satisfies WCAG 2.2 AA accessibility requirements", async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  });

  test.describe("Careers Page (/careers)", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/careers");
    });

    test("renders open positions and application buttons", async ({ page }) => {
      await expect(page.locator("h1")).toContainText("Careers");
      await expect(page.getByRole("heading", { name: "Security Engineer" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "AI Governance Analyst" })).toBeVisible();

      const generalApp = page.getByRole("link", { name: "Contact us about careers" });
      await expect(generalApp).toBeVisible();
      await expect(generalApp).toHaveAttribute("href", "/contact?reason=Careers");
    });

    test("embeds valid JobPosting JSON-LD for search engine indexing", async ({ page }) => {
      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonLdScripts.count();
      expect(count).toBeGreaterThanOrEqual(2);

      let foundSecEng = false;
      for (let i = 0; i < count; i++) {
        const text = await jsonLdScripts.nth(i).textContent();
        if (text && text.includes("Security Engineer")) {
          // A page may carry one posting or a list of them.
          const parsed = [JSON.parse(text)]
            .flat()
            .find((item: { title?: string }) => item.title === "Security Engineer");
          expect(parsed["@type"]).toBe("JobPosting");
          expect(parsed.title).toBe("Security Engineer");
          expect(parsed.hiringOrganization.name).toBe("XSignOn");
          foundSecEng = true;
          break;
        }
      }
      expect(foundSecEng).toBe(true);
    });

    test("satisfies WCAG 2.2 AA accessibility requirements", async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  });

  test.describe("Mobile 320px Responsiveness Check", () => {
    test("does not introduce horizontal overflow at 320px viewport", async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 640 });

      for (const route of ["/about", "/enterprise", "/careers"]) {
        await page.goto(route);
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        expect(hasOverflow, `Horizontal scroll detected on ${route} at 320px`).toBe(false);
      }
    });
  });
});
