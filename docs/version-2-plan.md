# Version 2 plan

Drafted 2026-11-09. Version 2 is Version-1 (the work Jai pushed, "done to T-179") corrected so that every page looks and behaves like the approved prototype (version 5), verified, secured, and connected to Sanity. The work is split in half between Claude and ChatGPT.

This is a draft. Section 8 (audit results) is filled in as the three audits finish. Section 10 lists what the project lead must decide.

## 1. What Version 2 is

- **Branch:** `Version-2`, created from `Version-1` (commit `89eb178`). Nothing on `Version-1` is changed.
- **Reference:** the prototype is copied into the repository at `reference/prototype-v5/` (open `index.html`; each page is a view, opened with `index.html#<name>`, for example `#products` or `#postureone`). It is the source of truth for how every page looks.
- **Definition of "same as the prototype":** the design is the same. The same sections in the same order, the same words, the same images, the same colours, spacing, type sizes, card and button styles, the same dark and light bands, the same interactive pieces (tabs, carousels, the ROI calculator, scroll reveal), and the same layout at 1280, 900 and 375 px. The prototype's own CSS rules and markup are copied across rather than re-interpreted, so the result matches. The app stays on Next.js and React.

## 2. What is verified about Version-1 so far

| Check                             | Result                                                                                                                                                                                                                                                                                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typecheck (`npm run typecheck`)   | Passes                                                                                                                                                                                                                                                                                                   |
| Unit tests                        | 187 pass in 38 files                                                                                                                                                                                                                                                                                     |
| Production build                  | Passes; 96 routes                                                                                                                                                                                                                                                                                        |
| Lint (`npm run lint`)             | **Fails: 5 errors, 2 warnings.** Four `require()` imports, one setState-in-effect in `src/components/home/ProductCoverflow.tsx`                                                                                                                                                                          |
| Prettier (`npm run format:check`) | **Fails on about 190 files**                                                                                                                                                                                                                                                                             |
| Handover note claims              | "0 warnings, 0 errors" for lint and "zero security flaws". The first is not true; the second is being audited                                                                                                                                                                                            |
| Basis                             | Version-1 is built on S-22. It does **not** contain Claude's Batch 1 to 3 or the security-audit fixes (webhook replay protection, CSP path fix, validation fixes, the contact handler hardening). GitHub no longer holds the `batch1`, `batch2` and `batch3` branches; they are safe on Claude's machine |
| Dependencies                      | No database client and no schema validator in `package.json`. Where enquiries, subscribers and tokens are stored is being audited                                                                                                                                                                        |

Not yet run: end-to-end tests, Lighthouse budgets, a visual comparison with the prototype, a security audit, a task-by-task completeness check. Three audits are running for exactly these (section 8).

## 3. How the work is divided

Principle: split by **page and folder**, so the two sides never edit the same file. Anything shared is owned by one side.

### Shared files (owner: Claude)

`src/app/globals.source.css`, `src/app/globals.css`, `src/styles/tokens.css`, `src/components/layout/*` (header, footer, navigation, skip link), `src/components/ui/*` (buttons, headings, base cards), `src/app/layout.tsx`, `next.config.ts`, `package.json` and the lockfile, `.github/*`, `src/lib/*`, `src/app/api/*`, `src/sanity/*`, `scripts/*`, `e2e/` shared helpers, `playwright.config.ts`, `lighthouserc.cjs`.

ChatGPT never edits these. If ChatGPT needs a shared change (a new token, a header tweak, a new dependency), it writes the request in `docs/v2-requests.md` and Claude makes it within the day. Page-specific styling goes in a CSS file next to the page that uses it.

### Claude's half (17 views plus everything that is not a page)

| Views                                                            | Folders                                                                                                                  |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| The shell: header, footer, navigation, 404, skip link            | `src/components/layout`, `src/app/not-found.tsx`                                                                         |
| thinking, industry, the 5 articles                               | `src/app/thinking`, `articles`, `resources`, `src/components/thinking`                                                   |
| about, careers, enterprise                                       | `src/app/about`, `careers`, `enterprise`, `src/components/about`                                                         |
| contact, thank you, login, register, unsubscribe, privacy, terms | `src/app/contact`, `login`, `register`, `unsubscribe`, `privacy`, `terms`, `src/components/forms`, `src/components/auth` |

