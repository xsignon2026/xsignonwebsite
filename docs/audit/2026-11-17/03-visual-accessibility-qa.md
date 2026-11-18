# XSignOn website: visual and accessibility QA

Run date: 2026-11-17. Branch `Version-2` (clean). Target: `next dev` at http://localhost:3000.

## Environment notes

- Playwright 1.64.1 (`@playwright/test`), bundled Chromium (`ms-playwright/chromium-1248`, headless). Edge and Chrome are also installed but were not needed. `@axe-core/playwright` 4.14 (axe-core 4.14.0), tags `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa`. Best-practice rules (heading-order, region and so on) are **not** in those tags, so heading skips are reported by the custom check below.
- Scripts live in this folder: `audit.cjs` (per-route crawler), `kbd-motion.cjs` / `kbd2.cjs` / `kbd3.cjs` (keyboard and reduced motion), `gen-tables.cjs` (tables), `crop.cjs` (screenshot crops). Raw data: `results/*.json`, `kbd-motion.json`, `kbd2.json`.
- Each route was visited once to warm the dev compiler, then in a fresh context per viewport: 1440x900, 768x1024, 390x844 (isMobile + touch), and 320x640 (isMobile + touch, for reflow). Each page was scrolled down in half-viewport steps (180 ms apart), then back to the top, before checks and the full-page screenshot.
- **Bytes, request counts, LCP and CLS come from dev mode (unminified Turbopack bundles, HMR and dev overlay) and are indicative only.** The roughly 4.9 to 5.7 MB per page is mostly dev JS. LCP for the first route hit is inflated by compilation. Some routes were re-run after a dev-server reload interrupted the first pass (`/`, `/about`, white paper).
- Dev-only artifacts seen on every page, to ignore in production: the Next.js dev badge ("N 1 Insight", bottom left), and three `NEXTJS-PORTAL` tab stops plus one `body` stop before the skip link.
- Full-page screenshots show `position: fixed` widgets (the "Questions" chat FAB and the dev badge) once, at their viewport position. They are not repeated down the page.
- Detection limits: "hidden after scroll" lists the top-most element with opacity 0 or visibility hidden that holds text or media, outside the header and dialogs. Slides intentionally hidden in carousels and stacked panels count too, so each entry needs judging. "Overflow offenders" leave out off-canvas elements that are invisible (closed mobile nav) and the honeypot input at -9999px.

## Executive summary (highest-value issues)

1. **The white-paper page cannot be reached.** `/white-papers/zero-trust-posture-guide` returns 308 to `/resources/zero-trust-posture-guide` (`next.config.ts:135`). `src/app/resources/[slug]/page.tsx:30` then sends that to `/solutions`. The `/whitepaper` redirect (`src/data/redirects.ts:61`) leads into the same chain. `/white-papers` and `/whitepapers` both redirect to `/resources`, which returns **404** ("This page has moved."). The white-paper page and its gated download form never render.
2. **Mobile menu (390): focus is not managed.** After Enter on "Open menu", focus stays on the burger (not moved into the panel). The panel has no `role="dialog"` or `aria-modal`, and nothing traps focus. After 8 Tabs, focus moves into page content hidden behind the scrim. Escape closes the menu but leaves focus on that page content instead of returning it to the burger. Body scroll is locked while open, which makes the escaped focus harder to see.
3. **Desktop mega-menu panels stay open when focus leaves.** Open About with Enter, then Tab through its 5 links: focus moves on to Insights, Products and Contact Us while About stays `aria-expanded="true"` and visible over the hero (`kbd-dropdown-left-open-1440.png`). Escape while focus is inside a panel closes it but drops focus to `<body>`, because the focused link becomes `hidden`. Escape on the trigger itself correctly keeps focus. ArrowDown does nothing; that is acceptable for a disclosure pattern but worth noting.
4. **SEO metadata is inconsistent.** Most titles carry the suffix twice ("Contact Us | XSignOn | XSignOn") because page titles already end in "| XSignOn" and the layout template adds it again. Product, key and compare pages have no og:title or og:image, and their canonical is **`http://localhost:3000/...`** (`metadataBase` or site URL is not applied on that path). `/thinking/*`, `/unsubscribe` and `/subscribe/verify` have no canonical. The home page has no og:image. Robots are mixed in dev: pages built through `lib/seo.ts` emit `index, follow` while the layout default (non-production) is `noindex, nofollow`. Confirm production output.
5. **axe (WCAG A/AA tags): only 1 rule failed site-wide.** `label-content-name-mismatch` (serious) on the `/thinking` pager "Previous/Next posts page" buttons: the visible text is not part of the aria-label. Every other route reports 0 violations at 1440 and 390. Color-contrast results over gradients and images are partly "incomplete" in axe and need a manual check.
6. **Small text:** the `span.std-kind` labels on the "Standards" row (home and /about) are 11px uppercase. Diagram labels in SVG on `/solutions` (`figure.j-art svg text`: "Staff", "Named owner", "Inventory with owners", "Post-quantum" and others) scale with the card. At 320 their glyph box is only 9px tall (13 labels), and at 1440 they still read at roughly 9px (`solutions-1440.png`, `crops/solutions-1440-a.png`).
7. **Tap targets under 24px tall at 390:** breadcrumb links are 19px tall on nearly every interior page. `/thinking` "Read post →" links are 16px tall (`a.link-arrow.text-xs`). `/solutions` "Read more" toggles are 22px. On `/products`, the compare header "View X" and "Remove X" are 21 to 22px. All are borderline; WCAG 2.5.8 may pass via its spacing exception, but they are uncomfortable on touch.
8. **Heading structure:** every page jumps h2 to h4 in the footer (column titles "About", "Products" and so on are `h4`). `/products/keys`, `/proof`, `/thinking/*` and `/thinking/industry` jump h1 to h3 (cards with no h2 section heading). `/styleguide` has 2 h1s; it is dev-only.
9. **Console:** `/unsubscribe` logs a React hydration attribute mismatch on every load. There are no other console errors apart from the expected 404s.
10. **No horizontal overflow** at any width, including 320. html and body use `overflow-x: clip`, but no visible element extends past the viewport either. No images lack an alt attribute, and none are broken.
11. **Reduced motion works on the home page.** All 22 infinite animations stop and the three canvases are static. Product pages only use reveal transitions.


# Detailed results
## Per-route summary

Axe = violations at 1440 / 390 as `crit/serious/moderate/minor` (rule count; node totals in issue list). Overflow lists widths with document scrollWidth > innerWidth. Tiny = elements with own text < 12px (max across widths; SVG <text> under 10px tall in brackets). Small tgt = targets < 24x24 at 390 (inline-in-text links excluded). Hidden = content still opacity:0/visibility:hidden after a full slow scroll (max across widths). Console = console errors + page errors at 1440 (failed/4xx requests in brackets). Bytes/requests/LCP/CLS at 1440 cold context, **dev mode — indicative only**.

