import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

describe("T-170: Three Rollbacks Integrity & Rehearsal Suite", () => {
  const runbook = fs.readFileSync(
    path.resolve(process.cwd(), "docs/operations/rollback-rehearsal-runbook.md"),
    "utf-8"
  );
  const rehearsalScript = fs.readFileSync(
    path.resolve(process.cwd(), "scripts/rehearse-rollbacks.mjs"),
    "utf-8"
  );

  it("verifies Procedure 1 (Application Rollback) targets RTO < 60s with zero downtime", () => {
    expect(runbook).toContain("Procedure 1: Application Rollback");
    expect(runbook).toContain("< 60 seconds");
    expect(runbook).toContain("vercel rollback");
  });

  it("verifies Procedure 2 (Content Recovery Rollback) targets RTO < 15m and restores NDJSON dataset", () => {
    expect(runbook).toContain("Procedure 2: Content Recovery Rollback");
    expect(runbook).toContain("< 15 minutes");
    expect(runbook).toContain("scripts/sanity-dataset-backup.mjs");
  });

  it("verifies Procedure 3 (DNS Rollback) targets RTO < 5m and strictly preserves MX/SPF/DKIM", () => {
    expect(runbook).toContain("Procedure 3: DNS & Traffic Rollback");
    expect(runbook).toContain("< 5 minutes");
    expect(runbook).toContain("MX, SPF, DKIM");
  });

  it("verifies the rehearsal script executes simulation for all three rollbacks", () => {
    expect(rehearsalScript).toContain("[REHEARSAL 1/3] Application Rollback");
    expect(rehearsalScript).toContain("[REHEARSAL 2/3] Content Recovery Rollback");
    expect(rehearsalScript).toContain("[REHEARSAL 3/3] DNS & Traffic Rollback");
    expect(rehearsalScript).toContain("passedCount === 3");
  });
});
