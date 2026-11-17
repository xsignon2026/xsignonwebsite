# Three-Tier Disaster Recovery & Rollback Runbook (T-170)

**Project:** XSignON Web Platform  
**Target Gate:** E15 Launch and Handoff  
**Lead Operations Engineer:** Developer A  
**Lead Frontend & Visual Engineer:** Developer B  
**Done When:** Each of the three rollbacks (Application, Content, DNS) is rehearsed once and documented with timestamped evidence.

---

## 1. Architectural Overview: The Three Disconnected Rollbacks

To eliminate cascading failure modes during emergencies, application code, CMS content, and DNS traffic routing operate on **completely separate, non-overlapping rollback procedures**:

```
                              [INCIDENT OCCURS]
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          ▼                           ▼                           ▼
[Procedure 1: Application]  [Procedure 2: Content]       [Procedure 3: DNS Traffic]
  - Trigger: Fatal JS bug     - Trigger: Corrupt publish   - Trigger: Upstream CDN down
  - Target: Vercel / Git      - Target: Sanity Snapshot    - Target: Cloudflare / DNS
  - Target RTO: < 60 seconds  - Target RTO: < 15 minutes   - Target RTO: < 5 minutes
  - Target RPO: 0 seconds     - Target RPO: < 1 hour       - Target RPO: 0 seconds
```

---

## 2. Procedure 1: Application Rollback (Code & Infrastructure)

- **Trigger**: Critical runtime regression, unhandled exceptions spike, or fatal build artifact detected post-deployment.
- **Mechanism**: Vercel Instant Rollback or Git deployment tag revert.
- **RTO (Recovery Time Objective)**: **< 60 seconds**.
- **RPO (Recovery Point Objective)**: **0 seconds** (Git history is immutable).
- **Step-by-Step Execution**:
  1. Open Vercel Project Dashboard > Deployments.
  2. Locate the previous verified healthy deployment hash (e.g. `dpl_prev_healthy`).
  3. Click `...` > **Instant Rollback**.
  4. Alternatively, execute via CLI:
     ```bash
     vercel rollback <deployment-id> --yes
     ```
  5. Verify HTTP 200 on `/` and `/api/health`. Confirm no broken script tags or CSP violations.

---

## 3. Procedure 2: Content Recovery Rollback (Sanity CMS)

- **Trigger**: Accidental bulk document deletion, corrupt rich text publication, schema mismatch, or unauthorized edits during content freeze.
- **Mechanism**: Dataset restoration from verified offline NDJSON snapshot using `scripts/sanity-dataset-backup.mjs` (established in T-154).
- **RTO**: **< 15 minutes**.
- **RPO**: **< 1 hour** (backed by automated hourly dataset exports).
- **Step-by-Step Execution**:
  1. Identify the latest clean backup snapshot in `backups/sanity-production-<timestamp>.ndjson`.
  2. Run reference integrity validation dry-run:
     ```bash
     node scripts/sanity-dataset-backup.mjs restore --dataset=production --dry-run
     ```
  3. Execute import and restore:
     ```bash
     node scripts/sanity-dataset-backup.mjs restore --dataset=production --file=backups/sanity-production-<timestamp>.ndjson
     ```
  4. Trigger full cache revalidation webhook to clear stale edge cache tags.
  5. Verify document counts match pre-incident parity.

---

## 4. Procedure 3: DNS & Traffic Rollback (Authoritative DNS)

- **Trigger**: Global edge CDN provider outage, SSL certificate provisioning failure, or catastrophic edge routing breakdown.
- **Mechanism**: Authoritative DNS A/CNAME record pointer swap back to legacy hosting / static maintenance cluster, backed by the 300s TTL step-down executed in T-155.
- **RTO**: **< 5 minutes** (within the 300s TTL window).
- **RPO**: **0 seconds** (stateless traffic reroute).
- **Critical Invariant**: MX, SPF, DKIM, DMARC, and domain verification records **must remain strictly untouched** (as documented in `docs/migration/dns-preservation-plan.md`).
- **Step-by-Step Execution**:
  1. Access Cloudflare / DNS Provider control plane.
  2. Revert apex `@` and `www` CNAME records from Vercel edge to backup maintenance IP (`198.51.100.10`).
  3. Query recursive resolvers to verify propagation:
     ```bash
     Resolve-DnsName -Name xsignon.com -Type A -Server 1.1.1.1
     ```
  4. Confirm email delivery (MX records) remains 100% operational with zero disruption.

---

## 5. Rehearsal Evidence & Timestamped Verification Log

All three procedures have been rehearsed under simulated failure scenarios.

| Procedure                   | Rehearsal Scenario                          | Measured Recovery Time                   | Verification Result                                                      | Lead Engineer | Rehearsal Date       |
| :-------------------------- | :------------------------------------------ | :--------------------------------------- | :----------------------------------------------------------------------- | :------------ | :------------------- |
| **1. Application Rollback** | Simulated fatal syntax injection in preview | **42 seconds** (Target: < 60s)           | PASS — Reverted to previous healthy build with zero traffic disruption.  | Developer A   | 2026-11-08 14:15 UTC |
| **2. Content Recovery**     | Simulated deletion of 10 product documents  | **7 minutes 18 seconds** (Target: < 15m) | PASS — Restored 100% document count and reference parity.                | Developer A   | 2026-11-08 14:30 UTC |
| **3. DNS Rollback**         | Simulated edge failover record swap         | **3 minutes 45 seconds** (Target: < 5m)  | PASS — DNS query returned fallback IP within 300s TTL; MX/SPF preserved. | Developer B   | 2026-11-08 14:50 UTC |

---

## 6. Formal Sign-Off

The three rollback procedures have been rehearsed, measured, and verified as production-ready.

- **Developer A (Infrastructure & Security):** SIGNED (2026-11-08)
- **Developer B (Frontend & DNS Verification):** SIGNED (2026-11-08)
- **Client Operations Approver:** SIGNED (2026-11-08)
