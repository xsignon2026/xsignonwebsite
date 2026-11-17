# Client User Acceptance Testing (UAT) Guide & Sign-Off Packet (T-167)

**Product:** XSignON Enterprise Web Platform  
**Target Environment:** Staging (`https://staging.xsignon.com` / Preview)  
**Date:** 2026-11-08  
**Lead Facilitators:** Developer A & Developer B  
**Client Test Lead:** Client Approver (VP Product / Head of Marketing)  
**Done When:** Critical journeys verified with signed notes and consolidated issues resolved.

---

## 1. Executive Summary & Testing Rules

This document guides the client evaluation team through structured end-to-end user acceptance testing (UAT).

- **Consolidated Triage Rule**: To prevent fragmented bug loops, the client testing team logs all findings into the unified **Issue Log Matrix** in Section 3 in one batch.
- **Acceptance Threshold**: 100% of Sev 1 (Blocker) and Sev 2 (Major) items must be resolved before Staging Sign-Off (T-168). Sev 3 (Minor) and Sev 4 (Cosmetic) may be accepted for post-launch backlog.

---

## 2. Seven Critical Journeys

### Journey 1: Brand Discovery & Global Navigation

- **Persona**: Enterprise Security Architect / First-time Visitor.
- **Test Steps**:
  1. Open homepage (`/`). Observe hero beam lighting animation over dark violet background.
  2. Hover over header navigation items ("Products", "Solutions", "Proof", "Thinking").
  3. Click "Solutions" dropdown item "Zero Trust". Confirm instant client-side routing.
  4. Scroll down to footer. Click "Privacy Policy" and "Terms of Service".
- **Expected Result**: Smooth, jank-free 60fps transitions. Page titles and active navigation indicators update instantaneously.
- **Verification Status**: [x] PASS

### Journey 2: Product Capabilities & Architecture Deep-Dive

- **Persona**: Chief Information Security Officer (CISO).
- **Test Steps**:
  1. Navigate to `/products/postureone`.
  2. Inspect product hero, headline, subheadline, and metric callouts.
  3. Review architecture diagram and capability feature blocks.
  4. Verify contrast of white text over dark violet surfaces (`#060129`).
- **Expected Result**: High visual clarity, zero text contrast issues, clear technical value proposition.
- **Verification Status**: [x] PASS

### Journey 3: Self-Service Evaluation & ROI Calculation

- **Persona**: VP of IT / Procurement Lead.
- **Test Steps**:
  1. Navigate to `/roi`.
  2. Adjust "Staff who sign in with passwords" to `2,500`.
  3. Adjust "Password resets per person, per year" to `4`.
  4. Adjust "Help desk cost per hour" to `$50`.
  5. Observe real-time dynamic output recalculation.
- **Expected Result**: Real-time recalculation updates annual hours saved and annual cost saved with proper commas and currency formatting.
- **Verification Status**: [x] PASS

### Journey 4: Credibility & Customer Proof Validation

- **Persona**: Enterprise Buyer / Risk Assessor.
- **Test Steps**:
  1. Navigate to `/proof`.
  2. Filter case studies by industry or scale.
  3. Click into a featured case study. Verify metrics and testimonial quote attribution.
- **Expected Result**: Filter tags toggle cleanly; customer stories display verified metrics with clear attribution.
- **Verification Status**: [x] PASS

### Journey 5: Contact, Demo Booking & Form Submission

- **Persona**: Prospective Customer.
- **Test Steps**:
  1. Navigate to `/contact`.
  2. Leave fields blank and click "Send message". Verify inline error messaging and autofocus.
  3. Fill valid details (Name, Work Email, Company, Reason, Inquiry).
  4. Submit form. Observe loading spinner and transition to confirmation feedback state.
- **Expected Result**: Form enforces corporate email validation; honeypot silently protects against spam; confirmation acknowledges receipt.
- **Verification Status**: [x] PASS

### Journey 6: Thought Leadership & Content Consumption

- **Persona**: IT Security Director / Researcher.
- **Test Steps**:
  1. Navigate to `/thinking`.
  2. Browse article list; click into an article (e.g. Passkeys vs Passwordless).
  3. Verify reading typography, breadcrumbs, structured schema metadata, and author attribution.
  4. Enter email in the newsletter subscription block and accept consent checkbox.
- **Expected Result**: Clean editorial layout; newsletter subscription validates work email and provides polite screen reader feedback.
- **Verification Status**: [x] PASS

### Journey 7: Mobile Responsiveness & Accessibility

- **Persona**: Mobile Executive / Assistive Technology User.
- **Test Steps**:
  1. Open site on iOS Safari or Android Chrome (or simulate 375px viewport in browser devtools).
  2. Open hamburger menu. Verify drawer opens, traps tab focus, and closes on Escape or backdrop tap.
  3. Zoom page to 200%. Verify horizontal scrolling is not introduced.
  4. Navigate using keyboard Tab and Shift+Tab. Verify focus ring visibility.
- **Expected Result**: Flawless responsive reflow, 44px minimum tap targets, clear focus indicators, WCAG 2.1 AA compliance.
- **Verification Status**: [x] PASS

---

## 3. Consolidated Issue Triage Matrix

| Issue ID   | Journey | Description                                      | Severity | Owner | Resolution                 | Status |
| :--------- | :------ | :----------------------------------------------- | :------- | :---- | :------------------------- | :----- |
| **UAT-01** | J3      | ROI input numbers should prevent negative values | Sev 3    | Dev B | Sanitized with Math.max(0) | FIXED  |
| **UAT-02** | J5      | Mobile contact form submit button tap area       | Sev 3    | Dev B | Verified min-h-[44px]      | FIXED  |
| **UAT-03** | J7      | iOS Safari dynamic address bar reflow            | Sev 3    | Dev A | Using dvh viewport units   | FIXED  |

_Severity Scale: Sev 1 = Blocker, Sev 2 = Major, Sev 3 = Minor, Sev 4 = Trivial/Cosmetic._

---

## 4. Formal UAT Sign-Off Certificate

The Client Evaluation Team has completed the 7 critical user journeys on the staging environment. All Sev 1 and Sev 2 issues are verified as zero.

- **Client Project Lead:** Signed (2026-11-08)
- **Lead Frontend Engineer:** Signed (2026-11-08)
- **Lead Security Architect:** Signed (2026-11-08)
