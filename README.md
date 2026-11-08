# XSignON Marketing Website (`xsignon-web`)

![CI](https://github.com/xsignon2026/xsignonwebsite/actions/workflows/ci.yml/badge.svg)
![Security Headers](https://img.shields.io/badge/Security%20Headers-A%2B-brightgreen)
![Accessibility](https://img.shields.io/badge/WCAG%202.1-AA%20Compliant-blue)
![Design Version](https://img.shields.io/badge/Design-Version%202%20(Ombre)-8A2BE2)

The production marketing platform for **XSignON**: built on Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Sanity Studio v3, deployed globally on Vercel Edge Network.

---

## 1. System Requirements & Toolchain

The repository enforces strict engine versions to guarantee deterministic builds and zero dependency drift:

| Tool | Version Invariant | Verification Command |
| :--- | :--- | :--- |
| **Node.js** | `>= 20.9.0` (Target: `22.x`, see `.nvmrc`) | `node --version` |
| **npm** | `>= 10.9.0` (Packaged with Node 22) | `npm --version` |
| **Next.js** | `16.4.4` (React Server Components + PPR) | `npx next --version` |
| **React** | `19.3.0` | In `package.json` |
| **TypeScript**| `5.9.3` | `npx tsc --version` |
| **Tailwind** | `4.3.4` (Zero-config CSS engine) | In `src/app/globals.css` |
| **Sanity** | `6.22.0` (Embedded Studio) | In `src/app/studio` |

> [!IMPORTANT]
> **Package Manager Invariant:** This project uses **npm only** with a strictly committed `package-lock.json`. Do not introduce `pnpm-lock.yaml`, `yarn.lock`, or `bun.lockb`. In CI and automated deployments, `npm ci` is strictly enforced.

---

## 2. One-Command Developer Setup

Follow these exact steps to onboard from a clean repository clone:

```bash
# 1. Clone the repository
git clone https://github.com/xsignon2026/xsignonwebsite.git
cd xsignonwebsite

# 2. Configure environment variables from template
cp .env.example .env.local

# 3. Clean install deterministic dependencies
npm ci

# 4. Launch the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Key Developer Routes
* `/` — Production Homepage featuring Version 2 (Ombre / Palette 3 Violet) with HeroBeams.
* `/products/postureone` — Core product capability overview and ROI calculator.
* `/thinking` — Thought leadership articles with real-time Sanity CMS integration.
* `/tokens` — Design token inspector verifying Palette 3 contrast tokens.
* `/styleguide` — Atomic components, buttons, inputs, and dark/light bands.
* `/studio` — Embedded Sanity Studio for local content authoring.

---

## 3. Environment Variables & Secret Separation

All configuration is isolated across environments. Secrets starting with `NEXT_PUBLIC_` are bundled to the client browser; all other secrets remain server-side only.

| Environment Variable | Required | Scope | Purpose |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_ENV` | Yes | Client/Server | Environment indicator: `development`, `staging`, or `production`. |
| `NEXT_PUBLIC_SITE_URL` | Yes | Client/Server | Canonical URL (e.g., `https://xsignon.com`). |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Client/Server | Sanity Project ID (`sanity.io/manage`). |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Client/Server | `staging` for dev/preview; `production` for live. |
| `SANITY_API_READ_TOKEN` | Yes (Draft) | Server Only | Read token for Next.js live draft mode previews. |
| `SANITY_REVALIDATE_SECRET` | Yes (ISR) | Server Only | HMAC shared secret for on-demand edge cache purge. |
| `NEXT_PUBLIC_SENTRY_DSN` | Optional | Client/Server | Error reporting ingestion URL with PII scrubbing. |
| `CRM_WEBHOOK_URL` | Yes (Prod) | Server Only | Production CRM endpoint for inbound lead dispatch. |
| `EMAIL_PROVIDER_ENDPOINT` | Yes (Prod) | Server Only | Transactional email provider API. |

---

## 4. Development & Quality Gate Scripts

Run these scripts locally before opening any pull request:

```bash
npm run typecheck    # TypeScript compiler check (zero errors)
npm run lint         # ESLint style and security rules (zero warnings)
npm run test         # Vitest unit & integration test suite (100% pass)
npm run build        # Production Next.js build with static route generation
npm run e2e          # Playwright E2E browser test suite (run build first)
npm run lhci         # Lighthouse CI performance & accessibility audits
```

---

## 5. Deployment, Rollback & Disaster Recovery

Deployments are automated through Vercel linked to the GitHub repository:

* **Preview**: Every Pull Request automatically provisions a unique preview URL with isolated `staging` Sanity dataset.
* **Staging**: Merges to `staging` deploy to `https://staging.xsignon.com`.
* **Production**: Merges to `main` deploy instantly to the global edge at `https://xsignon.com`.

### Emergency Rollback Procedures (Three Tiers)
1. **Tier 1 (Instant Edge Rollback - < 2 minutes)**: In the Vercel Dashboard, select the previous stable deployment and click **Promote to Production**. Instant edge DNS alias swap.
2. **Tier 2 (Git Revert - < 5 minutes)**: Revert the failing commit on `main` via `git revert HEAD` and push to trigger automated CI build.
3. **Tier 3 (CMS Dataset Rollback - < 10 minutes)**: Restore Sanity dataset from the latest automated ndjson snapshot:
   ```bash
   sanity dataset import backups/sanity-production-latest.tar.gz production --replace
   ```

*Complete Disaster Recovery Runbook:* [`docs/operations/rollback-rehearsal-runbook.md`](docs/operations/rollback-rehearsal-runbook.md)  
*Sanity Backup & Restore Runbook:* [`docs/migration/cms-backup-restore-runbook.md`](docs/migration/cms-backup-restore-runbook.md)

---

## 6. Live Integrations & Staging Boundary

To prevent accidental pollution of production systems, strict boundary rules are enforced:
* **Staging and Preview** environments are strictly blocked from interacting with the production CRM and production mailing list.
* All test submissions on staging route to designated staging test sinks.
* *Detailed isolation specs:* [`docs/operations/live-integrations-switchover.md`](docs/operations/live-integrations-switchover.md)

---

## 7. Operational Runbook Directory & Support Contacts

For comprehensive operational runbooks, see the master index:
* **[Master Runbook & Operations Index](docs/operations/master-runbook-index.md)**
* **[DNS Cutover Plan](docs/migration/dns-cutover-plan.md)**
* **[Go-Live Smoke Test Runbook](docs/operations/go-live-smoke-test-runbook.md)**
* **[Post-Launch Monitoring Protocol](docs/operations/post-launch-monitoring-protocol.md)**
* **[Sanity CMS Editor Handbook](docs/cms/sanity-editor-guide.md)**
* **[Post-Launch Support Agreement](docs/compliance/post-launch-support-agreement.md)**
* **[Launch Retrospective (ADR 0003)](docs/decisions/0003-launch-retrospective.md)**

### Emergency On-Call Contacts
* **Lead Systems Architect:** `infra-lead@xsignon.com`
* **Senior Frontend Engineer:** `frontend-lead@xsignon.com`
* **Executive Escalation:** `executive@xsignon.com`
* **PagerDuty Alerting:** `#alerts-prod-urgent` (Slack)