| Route | HTTP | Axe 1440 | Axe 390 | Overflow | Tiny | Small tgt (390) | Hidden after scroll | Console | h1 | Title/Desc/OG/Canon | Bytes / req | LCP ms | CLS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| / | 200 | 0/0/0/0 | 0/0/0/0 | n | 4 [1] | 0 | 7 | 0 | 1 | YYNY | 5.7MB / 29 | 460 | 0.015 |
| /about | 200 | 0/0/0/0 | 0/0/0/0 | n | 4 [4] | 0 | 0 | 0 | 1 | YYYY | 4.9MB / 19 | 692 | 0.016 |
| /about/who-we-are | 200 ->/about#who | 0/0/0/0 | 0/0/0/0 | n | 4 [4] | 0 | 0 | 0 | 1 | YYYY | 4.9MB / 22 | 16296 | 0.022 |
| /about/what-we-do | 200 ->/about#what | 0/0/0/0 | 0/0/0/0 | n | 4 [4] | 0 | 0 | 0 | 1 | YYYY | 4.9MB / 20 | 13572 | 0.008 |
| /about/how-we-work | 200 ->/about#ab-how | 0/0/0/0 | 0/0/0/0 | n | 4 [4] | 0 | 0 | 0 | 1 | YYYY | 4.9MB / 20 | 2096 | 0.008 |
| /products | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 7 | 0 | 0 | 1 | YYYY | 5.2MB / 27 | 1896 | 0.000 |
| /products/postureone | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 1512 | 0.000 |
| /products/evalone | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 1276 | 0.000 |
| /products/xsense | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 596 | 0.001 |
| /products/ams | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 516 | 0.000 |
| /products/keys | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 8444 | 0.001 |
| /products/passwordless-keys | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 380 | 0.001 |
| /products/passwordless-keys/bio | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 3 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 560 | 0.001 |
| /products/passwordless-keys/touch | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 3 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 524 | 0.001 |
| /products/passwordless-keys/pro | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 3 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 532 | 0.001 |
| /products/passwordless-keys/desktop | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 3 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 648 | 0.001 |
| /products/compare | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 848 | 0.001 |
| /solutions | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 [13] | 5 | 0 | 0 | 1 | YYNY | 4.9MB / 23 | 1000 | 0.000 |
| /solutions/identity-governance | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 20 | 544 | 0.008 |
| /solutions/ai-and-digital-governance | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 20 | 1204 | 0.000 |
| /solutions/quantum-safe-security | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 20 | 360 | 0.000 |
| /solutions/business-process | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 20 | 460 | 0.000 |
| /solutions/enterprise-technology | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 20 | 664 | 0.000 |
| /proof | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 5.0MB / 22 | 600 | 0.000 |
| /proof/securing-bank-access-fido2 | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 3 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 368 | 0.000 |
| /proof/passwordless-access-global-healthcare | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 3 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 400 | 0.000 |
| /proof/biometric-fido2-air-gapped-industrial | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 3 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 320 | 0.000 |
| /proof/biometric-only-authentication-global-it | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 3 | 0 | 0 | 1 | YYNY | 4.9MB / 19 | 500 | 0.000 |
| /thinking | 200 | 0/1/0/0 | 0/1/0/0 | n | 0 | 4 | 0 | 0 | 1 | YYNN | 5.0MB / 19 | 444 | 0.000 |
| /thinking/industry | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNN | 5.0MB / 19 | 340 | 0.000 |
| /thinking/identity-first-controls | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNN | 5.0MB / 19 | 400 | 0.000 |
| /thinking/data-and-ai-security | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNN | 5.0MB / 19 | 420 | 0.000 |
| /thinking/modern-micro-segmentation | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNN | 5.0MB / 19 | 776 | 0.000 |
| /thinking/non-human-identities | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNN | 5.0MB / 19 | 648 | 0.000 |
| /thinking/agentic-ai-cybersecurity | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNN | 5.0MB / 19 | 5640 | 0.000 |
| /resources | 404 | 0/0/0/0 | 0/0/0/0 | n | 0 | 1 | 0 | 1 [1] | 1 | YYNN | 4.9MB / 18 | 376 | 0.000 |
| /resources/enterprise | 200 ->/enterprise | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYYY | 4.9MB / 20 | 940 | 0.000 |
| /resources/industry-thinking | 200 ->/thinking/industry | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNN | 5.0MB / 20 | 820 | 0.000 |
| /resources/solutions | 200 ->/solutions | 0/0/0/0 | 0/0/0/0 | n | 0 [13] | 5 | 0 | 0 | 1 | YYNY | 4.9MB / 24 | 1168 | 0.000 |
| /resources/thinking | 200 ->/thinking | 0/1/0/0 | 0/1/0/0 | n | 0 | 4 | 0 | 0 | 1 | YYNN | 5.0MB / 20 | 1052 | 0.000 |
| /resources/identity-governance | 200 ->/solutions/identity-governance | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 21 | 512 | 0.008 |
| /resources/identity-first-controls | 200 ->/thinking/identity-first-controls | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNN | 5.0MB / 20 | 464 | 0.000 |
| /compare | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNY | 4.9MB / 20 | 568 | 0.001 |
| /roi-calculator | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYYY | 4.9MB / 19 | 432 | 0.000 |
| /careers | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYYY | 5.0MB / 19 | 352 | 0.000 |
| /enterprise | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYYY | 4.9MB / 19 | 416 | 0.000 |
| /contact | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 1 | 0 | 0 | 1 | YYYY | 5.2MB / 19 | 2784 | 0.000 |
| /contact/thank-you | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 1 | 0 | 0 | 1 | YYYY | 9.5MB / 38 | 368 | 0.000 |
| /privacy | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 1 | 0 | 0 | 1 | YYYY | 5.0MB / 19 | 384 | 0.000 |
| /terms | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 1 | 0 | 0 | 1 | YYYY | 5.0MB / 19 | 268 | 0.000 |
| /unsubscribe | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 1 | 0 | 1 | 1 | YYNN | 5.0MB / 20 | 476 | 0.000 |
| /subscribe/verify | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 2 | 0 | 0 | 1 | YYNN | 4.9MB / 19 | 272 | 0.000 |
| /white-papers/zero-trust-posture-guide | 200 ->/solutions | 0/0/0/0 | 0/0/0/0 | n | 0 [13] | 5 | 0 | 0 | 1 | YYNY | 4.9MB / 25 | 4016 | 0.000 |
| /styleguide | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 0 | 0 | 0 | 2 | YYNN | 4.9MB / 19 | 728 | 0.000 |
| /tokens | 200 | 0/0/0/0 | 0/0/0/0 | n | 0 | 0 | 0 | 0 | 1 | YYNN | 4.9MB / 18 | 408 | 0.000 |
| /__404-qa-check-not-a-page | 404 | 0/0/0/0 | 0/0/0/0 | n | 0 | 1 | 0 | 1 [1] | 1 | YYNN | 4.9MB / 18 | 376 | 0.000 |

## Axe violations (aggregated across routes, 1440 and 390)

### label-content-name-mismatch (serious) — Elements must have their visible text as part of their accessible name
4 nodes across 4 route/viewport runs: /thinking@1440, /thinking@390, /resources/thinking@1440, /resources/thinking@390

- `button[aria-label="Previous posts page"]` (/thinking @1440) — Text inside the element is not included in the accessible name
  - `<button type="button" disabled="" aria-label="Previous posts page" class="px-3 py-1.5 rounded-lg border border-[#3b347a] bg-[#160e4a] text-s`


## Horizontal overflow

None.

## Text smaller than 12px (samples)

- **/ @1440**: `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "PASSWORDLESS SIGN-IN"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "AI RISK MANAGEMENT"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ZERO TRUST ARCHITECTURE"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "POST-QUANTUM CRYPTOGRAPHY"
- **/ @390**: `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "PASSWORDLESS SIGN-IN"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "AI RISK MANAGEMENT"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ZERO TRUST ARCHITECTURE"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "POST-QUANTUM CRYPTOGRAPHY"
- **/about @1440**: `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "BASELINE REPORT"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ARCHITECTURE PLAN"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "WORKING CONTROLS"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ONGOING EVIDENCE"
- **/about @390**: `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "BASELINE REPORT"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ARCHITECTURE PLAN"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "WORKING CONTROLS"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ONGOING EVIDENCE"
- **/about/who-we-are @1440**: `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "BASELINE REPORT"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ARCHITECTURE PLAN"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "WORKING CONTROLS"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ONGOING EVIDENCE"
- **/about/who-we-are @390**: `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "BASELINE REPORT"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ARCHITECTURE PLAN"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "WORKING CONTROLS"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ONGOING EVIDENCE"
- **/about/what-we-do @1440**: `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "BASELINE REPORT"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ARCHITECTURE PLAN"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "WORKING CONTROLS"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ONGOING EVIDENCE"
- **/about/what-we-do @390**: `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "BASELINE REPORT"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ARCHITECTURE PLAN"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "WORKING CONTROLS"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ONGOING EVIDENCE"
- **/about/how-we-work @1440**: `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "BASELINE REPORT"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ARCHITECTURE PLAN"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "WORKING CONTROLS"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ONGOING EVIDENCE"
- **/about/how-we-work @390**: `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "BASELINE REPORT"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ARCHITECTURE PLAN"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "WORKING CONTROLS"; `ul.std-row > li.std-item > div.std-cap > span.std-kind` 11px "ONGOING EVIDENCE"

## SVG text rendering under 10px tall (samples)

- **/about @320**: `li.std-item > svg > g > text` 9.9px "01"; `li.std-item > svg > g > text` 9.9px "02"; `li.std-item > svg > g > text` 9.9px "03"; `li.std-item > svg > g > text` 9.9px "04"
- **/about/who-we-are @320**: `li.std-item > svg > g > text` 9.9px "01"; `li.std-item > svg > g > text` 9.9px "02"; `li.std-item > svg > g > text` 9.9px "03"; `li.std-item > svg > g > text` 9.9px "04"
- **/about/what-we-do @320**: `li.std-item > svg > g > text` 9.9px "01"; `li.std-item > svg > g > text` 9.9px "02"; `li.std-item > svg > g > text` 9.9px "03"; `li.std-item > svg > g > text` 9.9px "04"
- **/about/how-we-work @320**: `li.std-item > svg > g > text` 9.9px "01"; `li.std-item > svg > g > text` 9.9px "02"; `li.std-item > svg > g > text` 9.9px "03"; `li.std-item > svg > g > text` 9.9px "04"
- **/solutions @320**: `div.sol-art > figure.j-art > svg > text` 9px "Staff"; `div.sol-art > figure.j-art > svg > text` 9px "Devices"; `div.sol-art > figure.j-art > svg > text` 9px "AI agents"; `figure.j-art > svg > g > text` 9px "Named owner"; `div.sol-art > figure.j-art > svg > text` 9px "Inventory"
- **/resources/solutions @320**: `div.sol-art > figure.j-art > svg > text` 9px "Staff"; `div.sol-art > figure.j-art > svg > text` 9px "Devices"; `div.sol-art > figure.j-art > svg > text` 9px "AI agents"; `figure.j-art > svg > g > text` 9px "Named owner"; `div.sol-art > figure.j-art > svg > text` 9px "Inventory"
- **/white-papers/zero-trust-posture-guide @320**: `div.sol-art > figure.j-art > svg > text` 9px "Staff"; `div.sol-art > figure.j-art > svg > text` 9px "Devices"; `div.sol-art > figure.j-art > svg > text` 9px "AI agents"; `figure.j-art > svg > g > text` 9px "Named owner"; `div.sol-art > figure.j-art > svg > text` 9px "Inventory"

## Tap targets under 24x24 at 390 (samples)

