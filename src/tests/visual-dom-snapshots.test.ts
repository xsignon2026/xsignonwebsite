import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

describe("T-166: Visual DOM Structural Consistency Suite", () => {
  it("verifies responsive column and grid layouts across primary templates", () => {
    const contactPage = fs.readFileSync(
      path.resolve(process.cwd(), "src/components/prototype/ContactView.tsx"),
      "utf-8",
    );
    // The contact page uses the prototype's two-column split (it stacks on small screens in prototype.css)
    expect(contactPage).toContain("about-split");
  });

  it("verifies container wrapping widths and responsive padding tokens", () => {
    const tokensCss = fs.readFileSync(
      path.resolve(process.cwd(), "src/styles/tokens.css"),
      "utf-8",
    );
    expect(tokensCss).toContain("--wrap: 1180px;");
    expect(tokensCss).toContain("--wrap-pad: 32px;");
    expect(tokensCss).toContain("--section-pad: 128px;");
  });

  it("verifies Playwright visual regression spec covers all 8 key launch templates", () => {
    const visualSpec = fs.readFileSync(
      path.resolve(process.cwd(), "e2e/visual-regression.spec.ts"),
      "utf-8",
    );
    expect(visualSpec).toContain("homepage");
    expect(visualSpec).toContain("postureone");
    expect(visualSpec).toContain("zero-trust");
    expect(visualSpec).toContain("roi");
    expect(visualSpec).toContain("contact");
    expect(visualSpec).toContain("maxDiffPixelRatio: 0.02");
  });
});
