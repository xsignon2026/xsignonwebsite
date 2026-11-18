import "server-only";
import { careersPageFallback } from "@/data/careers-page-content";
import { CANONICAL_JOBS } from "@/data/jobs";
import { mergeCareersPage } from "@/lib/careers-page-merge";
import { mergeJobs } from "@/lib/job-merge";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CAREERS_PAGE_QUERY, JOBS_QUERY } from "@/sanity/queries/careers";
import type { CareersPageContent } from "@/types/careers-page-content";
import type { JobListing } from "@/types/job";

// The Careers page text: from Sanity when it is connected, from the default data otherwise.
export async function getCareersPageContent(): Promise<CareersPageContent> {
  if (!isSanityConfigured) return careersPageFallback;
  try {
    const data = await sanityFetch<Partial<CareersPageContent> | null>({
      query: CAREERS_PAGE_QUERY,
      tags: ["type:careersPage", "doc:careersPage"],
    });
    return mergeCareersPage(careersPageFallback, data);
  } catch {
    return careersPageFallback;
  }
}

// The roles that are open right now: the editors' Job documents when there are any, the built-in list otherwise.
export async function getOpenJobs(): Promise<JobListing[]> {
  if (!isSanityConfigured) return CANONICAL_JOBS.filter((job) => job.active);
  try {
    const data = await sanityFetch<Partial<JobListing>[] | null>({
      query: JOBS_QUERY,
      tags: ["type:job"],
    });
    return mergeJobs(CANONICAL_JOBS, data).filter((job) => job.active);
  } catch {
    return CANONICAL_JOBS.filter((job) => job.active);
  }
}
