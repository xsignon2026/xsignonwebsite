# Email Infrastructure & DNS Setup (T-057)

This document specifies the required DNS records for sending transactional and inquiry confirmation emails from `@xsignon.com`.

## 1. Domain Verification & Authentication

To achieve high deliverability and pass strict DMARC enforcement:

### A. SPF (Sender Policy Framework)

Ensure the root domain TXT record authorises the sending service:

- **Type:** `TXT`
- **Host:** `@`
- **Value:** `v=spf1 include:_spf.google.com include:sendgrid.net ~all` _(or matching your chosen ESP)_

### B. DKIM (DomainKeys Identified Mail)

Generate two CNAME records from your ESP dashboard to sign all outgoing mail cryptographically:

- **Type:** `CNAME`
- **Host:** `s1._domainkey` / `s2._domainkey`
- **Value:** Provided by ESP (e.g. `s1.domainkey.u12345.sendgrid.net`)

### C. DMARC (Domain-based Message Authentication, Reporting, and Conformance)

- **Type:** `TXT`
- **Host:** `_dmarc.xsignon.com`
- **Value:** `v=DMARC1; p=reject; rua=mailto:dmarc-reports@xsignon.com; pct=100; aspf=s; adkim=s;`

---

## 2. Environment Variables Required

In your production deployment (Vercel / Cloudflare / Server):

```env
EMAIL_API_KEY=your_esp_api_key_here
EMAIL_FROM="XSignOn <info@xsignon.com>"
CONTACT_NOTIFICATION_EMAIL=info@xsignon.com
STAGING_NOTIFICATION_EMAIL=staging-inbox@xsignon.test
```

In development or staging when `EMAIL_API_KEY` is omitted, the mailer safely logs dispatches without erroring, maintaining zero runtime crashes.
