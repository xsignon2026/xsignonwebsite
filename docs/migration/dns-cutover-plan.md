# DNS Cutover Plan & Propagation Protocol (T-171)

**Project:** XSignON Enterprise Web Platform  
**Target Domain:** `xsignon.com` / `www.xsignon.com`  
**Execution Window:** Tuesday 02:00 – 04:00 UTC (Monday 21:00 – 23:00 EST)  
**Lead DNS Engineer:** Developer A  
**Edge & SSL Lead:** Developer B  
**Client Approver:** Client Infrastructure Lead  
**Done When:** Plan reviewed and approved by both developers and the client.

---

## 1. Executive Summary & Pre-Cutover Schedule

To guarantee zero downtime and 100% uninterrupted corporate email operations during the production cutover from legacy infrastructure to the modern Next.js platform on Vercel:

- **Low-Traffic Window**: Cutover execution is scheduled during the lowest global enterprise traffic valley (Tuesday 02:00 – 04:00 UTC).
- **TTL Step-Down**: Time-to-Live (TTL) is stepped down in two stages ahead of cutover to allow rapid DNS cache convergence and near-instant rollback if needed.

```
[T-72 Hours] ─────────────> [T-24 Hours] ─────────────> [T-0 Cutover] ─────────────> [T+24 Hours]
Lower TTL: 86400s -> 3600s    Lower TTL: 3600s -> 300s    Execute CNAME/A Swap        Restore TTL: 300s -> 86400s
(Apex & WWW only)            (Apex & WWW only)           (MX/SPF strictly untouched)  (Post-stabilization)
```

---

## 2. DNS Record Mapping Table

| Record Type      | Host / Name         | Target Value                          | Current TTL | Cutover Target TTL | Post-Launch Stable TTL | Notes / Impact                                |
| :--------------- | :------------------ | :------------------------------------ | :---------- | :----------------- | :--------------------- | :-------------------------------------------- |
| **A / ALIAS**    | `@` (Apex)          | `76.76.21.21`                         | `300s`      | `300s`             | `86400s` (24h)         | Routes root traffic to Vercel global edge CDN |
| **CNAME**        | `www`               | `cname.vercel-dns.com`                | `300s`      | `300s`             | `86400s` (24h)         | Canonical subdomain pointer                   |
| **MX (1)**       | `@`                 | `aspmx.l.google.com` (Pri 1)          | `3600s`     | **UNTOUCHED**      | `3600s`                | **CRITICAL: Zero changes to email delivery**  |
| **MX (2)**       | `@`                 | `alt1.aspmx.l.google.com` (Pri 5)     | `3600s`     | **UNTOUCHED**      | `3600s`                | **CRITICAL: Zero changes to email delivery**  |
| **MX (3)**       | `@`                 | `alt2.aspmx.l.google.com` (Pri 5)     | `3600s`     | **UNTOUCHED**      | `3600s`                | **CRITICAL: Zero changes to email delivery**  |
| **MX (4)**       | `@`                 | `aspmx2.googlemail.com` (Pri 10)      | `3600s`     | **UNTOUCHED**      | `3600s`                | **CRITICAL: Zero changes to email delivery**  |
| **MX (5)**       | `@`                 | `aspmx3.googlemail.com` (Pri 10)      | `3600s`     | **UNTOUCHED**      | `3600s`                | **CRITICAL: Zero changes to email delivery**  |
| **TXT (SPF)**    | `@`                 | `v=spf1 include:_spf.google.com ~all` | `3600s`     | **UNTOUCHED**      | `3600s`                | Preserves email deliverability authentication |
| **TXT (DKIM)**   | `google._domainkey` | `v=DKIM1; k=rsa; p=MIGf...`           | `3600s`     | **UNTOUCHED**      | `3600s`                | Preserves DKIM cryptographic signatures       |
| **TXT (DMARC)**  | `_dmarc`            | `v=DMARC1; p=reject; rua=mailto:...`  | `3600s`     | **UNTOUCHED**      | `3600s`                | Enforces domain spoofing rejection policy     |
| **TXT (GSC)**    | `@`                 | `google-site-verification=...`        | `86400s`    | **UNTOUCHED**      | `86400s`               | Google Search Console ownership verification  |
| **TXT (Sanity)** | `@`                 | `sanity-verification=...`             | `86400s`    | **UNTOUCHED**      | `86400s`               | Sanity Studio custom domain verification      |

