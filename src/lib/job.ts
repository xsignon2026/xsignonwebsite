import { CANONICAL_JOBS } from "../data/jobs";
import type { JobListing } from "../types/job";

/**
 * Returns all currently active jobs.
 */
export function getActiveJobs(): readonly JobListing[] {
  return CANONICAL_JOBS.filter((job) => job.active);
}

/**
 * Finds a job by its slug.
 */
export function getJobBySlug(slug: string): JobListing | undefined {
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return undefined;
  }
  return CANONICAL_JOBS.find((j) => j.slug === slug);
}

/**
 * Generates JobPosting Schema.org JSON-LD structured data for Google Jobs indexing.
 */
export function generateJobPostingJsonLd(job: JobListing) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.postedAt,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: "XSignOn",
      sameAs: "https://xsignon.com",
      logo: "https://xsignon.com/icon.svg",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location.includes("McKinney") ? "McKinney" : "Remote",
        addressRegion: job.location.includes("TX") ? "TX" : undefined,
        addressCountry: "US",
      },
    },
    jobLocationType: job.locationType === "remote" ? "TELECOMMUTE" : undefined,
  };
}
