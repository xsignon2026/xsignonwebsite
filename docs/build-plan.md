# Build plan: first slice and beyond (version 2)

Drafted 2026-11-05, revised after an independent review of version 1. Nothing in this plan has been built. It sets the order, the decisions that must be made first, and the quality and security rules for every task. Read it, change what you disagree with, then sign off in the last section.

**What changed from version 1:** the foundation claims now separate "done in code" from "verified in the real accounts"; the primary visitor journey and the enquiry destination are decided up front; the form gets a durable delivery design (transactional outbox) with three observable outcomes; the checks are tiered instead of running everything on every task; and the homepage, migration and cutover sequencing was tightened. Section 10 lists every review point and what I did with it.

## 1. Where we are

- Setup tasks S-01 to S-22 are done in code, but all 22 are still "Not started" in the workbook. `docs/setup-status.csv` proposes the correct status for each one, with evidence.
- Gate G1 is not signed. `docs/gate-g1-foundation-review.md` separates what is verified in code from what only a person can verify in a web console.
- The security audit finished. Its five findings are fixed and committed. A senior review and a ponytail review also finished; their findings are being fixed now.
- Remaining work: the 22 shell and first-slice tasks (T-041 to T-062) and 117 later tasks (T-063 to T-179).

## 2. What I found that changes the plan

1. **Ten earlier tasks feed the first slice and have no evidence yet.** The workbook says its T-xxx IDs match an earlier SharePoint task list, so T-004 to T-038 probably exist there. Across the whole plan, 66 of 139 build tasks depend on 27 of them; ten feed the first slice: T-010, T-016, T-019, T-024, T-025, T-028, T-030, T-031, T-034, T-036. Version 1 said they might "never have been done". The more likely case is that they are done or tracked elsewhere and not linked. `docs/first-slice-prerequisites.md` lists each one for the lead to link to its SharePoint row, owner and evidence.
2. **The contact form is the riskiest first-slice task.** It takes personal data from the public. Its failure behavior is the part most likely to go wrong silently (see section 6).
3. **Personal data must not go into Sanity.** On the free plan the dataset is public to anyone with the project ID. Enquiries and subscribers live in a private database.
4. **Private files need their own store.** Ordinary Sanity assets are fetchable by URL even in a private dataset, so gated PDFs (T-063, T-064) use the private storage, and editors are trained not to upload them to Sanity.
5. **The performance budget will fight the design.** The mock embeds about 6.7 MB of images and an animated canvas. Blocking time is already at two-thirds of its limit on an almost empty page, and one local run exceeded it.
6. **Open client questions that block the form:** Q-11 (where enquiries go), Q-12 (who is alerted), Q-13 (SMS consent), Q-17 (email provider). Q-09 (Login and Create account) decides what the primary call to action promises.

## 3. How we work

| Role               | Who                                    | Does                                                                                                             |
| ------------------ | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Director           | Claude                                 | Orders the work, runs the gates and checkpoints, keeps the decision log, says no to scope creep                  |
| Senior developer   | Claude with the `ponytail-dev` agent   | Builds the smallest complete change per task                                                                     |
| Reviewer           | `senior-reviewer` agent                | Runs every check and reads the connected code. Read-only                                                         |
| Security           | `security-guard` agent                 | Tries to find a way in. Read-only                                                                                |
| Project lead       | You                                    | Decides, approves, owns accounts and client contact                                                              |
| Developers A and B | Humans                                 | **Each pull request has one named human who reviews and merges it.** AI writing both tracks does not remove this |
| Client             | Approver and day-to-day contact (Q-02) | Approves content, answers questions                                                                              |

Assumption to confirm: Claude builds both the Developer A and Developer B tasks, and the human developers review and merge.

### Evidence required per task (tiered)

Running every suite on every task wastes time on copy entry and client review. Checks are tiered:

