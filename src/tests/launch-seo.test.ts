import { describe, it, expect, vi, afterEach } from "vitest";
import sitemap from "@/app/sitemap";

// The layout only needs to be imported for its metadata; the font loader and the page chrome are not testable here.
vi.mock("next/font/google", () => ({ Inter: () => ({ variable: "inter" }) }));
vi.mock("@/components/layout/SkipLink", () => ({ SkipLink: () => null }));
vi.mock("@/components/layout/Header", () => ({ Header: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/layout/QuestionsWidget", () => ({ QuestionsWidget: () => null }));
vi.mock("@/components/common/WebVitals", () => ({ WebVitals: () => null }));
vi.mock("@/components/common/JsonLd", () => ({ JsonLd: () => null }));
vi.mock("./../app/globals.css", () => ({}));

// Launch checks for search: the switch that lets Google in, and a sitemap that lists only real pages.
describe("launch SEO", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("serves noindex everywhere except when the site environment is production", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_ENV", "staging");
    vi.resetModules();
    const staging = (await import("@/app/layout")).metadata;
    expect(staging.robots).toEqual({ index: false, follow: false });

    vi.stubEnv("NEXT_PUBLIC_SITE_ENV", "production");
    vi.resetModules();
    const production = (await import("@/app/layout")).metadata;
    expect(production.robots).toEqual({ index: true, follow: true });
  });

  it("gives every page a canonical address and a share image by default", async () => {
    const { metadata } = await import("@/app/layout");
    expect(metadata.alternates?.canonical).toBe("./");
    expect(JSON.stringify(metadata.openGraph?.images)).toContain("/og-image.png");
  });

  it("keeps redirecting, duplicate and internal addresses out of the sitemap", async () => {
    const paths = (await sitemap()).map((r) => new URL(r.url).pathname);
    const banned = [
      "/about/who-we-are",
      "/about/what-we-do",
      "/about/how-we-work",
      "/about/meet-the-team",
      "/case-studies",
      "/compare",
      "/roi",
      "/products/roi",
      "/products/proof",
      "/styleguide",
      "/tokens",
      "/resources",
    ];
    for (const path of banned) expect(paths).not.toContain(path);
    expect(paths.some((p) => p.startsWith("/articles/"))).toBe(false);
    expect(new Set(paths).size).toBe(paths.length);
  });
});
