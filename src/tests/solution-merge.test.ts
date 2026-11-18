import { describe, expect, it } from "vitest";
import { canonicalSolutions } from "@/data/solutions";
import { mergeSolution } from "@/lib/solution-merge";

const base = canonicalSolutions[0];

describe("mergeSolution", () => {
  it("returns the built-in solution when Sanity has none", () => {
    expect(mergeSolution(base, null)).toBe(base);
  });

  it("uses edited text and keeps built-in values for empty parts", () => {
    const merged = mergeSolution(base, { title: "New", summary: " ", challenge: "" });
    expect(merged.title).toBe("New");
    expect(merged.summary).toBe(base.summary);
    expect(merged.challenge).toBe(base.challenge);
    expect(merged.slug).toBe(base.slug);
  });

  it("takes complete edited features, with the joiner", () => {
    const features = [{ lead: "Lead", body: "rest.", joiner: "," as const }];
    expect(mergeSolution(base, { features }).features).toEqual(features);
  });

  it("keeps the built-in features when an edited one is incomplete", () => {
    expect(mergeSolution(base, { features: [{ lead: "", body: "x" }] }).features).toBe(
      base.features,
    );
  });

  it("gives edited related links a short name from the address", () => {
    const products = [{ title: "AMS", type: "Product" as const, href: "/products/ams", slug: "" }];
    expect(mergeSolution(base, { products }).products[0].slug).toBe("ams");
  });

  it("keeps the built-in links when an edited one is incomplete", () => {
    const bad = [{ title: "AMS", type: "Product" as const, href: "", slug: "" }];
    expect(mergeSolution(base, { products: bad }).products).toBe(base.products);
  });
});
