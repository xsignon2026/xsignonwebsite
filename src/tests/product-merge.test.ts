import { describe, expect, it } from "vitest";
import { meshProduct } from "@/data/products/mesh";
import { mergeProduct } from "@/lib/product-merge";
import type { Product } from "@/types/product";

describe("mergeProduct", () => {
  it("returns the built-in product when Sanity has none", () => {
    expect(mergeProduct(meshProduct, null)).toBe(meshProduct);
  });

  it("returns the CMS product when there is no built-in one", () => {
    const cms = { ...meshProduct, slug: "new-product" };
    expect(mergeProduct(null, cms)).toBe(cms);
  });

  it("keeps sections the editors left out", () => {
    const partial = {
      name: "XSignOn Mesh",
      slug: "xsignon-mesh",
      tagline: "New tagline.",
      hero: { subline: "", tags: [] },
      docTabs: [],
    } as unknown as Product;
    const merged = mergeProduct(meshProduct, partial)!;
    expect(merged.tagline).toBe("New tagline.");
    expect(merged.docTabs).toEqual(meshProduct.docTabs);
    expect(merged.hero.subline).toBe(meshProduct.hero.subline);
    expect(merged.hero.tags).toEqual(meshProduct.hero.tags);
    expect(merged.keyViz).toEqual(meshProduct.keyViz);
  });
});