Not pages (Claude):

1. Make the base clean: lint errors, Prettier, the missing pieces from the audits.
2. Bring the security fixes across from Claude's batches, or replace them with something at least as strong.
3. All data handling: enquiries, subscribers, tokens, email, rate limits, owner page, retention, cleanup.
4. The Sanity connection, its configuration, content import, webhook and draft preview (section 6).
5. CI, Lighthouse budgets, accessibility sweep, security headers, rollbacks, launch checklist.
6. Review of every ChatGPT pull request, and the final audits.

### ChatGPT's half (20 views plus content preparation)

| Views                                                                                           | Folders                                                                                                        |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| home                                                                                            | `src/app/page.tsx`, `src/components/home`, `src/app/home-and-proof.css`                                        |
| products overview and the 5 product pages (PostureOne, EvalOne, XSense, AMS, Passwordless Keys) | `src/app/products`, `src/components/products`, `src/data/products`                                             |
| compare and ROI                                                                                 | `src/app/compare`, `src/app/roi`, `src/app/roi-calculator`, `src/app/products/compare`, `src/app/products/roi` |
| solutions overview and the 5 solution pages                                                     | `src/app/solutions`, `src/types/solution.ts` and the solutions data                                            |
| proof and the 4 case studies                                                                    | `src/app/proof`, `src/app/case-studies`                                                                        |

Not pages (ChatGPT):

1. For each page it owns: match the prototype at the three widths, using the screenshot comparison described in the brief.
2. Prepare the Sanity content: turn the prototype's words and images for its pages into import files (`data/seed/*.ndjson`), field by field against the schemas.
3. Write a Playwright smoke test per page it owns (loads, one h1, headings in order, no console errors, axe clean, key links work).
4. List every image used, with alt text, and confirm it is sized and compressed.
5. Check reduced-motion and keyboard behaviour on the interactive pieces of its pages.

The allocation is provisional until the fidelity survey recommends a grouping (section 8). It is changed there if the survey shows one half is much larger.

## 4. Order of work

| Phase | Who               | What                                                                                                                                                                    | Done when                                                            |
| ----- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 0     | Claude            | Clean base: lint and Prettier pass; `reference/` ignored by lint and Prettier; this plan and the brief committed; audit findings triaged; security fixes brought across | `npm run lint`, `typecheck`, `test`, `build` all pass on `Version-2` |
| 1     | Both, in parallel | Each side fixes its own pages against the prototype; Claude also builds the data layer and the Sanity connection; ChatGPT prepares the content import                   | Each page graded A or B in the side-by-side survey, with a test      |
| 2     | Claude            | Review and merge each ChatGPT pull request (checks, security review for anything touching data), integrate                                                              | `Version-2` builds and every test passes after every merge           |
| 3     | Claude            | Whole-site checks: end-to-end, axe on every page, Lighthouse budgets, security audit, senior review, ponytail review; fix what they find                                | All three reviews clean of blockers and high findings                |
| 4     | Lead and Claude   | Sanity connected to the real project, content imported, publish-to-live and preview proven, staging walkthrough, launch checklist                                       | The first-journey demo and the launch checklist pass                 |

A pull request is small (one page or one area), named `v2/claude-<area>` or `v2/chatgpt-<area>`, and goes into `Version-2`. Nobody pushes to `Version-2` directly.

## 5. Rules both sides follow

- Match the prototype before improving it. If the prototype is wrong (an accessibility problem, a broken link), match it visually and note the problem in the pull request.
- Every pull request shows, for each page it changes, the prototype and the app side by side at 1280, 900 and 375 px.
- Run before every push: `npm run lint`, `npm run typecheck`, `npm run test`, `npx prettier --check .`, `npm run build`, and `npm run e2e` for the pages touched. All must pass.
- No secrets in the code. No personal data in Sanity, in files, or in logs.
- No new dependency without writing the reason in the pull request. New dependencies are added by Claude.
- Copy the prototype's CSS and markup; do not paraphrase it. Where the app uses a utility class instead of the prototype's CSS, the computed result (size, colour, spacing) must be equal.
- Every image has alt text, every interactive piece works by keyboard, reduced motion is respected.

