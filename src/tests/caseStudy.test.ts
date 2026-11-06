import { describe, expect, it } from "vitest";
import { getApprovedCaseStudies, getCaseStudyBySlug } from "@/lib/caseStudy";

describe("T-098 / T-099: Case Studies Data & Security Verification", () => {
  it("returns exactly 4 approved canonical case studies", async () => {
    const studies = await getApprovedCaseStudies();
    expect(studies.length).toBe(4);
    for (const study of studies) {
      expect(study.approvalStatus).toBe("approved");
      expect(study.approvalOwner).toBeTruthy();
      expect(study.evidenceLink).toMatch(/^https:\/\//);
      expect(study.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("retrieves the Banking case study by canonical slug and alias", async () => {
    const byCanonical = await getCaseStudyBySlug("securing-bank-access-fido2");
    expect(byCanonical).not.toBeNull();
    expect(byCanonical?.industry).toBe("Banking");

    const byAlias = await getCaseStudyBySlug("case-bank");
    expect(byAlias).not.toBeNull();
    expect(byAlias?.title).toBe(byCanonical?.title);
  });

  it("retrieves Healthcare, Electrical, and IT case studies", async () => {
    const health = await getCaseStudyBySlug("case-health");
    const electrical = await getCaseStudyBySlug("case-electrical");
    const itCase = await getCaseStudyBySlug("case-it");

    expect(health?.industry).toBe("Healthcare");
    expect(electrical?.industry).toBe("Electrical");
    expect(itCase?.industry).toBe("IT");
  });

  it("rejects malicious or invalid slugs safely", async () => {
    expect(await getCaseStudyBySlug("../evil")).toBeNull();
    expect(await getCaseStudyBySlug("banking<script>")).toBeNull();
    expect(await getCaseStudyBySlug("non-existent-case")).toBeNull();
    expect(await getCaseStudyBySlug("")).toBeNull();
  });
});
