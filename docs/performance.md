# Performance budgets (S-20)

Lighthouse CI runs on every pull request (`lighthouse` job in `.github/workflows/ci.yml`) and fails the check when a page goes over its budget. Budgets live in `lighthouserc.cjs`, one line per template.

## Test profile (agree with the client before launch, Q to confirm)

| Setting | Value                                               |
| ------- | --------------------------------------------------- |
| Device  | Mobile, emulated Moto G Power                       |
| Network | Simulated slow 4G: 1.6 Mbps down, 150 ms round trip |
| CPU     | 4x slowdown                                         |
| Runs    | 3 per page, median used                             |

This is Lighthouse's default mobile profile, chosen because most first visits to a security product site will be on laptops or phones with ordinary connections, and the strictest realistic profile keeps the budgets honest. If the client's real audience is desktop-first, add a second desktop run.

## Current budgets (placeholder templates)

| Metric                   | Limit   | Why                                                                                                   |
| ------------------------ | ------- | ----------------------------------------------------------------------------------------------------- |
| Largest Contentful Paint | 2500 ms | Google's "good" threshold                                                                             |
| Cumulative Layout Shift  | 0.1     | Google's "good" threshold                                                                             |
| Total Blocking Time      | 200 ms  | Lab stand-in for responsiveness                                                                       |
| JavaScript (transferred) | 260 KB  | Measured baseline today is 226 KB (Next.js, React and the Sentry browser SDK) plus about 15% headroom |

Measured today on the placeholder pages: LCP about 0.8 s, CLS 0, TBT about 130 ms. TBT is already two-thirds of its limit with almost nothing on the page, so watch it as the home page animation (BeamsCanvas) is added.

## What to do when the check fails

1. Open the `lighthouse-reports` artifact on the pull request and look at the failing audit.
2. Fix the cause (image weight, extra library, long task). Raising a budget needs a written reason in the pull request.
3. Home template budget is set at T-097, once real content and images exist. The mock embeds about 6.7 MB of images, so the numbers above will not hold for it without image work.

## INP

Interaction to Next Paint cannot be measured in the lab. Measure it in the field after launch (Vercel Speed Insights or the web-vitals library) and add it to this file.

## Running locally

```bash
npm run build
npm run lhci
```

Needs Chrome. If it is not installed, set `CHROME_PATH` to a Chromium executable.

## Proof that it fails

Before this was merged, a page with a 450 KB script was added temporarily; the check failed with 693 KB against the 260 KB limit, and the page was then removed.
