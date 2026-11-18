import type { WhitePaper } from "@/types/white-paper";

// Kept apart from the loader (server only) so it can be tested on its own.

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

/**
 * Lays the editors' white paper text over the built-in one. Only the words (title, summary, version, date and the
 * search text) can be edited. The private file key and whether the download is gated stay in the code on purpose,
 * so a Studio edit can never expose or swap the file.
 */
export function mergeWhitePaper(
  fallback: WhitePaper,
  data: Partial<WhitePaper> | null | undefined,
): WhitePaper {
  if (!data) return fallback;
  const text = (value: unknown, def: string) => (hasText(value) ? value : def);
  const date = hasText(data.publishedAt) && !Number.isNaN(Date.parse(data.publishedAt));
  return {
    ...fallback,
    title: text(data.title, fallback.title),
    summary: text(data.summary, fallback.summary),
    version: text(data.version, fallback.version),
    publishedAt: date ? (data.publishedAt as string) : fallback.publishedAt,
    seo: {
      title: text(data.seo?.title, fallback.seo?.title ?? ""),
      description: text(data.seo?.description, fallback.seo?.description ?? ""),
    },
  };
}
