import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Epic E06: Home Page (T-091 to T-097)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("T-091: Hero split renders canvas beams, product slider, and marquee", async ({ page }) => {
    // Check main display headline
    const headline = page.getByRole("heading", {
      name: /Identity and access/i,
      level: 1,
    });
    await expect(headline).toBeVisible();

    // Verify canvas heroBeams
    const beamsCanvas = page.locator("#heroBeams");
    await expect(beamsCanvas).toBeAttached();

    // Verify hero slider contains 5 slides
    const heroCard = page.locator("#heroCard");
    await expect(heroCard).toBeVisible();

    const slides = heroCard.locator(".hslide");
    await expect(slides).toHaveCount(5);
    await expect(slides.first()).toHaveClass(/act/);

    // Dot interaction
    const dot2 = heroCard.locator(".hdot").nth(1);
    await dot2.click();
    await expect(slides.nth(1)).toHaveClass(/act/);

    // Standards marquee
    const marquee = page.locator(".marquee");
    await expect(marquee).toBeVisible();
    await expect(marquee.getByText("FIDO2").first()).toBeVisible();
    await expect(marquee.getByText("SOC 2").first()).toBeVisible();
  });

  test("T-092: Product Coverflow carousel renders and controls active slide", async ({ page }) => {
    const coverflow = page.locator("#productCoverflow");
    await expect(coverflow).toBeVisible();

    const cards = coverflow.locator(".cf-card");
    await expect(cards).toHaveCount(5);
    await expect(cards.first()).toHaveClass(/is-active/);

    // Check live status polite announcement
    const status = page.locator("#cfStatus");
    await expect(status).toHaveText(/PostureOne/);

    // Click next button
    const nextBtn = coverflow.locator(".cf-next");
    await nextBtn.click();

    // Now second card (Passwordless Keys) should be active
    await expect(cards.nth(1)).toHaveClass(/is-active/);
    await expect(status).toHaveText(/Passwordless Keys/);
  });

  test("T-093: Partner Ecosystem hub renders tabs and keeps links accessible", async ({ page }) => {
    const partnerHub = page.locator("#partnerHub");
    await expect(partnerHub).toBeVisible();

    const tabs = partnerHub.locator(".hubx-tab");
    await expect(tabs).toHaveCount(4);

    // Pause button operates
    const pauseBtn = page.locator("#hubxPause");
    await expect(pauseBtn).toBeVisible();
    await expect(pauseBtn).toHaveAttribute("aria-pressed", "false");
    await pauseBtn.click();
    await expect(pauseBtn).toHaveAttribute("aria-pressed", "true");

    // Click second tab (Data + AI security)
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");

    // Live detail text updates
    const detail = page.locator("#hubxDetail");
    await expect(detail).toContainText("AI security scanners");
  });

  test("T-094: Solutions Journey and Our Thinking bands operate smoothly", async ({ page }) => {
    // Solutions rail
    const railButtons = page.locator(".j-rail button");
    await expect(railButtons).toHaveCount(5);

    // Click AI and Digital Governance
    await railButtons.nth(1).click();
    await expect(railButtons.nth(1)).toHaveClass(/act/);

    // Our Thinking accordion
    const thinkRows = page.locator(".think-row");
    await expect(thinkRows).toHaveCount(3);

    // Click first accordion item
    await thinkRows.first().click();
    await expect(thinkRows.first()).toHaveAttribute("aria-expanded", "true");
    const openExpand = page.locator(".think-expand.open");
    await expect(openExpand).toBeVisible();
  });

  test("T-095: Home Contact CTA band links to contact page", async ({ page }) => {
    const ctaSection = page.locator("section.cta-sec#contact");
    await expect(ctaSection).toBeVisible();
    const ctaBtn = ctaSection.getByRole("link", { name: /Book a strategy call/i });
    await expect(ctaBtn).toHaveAttribute("href", "/contact");
  });

  test("T-097: Home page meets WCAG 2.2 AA accessibility standards", async ({ page }) => {
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });
});
