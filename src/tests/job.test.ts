import { describe, expect, it } from "vitest";
import { generateJobPostingJsonLd, getActiveJobs, getJobBySlug } from "../lib/job";

describe("Job Listings & JSON-LD (T-128)", () => {
  it("retrieves all active canonical jobs", () => {
    const jobs = getActiveJobs();
    expect(jobs.length).toBe(2);
    expect(jobs.map((j) => j.slug)).toEqual([
      "security-engineer",
      "ai-governance-analyst",
    ]);
  });

  it("finds job by valid slug", () => {
    const job = getJobBySlug("security-engineer");
    expect(job).toBeDefined();
    expect(job?.title).toBe("Security Engineer");
    expect(job?.location).toBe("McKinney, TX");
  });

  it("fails-closed on malicious or invalid slugs", () => {
    expect(getJobBySlug("../hack")).toBeUndefined();
    expect(getJobBySlug("non-existent-role")).toBeUndefined();
    expect(getJobBySlug("")).toBeUndefined();
  });

  it("generates valid JobPosting JSON-LD for on-site/hybrid and remote roles", () => {
    const secEng = getJobBySlug("security-engineer")!;
    const secLd = generateJobPostingJsonLd(secEng);
    expect(secLd["@type"]).toBe("JobPosting");
    expect(secLd.title).toBe("Security Engineer");
    expect(secLd.jobLocationType).toBeUndefined();
    expect(secLd.jobLocation.address.addressLocality).toBe("McKinney");

    const aiAnalyst = getJobBySlug("ai-governance-analyst")!;
    const aiLd = generateJobPostingJsonLd(aiAnalyst);
    expect(aiLd["@type"]).toBe("JobPosting");
    expect(aiLd.title).toBe("AI Governance Analyst");
    expect(aiLd.jobLocationType).toBe("TELECOMMUTE");
  });
});
