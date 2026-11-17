import { describe, expect, it } from "vitest";
import { buildCsp, SITE_SOURCES, STUDIO_SOURCES } from "../lib/csp";

describe("buildCsp", () => {
  const site = buildCsp(SITE_SOURCES);

  it("locks down plugins, base tag, forms and framing", () => {
    expect(site).toContain("object-src 'none'");
    expect(site).toContain("base-uri 'self'");
    expect(site).toContain("form-action 'self'");
    expect(site).toContain("frame-ancestors 'self'");
  });

  it("allows no third-party scripts on the public site", () => {
    const scriptSrc = site.split("; ").find((d) => d.startsWith("script-src")) ?? "";
    expect(scriptSrc).not.toContain("https:");
    expect(scriptSrc).not.toContain("*");
  });

  it("allows Sanity images on the site and the Sanity APIs in the studio", () => {
    expect(site).toContain("https://cdn.sanity.io");
    expect(buildCsp(STUDIO_SOURCES)).toContain("wss://*.sanity.io");
  });
});
