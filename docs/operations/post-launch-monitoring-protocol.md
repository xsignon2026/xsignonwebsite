# Post-Launch Monitoring & Telemetry Protocol (T-174)

**Document Type:** Operational Monitoring & Incident Protocol  
**Project:** XSignON Marketing Website  
**Branch:** `Version-1`  
**Task Reference:** T-174 (Epic E15 Launch and Handoff)  
**Owners:** Engineering Lead (Developer A) & Frontend Engineer (Developer B)  
**Reviewers:** Technical Steering Committee & Client Stakeholders  
**Target Invariant:** Zero unhandled errors, 100% form enquiry delivery, sub-2.5s Core Web Vitals at p75.

---

## 1. Executive Summary & Monitoring Invariants

Following the successful production cutover (T-171 to T-173), this protocol defines the continuous operational observation, anomaly detection, real user monitoring (RUM), and incident triage workflows for the live XSignON platform (`xsignon.com`).

All telemetry adheres to strict zero-PII security equations: no customer form inputs, IP addresses, or personal identifiable tokens are logged to telemetry endpoints.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                     POST-LAUNCH CONTINUOUS OBSERVABILITY PIPELINE                    │
└──────────────────────────────────────────────────────────────────────────────────────┘
         │
         ├─── [Traffic & Route Health]
         │      ├── 404 Anomaly & Inbound Campaign Triage (Vercel Log Drain / Sentry)
         │      ├── 308 Permanent Redirect Accuracy (Legacy URLs: /features, /docs, etc.)
         │      └── Edge Cache Hit Ratio Target ≥ 85% on Static Assets & Assets CDN
         │
         ├─── [Form & Conversion Integrity]
         │      ├── Contact & Demo Booking Form Delivery (< 60s delivery to CRM)
         │      ├── Dead-Letter Queue (DLQ) Auditing (Zero unhandled inquiries)
         │      └── Honeypot & Bot Rejection Rate Monitoring
         │
         └─── [Real User Monitoring (RUM)]
                ├── Core Web Vitals Field Telemetry (/api/telemetry/vitals)
                │     ├── Largest Contentful Paint (LCP) ≤ 2.5s (p75)
                │     ├── Cumulative Layout Shift (CLS) ≤ 0.05 (p75)
                │     └── Interaction to Next Paint (INP) ≤ 200ms (p75)
                └── CSP Violation Stream Monitoring (/api/csp-report)
