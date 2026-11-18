import "server-only";
import { FALLBACK_WHITE_PAPERS } from "@/data/white-papers";
import { mergeWhitePaper } from "@/lib/white-paper-merge";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { WHITE_PAPER_BY_SLUG_QUERY } from "@/sanity/queries/whitePaper";
import type { WhitePaper } from "@/types/white-paper";

export { FALLBACK_WHITE_PAPERS };

export async function getWhitePaperBySlug(slug: string): Promise<WhitePaper | null> {
  const normalized = slug.toLowerCase().trim();
  const fallback = Object.hasOwn(FALLBACK_WHITE_PAPERS, normalized)
    ? FALLBACK_WHITE_PAPERS[normalized]
    : null;
  if (!fallback || !isSanityConfigured) return fallback;
  try {
    const data = await sanityFetch<Partial<WhitePaper> | null>({
      query: WHITE_PAPER_BY_SLUG_QUERY,
      params: { slug: normalized },
      tags: [`slug:whitePaper:${normalized}`, "type:whitePaper"],
    });
    return mergeWhitePaper(fallback, data);
  } catch {
    return fallback;
  }
}
