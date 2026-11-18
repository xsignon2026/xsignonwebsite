import { describe, expect, it } from "vitest";
import { solutionsPageFallback } from "@/data/solutions-page-content";
import { mergeSolutionsPage } from "@/lib/solutions-page-merge";

describe("solutions page content", () => {
  it("has three deployment models", () => {
    expect(solutionsPageFallback.enterprise.models).toHaveLength(3);
  });

  it("returns the defaults when Sanity has nothing", () => {
    expect(mergeSolutionsPage(solutionsPageFallback, null)).toBe(solutionsPageFallback);
  });

  it("uses edited text and keeps defaults for empty parts", () => {
    const merged = mergeSolutionsPage(solutionsPageFallback, {
      hero: { title: "Our solutions" },
      cta: { title: " ", button: { label: "", href: "" } },
    });
    expect(merged.hero.title).toBe("Our solutions");
    expect(merged.cta).toEqual(solutionsPageFallback.cta);
  });

  it("ignores a model list of the wrong size, and empty standards", () => {
    const merged = mergeSolutionsPage(solutionsPageFallback, {
      enterprise: {
        ...solutionsPageFallback.enterprise,
        models: solutionsPageFallback.enterprise.models.slice(0, 2),
        standards: ["", " "],
      },
    });
    expect(merged.enterprise.models).toBe(solutionsPageFallback.enterprise.models);
    expect(merged.enterprise.standards).toBe(solutionsPageFallback.enterprise.standards);
  });
});
