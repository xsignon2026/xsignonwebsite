import "server-only";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ALL_PRODUCT_SLUGS_QUERY, PRODUCT_BY_SLUG_QUERY } from "@/sanity/queries/product";
import { postureOneProduct } from "@/data/products/postureone";
import type { Product } from "@/types/product";

const FALLBACK_PRODUCTS: Record<string, Product> = {
  postureone: postureOneProduct,
};

// S-14 / T-052 / T-053: Product server provider with resilient fallback.
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const fallback = FALLBACK_PRODUCTS[slug.toLowerCase()] ?? null;
  if (!isSanityConfigured) return fallback;
  try {
    const data = await sanityFetch<Product | null>({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
      tags: [`slug:product:${slug}`, "type:product"],
    });
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  const staticSlugs = Object.keys(FALLBACK_PRODUCTS);
  if (!isSanityConfigured) return staticSlugs;
  try {
    const cmsSlugs = await sanityFetch<string[]>({
      query: ALL_PRODUCT_SLUGS_QUERY,
      tags: ["type:product"],
    });
    return Array.from(new Set([...staticSlugs, ...(cmsSlugs ?? [])]));
  } catch {
    return staticSlugs;
  }
}