## 6. Connecting Sanity

The code side is already prepared: the studio is embedded at `/studio`, the schemas and the validation exist, the webhook and draft preview routes exist, and pages fall back to built-in content when the CMS cannot be reached. What is missing is the real project and its settings.

| Step                                                                                              | Who                                                          | Detail                                                                                                       |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| 1. Create the Sanity project with two datasets, `staging` and `production`                        | Project lead                                                 | sanity.io/manage. Use the client's organization. Two-factor on for everyone                                  |
| 2. Send the project ID                                                                            | Project lead                                                 | It is not a secret. Never send tokens in chat                                                                |
| 3. CORS origins                                                                                   | Project lead                                                 | Add the studio and site addresses for local, preview, staging and production (exact addresses, no wildcards) |
| 4. A read-only token (Viewer role), a webhook secret                                              | Project lead                                                 | Put them in Vercel and `.env.local`, never in the repository. Names are in `.env.example`                    |
| 5. The publish webhook                                                                            | Project lead, with Claude's steps from `docs/cms-webhook.md` | URL, secret, filter, projection                                                                              |
| 6. Deploy the schema, check the studio, publish a test document                                   | Claude                                                       | Verify required fields block publishing and the studio matches the schemas                                   |
| 7. Content seed files                                                                             | ChatGPT                                                      | `data/seed/*.ndjson` for its pages, field by field                                                           |
| 8. Import the seed, check each page renders from the CMS, check publish-to-live and draft preview | Claude                                                       | With signed webhook calls, a renamed page, an unpublished page                                               |
| 9. Roles and the plan                                                                             | Project lead and client                                      | Editor and publisher roles need a paid plan; decide before launch                                            |

## 7. Quality gates

1. **Per page:** fidelity grade A or B at the three widths, one h1, axe clean, no console errors, a smoke test.
2. **Per pull request:** all checks pass; a reviewer who did not write it has read it.
3. **Whole site:** end-to-end tests, Lighthouse budgets, a security audit that reproduces attacks against a local build, a senior review that runs every check, a ponytail review that removes bloat.
4. **Before launch:** the launch checklist in the runbook, rollbacks rehearsed, alerts tested, two-factor everywhere.

## 8. Audit results

To be filled in as each finishes:

- Security audit of Version-1: _pending_
- Task completeness, T-041 to T-179: _pending_
- Fidelity survey of the 37 prototype views: _pending_

## 9. Risks

| Risk                                                                                             | What I will do                                                                                         |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Version-1 claims completeness it does not have (the handover note says lint is clean; it is not) | Treat every claim as unverified until the completeness audit confirms it                               |
| Version-1 lacks the security fixes                                                               | Phase 0 brings them across, and the security audit decides what else is missing                        |
| Two builders edit the same file                                                                  | Ownership by folder, shared files owned by Claude, requests through `docs/v2-requests.md`              |
| ChatGPT cannot run the site or see the prototype                                                 | The brief tells it exactly how; the prototype is in the repository                                     |
| Matching the prototype breaks accessibility or performance                                       | Match visually, then fix the underlying cause in a way that looks the same; the budgets and axe decide |
| Personal data stored somewhere public                                                            | The security audit checks where data lives; the rule is a private database only                        |

## 10. Decisions for the project lead

1. **The allocation in section 3:** confirm, or move pages between the two halves.
2. **My earlier batch branches:** they hold the hardened contact form, the email delivery with retries, the owner page and the review fixes. Version-1 has its own versions of some of these. After the audits, I recommend which version of each to keep. Do you want me to re-push those branches so they are on GitHub?
3. **Sanity:** who creates the project, and when (section 6, steps 1 to 5).
4. **Who merges:** the plan has Claude merge into `Version-2`. If a human developer must approve, name them.
