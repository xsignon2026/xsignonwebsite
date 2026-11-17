import { defineConfig, devices } from "@playwright/test";

// S-19: end-to-end and accessibility tests run against the production build (npm run build first),
// because that is what visitors get. Locally: npm run build && npm run e2e
const port = 3100;
const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://127.0.0.1:${port}`, trace: "on-first-retry" },
  // On GitHub only Chromium is installed (see .github/workflows/ci.yml), so CI runs the desktop Chromium project.
  // The phone and other-browser projects run locally (npx playwright install). Some desktop-only checks
  // (the open mega menu, the wide comparison table) need phone-specific versions before CI can run them.
  // Visual snapshot tests are skipped in CI until their baseline pictures are committed (docs/version-2-plan.md).
  grepInvert: process.env.CI ? /visual snapshot/ : undefined,
  projects: [
    { name: "Desktop Chrome", use: { ...devices["Desktop Chrome"] } },
    ...(process.env.CI
      ? []
      : [
          { name: "Mobile Chrome", use: { ...devices["Pixel 7"] } },
          { name: "Desktop Firefox", use: { ...devices["Desktop Firefox"] } },
          { name: "Desktop Safari", use: { ...devices["Desktop Safari"] } },
          { name: "Mobile Safari", use: { ...devices["iPhone 14"] } },
        ]),
  ],
  webServer: {
    command: `${npxCmd} next start -p ${port} -H 127.0.0.1`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    env: { NEXT_PUBLIC_SITE_ENV: "ci", NEXT_PUBLIC_SANITY_PROJECT_ID: "ci-placeholder" },
  },
});
