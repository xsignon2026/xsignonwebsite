import type { JobListing } from "../types/job";

export const CANONICAL_JOBS: readonly JobListing[] = Object.freeze([
  {
    id: "job-security-engineer",
    slug: "security-engineer",
    title: "Security Engineer",
    department: "Security",
    location: "McKinney, TX",
    locationType: "hybrid",
    employmentType: "FULL_TIME",
    description:
      "Build and run the security engineering behind XSignOn products, working from the McKinney office with a hybrid schedule.",
    active: true,
    postedAt: "2026-01-15",
  },
  {
    id: "job-ai-governance-analyst",
    slug: "ai-governance-analyst",
    title: "AI Governance Analyst",
    department: "AI Governance",
    location: "Remote",
    locationType: "remote",
    employmentType: "FULL_TIME",
    description:
      "Evaluate AI systems against recognized frameworks and keep customer evidence ready for review, working remotely.",
    active: true,
    postedAt: "2026-02-01",
  },
]);