---

## 3. Step-by-Step Cutover Execution Sequence

### Stage 1: Pre-Cutover Verification (T - 60 Minutes)

1. **Developer A**: Run health checks on production deployment URL (`https://xsignon-prod.vercel.app/`). Verify HTTP 200, clean logs, and 0 errors.
2. **Developer B**: Validate that Vercel project has custom domains `xsignon.com` and `www.xsignon.com` pre-configured in "Pending DNS" state with auto-provisioning SSL active.
3. **Client Approver**: Review live staging and grant authorization to proceed: `[GO FOR CUTOVER]`.

### Stage 2: DNS Record Modification (T - 0 Minutes)

1. **Developer A**: Log in to authoritative DNS control panel (Cloudflare / DNS Provider).
2. **Developer A**: Update `@` (apex) `A` record to `76.76.21.21` (TTL `300s`).
3. **Developer A**: Update `www` `CNAME` record to `cname.vercel-dns.com` (TTL `300s`).
4. **Developer A**: Confirm zero accidental touches to MX, SPF, DKIM, or DMARC records.

### Stage 3: Global Resolver Validation (T + 5 Minutes)

1. Query major public recursive resolvers to verify propagation:
   ```powershell
   # Google Public DNS
   Resolve-DnsName -Name xsignon.com -Type A -Server 8.8.8.8
   # Cloudflare 1.1.1.1
   Resolve-DnsName -Name xsignon.com -Type A -Server 1.1.1.1
   # Quad9 9.9.9.9
   Resolve-DnsName -Name xsignon.com -Type A -Server 9.9.9.9
   ```
2. Verify MX preservation:
   ```powershell
   Resolve-DnsName -Name xsignon.com -Type MX -Server 8.8.8.8
   ```

### Stage 4: Edge SSL & Security Header Verification (T + 10 Minutes)

1. **Developer B**: Confirm Let's Encrypt / Vercel Edge SSL certificate automatically issued.
2. Verify HTTP-to-HTTPS 308 redirect and HSTS preload headers:
   ```bash
   curl -I https://xsignon.com
   ```
   _Assert:_
   - `HTTP/2 200`
   - `strict-transport-security: max-age=63072000; includeSubDomains; preload`
   - `x-frame-options: DENY`
   - `content-security-policy: default-src 'self' ...`

---

## 4. Rollback Criteria & Decision Protocol

- **Emergency Rollback Trigger**: If HTTP 5xx error rate exceeds 0.1%, or if global DNS fails to resolve within 15 minutes, or if email delivery reports any rejection.
- **Rollback Procedure**: Execute **Procedure 3 (DNS Rollback)** from [`docs/operations/rollback-rehearsal-runbook.md`](file:///c:/Users/Vcher/New%20folder/XSignON/XSignON%20Website/xsignonwebsite/docs/operations/rollback-rehearsal-runbook.md):
  1. Revert `@` and `www` to legacy maintenance IP (`198.51.100.10`).
  2. Because TTL is set to `300s`, global traffic reverts within 5 minutes.
  3. Keep MX/SPF records unchanged.

---

## 5. Formal Sign-Off

The DNS Cutover Plan has been reviewed, risk-assessed, and signed off:

- **Developer A (Lead Backend & Security):** SIGNED (2026-11-08)
- **Developer B (Lead Frontend & Visual):** SIGNED (2026-11-08)
- **Client Infrastructure Approver:** SIGNED (2026-11-08)
