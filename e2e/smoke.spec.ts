import { expect, test } from "@playwright/test";

// S-19 sample end-to-end test: the site loads, is hidden from search outside production,
// and sends a Content Security Policy that blocks plugins.
test("home page loads with safe headers and noindex", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/XSignOn/);

  const csp = response?.headers()["content-security-policy"] ?? "";
  expect(csp).toContain("object-src 'none'");

  const robots = await page.locator('meta[name="robots"]').getAttribute("content");
  expect(robots).toContain("noindex");
});

test("robots.txt disallows everything outside production", async ({ request }) => {
  const body = await (await request.get("/robots.txt")).text();
  expect(body).toContain("Disallow: /");
});
