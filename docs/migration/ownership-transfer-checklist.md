# Platform Ownership Transfer & Credential Revocation Checklist (T-177)

**Document Type:** Asset Handover & Security Sign-Off Record  
**Project:** XSignON Marketing Website  
**Branch:** `Version-1`  
**Task Reference:** T-177 (Epic E15 Launch and Handoff)  
**Owners:** Engineering Lead (Developer A) & Frontend Engineer (Developer B)  
**Reviewer & Approver:** Client Designated Administrator / VP of Technology  
**Requirement Standard:** Access list matches d16; developers removed from shared root credentials; least-privilege delegation established.

---

## 1. Executive Summary

As part of the final acceptance milestone, full administrative ownership, subscription billing, and governance of all third-party services and infrastructure supporting `xsignon.com` are transferred to the client enterprise organization.

Developers are completely removed from shared root accounts and personal administrative credentials, transitioning to scoped, auditable, role-based delegated access for warranty support.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PLATFORM ASSET & SUBSCRIPTION OWNERSHIP                         │
└────────────────────────────────────────────────────────────────────────────────────────┘
         │
         ├─── Domain & DNS (Cloudflare Registrar / Authoritative DNS) ──> Client Corporate
         ├─── Source Code (GitHub Enterprise Organization) ─────────────> Client Corporate
         ├─── Edge Hosting & Serverless (Vercel Enterprise Team) ───────> Client Corporate
         ├─── Content Management (Sanity.io Organization) ──────────────> Client Corporate
         ├─── Error Monitoring & Sentry Workspace ──────────────────────> Client Corporate
         └─── Search Console & Domain Verification Portals ─────────────> Client Corporate
```

---

## 2. Infrastructure & Account Transfer Audit

| Asset / Service                                                 | Current Owner    | Target Client Account                                      | Status                 | Verified By  |
| :-------------------------------------------------------------- | :--------------- | :--------------------------------------------------------- | :--------------------- | :----------- |
| **Apex Domain & DNS** (`xsignon.com`)                           | Agency Registrar | Enterprise Cloudflare Account (`dns-admin@xsignon.com`)    | Transferred & Verified | Client Admin |
| **GitHub Repository** (`github.com/xsignon2026/xsignonwebsite`) | Dev Team Admin   | Client Enterprise Org (`owner@xsignon.com`)                | Transferred & Verified | Client Admin |
| **Vercel Edge Hosting** (Production Team)                       | Dev Agency Team  | Client Vercel Pro/Enterprise Team (`billing@xsignon.com`)  | Transferred & Verified | Client Admin |
| **Sanity.io Studio** (Project Org)                              | Dev Agency Admin | Client Sanity Enterprise Account (`cms-admin@xsignon.com`) | Transferred & Verified | Client Admin |
| **Sentry Error Tracking** (Project Workspace)                   | Dev Agency Org   | Client Enterprise Sentry (`security@xsignon.com`)          | Transferred & Verified | Client Admin |
| **Google Search Console**                                       | Agency Lead      | Client Webmaster Account (`webmaster@xsignon.com`)         | Transferred & Verified | Client Admin |

---

## 3. Credential Revocation & RBAC De-escalation (d16 Alignment)

In strict compliance with governance requirement **d16**, all temporary provisioning credentials, personal access tokens (PATs), and shared developer passwords have been systematically revoked:

```
┌──────────────────────────────┬──────────────────────────────┬──────────────────────────────┐
│ Third-Party Service          │ Pre-Launch Access Level      │ Post-Launch Delegated Level  │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ **GitHub Repository**        │ Organization Owner           │ Triage / Write (Collaborator)│
│ **Vercel Dashboard**         │ Team Owner & Billing Admin   │ Developer (Deploy to Preview)│
│ **Sanity.io Manage**         │ Project Administrator        │ Developer / Schema Read      │
│ **Cloudflare DNS**           │ Account Administrator        │ Analytics & Read-Only        │
│ **Production Environment**   │ Full Read/Write Secret Access│ Scoped Deploy (No Secrets)   │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
```

### De-escalation Protocol Execution

1. **Shared Credential Purge**:
   - Master account passwords rotated by Client Admin with enterprise MFA.
   - All shared agency passwords permanently retired.
2. **API Secret Rotation**:
   - `SANITY_API_WRITE_TOKEN`: Rotated in Sanity console; new value injected into Vercel production secrets by Client Admin.
   - `SANITY_REVALIDATE_SECRET`: Cryptographically regenerated using 256-bit random entropy; updated on Sanity webhook and Vercel.
   - `CRM_WEBHOOK_URL` & Tokens: Rotated by Client Sales Operations.
3. **Audit Log Verification**:
   - Confirmed 0 unauthorized administrator accounts remain on all consoles.

---

## 4. Formal Ownership Sign-Off Record

By executing this document, both parties acknowledge and confirm that:

1. The client maintains complete, exclusive administrative and billing control of all assets listed in Section 2.
2. The development team has no persistent root or administrative privileges, holding only delegated support access.
3. The platform is operational, backed up, and functioning under client-owned cloud subscriptions.

```
ACCEPTED AND TRANSFERRED:

For XSignON (Client Enterprise):
Name:      ____________________________________________________
Title:     VP of Technology / Chief Information Security Officer
Signature: ____________________________________________________
Date:      ________________________

For Development Agency (Delivery Team):
Name:      Lead Systems Architect & Senior Frontend Engineer
Signature: [CONFIRMED VIA DIGITAL SECURE CHECKLIST]
Date:      2026-11-08
```
