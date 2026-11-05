# Build plan: first slice and beyond

Drafted 2026-11-05 as director and senior developer. Nothing in this plan has been built. It sets the order, the decisions that must be made first, and the quality and security rules for every task. Read it, change what you disagree with, then sign off in the last section.

## 1. Where we are

- Setup tasks S-01 to S-22 are done in code. Gate G1 is not signed: see `docs/gate-g1-foundation-review.md`.
- A security audit of the code is in progress. Its findings come before new work.
- The plan has 117 build, content and launch tasks (T-063 to T-179 not yet started) plus the 22 shell and first-slice tasks (T-041 to T-062).

## 2. What I found that changes the plan

1. **Tasks T-001 to T-040 are not in the workbook, but 66 of the 139 build tasks (T-041 to T-179) depend on 27 of them** (T-004 to T-038). Examples: T-028 (shared components), T-030 (CMS content model), T-024 (data store), T-010 and T-016 (email provider and sending domain), T-036 (failure alerts), T-019 (approved content), T-020 (scope sign-off, gate G0). Either they were done elsewhere or they were never done. **Action: the project lead confirms which exist.** Until then I treat the following as undecided: data store, spam protection, email and CRM provider, alert owner, approved copy, and scope sign-off.
2. **The contact form is the riskiest task in the first slice.** It takes personal data from the public. It needs a database, spam protection, rate limiting, email and an alert path. None of those exist yet.
3. **Personal data must not go into Sanity.** On the free plan the dataset is public to anyone with the project ID. Enquiries and subscribers need a separate private database.
4. **The performance budget will fight the design.** The mock embeds about 6.7 MB of images and an animated canvas. Blocking time is already at two-thirds of its limit with an empty page.
5. **Open client questions that block the form:** Q-11 (where enquiries go), Q-12 (who is alerted), Q-13 (SMS consent wording), Q-17 (email provider). Navigation Q-10 and palette/background Q-06, Q-07 are already coded as the safe default.

## 3. How we work

| Role               | Who                                    | Does                                                                                            |
| ------------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Director           | Claude                                 | Orders the work, runs the gates and checkpoints, keeps the decision log, says no to scope creep |
| Senior developer   | Claude with the `ponytail-dev` agent   | Builds the smallest complete change per task                                                    |
| Reviewer           | `senior-reviewer` agent                | Runs every check and reads the connected code. Read-only                                        |
| Security           | `security-guard` agent                 | Tries to find a way in. Read-only                                                               |
| Project lead       | You                                    | Decides, approves, owns accounts and client contact                                             |
| Developers A and B | Humans                                 | Review pull requests; take any task you hand over                                               |
| Client             | Approver and day-to-day contact (Q-02) | Approves content, answers questions                                                             |

Assumption to confirm: Claude builds both the Developer A and Developer B tasks in this plan, and the human developers review. If B builds the UI, hand B the tasks marked "UI" below.

### Definition of done for every task

1. Acceptance line in the workbook is met and demonstrated, not claimed.
2. `npm run lint`, `typecheck`, `test`, `build`, `e2e` and `lhci` pass.
3. Keyboard works, focus is visible, reduced motion respected, 320 px layout checked, axe clean.
4. Tokens used, no hard-coded colours. CMS fields reuse the S-12 types. Required fields block publishing.
5. Any new third-party host is in the CSP and the decision log. Any new variable is in `.env.example` and the README.
6. One commit per task, task ID first. One small pull request per batch, never to `main` directly.

### Checkpoint rule

After every 5 tasks: security audit, senior review and ponytail review (`docs/checkpoints.md`). I fix blockers and high findings before the next batch.

## 4. Decisions needed before the form is built

Each has a default I will use if you say "go with your defaults". The decision owner can change it later at a cost.

