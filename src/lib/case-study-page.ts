import "server-only";
import { caseStudyPages } from "@/data/case-study-pages";
import { getCaseStudyBySlug } from "@/lib/caseStudy";
import { mergeCaseStudyPage } from "@/lib/case-study-page-merge";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CASE_STUDY_PAGE_QUERY } from "@/sanity/queries/caseStudy";
import type { CaseStudyPage } from "@/types/case-study-page";

type Fetched = (Partial<CaseStudyPage> & { approvalStatus?: string }) | null;

// One case study page: the built-in text, with the editors' version from Sanity laid over it once it is signed off.
// A case study that fails the approval check in src/lib/caseStudy.ts is not shown at all.
export async function getCaseStudyPage(slug: string): Promise<CaseStudyPage | null> {
  const fallback = caseStudyPages.find((p) => p.slug === slug);
  if (!fallback) return null;
  const approvedRecord = await getCaseStudyBySlug(slug);
  if (!approvedRecord) return null;
  if (!isSanityConfigured) return fallback;
  try {
    const data = await sanityFetch<Fetched>({
      query: CASE_STUDY_PAGE_QUERY,
      params: { slug },
      tags: [`slug:caseStudy:${slug}`, "type:caseStudy"],
    });
    return mergeCaseStudyPage(fallback, data, data?.approvalStatus === "approved");
  } catch {
    return fallback;
  }
}
