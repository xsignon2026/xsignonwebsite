import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

describe("T-162: Supply Chain Dependency Pinning Suite", () => {
  const pkgPath = path.resolve(process.cwd(), "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

  it("strictly pins all runtime dependencies with no floating semver ranges", () => {
    const deps = pkg.dependencies || {};
    expect(Object.keys(deps).length).toBeGreaterThan(0);

    for (const [dep, version] of Object.entries(deps)) {
      expect(
        /^[0-9]+\.[0-9]+\.[0-9]+(-.+)?$/.test(version as string),
        `Dependency "${dep}" is not strictly pinned: found "${version}"`,
      ).toBe(true);
    }
  });

  it("strictly pins all devDependencies with no floating semver ranges", () => {
    const devDeps = pkg.devDependencies || {};
    expect(Object.keys(devDeps).length).toBeGreaterThan(0);

    for (const [dep, version] of Object.entries(devDeps)) {
      expect(
        /^[0-9]+\.[0-9]+\.[0-9]+(-.+)?$/.test(version as string),
        `devDependency "${dep}" is not strictly pinned: found "${version}"`,
      ).toBe(true);
    }
  });

  it("defines explicit engine constraints for Node.js and npm", () => {
    expect(pkg.engines).toBeDefined();
    expect(pkg.engines.node).toBeDefined();
    expect(pkg.engines.npm).toBeDefined();
  });
});
