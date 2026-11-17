# Post-Launch Support Agreement & Governance Protocol (T-178)

**Document Type:** Formal Support Agreement & Maintenance Contract  
**Project:** XSignON Marketing Website  
**Branch:** `Version-1`  
**Task Reference:** T-178 (Epic E15 Launch and Handoff)  
**Parties:** XSignON Enterprise ("Client") and Engineering Delivery Team ("Support Provider")  
**Effective Period:** 90-Day Post-Launch Warranty Period followed by Ongoing SLA  
**Scope:** Defect vs. Change Request delineation, security update responsibilities, maintenance cadences, and response SLAs.

---

## 1. Executive Intent & Framework

This agreement governs post-launch maintenance, defect remediation, operational security updates, and service level agreements (SLAs) for the XSignON marketing web platform (`xsignon.com`).

The framework guarantees platform stability, security hardening, and performance while establishing unambiguous boundaries between warranty remediation and net-new feature development.

---

## 2. Defect vs. Change Request (CR) Classification Matrix

To ensure transparent operational governance, issues reported post-launch are categorized under strict objective criteria:

```
┌────────────────────────────────────────────────────────┬────────────────────────────────────────────────────────┐
│ WARRANTY DEFECT (Covered at 0 Additional Cost)         │ CHANGE REQUEST / CR (Scoped & Invoiced Separately)     │
├────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────┤
│ 1. Non-conformance to finalized Version 2 (Ombre) spec │ 1. Brand aesthetic changes or new color theme design   │
│ 2. Broken responsive layout on approved matrix devices │ 2. New custom page templates or navigation restructuring│
│ 3. Form delivery failure or lead queue dropouts        │ 3. Integration with net-new third-party marketing tools│
│ 4. 5xx server errors, unhandled exceptions, or crash  │ 4. Net-new Sanity CMS schema models or custom plugins  │
│ 5. Security vulnerability (CVSS ≥ 7.0) in dependencies │ 5. Custom interactive calculators or 3D canvas tools   │
│ 6. WCAG 2.1 AA accessibility regressions or contrast   │ 6. Mass legacy content migration exceeding original CSV│
└────────────────────────────────────────────────────────┴────────────────────────────────────────────────────────┘
```

### Defect Remediation Lifecycle:

- Any defect identified within the 90-day warranty period is remediated and verified through automated regression testing at no additional cost to the client.

### Change Request (CR) Process:

- Client submits CR to `#project-change-requests`.
- Provider delivers architectural estimate, cost estimate, and timeline within 3 business days.
- Approved CRs branch from `main`, pass full CI/CD gates, and deploy via standard preview/staging workflow.

---

## 3. Dependency Maintenance & Security Patching Responsibilities

Security hygiene and proactive maintenance are shared according to the following operational division:

| Responsibility               | Frequency          | Assigned Party    | Tooling & Verification                                   |
| :--------------------------- | :----------------- | :---------------- | :------------------------------------------------------- |
| **Vulnerability Scanning**   | Weekly (Automated) | Support Provider  | Dependabot & `npm audit`                                 |
| **Patch Level Upgrades**     | Monthly            | Support Provider  | Non-breaking patch releases tested in Staging            |
| **Framework Minor Upgrades** | Quarterly          | Support Provider  | Next.js / React minor updates with full regression suite |
| **Domain & SSL Maintenance** | Continuous         | Client Operations | Cloudflare / Vercel automated renewal                    |
| **Content Backups Audit**    | Weekly             | Support Provider  | Verify automated Sanity ndjson export integrity          |
| **Sentry Error Scrubbing**   | Bi-weekly          | Support Provider  | Review noise, verify zero PII leaks                      |

> [!IMPORTANT]
> **Strict Lockfile Invariant:** All dependency updates must be executed using `npm update <package>` or explicit version bumps in `package.json` followed by `npm install`, preserving `package-lock.json`. Unpinned major version upgrades (`^` or `*`) are strictly prohibited per T-162.

---

## 4. Service Level Agreements (SLAs) & Incident Response

Support incidents are triaged and prioritized strictly based on impact:

```
┌─────────────────┬──────────────────────────────────────────┬──────────────┬──────────────┐
│ Severity Level  │ Description                              │ Target MTTA  │ Target MTTR  │
├─────────────────┼──────────────────────────────────────────┼──────────────┼──────────────┤
│ **Severity 1**  │ Critical production outage, data loss,   │ **< 15 min** │ **< 2 hours**│
│ (Critical)      │ total form submission failure, security. │              │              │
├─────────────────┼──────────────────────────────────────────┼──────────────┼──────────────┤
│ **Severity 2**  │ Major degradation, elevated 404s,        │ **< 1 hour** │ **< 8 hours**│
│ (High)          │ CMS studio publishing failure, CWV alert.│              │              │
├─────────────────┼──────────────────────────────────────────┼──────────────┼──────────────┤
│ **Severity 3**  │ Minor bug, isolated non-primary layout,  │ **< 8 hours**│ **< 48 hours**│
│ (Normal)        │ minor typographical or content issue.    │              │              │
└─────────────────┴──────────────────────────────────────────┴──────────────┴──────────────┘
```

- **MTTA (Mean Time to Acknowledge):** Time elapsed between ticket generation and engineer assignment with initial response.
- **MTTR (Mean Time to Resolve):** Time elapsed until fix is verified in staging and deployed to production.

---

## 5. Escalation & Communication Channels

- **Emergency Incident Hotline (P1 Only):** PagerDuty On-Call Integration (`pagerduty: xsignon-infra-p1`)
- **Technical Slack Channel (P1/P2/P3):** `#xsignon-support` (Shared Slack Connect)
- **Ticketing & Bug Tracker:** GitHub Issues (`xsignon2026/xsignonwebsite/issues`) with label `severity:p1`, `severity:p2`, or `severity:p3`.

---

## 6. Formal Agreement Execution

```
AGREED AND ACCEPTED:

For XSignON Enterprise (Client):
Authorized Officer: _____________________________________________
Title:              VP of Technology / Chief Information Officer
Date:               ________________________

For Technical Delivery Team (Support Provider):
Lead Architect:     Lead Systems Architect & Senior Frontend Engineer
Status:             DIGITALLY SIGNED & RATIFIED
Date:               2026-11-08
```
