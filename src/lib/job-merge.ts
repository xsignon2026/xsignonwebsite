import type { JobListing } from "@/types/job";

// Kept apart from the loader (server only) so it can be tested on its own.

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const LOCATION_TYPES = ["hybrid", "remote", "onsite"];
const EMPLOYMENT_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"];

type Edited = Partial<JobListing> | null | undefined;

const complete = (job: Edited): job is JobListing =>
  !!job &&
  hasText(job.slug) &&
  /^[a-z0-9-]+$/.test(job.slug) &&
  hasText(job.title) &&
  hasText(job.department) &&
  hasText(job.location) &&
  hasText(job.description) &&
  typeof job.locationType === "string" &&
  LOCATION_TYPES.includes(job.locationType) &&
  typeof job.employmentType === "string" &&
  EMPLOYMENT_TYPES.includes(job.employmentType);

/**
 * The job list the site uses. When the editors have saved at least one complete Job in Sanity, their list is the
 * list: a role is closed by switching "Currently active" off (or deleting it), and a closed role is not shown.
 * When there are none, the built-in list stays, so the page is never empty by accident.
 */
export function mergeJobs(fallback: readonly JobListing[], data: Edited[] | null | undefined) {
  const jobs = (data ?? []).filter(complete).map((job) => ({
    ...job,
    id: `job-${job.slug}`,
    active: job.active !== false,
    postedAt: job.postedAt ?? "",
  }));
  return jobs.length > 0 ? jobs : [...fallback];
}

/** The small label above a role, for example "Hybrid · McKinney, TX". */
export function jobTag(job: Pick<JobListing, "locationType" | "location">): string {
  if (job.locationType === "hybrid") return `Hybrid · ${job.location}`;
  if (job.locationType === "remote") return "Remote";
  return job.location;
}