```

---

## 2. Telemetry Cadence & Observation Intervals

The engineering team operates under heightened monitoring status across three critical operational horizons:

| Horizon                           | Check Interval | Scope & Action Items                                                                                                                                                         |
| :-------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Immediate (T+0 to T+24h)**      | Every 2 hours  | Verify edge response codes, check zero 5xx errors, sample live form submissions, inspect CSP report collector, monitor Vercel Serverless Function invocations.               |
| **Intermediate (T+24h to T+72h)** | Every 6 hours  | Evaluate Google Search Console crawl errors, audit 404 hit patterns, verify DNS recursive propagation globally, check Sentry crash-free session rate (Target: ≥ 99.95%).     |
| **Settled (T+72h to T+7d)**       | Daily standup  | Review aggregated Core Web Vitals field data from `/api/telemetry/vitals`, evaluate conversion analytics, verify daily CMS automated backups, sign off on handoff stability. |

---

## 3. Core Web Vitals Field Monitoring Specifications

Real user monitoring metrics are reported in real time by client browsers to `/api/telemetry/vitals` using `web-vitals` v4. Metric distribution thresholds are enforced as follows:

```
┌─────────────────────────┬──────────────┬────────────────┬──────────────┐
│ Metric                  │ Good Target  │ Needs Work     │ Poor (Alert) │
├─────────────────────────┼──────────────┼────────────────┼──────────────┤
│ Largest Contentful Paint│ ≤ 2.5s       │ 2.5s - 4.0s    │ > 4.0s       │
│ Cumulative Layout Shift │ ≤ 0.05       │ 0.05 - 0.10    │ > 0.10       │
│ Interaction to Next Paint│ ≤ 200ms     │ 200ms - 500ms  │ > 500ms      │
│ Time to First Byte (TTFB│ ≤ 800ms      │ 800ms - 1800ms │ > 1800ms     │
│ First Contentful Paint  │ ≤ 1.8s       │ 1.8s - 3.0s    │ > 3.0s       │
└─────────────────────────┴──────────────┴────────────────┴──────────────┘
```

### Anomaly Triggers

- **LCP Degradation**: If 75th percentile LCP exceeds 2.5s over a 15-minute sliding window, trigger a P2 alert. Immediate investigation of hero image CDN compression, font display swapping, and HeroBeams canvas rendering overhead.
- **CLS Shift**: If CLS exceeds 0.05, investigate dynamic banner injections, un-dimensioned marketing assets, or late-hydrating client components.

---

## 4. 404 Anomaly Tracking & Dead Link Triage Protocol

Legacy inbound marketing links, partner referral links, and press release URLs must resolve seamlessly without user-facing friction.

### Triage Procedure

1. **Query Vercel Access Logs**:
   ```bash
   vercel logs --query="status:404" --limit=200
   ```
2. **Frequency Bucketing**:
   - **Category A (Broken Legacy Deep Links)**: If a specific non-existent path receives ≥ 5 hits within 24 hours, create a permanent redirect in `next.config.ts`:
     ```typescript
     {
       source: '/legacy-path',
       destination: '/target-product-or-article',
       permanent: true,
     }
     ```
   - **Category B (Malicious / Vulnerability Probing)**: Requests targeting `wp-login.php`, `.env`, `xmlrpc.php`, `phpmyadmin` are blocked by edge firewalls and do not warrant redirects; logged as security probes.
   - **Category C (Legitimate User Typos)**: Retain custom friendly 404 page (`src/app/not-found.tsx`) with clear navigation back to Products, Solutions, and Contact.

---

## 5. Form Delivery & Dead-Letter Queue (DLQ) Auditing

Form conversions represent the primary business objective of the XSignON website.

### Verification Checklist

- **Zero Lost Enquiries Guarantee**: Every POST request to `/api/contact` and `/api/subscribe` must execute atomically.
- **Dead-Letter Logging**: If the upstream CRM webhook or email delivery service fails or times out:
  1. The API route returns a structured, graceful fallback acknowledgment to the user so conversion experience is preserved.
  2. The payload is written to the secure, encrypted Dead-Letter Storage with timestamp, payload checksum, and error code.
  3. A high-priority P1 alert is dispatched to the engineering on-call Slack channel `#alerts-prod-urgent`.
- **Replay Protocol**:
  - Run dead-letter replay utility:
    ```bash
    npm run ops:dlq-replay -- --dry-run
    npm run ops:dlq-replay -- --execute
    ```

---

## 6. Incident Response Severity Matrix & SLAs

| Severity          | Definition                                                                                                            | Target MTTA (Ack) | Target MTTR (Resolve)  | Escalation Channel                             |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------- | :---------------- | :--------------------- | :--------------------------------------------- |
| **P1 - Critical** | Total platform outage, critical security vulnerability, complete failure of form submission pipeline.                 | **< 15 minutes**  | **< 1 hour**           | Phone call / PagerDuty / `#alerts-prod-urgent` |
| **P2 - High**     | Core Web Vitals degradation (LCP > 4s), broken primary redirect, elevated 404 rate (> 1%), studio publishing failure. | **< 1 hour**      | **< 4 hours**          | Slack `#alerts-prod-engineering`               |
| **P3 - Normal**   | Cosmetic layout flaw on specific non-primary viewport, typo in thought leadership article, non-blocking CMS warning.  | **< 24 hours**    | **Next release cycle** | GitHub Issue / JIRA Ticket                     |

---

## 7. Operational Escalation Roster

- **Primary Incident Commander:** Developer A (Lead Systems Architect) — `infra-lead@xsignon.com`
- **Secondary On-Call:** Developer B (Senior Frontend Engineer) — `frontend-lead@xsignon.com`
- **Client Communications Officer:** VP of Marketing / Web Product Manager — `product@xsignon.com`
- **Infrastructure Vendor Contacts:**
  - Vercel Enterprise Support: Platinum ticket escalation via support dashboard.
  - Sanity Support: Priority channel in enterprise Slack connect.
  - Cloudflare/DNS Support: 24/7 Enterprise phone support.

---

## 8. Verification Sign-Off

- [x] RUM endpoint `/api/telemetry/vitals` verified active and logging.
- [x] CSP violation reporting endpoint `/api/csp-report` verified active.
- [x] Contact form submission verified with real-time CRM webhook dispatch.
- [x] Sentry error tracking integrated with source maps uploaded.
- [x] 404 log query automated in weekly operational cadence.
