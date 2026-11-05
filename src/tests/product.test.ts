import { describe, expect, it } from "vitest";
import { postureOneProduct } from "../data/products/postureone";
import { getAllProductSlugs, getProductBySlug } from "../lib/product";

describe("T-051 / T-053: Product Schema & PostureOne Fallback Data", () => {
  it("has valid PostureOne canonical fallback content matching mock", () => {
    expect(postureOneProduct.name).toBe("PostureOne");
    expect(postureOneProduct.slug).toBe("postureone");
    expect(postureOneProduct.tagline).toBeTruthy();
    expect(postureOneProduct.hero.tags.length).toBeGreaterThanOrEqual(3);
    expect(postureOneProduct.capabilityCards.length).toBe(6);
    expect(postureOneProduct.framework.steps.length).toBe(6);
    expect(postureOneProduct.mappedFrameworks.chips).toContain("SOC 2");
    expect(postureOneProduct.mappedFrameworks.chips).toContain("ISO 27001");
    expect(postureOneProduct.relatedItems.length).toBeGreaterThan(0);
  });

  it("resolves PostureOne by slug with silent fallback", async () => {
    const product = await getProductBySlug("postureone");
    expect(product).not.toBeNull();
    expect(product?.name).toBe("PostureOne");
    expect(product?.hero.dashboard?.score).toBe(86);
  });

  it("returns null for unknown product slug", async () => {
    const product = await getProductBySlug("non-existent-product");
    expect(product).toBeNull();
  });

  it("lists all product slugs including postureone", async () => {
    const slugs = await getAllProductSlugs();
    expect(slugs).toContain("postureone");
  });
});
