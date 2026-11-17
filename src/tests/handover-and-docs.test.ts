import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

describe("Platform Handover, Documentation, and Governance (T-174 to T-179)", () => {
  const rootDir = process.cwd();

  it("verifies all final milestone documents exist on disk", () => {
    const requiredDocs = [
      "docs/operations/post-launch-monitoring-protocol.md",
      "docs/cms/sanity-editor-guide.md",
      "docs/operations/master-runbook-index.md",
      "docs/migration/ownership-transfer-checklist.md",
      "docs/compliance/post-launch-support-agreement.md",
      "docs/decisions/0003-launch-retrospective.md",
      "README.md",
    ];

    for (const doc of requiredDocs) {
      const fullPath = path.join(rootDir, doc);
      expect(fs.existsSync(fullPath), `Document ${doc} should exist`).toBe(true);
      const content = fs.readFileSync(fullPath, "utf8");
      expect(content.length, `Document ${doc} should not be empty`).toBeGreaterThan(100);
    }
  });

  it("T-174: verifies post-launch monitoring protocol specifications", () => {
    const filePath = path.join(rootDir, "docs/operations/post-launch-monitoring-protocol.md");
    const content = fs.readFileSync(filePath, "utf8");

    // Telemetry and observation cadences
    expect(content).toContain("T+24h");
    expect(content).toContain("T+7d");

    // Core Web Vitals thresholds
    expect(content).toContain("Largest Contentful Paint");
    expect(content).toContain("Cumulative Layout Shift");
    expect(content).toContain("Interaction to Next Paint");
    expect(content).toContain("≤ 2.5s");
    expect(content).toContain("≤ 0.05");
    expect(content).toContain("≤ 200ms");

    // 404 & DLQ monitoring
    expect(content).toContain("404 Anomaly Tracking");
    expect(content).toContain("Dead-Letter");
    expect(content).toContain("/api/telemetry/vitals");
    expect(content).toContain("/api/csp-report");

    // Incident SLAs
    expect(content).toContain("P1 - Critical");
    expect(content).toContain("< 15 minutes");
    expect(content).toContain("< 1 hour");
  });

  it("T-175: verifies Sanity CMS editor guide specifications", () => {
    const filePath = path.join(rootDir, "docs/cms/sanity-editor-guide.md");
    const content = fs.readFileSync(filePath, "utf8");

    // Roles and authentication
    expect(content).toContain("Editor");
    expect(content).toContain("Publisher");
    expect(content).toContain("Admin");
    expect(content).toContain("MFA");
    expect(content).toContain("https://xsignon.com/studio");

    // Key capabilities
    expect(content).toContain("Live Draft Preview");
    expect(content).toContain("White Papers");
    expect(content).toContain("Global Navigation");
    expect(content).toContain("revalidate");

    // Unaided exam
    expect(content).toContain("Unaided Editor Qualification Practical Exam");
    expect(content).toContain("Step 1");
    expect(content).toContain("Step 6");
  });

  it("T-176: verifies README and Master Runbook Index completeness", () => {
    const readmePath = path.join(rootDir, "README.md");
    const readme = fs.readFileSync(readmePath, "utf8");

    // Node & npm invariants
    expect(readme).toContain("Node.js");
    expect(readme).toContain("20.9");
    expect(readme).toContain("npm");

    // One command setup & scripts
    expect(readme).toContain("npm ci");
    expect(readme).toContain("npm run dev");
    expect(readme).toContain("npm run typecheck");
    expect(readme).toContain("npm run lint");
    expect(readme).toContain("npm run test");

    // Rollback and runbook references
    expect(readme).toContain("Emergency Rollback Procedures");
    expect(readme).toContain("Master Runbook & Operations Index");

    const indexPath = path.join(rootDir, "docs/operations/master-runbook-index.md");
    const indexContent = fs.readFileSync(indexPath, "utf8");

    expect(indexContent).toContain("docs/runbook.md");
    expect(indexContent).toContain("docs/operations/rollback-rehearsal-runbook.md");
    expect(indexContent).toContain("docs/migration/cms-backup-restore-runbook.md");
    expect(indexContent).toContain("docs/migration/dns-cutover-plan.md");
    expect(indexContent).toContain("docs/operations/go-live-smoke-test-runbook.md");
    expect(indexContent).toContain("docs/compliance/post-launch-support-agreement.md");
    expect(indexContent).toContain("docs/decisions/0003-launch-retrospective.md");
  });

  it("T-177: verifies ownership transfer checklist and d16 alignment", () => {
    const filePath = path.join(rootDir, "docs/migration/ownership-transfer-checklist.md");
    const content = fs.readFileSync(filePath, "utf8");

    expect(content).toContain("xsignon.com");
    expect(content).toContain("github.com/xsignon2026/xsignonwebsite");
    expect(content).toContain("Vercel");
    expect(content).toContain("Sanity.io");
    expect(content).toContain("Sentry");
    expect(content).toContain("d16");
    expect(content).toContain("De-escalation");
  });

  it("T-178: verifies post-launch support agreement and defect vs CR matrix", () => {
    const filePath = path.join(rootDir, "docs/compliance/post-launch-support-agreement.md");
    const content = fs.readFileSync(filePath, "utf8");

    expect(content).toContain("WARRANTY DEFECT");
    expect(content).toContain("CHANGE REQUEST");
    expect(content).toContain("90-Day Post-Launch Warranty Period");
    expect(content).toContain("Version 2 (Ombre)");
    expect(content).toContain("WCAG 2.1 AA");
    expect(content).toContain("Severity 1");
    expect(content).toContain("< 15 min");
  });

  it("T-179: verifies launch retrospective, roadmap bounds, and ADR 0003", () => {
    const filePath = path.join(rootDir, "docs/decisions/0003-launch-retrospective.md");
    const content = fs.readFileSync(filePath, "utf8");

    expect(content).toContain("Decision 0003");
    expect(content).toContain("Version 2 (Ombre / Palette 3 Violet)");
    expect(content).toContain("T-001");
    expect(content).toContain("T-179");
    expect(content).toContain("179 discrete tasks");
    expect(content).toContain("HeroBeams");
    expect(content).toContain("schema-org.ts");
  });
});
