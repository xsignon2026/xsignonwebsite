import { describe, expect, it } from "vitest";
import { comparePageFallback } from "@/data/compare-page-content";
import { enterprisePageFallback } from "@/data/enterprise-page-content";
import { industryPageFallback } from "@/data/industry-page-content";
import { mergeComparePage, mergeEnterprisePage, mergeIndustryPage } from "@/lib/last-pages-merge";

describe("industry page", () => {
  it("has six pieces and returns the defaults when Sanity has nothing", () => {
    expect(industryPageFallback.cards).toHaveLength(6);
    expect(mergeIndustryPage(industryPageFallback, null)).toBe(industryPageFallback);
  });

  it("keeps defaults for empty parts and ignores an incomplete card", () => {
    const merged = mergeIndustryPage(industryPageFallback, {
      hero: { title: "Insights", tag: " " },
      cards: [{ ...industryPageFallback.cards[0], noteText: "" }],
    });
    expect(merged.hero.title).toBe("Insights");
    expect(merged.hero.tag).toBe(industryPageFallback.hero.tag);
    expect(merged.cards).toBe(industryPageFallback.cards);
  });
});

describe("compare page", () => {
  it("has seven rows of four values under five columns", () => {
    expect(comparePageFallback.columns).toHaveLength(5);
    expect(comparePageFallback.rows).toHaveLength(7);
    for (const row of comparePageFallback.rows) expect(row.values).toHaveLength(4);
  });

  it("takes a complete edited table", () => {
    const columns = ["Capability", "XSignOn", "Other"];
    const rows = [{ capability: "Speed", values: ["Fast", "Slow"] }];
    const merged = mergeComparePage(comparePageFallback, { columns, rows });
    expect(merged.columns).toEqual(columns);
    expect(merged.rows).toEqual(rows);
  });

  it("keeps the built-in table when a row has the wrong number of values", () => {
    const rows = [{ capability: "Speed", values: ["Fast"] }];
    const merged = mergeComparePage(comparePageFallback, {
      columns: comparePageFallback.columns,
      rows,
    });
    expect(merged.rows).toBe(comparePageFallback.rows);
  });
});

describe("enterprise page", () => {
  it("has three models and returns the defaults when Sanity has nothing", () => {
    expect(enterprisePageFallback.deployment.models).toHaveLength(3);
    expect(mergeEnterprisePage(enterprisePageFallback, null)).toBe(enterprisePageFallback);
  });

  it("uses edited text and ignores a wrong-sized model list or empty standards", () => {
    const merged = mergeEnterprisePage(enterprisePageFallback, {
      hero: { title: "Control", tags: [] },
      deployment: {
        title: "Models",
        models: enterprisePageFallback.deployment.models.slice(0, 2),
      },
      standards: { title: "Standards", chips: [" "], text: "" },
    });
    expect(merged.hero.title).toBe("Control");
    expect(merged.hero.tags).toBe(enterprisePageFallback.hero.tags);
    expect(merged.deployment.title).toBe("Models");
    expect(merged.deployment.models).toBe(enterprisePageFallback.deployment.models);
    expect(merged.standards.chips).toBe(enterprisePageFallback.standards.chips);
  });
});
