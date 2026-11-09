import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Epic E07: Proof & Case Studies (T-098 to T-105)", () => {
  test("T-099 / T-105: Proof hub page renders 4 canonical case study cards and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/proof");

    // Heading verification
    const heading = page.getByRole("heading", { name: "Proof", level: 1 });
    await expect(heading).toBeVisible();

    // Verify exactly 4 case cards
    const cards = page.locator(".case-card");
    await expect(cards).toHaveCount(4);

    // Verify banking card
    await expect(
      page.getByRole("heading", {
        name: "Securing Bank Access With FIDO2 Biometric Keys",
      }),
    ).toBeVisible();

    // Verify Healthcare card
    await expect(
      page.getByRole("heading", {
        name: "Passwordless Access For A Global Healthcare Enterprise",
      }),
    ).toBeVisible();

    // Verify Electrical card
    await expect(
      page.getByRole("heading", {
        name: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
      }),
    ).toBeVisible();

    // Verify IT card
    await expect(
      page.getByRole("heading", {
        name: "Biometric-Only Authentication For A Global IT Enterprise",
      }),
    ).toBeVisible();

    // Verify ROI calculator link
    const roiLink = page.getByRole("link", { name: /Open the ROI Calculator/i });
    await expect(roiLink).toHaveAttribute("href", "/roi");

    // Accessibility check
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-099: Case studies and products proof redirect aliases resolve to /proof", async ({
    page,
  }) => {
    await page.goto("/case-studies");
    await expect(page).toHaveURL(/\/proof$/);

    await page.goto("/products/proof");
    await expect(page).toHaveURL(/\/proof$/);
  });

  test("T-100 / T-101: Banking case study detail renders full narrative and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/proof/securing-bank-access-fido2");

    // Title
    const title = page.getByRole("heading", {
      name: "Securing Bank Access With FIDO2 Biometric Keys",
      level: 1,
    });
    await expect(title).toBeVisible();

    // Narrative sections
    await expect(page.getByRole("heading", { name: "Where they started", level: 2 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What was deployed", level: 2 })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Rollout", exact: true, level: 2 }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Outcome", level: 2 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Related", level: 2 })).toBeVisible();

    // 3-step grid
    const stepCards = page.locator(".step-card");
    await expect(stepCards).toHaveCount(3);
    await expect(stepCards.locator(".how-num").filter({ hasText: "01" })).toBeVisible();
    await expect(stepCards.locator(".how-num").filter({ hasText: "02" })).toBeVisible();
    await expect(stepCards.locator(".how-num").filter({ hasText: "03" })).toBeVisible();

    // Related items link to products
    const keysRel = page.getByRole("link", { name: /Passwordless Keys/i });
    await expect(keysRel.first()).toBeVisible();

    // Accessibility check
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-102 / T-105: Healthcare case study detail renders narrative and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/proof/passwordless-access-global-healthcare");

    const title = page.getByRole("heading", {
      name: "Passwordless Access For A Global Healthcare Enterprise",
      level: 1,
    });
    await expect(title).toBeVisible();

    // Verify 3 steps
    const stepCards = page.locator(".step-card");
    await expect(stepCards).toHaveCount(3);

    // Verify related product
    await expect(page.getByRole("link", { name: /Passwordless Keys/i }).first()).toBeVisible();

    // Accessibility check
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-103 / T-105: Electrical & IT case study details render and pass WCAG 2.2 AA", async ({
    page,
  }) => {
    // 1. Electrical
    await page.goto("/proof/biometric-fido2-air-gapped-industrial");
    await expect(
      page.getByRole("heading", {
        name: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
        level: 1,
      }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /XSense/i }).first()).toBeVisible();

    let axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);

    // 2. IT Enterprise
    await page.goto("/proof/biometric-only-authentication-global-it");
    await expect(
      page.getByRole("heading", {
        name: "Biometric-Only Authentication For A Global IT Enterprise",
        level: 1,
      }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /XSense/i }).first()).toBeVisible();

    axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-100: Rejects non-existent or invalid slug with 404", async ({ page }) => {
    await page.goto("/proof/invalid-slug-12345");
    await expect(
      page.getByRole("heading", { name: "This page has moved.", level: 1 }),
    ).toBeVisible();
    await expect(page.locator(".ptag", { hasText: "404" })).toBeVisible();
  });
});
