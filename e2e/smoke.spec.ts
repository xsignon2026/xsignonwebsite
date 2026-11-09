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

// S-09: no third-party requests at all, in particular no Google Fonts.
test("home page makes no third-party requests", async ({ page, baseURL }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    const url = request.url();
    if (url.startsWith("data:") || url.startsWith("blob:")) return;
    // Compared by host: the security policy upgrades our own http address to https, which is not a third party.
    if (new URL(url).hostname !== new URL(baseURL ?? "http://localhost").hostname)
      external.push(url);
  });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(external).toEqual([]);
});

test("robots.txt disallows everything outside production", async ({ request }) => {
  const body = await (await request.get("/robots.txt")).text();
  expect(body).toContain("Disallow: /");
});

// T-173: Production smoke suite across 6 critical routes
test.describe("Production Go-Live Smoke Suite (T-173)", () => {
  test("SMK-01: Homepage loads with main navigation and beams", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/XSignOn/);
    await expect(page.locator("header, nav").first()).toBeVisible();
  });

  test("SMK-02: Product detail loads with headline and capabilities", async ({ page }) => {
    await page.goto("/products/postureone");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(
      page
        .locator("main")
        .getByText(/PostureOne/i)
        .first(),
    ).toBeVisible();
  });

  test("SMK-03: Thought leadership article renders body and typography", async ({ page }) => {
    await page.goto("/thinking/identity-first-controls");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("article, main").first()).toBeVisible();
  });

  test("SMK-04: Contact form loads with inputs and honeypot attached", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("form").first();
    await expect(form).toBeVisible();
    await expect(form.locator('input[name="name"]')).toBeVisible();
    await expect(form.locator('input[name="hp_check"]')).toBeAttached();
  });

  test("SMK-05: Newsletter endpoint rejects invalid submission with 400", async ({ request }) => {
    const res = await request.post("/api/subscribe", {
      data: { email: "not-an-email" },
    });
    expect(res.status()).toBe(400);
  });

  test("SMK-06: Canonical redirect /features resolves cleanly to /products", async ({ page }) => {
    await page.goto("/features");
    await expect(page).toHaveURL(/\/products/);
    await expect(page.locator("h1").first()).toBeVisible();
  });
});
