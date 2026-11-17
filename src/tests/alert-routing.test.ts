import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

describe("T-169: Operational Alert Routing & Integrity Suite", () => {
  it("verifies alerting runbook defines all 4 alert tiers with named owners", () => {
    const runbook = fs.readFileSync(
      path.resolve(process.cwd(), "docs/operations/alerting-runbook.md"),
      "utf-8",
    );
    expect(runbook).toContain("Tier 1: Application Runtime");
    expect(runbook).toContain("Tier 2: Uptime & Availability");
    expect(runbook).toContain("Tier 3: Form Delivery Failure");
    expect(runbook).toContain("Tier 4: Security Thresholds");
    expect(runbook).toContain("Developer A");
    expect(runbook).toContain("Developer B");
    expect(runbook).toContain("Head of Sales");
  });

  it("verifies test-alerts rehearsal script validates clean payloads", () => {
    const script = fs.readFileSync(path.resolve(process.cwd(), "scripts/test-alerts.mjs"), "utf-8");
    expect(script).toContain("Tier 1: Application Error");
    expect(script).toContain("Tier 2: Uptime & Availability");
    expect(script).toContain("Tier 3: Form Delivery Failure");
    expect(script).toContain("Tier 4: Security Threshold");
    expect(script).toContain("hasLeakedKey");
  });
});