| Tier              | Applies to                        | Required                                                                                                                                                      |
| ----------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Merge check       | Every pull request with code      | `npm run lint`, `typecheck`, `test`, `build` pass in CI. Prettier check. Focused evidence for the change: the acceptance line from the workbook, demonstrated |
| Component or page | A new component, page or template | Merge check plus: keyboard works, focus visible, reduced motion respected, 320 px layout, axe clean, tokens used, CMS fields reuse the S-12 types             |
| Gate or batch end | End of each batch and each gate   | Everything above plus `npm run e2e`, `npm run lhci`, the checkpoint (security audit, senior review, ponytail review)                                          |
| Content only      | Copy entry, client review         | The acceptance line only. No code suite                                                                                                                       |

Always: any new third-party host is in the CSP and the decision log; any new variable is in `.env.example` and the README; one commit per task, task ID first; one small pull request per batch, never straight to `main`.

The package manager is npm (the workbook's S-03 says pnpm). That deviation is recorded in the decision log and approved by both developers at G1.

### Checkpoint rule

After every 5 tasks (the rule you set): security audit, senior review and ponytail review (`docs/checkpoints.md`). Blockers and high findings are fixed before the next batch.

Proposal to keep the rule useful without turning copy edits into ceremony. Same rhythm, different weight:

| Weight   | When                                                                                                                                                  | What runs                                                                                              |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Light    | Every 5 tasks, if the tasks were copy, content or styling only                                                                                        | Merge checks, plus a security scan of the changed files only                                           |
| Standard | Every 5 tasks that changed code                                                                                                                       | The three reviews as now, scoped to the changed code                                                   |
| Deep     | Whenever a batch adds public data collection (T-055, T-056), changes publish or navigation permissions, or prepares production cutover (T-170, T-173) | Full audit with reproduction against a local build, and a human reads the result before the next batch |

Say if you would rather keep every checkpoint at full weight.

## 4. Decisions needed before the form is built

Each has a default I will use if you say "go with your defaults". The decision owner can change it later at a cost.

| #   | Decision                                                                | Recommended default                                                                                                                                                                                                                            | Why                                                                                                                          | Owner               |
| --- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| D1  | Private data store                                                      | Postgres on Neon (via the Vercel Marketplace), free tier to start                                                                                                                                                                              | Private, relational, cheap, easy to back up. Not Sanity                                                                      | Lead                |
| D2  | Spam protection                                                         | Honeypot, minimum fill time, rate limits first. Add Cloudflare Turnstile only if abuse appears                                                                                                                                                 | Avoids a third-party script and a privacy line item                                                                          | Lead                |
| D3  | Rate limit store                                                        | The same Postgres                                                                                                                                                                                                                              | One less service                                                                                                             | Lead                |
| D4  | Email sending                                                           | Resend (or Postmark) with SPF, DKIM and DMARC on a subdomain                                                                                                                                                                                   | Q-17, T-057. Needs the client's DNS                                                                                          | Client and lead     |
| D5  | Where enquiries go at launch                                            | **Inbox first.** Saved in Postgres, then emailed to a restricted shared inbox. A CRM is added later only if the client asks                                                                                                                    | Q-11 is open. The tests below match this choice, not a CRM                                                                   | Client              |
| D6  | Failure alert owner                                                     | A named person by email plus a Sentry alert                                                                                                                                                                                                    | Q-12                                                                                                                         | Client              |
| D7  | Form validation                                                         | Zod, shared by browser and server; server always re-checks                                                                                                                                                                                     | One definition                                                                                                               | Lead                |
| D8  | Sanity plan                                                             | Test the real draft, publish and navigation permissions with real accounts during Batch 0. Decide on the paid plan before any step that needs private staging content or a publisher-only role, and no later than G5                           | A permission mistake on the free plan is cheaper to find now than at launch                                                  | Lead and client     |
| D9  | Primary call to action                                                  | **A marketing site whose goal is enquiries.** The primary CTA goes to the contact form. Login and Create account link to the existing sign-in (the workbook's own Q-09 default). Mandatory demo registration is out of this release            | Q-09. If the client wants registration, it becomes its own journey with its own acceptance criteria and test, not a footnote | Client              |
| D10 | SMS consent checkbox                                                    | **Build the form without it** until legal approves the wording (T-059, Q-13). Adding it later is a small change; shipping unapproved consent wording is not                                                                                    | The form fields must be frozen before the journey test, so this is decided first                                             | Client and legal    |
| D11 | Who can read enquiries, how long they are kept, what the inbox receives | Two named people have database access. Rows kept 12 months, then deleted (confirm with Q-20). The inbox receives the full submission, from the authenticated sender, to a restricted shared mailbox. Bodies are never logged or sent to Sentry | A private database protects the original record only. The inbox and monitoring need their own rules                          | Lead, client, legal |

### Which decisions block what

Every decision below is **Proposed** until the project lead confirms it. Record "Approved, by whom, date" here when that happens. You can approve only the ones that block the next step; the rest can wait.

| Decision                                                 | Status   | Blocks                                                                              | Needed by                 |
| -------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------- | ------------------------- |
| D9 Primary call to action                                | Proposed | T-046 (CTA panels point somewhere), the scope of G2                                 | **Batch 1**               |
| D10 SMS checkbox                                         | Proposed | T-054 (form fields are frozen before the journey test)                              | **Batch 2**               |
| D1 Private data store, D3 Rate limit store               | Proposed | T-055                                                                               | Batch 2                   |
| D2 Spam protection, D7 Validation                        | Proposed | T-054, T-055                                                                        | Batch 2                   |
| D11 Access, retention, inbox content                     | Proposed | T-055, T-056                                                                        | Batch 2                   |
| D4 Email sending, D5 Enquiry destination, D6 Alert owner | Proposed | T-056, T-057, T-060                                                                 | Batch 3                   |
| D8 Sanity plan                                           | Proposed | Any step needing private staging content or a publisher-only role; no later than G5 | Batch 0 test, G5 decision |

**To start Batch 1 you need:** G0 and G1 signed, the ten prerequisites linked (T-028 and T-030 matter most, because Batch 1 builds on the shell and the content model), and D9 confirmed. Nothing else on the list blocks Batch 1.

## 5. Order of work for the first slice (T-041 to T-062)

22 tasks in five batches after Batch 0. Each batch ends with a checkpoint. Workbook dependencies are respected.

| Batch | Tasks                                                                                                                                                                  | Theme                                                                             | Checkpoint                   |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------- |
| 0     | None                                                                                                                                                                   | Make the foundation provable (section 7) and take the decisions D1 to D11         | None. G0 and G1 signed       |
| 1     | T-047 headings and sections, T-045 hero, T-046 CTA panels, T-048 cards, T-051 Product schema                                                                           | The building blocks. The Product schema also deletes `testDoc`                    | Checkpoint 3                 |
| 2     | T-052 product page template, T-041 header, T-043 footer, T-054 contact form UI, T-055 contact form handler                                                             | A real page and the form, with the server side written security-first (section 6) | Checkpoint 4                 |
| 3     | T-056 delivery with failure strategy, T-057 sender and confirmation email, T-060 staging routes to test workflows, T-058 thank-you page, T-050 skip link and landmarks | Make the form safe, reliable and recoverable                                      | Checkpoint 5                 |
| 4     | T-042 mobile navigation, T-044 breadcrumbs, T-049 scroll reveal, T-053 PostureOne content, T-061 full journey test                                                     | Finish the shell, enter real content, prove the journey                           | Checkpoint 6                 |
| 5     | T-062 client demo, fixes from feedback                                                                                                                                 | Gate G2                                                                           | Final review before the demo |

Why this order: the page template cannot be built until the hero, CTA, headings, cards and Product schema exist. The form handler (T-055) is built early on purpose, because it is the largest risk and needs the data store decided. The SMS decision (D10, T-059) moves to Batch 0 so the form fields are frozen before the journey test. Content entry (T-053) waits for the template and for client-approved copy (T-019).

## 6. The enquiry pipeline: what connects the happy path to the failure path

Version 1 said "save first, then retry from a queue". That leaves a gap: the database write succeeds, the process dies before the delivery job is created, and nobody can recover the enquiry. The design closes it with the **transactional outbox** pattern, on the D1 Postgres.

**Design (T-055, T-056):**

1. The browser sends a unique submission key with the form. A unique constraint on it means a double click, a retry, or a lost response creates one enquiry.
2. In **one transaction** the server saves the enquiry and a `pending` delivery record. Both exist, or neither does.
3. The visitor sees success only after that transaction commits. If the database is unreachable, the visitor sees an honest "try again" state, never a false success.
4. A worker (a scheduled function) claims pending deliveries, sends the email, and marks them `sent`. It retries with backoff. It uses a stable delivery key with the email provider where the provider supports one, so a retry does not send twice.
5. A delivery pending past the agreed threshold (default 15 minutes) raises an alert to the named owner (D6). A protected replay action lets that person re-send it.
6. Errors recorded for deliveries hold no submitted text.

**Security requirements** (checked by `security-guard` at checkpoints 4 and 5):

- Server validates and length-limits every field. The browser check is only for convenience.
- Honeypot, minimum fill time, rate limits per address and per IP, request size limit.
- Visitor errors never show internal details. Logs and Sentry never contain field contents.
- No email header injection: addresses and subject lines are validated, never concatenated.
- The same response whether or not an address was seen before.
- The thank-you page works only after a submission and is `noindex`.
- Staging submits to a test inbox only, and production keys do not exist in staging.

**Two different retries, two different protections.** A visitor may retry after the server saved the message but the browser timed out; the submission key resolves that retry to the original enquiry. The worker may retry after the email provider accepted a send but the worker missed the response; the provider's idempotency key (sent with every delivery) prevents a second email where the provider supports it. Where it does not, delivery is "at least once": the email carries the enquiry ID, so the inbox owner can recognize a duplicate, and the runbook says so.

**The alert must not depend on the worker.** If the worker itself stops, nothing inside it can raise the alarm. An independent check (a second scheduled function, or a Sentry cron monitor) looks at the oldest pending delivery and the worker's last run time, and alerts the named owner when either is past the threshold.

**Recovery must not need a developer.** T-056's acceptance includes a way for the named owner (not a developer) to see pending and failed enquiries and replay them: a small protected page listing delivery state with a Replay button, plus a one-page runbook. This is a scope addition for the lead to confirm. Without it, recovery means a developer opening the database, which does not count as recoverable.

**G2 must show these observable outcomes** (replaces the "CRM down" scenario, because D5 is inbox first):

1. **Duplicate or lost response:** a double submit, or a browser timeout after the server saved the message followed by a retry, resolves to one enquiry and one delivery job.
2. **Email provider down after the commit:** the visitor still sees confirmation. The delivery shows as pending, the named owner receives the alert, replays it, and confirms it arrives in the shared inbox exactly once.
3. **Worker stopped:** stop the worker. The pending enquiry becomes visible and the independent check alerts the owner. Restart or replay, and the inbox receives one copy.
4. **Provider accepted but the worker missed the response:** the retry does not produce a second email (or, if the provider cannot guarantee that, the duplicate carries the same enquiry ID and the runbook explains it).
5. **Database down before the commit:** the visitor sees an honest retry state. The site never shows success for an enquiry it did not save.
6. **From the homepage:** one run on staging starts on a representative mobile homepage (the hero and primary CTA from Batch 1), follows the primary CTA to the form, and ends in a delivered enquiry. The same path is run again at G5 with the real homepage.

A person who is not the original developer runs outcomes 2 and 3 from the runbook alone.

If a CRM ships later, add "CRM down" as another outcome at that time.

**Editor-to-visitor check (T-061).** On staging, an editor publishes, edits, renames and unpublishes PostureOne. From a signed-out session, verify the product page and any listing or home card each time, and record how long each takes. Also stop the webhook and record what visitors see: published reads carry a time-based expiry (for example one hour) as a fallback, so a missed webhook heals itself.

## 7. Batch 0: make the foundation provable

Batch 0 has no code tasks. It turns "done in code" into "verified".

1. **Link the ten prerequisites** in `docs/first-slice-prerequisites.md` to their SharePoint rows, with an owner and evidence for each, or a replacement task.
2. **Reconcile the tracker.** Apply `docs/setup-status.csv` to the 22 setup tasks.
3. **Sign G0 and G1** with named signers. For G1, check in the real accounts what code cannot prove: branch protection and required checks, staging access control, CMS roles tested with real accounts, alert delivery, two-factor on every account.
4. **Decide D1 to D11.**
5. **Fix and merge the review findings** from the checkpoint (link and image validation, caching, webhook tests).
6. **Agree Q-21** (test device, network and thresholds) before home performance work.

## 8. The rest of the plan

| Phase                         | Tasks          | Batches of 5 | Notes                                                                                                                      |
| ----------------------------- | -------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| 2 Template expansion          | T-082 to T-129 | about 10     | Gate G3 per page group, reviewed by the developer who did not build it                                                     |
| 4 Newsletter and white papers | T-063 to T-081 | about 4      | Second highest risk: tokens, signed links, private PDFs, unsubscribe. Needs Q-17 to Q-20. Security checkpoint is mandatory |
| 4 Tools and motion            | T-130 to T-144 | about 3      | ROI calculator needs Q-15. Motion last, behind reduced-motion and the pause rules                                          |
| 3 Content and migration       | T-145 to T-155 | about 2      | Gate G4 content freeze. **The inventory (T-145) moves forward** (see below)                                                |
| 5 Quality and launch          | T-156 to T-179 | about 5      | Final security headers (T-161), third-party scan if Q-22 says so, three rehearsed rollbacks for G6                         |

At 5 tasks per checkpoint the plan needs about 28 more checkpoints. If that slows delivery, the fallback is a security-only check on changed files every 5 tasks and the full one every 10.

**Sequencing changes from the review:**

- **Homepage performance.** T-097 as written can pass before the final homepage exists. Run an early mobile performance check on the home template with representative imagery as soon as T-045 and the image pipeline exist, then a final pass with every launch feature on (carousel, partner hub, contact band, motion). Agree the device, network and budget (Q-21) first. If motion pushes the page over budget, ship the static version. T-094 depends on the Solutions hub and the article template, so the home group cannot finish in ID order; schedule it after those.
- **Migration and content.** Pull the inventory (T-145) forward, before templates are locked, so legacy URLs, campaign links and downloads inform route decisions. Add a production crawl of redirects, canonicals and the sitemap before launch. Exclude any unapproved case study, logo or claim from the release.
- **Cutover and support.** Make T-173 depend explicitly on the alert test, redirect verification and named support ownership. Move named incident ownership and rollback authority (the T-178 content) ahead of cutover. Extend T-170 to prove that a rolled-back application can still read the current database and process enquiries accepted during the failed release; Vercel restores a prior deployment with its prior configuration, so that compatibility needs its own test. In practice this means database changes follow expand-then-contract: new columns and tables first, removal only after the old release is gone.
- **Migrated content.** Studio validation does not run on imports or API writes. Validate migrated documents with a separate script, and re-check link schemes in the renderer.

## 9. Risks and what I will do

| Risk                                                      | Likelihood        | What I will do                                                                                                         |
| --------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| An accepted enquiry is stuck and nobody can recover it    | High if unchecked | The outbox design and the three G2 outcomes in section 6                                                               |
| Personal data stored in a public CMS dataset              | High if unchecked | D1: private database. A test fails if a form route writes to Sanity                                                    |
| Foundation controls exist only on paper                   | High              | Batch 0: verify in the real accounts, named signers for G0 and G1                                                      |
| Spam and abuse on the contact form                        | High              | D2, D3, honeypot and rate limits. Monitor in Sentry                                                                    |
| Client answers arrive late (Q-09, Q-11, Q-12, Q-13, Q-17) | High              | Build against the defaults in section 4, with providers behind one small interface so a change is one file             |
| Home page cannot meet the budget                          | Medium            | Early mobile check, image pipeline, canvas loaded after first paint, static fallback. Re-baseline with written reasons |
| Studio permissions on the free plan                       | Medium            | Test real accounts in Batch 0. Decide the plan before any step that needs private content or publisher-only roles      |
| Dependency or supply-chain issue                          | Medium            | Dependabot, `npm audit` at each checkpoint, lockfile only                                                              |
| A task looks done but is wrong                            | Medium            | Acceptance line demonstrated, reviewer reads connected code, checkpoint every 5 tasks                                  |
| Scope creep                                               | Medium            | Skipped items are named in one line and logged, not built                                                              |

## 10. Response to the independent review of version 1

| Review point                                                                               | Response                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Blocker: tracker cannot prove the foundation is ready (ten prerequisites, setup statuses)  | Accepted. Verified: ten first-slice prerequisites, and all 22 setup rows "Not started". Added `docs/first-slice-prerequisites.md`, `docs/setup-status.csv`, and Batch 0                                                                   |
| Blocker: primary visitor journey undecided (Q-09)                                          | Accepted. D9 decides it, defaulting to the workbook's own Q-09 default                                                                                                                                                                    |
| Blocker: CRM-down test does not match an inbox-first launch; SMS consent resolved too late | Accepted. D5 stated as inbox first; G2 outcomes rewritten; the SMS decision moved to Batch 0 as D10                                                                                                                                       |
| High: execution rules disagree (pnpm vs npm; full suites on every task)                    | Accepted. npm deviation recorded; evidence is now tiered; each PR gets a named human merger                                                                                                                                               |
| Enquiry delivery gap (outbox, unique keys, three outcomes, access and retention)           | Accepted in full. Section 6 and D11                                                                                                                                                                                                       |
| CMS permissions and private files; D8 too late                                             | Accepted in part. Permissions are tested in Batch 0. Private PDFs and enquiries do not depend on the paid plan, because they use separate private storage; the plan decision stays tied to the first step that needs it, no later than G5 |
| Homepage performance and sequencing                                                        | Accepted. Section 8                                                                                                                                                                                                                       |
| Migration inventory too late                                                               | Accepted. Pulled forward; production crawl added                                                                                                                                                                                          |
| Cutover and support gaps                                                                   | Accepted. Section 8                                                                                                                                                                                                                       |

The review could not see the repository, deployment settings or live integrations, so some of its points are about what the plan and workbook say, not what the code does. Where the code already answers a point (the secrets, headers, webhook and Sentry scrubbing were audited and fixed), the plan says so.

## 11. Gates

| Gate                  | When               | Who signs               | What I will bring                                                                                                                                                                                     |
| --------------------- | ------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| G0 Scope sign-off     | Before Batch 1     | Client approver (named) | T-020 status and evidence                                                                                                                                                                             |
| G1 Foundation review  | Before Batch 1     | Both developers (named) | `docs/gate-g1-foundation-review.md`, checks done in the real accounts                                                                                                                                 |
| G2 First journey demo | After Batch 5      | Client approver         | Live staging run showing the three outcomes in section 6. In outcome 2 the named owner of failed enquiries receives the alert, replays the saved enquiry, and confirms it arrives in the shared inbox |
| G3 to G6              | As in the workbook | As in the workbook      | Evidence from each checkpoint                                                                                                                                                                         |

## 12. Batch 0 checklists

### Owner checklist (project lead)

1. Link the ten prerequisites to their SharePoint rows (`docs/first-slice-prerequisites.md`), or say which do not exist.
2. Confirm D9 (needed for Batch 1). Confirm D10 before the form is built. Approve the others when their batch is next.
3. Both GitHub usernames, for CODEOWNERS.
4. Confirm that I build both developer tracks, the humans review and merge, and name the merger for each pull request.
5. Names for the G0 and G1 signers.
6. Check in the real accounts: branch protection and required checks, Vercel environments and staging access, Sanity project, datasets, CORS and roles with real accounts, two-factor everywhere, Sentry project, alert owner and uptime monitors.

### Engineering checklist (open findings from the checkpoint)

| #   | Finding                                                                                                                                                                                  | Severity | Blocks G1?                               | Owner  | Evidence that closes it                                                                                      |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| E1  | Link and image completeness rules are attached to the type, so the studio does not enforce them (optional links also risk blocking publish)                                              | High     | **Yes** (S-12 done-when)                 | Claude | A test that runs Sanity's own validation on the real schema passes, plus one studio check by a person        |
| E2  | Webhook uses stale-while-revalidate, so the first visitor after a publish or delete still sees the old page                                                                              | Medium   | **Yes** (S-16 done-when)                 | Claude | `revalidateTag(tag, { expire: 0 })` and a route test                                                         |
| E3  | The webhook route has no test for the order of its checks, and the headers have no end-to-end test                                                                                       | Medium   | **Yes** (checkpoint rule)                | Claude | Route test (500, 413, 401, 400, draft, valid) and an e2e test of the studio and site CSP and the new headers |
| E4  | Body size is checked after the body is read when there is no length header                                                                                                               | Low      | No                                       | Claude | Capped read, with a test                                                                                     |
| E5  | Published Sanity reads are not cached under `cacheComponents`, so tags and the webhook have nothing to clear                                                                             | Medium   | No (no page reads yet), **blocks T-052** | Claude | The first CMS-backed page refreshes after a signed webhook                                                   |
| E6  | A renamed page's old address is never refreshed                                                                                                                                          | Medium   | No, **blocks T-052**                     | Claude | `previousSlug` in the webhook projection and tags, with a test                                               |
| E7  | Release version documents (`versions.`) are treated as published                                                                                                                         | Low      | No                                       | Claude | Ignored like drafts, with a test                                                                             |
| E8  | Sentry event URL keeps the fragment; navigation breadcrumbs fixed already                                                                                                                | Low      | No                                       | Claude | One-line fix and test                                                                                        |
| E9  | `/styleguide` blocking time reached 260 ms in one local review run against a 200 ms budget                                                                                               | Medium   | **Yes, if it repeats in CI**             | Claude | Green `lighthouse` job on GitHub, or a diagnosed cause and an agreed budget                                  |
| E10 | Smaller cleanups: shared label field and limits, `singletonActions` test, Sentry host test and docs, prettier check in CI, `/tokens` budget, redirect task ID in the webhook doc (T-147) | Low      | No                                       | Claude | Merged with the fixes above                                                                                  |

Items E1 to E3 and E9 close before G1 is signed. The rest close before the task they block.

**G1 is signed against one commit.** The G1 record names the exact commit (or the preview deployment built from it). The affected checks (lint, typecheck, tests, build, browser tests, performance budgets and the account checks) are run on that version. A later fix means a new commit, and the signers re-confirm the items that changed. The commit is written in `docs/gate-g1-foundation-review.md` at signing.

## Sign-off

| Role         | Name | Date |
| ------------ | ---- | ---- |
| Project lead |      |      |
| Developer A  |      |      |
| Developer B  |      |      |
