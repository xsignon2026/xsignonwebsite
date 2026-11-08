# Comprehensive Site Inventory & Migration Register

**Document ID**: MIGRATION-INV-001  
**Author**: Senior Website Developer & Senior Frontend Engineer  
**Status**: Active / Pre-Launch  
**Target Migration**: Version 2 (Ombre / Palette 3 Violet)  
**Effective Date**: January 2026  

---

## 1. Executive Summary & Inventory Scope

This document establishes the master inventory of all legacy endpoints, current launch pages, downloadable assets, conversion forms, and third-party integrations across the XSignOn web estate.

In accordance with enterprise migration standards:
1. **Zero Link Rot**: Every indexed legacy URL has a deterministic 1:1 destination mapping.
2. **Zero Homepage Dumping**: Legacy product, solution, or article links never route blindly to `/`. They route to the closest equivalent successor.
3. **Preservation of Inbound Campaign Attribution**: All UTM parameters, referrer tags, and query parameters pass through permanent redirects untouched.

---

## 2. Master Launch Routes Inventory

| Category | Canonical URL Path | Template / Component | Indexing Status | Prerender Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **Home** | `/` | `src/app/page.tsx` | Index, Follow | Static (SSG) |
| **Products Hub** | `/products` | `src/app/products/page.tsx` | Index, Follow | Static (SSG) |
| **Product: PostureOne** | `/products/postureone` | `src/app/products/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Product: Keys** | `/products/keys` | `src/app/products/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Product: EvalOne** | `/products/evalone` | `src/app/products/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Product: XSense** | `/products/xsense` | `src/app/products/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Product: AMS** | `/products/ams` | `src/app/products/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Solutions Hub** | `/solutions` | `src/app/solutions/page.tsx` | Index, Follow | Static (SSG) |
| **Solution: Identity** | `/solutions/identity-governance` | `src/app/solutions/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Solution: AI Governance** | `/solutions/ai-and-digital-governance` | `src/app/solutions/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Solution: Quantum-Safe** | `/solutions/quantum-safe-security` | `src/app/solutions/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Solution: Business Process**| `/solutions/business-process` | `src/app/solutions/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Solution: Enterprise Tech** | `/solutions/enterprise-technology` | `src/app/solutions/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Company: About** | `/about` | `src/app/about/page.tsx` | Index, Follow | Static (SSG) |
| **Company: Enterprise** | `/enterprise` | `src/app/enterprise/page.tsx` | Index, Follow | Static (SSG) |
| **Company: Careers** | `/careers` | `src/app/careers/page.tsx` | Index, Follow | Static (SSG) |
| **Proof / Case Studies Hub** | `/proof` | `src/app/proof/page.tsx` | Index, Follow | Static (SSG) |
| **Proof: Banking FIDO2** | `/proof/securing-bank-access-fido2` | `src/app/proof/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Proof: Healthcare** | `/proof/passwordless-access-global-healthcare` | `src/app/proof/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Thinking Hub** | `/thinking` | `src/app/thinking/page.tsx` | Index, Follow | Static (SSG) |
| **Article: Identity-First** | `/thinking/identity-first-controls` | `src/app/thinking/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Article: Data & AI** | `/thinking/data-and-ai-security` | `src/app/thinking/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Article: Micro-Segmentation**| `/thinking/modern-micro-segmentation` | `src/app/thinking/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Article: Agentic AI** | `/thinking/agentic-ai-cybersecurity` | `src/app/thinking/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Article: Non-Human** | `/thinking/non-human-identities` | `src/app/thinking/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **White Paper: Posture Guide**| `/white-papers/zero-trust-posture-guide` | `src/app/white-papers/[slug]/page.tsx` | Index, Follow | Static (SSG) |
| **Utility: ROI Calculator** | `/roi-calculator` | `src/app/roi-calculator/page.tsx` | Index, Follow | Static (SSG) |
| **Utility: Privacy Policy** | `/privacy` | `src/app/privacy/page.tsx` | Index, Follow | Static (SSG) |
| **Utility: Terms of Service** | `/terms` | `src/app/terms/page.tsx` | Index, Follow | Static (SSG) |
| **Account: Log In** | `/login` | `src/app/login/page.tsx` | Noindex, Follow | Static (SSG) |
| **Account: Create Account** | `/register` | `src/app/register/page.tsx` | Noindex, Follow | Static (SSG) |
| **Engagement: Contact Us** | `/contact` | `src/app/contact/page.tsx` | Index, Follow | Static (SSG) |

---

## 3. Downloadable Assets & White Paper Inventory

| Asset Name | Internal Storage Key | Public Request Route | Secure Download Route | Access Control Model |
| :--- | :--- | :--- | :--- | :--- |
| **Zero Trust Posture Guide** | `zero-trust-posture-guide.pdf` | `/white-papers/zero-trust-posture-guide` | `/api/white-papers/download?slug=...` | HMAC-signed token, verified work email grant, non-public storage (`private/white-papers/`). |

---

## 4. Inbound Forms & Processing Endpoints

| Form Description | Placement Route | Submission Method | Backend Handler Route | Security Posture |
| :--- | :--- | :--- | :--- | :--- |
| **General Inquiry Form** | `/contact` | `POST` | `/api/contact` | Honeypot field, Zod validation, rate limiting, Sentry error logging. |
| **Newsletter Subscribe** | Footer / Common | `POST` | `/api/subscribe` | Double opt-in confirmation token, SHA-256 HMAC digest. |
| **Newsletter Unsubscribe**| `/unsubscribe` | `POST` | `/api/unsubscribe` | RFC 8058 one-click header support, instant revocation. |
| **White Paper Request** | `/white-papers/[slug]` | `POST` | Server Action / Token Dispatch | Domain verification, email grant storage. |
| **ROI Calculator Form** | `/roi-calculator` | Client-only | Pure mathematical computation | Zero PII transmission; 100% local calculation. |

---

## 5. Third-Party Integrations & External Boundaries

- **Sanity CMS**: Headless content authority via GROQ endpoints (`/studio`).
- **Resend SMTP Gateway**: Outbound transactional email dispatch for verification tokens.
- **Sentry Error Tracking**: Client & server error monitoring with PII data scrubbing.
- **Content Security Policy (CSP)**: Nonce-bound strict header preventing arbitrary script injection.
