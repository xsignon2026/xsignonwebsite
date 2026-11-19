import { describe, expect, it } from "vitest";
import { isSafeHref, scrubLinks } from "@/sanity/lib/safe-links";

describe("isSafeHref", () => {
  it("accepts page paths, anchors and https, mailto and tel links", () => {
    for (const ok of [
      "/about",
      "/products/ams",
      "#who",
      "https://xsignon.com/x",
      "mailto:a@b.co",
      "tel:+15551234",
    ]) {
      expect(isSafeHref(ok)).toBe(true);
    }
  });

  it("rejects script, data, plain http, protocol-relative and padded links", () => {
    for (const bad of [
      "javascript:alert(1)",
      "JaVaScRiPt:alert(1)",
      "data:text/html,x",
      "http://x.com",
      "//evil.com",
      "/\\evil.com",
      " /about",
      "",
      "about",
    ]) {
      expect(isSafeHref(bad)).toBe(false);
    }
  });
});

describe("scrubLinks", () => {
  it("replaces unsafe links anywhere in the content and leaves everything else alone", () => {
    const content = {
      title: "javascript:not a link field",
      cta: { button: { label: "Go", href: "javascript:alert(1)" } },
      related: [
        { title: "A", href: "/ok" },
        { title: "B", href: "data:text/html,x" },
      ],
    };
    const clean = scrubLinks(content);
    expect(clean.title).toBe("javascript:not a link field");
    expect(clean.cta.button.href).toBe("/");
    expect(clean.related.map((r) => r.href)).toEqual(["/ok", "/"]);
  });

  it("passes through null and plain values", () => {
    expect(scrubLinks(null)).toBeNull();
    expect(scrubLinks("text")).toBe("text");
  });
});
