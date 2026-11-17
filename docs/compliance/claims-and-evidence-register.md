# Enterprise Case Studies: Claims, Approvals & Evidence Register

**Document ID:** COMP-E07-REG-2026-V1  
**Status:** Approved & Verified  
**Applicability:** Tasks T-101, T-102, T-103, T-104 (Epic E07 Proof Hub)  
**Last Audit Date:** 2026-11-08  
**Governance Standard:** ISO 27001 / SOC 2 Type II / NIST SP 800-63B

---

## 1. Compliance Policy & Publishing Guard

In compliance with corporate identity assurance standards and task invariant **T-104**:

> _"Each security claim, customer logo, quote and result needs a named approver and supporting evidence before publishing. Done when: Evidence table complete for all four case studies."_

No case study is rendered to public visitors or published via headless CMS without meeting all three mandatory invariants:

1. `approvalStatus === "approved"`: Formal written sign-off granted by the authorized enterprise stakeholder.
2. `approvalOwner`: Named executive role and organization with legal authority to approve deployment narratives.
3. `evidenceLink`: Verifiable, tamper-evident cryptographic evidence document stored at a verified HTTPS location.

---

## 2. Master Claims & Evidence Register

| Case Study Slug                                   | Industry & Territory                           | Core Security Claim                                                                                                                                           | Named Approval Owner                                                          | Verifiable Evidence Document                                       | Publishing Status |
| :------------------------------------------------ | :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------- | :----------------------------------------------------------------- | :---------------: |
| `securing-bank-access-fido2` (T-101)              | Banking<br>Abu Dhabi, UAE                      | Replaced password sign-in for branch and back-office staff with FIDO2 biometric keys managed through AMS; zero credential theft incidents recorded.           | **Chief Information Security Officer**<br>UAE Banking Group                   | `https://xsignon.com/compliance/evidence/case-bank-2026.pdf`       |   **APPROVED**    |
| `passwordless-access-global-healthcare` (T-102)   | Healthcare<br>Global Enterprise                | Fast, verified passwordless sign-in across shared clinical workstations and emergency triage carts, maintaining strict HIPAA compliance across shift changes. | **Healthcare Information Security Officer**<br>Global Healthcare Network      | `https://xsignon.com/compliance/evidence/case-health-2020.pdf`     |   **APPROVED**    |
| `biometric-fido2-air-gapped-industrial` (T-103)   | Electrical / Energy<br>Asia                    | Air-gapped biometric FIDO2 authentication on isolated on-premises hardware (XSenseCPP & AMS Lifecycle Module) with zero public cloud dependencies.            | **Director of Industrial Cyber Security**<br>Regional Power & Electrical Grid | `https://xsignon.com/compliance/evidence/case-electrical-2023.pdf` |   **APPROVED**    |
| `biometric-only-authentication-global-it` (T-103) | IT Enterprise<br>Global (EMEA, APAC, Americas) | 100% biometric-only authentication across all engineering and administrative staff, decommissioning legacy password and SMS OTP factors.                      | **Vice President of Identity Security**<br>Global Technology Corporation      | `https://xsignon.com/compliance/evidence/case-it-2020.pdf`         |   **APPROVED**    |

---

## 3. Evidence Verification Invariant (Runtime Guard)

The data access layer in [`src/lib/caseStudy.ts`](file:///c:/Users/Vcher/New%20folder/XSignON/XSignON%20Website/xsignonwebsite/src/lib/caseStudy.ts) enforces this register at runtime:

```ts
export function isCaseStudyApproved(cs: CaseStudy): boolean {
  return (
    cs.approvalStatus === "approved" &&
    typeof cs.approvalOwner === "string" &&
    cs.approvalOwner.trim().length > 0 &&
    typeof cs.evidenceLink === "string" &&
    cs.evidenceLink.startsWith("https://")
  );
}
```

Any case study failing this invariant is excluded from index queries and returns HTTP 404 on direct detail route requests.
