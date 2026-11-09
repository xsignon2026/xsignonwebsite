import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Epic E09: Our Thinking & Articles (T-113 to T-120)", () => {
  test("T-114: Thinking hub page renders featured card, 4 grid cards, newsletter subscribe, and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/thinking");

    // Hero title
    const heading = page.getByRole("heading", { name: "Our thinking", level: 1 });
    await expect(heading).toBeVisible();

    // Featured article card
    const featuredCard = page.locator(".bcard");
    await expect(featuredCard).toBeVisible();
    await expect(
      featuredCard.getByRole("heading", {
        name: "Elevate Enterprise Security with Identity-First Controls",
        level: 3,
      }),
    ).toBeVisible();
    await expect(featuredCard.getByText("Featured")).toBeVisible();

    // Test toggle preview on featured card
    const featuredToggle = featuredCard.getByRole("button", {
      name: /Read summary preview|Show less/i,
    });
    await expect(featuredToggle).toHaveAttribute("aria-expanded", "false");
    await featuredToggle.click();
    await expect(featuredToggle).toHaveAttribute("aria-expanded", "true");
    await featuredToggle.click();
    await expect(featuredToggle).toHaveAttribute("aria-expanded", "false");

    // Verify 4 grid article cards
    const gridCards = page.locator(".case-grid .case-card");
    await expect(gridCards).toHaveCount(4);

    await expect(
      page.getByRole("heading", {
        name: "Data + AI Security Built for Visibility, Control, and Trust",
        level: 3,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Modern Micro-Segmentation for Zero Trust Security",
        level: 3,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model",
        level: 3,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework",
        level: 3,
      }),
    ).toBeVisible();

    // Industry Thinking link
    await expect(
      page.getByRole("link", { name: /Industry Thinking: practical thinking/i }),
    ).toBeVisible();

    // Newsletter section
    const newsBand = page.locator("#view-thinking .news-band");
    await expect(newsBand).toBeVisible();
    // The server answer is faked: the real route is tested in src/tests/subscription-routes.test.ts.
    await page.route("**/api/subscribe", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "ok" }),
      }),
    );
    const emailInput = newsBand.getByLabel("Work email");
    await emailInput.fill("architect@enterprise.org");
    await newsBand.getByRole("button", { name: "Subscribe" }).click();
    await expect(newsBand.getByText("Thank you. Your subscription is recorded")).toBeVisible();

    // CTA
    await expect(
      page.getByRole("heading", { name: "Discuss what you are reading." }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Book a strategy call/i })).toBeVisible();

    // Accessibility check
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-114: Alias redirect /resources/thinking resolves to /thinking", async ({ page }) => {
    await page.goto("/resources/thinking");
    await expect(page).toHaveURL(/\/thinking$/);
  });

  test("T-115 / T-116: Identity-First Controls article renders full narrative and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/thinking/identity-first-controls");

    const title = page.getByRole("heading", {
      name: "Elevate Enterprise Security with Identity-First Controls",
      level: 1,
    });
    await expect(title).toBeVisible();

    // Progress bar check
    const progBar = page.locator("#readProg");
    await expect(progBar).toBeAttached();

    // Body content and clamped headings
    await expect(
      page.getByRole("heading", {
        name: "The login screen is the smallest change",
        level: 3,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Rollout order matters more than the hardware",
        level: 3,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "What the help desk actually gets",
        level: 3,
      }),
    ).toBeVisible();

    // Pull quote
    const pullQuote = page.locator(".pull");
    await expect(pullQuote).toBeVisible();
    await expect(pullQuote).toContainText("The rollout order matters more than the hardware");

    // Related rows
    await expect(page.locator(".rel-row", { hasText: "Passwordless Keys" })).toBeVisible();
    await expect(page.locator(".rel-row", { hasText: "Enterprise Technology" })).toBeVisible();
    await expect(page.locator(".rel-row", { hasText: "Back to Our thinking" })).toBeVisible();

    // Strategy CTA
    await expect(
      page.getByRole("heading", { name: "Plan a rollout in the right order." }),
    ).toBeVisible();

    // Accessibility check
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-117: Data + AI Security article renders and passes WCAG 2.2 AA", async ({ page }) => {
    await page.goto("/thinking/data-and-ai-security");

    const title = page.getByRole("heading", {
      name: "Data + AI Security Built for Visibility, Control, and Trust",
      level: 1,
    });
    await expect(title).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "The questions arrive before the evidence exists",
        level: 3,
      }),
    ).toBeVisible();

    const pull = page.locator(".pull");
    await expect(pull).toContainText(
      "An assessment that begins with a document search is already a finding",
    );

    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-118: Modern Micro-Segmentation article renders and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/thinking/modern-micro-segmentation");

    const title = page.getByRole("heading", {
      name: "Modern Micro-Segmentation for Zero Trust Security",
      level: 1,
    });
    await expect(title).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Segments shaped around identity",
        level: 3,
      }),
    ).toBeVisible();

    const pull = page.locator(".pull");
    await expect(pull).toContainText("Segments drawn around identities stay accurate");

    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-119: Non-Human Identities article renders and passes WCAG 2.2 AA", async ({ page }) => {
    await page.goto("/thinking/non-human-identities");

    const title = page.getByRole("heading", {
      name: "Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model",
      level: 1,
    });
    await expect(title).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "The identities doing the work are changing",
        level: 3,
      }),
    ).toBeVisible();

    const pull = page.locator(".pull");
    await expect(pull).toContainText(
      "Every identity, human or not, gets an owner, a scope, and a review cycle.",
    );

    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-120: Agentic AI Cybersecurity article renders and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/thinking/agentic-ai-cybersecurity");

    const title = page.getByRole("heading", {
      name: "Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework",
      level: 1,
    });
    await expect(title).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Agents that work in teams",
        level: 3,
      }),
    ).toBeVisible();

    const pull = page.locator(".pull");
    await expect(pull).toContainText("The system prepares, and the human decides.");

    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-115: Legacy and alias redirects resolve to canonical article URLs", async ({ page }) => {
    await page.goto("/articles/data-ai");
    await expect(page).toHaveURL(/\/thinking\/data-and-ai-security$/);

    await page.goto("/thinking/article-microseg");
    await expect(page).toHaveURL(/\/thinking\/modern-micro-segmentation$/);
  });

  test("T-121: Industry Thinking page renders featured card, 6 pending industry cards, newsletter, and passes WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.goto("/thinking/industry");

    // Title and breadcrumbs
    const heading = page.getByRole("heading", { name: "Industry Thinking", level: 1 });
    await expect(heading).toBeVisible();

    // Featured card
    const featuredCard = page.locator(".bcard");
    await expect(featuredCard).toBeVisible();
    await expect(
      featuredCard.getByRole("heading", {
        name: "Why AI Governance Is Becoming a Security Priority",
        level: 3,
      }),
    ).toBeVisible();
    await expect(featuredCard.locator(".status-chip")).toBeVisible();

    // 6 case cards with pending status chips
    const cards = page.locator(".case-grid .case-card");
    await expect(cards).toHaveCount(6);
    const statusChips = page.locator(".case-grid .status-chip");
    await expect(statusChips).toHaveCount(6);

    // Newsletter section
    const newsBand = page.locator("#view-industry .news-band");
    await expect(newsBand).toBeVisible();

    // Accessibility check
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test("T-121: Alias redirect /resources/industry-thinking resolves to /thinking/industry", async ({
    page,
  }) => {
    await page.goto("/resources/industry-thinking");
    await expect(page).toHaveURL(/\/thinking\/industry$/);
  });

  test("T-115: Rejects non-existent article slug with 404", async ({ page }) => {
    await page.goto("/thinking/non-existent-article-slug");
    await expect(
      page.getByRole("heading", { name: "This page has moved.", level: 1 }),
    ).toBeVisible();
    await expect(page.locator(".ptag", { hasText: "404" })).toBeVisible();
  });

  test("T-115: Responsive layout at 320px viewport has zero horizontal scroll", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto("/thinking/identity-first-controls");

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });
});