| #   | Decision                                                   | Recommended default                                                                                                | Why                                                                       | Owner           |
| --- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- | --------------- |
| D1  | Private data store for enquiries, tokens, consent and logs | Postgres on Neon (via the Vercel Marketplace), free tier to start                                                  | Private, relational, cheap, easy to back up. Not Sanity                   | Lead            |
| D2  | Spam protection                                            | A hidden honeypot field, a minimum fill time and rate limits first. Add Cloudflare Turnstile only if abuse appears | Avoids a third-party script and a privacy line item. Easy to add later    | Lead            |
| D3  | Rate limit store                                           | The same Postgres (a small counter table)                                                                          | One less service                                                          | Lead            |
| D4  | Email sending                                              | Resend (or Postmark) with SPF, DKIM and DMARC on a subdomain                                                       | Q-17 and T-057. Needs the client's DNS                                    | Client and lead |
| D5  | Where enquiries go                                         | Saved in Postgres first, then emailed to a shared inbox, CRM later                                                 | Never loses an enquiry even with email down (T-056). Q-11 decides the CRM | Client          |
| D6  | Failure alert owner                                        | Named person by email plus Sentry alert                                                                            | Q-12                                                                      | Client          |
| D7  | Form validation                                            | A small schema validator shared by browser and server (Zod)                                                        | One definition, server always re-checks                                   | Lead            |
| D8  | Hosting plan for the database and CMS at launch            | Upgrade Sanity plan before G5; roles and private dataset need it                                                   | Free plan cannot give publisher-only structure changes                    | Lead and client |

## 5. Order of work for the first slice (T-041 to T-062)

22 tasks in five batches. Each batch ends with a checkpoint. Dependencies in the workbook are respected.

| Batch | Tasks                                                                                                                                                                  | Theme                                                                                                                                  | Checkpoint                      |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| 0     | None                                                                                                                                                                   | Close G1: merge the pull request, CODEOWNERS, branch protection, Vercel and Sanity checks, decisions D1 to D8, read the security audit | Security audit report (running) |
| 1     | T-047 headings and sections, T-045 hero, T-046 CTA panels, T-048 cards, T-051 Product schema                                                                           | The building blocks. The Product schema also deletes `testDoc`                                                                         | Checkpoint 3                    |
| 2     | T-052 product page template, T-041 header, T-043 footer, T-054 contact form UI, T-055 contact form handler                                                             | A real page and the form, with the server side written security-first                                                                  | Checkpoint 4                    |
| 3     | T-056 delivery with failure strategy, T-057 sender and confirmation email, T-060 staging routes to test workflows, T-058 thank-you page, T-050 skip link and landmarks | Make the form safe and reliable                                                                                                        | Checkpoint 5                    |
| 4     | T-042 mobile navigation, T-044 breadcrumbs, T-049 scroll reveal, T-053 PostureOne content, T-061 full journey test                                                     | Finish the shell, enter real content, prove the journey                                                                                | Checkpoint 6                    |
| 5     | T-062 client demo, T-059 SMS consent review (client), fixes from feedback                                                                                              | Gate G2                                                                                                                                | Final review before the demo    |

Why this order: the page template cannot be built until the hero, CTA, headings, cards and Product schema exist. The form handler (T-055) is built early on purpose, because it is the largest risk and needs the data store decided. Content entry (T-053) waits for the template and for client-approved copy (T-019).

### Form pipeline: security requirements written down now

These are the acceptance rules `security-guard` will check at checkpoint 4 and 5.

- Server validates and length-limits every field. The browser check is only for convenience.
- Honeypot, minimum fill time, rate limits per address and per IP, request size limit.
- Idempotency: a double click or a retry creates one enquiry.
- Saved to the private database before anything else. Email and CRM are retried from a queue. The visitor sees success once the enquiry is saved.
- Visitor errors never show internal details. Logs and Sentry never contain field contents.
- No email header injection: addresses and subject lines are validated, never concatenated.
- The same response whether or not an address was seen before.
- The thank-you page works only after a submission and is `noindex`.
- Staging submits to a test inbox only, and the production keys do not exist in staging.

