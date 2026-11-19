import { describe, expect, it } from "vitest";
import { caseStudyPages } from "@/data/case-study-pages";
import { mergeCaseStudyPage } from "@/lib/case-study-page-merge";

const base = caseStudyPages[0];

describe("case study pages", () => {
  it("has the four pages, each starting with the challenge and with no placeholder notes", () => {
    expect(caseStudyPages).toHaveLength(4);
    for (const page of caseStudyPages) {
      expect(page.sections.length).toBeGreaterThanOrEqual(3);
      expect(page.sections[0].heading).toBe("The challenge");
      expect(page.sections.flatMap((s) => s.notes)).toEqual([]);
    }
  });
});

describe("mergeCaseStudyPage", () => {
  it("returns the built-in page when Sanity has none", () => {
    expect(mergeCaseStudyPage(base, null, true)).toBe(base);
  });

  it("ignores edits when the case study is not approved", () => {
    expect(mergeCaseStudyPage(base, { title: "Edited" }, false)).toBe(base);
  });

  it("uses edited text when approved, and keeps built-in values for empty parts", () => {
    const merged = mergeCaseStudyPage(base, { title: "Edited", crumb: " ", ctaHeadline: "" }, true);
    expect(merged.title).toBe("Edited");
    expect(merged.crumb).toBe(base.crumb);
    expect(merged.ctaHeadline).toBe(base.ctaHeadline);
    expect(merged.sections).toBe(base.sections);
  });

  it("takes complete edited sections", () => {
    const sections = [
      { heading: "Outcome", paragraphs: ["Done."], features: [], steps: [], notes: [] },
    ];
    expect(mergeCaseStudyPage(base, { sections }, true).sections).toEqual(sections);
  });

  it("keeps the built-in sections when an edited one is empty", () => {
    const sections = [{ heading: "Outcome", paragraphs: [], features: [], steps: [], notes: [] }];
    expect(mergeCaseStudyPage(base, { sections }, true).sections).toBe(base.sections);
  });
});