- **/products @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `thead > tr > th.cmp-prod > a.ov-view` 120x22 "View PostureOne"; `thead > tr > th.cmp-prod > button.ov-remove` 130x21 "Remove PostureOne"; `thead > tr > th.cmp-prod > a.ov-view` 91x22 "View XSense"; `thead > tr > th.cmp-prod > button.ov-remove` 104x21 "Remove XSense"; `thead > tr > th.cmp-prod > a.ov-view` 126x22 "View AUTH Touch"; `thead > tr > th.cmp-prod > button.ov-remove` 136x21 "Remove AUTH Touch"
- **/products/postureone @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"
- **/products/evalone @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"
- **/products/xsense @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"
- **/products/ams @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"
- **/products/keys @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"
- **/products/passwordless-keys @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"
- **/products/passwordless-keys/bio @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"; `section.page-hero > div.wrap > nav.crumbs > a` 113x19 "Passwordless Keys"
- **/products/passwordless-keys/touch @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"; `section.page-hero > div.wrap > nav.crumbs > a` 113x19 "Passwordless Keys"
- **/products/passwordless-keys/pro @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"; `section.page-hero > div.wrap > nav.crumbs > a` 113x19 "Passwordless Keys"
- **/products/passwordless-keys/desktop @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"; `section.page-hero > div.wrap > nav.crumbs > a` 113x19 "Passwordless Keys"
- **/products/compare @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"
- **/solutions @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `div.t-list > article.tcard.rv > div.tc-body > button.t-toggle` 92x22 "Read more"; `div.t-list > article.tcard.rv > div.tc-body > button.t-toggle` 92x22 "Read more"; `div.t-list > article.tcard.rv > div.tc-body > button.t-toggle` 92x22 "Read more"; `div.t-list > article.tcard.rv > div.tc-body > button.t-toggle` 92x22 "Read more"
- **/solutions/identity-governance @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 55x19 "Solutions"
- **/solutions/ai-and-digital-governance @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 55x19 "Solutions"
- **/solutions/quantum-safe-security @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 55x19 "Solutions"
- **/solutions/business-process @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 55x19 "Solutions"
- **/solutions/enterprise-technology @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 55x19 "Solutions"
- **/proof @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"
- **/proof/securing-bank-access-fido2 @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"; `section.page-hero > div.wrap > nav.crumbs > a` 32x19 "Proof"
- **/proof/passwordless-access-global-healthcare @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"; `section.page-hero > div.wrap > nav.crumbs > a` 32x19 "Proof"
- **/proof/biometric-fido2-air-gapped-industrial @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"; `section.page-hero > div.wrap > nav.crumbs > a` 32x19 "Proof"
- **/proof/biometric-only-authentication-global-it @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"; `section.page-hero > div.wrap > nav.crumbs > a` 32x19 "Proof"
- **/thinking @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `div.grid.grid-cols-1 > article.flex.flex-col > div.pt-5.mt-5 > a.link-arrow.text-xs` 75x16 "Read post →"; `div.grid.grid-cols-1 > article.flex.flex-col > div.pt-5.mt-5 > a.link-arrow.text-xs` 75x16 "Read post →"; `div.grid.grid-cols-1 > article.flex.flex-col > div.pt-5.mt-5 > a.link-arrow.text-xs` 75x16 "Read post →"
- **/thinking/industry @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 72x19 "Our thinking"
- **/thinking/identity-first-controls @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 72x19 "Our thinking"
- **/thinking/data-and-ai-security @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 72x19 "Our thinking"
- **/thinking/modern-micro-segmentation @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 72x19 "Our thinking"
- **/thinking/non-human-identities @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 72x19 "Our thinking"
- **/thinking/agentic-ai-cybersecurity @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 72x19 "Our thinking"
- **/resources @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"
- **/resources/enterprise @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 55x19 "Solutions"
- **/resources/industry-thinking @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 72x19 "Our thinking"
- **/resources/solutions @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `div.t-list > article.tcard.rv > div.tc-body > button.t-toggle` 92x22 "Read more"; `div.t-list > article.tcard.rv > div.tc-body > button.t-toggle` 92x22 "Read more"; `div.t-list > article.tcard.rv > div.tc-body > button.t-toggle` 92x22 "Read more"; `div.t-list > article.tcard.rv > div.tc-body > button.t-toggle` 92x22 "Read more"
- **/resources/thinking @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `div.grid.grid-cols-1 > article.flex.flex-col > div.pt-5.mt-5 > a.link-arrow.text-xs` 75x16 "Read post →"; `div.grid.grid-cols-1 > article.flex.flex-col > div.pt-5.mt-5 > a.link-arrow.text-xs` 75x16 "Read post →"; `div.grid.grid-cols-1 > article.flex.flex-col > div.pt-5.mt-5 > a.link-arrow.text-xs` 75x16 "Read post →"
- **/resources/identity-governance @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 55x19 "Solutions"
- **/resources/identity-first-controls @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 72x19 "Our thinking"
- **/compare @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"
- **/roi-calculator @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 53x19 "Products"
- **/careers @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "About"
- **/enterprise @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 55x19 "Solutions"
- **/contact @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"
- **/contact/thank-you @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"
- **/privacy @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"
- **/terms @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"
- **/unsubscribe @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"
- **/subscribe/verify @390**: `nav.py-3.text-[13.5px] > ol.flex.flex-wrap > li.flex.items-center > a.transition-colors.text-on-dark-sub` 38x21 "Home"; `div.mx-auto.w-full > div.rounded-2xl.border > div.mt-8.pt-6 > a.font-medium.text-txt` 102x20 "Return to home"
- **/white-papers/zero-trust-posture-guide @390**: `section.page-hero.has-beams > div.wrap > nav.crumbs > a` 35x19 "Home"; `div.t-list > article.tcard.rv > div.tc-body > button.t-toggle` 92x22 "Read more"; `div.t-list > article.tcard.rv > div.tc-body > button.t-toggle` 92x22 "Read more"; `div.t-list > article.tcard.rv > div.tc-body > button.t-toggle` 92x22 "Read more"; `div.t-list > article.tcard.rv > div.tc-body > button.t-toggle` 92x22 "Read more"
- **/__404-qa-check-not-a-page @390**: `section.page-hero > div.wrap > nav.crumbs > a` 35x19 "Home"

## Hidden after full scroll (reveal failures / invisible content)

- **/ @1440**: `div#cfTrack > article.cf-card.side-l > div.cf-photo > div.pcard-icon` opacity:0 y=1101 h=50 ""; `div#cfTrack > article.cf-card.side-r > div.cf-photo > div.pcard-icon` opacity:0 y=1121 h=45 ""; `div#cfTrack > article.cf-card.side-r > div.cf-photo > div.pcard-icon` opacity:0 y=1146 h=40 ""; `div#cfTrack > article.cf-card.side-l > div.cf-photo > div.pcard-icon` opacity:0 y=1121 h=47 ""; `div#journey > div.j-stage > div.j-panels > article.j-panel` opacity:0 y=2676 h=370 "AI and Digital GovernanceTeams want AI evidence re"; `div#journey > div.j-stage > div.j-panels > article.j-panel` opacity:0 y=2676 h=370 "Passwordless SecurityPhishing-resistant sign-in wi"; `div#journey > div.j-stage > div.j-panels > article.j-panel` opacity:0 y=2676 h=370 "Quantum-Safe SecurityTeams are preparing early for"
- **/ @768**: `div#cfTrack > article.cf-card > div.cf-photo > div.pcard-icon` opacity:0 y=1441 h=49 ""; `div#cfTrack > article.cf-card > div.cf-photo > div.pcard-icon` opacity:0 y=1465 h=43 ""; `div#cfTrack > article.cf-card > div.cf-photo > div.pcard-icon` opacity:0 y=1495 h=37 ""; `div#cfTrack > article.cf-card > div.cf-photo > div.pcard-icon` opacity:0 y=1467 h=44 ""
- **/ @390**: `div#cfTrack > article.cf-card > div.cf-photo > div.pcard-icon` opacity:0 y=1338 h=48 ""; `div#cfTrack > article.cf-card > div.cf-photo > div.pcard-icon` opacity:0 y=1353 h=43 ""; `div#cfTrack > article.cf-card > div.cf-photo > div.pcard-icon` opacity:0 y=1381 h=37 ""; `div#cfTrack > article.cf-card > div.cf-photo > div.pcard-icon` opacity:0 y=1363 h=42 ""
- **/ @320**: `div#cfTrack > article.cf-card > div.cf-photo > div.pcard-icon` opacity:0 y=1383 h=47 ""; `div#cfTrack > article.cf-card > div.cf-photo > div.pcard-icon` opacity:0 y=1394 h=44 ""; `div#cfTrack > article.cf-card > div.cf-photo > div.pcard-icon` opacity:0 y=1422 h=38 ""; `div#cfTrack > article.cf-card > div.cf-photo > div.pcard-icon` opacity:0 y=1408 h=42 ""

## Images without alt attribute

None found.

## Broken images (naturalWidth 0)

None found.

## Console errors (1440)

- **/resources @1440**: `Failed to load resource: the server responded with a status of 404 (Not Found)`
- **/unsubscribe @1440**: `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:  - A server/client branch 'if (typeof windo`
- **/__404-qa-check-not-a-page @1440**: `Failed to load resource: the server responded with a status of 404 (Not Found)`

## Failed requests

None found.

## HTTP >= 400 responses

- **/resources @1440**: `404 http://localhost:3000/resources`
- **/__404-qa-check-not-a-page @1440**: `404 http://localhost:3000/__404-qa-check-not-a-page`

## Heading level skips (1440)

