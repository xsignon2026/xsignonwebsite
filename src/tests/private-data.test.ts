import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Personal data must never go to Sanity: on the free plan its dataset is readable by anyone with the
// project id (docs/build-plan.md, D1). The form code must not import anything Sanity.
function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

describe("enquiry data stays out of Sanity", () => {
  it("has no Sanity code in the contact route, handler, form or database code", () => {
    const root = process.cwd();
    const paths = [
      ...files(join(root, "src", "app", "api", "contact")),
      ...files(join(root, "src", "lib", "contact")),
      ...files(join(root, "src", "lib", "db")),
      join(root, "src", "components", "forms", "ContactForm.tsx"),
    ];
    expect(paths.length).toBeGreaterThan(4);
    for (const path of paths) {
      const code = readFileSync(path, "utf8");
      expect(code, path).not.toMatch(/from\s+["'](next-)?sanity|sanity\/lib|@sanity\//);
    }
  });
});
