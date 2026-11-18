import type { Article, ArticleSection, RelatedItemLink } from "@/types/article";

// Kept apart from the loader so it can be tested on its own.

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const goodSection = (s: Partial<ArticleSection> | null | undefined): s is ArticleSection =>
  !!s &&
  hasText(s.heading) &&
  Array.isArray(s.paragraphs) &&
  s.paragraphs.length > 0 &&
  s.paragraphs.every(hasText);

const goodLink = (l: Partial<RelatedItemLink> | null | undefined): l is RelatedItemLink =>
  !!l && hasText(l.title) && hasText(l.type) && hasText(l.href);

/**
 * Lays the editors' article over the built-in one. Anything left empty keeps the built-in value. The sections
 * and the related strip are taken as a whole when every entry is complete, otherwise the built-in ones stay.
 */
export function mergeArticle(
  fallback: Article,
  data: Partial<Article> | null | undefined,
): Article {
  if (!data) return fallback;
  const text = (value: unknown, def: string) => (hasText(value) ? value : def);
  const sections = (data.sections ?? []).filter((s) => s !== null);
  const links = (data.relatedLinks ?? []).filter((l) => l !== null);

  return {
    ...fallback,
    title: text(data.title, fallback.title),
    excerpt: text(data.excerpt, fallback.excerpt),
    author: text(data.author, fallback.author),
    date: text(data.date, fallback.date),
    topic: text(data.topic, fallback.topic),
    readingTime: text(data.readingTime, fallback.readingTime),
    crumb: hasText(data.crumb) ? data.crumb : fallback.crumb,
    featured: typeof data.featured === "boolean" ? data.featured : fallback.featured,
    pullQuote: hasText(data.pullQuote) ? data.pullQuote : fallback.pullQuote,
    ctaHeadline: text(data.ctaHeadline, fallback.ctaHeadline),
    sections: sections.length > 0 && sections.every(goodSection) ? sections : fallback.sections,
    relatedLinks: links.length > 0 && links.every(goodLink) ? links : fallback.relatedLinks,
  };
}
