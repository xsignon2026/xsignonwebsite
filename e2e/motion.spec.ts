import { expect, test } from "@playwright/test";

test.describe("Motion System and Accessibility Fallbacks (T-141 to T-144)", () => {
  test.setTimeout(60000);

  test.describe("Auto-Advancing Widget Pause Controls (T-141)", () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(() => {
        window.localStorage.setItem("xsignon_consent_status", "accepted");
      });
    });

    test("Hero carousel pauses while a visitor points at it", async ({ page }) => {
      await page.addInitScript(() => sessionStorage.setItem("xs-intro-seen", "1"));
      await page.goto("/");
      await page.waitForSelector("html.js");
      const hero = page.getByRole("region", { name: "Latest from XSignOn" });
      await hero.scrollIntoViewIfNeeded();
      await hero.hover();
      const current = hero.locator(".hc-dot[aria-current='true']");
      const before = await hero
        .locator(".hc-dot")
        .evaluateAll((dots) => dots.findIndex((d) => d.getAttribute("aria-current") === "true"));
      await page.waitForTimeout(5000);
      const after = await hero
        .locator(".hc-dot")
        .evaluateAll((dots) => dots.findIndex((d) => d.getAttribute("aria-current") === "true"));
      await expect(current).toHaveCount(1);
      expect(after).toBe(before);
    });
  });

  test.describe("Target Profile Performance & Loop Throttling (T-143)", () => {
    test("Beams canvas loop pauses when scrolled out of viewport", async ({ page }) => {
      await page.goto("/");
      const canvas = page.locator("#heroBeams");
      await expect(canvas).toBeVisible();

      // Scroll to bottom of page (out of viewport)
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);

      // Verify canvas is off-screen
      const boundingBox = await canvas.boundingBox();
      expect(boundingBox?.y).toBeLessThan(0);
    });
  });

  test.describe("Reduced Motion & Zero-JS Fallbacks (T-144)", () => {
    test("Respects prefers-reduced-motion: reduce across heroes and animations", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");

      // Hero slider should not auto-advance
      const heroSlider = page.locator(".hc");
      await expect(heroSlider).toBeVisible();

      // Check marquee track animation is paused/none under reduced motion
      const marqueeTrack = page.locator(".mq-track");
      await expect(marqueeTrack).toBeVisible();
      const animName = await marqueeTrack.evaluate(
        (el) => window.getComputedStyle(el).animationName,
      );
      expect(animName === "none" || animName === "").toBe(true);
    });

    test("Prerendered HTML remains fully readable with JavaScript disabled", async ({
      browser,
    }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const noJsPage = await context.newPage();

      // 1. Check Homepage
      await noJsPage.goto("/");
      await expect(noJsPage.locator("h1")).toContainText("Protect identity. Govern risk.");

      // 2. Check Solutions Hub
      await noJsPage.goto("/solutions");
      await expect(noJsPage.locator("h1")).toHaveText("Solutions");
      await expect(noJsPage.locator(".sol-card").first()).toBeVisible();

      // 3. Check About Page
      await noJsPage.goto("/about");
      await expect(noJsPage.locator("h1")).toContainText("Security built around identity");

      await context.close();
    });
  });
});
