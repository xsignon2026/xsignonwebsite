import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

describe("T-161: Secrets Leak Prevention Scanner", () => {
  const sensitivePatterns = [
    /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/,
    /sk_live_[0-9a-zA-Z]{24}/,
    /ghp_[0-9a-zA-Z]{36}/,
    /SANITY_API_WRITE_TOKEN\s*=\s*['"][^'"]+['"]/,
    /SANITY_REVALIDATE_SECRET\s*=\s*['"][^'"]+['"]/,
    /SENTRY_AUTH_TOKEN\s*=\s*['"][^'"]+['"]/,
  ];

  function getFiles(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (
          file !== "node_modules" &&
          file !== ".next" &&
          file !== ".git" &&
          file !== ".turbo"
        ) {
          getFiles(fullPath, fileList);
        }
      } else if (/\.(tsx|ts|js|jsx|json)$/.test(file)) {
        fileList.push(fullPath);
      }
    }
    return fileList;
  }

  it("ensures source files do not contain hardcoded private keys or production secrets", () => {
    const srcDir = path.resolve(process.cwd(), "src");
    const allSrcFiles = getFiles(srcDir);

    for (const filePath of allSrcFiles) {
      const content = fs.readFileSync(filePath, "utf-8");
      for (const pattern of sensitivePatterns) {
        expect(
          pattern.test(content),
          `Leaked credential pattern found in ${filePath}`
        ).toBe(false);
      }
    }
  });

  it("confirms client components do not access non-public environment variables directly", () => {
    const componentsDir = path.resolve(process.cwd(), "src/components");
    const componentFiles = getFiles(componentsDir);

    for (const file of componentFiles) {
      const content = fs.readFileSync(file, "utf-8");
      if (content.includes('"use client"') || content.includes("'use client'")) {
        // Find process.env usages
        const envMatches = content.match(/process\.env\.([A-Z0-9_]+)/g) || [];
        for (const match of envMatches) {
          const varName = match.replace("process.env.", "");
          expect(
            varName.startsWith("NEXT_PUBLIC_") || varName === "NODE_ENV",
            `Client component ${file} accesses private environment variable ${varName}`
          ).toBe(true);
        }
      }
    }
  });
});
