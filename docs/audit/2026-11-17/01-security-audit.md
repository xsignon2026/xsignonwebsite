# XSignOn website: security audit (source-first)

Repo: `D:\New folder\XSignON\XSignON Website\xsignonwebsite`, branch `Version-2` (clean). Date: 2026-11-17.
Nothing in the repo was modified. No secret values were read or printed; only variable names.

---

## 1. Scope, method, coverage gaps

**Method.** Every route handler was read in full; each trust boundary was traced from the request to its sink (DB, mail, filesystem, cache, outbound fetch). A finding needs a lower-trust principal, an input or action, the control it defeats, the boundary crossed, the resource and a concrete result. Anything else is listed under hardening. Behaviour was checked with ordinary `curl` requests to `http://localhost:3000` only, using dummy data. Nothing touched a non-local host, and no email was sent.

**Walked.**
- Routes: `src/app/api/**` (all 19 route files), `src/app/admin/enquiries/**`, `src/app/studio/[[...tool]]`, the draft-mode enable and disable routes, and the verify, unsubscribe and thank-you pages.
- Libraries and config: `src/lib/**` (all), `src/sanity/**` (env, client, fetch, revalidation, validation, link, cta and the queries), `next.config.ts`, `vercel.json`, `src/lib/csp.ts`, `src/lib/security-headers.ts`, `db/migrations/*.sql`, `.github/workflows/ci.yml`, `.gitignore`, `.env.example` and git history.
- Installed libraries checked for behaviour: `node_modules/@sanity/webhook` and `node_modules/next-sanity/dist/webhook`.
- There is no `middleware.ts` or `proxy.ts`.

**Live checks run.**
- Headers: `curl -sI` on `/`, `/studio`, `/studio/desk`, `/api/health/deliveries` and `/admin/enquiries`.
- Negative requests to: contact (cross-origin and form-encoded), revalidate, the three crons, monitoring-test, white-paper download, static paths for `private/`, `reference/` and the beams HTML, one-click unsubscribe, draft-mode enable, the email webhook, phishlens (cross-origin and an IP literal), subscribe, and csp-report.

**Coverage gaps.**
- The local dev server has no `DATABASE_URL`, `SIGNED_URL_SECRET`, `UNSUBSCRIBE_SECRET` or `ENQUIRY_HASH_SECRET`, so the DB-backed flows (rate limits, verify, download, admin) could not run end to end. They were verified from source and from the existing pglite tests.
- Production Vercel settings, Sanity project settings (dataset visibility, CORS, token scopes, roles) and DNS (SPF/DKIM/DMARC) are not in the repo. See Needs-validation.
- The dev build was checked, not a production build. Production CSP differences (no `unsafe-eval`, no localhost) were derived from source.
- `npm audit` ran successfully (online). Its results are below.

---

## 2. Findings

| ID | Title | State | Severity | Location |
|---|---|---|---|---|
| F-01 | Sanity revalidate webhook: no replay window, non-constant-time compare, and the hardened checker is unused | confirmed | low | `src/app/api/revalidate/route.ts:15`; `node_modules/@sanity/webhook/dist/index.js:18-19`; unused `src/lib/webhook-signature.ts` |
| F-02 | Verify page auto-confirms on load, so link scanners that run JavaScript bypass double opt-in | confirmed | low | `src/app/subscribe/verify/VerifyClient.tsx:37-48` |
| F-03 | Site-wide rate-limit buckets can be used up by one sender with a handful of addresses, locking everyone out (contact, subscribe, scan) | confirmed | low | `src/lib/contact/handler.ts:22-28,94-101`; `src/app/api/subscribe/route.ts:25-29,103-113`; `src/app/api/phishlens-scan/route.ts:24-27,93-102` |
| R-* | Rejected candidates | rejected | n/a | Section 3.4 |

No critical, high or medium issues were found. The application-level controls are unusually careful for a marketing site.

---

## 3. Finding details

### F-01: Sanity revalidate webhook replay and non-constant-time compare (confirmed, low)

