import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Unit tests only. Browser tests live in e2e/ and run with Playwright (npm run e2e).
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: { include: ["src/**/*.test.ts"] },
});
