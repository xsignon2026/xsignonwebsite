import { describe, expect, it } from "vitest";
import { canonicalArticles } from "@/data/articles";
import { mergeArticle } from "@/lib/article-merge";

const base = canonicalArticles[0];

describe("mergeArticle", () => {
  it("returns the built-in article when Sanity has none", () => {
    expect(mergeArticle(base, null)).toBe(base);
  });

  it("uses edited text and keeps built-in values for empty parts", () => {
    const merged = mergeArticle(base, { title: "New title", excerpt: " ", author: "" });
    expect(merged.title).toBe("New title");
    expect(merged.excerpt).toBe(base.excerpt);
    expect(merged.author).toBe(base.author);
    expect(merged.slug).toBe(base.slug);
  });

  it("takes complete edited sections and pull quotes", () => {
    const sections = [{ heading: "H", paragraphs: ["One.", "Two."], pullQuote: "Quote." }];
    expect(mergeArticle(base, { sections }).sections).toEqual(sections);
  });

  it("keeps the built-in sections when an edited one is incomplete", () => {
    const bad = [{ heading: "H", paragraphs: [] }];
    expect(mergeArticle(base, { sections: bad }).sections).toBe(base.sections);
    const blank = [{ heading: " ", paragraphs: ["Text."] }];
    expect(mergeArticle(base, { sections: blank }).sections).toBe(base.sections);
  });

  it("keeps the built-in related links when an edited one is incomplete", () => {
    const links = [{ title: "A", type: "Product" as const, href: "" }];
    expect(mergeArticle(base, { relatedLinks: links }).relatedLinks).toBe(base.relatedLinks);
  });
});
