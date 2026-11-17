import { canonicalCaseStudies, caseStudySlugAliases } from "@/data/caseStudies";
import type { CaseStudy } from "@/types/caseStudy";

const SLUG_REGEX = /^[a-z0-9-]+$/;

/**
 * T-104: Invariant validation for published case study claims.
 * Every case study must have an approved status, a named approval owner, and a valid HTTPS evidence link.
 */
export function isCaseStudyApproved(cs: CaseStudy): boolean {
  return (
    cs.approvalStatus === "approved" &&
    typeof cs.approvalOwner === "string" &&
    cs.approvalOwner.trim().length > 0 &&
    typeof cs.evidenceLink === "string" &&
    cs.evidenceLink.startsWith("https://")
  );
}

/**
 * Returns all published case studies that satisfy T-104 approval and evidence requirements.
 * Filters out unapproved drafts in accordance with T-098 and T-104 invariants.
 */
export async function getApprovedCaseStudies(): Promise<CaseStudy[]> {
  // In production with Sanity, we query: *[_type == "caseStudy" && approvalStatus == "approved"]
  // Here we return verified static records that satisfy the approval status and evidence criteria.
  return canonicalCaseStudies.filter(isCaseStudyApproved);
}

/**
 * Retrieves a single case study by its slug or recognized alias.
 * Enforces strict input validation: regex check, length bound, and approval guard.
 */
export async function getCaseStudyBySlug(rawSlug: string): Promise<CaseStudy | null> {
  if (!rawSlug || typeof rawSlug !== "string" || rawSlug.length > 96 || !SLUG_REGEX.test(rawSlug)) {
    return null;
  }

  const normalized = (caseStudySlugAliases[rawSlug] ?? rawSlug).toLowerCase();
  const caseStudy = canonicalCaseStudies.find((c) => c.slug === normalized);

  if (!caseStudy || !isCaseStudyApproved(caseStudy)) {
    return null;
  }

  return caseStudy;
}
