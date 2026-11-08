import "server-only";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ALL_PRODUCT_SLUGS_QUERY, PRODUCT_BY_SLUG_QUERY } from "@/sanity/queries/product";
import { postureOneProduct } from "@/data/products/postureone";
import { evalOneProduct } from "@/data/products/evalone";
import { xsenseProduct } from "@/data/products/xsense";
import { keysProduct } from "@/data/products/keys";
import { amsProduct } from "@/data/products/ams";
import type { Product } from "@/types/product";

const FALLBACK_PRODUCTS: Record<string, Product> = {
  postureone: postureOneProduct,
  evalone: evalOneProduct,
  xsense: xsenseProduct,
  keys: keysProduct,
  "passwordless-keys": keysProduct,
  ams: amsProduct,
};

// S-14 / T-052 / T-082 / T-083 / T-084 / T-085 / T-086: Product server provider with resilient fallback.
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
  const staticSlugs = ["postureone", "evalone", "xsense", "keys", "passwordless-keys", "ams"];
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

export async function getAllProducts(): Promise<Product[]> {
  const orderedList = [
    postureOneProduct,
    keysProduct,
    evalOneProduct,
    xsenseProduct,
    amsProduct,
  ];
  return orderedList;
}
