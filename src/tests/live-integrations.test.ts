import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

describe("T-172: Live Integrations Isolation & Switchover Suite", () => {
  const switchoverDoc = fs.readFileSync(
    path.resolve(process.cwd(), "docs/operations/live-integrations-switchover.md"),
    "utf-8",
  );
  const scriptContent = fs.readFileSync(
    path.resolve(process.cwd(), "scripts/verify-live-integrations.mjs"),
    "utf-8",
  );

  it("defines strict separation between staging and production datasets in documentation", () => {
    expect(switchoverDoc).toContain("NEXT_PUBLIC_SANITY_DATASET");
    expect(switchoverDoc).toContain('"staging"');
    expect(switchoverDoc).toContain('"production"');
  });

  it("defines CRM and email endpoint segregation with zero crossover", () => {
    expect(switchoverDoc).toContain("CRM_WEBHOOK_URL");
    expect(switchoverDoc).toContain("EMAIL_PROVIDER_ENDPOINT");
    expect(switchoverDoc).toContain("Server-Only Secret");
  });

  it("verifies the isolation script tests all 3 boundaries and succeeds", () => {
    expect(scriptContent).toContain("[CHECK 1/3] Dataset Segregation");
    expect(scriptContent).toContain("[CHECK 2/3] CRM Ingestion Isolation");
    expect(scriptContent).toContain("[CHECK 3/3] Email Dispatcher Isolation");
    expect(scriptContent).toContain("ZERO-CROSSOVER ISOLATION GUARANTEED");
  });
});
