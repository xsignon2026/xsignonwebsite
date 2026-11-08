import { canonicalArticles, articleSlugAliases } from "@/data/articles";
import type { Article } from "@/types/article";

// S-14 / T-113: Strict slug validation regex
const SLUG_REGEX = /^[a-z0-9-]+$/;

/**
 * Validates that a slug strictly matches the allowed pattern:
 * lowercase alphanumeric and hyphens only, non-empty, max 96 chars.
 */
export function isValidArticleSlug(slug: string): boolean {
  if (!slug || typeof slug !== "string") return false;
  if (slug.length > 96) return false;
  return SLUG_REGEX.test(slug);
}

/**
 * Resolves an article slug (canonical or alias) to its canonical slug.
 * Returns null if the slug is invalid or unknown.
 */
export function resolveArticleCanonicalSlug(slug: string): string | null {
  if (!isValidArticleSlug(slug)) return null;

  const normalized = articleSlugAliases[slug];
  if (normalized) return normalized;

  const found = canonicalArticles.find((a) => a.slug === slug);
  return found ? found.slug : null;
}

/**
 * Retrieves all canonical articles in published sequence.
 */
export async function getAllArticles(): Promise<Article[]> {
  return canonicalArticles;
}

/**
 * Retrieves the featured article for the Thinking hub header.
 */
export async function getFeaturedArticle(): Promise<Article | null> {
  const featured = canonicalArticles.find((a) => a.featured);
  return featured || canonicalArticles[0] || null;
}

/**
 * Retrieves a single article by its canonical slug or recognized alias.
 * Returns null if the slug is invalid, malicious, or not found.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isValidArticleSlug(slug)) {
    return null;
  }

  const canonicalSlug = articleSlugAliases[slug] || slug;
  const article = canonicalArticles.find((a) => a.slug === canonicalSlug);
  return article || null;
}
