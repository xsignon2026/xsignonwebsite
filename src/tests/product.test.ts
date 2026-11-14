import { describe, expect, it } from "vitest";
import { evalOneProduct } from "../data/products/evalone";
import { xsenseProduct } from "../data/products/xsense";
import { keysProduct } from "../data/products/keys";
import { amsProduct } from "../data/products/ams";
import { getAllProductSlugs, getProductBySlug, getAllProducts } from "../lib/product";

describe("E05 Products Suite & E06 Home Tests (T-082 to T-090)", () => {
  it("resolves all canonical products with valid fallbacks", async () => {
    const slugs = ["postureone", "evalone", "xsense", "keys", "ams"];
    for (const slug of slugs) {
      const prod = await getProductBySlug(slug);
      expect(prod).not.toBeNull();
      expect(prod?.slug).toBe(slug);
      expect(prod?.name).toBeTruthy();
      expect(prod?.hero.subline).toBeTruthy();
      expect(prod?.hero.tags.length).toBeGreaterThan(0);
      expect(prod?.relatedItems?.length).toBeGreaterThan(0);
    }
  });

  it("verifies EvalOne has checklist, capability cards, and framework table (T-083)", () => {
    expect(evalOneProduct.checklist?.items.length).toBe(4);
    expect(evalOneProduct.capabilityCards?.length).toBe(4);
    expect(evalOneProduct.specTable?.rows.length).toBe(5);
    expect(evalOneProduct.specTable?.columns).toContain("What EvalOne maps");
  });

  it("verifies XSense has key-viz badge, doc tabs, and deployment narrative (T-084)", () => {
    expect(xsenseProduct.keyViz?.badge).toBe("XS");
    expect(xsenseProduct.docTabs?.length).toBe(7);
    expect(xsenseProduct.extraNarrative?.[0]).toContain("air-gapped");
  });

  it("verifies Passwordless Keys has 4 case cards and hardware spec table (T-085)", () => {
    expect(keysProduct.caseCards?.length).toBe(4);
    expect(keysProduct.caseCards?.map((c) => c.title)).toEqual([
      "AUTH Bio",
      "AUTH Bio Pro",
      "AUTH Bio Touch",
      "AUTH Bio Desktop",
    ]);
    expect(keysProduct.specTable?.columns).toContain("AUTH Bio");
    expect(keysProduct.specTable?.rows.length).toBe(5);
  });

  it("verifies AMS has snapshot progress bars, capability cards, and doc tabs (T-086)", () => {
    expect(amsProduct.snapshot?.rows.length).toBe(3);
    expect(amsProduct.snapshot?.rows[0].value).toBe("92%");
    expect(amsProduct.capabilityCards?.length).toBe(4);
    expect(amsProduct.docTabs?.length).toBe(7);
  });

  it("supports slug aliases and lists all products", async () => {
    const alias = await getProductBySlug("passwordless-keys");
    expect(alias?.slug).toBe("keys");

    const allSlugs = await getAllProductSlugs();
    expect(allSlugs).toContain("postureone");
    expect(allSlugs).toContain("evalone");
    expect(allSlugs).toContain("xsense");
    expect(allSlugs).toContain("keys");
    expect(allSlugs).toContain("ams");

    const allProds = await getAllProducts();
    expect(allProds.length).toBe(5);
  });
});
