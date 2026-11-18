import "server-only";
import { productsPageFallback } from "@/data/products-page-content";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PRODUCTS_PAGE_QUERY } from "@/sanity/queries/productsPage";
import { mergeProductsPage } from "@/lib/products-page-merge";
import type { ProductsPageContent } from "@/types/products-page-content";

// The Products listing page content: from Sanity when it is connected, from the default data otherwise.
export async function getProductsPageContent(): Promise<ProductsPageContent> {
  if (!isSanityConfigured) return productsPageFallback;
  try {
    const data = await sanityFetch<Partial<ProductsPageContent> | null>({
      query: PRODUCTS_PAGE_QUERY,
      tags: ["type:productsPage", "doc:productsPage"],
    });
    return mergeProductsPage(productsPageFallback, data);
  } catch {
    return productsPageFallback;
  }
}
