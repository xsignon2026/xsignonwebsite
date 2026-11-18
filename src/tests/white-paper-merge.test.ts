import { describe, expect, it } from "vitest";
import { mergeWhitePaper } from "@/lib/white-paper-merge";
import type { WhitePaper } from "@/types/white-paper";

const base: WhitePaper = {
  title: "Guide",
  slug: "guide",
  summary: "Summary.",
  storageKey: "private/guide-v1.pdf",
  gated: true,
  version: "1.0",
  publishedAt: "2026-04-01T00:00:00Z",
  seo: { title: "Guide | XSignOn", description: "Download the guide." },
};

describe("mergeWhitePaper", () => {
  it("returns the built-in paper when Sanity has none", () => {
    expect(mergeWhitePaper(base, null)).toBe(base);
  });

  it("uses edited words and keeps built-in values for empty parts", () => {
    const merged = mergeWhitePaper(base, { title: "New", summary: " ", version: "1.1" });
    expect(merged.title).toBe("New");
    expect(merged.summary).toBe("Summary.");
    expect(merged.version).toBe("1.1");
  });

  it("never takes the file key or the gating from Sanity", () => {
    const merged = mergeWhitePaper(base, {
      storageKey: "private/other.pdf",
      gated: false,
      title: "New",
    });
    expect(merged.storageKey).toBe("private/guide-v1.pdf");
    expect(merged.gated).toBe(true);
  });

  it("ignores a date that cannot be read", () => {
    expect(mergeWhitePaper(base, { publishedAt: "soon" }).publishedAt).toBe(base.publishedAt);
  });
});