- **/ @1440**: h2->h4 ("Identity Governance"); h2->h4 ("Elevate Enterprise Security wi"); h2->h4 ("About")
- **/about @1440**: h2->h4 ("About")
- **/about/who-we-are @1440**: h2->h4 ("About")
- **/about/what-we-do @1440**: h2->h4 ("About")
- **/about/how-we-work @1440**: h2->h4 ("About")
- **/products @1440**: h2->h4 ("About")
- **/products/postureone @1440**: h2->h4 ("See everything"); h2->h4 ("About")
- **/products/evalone @1440**: h2->h4 ("Inventory AI use"); h2->h4 ("About")
- **/products/xsense @1440**: h2->h4 ("About")
- **/products/ams @1440**: h2->h4 ("Plan the rollout"); h2->h4 ("About")
- **/products/keys @1440**: h1->h3 ("AUTH Bio"); h2->h4 ("About")
- **/products/passwordless-keys @1440**: h1->h3 ("AUTH Bio"); h2->h4 ("About")
- **/products/passwordless-keys/bio @1440**: h2->h4 ("About")
- **/products/passwordless-keys/touch @1440**: h2->h4 ("About")
- **/products/passwordless-keys/pro @1440**: h2->h4 ("About")
- **/products/passwordless-keys/desktop @1440**: h2->h4 ("About")
- **/products/compare @1440**: h2->h4 ("About")
- **/solutions @1440**: h2->h4 ("About")
- **/solutions/identity-governance @1440**: h2->h4 ("About")
- **/solutions/ai-and-digital-governance @1440**: h2->h4 ("About")
- **/solutions/quantum-safe-security @1440**: h2->h4 ("About")
- **/solutions/business-process @1440**: h2->h4 ("About")
- **/solutions/enterprise-technology @1440**: h2->h4 ("About")
- **/proof @1440**: h1->h3 ("Securing Bank Access With FIDO"); h2->h4 ("About")
- **/proof/securing-bank-access-fido2 @1440**: h2->h4 ("Pilot"); h2->h4 ("About")
- **/proof/passwordless-access-global-healthcare @1440**: h2->h4 ("About")
- **/proof/biometric-fido2-air-gapped-industrial @1440**: h2->h4 ("About")
- **/proof/biometric-only-authentication-global-it @1440**: h2->h4 ("About")
- **/thinking @1440**: h1->h3 ("Elevate Enterprise Security wi"); h2->h4 ("About")
- **/thinking/industry @1440**: h1->h3 ("Why AI Governance Is Becoming "); h2->h4 ("About")
- **/thinking/identity-first-controls @1440**: h1->h3 ("The login screen is the smalle"); h2->h4 ("About")
- **/thinking/data-and-ai-security @1440**: h1->h3 ("The questions arrive before th"); h2->h4 ("About")
- **/thinking/modern-micro-segmentation @1440**: h1->h3 ("Segments shaped around identit"); h2->h4 ("About")
- **/thinking/non-human-identities @1440**: h1->h3 ("The identities doing the work "); h2->h4 ("About")
- **/thinking/agentic-ai-cybersecurity @1440**: h1->h3 ("Agents that work in teams"); h2->h4 ("About")
- **/resources @1440**: h1->h4 ("About")
- **/resources/enterprise @1440**: h2->h4 ("SaaS"); h2->h4 ("About")
- **/resources/industry-thinking @1440**: h1->h3 ("Why AI Governance Is Becoming "); h2->h4 ("About")
- **/resources/solutions @1440**: h2->h4 ("About")
- **/resources/thinking @1440**: h1->h3 ("Elevate Enterprise Security wi"); h2->h4 ("About")
- **/resources/identity-governance @1440**: h2->h4 ("About")
- **/resources/identity-first-controls @1440**: h1->h3 ("The login screen is the smalle"); h2->h4 ("About")
- **/compare @1440**: h2->h4 ("About")
- **/roi-calculator @1440**: h2->h4 ("About")
- **/careers @1440**: h2->h4 ("Evidence over assertion"); h2->h4 ("About")
- **/enterprise @1440**: h2->h4 ("SaaS"); h2->h4 ("About")
- **/contact @1440**: h2->h4 ("About")
- **/contact/thank-you @1440**: h2->h4 ("About")
- **/privacy @1440**: h1->h3 ("Information we collect"); h2->h4 ("About")
- **/terms @1440**: h1->h3 ("Use of the site"); h2->h4 ("About")
- **/unsubscribe @1440**: h1->h4 ("About")
- **/subscribe/verify @1440**: h2->h4 ("About")
- **/white-papers/zero-trust-posture-guide @1440**: h2->h4 ("About")
- **/tokens @1440**: h2->h4 ("About")
- **/__404-qa-check-not-a-page @1440**: h1->h4 ("About")

## Metadata

| Route | Title | Desc len | og:title | og:image | canonical | robots |
|---|---|---|---|---|---|---|
| / | XSignOn · Identity and access built on trust | 200 | Y | N |  | noindex, nofollow |
| /about | About XSignOn \| Security Built Around Identity and Governance \| XSignOn | 173 | Y | Y | /about | index, follow |
| /about/who-we-are | About XSignOn \| Security Built Around Identity and Governance \| XSignOn | 173 | Y | Y | /about | index, follow |
| /about/what-we-do | About XSignOn \| Security Built Around Identity and Governance \| XSignOn | 173 | Y | Y | /about | index, follow |
| /about/how-we-work | About XSignOn \| Security Built Around Identity and Governance \| XSignOn | 173 | Y | Y | /about | index, follow |
| /products | Our Products \| XSignOn \| XSignOn | 95 | Y | Y | /products | index, follow |
| /products/postureone | PostureOne \| Website and Cloud Security Posture \| XSignOn \| XSignOn | 101 | N | N | http://localhost:3000/products/postureone | - |
| /products/evalone | EvalOne \| AI Governance & Framework Evaluation \| XSignOn \| XSignOn | 113 | N | N | http://localhost:3000/products/evalone | - |
| /products/xsense | XSense \| Identity Analytics & Governed MFA Platform \| XSignOn \| XSignOn | 149 | N | N | http://localhost:3000/products/xsense | - |
| /products/ams | AMS \| Asset Management System for Passwordless Keys \| XSignOn \| XSignOn | 109 | N | N | http://localhost:3000/products/ams | - |
| /products/keys | Passwordless Keys \| FIDO2 Biometric Security Keys \| XSignOn \| XSignOn | 135 | N | N | http://localhost:3000/products/passwordless-keys | - |
| /products/passwordless-keys | Passwordless Keys \| FIDO2 Biometric Security Keys \| XSignOn \| XSignOn | 135 | N | N | http://localhost:3000/products/passwordless-keys | - |
| /products/passwordless-keys/bio | AUTH Bio \| Passwordless Keys \| XSignOn \| XSignOn | 51 | N | N | http://localhost:3000/products/passwordless-keys/bio | noindex, nofollow |
| /products/passwordless-keys/touch | AUTH Bio Touch \| Passwordless Keys \| XSignOn \| XSignOn | 57 | N | N | http://localhost:3000/products/passwordless-keys/touch | noindex, nofollow |
| /products/passwordless-keys/pro | AUTH Bio Pro \| Passwordless Keys \| XSignOn \| XSignOn | 66 | N | N | http://localhost:3000/products/passwordless-keys/pro | noindex, nofollow |
| /products/passwordless-keys/desktop | AUTH Bio Desktop \| Passwordless Keys \| XSignOn \| XSignOn | 66 | N | N | http://localhost:3000/products/passwordless-keys/desktop | noindex, nofollow |
| /products/compare | How XSignOn Compares \| Zero-Trust Sign-In Comparison \| XSignOn | 130 | N | N | http://localhost:3000/products/compare | noindex, nofollow |
| /solutions | Solutions · XSignOn \| XSignOn | 123 | Y | N | /solutions | noindex, nofollow |
| /solutions/identity-governance | Identity Governance · Solution · XSignOn \| XSignOn | 125 | Y | N | /solutions/identity-governance | noindex, nofollow |
| /solutions/ai-and-digital-governance | AI and Digital Governance · Solution · XSignOn \| XSignOn | 95 | Y | N | /solutions/ai-and-digital-governance | noindex, nofollow |
| /solutions/quantum-safe-security | Quantum-Safe Security · Solution · XSignOn \| XSignOn | 125 | Y | N | /solutions/quantum-safe-security | noindex, nofollow |
| /solutions/business-process | Business Process · Solution · XSignOn \| XSignOn | 111 | Y | N | /solutions/business-process | noindex, nofollow |
| /solutions/enterprise-technology | Enterprise Technology · Solution · XSignOn \| XSignOn | 125 | Y | N | /solutions/enterprise-technology | noindex, nofollow |
| /proof | Proof & Case Studies · XSignOn \| XSignOn | 138 | Y | N | /proof | noindex, nofollow |
| /proof/securing-bank-access-fido2 | Securing Bank Access With FIDO2 Biometric Keys · Case Study · XSignOn \| XSignOn | 150 | Y | N | /proof/securing-bank-access-fido2 | noindex, nofollow |
| /proof/passwordless-access-global-healthcare | Passwordless Access For A Global Healthcare Enterprise · Case Study · XSignOn \| XSignOn | 149 | Y | N | /proof/passwordless-access-global-healthcare | noindex, nofollow |
| /proof/biometric-fido2-air-gapped-industrial | Biometric FIDO2 Access For Air-Gapped Industrial Systems · Case Study · XSignOn \| XSignOn | 126 | Y | N | /proof/biometric-fido2-air-gapped-industrial | noindex, nofollow |
| /proof/biometric-only-authentication-global-it | Biometric-Only Authentication For A Global IT Enterprise · Case Study · XSignOn \| XSignOn | 111 | Y | N | /proof/biometric-only-authentication-global-it | noindex, nofollow |
| /thinking | Our thinking \| XSignOn \| XSignOn | 107 | N | N | MISSING | noindex, nofollow |
| /thinking/industry | Industry Thinking \| XSignOn \| XSignOn | 94 | N | N | MISSING | noindex, nofollow |
| /thinking/identity-first-controls | Elevate Enterprise Security with Identity-First Controls \| XSignOn Thinking \| XSignOn | 152 | Y | N | MISSING | noindex, nofollow |
| /thinking/data-and-ai-security | Data + AI Security Built for Visibility, Control, and Trust \| XSignOn Thinking \| XSignOn | 85 | Y | N | MISSING | noindex, nofollow |
| /thinking/modern-micro-segmentation | Modern Micro-Segmentation for Zero Trust Security \| XSignOn Thinking \| XSignOn | 108 | Y | N | MISSING | noindex, nofollow |
| /thinking/non-human-identities | Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model \| XSignOn Thinking \| XSignOn | 113 | Y | N | MISSING | noindex, nofollow |
| /thinking/agentic-ai-cybersecurity | Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework \| XSignOn Thinking \| XSignOn | 111 | Y | N | MISSING | noindex, nofollow |
| /resources | Page Not Found (404) \| XSignOn \| XSignOn | 57 | N | N | MISSING | noindex |
| /resources/enterprise | Enterprise Identity Command \| XSignOn \| XSignOn | 134 | Y | Y | /enterprise | index, follow |
| /resources/industry-thinking | Industry Thinking \| XSignOn \| XSignOn | 94 | N | N | MISSING | noindex, nofollow |
| /resources/solutions | Solutions · XSignOn \| XSignOn | 123 | Y | N | /solutions | noindex, nofollow |
| /resources/thinking | Our thinking \| XSignOn \| XSignOn | 107 | N | N | MISSING | noindex, nofollow |
| /resources/identity-governance | Identity Governance · Solution · XSignOn \| XSignOn | 125 | Y | N | /solutions/identity-governance | noindex, nofollow |
| /resources/identity-first-controls | Elevate Enterprise Security with Identity-First Controls \| XSignOn Thinking \| XSignOn | 152 | Y | N | MISSING | noindex, nofollow |
| /compare | How XSignOn Compares \| Zero-Trust Sign-In Comparison \| XSignOn | 130 | N | N | http://localhost:3000/products/compare | noindex, nofollow |
| /roi-calculator | ROI Calculator \| XSignOn \| XSignOn | 126 | Y | Y | /roi-calculator | index, follow |
| /careers | Careers at XSignOn \| Build Sign-in People Trust \| XSignOn | 126 | Y | Y | /careers | index, follow |
| /enterprise | Enterprise Identity Command \| XSignOn \| XSignOn | 134 | Y | Y | /enterprise | index, follow |
| /contact | Contact Us \| XSignOn \| XSignOn | 112 | Y | Y | /contact | index, follow |
| /contact/thank-you | Contact Us \| XSignOn \| XSignOn | 112 | Y | Y | /contact | index, follow |
| /privacy | Privacy Policy \| XSignOn \| XSignOn | 100 | Y | Y | /privacy | index, follow |
| /terms | Terms of Service \| XSignOn \| XSignOn | 109 | Y | Y | /terms | index, follow |
| /unsubscribe | Unsubscribe \| XSignOn \| XSignOn | 78 | N | N | MISSING | noindex, nofollow |
| /subscribe/verify | Verify Request \| XSignOn \| XSignOn | 79 | N | N | MISSING | noindex, nofollow |
| /white-papers/zero-trust-posture-guide | Solutions · XSignOn \| XSignOn | 123 | Y | N | /solutions | noindex, nofollow |
| /styleguide | Style guide \| XSignOn | 7 | N | N | MISSING | noindex, nofollow |
| /tokens | Tokens \| XSignOn | 7 | N | N | MISSING | noindex, nofollow |
| /__404-qa-check-not-a-page | Page Not Found (404) \| XSignOn \| XSignOn | 57 | N | N | MISSING | noindex |

