import { canonicalCaseStudies, caseStudySlugAliases } from "@/data/caseStudies";
import type { CaseStudy } from "@/types/caseStudy";

const SLUG_REGEX = /^[a-z0-9-]+$/;

/**
 * Returns all published case studies that have status === 'approved'.
 * Filters out unapproved drafts in accordance with T-098 and T-099 invariants.
 */
export async function getApprovedCaseStudies(): Promise<CaseStudy[]> {
  // In production with Sanity, we query: *[_type == "caseStudy" && approvalStatus == "approved"]
  // Here we return verified static records that satisfy the approval status.
  return canonicalCaseStudies.filter(
    (cs) => cs.approvalStatus === "approved"
  );
}

/**
 * Retrieves a single case study by its slug or recognized alias.
 * Enforces strict input validation: regex check, length bound, and approval guard.
 */
export async function getCaseStudyBySlug(
  rawSlug: string
): Promise<CaseStudy | null> {
  if (
    !rawSlug ||
    typeof rawSlug !== "string" ||
    rawSlug.length > 96 ||
    !SLUG_REGEX.test(rawSlug)
  ) {
    return null;
  }

  const normalized = (caseStudySlugAliases[rawSlug] ?? rawSlug).toLowerCase();
  const caseStudy = canonicalCaseStudies.find((c) => c.slug === normalized);

  if (!caseStudy || caseStudy.approvalStatus !== "approved") {
    return null;
  }

  return caseStudy;
}
