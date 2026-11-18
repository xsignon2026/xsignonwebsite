import { describe, expect, it } from "vitest";
import { productsPageFallback } from "@/data/products-page-content";
import { mergeProductsPage } from "@/lib/products-page-merge";

describe("products page content", () => {
  it("has the shape the page needs", () => {
    expect(productsPageFallback.newLaunches.items).toHaveLength(3);
    expect(productsPageFallback.cards.items).toHaveLength(5);
  });

  it("returns the defaults when Sanity has nothing", () => {
    expect(mergeProductsPage(productsPageFallback, null)).toBe(productsPageFallback);
  });

  it("uses edited text and keeps defaults for empty parts", () => {
    const merged = mergeProductsPage(productsPageFallback, {
      hero: { title: "Products" },
      cta: { title: " ", button: { label: "", href: "" } },
    });
    expect(merged.hero.title).toBe("Products");
    expect(merged.cta).toEqual(productsPageFallback.cta);
  });

  it("ignores a list with the wrong size or an unknown picture", () => {
    const items = productsPageFallback.newLaunches.items;
    const short = mergeProductsPage(productsPageFallback, {
      newLaunches: { title: "New", items: items.slice(0, 2) },
    });
    expect(short.newLaunches.title).toBe("New");
    expect(short.newLaunches.items).toHaveLength(3);
    const bad = mergeProductsPage(productsPageFallback, {
      newLaunches: {
        title: "New",
        items: items.map((i) => ({ ...i, picture: "nope" as never })),
      },
    });
    expect(bad.newLaunches.items).toBe(productsPageFallback.newLaunches.items);
  });
});
