# Gate G1: Foundation review (S-22)

Prepared 2026-11-05 from the code on branch `s22-foundation-review`. Both developers walk through this list, fix or accept each gap, and sign at the bottom. The first slice (PostureOne page and contact form, T-051 to T-062) does not start before this is signed.

**Status key:** PASS = checked in code and by running it. HUMAN = can only be checked in a web console or with the client; someone must look and tick it. GAP = something is missing or wrong.

## Checks run for this review

| Check                                                                               | Result                     |
| ----------------------------------------------------------------------------------- | -------------------------- |
| `npm run lint`                                                                      | PASS                       |
| `npm run typecheck`                                                                 | PASS                       |
| `npm run test` (25 unit tests)                                                      | PASS                       |
| `npx prettier --check .`                                                            | PASS                       |
| `sanity schema validate`                                                            | PASS, 0 errors, 0 warnings |
| `npm run build`                                                                     | PASS                       |
| `npm run e2e` (12 tests: desktop and mobile, axe, headers, no third-party requests) | PASS                       |
| `npm run lhci` (budgets)                                                            | PASS                       |
| Clean clone, `npm ci`, lint, typecheck, test, build (S-21)                          | PASS                       |

## Repo and CI

| Task         | Item                                                                                 | Status   | Evidence or what to do                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| S-01         | Client-owned accounts, both developers added, two-factor on                          | HUMAN    | Open the access list; confirm GitHub, Vercel, Sanity, Sentry and the email account. Not visible from code                  |
| S-02         | Repo in client organization                                                          | PASS     | `github.com/xsignon2026/xsignonwebsite`, default branch `main`                                                             |
| S-02         | `main` protected: no direct push, 1 review, required checks                          | HUMAN    | GitHub > Settings > Branches. The API refuses to show this without a login                                                 |
| S-02         | CODEOWNERS with real usernames                                                       | **GAP**  | `.github/CODEOWNERS` still says `@dev-a @dev-b`. Replace with real usernames. Until then, no review is actually requested  |
| S-02         | Pull request template with design checklist                                          | PASS     | `.github/pull_request_template.md`                                                                                         |
| S-03         | Node pinned, strict TypeScript, Prettier, editorconfig, lockfile, versions in README | PASS     | `.nvmrc` 22, `strict: true`, `.prettierrc`, `.editorconfig`, `package-lock.json`, README versions table                    |
| S-03         | Plan says pnpm; repo uses npm                                                        | Decision | Switched to npm in the S-03 commits; README and CONTRIBUTING say so. Record in the decision log that this changes the plan |
| S-04         | Folder structure and naming in CONTRIBUTING.md; sample component follows it          | PASS     | `src/components/ui`, `layout`; both developers still approve (sign below)                                                  |
| S-05         | Separate jobs: lint, typecheck, test, build; badge                                   | PASS     | `.github/workflows/ci.yml`; badge in README. Also `e2e` and `lighthouse` jobs (S-19, S-20)                                 |
| S-05         | Each job is a **required** status check on `main`                                    | HUMAN    | GitHub > Settings > Branches. Add `lint`, `typecheck`, `test`, `build`, `e2e`, `lighthouse` once they have run once        |
| S-05         | Failing lint, type or build blocks a merge                                           | HUMAN    | Open a throwaway pull request with a lint error and confirm it cannot merge                                                |
| Housekeeping | The S-03 to S-21 pull request is open and merged                                     | **GAP**  | Branches are pushed up to S-18; S-19 to S-22 are local. Open the pull request, merge when CI is green                      |
| Housekeeping | Dependency update checks                                                             | PASS     | `.github/dependabot.yml` added in this branch (weekly, minor and patch grouped)                                            |

## Environments and hosting

| Task | Item                                                               | Status      | Evidence or what to do                                                                                                |
| ---- | ------------------------------------------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| S-06 | Vercel project imported; preview, staging, production environments | HUMAN       | Vercel > project. Confirm each pull request gets a Preview link                                                       |
| S-06 | Separate variable set per environment; secrets server-only         | HUMAN       | Vercel > Settings > Environment Variables. Names are in the README table. Only `NEXT_PUBLIC_*` may reach the browser  |
| S-06 | Secrets not in client bundles                                      | PASS (code) | Secrets are read only in server files (`fetch.ts` uses `server-only`; API routes). Re-check the built bundle at T-161 |
| S-07 | Staging behind password or SSO                                     | HUMAN       | Vercel > Settings > Deployment Protection. Not set by code                                                            |
| S-07 | noindex and robots disallow outside production                     | PASS        | `layout.tsx` metadata, `robots.ts`; checked by two e2e tests                                                          |
| S-07 | Staging and preview point only at test services                    | HUMAN       | No external services are wired yet. Re-check when the form and email provider arrive (T-055, T-066)                   |

## Design system

