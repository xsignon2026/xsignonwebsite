import { describe, expect, it } from "vitest";
import { insightsPageFallback } from "@/data/insights-page-content";
import { mergeInsightsPage } from "@/lib/insights-page-merge";

describe("insights page content", () => {
  it("returns the defaults when Sanity has nothing", () => {
    expect(mergeInsightsPage(insightsPageFallback, null)).toBe(insightsPageFallback);
  });

  it("uses edited text and keeps defaults for empty parts", () => {
    const merged = mergeInsightsPage(insightsPageFallback, {
      hero: { title: "Insights" },
      cta: { title: "", button: { label: "", href: "" } },
    });
    expect(merged.hero.title).toBe("Insights");
    expect(merged.cta).toEqual(insightsPageFallback.cta);
    expect(merged.featured).toBe(insightsPageFallback.featured);
  });

  it("drops incomplete cards and any card with an unknown picture", () => {
    const [first] = insightsPageFallback.cards;
    const merged = mergeInsightsPage(insightsPageFallback, {
      cards: [first, { ...first, title: "" }, { ...first, picture: "nope" as never }],
    });
    expect(merged.cards).toEqual([first]);
  });

  it("falls back when every card is invalid", () => {
    const merged = mergeInsightsPage(insightsPageFallback, { cards: [] });
    expect(merged.cards).toBe(insightsPageFallback.cards);
  });
});
