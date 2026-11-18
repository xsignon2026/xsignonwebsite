import type { Product } from "@/types/product";

// Kept apart from the loader (server only) so it can be tested on its own.

const isFilled = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * Lays the editors' product over the built-in one. Anything the editors left empty keeps the built-in value, so a
 * product saved with only a few fields can never lose a section of its page.
 */
export function mergeProduct(
  fallback: Product | null,
  data: Product | null | undefined,
): Product | null {
  if (!data) return fallback;
  if (!fallback) return data;
  const merged: Record<string, unknown> = { ...fallback };
  for (const [key, value] of Object.entries(data)) {
    if (isFilled(value)) merged[key] = value;
  }
  // The hero is filled part by part: keep the built-in value for the parts the editors left out.
  const heroEdits = Object.entries(data.hero ?? {}).filter(([, value]) => isFilled(value));
  merged.hero = { ...fallback.hero, ...Object.fromEntries(heroEdits) };
  return merged as Product;
}