| Task | Item                                                                       | Status | Evidence or what to do                                                                                   |
| ---- | -------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| S-08 | Tokens in one file feeding Tailwind; breakpoints 640, 760, 900, 1080, 1200 | PASS   | `src/styles/tokens.css` (breakpoints are 641, 761, 900, 1081, 1201 px, written as "above" values)        |
| S-08 | Token page matches the design file side by side                            | HUMAN  | Open `/tokens` next to the Figma file and compare                                                        |
| S-09 | Inter self-hosted; no third-party font request                             | PASS   | `next/font`; e2e test fails on any third-party request                                                   |
| S-10 | Primitives documented; focus visible on light and dark; reduced motion     | PASS   | `/styleguide`, focus rules in `globals.css`, `prefers-reduced-motion` block; axe passes on `/styleguide` |

## CMS

| Task | Item                                                                | Status             | Evidence or what to do                                                                                |
| ---- | ------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------- |
| S-11 | Sanity project with staging and production datasets                 | HUMAN              | sanity.io/manage. Project ID is read from `.env.local`, which I did not open                          |
| S-11 | Studio opens at `/studio` and saves a test document                 | HUMAN              | Needs a login. `/studio` loads in the build and under the CSP                                         |
| S-11 | CORS origins for preview, staging, production                       | HUMAN              | sanity.io/manage > API > CORS origins. Needed for the studio and for draft preview                    |
| S-12 | Publishing blocked when alt text, credit or SEO title is empty      | HUMAN              | Rules are unit tested and schema-validated; the studio's Publish button was not exercised             |
| S-13 | Settings and navigation singletons                                  | PASS (code)        | Studio check pending, as above                                                                        |
| S-13 | Only publishers can change navigation                               | **GAP**            | Needs custom roles (S-14), a paid-plan feature. Free plan lets every editor change it. Blocker for G5 |
| S-14 | Roles and permissions                                               | **GAP (deferred)** | Deferred to the paid plan by the project lead                                                         |
| S-15 | Draft visible only to signed-in editors; public never shows a draft | HUMAN              | Code path done; needs a read token and a live test (see `docs/runbook.md`)                            |
| S-15 | Scheduled publishing marked supported or out of scope               | Decision           | Marked out of scope on the free plan; confirm against Sanity's pricing page                           |
| S-16 | Signed webhook; unsigned rejected                                   | PASS               | Tested with real signatures: 401 unsigned, 200 signed, drafts ignored                                 |
| S-16 | Publishing updates product page, listing and home within a minute   | HUMAN              | Needs the live webhook and the first real pages                                                       |

## Security and monitoring

| Task | Item                                                          | Status  | Evidence or what to do                                                                         |
| ---- | ------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| S-17 | Rendering and CSP decision logged with script list            | PASS    | `docs/decisions/0001-rendering-and-csp.md`; no CSP violations on `/`, `/styleguide`, `/studio` |
| S-18 | Error reports scrub form data                                 | PASS    | Unit tests in `src/tests/sentry-scrub.test.ts`                                                 |
| S-18 | A forced error and a forced outage both reach the named owner | HUMAN   | Needs the Sentry project, an alert owner and an uptime monitor (`docs/monitoring.md`)          |
| S-18 | Source maps for readable traces                               | **GAP** | Needs `SENTRY_AUTH_TOKEN` and `withSentryConfig`. Before launch                                |

## Testing and documentation

| Task | Item                                              | Status       | Evidence or what to do                                                                             |
| ---- | ------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------- |
| S-19 | One Playwright test and one axe check run in CI   | PASS locally | The `e2e` job has not run on GitHub yet; confirm it is green on the pull request                   |
| S-20 | Oversized page fails the budget                   | PASS         | Proven with a 693 KB script against a 260 KB limit; the `lighthouse` job has not run on GitHub yet |
| S-20 | Device and network profile agreed with the client | HUMAN        | Default mobile slow-4G profile proposed in `docs/performance.md`                                   |
| S-21 | Fresh machine can run the site from the README    | PASS         | Clean clone passed install, lint, typecheck, test and build                                        |
| S-21 | Contacts, backup plan, restore tested             | **GAP**      | Contacts table is blank. Backup frequency and one staging restore are undone (`docs/runbook.md`)   |

## Open client questions that touch the foundation

Q-10 (final navigation structure) is open; the navigation schema fits either answer. Q-09 and Q-11 to Q-20 do not block the first slice except Q-13 (SMS consent wording) and Q-11 (CRM), which block the contact form's final behavior, not its start.

## Can the first slice start?

**Not yet.** The code is ready. These four things are not, and each takes minutes to hours:

1. Merge the pull request after CI shows the new `e2e` and `lighthouse` jobs green.
2. Replace the CODEOWNERS placeholders and turn on branch protection with the required checks (S-02, S-05).
3. Confirm Vercel, Sanity CORS and the studio test document (S-06, S-11, S-12).
4. Fill in the contacts table and name the alert owner (S-18, S-21).

Everything else on the list can be accepted with the GAP items written down as known, with owners.

## Sign-off

| Developer                          | Name | GitHub username | Date | Signature |
| ---------------------------------- | ---- | --------------- | ---- | --------- |
| A (back end, CMS, CI, security)    |      |                 |      |           |
| B (UI, tokens, components, motion) |      |                 |      |           |
