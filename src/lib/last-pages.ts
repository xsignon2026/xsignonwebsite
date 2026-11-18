import "server-only";
import { comparePageFallback } from "@/data/compare-page-content";
import { enterprisePageFallback } from "@/data/enterprise-page-content";
import { industryPageFallback } from "@/data/industry-page-content";
import { mergeComparePage, mergeEnterprisePage, mergeIndustryPage } from "@/lib/last-pages-merge";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  COMPARE_PAGE_QUERY,
  ENTERPRISE_PAGE_QUERY,
  INDUSTRY_PAGE_QUERY,
} from "@/sanity/queries/lastPages";
import type {
  ComparePageContent,
  EnterprisePageContent,
  IndustryPageContent,
} from "@/types/last-pages-content";

// Each page: the built-in text, with the editors' version from Sanity laid over it when Sanity is connected.
async function load<T>(
  query: string,
  id: string,
  fallback: T,
  merge: (f: T, d: Partial<T> | null) => T,
) {
  if (!isSanityConfigured) return fallback;
  try {
    const data = await sanityFetch<Partial<T> | null>({
      query,
      tags: [`type:${id}`, `doc:${id}`],
    });
    return merge(fallback, data);
  } catch {
    return fallback;
  }
}

export const getIndustryPageContent = (): Promise<IndustryPageContent> =>
  load(INDUSTRY_PAGE_QUERY, "industryPage", industryPageFallback, mergeIndustryPage);

export const getComparePageContent = (): Promise<ComparePageContent> =>
  load(COMPARE_PAGE_QUERY, "comparePage", comparePageFallback, mergeComparePage);

export const getEnterprisePageContent = (): Promise<EnterprisePageContent> =>
  load(ENTERPRISE_PAGE_QUERY, "enterprisePage", enterprisePageFallback, mergeEnterprisePage);
