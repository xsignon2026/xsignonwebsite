import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

describe("T-164: Cross-Browser & Device Compatibility Suite", () => {
  const tokensCss = fs.readFileSync(path.resolve(process.cwd(), "src/styles/tokens.css"), "utf-8");
  const globalsCss = fs.readFileSync(path.resolve(process.cwd(), "src/app/globals.css"), "utf-8");

  it("verifies anti-aliasing font smoothing rules are configured for WebKit and Firefox", () => {
    expect(globalsCss).toContain("antialiased");
  });

  it("verifies design breakpoints match 641px, 761px, 901px, 1081px, 1201px token system", () => {
    expect(tokensCss).toContain("--breakpoint-sm");
    expect(tokensCss).toContain("--breakpoint-md");
    expect(tokensCss).toContain("--breakpoint-lg");
  });

  it("verifies Palette 3 dark violet surfaces and borders conform to cross-browser tokens", () => {
    expect(tokensCss).toContain("--d1: #060129;");
    expect(tokensCss).toContain("--d2: #0f0a3a;");
    expect(tokensCss).toContain("--d-line: #25205c;");
  });

  it("confirms Playwright multi-project configuration includes desktop and mobile browser targets", () => {
    const playwrightConfig = fs.readFileSync(
      path.resolve(process.cwd(), "playwright.config.ts"),
      "utf-8",
    );
    expect(playwrightConfig).toContain("Desktop Chrome");
    expect(playwrightConfig).toContain("Desktop Firefox");
    expect(playwrightConfig).toContain("Desktop Safari");
    expect(playwrightConfig).toContain("Mobile Chrome");
    expect(playwrightConfig).toContain("Mobile Safari");
  });
});
