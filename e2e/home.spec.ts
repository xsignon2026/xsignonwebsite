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

  test("T-093: Partner ecosystem diagram shows its five areas", async ({ page }) => {
    const card = page.locator(".pe-card");
    await expect(card).toBeVisible();
    await expect(card.locator(".pe-sp")).toHaveCount(5);
    await expect(card.locator(".pe-sp[data-on='true']")).toHaveCount(1);
  });

  test("T-094: Solutions Journey and Our Thinking bands operate smoothly", async ({ page }) => {
    // Solutions rail
    const railButtons = page.locator(".j-rail button");
    await expect(railButtons).toHaveCount(5);

    // Click AI and Digital Governance
    await railButtons.nth(1).click();
    await expect(railButtons.nth(1)).toHaveClass(/act/);

    // Our Thinking rows open into their card on hover or keyboard focus
    const thinkRows = page.locator(".think-row");
    await expect(thinkRows).toHaveCount(4);
    await thinkRows.first().focus();
    await expect(thinkRows.first()).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(".think-item.open")).toHaveCount(1);
  });

  test("T-095: Home Contact CTA band links to contact page", async ({ page }) => {
    const ctaSection = page.locator("section.cta-sec#contact");
    await expect(ctaSection).toBeVisible();
    const ctaBtn = ctaSection.getByRole("link", { name: /Book a strategy call/i });
    await expect(ctaBtn).toHaveAttribute("href", "/contact");
  });

  test("T-097: Home page meets WCAG 2.2 AA accessibility standards", async ({ page }) => {
    // With motion reduced, nothing is fading in while axe measures colours.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });
});
