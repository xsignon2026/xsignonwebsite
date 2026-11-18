import { describe, expect, it } from "vitest";
import { contactPageFallback } from "@/data/contact-page-content";
import { legalPages } from "@/data/legal-pages";
import { proofPageFallback } from "@/data/proof-page-content";
import { mergeContactPage, mergeLegalPage, mergeProofPage } from "@/lib/more-pages-merge";

describe("legal pages", () => {
  const base = legalPages[0];

  it("has Privacy and Terms with five sections each", () => {
    expect(legalPages.map((p) => p.slug)).toEqual(["privacy", "terms"]);
    for (const p of legalPages) expect(p.sections).toHaveLength(5);
  });

  it("returns the built-in page when Sanity has none", () => {
    expect(mergeLegalPage(base, null)).toBe(base);
  });

  it("lets the editors switch the placeholder tag off", () => {
    expect(mergeLegalPage(base, { showNotice: false }).showNotice).toBe(false);
  });

  it("takes complete edited sections and ignores an empty one", () => {
    const sections = [{ heading: "Use", paragraphs: ["Reviewed text."] }];
    expect(mergeLegalPage(base, { sections }).sections).toEqual(sections);
    const empty = [{ heading: "Use", paragraphs: [] }];
    expect(mergeLegalPage(base, { sections: empty }).sections).toBe(base.sections);
  });
});

describe("contact page", () => {
  it("returns the defaults when Sanity has nothing", () => {
    expect(mergeContactPage(contactPageFallback, null)).toBe(contactPageFallback);
  });

  it("keeps the built-in notes when an edited note is empty, and uses edited ones otherwise", () => {
    const bad = [{ label: "Phone.", text: " " }];
    expect(mergeContactPage(contactPageFallback, { details: bad }).details).toBe(
      contactPageFallback.details,
    );
    const good = [{ label: "Phone.", text: "+1 555", href: "tel:+1555" }];
    expect(mergeContactPage(contactPageFallback, { details: good }).details).toEqual(good);
  });
});

describe("proof page", () => {
  it("has the four cards", () => {
    expect(proofPageFallback.cards).toHaveLength(4);
  });

  it("returns the defaults when Sanity has nothing", () => {
    expect(mergeProofPage(proofPageFallback, null)).toBe(proofPageFallback);
  });

  it("ignores cards with an unknown picture or an empty note", () => {
    const [first] = proofPageFallback.cards;
    const bad = [{ ...first, picture: "nope" as never }];
    expect(mergeProofPage(proofPageFallback, { cards: bad }).cards).toBe(proofPageFallback.cards);
    const noNote = [{ ...first, noteText: "" }];
    expect(mergeProofPage(proofPageFallback, { cards: noNote }).cards).toBe(
      proofPageFallback.cards,
    );
  });
});
