import { describe, it, expect } from "vitest";
import { canonicalArticles } from "@/data/articles";
import { canonicalCaseStudies } from "@/data/caseStudies";
import { canonicalSolutions } from "@/data/solutions";

describe("T-156: Core Accessibility Markup Standards (WCAG 2.2 AA)", () => {
  it("ensures all canonical case studies have descriptive hero image alt text", () => {
    for (const cs of canonicalCaseStudies) {
      expect(cs.heroImageAlt).toBeDefined();
      const alt = cs.heroImageAlt || "";
      expect(alt.trim().length).toBeGreaterThan(5);
      // Ensure alt text is not redundant filler like "image" or "photo"
      expect(alt.toLowerCase()).not.toBe("image");
      expect(alt.toLowerCase()).not.toBe("photo");
    }
  });

  it("ensures all canonical articles have non-empty excerpt and reading time for screen readers", () => {
    for (const art of canonicalArticles) {
      expect(art.excerpt).toBeDefined();
      expect(art.excerpt.trim().length).toBeGreaterThan(20);
      expect(art.readingTime).toMatch(/\d+\s+min\s+read/);
    }
  });

  it("ensures all canonical solutions have clear ctaHeadline and challenge statements", () => {
    for (const sol of canonicalSolutions) {
      expect(sol.ctaHeadline).toBeDefined();
      expect(sol.ctaHeadline.trim().length).toBeGreaterThan(10);
      expect(sol.challenge).toBeDefined();
      expect(sol.features.length).toBeGreaterThanOrEqual(4);
      for (const feat of sol.features) {
        expect(feat.lead).toBeDefined();
        expect(feat.body).toBeDefined();
      }
    }
  });
});
