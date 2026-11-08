# Script & Cookie Inventory Register

**Document ID**: SEC-COMP-002  
**Standard Compliance**: GDPR (Art. 4, 7), ePrivacy Directive (Directive 2002/58/EC Art. 5(3)), CCPA/CPRA, ISO/IEC 27001:2022  
**Status**: Active  
**Effective Date**: January 2026  
**Scope**: All web domains and subdomains serving XSignOn web properties (`xsignon.com`, `*.xsignon.com`).

---

## 1. Zero-Tracking Invariant & Enforcement Policy

$$\forall \text{req} \in \text{NetworkRequests}, \quad \text{isTelemetry}(\text{req}) \implies \text{ConsentState} = \text{"accepted"}$$

No third-party script, analytics ping, telemetry beacon, session replay tracker, or marketing pixel may execute or set client-side state prior to the user expressing affirmative, informed consent via the consent mechanism.

Essential cookies necessary for security posture, CSRF defense, and session persistence are exempt under ePrivacy Art. 5(3)(b) but remain strictly registered below.

---

## 2. Comprehensive Inventory Register

| Script / Technology | Category | Vendor / Domain | Storage Key / Cookie | Lifetime | Purpose & Justification | Consent Required |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Consent Manager** | Essential | First-party (`xsignon.com`) | `xsignon_consent_status` | LocalStorage (12 months) | Records visitor's affirmative consent or rejection for non-essential cookies. | **No** (Strictly Necessary) |
| **FIDO2 / WebAuthn Client** | Essential | First-party (`xsignon.com`) | Memory / Session-only | Transient session | Performs browser-native WebAuthn cryptographic challenge-response handshakes. | **No** (Strictly Necessary) |
| **Content Security Policy (CSP)** | Security | First-party HTTP Header | N/A (Header) | Connection lifetime | Enforces nonce-bound script execution, frame ancestors restrictions, and connect-src boundaries. | **No** (Security Invariant) |
| **Site Telemetry (Optional)** | Analytics | First-party / Telemetry Gateway (`telemetry.xsignon.com`) | `xsignon_telemetry_id` | LocalStorage (6 months) | Aggregated navigation statistics, performance metrics, and error rates to improve platform reliability. | **Yes** (Strict Opt-In) |
| **Performance Beacons (Optional)**| Performance | First-party (`xsignon.com`) | Memory-only | Session | Measures First Contentful Paint (FCP) and Largest Contentful Paint (LCP) against Core Web Vitals targets. | **Yes** (Strict Opt-In) |

---

## 3. Data Subprocessors & Third-Party Boundaries

XSignOn operates on an identity-first, privacy-by-design architecture:
- **Zero Advertising Trackers**: No Google Ads, Facebook/Meta Pixel, LinkedIn Insight Tag, or third-party ad networks are permitted or loaded in this codebase.
- **Zero Third-Party CDNs for Critical Scripts**: All JavaScript bundles are compiled, fingerprinted, and served directly from the first-party origin with strict Subresource Integrity (SRI) and Content Security Policy directives.
- **Subprocessor Review Schedule**: Quarterly auditing of all integrated libraries and automated dependency vulnerability scans via GitHub Dependabot and Snyk.

---

## 4. Verification & Audit Trail

To verify compliance:
1. Clear browser cache and storage.
2. Open Network inspector before loading `https://xsignon.com`.
3. Filter by outgoing domain requests: observe 0 third-party telemetry calls.
4. Verify `xsignon_consent_status` defaults to `pending` until explicit interaction.
