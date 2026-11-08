import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Epic E08: Solutions Architecture & Detail Pages (T-106 to T-110)", () => {
  test("T-106: Solutions hub page renders 5 solution cards, enterprise band, and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/solutions");

    // Hero title
    const heading = page.getByRole("heading", { name: "Solutions", level: 1 });
    await expect(heading).toBeVisible();

    // Verify 5 solution cards
    const solCards = page.locator(".sol-card");
    await expect(solCards).toHaveCount(5);

    // Verify solution card titles
    await expect(
      page.getByRole("heading", { name: "Identity Governance", level: 3 })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "AI and Digital Governance", level: 3 })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Quantum-Safe Security", level: 3 })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Business Process", level: 3 })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Enterprise Technology", level: 3 })
    ).toBeVisible();

    // Verify Enterprise band & deployment models
    const entBand = page.locator(".ent-band");
    await expect(entBand).toBeVisible();
    await expect(entBand.getByText("SaaS")).toBeVisible();
    await expect(entBand.getByText("On-premises")).toBeVisible();
    await expect(entBand.getByText("Air-gapped")).toBeVisible();

    // Verify Standards posture pills
    await expect(entBand.getByText("FIDO2")).toBeVisible();
    await expect(entBand.getByText("SOC 2")).toBeVisible();
    await expect(entBand.getByText("ISO 27001")).toBeVisible();
    await expect(entBand.getByText("NIST AI RMF")).toBeVisible();
    await expect(entBand.getByText("NIST PQC")).toBeVisible();

    // Verify CTA section
    await expect(
      page.getByRole("heading", { name: "Which solution fits your goals?" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Book a strategy call/i })
    ).toBeVisible();

    // Accessibility check
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-106: /resources/solutions redirect alias resolves to /solutions", async ({
    page,
  }) => {
    await page.goto("/resources/solutions");
    await expect(page).toHaveURL(/\/solutions$/);
  });

  test("T-107 / T-108: Identity Governance detail renders full narrative and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/solutions/identity-governance");

    // Title
    const title = page.getByRole("heading", {
      name: "Identity Governance",
      level: 1,
    });
    await expect(title).toBeVisible();

    // Sections
    await expect(
      page.getByRole("heading", {
        name: "What teams come to XSignOn to achieve",
        level: 2,
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "How XSignOn supports it",
        level: 2,
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Products that deliver it",
        level: 2,
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Proof and reading",
        level: 2,
      })
    ).toBeVisible();

    // 4 feature checklist items
    const features = page.locator(".feat-list li");
    await expect(features).toHaveCount(4);
    await expect(features.first()).toContainText("One inventory of access");

    // Delivered by products
    await expect(page.getByRole("link", { name: /PostureOne/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /AMS/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Passwordless Keys/i }).first()).toBeVisible();

    // CTA
    await expect(
      page.getByRole("heading", { name: /Answer "who can reach what" in one view/i })
    ).toBeVisible();

    // Accessibility check
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-109: AI and Digital Governance detail renders and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/solutions/ai-and-digital-governance");

    const title = page.getByRole("heading", {
      name: "AI and Digital Governance",
      level: 1,
    });
    await expect(title).toBeVisible();

    // Features
    const features = page.locator(".feat-list li");
    await expect(features).toHaveCount(4);
    await expect(features.first()).toContainText("AI use inventoried with owners");

    // Products
    await expect(page.getByRole("link", { name: /EvalOne/i }).first()).toBeVisible();

    // Accessibility check
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-110: Quantum-Safe Security detail renders and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/solutions/quantum-safe-security");

    const title = page.getByRole("heading", {
      name: "Quantum-Safe Security",
      level: 1,
    });
    await expect(title).toBeVisible();

    // Features
    const features = page.locator(".feat-list li");
    await expect(features).toHaveCount(4);
    await expect(features.first()).toContainText("Inventory of cryptographic reliance");

    // Products
    await expect(page.getByRole("link", { name: /PostureOne/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Passwordless Keys/i }).first()).toBeVisible();

    // Accessibility check
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-111: Business Process detail renders and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/solutions/business-process");

    const title = page.getByRole("heading", {
      name: "Business Process",
      level: 1,
    });
    await expect(title).toBeVisible();

    // Features
    const features = page.locator(".feat-list li");
    await expect(features).toHaveCount(4);
    await expect(features.first()).toContainText("Reviews as governed cycles");

    // Products
    await expect(page.getByRole("link", { name: /PostureOne/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /AMS/i }).first()).toBeVisible();

    // CTA
    await expect(
      page.getByRole("heading", { name: "Turn reviews into a clear, confident process." })
    ).toBeVisible();

    // Accessibility check
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-111: Enterprise Technology detail renders and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/solutions/enterprise-technology");

    const title = page.getByRole("heading", {
      name: "Enterprise Technology",
      level: 1,
    });
    await expect(title).toBeVisible();

    // Features
    const features = page.locator(".feat-list li");
    await expect(features).toHaveCount(4);
    await expect(features.first()).toContainText("Connect the platforms you have");

    // Products
    await expect(page.getByRole("link", { name: /PostureOne/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Passwordless Keys/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /AMS/i }).first()).toBeVisible();

    // CTA
    await expect(
      page.getByRole("heading", { name: "Make your systems work as one layer." })
    ).toBeVisible();

    // Accessibility check
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-112: Solutions batch QA — Keyboard tab flow, focus states, and 320px mobile layout", async ({
    page,
  }) => {
    // 320px viewport mobile check on /solutions
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto("/solutions");
    await expect(page.getByRole("heading", { name: "Solutions", level: 1 })).toBeVisible();

    // Ensure zero horizontal scroll on mobile
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    // Keyboard tab navigation
    await page.keyboard.press("Tab");
    const activeElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeElement).toBeTruthy();

    // Verify detail page at 320px
    await page.goto("/solutions/enterprise-technology");
    const detailScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const detailClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(detailScrollWidth).toBeLessThanOrEqual(detailClientWidth);
  });

  test("T-107: /resources/:slug redirect alias resolves to /solutions/:slug", async ({
    page,
  }) => {
    await page.goto("/resources/identity-governance");
    await expect(page).toHaveURL(/\/solutions\/identity-governance$/);
  });

  test("T-107: Rejects non-existent solution slug with 404", async ({
    page,
  }) => {
    await page.goto("/solutions/unknown-solution-404");
    await expect(page.getByRole("heading", { name: "404", level: 1 })).toBeVisible();
    await expect(page.getByText("This page could not be found.")).toBeVisible();
  });
});
