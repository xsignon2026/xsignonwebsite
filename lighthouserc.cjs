// S-20: lab performance budgets per template, checked on every pull request.
//
// Test profile (agreed default, change here and in docs/performance.md together):
//   Mobile, Lighthouse's emulated Moto G Power, simulated slow 4G (1.6 Mbps, 150 ms), 4x CPU slowdown.
// Each URL is run 3 times and the median is used, so one noisy run does not fail the build.
// INP cannot be measured in the lab. It is measured in the field after launch.
//
// Budgets are per template. Add one entry per new template as it is built (home, product,
// article, listing, form). Tighten them at T-097 once real content exists.

const KB = 1024;

const budgets = {
  // Template name: [url path, max LCP ms, max CLS, max TBT ms, max JavaScript bytes]
  placeholder: ["/", 2500, 0.1, 200, 260 * KB],
  styleguide: ["/styleguide", 2500, 0.1, 200, 260 * KB],
  tokens: ["/tokens", 2500, 0.1, 200, 260 * KB],
};

const port = 3101;

module.exports = {
  ci: {
    collect: {
      startServerCommand: `npx next start -p ${port}`,
      startServerReadyPattern: "Ready",
      url: Object.values(budgets).map(([path]) => `http://localhost:${port}${path}`),
      numberOfRuns: 3,
    },
    assert: {
      assertMatrix: Object.values(budgets).map(([path, lcp, cls, tbt, js]) => ({
        matchingUrlPattern: `${path.replace(/\/$/, "")}/?$`,
        assertions: {
          "largest-contentful-paint": [
            "error",
            { maxNumericValue: lcp, aggregationMethod: "median" },
          ],
          "cumulative-layout-shift": [
            "error",
            { maxNumericValue: cls, aggregationMethod: "median" },
          ],
          "total-blocking-time": ["error", { maxNumericValue: tbt, aggregationMethod: "median" }],
          "resource-summary:script:size": ["error", { maxNumericValue: js }],
        },
      })),
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci" },
  },
};
