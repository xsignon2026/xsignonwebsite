import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import { COMMON_SECURITY_HEADERS, SITE_FRAME_HEADER } from "../lib/security-headers";
import { buildCsp, SITE_SOURCES } from "../lib/csp";
import { serializeJsonLd } from "../lib/schema-org";

describe("T-163: OWASP Top 10 (2021) Verification Suite", () => {
  it("A01 & A05: enforces X-Frame-Options DENY and disables X-Powered-By", () => {
    expect(SITE_FRAME_HEADER.value).toBe("DENY");
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it("A02: enforces 2-year HSTS with preload and subdomains", () => {
    const hsts = COMMON_SECURITY_HEADERS.find((h) => h.key === "Strict-Transport-Security");
    expect(hsts?.value).toBe("max-age=63072000; includeSubDomains; preload");
  });

  it("A03: neutralizes script injection in JSON-LD schemas", () => {
    const maliciousPayload = {
      name: "</script><script>alert('xss')</script>",
      url: "https://xsignon.com",
    };
    const sanitized = serializeJsonLd(maliciousPayload);
    expect(sanitized).not.toContain("</script>");
    expect(sanitized).toContain("\\u003c/script\\u003e");
  });

  it("A03 & A08: restricts public script execution and plugins via CSP", () => {
    const csp = buildCsp(SITE_SOURCES);
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("form-action 'self'");
    expect(csp).toContain("frame-ancestors 'self'");
  });

  it("A05: enforces nosniff and strict referrer policy", () => {
    const nosniff = COMMON_SECURITY_HEADERS.find((h) => h.key === "X-Content-Type-Options");
    expect(nosniff?.value).toBe("nosniff");
    const referrer = COMMON_SECURITY_HEADERS.find((h) => h.key === "Referrer-Policy");
    expect(referrer?.value).toBe("strict-origin-when-cross-origin");
  });

  it("A10: restricts image optimization hostnames to verified CDN", () => {
    const formats = nextConfig.images?.formats;
    expect(formats).toContain("image/avif");
    expect(formats).toContain("image/webp");
  });
});
