# Sanity CMS Editor Handbook & Publishing Workflow (T-175)

**Document Type:** CMS Editor Training Manual & Publishing Handbook  
**Project:** XSignON Marketing Website  
**Branch:** `Version-1`  
**Task Reference:** T-175 (Epic E15 Launch and Handoff)  
**Authors:** Senior Frontend Engineer (Developer B) & Lead Systems Architect (Developer A)  
**Target Audience:** Content Editors, Marketing Managers, Content Directors, and Site Publishers  
**Verification Standard:** Editors complete one publish unaided with 100% compliance to formatting & security invariants.

---

## 1. Quick Access & Role-Based Access Control (RBAC)

The XSignON Content Management System is powered by **Sanity Studio v3**, embedded seamlessly within the application at:

* **Production Studio URL:** `https://xsignon.com/studio`
* **Staging Studio URL:** `https://staging.xsignon.com/studio`
* **Local Development:** `http://localhost:3000/studio`

### User Roles & Permissions Matrix

Security and structural integrity are preserved via three distinct privilege tiers:

```
┌─────────────────┬──────────────────────────┬─────────────────────────┬─────────────────────────┐
│ Capability      │ Editor                   │ Publisher               │ Admin                   │
├─────────────────┼──────────────────────────┼─────────────────────────┼─────────────────────────┤
│ Create Drafts   │ ✓ Articles, Products, WP │ ✓ All document types    │ ✓ All document types    │
│ Edit Content    │ ✓ Draft documents        │ ✓ All documents         │ ✓ All documents         │
│ Live Preview    │ ✓ Real-time side-by-side │ ✓ Real-time side-by-side│ ✓ Real-time side-by-side│
│ Publish Live    │ ✗ Requires sign-off      │ ✓ Instant publish       │ ✓ Instant publish       │
│ Edit Navigation │ ✗ Read-only              │ ✓ Global Header/Footer  │ ✓ Global Header/Footer  │
│ Manage Assets   │ ✓ Upload images & PDFs   │ ✓ Upload & prune assets │ ✓ Full asset management │
│ Webhook & Tokens│ ✗ No access              │ ✗ No access             │ ✓ Manage API keys & env │
└─────────────────┴──────────────────────────┴─────────────────────────┴─────────────────────────┘
```

> [!IMPORTANT]
> **Authentication & MFA:** All studio logins require Single Sign-On (Google Workspace / Okta) with Multi-Factor Authentication (MFA) strictly enforced. Password-only local logins are disabled on production.

---

## 2. Document Creation & Authoring Workflows

### 2.1 Thought Leadership Articles (`article`)
1. In the Studio left-hand sidebar, click **Articles** -> **+ Create**.
2. **Title**: Enter the article title (concise, high-impact; 40–70 characters).
3. **Slug**: Click **Generate** next to the slug input. Ensure the slug is lowercase, hyphenated, and contains no special characters.
4. **Author**: Select the contributing expert from the Author dropdown or create a new author reference.
5. **Publish Date**: Set to current date/time or scheduled date.
6. **Excerpt**: Provide a 1-2 sentence executive summary (used in search results and social cards; max 160 characters).
7. **Body (Portable Text)**:
   * **Headings**: Use `H2` for primary sections, `H3` for subsections. *Never paste H1 into the body* — the page template reserves `H1` for the document title to satisfy WCAG 2.1 AA accessibility guidelines.
   * **Callouts & Highlights**: Use the Custom Callout block to highlight key zero-trust insights or customer quotations.
   * **Code Blocks**: Formats YAML, JSON, or Python code with syntax highlighting.
8. **Featured Image**:
   * Upload high-resolution graphic (recommended 1200x630px).
   * **Mandatory Alt Text**: Provide descriptive alternative text explaining the image for screen readers (e.g., *"Architectural diagram illustrating XSignON zero-trust posture evaluation between identity provider and target application"*).
   * Adjust the **Hotspot / Focal Point** tool to ensure the critical subject remains centered across all mobile and desktop viewports.

---

## 3. Real-Time Side-by-Side Live Draft Preview

XSignON incorporates Next.js Draft Mode to give editors a pixel-perfect preview of how unpublished drafts look on the live site before going public.