- **Principal:** anyone who obtains one genuine signed delivery. Ways this can happen: Sanity's webhook attempt log, a logging proxy, or a request captured in a third-party tool.
- **Action:** re-POST that exact body and `sanity-webhook-signature` header to `/api/revalidate` at any later time.
- **Intended control:** S-16, "signed webhook", plus the repo's own stated hardening at `src/lib/webhook-signature.ts:4-6`: "compares in constant time and rejects old timestamps, so a captured delivery cannot be replayed later".
- **What actually runs:**
  - `route.ts:15` calls `next-sanity`'s `parseBody`, which calls `@sanity/webhook` `isValidSignature`.
  - That library (`dist/index.js:18-19`) only recomputes the HMAC for the timestamp in the header and compares with `signature !== encoded`. There is no freshness check and the compare is not constant-time.
  - `isValidWebhookSignature` is imported only by `src/tests/webhook-signature.test.ts`. The test suite passes on a control that is not deployed.
  - `parseBody` also reads the whole body with no size cap and runs `JSON.parse` even when the signature is invalid. A bad body returns an unhandled 500 (seen locally: `revalidate bad sig, bad json -> 500`).
- **Boundary crossed:** cache invalidation authority, which is supposed to be held only by Sanity at the time of a publish.
- **Result:** unlimited replay of `revalidateTag` for the captured document's tags. A `siteSettings` or `navigation` payload maps to the `layout` tag, which every page reads (`src/sanity/lib/revalidation.ts:18-21`), so a replay loop busts the cache for the whole site. That raises origin and Sanity API load and cost. Content cannot change, and no data is disclosed. Hence low.
- **Safe local repro:** run as a unit test with a dummy secret; no server is needed:
  ```ts
  import { isValidSignature } from "@sanity/webhook"; // what parseBody uses
  import { createHmac } from "node:crypto";
  const secret = "dummy-secret", body = '{"_id":"x","_type":"siteSettings"}', t = 1_700_000_000_000; // Nov 2023
  const sig = `t=${t},v1=${createHmac("sha256", secret).update(`${t}.${body}`).digest("base64url")}`;
  expect(await isValidSignature(body, sig, secret)).toBe(true);           // 3-year-old delivery accepted
  // the repo's own helper refuses it:
  expect(isValidWebhookSignature(body, sig, secret, Date.now())).toBe(false);
  ```
  Live variant (localhost only): set `SANITY_REVALIDATE_SECRET` to a dummy value in a scratch env, sign as above, and POST the same request twice an hour apart. Both return 200.
- **Smallest fix:** in `route.ts`, read the body with `readCapped(request, MAX_BODY_BYTES)`, then return 401 if `!isValidWebhookSignature(raw, request.headers.get("sanity-webhook-signature"), secret)`, then `JSON.parse(raw)` inside a try/catch. Drop `parseBody`, and keep the 3 s consistency wait with `setTimeout` if it is still needed.
- **Regression test:** a route-level test that POSTs a correctly signed body with `t` = now − 6 min and expects 401. Add a 70 KB body test expecting 413, and an invalid-JSON body with a valid signature expecting 400 (not 500).

### F-02: The verify page confirms automatically on load (confirmed, low)

