import { describe, expect, it } from "vitest";
import { careersPageFallback } from "@/data/careers-page-content";
import { CANONICAL_JOBS } from "@/data/jobs";
import { mergeCareersPage } from "@/lib/careers-page-merge";
import { jobTag, mergeJobs } from "@/lib/job-merge";

describe("careers page content", () => {
  it("returns the defaults when Sanity has nothing", () => {
    expect(mergeCareersPage(careersPageFallback, null)).toBe(careersPageFallback);
  });

  it("uses edited text, keeps defaults for empty parts and ignores a wrong-sized list", () => {
    const merged = mergeCareersPage(careersPageFallback, {
      hero: { title: "Join us" },
      working: { title: " ", values: careersPageFallback.working.values.slice(0, 2) },
    });
    expect(merged.hero.title).toBe("Join us");
    expect(merged.working.title).toBe(careersPageFallback.working.title);
    expect(merged.working.values).toBe(careersPageFallback.working.values);
  });
});

describe("mergeJobs", () => {
  const edited = {
    slug: "designer",
    title: "Designer",
    department: "Product",
    location: "Remote",
    locationType: "remote" as const,
    employmentType: "FULL_TIME" as const,
    description: "Design.",
    active: true,
  };

  it("keeps the built-in roles when Sanity has none", () => {
    expect(mergeJobs(CANONICAL_JOBS, [])).toEqual([...CANONICAL_JOBS]);
    expect(mergeJobs(CANONICAL_JOBS, null)).toEqual([...CANONICAL_JOBS]);
  });

  it("uses the editors' roles when there are any", () => {
    const jobs = mergeJobs(CANONICAL_JOBS, [edited]);
    expect(jobs).toHaveLength(1);
    expect(jobs[0].id).toBe("job-designer");
  });

  it("keeps a closed role in the list so that closing every role shows none", () => {
    const jobs = mergeJobs(CANONICAL_JOBS, [{ ...edited, active: false }]);
    expect(jobs.filter((j) => j.active)).toHaveLength(0);
  });

  it("ignores incomplete or badly addressed roles", () => {
    const jobs = mergeJobs(CANONICAL_JOBS, [
      { ...edited, title: "" },
      { ...edited, slug: "../x" },
    ]);
    expect(jobs).toEqual([...CANONICAL_JOBS]);
  });
});

describe("jobTag", () => {
  it("describes the work arrangement", () => {
    expect(jobTag({ locationType: "hybrid", location: "McKinney, TX" })).toBe(
      "Hybrid · McKinney, TX",
    );
    expect(jobTag({ locationType: "remote", location: "Remote" })).toBe("Remote");
    expect(jobTag({ locationType: "onsite", location: "Dallas, TX" })).toBe("Dallas, TX");
  });
});
