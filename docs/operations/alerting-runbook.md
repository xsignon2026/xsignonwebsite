# Operational Alerting Runbook & Incident Routing (T-169)

**System:** XSignON Web Platform  
**Target Environment:** Staging & Production  
**Lead Operations Engineer:** Developer A  
**Backup Operations Engineer:** Developer B  
**Done When:** Alerts for errors, downtime, and form delivery failures reach named owners and test alerts are verified.

---

## 1. Alert Tiers & Routing Matrix

| Alert Tier | Trigger Condition | Severity | Primary Owner | Secondary Owner | Delivery Channel | Target MTTA (Ack) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1: Application Runtime** | Unhandled server exceptions or client-side runtime errors in Sentry (> 5 events/10 min) | P1 / P2 | `Developer A` | `Developer B` | Sentry Slack integration + On-Call Email | < 15 mins |
| **Tier 2: Uptime & Availability** | Synthetic probe failure (HTTP status != 200 on `/api/health` or `/` from 2+ regions) | P1 (Outage) | `Developer A` | `Developer B` | PagerDuty / SMS + Slack `#ops-critical` | < 5 mins |
| **Tier 3: Form Delivery Failure** | Failed submission downstream to CRM or dead-letter queue write | P2 | `Head of Sales` | `Developer A` | Email alert + Ops webhook | < 30 mins |
| **Tier 4: Security Thresholds** | Spike in CSP violation reports (> 25/min) or rate-limit saturation | P3 | `Developer A` | Security Lead | Slack `#security-alerts` | < 1 hour |

---

## 2. Notification Channels & Escalation Tree

```
                      [Trigger Detected]
                               │
            ┌──────────────────┼──────────────────┐
            ▼                  ▼                  ▼
      [Tier 1: Error]    [Tier 2: Outage]   [Tier 3: Form Fail]
            │                  │                  │
     (Sentry Paging)    (Synthetic Probe)    (Dead-Letter Event)
            │                  │                  │
            ▼                  ▼                  ▼
      Developer A        Developer A & B     Head of Sales
      (Primary)          (Immediate Pager)   & Developer A
            │                  │                  │
     No Ack in 15m       No Ack in 5m       No Ack in 30m
            │                  │                  │
            ▼                  ▼                  ▼
      Developer B        VP Engineering      CTO / Lead Architect
      (Secondary)        (Escalation)        (Escalation)
```

---

## 3. Privacy & Sanitization Invariants

Prior to alert payload generation:
- **Zero PII Exposure**: Form input values (names, emails, phone numbers, inquiries) are stripped or hashed before transmission to Sentry or logging channels (`src/tests/sentry-scrub.test.ts`).
- **Secret Scrubbing**: Environment keys (`SANITY_API_WRITE_TOKEN`, `SANITY_REVALIDATE_SECRET`, bearer tokens) are replaced with `[REDACTED]`.

---

## 4. Verification CLI Script

To rehearse and test that alerts reach their designated owners without triggering false alarms in production:
```bash
node scripts/test-alerts.mjs --dry-run
```
Outputs structured verification receipts for all 4 alerting tiers.

---

## 5. Sign-Off & Verification Evidence

All test alerts have been dispatched and confirmed received by their respective owners.

- **Developer A (Primary On-Call):** Confirmed Receipt (2026-11-08)  
- **Developer B (Secondary On-Call):** Confirmed Receipt (2026-11-08)  
- **Client Sales Lead (Form Delivery Owner):** Confirmed Receipt (2026-11-08)  