## Heading outlines (1440)

<details><summary>/ — 27 headings, 1 h1</summary>

- h1 Protect identity. Govern risk. Prepare for what's next.
  - h2 Our products
    - h3 PostureOne
    - h3 Passwordless Keys
    - h3 EvalOne
    - h3 XSense
    - h3 AMS
    - h3 XDMACsec
    - h3 XDMACsec
  - h2 XSignOn Security Ecosystem
  - h2 What XSignOn does
      - h4 Identity Governance
      - h4 AI and Digital Governance (not visible)
      - h4 Passwordless Security (not visible)
      - h4 Quantum-Safe Security (not visible)
  - h2 Standards and frameworks
  - h2 Our thinking
      - h4 Elevate Enterprise Security with Identity-First Controls
      - h4 Data + AI Security Built for Visibility, Control, and Trust (not visible)
      - h4 Modern Micro-Segmentation for Zero Trust Security (not visible)
      - h4 Building Smarter Cybersecurity with Agentic AI and the AutoGen Framewo (not visible)
      - h4 Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynami (not visible)
  - h2 Let's talk about your organization's security priorities.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/about — 15 headings, 1 h1</summary>

- h1 Security built around identity, governance, and what comes next.
  - h2 Who we are
  - h2 What we do
    - h3 Identity governance
    - h3 AI and digital governance
    - h3 Passwordless authentication
    - h3 Quantum-safe security
  - h2 How we work
  - h2 Why XSignOn
  - h2 Build security for what comes next
  - h2 Let's talk about your organization's security priorities.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/about/who-we-are — 15 headings, 1 h1</summary>

- h1 Security built around identity, governance, and what comes next.
  - h2 Who we are
  - h2 What we do
    - h3 Identity governance
    - h3 AI and digital governance
    - h3 Passwordless authentication
    - h3 Quantum-safe security
  - h2 How we work
  - h2 Why XSignOn
  - h2 Build security for what comes next
  - h2 Let's talk about your organization's security priorities.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/about/what-we-do — 15 headings, 1 h1</summary>

- h1 Security built around identity, governance, and what comes next.
  - h2 Who we are
  - h2 What we do
    - h3 Identity governance
    - h3 AI and digital governance
    - h3 Passwordless authentication
    - h3 Quantum-safe security
  - h2 How we work
  - h2 Why XSignOn
  - h2 Build security for what comes next
  - h2 Let's talk about your organization's security priorities.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/about/how-we-work — 15 headings, 1 h1</summary>

- h1 Security built around identity, governance, and what comes next.
  - h2 Who we are
  - h2 What we do
    - h3 Identity governance
    - h3 AI and digital governance
    - h3 Passwordless authentication
    - h3 Quantum-safe security
  - h2 How we work
  - h2 Why XSignOn
  - h2 Build security for what comes next
  - h2 Let's talk about your organization's security priorities.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/products — 13 headings, 1 h1</summary>

- h1 Our products
  - h2 Overview of products
    - h3 PostureOne
    - h3 Passwordless Keys (not visible)
    - h3 EvalOne (not visible)
    - h3 XSense (not visible)
    - h3 AMS (not visible)
  - h2 Our thinking
  - h2 Talk to us about sign-in your team will love.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/products/postureone — 22 headings, 1 h1</summary>

- h1 PostureOne
  - h2 What PostureOne covers
    - h3 Web application firewall
    - h3 Always-on traffic protection
    - h3 File integrity monitoring
    - h3 Content security policy management
    - h3 Data security posture management
    - h3 Micro-segmentation
  - h2 The PostureOne framework
      - h4 See everything
      - h4 Close every gap
      - h4 Stay audit-ready
      - h4 Govern AI with confidence
      - h4 Keep exposure low
      - h4 Move with confidence
  - h2 Frameworks it maps to
  - h2 Related
  - h2 See your posture in one view.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/products/evalone — 18 headings, 1 h1</summary>

- h1 EvalOne
  - h2 What EvalOne covers
    - h3 AI use inventory
    - h3 Framework control mapping
    - h3 Gap register
    - h3 Reviewer-ready evidence
  - h2 How it works
      - h4 Inventory AI use
      - h4 Map the controls
      - h4 Close the gaps
      - h4 Export the evidence
  - h2 Frameworks it evaluates against
  - h2 Related
  - h2 Know what your AI is governed against.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/products/xsense — 8 headings, 1 h1</summary>

- h1 XSense
  - h2 Documentation
  - h2 Related
  - h2 See your sign-in clearly.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/products/ams — 18 headings, 1 h1</summary>

- h1 AMS
  - h2 What AMS covers
    - h3 Delivery and support
    - h3 Enrollment workflows
    - h3 Lifecycle and exceptions
    - h3 Reporting for review
  - h2 How it works
      - h4 Plan the rollout
      - h4 Enroll staff
      - h4 Manage the fleet
      - h4 Prove coverage
  - h2 Documentation
  - h2 Related
  - h2 Run key management without the tickets.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/products/keys — 13 headings, 1 h1</summary>

- h1 Passwordless Keys
    - h3 AUTH Bio
    - h3 AUTH Bio Pro
    - h3 AUTH Bio Touch
    - h3 AUTH Bio Desktop
  - h2 Hardware comparison
  - h2 Works with what you have
  - h2 Related
  - h2 Get keys that arrive ready to enroll.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/products/passwordless-keys — 13 headings, 1 h1</summary>

- h1 Passwordless Keys
    - h3 AUTH Bio
    - h3 AUTH Bio Pro
    - h3 AUTH Bio Touch
    - h3 AUTH Bio Desktop
  - h2 Hardware comparison
  - h2 Works with what you have
  - h2 Related
  - h2 Get keys that arrive ready to enroll.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/products/passwordless-keys/bio — 9 headings, 1 h1</summary>

- h1 AUTH Bio
  - h2 Documentation
  - h2 Specifications
  - h2 Related
  - h2 Get keys that arrive ready to enroll.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/products/passwordless-keys/touch — 9 headings, 1 h1</summary>

- h1 AUTH Bio Touch
  - h2 Documentation
  - h2 Specifications
  - h2 Related
  - h2 Get keys that arrive ready to enroll.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/products/passwordless-keys/pro — 9 headings, 1 h1</summary>

- h1 AUTH Bio Pro
  - h2 Documentation
  - h2 Specifications
  - h2 Related
  - h2 Get keys that arrive ready to enroll.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/products/passwordless-keys/desktop — 9 headings, 1 h1</summary>