```
┌───────────────────────────────────────┬───────────────────────────────────────┐
│ SANITY STUDIO EDITOR (Left Pane)      │ LIVE PREVIEW (Right Pane)             │
│                                       │                                       │
│ Title: Zero-Trust Identity Security   │ [Zero-Trust Identity Security]        │
│ Author: Dr. Elena Vance               │ By Dr. Elena Vance • Oct 24, 2026     │
│ Body: Enterprises today face...       │ Enterprises today face...             │
│                                       │                                       │
│ [Status: Draft (Unsaved Changes)]     │ [LIVE DRAFT MODE ACTIVE]              │
└───────────────────────────────────────┴───────────────────────────────────────┘
```

### How to Use Live Preview:
1. Inside any document, look at the top-right header and click the **Split Pane / Preview** icon.
2. The right pane will instantiate a secure draft session using the cryptographic preview secret.
3. As you type in the editor, changes reflect instantly in the preview pane with full Version 2 (Ombre / Palette 3 Violet) styling, font rendering, and responsive reflow.
4. Click the device preview switcher at the top to toggle between **Desktop (1440px)**, **Tablet (768px)**, and **Mobile (375px)**.

---

## 4. Gated White Papers & Research Assets (`whitePaper`)

Marketing research papers, technical briefs, and compliance guides often require reader qualification before downloading.

### Uploading & Gating a White Paper:
1. In the sidebar, navigate to **White Papers** -> **+ Create**.
2. Complete Title, Abstract, Topics, and Cover Art.
3. Under **Gating & Access Policy**, select:
   * `Public`: Direct download button available to all site visitors.
   * `Gated (Lead Capture)`: Requires visitor to submit corporate email, name, and company size before downloading.
4. **Attach PDF File**:
   * Drag and drop the final reviewed PDF into the **Asset Upload** field.
   * Sanity verifies the asset checksum and uploads it to the high-performance global CDN (`cdn.sanity.io`).
   * The website serverless proxy securely validates form submission tokens before serving the download link, preventing search engines from scraping the ungated PDF.

---

## 5. Navigation & Global Menu Controls (Publishers Only)

> [!WARNING]
> Navigation changes alter the global site structure and affect SEO indexing across all 96 static routes. Only users with the **Publisher** role have write permissions for Navigation documents.

### Editing Header or Footer Menus:
1. Navigate to **Site Settings** -> **Global Navigation**.
2. **Main Navigation Links**:
   * Add, remove, or drag-and-drop items to reorder the top bar navigation.
   * Each item contains: `Label` (visible text) and `Destination` (internal route `/products/postureone` or external link).
3. **Dropdown Columns**:
   * Organize Products into logical groups (e.g., PostureOne, Identity Fabric, Zero-Trust Bridge).
4. **Publish Confirmation**:
   * Click **Review Changes** to review the diff.
   * Click **Publish**.

---

## 6. Instant Edge Cache Purge & On-Demand Revalidation

XSignON uses Next.js On-Demand Incremental Static Regeneration (ISR). When you click **Publish**, you do not need to wait for a 20-minute deployment.

```
Editor clicks [Publish] in Studio
       │
       ▼
Sanity fires secure HMAC Webhook to /api/revalidate
       │
       ▼
Next.js server verifies sanity-webhook-secret
       │
       ▼
revalidatePath() purges CDN cache for the specific URL
       │
       ▼
Live site updates globally within < 3 seconds
```

---

## 7. Unaided Editor Qualification Practical Exam

To achieve certified Editor status on the production XSignON platform, each content editor must complete this 6-step practical test unaided:

- [ ] **Step 1:** Successfully sign in to `https://xsignon.com/studio` using SSO and MFA.
- [ ] **Step 2:** Create a new test draft Article entitled *"Continuous Adaptive Trust: The 2026 Paradigm"*.
- [ ] **Step 3:** Format text with an `H2`, bulleted list, and upload a test cover image with required Alt text.
- [ ] **Step 4:** Open the Live Draft Preview split-pane and verify that the layout renders cleanly on mobile and desktop.
- [ ] **Step 5:** Submit the article for publication (or publish if Publisher role).
- [ ] **Step 6:** Navigate to `https://xsignon.com/thinking/continuous-adaptive-trust-the-2026-paradigm` in an incognito window and verify that the page renders live within 5 seconds.

**Certification Sign-Off:**
* Candidate Editor: ___________________________ Date: ____________
* Verifying Lead: _____________________________ Status: [PASS / RETEST]