- **Principal:** a third party who types a victim's address into the newsletter or white-paper form. Effect only when the victim's mail gateway fetches links in a JavaScript-capable sandbox, as Microsoft Defender Safe Links, Proofpoint URL Defense detonation and Mimecast do.
- **Action:** the gateway opens `https://site/subscribe/verify?token=…` and runs the page JavaScript. `VerifyClient.tsx:37-48` POSTs the token in a `useEffect` with no user gesture.
- **Intended control:** double opt-in with a human confirmation. The route comment `src/app/api/subscribe/verify/route.ts:10-12` says "It is a POST because… a link scanner that only fetches pages must not use up the link." The POST defeats only scanners that do not run JavaScript.
- **Boundary crossed:** consent. The site records `subscribers.consented_at`, `wording_version` and `verified_ip_hash` (the scanner's IP) without the address owner acting.
- **Results:**
  1. A subscription can be recorded without the owner's action, and the consent record attests to it.
  2. For white papers, the scanner uses up the single-use token, so the human later sees "already used" and must request again.
- **Limits:** no data disclosure. The victim can unsubscribe. It depends on the gateway's behaviour. Hence low.
- **Safe local repro** (needs a local DB): request a verification for `test@example.test`, take the raw token from the `requestVerification` return in a test, then load `/subscribe/verify?token=…` in a headless browser with no clicks. `subscribers` now holds the row.
- **Smallest fix:** render a "Confirm my email" button and send the POST only from its `onClick`. Optionally keep auto-submit only after a user-activation check (`navigator.userActivation?.hasBeenActive`).
- **Regression test:** a Playwright test that loads `/subscribe/verify?token=x`, intercepts `/api/subscribe/verify`, and asserts zero calls until the button is clicked.

### F-03: Shared global rate limits are cheap to exhaust (confirmed, low; availability)

- **Principal:** an unauthenticated sender with 2 to 50 source addresses. IPv4 addresses each count separately; IPv6 counts per /64 (`src/lib/contact/keys.ts:10-30`).
- **Action:** submit valid requests until the shared `global:all`, `sub-global` or `scan-global` bucket trips.
  - Contact: 5 per 10 min per sender, so 30 per hour. The global cap is 60 per hour (`handler.ts:22-28`), so **two senders** lock the contact form for every visitor for the rest of the hour. Each email address may be used 3 times per hour, so about 20 throwaway addresses are needed.
  - Subscribe: 10 per hour per sender against 300 per hour global, so 30 senders.
  - PhishLens scan: 10 against 500, so 50 senders.
- **Counters persist even when a request is refused.** `overLimit` increments before it compares, and the transaction returns normally on "limited", so it commits (`handler.ts:92-101`, `subscribe/route.ts:108-113`). The attacker cannot burn the global bucket from an already-blocked IP because the loop stops at the first trip, but fresh senders can.
- **Intended control:** the global caps exist to protect the inbox and database. The comment at `handler.ts:25-26` acknowledges the trade-off ("When it trips for real traffic, raise it, or switch on the spam widget").
- **Boundary crossed:** availability of the contact form, the first conversion path, for legitimate visitors.
- **Result:** HTTP 429 for every real enquiry for up to an hour, renewable each hour. Contact floods also make production send confirmation emails, with fixed text, to the addresses the attacker supplied.
- **Severity:** low, given an available but cheap DoS on a marketing form with a documented trade-off.
- **Repro (pglite, in a test):** call `handleContact` 30 times with `clientIp: "198.51.100.1"` and 30 times with `"198.51.100.2"`, using distinct emails and submissionKeys. Then call it with `clientIp: "203.0.113.9"` and expect `status: 429`.
- **Smallest fix (pick one):**
  1. Raise the contact global cap well above the per-sender cap × a realistic attacker pool, and alert at, say, 50%.
  2. Better: when the global cap trips, require a challenge (Cloudflare Turnstile, decision D2) instead of refusing.
  3. Do not count requests from already-limited senders against the global bucket. This is already the case; keep it.
- **Regression test:** the scenario above should return 200 (or "challenge required") for the third sender.

### 3.4 Rejected candidates (checked and not exploitable)

| ID | Candidate | Why rejected |
|---|---|---|
| R-01 | SSRF via `/api/phishlens-scan` | The server only calls the fixed host `PHISHLENS_URL` (`src/lib/phishlens.ts:5`). The visitor value is reduced to a DNS name by `toDomain` (labels, letter TLD; IP literals refused, confirmed locally with 400) and sent as JSON data. Whether PhishLens itself blocks internal targets is that service's concern; see NV-7. |
| R-02 | SSRF via `sync-linkedin` | Fixed host `api.linkedin.com`. The org id and token come from the environment. The response is only counted. |
| R-03 | SQL injection | Every query in `src/lib/**` and the routes uses `$n` parameters. No string-built SQL. `make_interval` arguments are parameters too. |
| R-04 | Path traversal or arbitrary file read in the download route | Slug and verification id are covered by the HMAC (`signed-urls.ts:9-12`). The id must be a UUID and verified in the DB (`mayDownload`). The file name comes from a static map, then `path.basename` plus a prefix check (`download/route.ts:47-49`). A `__proto__` slug cannot pass the signature or DB check. |
| R-05 | Direct access to private PDF, `reference/`, `xsignon-home-beams.html`, `scratch/` | All 404 locally. Only `public/` is served. `xsignon-home-beams.html` and `scratch/` are untracked and gitignored. The PDF is committed to git (readable by anyone with repo access) but is not web-reachable. |
| R-06 | Open redirect | One-click GET redirects to `siteUrl` from the environment. Draft-disable redirects to `/`. Admin replay redirects to a fixed path. Draft-enable redirect validation is done by `next-sanity` and requires a Studio-signed secret (unsigned request returned 500 and set no cookie). |
| R-07 | Email header injection | Subjects are fixed text. Single-line fields reject CR, LF and control characters (`schema.ts:25`). Resend gets a JSON body with separate fields. `EMAIL_FROM` and `ENQUIRY_INBOX` are regex-validated. |
| R-08 | XSS via JSON-LD | `JsonLd` uses `serializeJsonLd`, which escapes `<`, `>` and `&`. `src/app/page.tsx:45` and `src/app/about/page.tsx:148` use raw `JSON.stringify`, but only on hard-coded constants, so this is not reachable (hardening H-07). |
| R-09 | XSS via `innerHTML` in `home-behaviors.ts:519-522` | The source is the hard-coded `HUB` constant (`:463`). No input flows in. |
| R-10 | `javascript:` links from the CMS | Studio validation blocks schemes other than https, mailto and tel (`validation.ts:94-108`). React 19 also replaces `javascript:` hrefs at render time. The principal would have to be a Sanity editor with API write access, who is already trusted to publish content. Render-time allowlist is hardening H-06. |
| R-11 | Admin page auth | Fails closed when unset or when the password is under 16 characters (503, confirmed locally). Constant-time user and password compare, lock-out after 10 failures per sender per 10 min, checked before the compare. `no-store` and `noindex`. Replay POST requires a same-host `Origin`. The page shows no PII and escapes HTML. |
| R-12 | Cron routes | `cleanup` and `deliveries` fail closed (401 locally) with `safeEqual`. `sync-linkedin` is open only when `NODE_ENV !== "production"` and no secret is set (hardening H-04). |
| R-13 | CSRF on state-changing routes | Public POSTs need `application/json` (a non-simple type, so a cross-site page must pass a CORS preflight) plus a same-host `Origin` when present (403 and 415 confirmed locally). Verify and unsubscribe changes are POST only. One-click unsubscribe changes state on POST only, which is RFC 8058 compliant; GET only redirects. |
| R-14 | Subscriber enumeration | `/api/subscribe` and `/api/unsubscribe` return identical bodies for known and unknown addresses. Mail is sent in `after()`, so response timing does not depend on whether a mail goes out. Per-email limits apply to every address equally. |
| R-15 | Token design | Verify tokens are 256-bit random, stored as SHA-256, single-use through an atomic `update … where status='pending'`, with a 24 h expiry. Unsubscribe tokens are HMAC-SHA256(email) with constant-time compare. Download links are HMAC over slug, id and expiry with a 15-minute TTL. Missing secrets throw, so requests fail closed (500 seen locally with no secrets). |
| R-16 | Svix (Resend) webhook | Raw body capped at 64 KB, `whsec_` key decoded, constant-time compare, ±5 min window, fails closed without a secret (401 confirmed). Replay within 5 min only re-applies an idempotent suppression. |
| R-17 | Committed secrets | `.env.local` is untracked and matched by `.env*` in `.gitignore`. A full-history regex scan (82 commits) found no keys, tokens, DSNs or credentialed DB URLs. Hits were pnpm-lock integrity hashes and test `stubEnv` values. `.env.example` values are empty; historically it held only a public business inbox address and localhost. |
| R-18 | Client-bundle secret exposure | Only `NEXT_PUBLIC_SITE_ENV`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and `NEXT_PUBLIC_SENTRY_DSN` are public, and all are public by design. No `"use client"` file reads `process.env`. `sanity/lib/fetch.ts` and `db/index.ts` import `server-only`. |
| R-19 | Draft leakage into public cache | Draft reads happen only with the draft-mode cookie, use a server-only token, `perspective: "drafts"` and `cache: "no-store"`. Public reads use `perspective: "published"`. Webhook ignores `drafts.` ids. |
| R-20 | `next@16.4.4` advisory (info disclosure through `unstable_cache` with `'use cache'`) | The code uses neither `unstable_cache` nor `'use cache'` (grep is empty), so it is not reachable. Upgrade anyway (H-03). |
| R-21 | Unauthenticated `/api/health/deliveries` | Returns only `{ok}` with no counts. Operational status disclosure is intentional for the uptime monitor. |
| R-22 | GitHub Actions `pull_request_target` or secret exposure | The workflow uses `pull_request`, not `pull_request_target`. No secrets are used, only `vars.NEXT_PUBLIC_SANITY_PROJECT_ID`. Pinning and permissions are hardening H-05. |

---

## 4. Needs-validation (no severity; the missing fact is stated)

| ID | Item | Exact missing fact |
|---|---|---|
| NV-1 | Client-IP trust for every rate limit and the admin lock-out | Whether production runs **only** on Vercel with no extra proxy or CDN in front. The code trusts `x-real-ip` and then the first `x-forwarded-for` hop (`src/lib/api-guard.ts:20-26`, `contact/route.ts:62-65`, `admin-request.ts:23-26`). `csp-report` and `telemetry/vitals` trust the first XFF hop, and `csp-report:25` has a typo (`x-real-ipd`). If anything other than Vercel's edge sets these headers, every per-IP limit and the admin lock-out can be bypassed by spoofing them. |
| NV-2 | S-07 staging access control | Whether Vercel Deployment Protection (password or SSO) is enabled for Preview and staging. There is no middleware or proxy in the repo; the gate doc lists it as HUMAN. |
| NV-3 | Sanity project settings | Dataset visibility (public or private). CORS origins, which should be only the production, staging and localhost origins, with "Allow credentials" for the Studio origin only. Scope of `SANITY_API_READ_TOKEN`, which should be Viewer. The revalidate webhook's filter (whether it includes drafts) and that `SANITY_REVALIDATE_SECRET` is long and random. |
| NV-4 | Production environment values | That `CRON_SECRET` is at least 16 characters (better 32+), `ENQUIRY_HASH_SECRET`, `SIGNED_URL_SECRET` and `UNSUBSCRIBE_SECRET` are at least 32, `ADMIN_PASSWORD` is at least 16, `NEXT_PUBLIC_SITE_URL` is `https://…` (T-068 "link is HTTPS"; the default is `http://localhost:3000`), and `DATABASE_URL` has `sslmode=verify-full` (or `require` with the pg version's semantics confirmed). The local `.env.local` uses older names (`EMAIL_API_KEY`, `WEBHOOK_SIGNING_SECRET`, `CONTACT_NOTIFICATION_EMAIL`) that the code no longer reads, so mail and webhooks are effectively off locally. |
| NV-5 | Delivery retry cadence (T-056) | `vercel.json` runs `/api/cron/deliveries` once a day (`0 6 * * *`), while the code comment says "every few minutes". Whether an external uptime monitor polls `/api/health/deliveries` (15-minute stale alarm) and alerts the owner. |
| NV-6 | S-15 draft preview live test | A real editor session showing a draft through `/api/draft-mode/enable` and a logged-out browser never showing it. Needs the read token and the Studio. |
| NV-7 | PhishLens upstream | Whether the PhishLens service (`phishlens-latest-l8n7.onrender.com`) refuses internal-network or metadata targets. The site forwards arbitrary public-looking domain names to it, at 500 per hour. |
| NV-8 | T-057 email authentication | SPF, DKIM and DMARC records for the sending domain and an inbox-placement test. DNS is not in the repo. |

---

## 5. Hardening recommendations (prioritised; no reachable boundary violation today)

1. **H-01: Serve the CSP that the tests check.** `next.config.ts:6-85` re-implements the CSP and header builders instead of importing `src/lib/csp.ts` and `src/lib/security-headers.ts`, and the two have drifted.
   - The live header (curl on `/`) lacks `object-src 'none'`, `frame-src 'self'` and, in production, `upgrade-insecure-requests`.
   - It adds `report-to csp-endpoint` with no `Reporting-Endpoints` header, so that directive is inert.
   - `src/tests/csp.test.ts` and `owasp-top-10.test.ts` pass against the module that is not used.
   - Import the lib modules in `next.config.ts` (or add a test that compares `nextConfig.headers()` output with `buildCsp()`).
2. **H-02: Fix F-01 even though it is low**, because the S-16 and T-163 evidence documents claim the opposite (see section 6).
3. **H-03: Dependencies.** `npm audit --omit=dev` reports **3 high** and **22 moderate**, 0 critical:
   - High: `undici` 7.0–7.30, `js-yaml` ≤3.15.1 and `smol-toml` ≤1.8.0, all transitive through `sanity`'s CLI and build tooling (`@sanity/cli`, `@vercel/frameworks`, `@module-federation/*`).
   - Moderate: `next@16.4.4` (fix 16.4.6), `@sentry/nextjs@11.10.0` (fix 11.13.0, through `glob`), plus others.
   - Runtime reachability of the high ones is low: they are CLI, YAML and TOML parsing of developer-controlled files, and undici is used by the build tooling, not by the app's `fetch`.
   - Upgrade `next` to 16.4.6 and `@sentry/nextjs` to 11.13.0 now. Track `sanity` for a release that bumps `undici`, `js-yaml` and `smol-toml`, or add npm `overrides`. Record any accepted risk in `docs/compliance/dependency-audit.md`, which today wrongly says "zero findings".
4. **H-04: `sync-linkedin` fails open outside production** (`route.ts:15-22`). Make it fail closed like `cleanup` and `deliveries`. Also align the three crons on one `requireCronAuth()` helper, because cleanup strips `Bearer` while deliveries compares the full header.
5. **H-05: CI.**
   - Add top-level `permissions: contents: read`.
   - Pin `actions/checkout`, `actions/setup-node` and `actions/upload-artifact` to commit SHAs (Dependabot already exists and can bump them).
   - Consider `npm ci --ignore-scripts` for lint, typecheck and test jobs.
   - Add `npm audit --omit=dev --audit-level=high` as a job.
6. **H-06: Check CMS URLs at render time.** Header, Footer and nav render `link.href` from Sanity straight into `<Link>`. Studio validation does not bind API or CLI writes. Add an `isAllowedExternalUrl`-style allowlist in `getNavigationData` and `getSiteSettingsData`, or in a `<SafeLink>`. Also prefix internal slugs with `/`: `internal->slug.current` returns `about`, not `/about`, which is a functional bug.
7. **H-07: Use `<JsonLd>` everywhere.** Replace the raw `JSON.stringify` at `src/app/page.tsx:45` and `src/app/about/page.tsx:148` so future CMS-sourced fields cannot inject `</script>`.
8. **H-08: `csp-report` and `telemetry/vitals`.**
   - Both read bodies with `request.json()` and no cap. Use `readCapped` at 8 to 16 KB.
   - Both keep unbounded in-memory `Map`s keyed by an XFF value. Add a size bound or eviction, as `phishlens-scan` does.
   - Fix the `x-real-ipd` typo.
   - `csp-report` logs `document-uri`, which on `/subscribe/verify?token=…` or `/unsubscribe?email=…&token=…` writes a token and an email to the logs. Strip the query before logging.
9. **H-09: `monitoring-test` compares the secret with `!==`** (`route.ts:8`). Use `safeEqual` for consistency. Remote timing exploitation is impractical.
10. **H-10: Tokens and PII in URLs.** Unsubscribe links carry the email address plus a non-expiring HMAC token in the query string, and verify links carry the token. Both land in platform access logs. Consider:
    - an opaque, versioned unsubscribe token (HMAC over subscriber id and a key version) without the raw email;
    - key rotation support for `UNSUBSCRIBE_SECRET`.
11. **H-11: Retention.**
    - `cleanup()` keeps `verified` verification rows (email and IP hash) forever (`core.ts:175-178`); add a retention period, for example 24 months for consent evidence.
    - `scripts/cleanup-data.mjs` (NDJSON files) and `src/lib/enquiry/store.ts` (in-memory store with an IP and SMS-consent shape) are dead and unreferenced; delete them so nobody wires them back in.
12. **H-12: Unsigned webhook bodies (part of F-01).** Cap the body size before signature verification, and return 400, not 500, on bad JSON.
13. **H-13: Admin lock-out race.** The count is read, then incremented on failure, so a burst of parallel guesses can exceed 10 per window. Move to an atomic `insert … returning count` before the compare, as in `overLimit`. Impact is small given the 16-character minimum password.
14. **H-14: Repo hygiene.** `private/white-papers/*.pdf` is in git. Acceptable if the repo stays private, but anyone with read access has the gated paper; consider moving it to private object storage. `reference/prototype-v5` ships in the repo but is not served.
15. **H-15: T-161 "A+" target.** `script-src 'unsafe-inline'` (decision 0001) will cap Mozilla Observatory below A+. Either record that as accepted, or move to hash- or nonce-based script-src for the dynamic routes.

---

## 6. Requirements-sheet security task compliance

Source: `C:\Users\Vcher\Downloads\XSignOn Website Tasks..csv`, read with the Python `csv` module. All rows show STATUS "Not started" in the sheet; the column below judges the code against each task's "Done when".

| Task | Done when | Verdict | Evidence / gap |
|---|---|---|---|
| S-07 Protect staging | Staging cannot be indexed; staging form never reaches a real workflow | **Partly met** | noindex outside production (`layout.tsx:26-27`) and robots disallow (`robots.ts:6-10`). Staging mail goes to a per-environment `ENQUIRY_INBOX`, with visitor confirmations off and a `[staging]` subject (`mail/config.ts:37-44`). The access control (password or SSO) is not in code: NV-2. |
| S-14 Roles and permissions | Role table written and verified with test accounts | **Not met** | `docs/gate-g1-foundation-review.md:68-69` says "GAP (deferred)": the free plan lets every editor change navigation. `docs/cms/sanity-editor-guide.md:111` claims a Publisher-only restriction that does not exist, so that guide is inaccurate. |
| S-15 Safe draft preview | Draft visible only to signed-in editors; public never shows a draft | **Met in code; live test pending** | `api/draft-mode/enable` uses `defineEnableDraftMode` with a server token. `sanity/lib/fetch.ts` reads drafts with `no-store` and published content otherwise. Scheduled publishing is marked out of scope. Needs NV-6. |
| S-16 Revalidation webhook | Product publish updates page, listing and home within a minute; unsigned calls rejected | **Partly met** | Unsigned calls get 401 (confirmed). Dependency map in `revalidation.ts`. The signature check has no replay window or constant-time compare, and the hardened helper is unused (F-01). The within-a-minute check is HUMAN. |
| S-17 Rendering and CSP decision | Decision logged with approach and script list | **Met** | `docs/decisions/0001-rendering-and-csp.md` (option B, `unsafe-inline`, script list). The served CSP has drifted from `src/lib/csp.ts` (H-01). |
| T-055 Contact handler | Invalid input keeps valid fields; double click creates one enquiry | **Met** | zod field errors per field (`schema.ts:79-90`), honeypot plus timing, three limits, `submission_key` unique with `on conflict do nothing` (`handler.ts:86-117`). Availability caveat in F-03. |
| T-056 Delivery with failure strategy | With CRM off, enquiry saved and alert sent | **Met in code; ops pending** | Outbox in the same transaction, leased retries, Sentry `onPermanentFailure`, `/api/health/deliveries` alarm, admin replay. Retry cron is daily and the uptime monitor is unverified (NV-5). |
| T-057 Sender and confirmation | Test message passes SPF/DKIM/DMARC and lands in inbox | **Needs validation** | DNS is out of repo (NV-8). The confirmation email echoes no visitor input (`compose.ts:59-77`). |
| T-058 Thank-you page | Reachable only after submission; noindex | **Met** | HttpOnly, short-lived `contact_sent` cookie (`contact/route.ts:86-92`). The page redirects without it and sets `robots` noindex (`thank-you/page.tsx:7-19`). |
| T-059 SMS consent wording | Approved wording or checkbox removed | **Met (checkbox removed)** | No SMS field in the form or schema. Dead `enquiry/store.ts` still has `smsConsent` fields (H-11). |
| T-060 Staging to test workflows | Staging enquiry reaches test inbox and nothing in production | **Met in code; env pending** | No default inbox; it is set per environment, and confirmations are off outside production. Depends on Vercel environment values (NV-4). |
| T-064 Private PDF and signed links | Copied link stops after expiry; direct file URL returns no file | **Met** | 15-minute HMAC links (`signed-urls.ts`), verified-only (`mayDownload`). `/private/...pdf` returns 404 (confirmed). The PDF is in git (H-14). |
| T-065 Verification data store | Schema reviewed; unverified rows never copied to list | **Met** | `003_subscriptions.sql` stores the token hash only. The subscriber row is inserted only inside a successful `confirmVerification` (`core.ts:98-108`). |
| T-066 Tokens | Reused, expired and tampered tokens rejected in tests | **Met, with caveats** | 256-bit, hashed, single-use, 24 h. Tests at `subscriptions.test.ts:55-76,159`. "Never write tokens to logs" is only partly met: tokens are in URL query strings (access logs) and can appear in the `csp-report` log (H-08, H-10). The verify page auto-consumes the token (F-02). |
| T-067 Subscribe endpoint | Cannot be used to find out who is subscribed | **Met** | Uniform response, per-IP, per-email and global limits, same-origin plus JSON CSRF guard, honeypot and timing check, consent literal. |
| T-068 Verification email | Renders in clients and as plain text; link is HTTPS | **Partly met** | Plain text only; no HTML template (`subscriptions/mail.ts`). The link scheme depends on `NEXT_PUBLIC_SITE_URL` (default `http://localhost:3000`) with no HTTPS check (NV-4). |
| T-069 Verify endpoint | Verified request creates exactly one subscriber with consent record | **Met** | Atomic update plus `on conflict (email)` upsert, recording `consented_at`, `source`, `wording_version` and `verified_ip_hash`. Consent can be triggered by scanners (F-02). |
| T-076 One-click unsubscribe | Takes effect with one click and updates the provider | **Partly met** | `/api/unsubscribe/one-click` POST (RFC 8058) and the `/unsubscribe` page work. Gaps: no code emits a `List-Unsubscribe` or `List-Unsubscribe-Post` header (`resend.ts` sends no headers), no newsletter send path exists yet, and there is no sync to the provider (Resend audience). Only local suppression from bounce webhooks. |
| T-161 Headers and CSP final | Headers scan A+; secrets review clean | **Partly met** | HSTS (preload), XFO, nosniff, Referrer-Policy, Permissions-Policy, COOP and CORP are present (confirmed). The CSP has `unsafe-inline` and has drifted (H-01, H-15), so Observatory A+ is unlikely. Secrets review is clean (R-17, R-18). |
| T-162 Dependency audit | No unaddressed high or critical findings | **Not met** | `package.json` pins exact versions, and `npm ci` is used in CI. But `npm audit --omit=dev` shows 3 high and 22 moderate, unaddressed, and `docs/compliance/dependency-audit.md` states zero findings (H-03). |
| T-163 Third-party security scan | Report received; findings fixed or accepted in writing | **Not demonstrably met** | `docs/compliance/third-party-security-scan.md` is a self-authored summary, not a provider report, and some claims are contradicted by the code. It says `/api/revalidate` "enforces timing-safe HMAC" (it does not, F-01), lists `/api/newsletter` (no such route) and lists no `/api/subscribe`, `/api/phishlens-scan` or `/admin`. Obtain the real report artifact. |

---

## 7. What is done well

- Fail-closed configuration everywhere: missing or short secrets give 401, 404 or 503, never open access (admin, crons, webhooks, signed URLs, tokens through `requireSecret`).
- Constant-time comparisons (`safeEqual`) on admin credentials, cron secrets, Svix, unsubscribe and download signatures.
- Body-size-capped streaming reads (`readCapped`) and a JSON plus same-origin CSRF guard on public POSTs.
- Contact outbox design: one transaction, idempotent submission key, provider idempotency key, leased retries, `SKIP LOCKED`, error codes only (no PII) in DB, logs and Sentry.
- Keyed-hash rate-limit keys (no raw IPs or emails stored), IPv6 /64 grouping, and email-alias folding.
- Enumeration-safe subscribe and unsubscribe flows, and an unsubscribe-by-address that only sends a confirmation link.
- Verification tokens: 256-bit, stored hashed, atomically single-use, with tests for reuse, expiry, races and bounces.
- Signed download links bound to slug, verification and expiry, re-checked against the DB (suppression revokes), with a filesystem path that cannot escape its folder.
- Mail safety: fixed subjects, plain-text-only bodies, the visitor's confirmation echoes nothing they typed, control-character rejection, and a separate staging inbox with confirmations off.
- Sentry: `sendDefaultPii: false`, request bodies, cookies, query strings and headers scrubbed, no Session Replay, `ui.input` breadcrumbs dropped, and no tracing.
- Draft content read only with a server-only token, `no-store` and the drafts perspective; the webhook ignores draft ids.
- Strong static headers (HSTS preload, COOP, CORP, XFO DENY, Permissions-Policy), `poweredByHeader: false`, and a separate studio policy.
- No secrets in git history; `.env*` is ignored; only public-by-design `NEXT_PUBLIC_*` values.
- CI uses `pull_request` (not `pull_request_target`) with no secrets, and dependencies are pinned exactly.
