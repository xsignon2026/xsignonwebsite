# xsignon-web

![CI](https://github.com/xsignon2026/xsignonwebsite/actions/workflows/ci.yml/badge.svg)

The new XSignOn website: Next.js (App Router), TypeScript, Tailwind CSS v4 and Sanity, hosted on Vercel.

## Versions

| Tool        | Version                   |
| ----------- | ------------------------- |
| Node        | 22.23.4 (minimum 20.9)    |
| npm         | 10.9 (comes with Node 22) |
| next        | 16.4.4                    |
| react       | 19.3.0                    |
| typescript  | 5.9.3                     |
| tailwindcss | 4.3.4                     |
| sanity      | 6.22.0                    |
| next-sanity | 13.4.0                    |

## Run it locally

1. Install Node 22 (see `.nvmrc`). npm comes with it.
2. Copy `.env.example` to `.env.local` and fill in the Sanity project ID.
3. Install and start:

```bash
npm install
npm run dev
```

Open http://localhost:3000. Useful pages while building:

- `/tokens`: every design token, to compare with the design file (S-08)
- `/styleguide`: base styles and primitives on light and dark bands (S-10)
- `/studio`: the embedded Sanity Studio (S-11)

This project uses npm only. Commit `package-lock.json` and never add a `pnpm-lock.yaml` or `yarn.lock`. In CI, `npm ci` installs exactly what the lockfile says.

## Scripts

| Command             | What it does                                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`       | Local dev server                                                                                                                 |
| `npm run build`     | Production build                                                                                                                 |
| `npm run lint`      | ESLint                                                                                                                           |
| `npm run typecheck` | TypeScript check                                                                                                                 |
| `npm run test`      | Unit tests (Vitest)                                                                                                              |
| `npm run e2e`       | Browser and accessibility tests (Playwright, axe). Run `npm run build` first; first time only: `npx playwright install chromium` |
| `npm run lhci`      | Performance budgets (Lighthouse CI). Run `npm run build` first; needs Chrome                                                     |
| `npm run format`    | Format with Prettier                                                                                                             |

Before opening a pull request run `npm run lint`, `npm run typecheck` and `npm run test`. CI also runs the build, `e2e` and `lhci`.

## Environment variables

Copy `.env.example` to `.env.local`. Set the same names in Vercel for Preview and Production (Production gets production values).

| Variable                        | Needed              | Where it comes from                                           |
| ------------------------------- | ------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_ENV`          | yes                 | `development` locally, `production` only on Production        |
| `NEXT_PUBLIC_SITE_URL`          | yes                 | The site's public address                                     |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes                 | sanity.io/manage, project overview                            |
| `NEXT_PUBLIC_SANITY_DATASET`    | yes                 | `staging` or `production`                                     |
| `SANITY_API_READ_TOKEN`         | for draft preview   | sanity.io/manage > API > Tokens, Viewer role. Server-only     |
| `SANITY_REVALIDATE_SECRET`      | for publish-to-live | Random value, also entered in the Sanity webhook. Server-only |
| `NEXT_PUBLIC_SENTRY_DSN`        | for error reports   | Sentry project settings. Empty means reporting is off         |
| `MONITORING_TEST_SECRET`        | optional            | Random value for the forced-error test. Server-only           |

If a variable is missing the site still builds; the feature that needs it stays off or returns an error.

## Documentation

- [Runbook](docs/runbook.md): deploy, roll back, restore content, who to contact
- [Publish-to-live webhook](docs/cms-webhook.md)
- [Monitoring](docs/monitoring.md)
- [Performance budgets](docs/performance.md)
- [Decision log](docs/decisions/0001-rendering-and-csp.md): rendering and CSP

## Environments

| Environment | Branch             | Sanity dataset | Indexed by search engines |
| ----------- | ------------------ | -------------- | ------------------------- |
| Preview     | every pull request | staging        | no                        |
| Staging     | `staging`          | staging        | no                        |
| Production  | `main`             | production     | yes                       |

`NEXT_PUBLIC_SITE_ENV` must be `production` only on Production. Anything else gets `noindex` and a robots `Disallow: /`.

Staging and Preview must only use test services: a test inbox, a test CRM and a test mailing list. Only Production gets the real integration keys.

Only variables starting with `NEXT_PUBLIC_` reach the browser. Never put a secret in one.

## Workflow

See [CONTRIBUTING.md](CONTRIBUTING.md). Never push to main: open a pull request and get the other developer's review.
