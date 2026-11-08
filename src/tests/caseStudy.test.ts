import { describe, expect, it } from "vitest";
import { getApprovedCaseStudies, getCaseStudyBySlug, isCaseStudyApproved } from "@/lib/caseStudy";
import type { CaseStudy } from "@/types/caseStudy";

describe("T-098 to T-104: Case Studies Data & Security Verification", () => {
  it("returns exactly 4 approved canonical case studies with valid evidence links", async () => {
    const studies = await getApprovedCaseStudies();
    expect(studies.length).toBe(4);
    for (const study of studies) {
      expect(study.approvalStatus).toBe("approved");
      expect(study.approvalOwner).toBeTruthy();
      expect(study.evidenceLink).toMatch(/^https:\/\//);
      expect(study.slug).toMatch(/^[a-z0-9-]+$/);
      expect(study.rolloutSteps?.length).toBe(3);
    }
  });

  it("T-101: verifies Banking case study content and approver", async () => {
    const banking = await getCaseStudyBySlug("securing-bank-access-fido2");
    expect(banking).not.toBeNull();
    expect(banking?.industry).toBe("Banking");
    expect(banking?.location).toBe("Abu Dhabi");
    expect(banking?.approvalOwner).toBe("Chief Information Security Officer, UAE Banking Group");
    expect(banking?.evidenceLink).toBe("https://xsignon.com/compliance/evidence/case-bank-2026.pdf");
    expect(banking?.rolloutSteps?.[0].title).toBe("Pilot");
    expect(banking?.rolloutSteps?.[1].title).toBe("Branch rollout");
    expect(banking?.rolloutSteps?.[2].title).toBe("Back office");
    expect(banking?.relatedProducts?.map((p) => p.slug)).toEqual(["keys", "ams"]);
  });

  it("T-102: verifies Healthcare case study content and approver", async () => {
    const health = await getCaseStudyBySlug("passwordless-access-global-healthcare");
    expect(health).not.toBeNull();
    expect(health?.industry).toBe("Healthcare");
    expect(health?.deploymentDate).toBe("March 2020");
    expect(health?.approvalOwner).toBe("Healthcare Information Security Officer");
    expect(health?.evidenceLink).toBe("https://xsignon.com/compliance/evidence/case-health-2020.pdf");
    expect(health?.rolloutSteps?.[0].title).toBe("Clinical triage pilot");
    expect(health?.relatedProducts?.map((p) => p.slug)).toEqual(["keys"]);
  });

  it("T-103: verifies Electrical and IT case studies content and approvers", async () => {
    const electrical = await getCaseStudyBySlug("biometric-fido2-air-gapped-industrial");
    expect(electrical).not.toBeNull();
    expect(electrical?.industry).toBe("Electrical");
    expect(electrical?.location).toBe("Asia");
    expect(electrical?.deploymentDate).toBe("December 2023");
    expect(electrical?.approvalOwner).toBe("Director of Industrial Cyber Security");
    expect(electrical?.evidenceLink).toBe("https://xsignon.com/compliance/evidence/case-electrical-2023.pdf");
    expect(electrical?.relatedProducts?.map((p) => p.slug)).toEqual(["xsense", "ams"]);

    const itCase = await getCaseStudyBySlug("biometric-only-authentication-global-it");
    expect(itCase).not.toBeNull();
    expect(itCase?.industry).toBe("IT");
    expect(itCase?.deploymentDate).toBe("July 2020");
    expect(itCase?.approvalOwner).toBe("Vice President of Identity Security");
    expect(itCase?.evidenceLink).toBe("https://xsignon.com/compliance/evidence/case-it-2020.pdf");
    expect(itCase?.relatedProducts?.map((p) => p.slug)).toEqual(["keys", "xsense"]);
  });

  it("T-104: fails closed when evidence link or approver is missing", () => {
    const valid: CaseStudy = {
      title: "Test Study",
      slug: "test-study",
      industry: "Finance",
      headline: "Headline",
      summary: "Summary",
      heroImageAlt: "Alt",
      challenge: "Challenge",
      approach: "Approach",
      deployedFeatures: [],
      rolloutSteps: [],
      outcome: "Outcome",
      approvalOwner: "Security Lead",
      approvalStatus: "approved",
      evidenceLink: "https://example.com/evidence.pdf",
    };

    expect(isCaseStudyApproved(valid)).toBe(true);

    // Missing approval owner
    expect(isCaseStudyApproved({ ...valid, approvalOwner: "" })).toBe(false);

    // Missing evidence link
    expect(isCaseStudyApproved({ ...valid, evidenceLink: "" })).toBe(false);

    // Insecure non-HTTPS evidence link
    expect(isCaseStudyApproved({ ...valid, evidenceLink: "http://insecure.com/evidence.pdf" })).toBe(false);

    // Unapproved draft status
    expect(isCaseStudyApproved({ ...valid, approvalStatus: "draft" })).toBe(false);
  });

  it("rejects malicious or invalid slugs safely", async () => {
    expect(await getCaseStudyBySlug("../evil")).toBeNull();
    expect(await getCaseStudyBySlug("banking<script>")).toBeNull();
    expect(await getCaseStudyBySlug("non-existent-case")).toBeNull();
    expect(await getCaseStudyBySlug("")).toBeNull();
  });
});
