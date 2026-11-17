import { test, expect } from "@playwright/test";

const BREAKPOINTS = [
  { name: "mobile", width: 375, height: 667 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
];

const KEY_PAGES = [
  { name: "homepage", path: "/" },
  { name: "products", path: "/products" },
  { name: "postureone", path: "/products/postureone" },
  { name: "zero-trust", path: "/solutions/zero-trust" },
  { name: "proof", path: "/proof" },
  { name: "thinking", path: "/thinking" },
  { name: "roi", path: "/roi" },
  { name: "contact", path: "/contact" },
];

test.describe("Visual Regression: Key Pages at 3 Breakpoints", () => {
  for (const bp of BREAKPOINTS) {
    test.describe(`${bp.name} (${bp.width}px)`, () => {
      test.use({ viewport: { width: bp.width, height: bp.height } });

      for (const p of KEY_PAGES) {
        test(`visual snapshot: ${p.name}`, async ({ page }) => {
          await page.goto(p.path, { waitUntil: "domcontentloaded" });

          // Wait for fonts to stabilize
          await page.evaluate(async () => {
            await document.fonts.ready;
          });

          // Mask dynamic animated beam canvases or videos if present to prevent flaky diffs
          const maskElements = [
            page.locator("canvas"),
            page.locator(".hero-beam-canvas"),
            page.locator("[data-marquee]"),
          ];

          await expect(page).toHaveScreenshot(`${p.name}-${bp.name}.png`, {
            fullPage: false,
            mask: maskElements,
            maxDiffPixelRatio: 0.02,
          });
        });
      }
    });
  }
});