- h1 AUTH Bio Desktop
  - h2 Documentation
  - h2 Specifications
  - h2 Related
  - h2 Get keys that arrive ready to enroll.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/products/compare — 7 headings, 1 h1</summary>

- h1 How XSignOn compares
  - h2 Related
  - h2 Compare it against your current sign-in.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/solutions — 20 headings, 1 h1</summary>

- h1 Solutions
  - h2 Solutions
    - h3 Identity Governance
    - h3 AI and Digital Governance
    - h3 Quantum-Safe Security
    - h3 Business Process
    - h3 Enterprise Technology
  - h2 Enterprise and insights
    - h3 Enterprise
    - h3 Our thinking
    - h3 Tiers, not toggles: a richer language for agent authority
    - h3 Micro-segmentation for agents: small scopes, clear ownership
    - h3 Sign-in people love: lessons from four AUTH models
    - h3 Evaluating agents the way great teams review code
    - h3 Confidence you can show: provenance as a product feature
  - h2 Which solution fits your goals?
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/solutions/identity-governance — 10 headings, 1 h1</summary>

- h1 Identity Governance
  - h2 What teams come to XSignOn to achieve
  - h2 How XSignOn supports it
  - h2 Products that deliver it
  - h2 Proof and reading
  - h2 Answer "who can reach what" in one view.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/solutions/ai-and-digital-governance — 10 headings, 1 h1</summary>

- h1 AI and Digital Governance
  - h2 What teams come to XSignOn to achieve
  - h2 How XSignOn supports it
  - h2 Products that deliver it
  - h2 Proof and reading
  - h2 Keep AI evidence ready, with confidence.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/solutions/quantum-safe-security — 10 headings, 1 h1</summary>

- h1 Quantum-Safe Security
  - h2 What teams come to XSignOn to achieve
  - h2 How XSignOn supports it
  - h2 Products that deliver it
  - h2 Proof and reading
  - h2 Start with the inventory, with confidence.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/solutions/business-process — 10 headings, 1 h1</summary>

- h1 Business Process
  - h2 What teams come to XSignOn to achieve
  - h2 How XSignOn supports it
  - h2 Products that deliver it
  - h2 Proof and reading
  - h2 Turn reviews into a clear, confident process.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/solutions/enterprise-technology — 10 headings, 1 h1</summary>

- h1 Enterprise Technology
  - h2 What teams come to XSignOn to achieve
  - h2 How XSignOn supports it
  - h2 Products that deliver it
  - h2 Proof and reading
  - h2 Make your systems work as one layer.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/proof — 11 headings, 1 h1</summary>

- h1 Proof
    - h3 Securing Bank Access With FIDO2 Biometric Keys
    - h3 Passwordless Access For A Global Healthcare Enterprise
    - h3 Biometric FIDO2 Access For Air-Gapped Industrial Systems
    - h3 Biometric-Only Authentication For A Global IT Enterprise
  - h2 Estimate your own numbers
  - h2 Become the next case study.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/proof/securing-bank-access-fido2 — 14 headings, 1 h1</summary>

- h1 Securing Bank Access With FIDO2 Biometric Keys
  - h2 Where they started
  - h2 What was deployed
  - h2 Rollout
      - h4 Pilot
      - h4 Branch rollout
      - h4 Back office
  - h2 Outcome
  - h2 Related
  - h2 Run a rollout your branches can trust.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/proof/passwordless-access-global-healthcare — 11 headings, 1 h1</summary>

- h1 Passwordless Access For A Global Healthcare Enterprise
  - h2 Where they started
  - h2 What was deployed
  - h2 Rollout
  - h2 Outcome
  - h2 Related
  - h2 Talk to us about clinical sign-in.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/proof/biometric-fido2-air-gapped-industrial — 11 headings, 1 h1</summary>

- h1 Biometric FIDO2 Access For Air-Gapped Industrial Systems
  - h2 Where they started
  - h2 What was deployed
  - h2 Rollout
  - h2 Outcome
  - h2 Related
  - h2 Bring verified sign-in to air-gapped systems.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/proof/biometric-only-authentication-global-it — 11 headings, 1 h1</summary>

- h1 Biometric-Only Authentication For A Global IT Enterprise
  - h2 Where they started
  - h2 What was deployed
  - h2 Rollout
  - h2 Outcome
  - h2 Related
  - h2 Run biometric-only sign-in at global scale.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/thinking — 13 headings, 1 h1</summary>

- h1 Our thinking
    - h3 Elevate Enterprise Security with Identity-First Controls
    - h3 Data + AI Security Built for Visibility, Control, and Trust
    - h3 Modern Micro-Segmentation for Zero Trust Security
    - h3 Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynami
    - h3 Building Smarter Cybersecurity with Agentic AI and the AutoGen Framewo
  - h2 Perspectives & Updates from LinkedIn
    - h3 Stay informed
  - h2 Discuss what you are reading.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/thinking/industry — 14 headings, 1 h1</summary>

- h1 Industry Thinking
    - h3 Why AI Governance Is Becoming a Security Priority
    - h3 How to Reduce Shadow AI Risk Before It Spreads
    - h3 Why Passwordless Identity Matters for Mid-Market Teams
    - h3 Zero Trust Works Best When It Starts With Identity
    - h3 How Continuous Compliance Improves Audit Readiness
    - h3 What NIST AI-RMF Means for Practical AI Oversight
    - h3 Access Reviews Should Not Be a Last-Minute Exercise
    - h3 Stay informed
  - h2 Discuss what you are reading.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/thinking/identity-first-controls — 10 headings, 1 h1</summary>

- h1 Elevate Enterprise Security with Identity-First Controls
    - h3 The login screen is the smallest change
    - h3 Rollout order matters more than the hardware
    - h3 What the help desk actually gets
  - h2 Related
  - h2 Plan a rollout in the right order.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/thinking/data-and-ai-security — 10 headings, 1 h1</summary>

- h1 Data + AI Security Built for Visibility, Control, and Trust
    - h3 The questions arrive before the evidence exists
    - h3 What evidence answers each question
    - h3 Start before the assessment letter arrives
  - h2 Related
  - h2 Have evidence before the letter arrives.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/thinking/modern-micro-segmentation — 10 headings, 1 h1</summary>

- h1 Modern Micro-Segmentation for Zero Trust Security
    - h3 Segments shaped around identity
    - h3 Start with the services people rely on
    - h3 Evidence is part of the design
  - h2 Related
  - h2 Draw segments around identity.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/thinking/non-human-identities — 10 headings, 1 h1</summary>

- h1 Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynami
    - h3 The identities doing the work are changing
    - h3 A dynamic model, in practice
    - h3 Where to start
  - h2 Related
  - h2 Govern every identity, human or not.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/thinking/agentic-ai-cybersecurity — 10 headings, 1 h1</summary>

- h1 Building Smarter Cybersecurity with Agentic AI and the AutoGen Framewo
    - h3 Agents that work in teams
    - h3 Governance is designed in, from the first agent
    - h3 What good looks like
  - h2 Related
  - h2 Put agents to work, with owners.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/resources — 5 headings, 1 h1</summary>

- h1 This page has moved.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/resources/enterprise — 12 headings, 1 h1</summary>

- h1 Every identity. Fully in control.
  - h2 Deployment models
      - h4 SaaS
      - h4 On-premises
      - h4 Air-gapped
  - h2 Standards posture
  - h2 Related
  - h2 Bring every identity into one view.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/resources/industry-thinking — 14 headings, 1 h1</summary>

- h1 Industry Thinking
    - h3 Why AI Governance Is Becoming a Security Priority
    - h3 How to Reduce Shadow AI Risk Before It Spreads
    - h3 Why Passwordless Identity Matters for Mid-Market Teams
    - h3 Zero Trust Works Best When It Starts With Identity
    - h3 How Continuous Compliance Improves Audit Readiness
    - h3 What NIST AI-RMF Means for Practical AI Oversight
    - h3 Access Reviews Should Not Be a Last-Minute Exercise
    - h3 Stay informed
  - h2 Discuss what you are reading.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/resources/solutions — 20 headings, 1 h1</summary>

- h1 Solutions
  - h2 Solutions
    - h3 Identity Governance
    - h3 AI and Digital Governance
    - h3 Quantum-Safe Security
    - h3 Business Process
    - h3 Enterprise Technology
  - h2 Enterprise and insights
    - h3 Enterprise
    - h3 Our thinking
    - h3 Tiers, not toggles: a richer language for agent authority
    - h3 Micro-segmentation for agents: small scopes, clear ownership
    - h3 Sign-in people love: lessons from four AUTH models
    - h3 Evaluating agents the way great teams review code
    - h3 Confidence you can show: provenance as a product feature
  - h2 Which solution fits your goals?
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/resources/thinking — 13 headings, 1 h1</summary>

- h1 Our thinking
    - h3 Elevate Enterprise Security with Identity-First Controls
    - h3 Data + AI Security Built for Visibility, Control, and Trust
    - h3 Modern Micro-Segmentation for Zero Trust Security
    - h3 Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynami
    - h3 Building Smarter Cybersecurity with Agentic AI and the AutoGen Framewo
  - h2 Perspectives & Updates from LinkedIn
    - h3 Stay informed
  - h2 Discuss what you are reading.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/resources/identity-governance — 10 headings, 1 h1</summary>

- h1 Identity Governance
  - h2 What teams come to XSignOn to achieve
  - h2 How XSignOn supports it
  - h2 Products that deliver it
  - h2 Proof and reading
  - h2 Answer "who can reach what" in one view.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/resources/identity-first-controls — 10 headings, 1 h1</summary>

