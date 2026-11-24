import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Epic E06: Home Page (T-091 to T-097)", () => {
  test.beforeEach(async ({ page }) => {
    // Skip the first-visit intro film so it does not cover the page.
    await page.addInitScript(() => sessionStorage.setItem("xs-intro-seen", "1"));
    await page.goto("/");
  });

  test("T-091: Hero renders its headline, carousel and standards marquee", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Protect identity\. Govern risk/i, level: 1 }),
    ).toBeVisible();
    await expect(page.locator("#heroBeams")).toBeAttached();

    // The carousel has dots; choosing one moves to that slide.
    const hero = page.getByRole("region", { name: "Latest from XSignOn" });
    const dots = hero.locator(".hc-dot");
    const total = await dots.count();
    expect(total).toBeGreaterThan(1);
    await dots.nth(1).click();
    await expect(dots.nth(1)).toHaveAttribute("aria-current", "true");

    const marquee = page.locator(".marquee");
    await expect(marquee).toBeVisible();
    await expect(marquee.getByText("FIDO2").first()).toBeVisible();
    await expect(marquee.getByText("SOC 2").first()).toBeVisible();
  });

  test("T-092: Product coverflow shows seven products and the arrows move it", async ({ page }) => {
    const coverflow = page.locator("#productCoverflow");
    await expect(coverflow).toBeVisible();

    const cards = coverflow.locator(".cf-card");
    await expect(cards).toHaveCount(7);
    await expect(coverflow.locator(".cf-card.is-active")).toHaveCount(1);

    // The carousel also moves by itself, so compare against what it says now.
    const status = page.locator("#cfStatus");
    const before = (await status.textContent()) ?? "";
    await coverflow.locator(".cf-next").click();
    await expect(status).not.toHaveText(before);
    await expect(coverflow.locator(".cf-card.is-active")).toHaveCount(1);
  });

  test("T-093: The ecosystem lists its areas in a flow", async ({ page }) => {
    const flow = page.locator(".se-flow");
    await expect(flow).toBeVisible();
    await expect(flow.locator(".se-flow-tile")).toHaveCount(4);
    await expect(flow.locator(".se-flow-via").first()).toBeVisible();
  });

  test("T-094: What XSignOn does switches panels, and Our thinking rows open", async ({ page }) => {
    const tabs = page.locator("#journey [role='tab']");
    await expect(tabs).toHaveCount(4);

    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");

    // Our Thinking rows open into their card on hover
    const thinkRows = page.locator(".think-row");
    await expect(thinkRows).toHaveCount(4);
    await thinkRows.first().hover();
    await expect(thinkRows.first()).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(".think-item.open")).toHaveCount(1);
  });

  test("T-095: Home contact band links to the contact page", async ({ page }) => {
    const ctaSection = page.locator("section.cta-sec#contact");
    await expect(ctaSection).toBeVisible();
    await expect(ctaSection.getByRole("link", { name: /Contact us/i })).toHaveAttribute(
      "href",
      "/contact",
    );
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