## 6. The rest of the plan

| Phase                                                                      | Tasks          | Batches of 5 | Notes                                                                                                                               |
| -------------------------------------------------------------------------- | -------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| 2 Template expansion (products, home, proof, solutions, thinking, company) | T-082 to T-129 | about 10     | Gate G3 per page group, reviewed by the developer who did not build it. Home performance (T-097) is the hardest task                |
| 4 Newsletter and white papers                                              | T-063 to T-081 | about 4      | Second highest risk: tokens, signed links, private PDFs, unsubscribe. Needs Q-17 to Q-20 answered. Security checkpoint is mandatory |
| 4 Tools and motion                                                         | T-130 to T-144 | about 3      | ROI calculator needs Q-15. Motion built last, behind reduced-motion and the pause rules                                             |
| 3 Content and migration                                                    | T-145 to T-155 | about 2      | Gate G4 content freeze                                                                                                              |
| 5 Quality and launch                                                       | T-156 to T-179 | about 5      | Final security headers (T-161), third-party scan if Q-22 says so, three rehearsed rollbacks for G6                                  |

At 5 tasks per checkpoint the plan needs about 28 more checkpoints. That is the cost of the rule you set, and I think it is right for a security company. If it slows delivery, the fallback is a light checkpoint (security audit only on changed files) every 5 tasks and the full one every 10.

## 7. Risks and what I will do

| Risk                                                | Likelihood        | What I will do                                                                                                                                                         |
| --------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Personal data stored in a public CMS dataset        | High if unchecked | D1: private database. Add a test that fails if a form route writes to Sanity                                                                                           |
| Spam and abuse on the contact form                  | High              | D2, D3, honeypot and rate limits before launch. Monitor in Sentry                                                                                                      |
| Client answers arrive late (Q-11, Q-12, Q-13, Q-17) | High              | Build against the default in section 4. Keep the provider behind one small interface so a change is one file                                                           |
| Home page cannot meet the budget                    | Medium            | Image pipeline through Sanity (modern formats, sized), canvas loaded after first paint, lazy sections. Re-baseline the JavaScript budget at T-097 with written reasons |
| Studio permissions on the free plan                 | Medium            | Document it. Upgrade before G5                                                                                                                                         |
| Dependency or supply-chain issue                    | Medium            | Dependabot, `npm audit` at each checkpoint, lockfile only, no new dependency without a reason                                                                          |
| A task looks done but is wrong                      | Medium            | Acceptance line demonstrated, reviewer reads connected code, checkpoint every 5 tasks                                                                                  |
| Scope creep from "just one more thing"              | Medium            | Ponytail: skipped items are named in one line and logged, not built                                                                                                    |

## 8. Gates

| Gate                  | When               | Who signs          | What I will bring                             |
| --------------------- | ------------------ | ------------------ | --------------------------------------------- |
| G0 Scope sign-off     | Before batch 1     | Client approver    | Status of T-020 to be confirmed by the lead   |
| G1 Foundation review  | Before batch 1     | Both developers    | `docs/gate-g1-foundation-review.md`           |
| G2 First journey demo | After batch 5      | Client approver    | Live staging run, including the CRM-down case |
| G3 to G6              | As in the workbook | As in the workbook | Evidence from each checkpoint                 |

## 9. What I need from you before batch 1

1. Confirm the T-001 to T-040 status: which exist, and where (especially T-020, T-024, T-028, T-030).
2. Say "go with your defaults" for D1 to D8, or change any of them.
3. Both GitHub usernames, to fix CODEOWNERS.
4. Confirm that I build both developer tracks, with the humans reviewing.
5. Tell me when the security audit report should be acted on first (my recommendation: yes, before batch 1).

## Sign-off

| Role         | Name | Date |
| ------------ | ---- | ---- |
| Project lead |      |      |
| Developer A  |      |      |
| Developer B  |      |      |