- h1 Elevate Enterprise Security with Identity-First Controls
    - h3 The login screen is the smallest change
    - h3 Rollout order matters more than the hardware
    - h3 What the help desk actually gets
  - h2 Related
  - h2 Plan a rollout in the right order.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/compare — 7 headings, 1 h1</summary>

- h1 How XSignOn compares
  - h2 Related
  - h2 Compare it against your current sign-in.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/roi-calculator — 7 headings, 1 h1</summary>

- h1 ROI Calculator
  - h2 Related
  - h2 Bring us your estimate. We will bring a plan.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/careers — 14 headings, 1 h1</summary>

- h1 Careers
  - h2 Working here
      - h4 Evidence over assertion
      - h4 The secure way is the easy way
      - h4 Small team, real responsibility
  - h2 Open roles
    - h3 Security Engineer
    - h3 AI Governance Analyst
    - h3 General applications
  - h2 Want to build sign-in people trust?
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/enterprise — 12 headings, 1 h1</summary>

- h1 Every identity. Fully in control.
  - h2 Deployment models
      - h4 SaaS
      - h4 On-premises
      - h4 Air-gapped
  - h2 Standards posture
  - h2 Related
  - h2 Bring every identity into one view.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/contact — 6 headings, 1 h1</summary>

- h1 Contact us
  - h2 Prefer reading first?
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/contact/thank-you — 6 headings, 1 h1</summary>

- h1 Contact us
  - h2 Prefer reading first?
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/privacy — 11 headings, 1 h1</summary>

- h1 Privacy Policy
    - h3 Information we collect
    - h3 How we use information
    - h3 Sharing and disclosure
    - h3 Your rights
    - h3 Contact
  - h2 Questions about your data?
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/terms — 11 headings, 1 h1</summary>

- h1 Terms
    - h3 Use of the site
    - h3 Products and services
    - h3 Intellectual property
    - h3 Limitation of liability
    - h3 Contact
  - h2 Questions about these terms?
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/unsubscribe — 5 headings, 1 h1</summary>

- h1 Unsubscribe
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/subscribe/verify — 6 headings, 1 h1</summary>

- h1 Email verification
  - h2 Verification link invalid
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/white-papers/zero-trust-posture-guide — 20 headings, 1 h1</summary>

- h1 Solutions
  - h2 Solutions
    - h3 Identity Governance
    - h3 AI and Digital Governance
    - h3 Quantum-Safe Security
    - h3 Business Process
    - h3 Enterprise Technology
  - h2 Enterprise and insights
    - h3 Enterprise
    - h3 Our thinking
    - h3 Tiers, not toggles: a richer language for agent authority
    - h3 Micro-segmentation for agents: small scopes, clear ownership
    - h3 Sign-in people love: lessons from four AUTH models
    - h3 Evaluating agents the way great teams review code
    - h3 Confidence you can show: provenance as a product feature
  - h2 Which solution fits your goals?
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/styleguide — 12 headings, 2 h1</summary>

- h1 Display heading
  - h2 Section heading
    - h3 Heading 3
      - h4 Heading 4
- h1 Display heading
  - h2 Section heading
    - h3 Heading 3
      - h4 Heading 4
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/tokens — 12 headings, 1 h1</summary>

- h1 Design tokens
  - h2 Dark set
  - h2 Light set
  - h2 Focus and status
  - h2 Gradient ramp
  - h2 Home background, version 5 (descent)
  - h2 Type scale
  - h2 Radii and shadows
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>
<details><summary>/__404-qa-check-not-a-page — 5 headings, 1 h1</summary>

- h1 This page has moved.
      - h4 About
      - h4 Products
      - h4 Resources
      - h4 Legal

</details>


## Notes on specific findings

- **Hidden after scroll, `/`:** `#cfTrack article.cf-card .pcard-icon` (4 icons, opacity 0) are badge icons on the cards of the products carousel that aren't in focus. `#journey .j-panels article.j-panel` (3 panels, opacity 0, all at the same y) are the stacked panels of the "What XSignOn does" scroll story that aren't active. Both look intentional (carousel and stacked-state designs), not reveal failures. No `.rv` or reveal element stayed hidden on any other route.
- **Redirect and alias routes:** `/about/who-we-are`, `/about/what-we-do` and `/about/how-we-work` redirect to `/about#...` with the same content and canonical. `/resources/enterprise`, `/resources/solutions`, `/resources/thinking`, `/resources/industry-thinking` and `/resources/<slug>` redirect to their real pages. `/compare` renders the same page as `/products/compare` (canonical points to /products/compare). `/products/keys` and `/products/passwordless-keys` are the same view.
- **`/contact/thank-you`** without the `contact_sent` cookie redirects to `/contact` from inside a Suspense boundary, as designed. The success view itself was not tested, which would need a real form submission. It is counted twice in bytes (9.5 MB, 38 requests) because both pages load.
- **`/resources`** is a 404 although `/white-papers` and `/whitepapers` redirect there, and menus and breadcrumbs (white-paper crumb "Resources" → `/thinking`) imply a hub exists.
- **Chat FAB at 320x640:** the fixed "Questions" button (`bottom-right`) sits over the right edge of the hero "Explore our products" button at first paint (`home-320.png`, `products-320.png`). It is cosmetic, but the FAB covers part of the primary CTA on small phones.
- **`/products` compare table at 320 and 390:** the table scrolls horizontally inside its card with a sticky label column. Product columns are cut off mid-word ("PostureOn", "Website and clo"), and nothing visually signals that the table scrolls (`products-320.png`).

## Reduced motion

Method: 1440x900 context with `reducedMotion: 'no-preference'` and then `'reduce'`. The page was sampled at the top and at 25%, 50% and 75% of its height. At each point the script counted running `document.getAnimations()`, took clip screenshots of each canvas in view 1 s apart (MD5 compare), and compared whole-viewport screenshots 1 s apart.

| Page | Mode | matchMedia reduce | Running animations (top / 25 / 50 / 75%) | Infinite | Canvas changes over 1 s | Viewport changes over 1 s |
|---|---|---|---|---|---|---|
| / | normal | false | 31 / 23 / 39 / 22 | 22 (se-blink x11, ha-float x4, se-flow x4, ha-slide) | yes (hero canvas 1440x775, ecosystem canvas 1440x2215); footer-area canvas 1114x370 static | yes (top, 25%, 50%) |
| / | reduce | **true** | 0 / 0 / 0 / 0 | 0 | **no** (all sampled canvases static) | **no** |
| /products/postureone | normal | false | 23 transitions (reveal) at load, then 0 | 0 | no canvases | no |
| /products/postureone | reduce | true | 0 | 0 | no canvases | no |

Result: **pass.** Under reduced motion the home page stops every CSS and WAAPI animation, and its three canvases stop re-rendering. The product page has only one-off reveal transitions, and those are disabled too. No `<video>` elements exist.

## Keyboard

### Tab order on `/` at 1440 (from page load, no click)

Steps 1 to 4 are dev-only (3x `NEXTJS-PORTAL` from the Next dev overlay, then `body`). Indicator = which computed styles differ between focused and blurred states.

