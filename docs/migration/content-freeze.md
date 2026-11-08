# Content Freeze Policy & Protocol (T-153)
**Effective Milestone**: Launch Preparation (`Version-1` Release Candidate)  
**Standard**: Version 2 (Ombre / Palette 3 Violet) Design Handoff  
**Scope**: All 93 launch pages, copy strings, structured data, and static data files  
**Status**: **ACTIVE CONTENT FREEZE**  

---

## 1. Freeze Declaration & Scope

As of the completion of Task T-152, all user-facing content across the XSignOn website is declared **FROZEN**.

### What is Frozen:
1. **Core Copy**: All headlines, summaries, body paragraphs, and microcopy in:
   - `src/data/home.ts`
   - `src/data/products/`
   - `src/data/solutions.ts`
   - `src/data/caseStudies.ts`
   - `src/data/articles.ts`
   - `src/data/jobs.ts`
   - `src/data/site-settings.ts`
2. **Metadata & Structured Data**: Page titles, OpenGraph tags, canonical URLs, and Schema.org schemas.
3. **Asset References**: Downloadable white-papers, vector diagrams, and optimized photography paths.
4. **Sanity CMS Schemas**: Document definitions for articles, jobs, case studies, solutions, and pages.

---

## 2. Emergency Change Request (CR) Protocol

Any post-freeze content change must adhere strictly to the **Emergency Change Request (CR)** protocol. Direct unreviewed edits are strictly prohibited.

### Change Request Steps:
1. **CR Submission**: The requester submits a documented Change Request specifying:
   - Route URL and target element.
   - Exact current copy vs. proposed replacement.
   - Justification (Legal requirement, compliance correction, or factual error).
2. **Dual Sign-Off**: Approval requires dual sign-off from:
   - **Content Owner** (validating accuracy).
   - **Technical Lead** (validating layout stability, SEO impact, and accessibility).
3. **Automated Verification**:
   - The change must pass the full test suite (`npm test`).
   - The change must pass TypeScript typechecking (`npm run typecheck`).
   - The change must pass production build (`npm run build`).
4. **Audit Trail**: Every approved post-freeze change is appended to the CR Changelog below.

---

## 3. Post-Freeze Changelog

| CR # | Date | Route | Target Field | Old Value | New Value | Reason | Approvers |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *CR-000* | 2026-11-08 | All | Initial Baseline | Baseline V2 Ombre | Frozen Baseline | Initial freeze milestone | Tech Lead / Content Lead |

---

## 4. Rollback Runbook

If an unapproved content change introduces visual overflow, layout shift, or broken canonical links:
1. Identify the offending commit via `git log -S "offending text"`.
2. Revert the commit using `git revert <commit-hash>`.
3. Verify test suite passes (`npm test`).
4. Re-deploy the verified release candidate.
