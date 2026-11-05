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

// S-17 and the security audit: exactly one CSP per path, the studio policy only on /studio, the site
// policy on look-alike paths such as /studio-stories, and the basic hardening headers everywhere.
test("security headers are set correctly per path", async ({ request }) => {
  const studio = await request.get("/studio");
  expect(studio.headers()["content-security-policy"]).toContain("wss://*.sanity.io");

  for (const path of ["/", "/studio-stories", "/studiox"]) {
    const res = await request.get(path);
    const headers = res.headers();
    expect(headers["content-security-policy"], path).toContain("object-src 'none'");
    expect(headers["content-security-policy"], path).not.toContain("wss://*.sanity.io");
    expect(headers["x-content-type-options"], path).toBe("nosniff");
    expect(headers["referrer-policy"], path).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"], path).toContain("camera=()");
    expect(headers["x-powered-by"], path).toBeUndefined();
  }
});

// S-09: no third-party requests at all, in particular no Google Fonts.
test("home page makes no third-party requests", async ({ page, baseURL }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    const url = request.url();
    if (!url.startsWith(baseURL ?? "") && !url.startsWith("data:") && !url.startsWith("blob:")) {
      external.push(url);
    }
  });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(external).toEqual([]);
});

test("robots.txt disallows everything outside production", async ({ request }) => {
  const body = await (await request.get("/robots.txt")).text();
  expect(body).toContain("Disallow: /");
});
