import { describe, it, expect } from "vitest";
import { createPageMetadata, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

describe("SEO Metadata Engine (T-150)", () => {
  it("generates complete and canonical OpenGraph and Twitter tags", () => {
    const meta = createPageMetadata({
      title: "Enterprise Identity Command | XSignOn",
      description: "One unified command view across people, devices, and AI agents.",
      path: "/enterprise",
    });

    expect(meta.title).toBe("Enterprise Identity Command | XSignOn");
    expect(meta.description).toBe("One unified command view across people, devices, and AI agents.");
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/enterprise`);

    // OpenGraph
    expect(meta.openGraph?.title).toBe("Enterprise Identity Command | XSignOn");
    expect(meta.openGraph?.url).toBe(`${SITE_URL}/enterprise`);
    expect(meta.openGraph?.siteName).toBe("XSignOn");
    expect((meta.openGraph as Record<string, unknown>)?.type).toBe("website");
    expect(meta.openGraph?.images).toEqual([
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Enterprise Identity Command | XSignOn",
      },
    ]);

    // Twitter
    expect((meta.twitter as Record<string, unknown>)?.card).toBe("summary_large_image");
    expect(meta.twitter?.title).toBe("Enterprise Identity Command | XSignOn");
    expect(meta.twitter?.images).toEqual([DEFAULT_OG_IMAGE]);
  });

  it("handles relative path normalizing without double slashes", () => {
    const metaWithoutSlash = createPageMetadata({
      title: "Test",
      description: "Test Desc",
      path: "products/keys",
    });

    expect(metaWithoutSlash.alternates?.canonical).toBe(`${SITE_URL}/products/keys`);
    expect(metaWithoutSlash.openGraph?.url).toBe(`${SITE_URL}/products/keys`);
  });

  it("sets noindex robots header when noindex is specified", () => {
    const loginMeta = createPageMetadata({
      title: "Log in | XSignOn",
      description: "Secure login",
      path: "/login",
      noindex: true,
    });

    expect(loginMeta.robots).toEqual({ index: false, follow: false });

    const publicMeta = createPageMetadata({
      title: "Public Page",
      description: "Public Desc",
      path: "/about",
    });

    expect(publicMeta.robots).toEqual({ index: true, follow: true });
  });
});
