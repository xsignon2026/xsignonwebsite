# Compliance Review: Versioned Consent Wording

**Document Reference**: `LEGAL-CONSENT-2026-V1`  
**Current Active Version**: `v1-2026-global`  
**Effective Date**: November 2026  
**Status**: APPROVED  
**Applies To**: Newsletter Subscription (`.news-band`) & Gated White Paper Download Flows  

---

## 1. Regulatory Mapping Matrix

| Jurisdiction / Statute | Mandate & Regulatory Rule | Implementation in XSignOn Codebase | Audit Verification |
| :--- | :--- | :--- | :--- |
| **GDPR & UK GDPR**<br>(EU 2016/679, Art. 6, 7) | Affirmative, unambiguous, freely given opt-in. Pre-ticked boxes prohibited. Easy withdrawal at any time. Double opt-in audit trail. | Explicit checkbox requiring affirmative action; double opt-in verification link with token hash; RFC 8058 one-click unsubscribe. | `data/verifications.ndjson`<br>Records IP hash, timestamp, user agent, wording version. |
| **US CAN-SPAM Act**<br>(15 U.S.C. § 7701 et seq.) | Clear notice of commercial message, physical postal address in every email, functional opt-out mechanism processed within 10 days. | Physical postal address (McKinney, TX) rendered in HTML/text templates and footers; one-click unsubscribe processed instantaneously. | `src/lib/email/templates/`<br>`src/lib/newsletter/tokens.ts` |
| **CASL (Canada)**<br>(S.C. 2010, c. 23) | Express consent required prior to dispatch; clear identification of sender with contact coordinates. | Explicit express consent wording before verification token generation; postal address & telephone in email footers. | `src/lib/consent/wording.ts`<br>`src/lib/mailer.ts` |

---

## 2. Approved Canonical Wording Texts

### Version: `v1-2026-global`

#### A. Newsletter Subscription Form
> *"I agree to receive security insights and product updates from XSignOn. I can unsubscribe at any time."*
- **Placement**: Under the work email input on `.news-band` (footer, thinking hub, article detail pages).
- **Control**: Standalone unchecked `<input type="checkbox" required />` with accessible label linking to `/privacy`.

#### B. Gated White Paper Request
> *"I agree that XSignOn may process my contact details to deliver this white paper and follow up on my architecture inquiry."*
- **Placement**: Gated download form on `/white-papers/[slug]`.
- **Control**: Standalone unchecked `<input type="checkbox" required />`.

---

## 3. Data Retention & Consent Ledger
1. Verification requests are written to `data/verifications.ndjson` upon form submission.
2. Unverified requests are purged after 7 days by automated cleanup (`T-078`).
3. Verified subscriber consents are cryptographically audited with SHA-256 IP hashes (no raw IP storage) and version identifiers.
4. Unsubscribe events immediately append suppression records to `data/suppression.ndjson` and cease email dispatches.

---

## 4. Sign-off and Version History
- **v1-2026-global**: Approved November 2026 for production deployment across all web and email channels.
