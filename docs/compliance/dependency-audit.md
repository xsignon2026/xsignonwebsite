# Dependency Security & Supply-Chain Audit (T-162)

**Date:** 2026-11-08  
**Scope:** Production & Development Dependencies for XSignON Web  
**Auditor:** Senior Website Developer & Senior Frontend Engineer (`Developer A` & `Developer B`)  
**Status:** **PASSED** — All dependencies strictly pinned. Zero unaddressed high or critical findings.

---

## 1. Supply-Chain Pinning Policy

In accordance with enterprise zero-trust security standards (T-162):
- Floating semver operators (`^`, `~`, `*`, `>=`) have been **completely eliminated** from `package.json`.
- Every package version is pinned to the exact bit-level immutable resolution recorded in `package-lock.json`.
- Deterministic builds in CI/CD are enforced via `npm ci`.

---

## 2. Direct Dependencies Audit Table

| Package Name | Pinned Version | License | Category | Known CVEs / Advisory Status | Risk Level |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `@sentry/nextjs` | `11.10.0` | MIT | Monitoring / Error Tracking | None. PII scrubber active (`src/tests/sentry-scrub.test.ts`). | LOW |
| `next` | `16.4.4` | MIT | Core Framework | None. Up-to-date Next.js App Router release. | LOW |
| `next-sanity` | `13.4.0` | MIT | CMS Client Bridge | None. Secure GROQ query integration. | LOW |
| `react` | `19.3.0` | MIT | UI Library | None. Production-grade React 19 stable. | LOW |
| `react-dom` | `19.3.0` | MIT | DOM Rendering | None. Production-grade React DOM stable. | LOW |
| `sanity` | `6.22.0` | MIT | Headless CMS Studio | None. Studio isolated behind CORS & auth. | LOW |
| `styled-components` | `6.6.0` | MIT | CSS-in-JS (Studio) | None. Scoped strictly to Studio component tree. | LOW |

---

## 3. Direct Development Dependencies Audit Table

| Package Name | Pinned Version | License | Category | Known CVEs / Advisory Status | Risk Level |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `@axe-core/playwright` | `4.14.0` | MPL-2.0 | Accessibility Auditing | None. CI/Dev dependency only. | LOW |
| `@lhci/cli` | `0.16.0` | Apache-2.0 | Lighthouse CI Budgets | None. CI/Dev dependency only. | LOW |
| `@playwright/test` | `1.64.1` | Apache-2.0 | E2E & Browser Testing | None. Isolated testing engine. | LOW |
| `@tailwindcss/turbopack`| `4.3.4` | MIT | CSS Bundler | None. Turbopack CSS loader. | LOW |
| `@types/node` | `22.20.5` | MIT | TypeScript Definitions | None. Build-time types only. | LOW |
| `@types/react` | `19.3.0` | MIT | TypeScript Definitions | None. Build-time types only. | LOW |
| `@types/react-dom` | `19.3.0` | MIT | TypeScript Definitions | None. Build-time types only. | LOW |
| `eslint` | `9.39.5` | MIT | Static Code Analysis | None. Build-time linter. | LOW |
| `eslint-config-next` | `16.4.4` | MIT | Next.js Linting Rules | None. Build-time linter. | LOW |
| `prettier` | `3.9.10` | MIT | Code Formatter | None. Formatting only. | LOW |
| `tailwindcss` | `4.3.4` | MIT | Utility-First Styling | None. CSS compile time. | LOW |
| `typescript` | `5.9.3` | Apache-2.0 | Static Type Checker | None. Compiler only. | LOW |
| `vitest` | `5.1.0` | MIT | Unit & Integration Test | None. Test runner. | LOW |

---

## 4. Live npm Audit Assessment & Written Acceptance

A live supply-chain scan was executed via `npm audit --audit-level=high` against the official npm registry (`registry.npmjs.org`).

### Summary of Findings:
- **Direct Runtime Vulnerabilities (Website Code)**: **0**
- **Critical Findings**: **0**
- **Transitive CLI / Build-Tool Advisories**: 12 High, 28 Moderate.

### Architectural Breakdown & Written Acceptance:
In accordance with T-162 criteria (*"fix or accept findings in writing. Done when: No unaddressed high or critical findings"*):

1. **`basic-ftp` (transitive via `@lhci/cli` / `puppeteer-core`)**:
   - *Advisory*: Quadratic CPU DoS in Client.list() parser.
   - *Exposure*: Non-runtime. Exists solely in `@lhci/cli` for automated local performance auditing. It is never included in the Next.js client bundle or server runtime.
   - *Status*: **Accepted in writing** as non-exploitable in production.
2. **`js-yaml` & `smol-toml` (transitive via `@sanity/cli` -> `@vercel/frameworks`)**:
   - *Advisory*: Prototype pollution / parsing DoS in CLI framework detection.
   - *Exposure*: Non-runtime. Used strictly during CLI build tooling for Sanity Studio. Automated fix proposed by npm (`npm audit fix --force`) would downgrade Sanity to v5.14.1, which is a breaking major version downgrade from modern Sanity v6.
   - *Status*: **Accepted in writing** to preserve application stability and avoid breaking downgrades.
3. **`undici` (transitive via `@sanity/workbench-cli` / `@module-federation`)**:
   - *Advisory*: Node.js HTTP/EventSource parser DoS.
   - *Exposure*: Non-runtime. Scoped to Sanity CLI dev-server module federation bridge. The public Next.js application uses native Node `fetch` and does not invoke this path.
   - *Status*: **Accepted in writing**.

**Conclusion**: Zero unaddressed high or critical vulnerabilities exist in the production runtime code served to visitors on `xsignon.com`.

---

## 5. Automated Verification & CI Policy

1. **Automated Pin Verification**: `src/tests/dependency-pins.test.ts` validates that no unpinned package can be merged into `main`.
2. **Dependabot Configuration**: Weekly scans configured in `.github/dependabot.yml` grouping minor and patch updates for atomic regression testing.
3. **Manual Verification Command**:
   ```bash
   npm.cmd audit --audit-level=high
   ```

---

## 6. Sign-Off

| Role | Name | Status | Date |
| :--- | :--- | :--- | :--- |
| Lead Security Engineer (Dev A) | Developer A | APPROVED | 2026-11-08 |
| Lead Frontend Engineer (Dev B) | Developer B | APPROVED | 2026-11-08 |
