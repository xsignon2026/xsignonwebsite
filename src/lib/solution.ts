import { canonicalSolutions, solutionSlugAliases } from "@/data/solutions";
import type { Solution } from "@/types/solution";

const SLUG_REGEX = /^[a-z0-9-]+$/;

/**
 * Returns all solutions ordered by display order.
 */
export async function getAllSolutions(): Promise<Solution[]> {
  // In production with Sanity, we query: *[_type == "solution"] | order(order asc)
  return [...canonicalSolutions].sort((a, b) => a.order - b.order);
}

/**
 * Retrieves a single solution by slug or recognized alias.
 * Enforces strict input validation: regex check, length bound.
 */
export async function getSolutionBySlug(rawSlug: string): Promise<Solution | null> {
  if (!rawSlug || typeof rawSlug !== "string" || rawSlug.length > 96 || !SLUG_REGEX.test(rawSlug)) {
    return null;
  }

  const normalized = (solutionSlugAliases[rawSlug] ?? rawSlug).toLowerCase();
  const solution = canonicalSolutions.find((s) => s.slug === normalized);

  if (!solution) {
    return null;
  }

  return solution;
}
