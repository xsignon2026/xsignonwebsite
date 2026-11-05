import { defineConfig, devices } from "@playwright/test";

// S-19: end-to-end and accessibility tests run against the production build (npm run build first),
// because that is what visitors get. Locally: npm run build && npm run e2e
const port = 3100;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://localhost:${port}`, trace: "on-first-retry" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `npx next start -p ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    env: { NEXT_PUBLIC_SITE_ENV: "ci", NEXT_PUBLIC_SANITY_PROJECT_ID: "ci-placeholder" },
  },
});
