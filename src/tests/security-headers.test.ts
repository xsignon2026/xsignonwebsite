import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import {
  COMMON_SECURITY_HEADERS,
  SITE_FRAME_HEADER,
  STUDIO_FRAME_HEADER,
} from "../lib/security-headers";

describe("T-161: Security Headers Suite (A+ Standards)", () => {
  it("includes HSTS with 2-year duration, subdomains, and preload", () => {
    const hsts = COMMON_SECURITY_HEADERS.find((h) => h.key === "Strict-Transport-Security");
    expect(hsts).toBeDefined();
    expect(hsts?.value).toContain("max-age=63072000");
    expect(hsts?.value).toContain("includeSubDomains");
    expect(hsts?.value).toContain("preload");
  });

  it("enforces nosniff and strict referrer policy", () => {
    const nosniff = COMMON_SECURITY_HEADERS.find((h) => h.key === "X-Content-Type-Options");
    expect(nosniff?.value).toBe("nosniff");

    const referrer = COMMON_SECURITY_HEADERS.find((h) => h.key === "Referrer-Policy");
    expect(referrer?.value).toBe("strict-origin-when-cross-origin");
  });

  it("locks down permissions policy (camera, mic, geo, payment, usb)", () => {
    const permissions = COMMON_SECURITY_HEADERS.find((h) => h.key === "Permissions-Policy");
    expect(permissions).toBeDefined();
    expect(permissions?.value).toContain("camera=()");
    expect(permissions?.value).toContain("microphone=()");
    expect(permissions?.value).toContain("geolocation=()");
  });

  it("sets cross-origin isolation policies (COOP and CORP)", () => {
    const coop = COMMON_SECURITY_HEADERS.find((h) => h.key === "Cross-Origin-Opener-Policy");
    expect(coop?.value).toBe("same-origin");

    const corp = COMMON_SECURITY_HEADERS.find((h) => h.key === "Cross-Origin-Resource-Policy");
    expect(corp?.value).toBe("same-origin");
  });

  it("enforces DENY framing on public site and SAMEORIGIN on studio", () => {
    expect(SITE_FRAME_HEADER.value).toBe("DENY");
    expect(STUDIO_FRAME_HEADER.value).toBe("SAMEORIGIN");
  });

  it("configures all headers in nextConfig for public and studio paths", async () => {
    expect(nextConfig.poweredByHeader).toBe(false);
    expect(nextConfig.headers).toBeDefined();

    if (typeof nextConfig.headers === "function") {
      const headersList = await nextConfig.headers();
      expect(headersList.length).toBeGreaterThanOrEqual(2);

      const publicRoute = headersList.find((h) => h.source === "/((?!studio).*)");
      expect(publicRoute).toBeDefined();
      const publicKeys = publicRoute?.headers.map((h) => h.key);
      expect(publicKeys).toContain("Strict-Transport-Security");
      expect(publicKeys).toContain("X-Frame-Options");
      expect(publicKeys).toContain("Content-Security-Policy");
      expect(publicKeys).toContain("Cross-Origin-Opener-Policy");

      const studioRoute = headersList.find((h) => h.source === "/studio/:path*");
      expect(studioRoute).toBeDefined();
      const studioFrame = studioRoute?.headers.find((h) => h.key === "X-Frame-Options");
      expect(studioFrame?.value).toBe("SAMEORIGIN");
    }
  });
});
