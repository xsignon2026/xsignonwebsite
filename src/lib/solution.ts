import "server-only";
import { canonicalSolutions, solutionSlugAliases } from "@/data/solutions";
import { mergeSolution } from "@/lib/solution-merge";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SOLUTION_BY_SLUG_QUERY } from "@/sanity/queries/solution";
import type { Solution } from "@/types/solution";

const SLUG_REGEX = /^[a-z0-9-]+$/;

/**
 * Returns all solutions ordered by display order.
 */
export async function getAllSolutions(): Promise<Solution[]> {
  // The editors' version of each solution laid over the built-in one (see getSolutionBySlug).
  const all = await Promise.all(canonicalSolutions.map((s) => getSolutionBySlug(s.slug)));
  return all.filter((s): s is Solution => s !== null).sort((a, b) => a.order - b.order);
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
  if (!isSanityConfigured) return solution;

  try {
    const data = await sanityFetch<Partial<Solution> | null>({
      query: SOLUTION_BY_SLUG_QUERY,
      params: { slug: solution.slug },
      tags: [`slug:solution:${solution.slug}`, "type:solution"],
    });
    return mergeSolution(solution, data);
  } catch {
    return solution;
  }
}
