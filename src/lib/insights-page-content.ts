import "server-only";
import { insightsPageFallback } from "@/data/insights-page-content";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { INSIGHTS_PAGE_QUERY } from "@/sanity/queries/insightsPage";
import { mergeInsightsPage } from "@/lib/insights-page-merge";
import type { InsightsPageContent } from "@/types/insights-page-content";

// The Our thinking hub content: from Sanity when it is connected, from the default data otherwise.
export async function getInsightsPageContent(): Promise<InsightsPageContent> {
  if (!isSanityConfigured) return insightsPageFallback;
  try {
    const data = await sanityFetch<Partial<InsightsPageContent> | null>({
      query: INSIGHTS_PAGE_QUERY,
      tags: ["type:insightsPage", "doc:insightsPage"],
    });
    return mergeInsightsPage(insightsPageFallback, data);
  } catch {
    return insightsPageFallback;
  }
}
