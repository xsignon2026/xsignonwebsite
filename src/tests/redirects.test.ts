import { describe, it, expect } from "vitest";
import { CANONICAL_REDIRECTS } from "@/data/redirects";

describe("Canonical Redirect Map Validation (T-146, T-147)", () => {
  it("contains valid redirect entries with leading slashes", () => {
    expect(CANONICAL_REDIRECTS.length).toBeGreaterThan(15);

    for (const r of CANONICAL_REDIRECTS) {
      expect(r.source.startsWith("/")).toBe(true);
      expect(r.destination.startsWith("/")).toBe(true);
      expect(r.permanent).toBe(true);
    }
  });

  it("strictly enforces acyclicity: no URL redirects to itself", () => {
    for (const r of CANONICAL_REDIRECTS) {
      expect(r.source).not.toBe(r.destination);
    }
  });

  it("strictly prevents redirect chains (single-hop invariant)", () => {
    const sources = new Set(CANONICAL_REDIRECTS.map((r) => r.source));

    for (const r of CANONICAL_REDIRECTS) {
      // The destination path (without query/hash/wildcard) must not be a source in the redirect table
      const cleanDest = r.destination.split("?")[0].split("#")[0].replace("/:slug*", "");
      expect(
        sources.has(cleanDest),
        `Redirect chain detected: ${r.source} -> ${r.destination} -> ${cleanDest} is also redirected`
      ).toBe(false);
    }
  });

  it("maps core legacy product and solution paths to their canonical successors", () => {
    const map = new Map(CANONICAL_REDIRECTS.map((r) => [r.source, r.destination]));

    expect(map.get("/products/fido2")).toBe("/products/keys");
    expect(map.get("/products/posture")).toBe("/products/postureone");
    expect(map.get("/products/eval")).toBe("/products/evalone");
    expect(map.get("/roi")).toBe("/roi-calculator");
    expect(map.get("/products/roi")).toBe("/roi-calculator");
    expect(map.get("/solutions/identity")).toBe("/solutions/identity-governance");
    expect(map.get("/solutions/ai")).toBe("/solutions/ai-and-digital-governance");
    expect(map.get("/solutions/quantum")).toBe("/solutions/quantum-safe-security");
    expect(map.get("/case-studies")).toBe("/proof");
    expect(map.get("/articles")).toBe("/thinking");
    expect(map.get("/jobs")).toBe("/careers");
    expect(map.get("/about-us")).toBe("/about");
  });
});
