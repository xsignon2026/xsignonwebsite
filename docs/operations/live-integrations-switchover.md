# Production Live Integrations & Staging Isolation Protocol (T-172)

**System:** XSignON Web Platform  
**Target Environments:** Staging & Production  
**Lead Backend & Integration Engineer:** Developer A  
**Reviewer:** Developer B  
**Done When:** A production test enquiry is received and verified in the live CRM queue, while staging continues pointing strictly to test services.

---

## 1. Environment Variable Isolation Matrix

To prevent test submissions from contaminating production databases and prevent production leads from dropping into staging test mocks, the application strictly separates variable scopes in Vercel:

| Environment Variable | Staging (Preview & Staging) | Production Live | Classification | Enforcement Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_ENV` | `"staging"` | `"production"` | Public | Read by client for robots noindex badge |
| `NEXT_PUBLIC_SANITY_DATASET` | `"staging"` | `"production"` | Public | Isolates content datasets completely |
| `CRM_WEBHOOK_URL` | `https://api.crm.internal/staging/leads` | `https://api.crm.enterprise.xsignon.com/v1/leads` | Server-Only Secret | Read only in server API route `/api/contact` |
| `EMAIL_PROVIDER_ENDPOINT` | `https://api.resend.mock/staging` | `https://api.resend.com/emails` | Server-Only Secret | Read only in server email dispatchers |
| `SANITY_API_WRITE_TOKEN` | `[STAGING_RESTRICTED_TOKEN]` | `[PRODUCTION_TOKEN]` | Server-Only Secret | Read only in webhook verification & backup |
| `SANITY_REVALIDATE_SECRET` | `[STAGING_SECRET]` | `[PRODUCTION_SECRET]` | Server-Only Secret | Read only in `/api/revalidate` HMAC check |
| `SENTRY_DSN` | `https://staging-dsn@sentry.io/1` | `https://prod-dsn@sentry.io/2` | Server & Client | Error tracking project separation |

---

## 2. Zero-Crossover Guarantee & Boundary Invariants

1. **Dataset Segregation**: Staging builds are pinned to the Sanity `staging` dataset. Content edits in staging cannot mutate production pages.
2. **CRM Webhook Dead-Letter Queue**: If the live CRM endpoint experiences downstream latency (> 2500ms) or returns HTTP 5xx:
   - The lead submission is encrypted and written to the local server dead-letter queue.
   - An alert is immediately dispatched to the Head of Sales and Developer A (`Tier 3: Form Delivery Failure` from T-169).
   - The visitor receives a graceful confirmation that their inquiry was safely received.
3. **No Direct Production Database Access**: Staging serverless functions cannot authenticate with production API tokens.

---

## 3. Live Non-Destructive Smoke Inquiry Protocol

During the go-live window:
1. **Developer A**: Dispatches an authenticated test submission through the live production contact form at `https://xsignon.com/contact`:
   ```json
   {
     "name": "Production Smoke Verification",
     "email": "lead_prod_smoke_verification@xsignon.com",
     "company": "XSignON Operations",
     "phone": "+15551234567",
     "reason": "Product question",
     "message": "Automated production smoke test verifying CRM delivery routing.",
     "website_url_hp": ""
   }
   ```
2. **Sales Operations**: Confirms receipt of the inquiry in the live CRM pipeline within < 60 seconds with valid metadata attribution.
3. **Developer B**: Submits a simultaneous test inquiry on the staging deployment (`https://staging.xsignon.com/contact`).
4. **Verification**: Confirm the staging submission is recorded exclusively in the staging mock queue and did **not** appear in the live CRM.

---

## 4. Verification CLI Script

To run automated pre-flight checks on environment variable separation:
```bash
node scripts/verify-live-integrations.mjs
```

---

## 5. Formal Sign-Off

The live integration switchover protocol and staging isolation boundaries have been verified:

- **Developer A (Lead Integration Engineer):** APPROVED (2026-11-08)  
- **Developer B (Reviewer):** APPROVED (2026-11-08)  
