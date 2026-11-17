# Master Runbook & Operations Index (T-176)

**Document Type:** Master Operational Directory & Governance Index  
**Project:** XSignON Marketing Website  
**Branch:** `Version-1`  
**Task Reference:** T-176 (Epic E15 Launch and Handoff)  
**Maintained By:** Lead Systems Architect & Senior Frontend Engineer  
**Scope:** Single-source index linking all platform runbooks, disaster recovery procedures, compliance certifications, and architecture decisions.

---

## 1. Quick Navigation by Operational Scenario

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        MASTER OPERATIONS & GOVERNANCE DIRECTORY                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
         │
         ├─── [Deployment, Releases & Disaster Recovery]
         │      ├── Daily Deployment & Release Procedure ──────> docs/runbook.md
         │      ├── Three-Tier Rollback Rehearsal Runbook ─────> docs/operations/rollback-rehearsal-runbook.md
         │      ├── Sanity CMS Backup & Point-in-Time Restore ─> docs/migration/cms-backup-restore-runbook.md
         │      └── Live Integrations & Staging Isolation ─────> docs/operations/live-integrations-switchover.md
         │
         ├─── [Launch, DNS Cutover & Smoke Testing]
         │      ├── Production DNS Cutover Plan (TTL 300s) ────> docs/migration/dns-cutover-plan.md
         │      ├── DNS Invariant & Mail Preservation Plan ────> docs/migration/dns-preservation-plan.md
         │      ├── Go-Live 6-Route Smoke Test Runbook ────────> docs/operations/go-live-smoke-test-runbook.md
         │      └── Staging Sign-Off Certificate & Review ─────> docs/migration/staging-signoff-record.md
         │
         ├─── [Monitoring, Alerts & Incident Escalation]
         │      ├── Operational Alerting & Escalation Runbook ─> docs/operations/alerting-runbook.md
         │      ├── Post-Launch Monitoring & RUM Protocol ─────> docs/operations/post-launch-monitoring-protocol.md
         │      ├── Application Monitoring & Sentry Scrubbing ─> docs/monitoring.md
         │      └── Performance Budgets & Web Vitals Baseline ─> docs/performance.md
         │
         ├─── [Content Management & Editorial Operations]
         │      ├── Sanity CMS Editor Handbook & Workflow ─────> docs/cms/sanity-editor-guide.md
         │      ├── On-Demand Edge Cache Revalidation Webhook ─> docs/cms-webhook.md
         │      └── Content Approval & Sign-Off Tracker ───────> docs/migration/content-approval-tracker.md
         │
         └─── [Compliance, Security & Architecture Decisions]
                ├── Third-Party Security Scan & OWASP Top 10 ──> docs/compliance/third-party-security-scan.md
                ├── Dependency Audit & Lockfile Pinning Record ─> docs/compliance/dependency-audit.md
                ├── Cross-Browser & Device Matrix (Playwright) ─> docs/compliance/cross-browser-device-matrix.md
                ├── Formal WCAG 2.1 AA Accessibility Audit ────> docs/compliance/verification-a11y-audit.md
                ├── Decision 0001: Rendering Strategy & CSP ───> docs/decisions/0001-rendering-and-csp.md
                ├── Decision 0002: Version 2 (Ombre) Design ───> docs/decisions/0002-home-background-version.md
                └── Decision 0003: Platform Launch Retrospective > docs/decisions/0003-launch-retrospective.md
```

---

## 2. Directory Manifest & Purpose

### 2.1 Operations & Disaster Recovery

- [`docs/runbook.md`](../runbook.md): Foundational operational runbook covering developer onboarding, environment variable dictionary, build/start lifecycle, and emergency contacts.
- [`docs/operations/rollback-rehearsal-runbook.md`](rollback-rehearsal-runbook.md): The three-tier rollback procedure (Tier 1: Instant Vercel Edge Rollback; Tier 2: Git SHA Rollback; Tier 3: Sanity CMS Dataset Reversion).
- [`docs/migration/cms-backup-restore-runbook.md`](../migration/cms-backup-restore-runbook.md): Automated daily ndjson export script, emergency single-document recovery, and dataset clone protocols.
- [`docs/operations/live-integrations-switchover.md`](live-integrations-switchover.md): Strict separation between production secrets and staging test services.

### 2.2 Launch & Cutover Execution

- [`docs/migration/dns-cutover-plan.md`](../migration/dns-cutover-plan.md): Step-by-step low-traffic window schedule, 300s TTL step-down, and MX/SPF/DKIM/DMARC mail safety rules.
- [`docs/operations/go-live-smoke-test-runbook.md`](go-live-smoke-test-runbook.md): The 6 critical production routes (Home, PostureOne, Identity First Controls, Contact, Subscribe, and Legacy 308 Redirect) with automated CLI runner `scripts/smoke-test.mjs`.

### 2.3 Monitoring & Incident Response

- [`docs/operations/alerting-runbook.md`](alerting-runbook.md): P1, P2, and P3 incident triage protocols, notification routing, and synthetic health checks.
- [`docs/operations/post-launch-monitoring-protocol.md`](post-launch-monitoring-protocol.md): T+24h, T+48h, and T+7d telemetry cadences, 404 anomaly detection, form DLQ audits, and Core Web Vitals RUM.

### 2.4 CMS Editorial Workflows

- [`docs/cms/sanity-editor-guide.md`](../cms/sanity-editor-guide.md): Studio login, RBAC privilege matrix, draft mode live preview, gated white papers, navigation controls, and the unaided editor practical exam.
- [`docs/cms-webhook.md`](../cms-webhook.md): Architecture of the `/api/revalidate` HMAC webhook handler.

### 2.5 Security, Governance & Ownership

- [`docs/compliance/third-party-security-scan.md`](../compliance/third-party-security-scan.md): Comprehensive security analysis covering OWASP Top 10, A+ CSP headers, and secret scrubbing.
- [`docs/migration/ownership-transfer-checklist.md`](../migration/ownership-transfer-checklist.md): Formal asset handover matrix for domain, GitHub, Vercel, Sanity, and Sentry accounts.
- [`docs/compliance/post-launch-support-agreement.md`](../compliance/post-launch-support-agreement.md): Written support agreement, defect vs. change request boundaries, and maintenance SLAs.
- [`docs/decisions/0003-launch-retrospective.md`](../decisions/0003-launch-retrospective.md): Formal project retrospective and reusable architectural assets.
- [`docs/HANDOVER_T40_T179.md`](../HANDOVER_T40_T179.md): Master Engineering Handover, Batch Chronicles (T-040 to T-179), and team communication guide.

---

## 3. Emergency Contacts & Escalation Roster

```
┌──────────────────────────────┬──────────────────────────────┬──────────────────────────────┐
│ Role                         │ Primary Contact              │ Contact Channel              │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ Infrastructure On-Call       │ Lead Systems Architect       │ pagerduty: xsignon-infra-p1 │
│ Frontend Engineering Lead    │ Senior Frontend Engineer     │ slack: #alerts-prod-urgent   │
│ Client Executive Sponsor     │ VP of Marketing              │ email: executive@xsignon.com │
│ Vercel Enterprise Support    │ Platinum TAM Team            │ vercel.com/support           │
│ Sanity Priority Support      │ Technical Account Lead       │ sanity.io/contact/support    │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
```
