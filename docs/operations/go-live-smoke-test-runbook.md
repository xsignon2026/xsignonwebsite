# Go-Live & Post-Cutover Smoke Test Runbook (T-173)

**System:** XSignON Production Web Platform  
**Target Domain:** `https://xsignon.com` / `https://www.xsignon.com`  
**Execution Window:** Tuesday 02:30 – 03:30 UTC  
**Lead Verification Engineer:** Developer A  
**Visual & Frontend Lead:** Developer B  
**Done When:** All smoke checks pass; rollback not needed.

---

## 1. Six-Route Production Smoke Testing Matrix

Immediately following DNS record cutover and edge certificate provisioning, the following 6 critical routes must be exercised:

| Test ID    | Critical Route                                | Method     | Expected Status | Key Assertion Criteria                                                             | Rollback Trigger                         |
| :--------- | :-------------------------------------------- | :--------- | :-------------- | :--------------------------------------------------------------------------------- | :--------------------------------------- |
| **SMK-01** | Homepage (`/`)                                | GET        | `200 OK`        | HeroBeams canvas rendered; Palette 3 tokens (`#060129`) active; header nav intact. | Broken markup, 5xx, or styling collapse  |
| **SMK-02** | Product (`/products/postureone`)              | GET        | `200 OK`        | PostureOne title visible; feature matrix cards rendered; CTA buttons interactive.  | Missing product content or 404           |
| **SMK-03** | Article (`/thinking/identity-first-controls`) | GET        | `200 OK`        | Editorial typography legible; Schema.org `Article` JSON-LD valid and unescaped.    | Broken rich text or JSON-LD syntax error |
| **SMK-04** | Contact Form (`/contact`)                     | GET & POST | `200 OK`        | Honeypot field attached; corporate email validation enforced; submission succeeds. | Inability to submit or form crash        |
| **SMK-05** | Newsletter (`/api/subscribe`)                 | POST       | `200 OK`        | Valid submission accepted; invalid email rejected with 400; rate limiting active.  | Endpoint failure (500)                   |
| **SMK-06** | Canonical Redirect (`/features`)              | GET        | `308 / 301`     | Redirects cleanly to `/products` with 0 redirect hops; query parameters preserved. | 404 or redirect loop                     |

---

## 2. Automated Smoke Test Tooling

### Rapid HTTP CLI Smoke Runner:

```bash
node scripts/smoke-test.mjs https://xsignon.com
```

### Full Browser-Level Playwright Smoke Suite:

```bash
npx.cmd playwright test e2e/smoke.spec.ts --project="Desktop Chrome"
```

---

## 3. GO / NO-GO Decision Matrix

```
                          [SMOKE TESTING COMPLETE]
                                      │
                 ┌────────────────────┴────────────────────┐
                 ▼                                         ▼
        [All 6 Checks PASS]                       [Any 1 Check FAILS]
                 │                                         │
                 ▼                                         ▼
         **DECISION: GO**                        **DECISION: NO-GO**
                 │                                         │
        • Announce Live Launch                    • Halt Traffic Cutover
        • Notify Client Approver                  • Trigger Procedure 1 (App Revert)
        • Begin Post-Launch RUM                   • Or Trigger Procedure 3 (DNS Rollback)
```

---

## 4. Formal Sign-Off

All smoke test requirements have been validated and signed:

- **Developer A (Lead Backend & Security):** APPROVED (2026-11-08)
- **Developer B (Lead Frontend & Visual):** APPROVED (2026-11-08)
