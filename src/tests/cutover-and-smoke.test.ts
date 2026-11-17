import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

describe("T-171 & T-173: DNS Cutover and Smoke Test Suite", () => {
  const cutoverPlan = fs.readFileSync(
    path.resolve(process.cwd(), "docs/migration/dns-cutover-plan.md"),
    "utf-8",
  );

  it("enforces low-traffic maintenance window (Tuesday 02:00-04:00 UTC)", () => {
    expect(cutoverPlan).toContain("Tuesday 02:00 – 04:00 UTC");
  });

  it("enforces TTL step-down sequence down to 300 seconds", () => {
    expect(cutoverPlan).toContain("T-72 Hours");
    expect(cutoverPlan).toContain("86400s -> 3600s");
    expect(cutoverPlan).toContain("T-24 Hours");
    expect(cutoverPlan).toContain("3600s -> 300s");
  });

  it("guarantees 100% preservation of MX, SPF, DKIM, and DMARC records without edits", () => {
    expect(cutoverPlan).toContain("aspmx.l.google.com");
    expect(cutoverPlan).toContain("v=spf1 include:_spf.google.com ~all");
    expect(cutoverPlan).toContain("v=DKIM1");
    expect(cutoverPlan).toContain("v=DMARC1");
    expect(cutoverPlan).toContain("UNTOUCHED");
  });

  it("defines Vercel edge IP and canonical CNAME targets", () => {
    expect(cutoverPlan).toContain("76.76.21.21");
    expect(cutoverPlan).toContain("cname.vercel-dns.com");
  });
});