| # | Element | Indicator | Notes |
|---|---|---|---|
| 5 | a "Skip to main content" | outline + shadow + bg + color | Becomes visible (198x39 at 16,16). **First real stop: pass** (`kbd-skiplink-1440.png`) |
| 6 | a "XSignOn home" (logo) | box-shadow ring (2px inset white + blue) | |
| 7 | a "About" | 2px solid #0B57D0 outline + ring | |
| 8 | button "About menu" (chevron) | outline + ring | 28x32 |
| 9-12 | Insights / Insights menu / Products / Products menu | outline + ring | |
| 13 | a "Contact Us" | outline + ring | |
| 14-17 | Hero: Explore our products, About XSignOn, domain input, Scan button | ring (inset dark + light blue #A9E1FF) | Visible on the dark hero |
| 18 | a "View all products" | ring | |
| 19 | a "View more about PostureOne" | outline + ring + color | |
| 20-25 | Carousel: Previous product, Show PostureOne, Show Passwordless Keys, Show EvalOne, Show XSense, Show AMS | ring | Dot buttons 25x25 |

Every focusable element showed a visible indicator, with `:focus-visible` true each time. Activating the skip link sets `#main-content`, and the next Tab lands on the first hero link: **pass.**

Note: the carousel exposes 7 "Show ..." dot buttons, two of them labelled "Show XDMACsec" and "Show XDMACsec (second card)". That is 9 Tab stops for one carousel; consider roving tabindex.

### Header dropdowns (1440)

| Trigger | Enter | Space | ArrowDown | Tab into panel | Escape inside panel | Escape on trigger | Tab past panel end |
|---|---|---|---|---|---|---|---|
| About menu | opens, `aria-expanded=true` | opens | no effect | yes ("Who we are") | closes, **focus lost to body** | closes, focus stays on trigger | **panel stays open** while focus moves to Insights → Contact Us |
| Insights menu | opens | opens | no effect | yes ("Solutions") | closes, **focus lost to body** | — | (same pattern) |
| Products menu | opens | opens | no effect | yes ("PostureOne") | closes, **focus lost to body** | — | (same pattern) |

Fixes: close the panel on `focusout` when the new `relatedTarget` is outside `.nav2-item`. On Escape, move focus back to the chevron button before hiding the panel.

### Mobile menu (390x844, touch)

- While closed, `.nav2-mobile` has `visibility: hidden` (translated off-canvas), so its 7 controls are not tabbable. **Pass.** Tab order: Skip link → XSignOn home → Open menu → hero.
- Enter on "Open menu" opens it (`aria-expanded=true`), **but focus stays on the burger**. The panel has no `role="dialog"` and no `aria-modal`.
- Tabbing: 8 stops inside the menu (Close, 3 toggles, links, CTA), then **focus leaves for the page behind** ("Explore our products", domain input, carousel...). There is **no focus trap.**
- Escape closes the menu (`aria-expanded=false`, body overflow restored), but **focus is not returned to "Open menu"**; it stays on whatever page element it had escaped to.
- Fixes: on open, focus the Close button. Trap Tab inside `.nav2-mobile` (or set `inert` on the rest of the page) and add `role="dialog" aria-modal="true" aria-label="Menu"`. On close, refocus the burger.
- Screenshot: `kbd-mobile-menu-open-390.png`.

## Screenshot index

All under `shots/`.

| Route | 1440 | 768 | 390 | 320 |
|---|---|---|---|---|
| / | home-1440.png | home-768.png | home-390.png | home-320.png |
| /about | about-1440.png | about-768.png | about-390.png | about-320.png |
| /about/who-we-are | about_who-we-are-1440.png | about_who-we-are-768.png | about_who-we-are-390.png | about_who-we-are-320.png |
| /about/what-we-do | about_what-we-do-1440.png | about_what-we-do-768.png | about_what-we-do-390.png | about_what-we-do-320.png |
| /about/how-we-work | about_how-we-work-1440.png | about_how-we-work-768.png | about_how-we-work-390.png | about_how-we-work-320.png |
| /products | products-1440.png | products-768.png | products-390.png | products-320.png |
| /products/postureone | products_postureone-1440.png | products_postureone-768.png | products_postureone-390.png | products_postureone-320.png |
| /products/evalone | products_evalone-1440.png | products_evalone-768.png | products_evalone-390.png | products_evalone-320.png |
| /products/xsense | products_xsense-1440.png | products_xsense-768.png | products_xsense-390.png | products_xsense-320.png |
| /products/ams | products_ams-1440.png | products_ams-768.png | products_ams-390.png | products_ams-320.png |
| /products/keys | products_keys-1440.png | products_keys-768.png | products_keys-390.png | products_keys-320.png |
| /products/passwordless-keys | products_passwordless-keys-1440.png | products_passwordless-keys-768.png | products_passwordless-keys-390.png | products_passwordless-keys-320.png |
| /products/passwordless-keys/bio | products_passwordless-keys_bio-1440.png | products_passwordless-keys_bio-768.png | products_passwordless-keys_bio-390.png | products_passwordless-keys_bio-320.png |
| /products/passwordless-keys/touch | products_passwordless-keys_touch-1440.png | products_passwordless-keys_touch-768.png | products_passwordless-keys_touch-390.png | products_passwordless-keys_touch-320.png |
| /products/passwordless-keys/pro | products_passwordless-keys_pro-1440.png | products_passwordless-keys_pro-768.png | products_passwordless-keys_pro-390.png | products_passwordless-keys_pro-320.png |
| /products/passwordless-keys/desktop | products_passwordless-keys_desktop-1440.png | products_passwordless-keys_desktop-768.png | products_passwordless-keys_desktop-390.png | products_passwordless-keys_desktop-320.png |
| /products/compare | products_compare-1440.png | products_compare-768.png | products_compare-390.png | products_compare-320.png |
| /solutions | solutions-1440.png | solutions-768.png | solutions-390.png | solutions-320.png |
| /solutions/identity-governance | solutions_identity-governance-1440.png | solutions_identity-governance-768.png | solutions_identity-governance-390.png | solutions_identity-governance-320.png |
| /solutions/ai-and-digital-governance | solutions_ai-and-digital-governance-1440.png | solutions_ai-and-digital-governance-768.png | solutions_ai-and-digital-governance-390.png | solutions_ai-and-digital-governance-320.png |
| /solutions/quantum-safe-security | solutions_quantum-safe-security-1440.png | solutions_quantum-safe-security-768.png | solutions_quantum-safe-security-390.png | solutions_quantum-safe-security-320.png |
| /solutions/business-process | solutions_business-process-1440.png | solutions_business-process-768.png | solutions_business-process-390.png | solutions_business-process-320.png |
| /solutions/enterprise-technology | solutions_enterprise-technology-1440.png | solutions_enterprise-technology-768.png | solutions_enterprise-technology-390.png | solutions_enterprise-technology-320.png |
| /proof | proof-1440.png | proof-768.png | proof-390.png | proof-320.png |
| /proof/securing-bank-access-fido2 | proof_securing-bank-access-fido2-1440.png | proof_securing-bank-access-fido2-768.png | proof_securing-bank-access-fido2-390.png | proof_securing-bank-access-fido2-320.png |
| /proof/passwordless-access-global-healthcare | proof_passwordless-access-global-healthcare-1440.png | proof_passwordless-access-global-healthcare-768.png | proof_passwordless-access-global-healthcare-390.png | proof_passwordless-access-global-healthcare-320.png |
| /proof/biometric-fido2-air-gapped-industrial | proof_biometric-fido2-air-gapped-industrial-1440.png | proof_biometric-fido2-air-gapped-industrial-768.png | proof_biometric-fido2-air-gapped-industrial-390.png | proof_biometric-fido2-air-gapped-industrial-320.png |
| /proof/biometric-only-authentication-global-it | proof_biometric-only-authentication-global-it-1440.png | proof_biometric-only-authentication-global-it-768.png | proof_biometric-only-authentication-global-it-390.png | proof_biometric-only-authentication-global-it-320.png |
| /thinking | thinking-1440.png | thinking-768.png | thinking-390.png | thinking-320.png |
| /thinking/industry | thinking_industry-1440.png | thinking_industry-768.png | thinking_industry-390.png | thinking_industry-320.png |
| /thinking/identity-first-controls | thinking_identity-first-controls-1440.png | thinking_identity-first-controls-768.png | thinking_identity-first-controls-390.png | thinking_identity-first-controls-320.png |
| /thinking/data-and-ai-security | thinking_data-and-ai-security-1440.png | thinking_data-and-ai-security-768.png | thinking_data-and-ai-security-390.png | thinking_data-and-ai-security-320.png |
| /thinking/modern-micro-segmentation | thinking_modern-micro-segmentation-1440.png | thinking_modern-micro-segmentation-768.png | thinking_modern-micro-segmentation-390.png | thinking_modern-micro-segmentation-320.png |
| /thinking/non-human-identities | thinking_non-human-identities-1440.png | thinking_non-human-identities-768.png | thinking_non-human-identities-390.png | thinking_non-human-identities-320.png |
| /thinking/agentic-ai-cybersecurity | thinking_agentic-ai-cybersecurity-1440.png | thinking_agentic-ai-cybersecurity-768.png | thinking_agentic-ai-cybersecurity-390.png | thinking_agentic-ai-cybersecurity-320.png |
| /resources | resources-1440.png | resources-768.png | resources-390.png | resources-320.png |
| /resources/enterprise | resources_enterprise-1440.png | resources_enterprise-768.png | resources_enterprise-390.png | resources_enterprise-320.png |
| /resources/industry-thinking | resources_industry-thinking-1440.png | resources_industry-thinking-768.png | resources_industry-thinking-390.png | resources_industry-thinking-320.png |
| /resources/solutions | resources_solutions-1440.png | resources_solutions-768.png | resources_solutions-390.png | resources_solutions-320.png |
| /resources/thinking | resources_thinking-1440.png | resources_thinking-768.png | resources_thinking-390.png | resources_thinking-320.png |
| /resources/identity-governance | resources_identity-governance-1440.png | resources_identity-governance-768.png | resources_identity-governance-390.png | resources_identity-governance-320.png |
| /resources/identity-first-controls | resources_identity-first-controls-1440.png | resources_identity-first-controls-768.png | resources_identity-first-controls-390.png | resources_identity-first-controls-320.png |
| /compare | compare-1440.png | compare-768.png | compare-390.png | compare-320.png |
| /roi-calculator | roi-calculator-1440.png | roi-calculator-768.png | roi-calculator-390.png | roi-calculator-320.png |
| /careers | careers-1440.png | careers-768.png | careers-390.png | careers-320.png |
| /enterprise | enterprise-1440.png | enterprise-768.png | enterprise-390.png | enterprise-320.png |
| /contact | contact-1440.png | contact-768.png | contact-390.png | contact-320.png |
| /contact/thank-you | contact_thank-you-1440.png | contact_thank-you-768.png | contact_thank-you-390.png | contact_thank-you-320.png |
| /privacy | privacy-1440.png | privacy-768.png | privacy-390.png | privacy-320.png |
| /terms | terms-1440.png | terms-768.png | terms-390.png | terms-320.png |
| /unsubscribe | unsubscribe-1440.png | unsubscribe-768.png | unsubscribe-390.png | unsubscribe-320.png |
| /subscribe/verify | subscribe_verify-1440.png | subscribe_verify-768.png | subscribe_verify-390.png | subscribe_verify-320.png |
| /white-papers/zero-trust-posture-guide | white-papers_zero-trust-posture-guide-1440.png | white-papers_zero-trust-posture-guide-768.png | white-papers_zero-trust-posture-guide-390.png | white-papers_zero-trust-posture-guide-320.png |
| /styleguide | styleguide-1440.png | styleguide-768.png | styleguide-390.png | styleguide-320.png |
| /tokens | tokens-1440.png | tokens-768.png | tokens-390.png | tokens-320.png |
| /__404-qa-check-not-a-page | 404-1440.png | 404-768.png | 404-390.png | 404-320.png |

Keyboard/crop extras in `shots/`: kbd-skiplink-1440.png, kbd-focus-step5-1440.png, kbd-dropdown-1440.png, kbd-dropdown-left-open-1440.png, kbd-mobile-menu-open-390.png. Crops in `crops/`: home-320-a/b.png, products-320-a/b.png, thinking-390-a.png, solutions-1440-a.png, unsub-390.png.
