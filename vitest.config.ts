import path from "node:path";
import { defineConfig } from "vitest/config";

// Unit tests only. Browser tests live in e2e/ and run with Playwright (npm run e2e).
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "server-only": path.resolve(__dirname, "./src/tests/empty.ts"),
    },
  },
  test: { include: ["src/**/*.test.ts"] },
});
