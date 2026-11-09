import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Epic E05: Products Hub & Detail Pages (T-082 to T-089)", () => {
  test("T-082: Products overview hub renders interactive comparison and tablist", async ({
    page,
  }) => {
    await page.goto("/products");
    await page.waitForLoadState("networkidle");

    // 1. Verify heading and breadcrumbs
    await expect(page.locator("h1")).toContainText("Our products");
    await expect(page.getByRole("navigation", { name: /Breadcrumb/i })).toBeVisible();

    // 2. Verify interactive table selection counter
    const countEl = page.locator("#ovCount");
    await expect(countEl).toContainText("3 of 3 selected");

    // 3. Remove a product from comparison table
    const removeXSenseBtn = page.locator('th[scope="col"] button:has-text("Remove")').nth(1);
    await removeXSenseBtn.click();

    await expect(countEl).toContainText("2 of 3 selected");
    await expect(page.locator("#ovAddback")).toBeVisible();
    await expect(page.locator('button:has-text("Add XSense")')).toBeVisible();

    // 4. Restore the removed product
    await page.locator('button:has-text("Add XSense")').click();
    await expect(countEl).toContainText("3 of 3 selected");

    // 5. Verify keyboard navigation on platform tablist
    const tab0 = page.locator("#ptab-0");
    await tab0.focus();
    await expect(tab0).toHaveAttribute("aria-selected", "true");

    // ArrowRight to next tab (Passwordless Keys)
    await tab0.press("ArrowRight");
    const tab1 = page.locator("#ptab-1");
    await expect(tab1).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#ppanel-1")).toBeVisible();
    await expect(page.locator("#ppanel-1 h3")).toContainText("Passwordless Keys");

    // Verify axe-core WCAG 2.2 AA
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-083: EvalOne page renders evaluation checklist, capability cards, and spec table", async ({
    page,
  }) => {
    await page.goto("/products/evalone");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText("EvalOne");
    await expect(page.locator('[aria-label="Evaluation checklist"]')).toBeVisible();
    await expect(page.locator("text=AI use inventory across teams")).toBeVisible();
    await expect(page.locator("text=What EvalOne covers")).toBeVisible();
    await expect(page.locator("table")).toBeVisible();
    await expect(page.locator("text=NIST AI RMF")).toBeVisible();

    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-084: XSense page renders visual badge, deployment narrative, and doc tabs", async ({
    page,
  }) => {
    await page.goto("/products/xsense");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText("XSense");
    await expect(
      page.getByText("Deployment follows your estate: SaaS, on-premises, or air-gapped"),
    ).toBeVisible();
    await expect(page.getByText("XS", { exact: true })).toBeVisible();

    // Test doc tabs keyboard interaction
    const firstDocTab = page.locator("#doctab-0");
    await firstDocTab.focus();
    await expect(firstDocTab).toHaveAttribute("aria-selected", "true");

    await page.keyboard.press("ArrowRight");
    const secondDocTab = page.locator("#doctab-1");
    await expect(secondDocTab).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#docpanel-1")).toBeVisible();

    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-085: Passwordless Keys page renders 4 hardware models and comparison table", async ({
    page,
  }) => {
    await page.goto("/products/keys");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText("Passwordless Keys");
    await expect(page.getByRole("heading", { name: "AUTH Bio", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "AUTH Bio Pro", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "AUTH Bio Touch", exact: true })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "AUTH Bio Desktop", exact: true }),
    ).toBeVisible();
    await expect(page.locator("text=Hardware comparison")).toBeVisible();

    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-086: AMS page renders lifecycle snapshot progress bars and documentation tabs", async ({
    page,
  }) => {
    await page.goto("/products/ams");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText("AMS");
    await expect(page.locator('[aria-label="Lifecycle snapshot"]')).toBeVisible();
    await expect(page.locator("text=Keys enrolled")).toBeVisible();
    await expect(page.locator("b:has-text('92%')")).toBeVisible();

    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-087: How XSignOn compares page renders accessible 4-way comparison matrix", async ({
    page,
  }) => {
    await page.goto("/products/compare");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText("How XSignOn compares");
    await expect(page.locator("table")).toBeVisible();
    await expect(page.locator("th:has-text('XSignOn')")).toBeVisible();
    await expect(page.locator("th:has-text('Legacy MFA')")).toBeVisible();

    // Verify /compare redirects to /products/compare
    await page.goto("/compare");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/.*\/products\/compare/);

    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });
});
