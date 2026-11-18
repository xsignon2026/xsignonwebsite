import "server-only";
import { solutionsPageFallback } from "@/data/solutions-page-content";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SOLUTIONS_PAGE_QUERY } from "@/sanity/queries/solutionsPage";
import { mergeSolutionsPage } from "@/lib/solutions-page-merge";
import type { SolutionsPageContent } from "@/types/solutions-page-content";

// The Solutions hub content: from Sanity when it is connected, from the default data otherwise.
export async function getSolutionsPageContent(): Promise<SolutionsPageContent> {
  if (!isSanityConfigured) return solutionsPageFallback;
  try {
    const data = await sanityFetch<Partial<SolutionsPageContent> | null>({
      query: SOLUTIONS_PAGE_QUERY,
      tags: ["type:solutionsPage", "doc:solutionsPage"],
    });
    return mergeSolutionsPage(solutionsPageFallback, data);
  } catch {
    return solutionsPageFallback;
  }
}
