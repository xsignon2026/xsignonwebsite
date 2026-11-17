# XSignOn Content Audit: live site vs Version 2 rebuild

**Scope:** every crawlable page on https://xsignon.com/ (sitemap + every linked internal page, 35 pages) and every routable page on the Next.js rebuild at http://localhost:3000 (40 pages; /studio, /styleguide, /tokens and /api skipped).
**Date:** 17 Nov 2026. **Repo:** branch `Version-2` at 239551c. No repo files were changed.
**Method:** rendered HTML fetched with curl. Body text is everything between `</header>` and `<footer>` on live and inside `<main>` on new, with nav, footer, scripts, forms, `aria-hidden` and Bootstrap `d-none` blocks removed. SVG `<text>` is counted on the new site, because some copy (About "Why XSignOn", Home "Ecosystem") only exists there. Inactive tab panels on new product pages are also counted. Flesch scores are approximate (syllable heuristic, sentences of 4+ words). The CTA count includes action-verb links and buttons of 8 words or fewer. Working files are in `scratchpad/content/` (`live.json`, `new.json`, `live_text/`, `new_text/`, `extract.py`).

---

## 0. The verdict in one paragraph

The rebuild has **already cut the text**: 18,206 visible words on 35 live pages, down to 9,377 on 40 new pages, about 49% fewer and roughly 65 to 80% fewer on the five solution pages. The buzzwords are gone as well ("seamless" 9 to 0, "defensible" 14 to 0, "pressure" 31 to 0, keyword-stuffed phrases like "AI business process automation" 11 to 0). **The problem is no longer length, it is trust and completeness:**

1. **60+ placeholder strings** would ship. Examples: "Placeholder copy for legal review" (Privacy, Terms), "Case details pending" (3 of 4 case studies), "Spec confirmation pending" / "Confirm spec" (all 4 key models), "Full text pending" (7 Industry Thinking items), "Patent details pending publication" (XSense).
2. **Valuable live content is being dropped, not condensed.** This covers the real legal text (including the SMS opt-in terms that live forms depend on), hardware specs, full case-study facts, the XSense patent, the partner names and the Identity Week finalist mention.
3. **Products are described differently depending on the page.** PostureOne is a "living inventory of every person, device and agent" on Home and Products, but "website and cloud security" on its own page. AMS is "access requests, approvals and periodic reviews" on Home and Products, but a "key lifecycle" system on its own page.
4. **SEO migration is broken.** 7 of the 10 live sitemap URLs, and 29 of the 35 live pages, return 404 on the new site. The redirect map was written for URLs that never existed (`/products/fido2`, `/company/...`). Every new `<title>` is doubled ("Contact Us | XSignOn | XSignOn").
5. **Fabricated-looking social proof is new to V2.** A hard-coded "LinkedIn stream" shows invented reaction counts ("👍 142 💬 19"). The About and Solutions pages feature five "articles" that do not exist and link back to the /thinking index.

Fix those before any further trimming. Several new pages (the five solution pages at about 140 words, and the case studies) are now **too thin** and should grow slightly.

---

## 1. Summary metrics (all pages)

Live = visible words on xsignon.com (hidden `d-none` words in brackets). New = words on the V2 page. Target = recommended word count for the Sanity version. ASL = average sentence length (words). FRE = Flesch reading ease (higher is easier; the live pages average about 25, which reads like an academic paper).

| # | Page (live → new) | Live words | New words | **Target** | Live H2s / ASL / FRE / CTAs | New H2s / ASL / FRE / CTAs | Verdict |
|---|---|---:|---:|---:|---|---|---|
| 1 | `/` → `/` | 1,012 | 672 | **450** | 11 / 10.4 / 20 / 10 | 6 / 8.5 / 37 / 21 | Cut: duplicate XDMACsec card, double article teasers, 21 CTAs |
| 2 | `/about-us/` → `/about` | 1,201 (+1,418 hidden) | 352 | **400** | 12 / 12.6 / 28 / 5 | 6 / 8.4 / 18 / 3 | Right size; add proof (founded, team, standards) |
| 3 | — → `/about/who-we-are`, `/what-we-do`, `/how-we-work` | — | 307 redirect | 0 | — | — | Aliases only; keep out of sitemap |
| 4 | `/careers/` → `/careers` | 652 | 163 | **250** | 8 / 11.5 / 58 / 2 | 3 / 10.4 / 63 / 4 | Slightly thin; restore 4-line benefits list |
| 5 | `/contact/` → `/contact` | 34 | 82 | **70** | 2 / 4.0 / 76 / 0 | 1 / 13.2 / 68 / 0 | Remove internal-facing sentence |
| 6 | — → `/enterprise` (new) | — | 170 | **170** | — | 4 / 13.4 / 34 / 1 | Unlabelled mock % and an unsupported claim |
| 7 | — (nav "Explore All Services") → `/products` | — | 313 | **250** | — | 3 / 9.5 / 32 / 9 | Fix product summaries that contradict the product pages |
| 8 | `/postureone/` → `/products/postureone` | 798 | 325 | **350** | 9 / 13.9 / 24 / 0 | 5 / 12.0 / 50 / 1 | Good; fix the positioning conflict |
| 9 | `/pages/evalone/` → `/products/evalone` | 309 | 386 | **350** | 2 / 12.0 / 28 / 1 | 5 / 12.1 / 50 / 1 | Good; slight trim |
| 10 | `/xsense` → `/products/xsense` | 315 | 238 | **250** | 9 / 8.7 / 35 / 0 | 3 / 12.2 / 37 / 1 | Placeholders; patent and roadmap lost |
| 11 | `/ams` → `/products/ams` | 269 | 409 | **300** | 9 / 7.8 / 38 / 0 | 5 / 14.0 / 51 / 1 | Grew; "covers" and the doc tabs repeat each other |
| 12 | `/passwordless-authenticators/` → `/products/passwordless-keys` (also `/products/keys`) | 850 | 302 | **300** | 10 / 13.6 / 18 / 4 | 4 / 8.9 / 42 / 5 | 7 "confirm spec" placeholders |
| 13 | `/auth-bio` → `/products/passwordless-keys/bio` | 340 | 256 | **200 + spec table** | 8 / 7.3 / 23 / 0 | 4 / 11.7 / 44 / 1 | Real specs replaced by "Confirm spec" |
| 14 | `/auth-bio-pro` → `…/pro` | 301 | 254 | **200 + spec table** | 8 / 7.1 / 25 / 0 | 4 / 11.6 / 38 / 1 | Same |
| 15 | `/auth-bio-touch` → `…/touch` | 411 | 255 | **200 + spec table** | 10 / 7.4 / 28 / 0 | 4 / 11.6 / 49 / 1 | Same; the live page has the best spec sheet on either site |
| 16 | `/auth-bio-desktop` → `…/desktop` | 271 | 259 | **200 + spec table** | 7 / 7.6 / 33 / 0 | 4 / 11.8 / 50 / 1 | Same |
| 17 | `/catalog/` (JS-rendered, 0 crawlable words) → none | 0 | — | 0 | — | — | Redirect to `/products/passwordless-keys` |
| 18 | — → `/products/compare` (`/compare` redirects here) | — | 203 | **200** | — | 2 / 7.2 / 68 / 1 | Keep |
| 19 | — (nav "Explore All Services") → `/solutions` | — | 413 | **300** | — | 3 / 10.1 / 59 / 12 | Remove 5 fake article teasers |
| 20 | `/identity-governance/` → `/solutions/identity-governance` | 831 (+~1,660 hidden) | 156 | **300** | 9 / 12.7 / 13 / 2 | 5 / 11.1 / 52 / 1 | Now too thin for a money page |
| 21 | `/ai-digital-governance/` → `/solutions/ai-and-digital-governance` | 813 | 148 | **300** | 9 / 11.8 / 20 / 2 | 5 / 10.0 / 58 / 1 | Too thin |
| 22 | `/quantum-safe-security/` → `/solutions/quantum-safe-security` | 885 | 140 | **300** | 10 / 11.7 / 19 / 2 | 5 / 9.9 / 49 / 1 | Too thin; "delivered by" claim is weak |
| 23 | `/business-process-solutions/` → `/solutions/business-process` | 824 | 145 | **250** | 9 / 13.7 / 36 / 1 | 5 / 10.4 / 46 / 1 | Topic silently changed (workflow automation became access reviews) |
| 24 | `/enterprise-technology-solutions/` → `/solutions/enterprise-technology` | 826 | 135 | **300** | 9 / 13.7 / 19 / 1 | 5 / 9.5 / 48 / 1 | Too thin; best live FAQ dropped |
| 25 | `/use-cases/` → `/proof` (`/case-studies` redirects here) | 202 | 281 | **180** | 1 / 7.9 / −5 / 0 | 2 / 9.8 / 60 / 6 | 5 placeholder notices |
| 26 | `/use-cases/user-case-banking` → `/proof/securing-bank-access-fido2` | 550 | 301 | **350** | 7 / 8.9 / 9 / 0 | 6 / 12.1 / 56 / 1 | Facts softened into marketing; outcome is a placeholder |
| 27 | `/use-cases/user-case-healthcare` → `/proof/passwordless-access-global-healthcare` | 430 | 157 | **300** | 7 / 9.2 / 5 / 0 | 6 / 10.6 / 50 / 1 | 4 placeholders even though the live page has the facts |
| 28 | `/use-cases/user-case-electrical` → `/proof/biometric-fido2-air-gapped-industrial` | 600 | 177 | **300** | 6 / 9.0 / 8 / 0 | 6 / 11.4 / 46 / 1 | Same |
| 29 | `/use-cases/user-case-information-technology` → `/proof/biometric-only-authentication-global-it` | 482 | 143 | **300** | 6 / 10.3 / 8 / 0 | 6 / 10.2 / 42 / 1 | Same |
| 30 | `/xsignon-insights/` → `/thinking` | 461 | 370 | **200** | 0 / 14.6 / 33 / 5 | 2 / 10.5 / 36 / 10 | Remove fake LinkedIn stream |
| 31 | `/industry-thinking/` → `/thinking/industry` | 314 | 288 | **0 (merge)** | 3 / 8.1 / 26 / 8 | 1 / 10.1 / 53 / 1 | 7 "Full text pending" stubs; merge into /thinking |
| 32 | `/xsignon-insights/news-details/` → `/thinking/identity-first-controls` | 914 | 376 | **700** | 1 / 12.7 / 12 / 0 | 2 / 14.8 / 65 / 1 | Article cut too far for SEO |
| 33 | `…/news-details1/` → `/thinking/data-and-ai-security` | 572 | 311 | **650** | 1 / 12.4 / 32 / 0 | 2 / 13.1 / 54 / 1 | Body no longer matches its title |
| 34 | `…/news-details2/` → `/thinking/modern-micro-segmentation` | 391 | 239 | **600** | 1 / 11.3 / 20 / 0 | 2 / 12.8 / 49 / 1 | Thin |
| 35 | `…/news-details3/` → `/thinking/non-human-identities` | 560 | 267 | **650** | 1 / 11.3 / 31 / 0 | 2 / 13.7 / 48 / 1 | Thin |
| 36 | `…/news-details4/` → `/thinking/agentic-ai-cybersecurity` | 480 | 271 | **650** | 1 / 11.9 / 34 / 0 | 2 / 12.7 / 55 / 1 | Thin |
| 37 | — → `/white-papers/zero-trust-posture-guide` | — | **unreachable** | 150 | — | — | Redirect loop sends it to /solutions |
| 38 | `/roi-calculator/` → `/roi-calculator` (`/roi` and `/products/roi` redirect here) | 105 | 141 | **110** | 1 / 6.8 / 44 / 0 | 2 / 8.5 / 75 / 1 | Good; drop the "being sourced" lines |
| 39 | `/privacy-policy/` → `/privacy` | 749 | 148 (placeholder) | **≈750 (legal)** | 11 / 9.1 / 49 / 0 | 1 / 10.4 / 37 / 1 | **Blocker** |
| 40 | `/terms-and-conditions/` → `/terms` | 413 | 128 (placeholder) | **≈450 (legal)** | 9 / 10.5 / 53 / 0 | 1 / 8.9 / 56 / 1 | **Blocker** |
| 41 | `/unsubscribe/` → `/unsubscribe` | 41 | 1 (form) | **40** | 1 / — / — / 0 | 0 | New page has no explanatory copy |
| 42 | — → `/contact/thank-you`, `/subscribe/verify` | — | 0 / 2 | 30 each | — | — | Utility; add one sentence each |
| | **Totals** | **18,206** visible (+~3,080 hidden) | **9,377** | **≈11,500** | | | |

The total target is higher than the current new total on purpose. Most of the increase restores legal text (about 1,200 words), article depth (about 2,000) and solution and case-study substance (about 1,200). Marketing copy (Home, About, hubs, products) should land about 10% below current V2.

---

## 2. Live → new mapping and gaps

| Live URL (status on live) | New destination | Type | Redirect today? | Risk |
|---|---|---|---|---|
| `/` | `/` | 1:1 | n/a | — |
| `/about-us/` (sitemap) | `/about` | 1:1 | ✅ `/about-us` → `/about` (**2 hops** from the trailing-slash URL, which breaks your own single-hop rule) | Low |
| `/overview/` (live 301 → `/about-us/`) | `/about` | merged | ❌ 404 | Low |
| `/identity-governance/` (sitemap, priority 0.9) | `/solutions/identity-governance` | 1:1 | ❌ **404** | **High** |
| `/ai-digital-governance/` (sitemap 0.9) | `/solutions/ai-and-digital-governance` | 1:1 | ❌ **404** | **High** |
| `/quantum-safe-security/` (sitemap 0.9) | `/solutions/quantum-safe-security` | 1:1 | ❌ **404** | **High** |
| `/business-process-solutions/` (sitemap 0.9) | `/solutions/business-process` | 1:1 (topic changed) | ❌ **404** | **High** |
| `/enterprise-technology-solutions/` (sitemap 0.9) | `/solutions/enterprise-technology` | 1:1 | ❌ **404** | **High** |
| `/postureone/` (sitemap 0.8) | `/products/postureone` | 1:1 | ❌ **404** | **High** |
| `/passwordless-authenticators/` (sitemap 0.8) | `/products/passwordless-keys` | 1:1 | ❌ **404** | **High** |
| `/contact/` | `/contact` | 1:1 | ✅ trailing-slash strip | — |
| `/careers/` | `/careers` | 1:1 | ✅ | — |
| `/pages/evalone/` | `/products/evalone` | 1:1 | ❌ 404 | High |
| `/xsense` | `/products/xsense` | 1:1 | ❌ 404 | High |
| `/ams` | `/products/ams` | 1:1 | ❌ 404 | High |
| `/auth-bio`, `/auth-bio-pro`, `/auth-bio-touch`, `/auth-bio-desktop` | `/products/passwordless-keys/{bio,pro,touch,desktop}` | 1:1 | ❌ 404 ×4 | High |
| `/catalog/` (+ `?series=` variants) | `/products/passwordless-keys` | merged | ❌ 404 | Medium |
| `/use-cases/` | `/proof` | 1:1 | ❌ 404 | Medium |
| `/use-cases/user-case-banking` | `/proof/securing-bank-access-fido2` | 1:1 | ❌ 404 | Medium |
| `/use-cases/user-case-healthcare` | `/proof/passwordless-access-global-healthcare` | 1:1 | ❌ 404 | Medium |
| `/use-cases/user-case-electrical` | `/proof/biometric-fido2-air-gapped-industrial` | 1:1 | ❌ 404 | Medium |
| `/use-cases/user-case-information-technology` | `/proof/biometric-only-authentication-global-it` | 1:1 | ❌ 404 | Medium |
| `/xsignon-insights/` (+ `?category=`) | `/thinking` | 1:1 | ❌ 404 | Medium |
| `/xsignon-insights/news-details/` (+ `.html`) | `/thinking/identity-first-controls` | 1:1 | ❌ 404 | Medium |
| `/xsignon-insights/news-details1/` | `/thinking/data-and-ai-security` | 1:1 | ❌ 404 | Medium |
| `/xsignon-insights/news-details2/` | `/thinking/modern-micro-segmentation` | 1:1 | ❌ 404 | Medium |
| `/xsignon-insights/news-details3/` (+ `.html`) | `/thinking/non-human-identities` | 1:1 | ❌ 404 | Medium |
| `/xsignon-insights/news-details4/` | `/thinking/agentic-ai-cybersecurity` | 1:1 | ❌ 404 | Medium |
| `/industry-thinking/` | `/thinking/industry` (recommend `/thinking`) | merged | ❌ 404 | Low |
| `/privacy-policy/` | `/privacy` | 1:1 | ❌ **404**. The live SMS consent text links here. | **High (compliance)** |
| `/terms-and-conditions/` | `/terms` | 1:1 | ❌ **404** | **High (compliance)** |
| `/roi-calculator/` | `/roi-calculator` | 1:1 | ✅ | — |
| `/unsubscribe/` | `/unsubscribe` | 1:1 | ✅ | — |
| Template junk linked from live footer/offcanvas (`about.html`, `contact.html`, `index-2.html`, `project.html`, `team.html`, `blog-details.html`…) | — | dropped | live already 404s | Remove; do not redirect |

**Pages that are new on V2 and have no live equivalent:** `/enterprise`, `/products` (hub), `/products/compare`, `/solutions` (hub), `/white-papers/zero-trust-posture-guide`, `/contact/thank-you`, `/subscribe/verify`.

**Live pages with no planned destination:** none. Every live page has a sensible new home, but **none of the high-value ones are redirected**.

### Problems in `src/data/redirects.ts`, `next.config.ts` and `docs/migration/redirect-map.md`

1. **The map does not cover the live estate.** It lists 32 invented legacy paths (`/product`, `/products/fido2`, `/company/who-we-are`, `/leadership`, `/demo`…) that xsignon.com never served. Only `/about-us` matches a real URL. The site inventory's "Zero Link Rot … every indexed legacy URL has a deterministic 1:1 destination" is not true.
2. **The three sources disagree.** `next.config.ts` has its own copy of the list (it does not import `redirects.ts`) with 4 extra rules. The doc lists `/products/compare → /compare`, but the code does the reverse.
3. **Redirects shadow real pages:**
   - `/white-papers/:slug*` → `/resources/:slug*`, and `resources/[slug]/page.tsx` then sends unknown slugs to `/solutions`. **The white-paper page is unreachable**, yet it is in the sitemap.
   - `/case-studies` → `/proof` makes `src/app/case-studies/page.tsx` dead code.
   - `/products/proof` and `/products/roi` shadow their own page.tsx files. The footer still links to `/products/proof`, which costs a needless hop.
   - `/articles/:slug*` → `/thinking/:slug*`, but `sitemap.ts` lists all 5 `/articles/*` URLs, so the sitemap contains redirecting URLs.
4. **Trailing slashes.** Every live URL ends in `/`, and Next strips it with a 308 before applying a rule. This adds a hop, which is acceptable, but each rule must exist for the slash-less path.

**Rules to add (single hop, 308):** `/identity-governance` → `/solutions/identity-governance`, `/ai-digital-governance` → `/solutions/ai-and-digital-governance`, `/quantum-safe-security` → `/solutions/quantum-safe-security`, `/business-process-solutions` → `/solutions/business-process`, `/enterprise-technology-solutions` → `/solutions/enterprise-technology`, `/postureone` → `/products/postureone`, `/passwordless-authenticators` → `/products/passwordless-keys`, `/pages/evalone` → `/products/evalone`, `/xsense` → `/products/xsense`, `/ams` → `/products/ams`, `/auth-bio` → `…/bio`, `/auth-bio-pro` → `…/pro`, `/auth-bio-touch` → `…/touch`, `/auth-bio-desktop` → `…/desktop`, `/catalog` → `/products/passwordless-keys`, `/use-cases` → `/proof`, `/use-cases/user-case-banking|healthcare|electrical|information-technology` → matching `/proof/*`, `/xsignon-insights` → `/thinking`, `/xsignon-insights/news-details(.html)?` → `/thinking/identity-first-controls`, `news-details1..4` (and `news-details3.html`) → matching `/thinking/*`, `/industry-thinking` → `/thinking/industry` (or `/thinking`), `/privacy-policy` → `/privacy`, `/terms-and-conditions` → `/terms`, `/overview` → `/about`. Then remove the `/white-papers/:slug*` rule and the `/articles/*` sitemap entries.

---

## 3. Site-wide issues

### 3.1 Placeholder and dummy copy that would ship (new site)

| Page | Offending copy (short quotes) | Count |
|---|---|---:|
| `/privacy` | "Placeholder copy for legal review." on every section | 6 |
| `/terms` | Same. H1 is just "Terms". | 6 |
| `/proof` | "Sourced outcome needed: … before this page ships"; "Case details pending" | 5 |
| `/proof/passwordless-access-global-healthcare`, `/proof/biometric-fido2-air-gapped-industrial`, `/proof/biometric-only-authentication-global-it` | "Case details pending: deployment scope is confirmed before this section ships." | 4 each |
| `/proof/securing-bank-access-fido2` | "Sourced outcome needed: one verifiable result…" | 1 |
| `/products/passwordless-keys` | "Spec confirmation pending" ×4 and "Confirm spec" cells | 7 |
| `/products/passwordless-keys/{bio,pro,touch,desktop}` | "Confirm spec" ×4 per page | 16 |
| `/products/xsense` | "Roadmap details confirmed at release"; "Patent details pending publication" | 2 |
| `/thinking/industry` | "Full text pending: this piece is being prepared for publication." ×7 | 7 |
| `/roi-calculator` | "Published figures from XSignOn deployments are being sourced" ×2 | 2 |
| `/contact` | "This form is designed to be quick and welcoming." (written for the team, not the visitor) | 1 |
| Home, `/products` | "XDMACsec / Email security for your organization." The card is **duplicated**, links to `/products`, the name is unexplained (DMARC typo?) and the carousel says "PostureOne, 1 of 7" | 2 |
| `/about`, `/solutions` | The "Our thinking" block features 5 articles that do not exist ("Tiers, not toggles…", "Sign-in people love: lessons from four AUTH models"…). Every one links to `/thinking`. Source: `src/data/about.ts`. | 5 |
| `/thinking` | Hard-coded "LinkedIn stream" with invented engagement ("👍 218 💬 34 🔁 27"), "Syncs 9:00 AM CST Daily", and every post URL pointing to the generic `/company/xsignon/posts/` (`src/data/linkedin-posts.ts`) | 6 posts |
| `/enterprise` | A mock console shows "Identities with owners 94%", "Verified sign-in coverage 86%", "Policies current 90%" with no "illustrative" label | 3 |
| `/products/postureone`, `/products/ams` | Mock dashboards ("Keys enrolled 92%", score 86). Acceptable only if labelled "Example view" | 2 |

**Rule:** Sanity should block publishing any document that contains `pending|placeholder|confirm spec|being sourced|before this page ships`. Better still, hide an optional section when it is empty instead of printing an apology.

**Live site placeholders and template leftovers:** `/industry-thinking/` has the `<title>` "GridTech – Smart AI, Security & Marketing HTML Template", a 55-character meta description, **two H1s**, and article cards linking to the template's `blog-details.html`. `/unsubscribe/` has the title "Passwordless Authentication - Use Cases". All 5 live insights are dated "29 June 2026". The live product pages contain internal slide-deck narration: "The deck describes AMS as…", "XSense MFA is described as…", "is listed as a mobile authenticator app". On the About page, the counter widgets render "0+ / 0M+ / 0K+" in the HTML. The live home H1 is a banner: "Selected as a finalist for the Identity Week America Startup Pitch! 🚀".

### 3.2 Product naming and positioning (both sites)

| Entity | Variants found | Canonical (recommend) |
|---|---|---|
| Company | "XSignOn" (178× in src, the standard). **"XSignON"** in `src/components/thinking/LinkedInSection.tsx:58` (visible on /thinking). **"Xsignon"** in 12 live `<title>`s and meta descriptions. "XSignOn Corporation" (legal entity, contact and terms). | **XSignOn**; "XSignOn Corporation" only in legal text |
| XSense | "XSense" (new). **"Xsense"** (live H1 and title). "XSense MFA", "XSense IdP", "XSenseCPP" (live case studies) | **XSense**; sub-components as "XSense Verify" and "XSense CPP" |
| Key range | **"Passwordless Keys"** (new nav, H1, footer). **"Passwordless Authenticators"** (About CTA "Passwordless Authenticators →", live H1 and URL). **"Passwordless Security"** (home solution tab that links to a product). "passwordless keys" lowercase (AMS copy and nav description). | **Passwordless Keys** (product); "passwordless authentication" (category, lowercase) |
| Key models | New: "AUTH Bio / AUTH Bio Pro / AUTH Bio Touch / AUTH Bio Desktop", but the `/products` compare widget says **"AUTH Touch"**. Live: "AUTH BioPro", "AUTH Desktop", "AUTH Touch", "AUTH Bio Touch", "ThinC-AUTH Bio (A)", "ThinC-AUTH Touch Pro", "ThinC-AUTH Desktop BioPro" | **AUTH Bio, AUTH Bio Pro, AUTH Bio Touch, AUTH Bio Desktop**. Decide whether the OEM name (ThinC-AUTH, by Ensurity) appears at all; if it does, use it once, in the spec table. |
| AMS | New page: "Asset Management System" for keys. **Home and `/products` card: "Access requests, approvals and periodic reviews"**, which is a different product. `content-approval-tracker.md`: "Access Management Server". Live case study: "Life Cycle Management Software" / "Asset Management System". | **AMS (Asset Management System)**, "lifecycle management for Passwordless Keys" |
| PostureOne | Product page: **website and cloud security** (WAF, DDoS, FIM, CSP, DSPM). Home and Products card and `postureone.ts` tagline (also the meta-description fallback): **"A living inventory of every person, device and agent, scored continuously"**, i.e. identity governance. Live About: a "strategic framework". Live hidden identity section: "XSignOn's Identity Governance Platform". Live home: "maps every [AI] deployment directly to NIST AI-RMF". | Pick **one**. Recommended: "Website and cloud security posture in one view", and rewrite both cards. |
| EvalOne | New: AI framework evaluation and evidence. Live: "AI-native security testing … red team". Approval tracker: "Phishing Simulation & Testing". | "AI evaluation against NIST AI RMF, OWASP LLM Top 10, MITRE ATLAS, EU AI Act, ISO/IEC 42001" |
| Solutions | "AI and Digital Governance" (new) vs "AI & Digital Governance" (live). "Business Process" (new) vs "Business Process Solutions" (live). "Quantum-Safe" (hyphenated) vs "quantum safe" (live body, 11×). | Title Case product and solution names, "and" not "&", "Quantum-Safe" always hyphenated |
| Spelling | US English dominates (enrollment 38, behavior, organization), but the new site has "enrolment" (home Ecosystem), "behavioural" (home, products) and "analyses" (XSense). The live case studies are fully British ("centralised", "enrolment", "organisation"). | **US English** (company is in Texas) |

**Heading capitalisation:** most V2 headings use sentence case ("Our products", "How XSignOn compares", "What PostureOne covers"). Case-study H1s and titles use Title Case with capitalised minor words ("Securing Bank Access **With** FIDO2…", "Passwordless Access **For A** Global Healthcare Enterprise"). Article titles keep live Title Case. The header CTA says "Contact Us", but page CTAs say "Contact us". **Rule: sentence case everywhere except proper nouns.**

### 3.3 Duplicated messages across pages

- **The standards strip** (FIDO2, SOC 2, HIPAA, GDPR, ISO 27001, PCI DSS, NIST AI-RMF, NIST 800-207, NIST PQC) repeats on **9 live pages** under 8 different filler intros, e.g. "Trust Signals That Support Adoption" and "Trust Signals Behind PostureOne". V2 shows it on Home, Solutions and Enterprise; the Enterprise version drops 3 of the 9. Make it **one Sanity singleton** and render it on Home and About only. It also needs a disclaimer line, because SOC 2, ISO 27001 and PCI DSS read as certifications XSignOn holds (see 3.4).
- **The live stat bar** "14+ Industries / 1M+ Data Assets Secured / 500K+ Identities Protected" repeats on 8 pages. V2 rightly dropped it.
- **"What teams come to XSignOn to achieve" / "Teams want…"** opens all five V2 solution pages and every home "What XSignOn does" panel with the same construction ("Teams want one accountable sign-in…", "Teams want AI evidence ready…", "Teams want access reviews…").
- **Article teasers** appear on Home (5, each title printed twice in the DOM), Products (5), Solutions (5 fake ones), About (5 fake ones), Thinking (5) and Industry (7 stubs). That is **27 teaser blocks** for 5 real articles.
- **Product summaries** are maintained twice: once hard-coded in `HomeView.tsx` and `ProductsView.tsx`, once in `src/data/products/*.ts`. They already disagree (PostureOne, AMS). In Sanity, product cards must reference the product document's `summary` field, not copy it.
- **AMS page** says the same thing twice: in "What AMS covers" ("Enrollment workflows: Guided enrollment for pilots, new starters…") and again in the documentation tabs ("Enrollment workflows guide pilots, new starters and replacements…").
- **Key model pages** repeat their one-line description 3 times per page. For example, AUTH Bio Touch says "A single touch confirms the person is present at sign-in, paired with FIDO2 verification on the key" in the hero, the Overview tab and "What sets it apart".

### 3.4 Claims and statistics that need evidence

`docs/compliance/claims-and-evidence-register.md` covers **only the four case studies**, so nothing else on either site has a register entry. Within the register itself:
- All four `evidenceLink` URLs (`https://xsignon.com/compliance/evidence/case-*.pdf`) return **404**, so the register's own runtime guard would fail in production. Today it passes only because the guard checks that the string starts with `https://`.
- The "Named Approval Owner" values are role descriptions ("Chief Information Security Officer, UAE Banking Group"), not named people.
- The register marks the healthcare, electrical and IT studies **APPROVED** with claims ("maintaining strict HIPAA compliance", "100% biometric-only authentication", "zero public cloud dependencies"), while the pages themselves say "Case details pending". One of the two is wrong.
- The register claims banking had "zero credential theft incidents recorded". This appears nowhere on either site and has no evidence.
- `content-approval-tracker.md` marks Privacy and Terms "Approved … data rights clear" while both are placeholders. It also cites an "SLA (99.99%)" for /enterprise that is not on the page. **Treat both docs as unreliable** until they are re-done against the real pages.

| Claim | Where | Problem | Action |
|---|---|---|---|
| "500K+ Identities Protected", "1M+ Data Assets Secured", "14+ Industries" | Live home, About, 6 solution and product heroes | No source; "Data Assets Secured" is undefined | Do not migrate unless sourced |
| "More than 99.9% Uptime SLA Across Deployments", "24/7 Security Visibility", "25+ Years of Combined Expertise" | Live home | No SLA document. "Combined expertise" is a weak, padded metric. | Drop, or publish the SLA |
| "80%+ of breaches involve a compromised identity … Verizon DBIR, 2024" | Live identity page (hidden `d-none`, but crawlable) | The attribution cannot be verified (DBIR 2024's headline identity figures differ) | Delete, or re-cite exactly |
| "82:1 machine-to-human identity ratio … IDSA, 2025" | Same | Commonly attributed to CyberArk, not IDSA | Delete or cite correctly |
| "75% reduction … Saviynt, 2024" | Same | A vendor claim presented as XSignOn evidence | Delete |
| "8–12 weeks to initial governance coverage" | Same (hidden) | Delivery commitment with no evidence | Delete |
| "cut login time by roughly fifteen minutes daily" | Live passwordless-authenticators | No source; healthcare case does not state it | Delete unless the case study publishes it |
| "−78% tickets", "−92% phishing", "~8s/login saved" | Live ROI calculator | "observed XSignOn customer outcomes" with no source | V2 removed these. Keep them out. |
| "Eliminates phishing attacks", "Zero account takeovers", "Military-strength encryption" | Live AUTH Bio and AUTH Bio Touch | Absolute claims | Use "phishing-resistant (FIDO2)" |
| "expected to withstand the advent of quantum computing" (NLSS patent) | Live XSense | Speculative, and the patent (US 9,800,408) belongs to Ensurity, not XSignOn | Attribute it or drop it |
| "World's leading breach containment platform" | Live home partner block (Illumio, unnamed) | Partner superlative presented as fact | Name the partners with permission, or drop |
| "Typically, engagements start showing traction in a matter of weeks" | Live home FAQ | Vague and unprovable | Drop |
| "The EU AI Act enforces in Aug 2026" | Live EvalOne | Now in the past (today is Nov 2026), so stale | Rephrase as current obligations |
| "as proven in critical infrastructure deployments" | V2 `/enterprise` (air-gapped) | Relies on the electrical case, which is "details pending" | Link to the case once it is sourced, else remove |
| "FIDO2 certified" (all 4 keys, compare table) | V2 Keys pages | Needs FIDO Alliance certificate IDs and level | Add the cert IDs to the spec table |
| SOC 2, ISO 27001, PCI DSS, HIPAA in "Standards posture" | V2 Home, Solutions, Enterprise | Implies certification. Home has a disclaimer ("These are standards, not customers or integrations"); Enterprise and Solutions do not. | Add "aligned to", plus a disclaimer in the singleton |
| "Non-Human Identities represent over 80% of enterprise credentials today" | V2 `/thinking` LinkedIn mock | No source, inside fabricated posts | Remove the whole block |
| LinkedIn reaction counts (142/218/189…) | V2 `/thinking` | Fabricated social proof | **Remove before launch** |

### 3.5 Valuable live content missing from V2

1. **Legal:** the full Privacy Policy and Terms. These include the SMS/text-messaging opt-in and opt-out policy, the "SMS opt-in records are retained for a minimum of four years" commitment, Texas governing law (Collin County), and "XSignOn Corporation" contact details. The live forms' SMS consent text ("By providing your phone number, you agree to receive a text message…") relies on these pages, and carrier 10DLC/TCPA compliance usually does too.
2. **Hardware specs** (live `/auth-bio-touch`): FIDO2 + PIV, dual USB-A/C, <750 ms authentication, 20,000+ insertion cycles, FIPS 140-2 module, up to 30 resident-key accounts, 19×52×6 mm, 7 g, operating temperatures. The other three models have similar data. V2 replaces all of it with "Confirm spec".
3. **Case-study facts:** customer type and size ("Multibillion-Dollar Global Healthcare MNC"), environment (Azure AD, Hybrid AD, Intune, DevOps), dates, components (XSense IdP, XSenseCPP, AMS Agent Tool), and the banking key-management controls (1–5 fingerprints, disabled PIN fallback, single Microsoft account per key, remote reset). V2 has the dates and headline only.
4. **AMS documented deployments** (live): Middle East bank (customer cloud), Indian private bank, Indian manufacturing unit (on-prem).
5. **XSense MFA targets** (Windows/RDP via CPP, network devices via RADIUS/TACACS relay, SAML/OIDC apps, SDK/API), the Verify app (passkey, OATH TOTP), and the patent reference.
6. **Credibility signals:** the Identity Week America startup-pitch finalist mention (verify and date it), and partner names (enQase, Symmetry, Illumio, plus the key OEM) if contracts allow.
7. **Careers:** the "What We Offer" list and the email route ("send your resume … to info@xsignon.com"). V2 routes applicants to the sales contact form with "choose 'Careers' as the reason".
8. **Company facts for About:** the live About has the mission statement, the "By role" audience list (CISOs, CIOs, COOs, Founders…) and the "product and services company" FAQ answer. All are useful positioning. V2 About never says who XSignOn is for.
9. **FAQ content** with search value: "What is FIDO2…", "Does XSignOn store biometric data?", "Will this work with our current IdP? (Okta, Ping, Entra ID)", "What are ML-KEM and ML-DSA?", "What is shadow AI?". The V2 solution pages have **no FAQ at all**.

Not missing: the address, phone and email are on the V2 `/contact` page.

**Third-party attribution risk (decide before migrating):** three of the four live case studies say "**The Ensurity Solution**" and describe Ensurity implementing its own products (ThinC-AUTH, AMS). XSense is described as "Ensurity's XSense IAM/IdP solution". V2 relabels all of this as "supplied and supported by XSignOn" and drops Ensurity. Whichever is commercially correct, legal must confirm that XSignOn may present these deployments as its own proof. If not, frame them as "partner deployments".

### 3.6 SEO and metadata (new site)

- **Every title is doubled.** `layout.tsx` sets `template: "%s | XSignOn"`, and every page title already ends in "| XSignOn" or "· XSignOn". Results include "Contact Us | XSignOn | XSignOn" and "AMS | Asset Management System for Passwordless Keys | XSignOn | XSignOn" (71 characters). Case-study titles reach 79–89 characters and articles 78–115. **Fix:** drop the brand from page titles (let the template add it), or use `title.absolute`.
- **Generic titles:** "Our Products", "Solutions · XSignOn", "Our thinking", "Proof & Case Studies · XSignOn". The live titles were more descriptive ("Passwordless Authenticators & FIDO2 Security").
- **Mixed separators:** `|`, `·` and `–` are all in use. Standardise on `|`.
- **Meta descriptions:** Home is 200 characters (too long). Key model pages are 51–66 characters (too short). Most others are 94–135 characters (short of the 140–160 target). Only 4 pages land in 140–160. Live insight "news-details1" had a 681-character description.
- **Canonicals:** missing on `/`, `/thinking`, every `/thinking/*`, `/thinking/industry` and `/unsubscribe`. On product and key-model pages the canonical renders as `http://localhost:3000/...` because `metadataBase` is not set to `SITE_URL`. `/products/keys` and `/products/passwordless-keys` both render the same page (the canonical points to `passwordless-keys`, but the sitemap lists `/products/keys`).
- **H1s:** all unique on V2. Several are bare labels with no keyword ("Proof", "Careers", "Terms", "Our products", "Contact us"); acceptable for utility pages, weak for Proof and Careers. `/contact/thank-you` has **no H1**. Live insight articles all share the H1 "XSignOn Insights" (the real title is an H2); V2 fixes this.
- **Indexing:** `layout.tsx` noindexes every page outside production, but `createPageMetadata` hard-codes `index: true`. As a result, About, Careers, Contact, Enterprise, Privacy, Terms and ROI are **indexable on staging**.
- **Thin content:** the 5 solution pages (135–156 words), 3 case studies (143–177) and the Industry Thinking stubs risk "thin content" treatment, and they replace live URLs that ranked with 800+ words.

### 3.7 Jargon and buzzword density

| Signal | Live (35 pages) | New (40 pages) |
|---|---:|---:|
| seamless / robust / cutting-edge / enterprise-grade / future-proof / "zero disruption" | 9 / 2 / 1 / 4 / 2 / 1 | 0 |
| "defensible" | 14 | 0 |
| "pressure" | 31 | 0 |
| "friction" | 19 | 0 |
| Filler sentence endings "daily", "today", "every day" | 30 / 25 / 4 | 1 / 3 / 1 |
| Keyword stuffing ("AI business process automation", "enterprise technology solutions", "quantum safe security [systems/solutions]", "passwordless identity security", "enterprise website security") | 11 / 8 / 11 / 5 / 5 | 0 |
| **New V2 tics:** "with confidence" / "confident" | — | 11 / 4 |
| "clarity", "with ease", "calm", "love", "smooth" | — | 5 / 3 / 2 / 3 / 5 |
| "evidence" | — | **83** (about 2 per page; the word has stopped meaning anything) |
| "owner / named owner" | — | 47 |

The live site's sentences end in throwaway adverbs: "…weaken security behavior across the organization", "…without slowing down the people who need it", "…for teams everywhere", "…harder daily for employees everywhere". V2 has swapped buzzwords for **soft reassurance**: "keep evidence ready, with confidence", "Sign-in your team will love", "arranging replacements with ease", "one calm sign-in flow". It also says "evidence" or "owner" in nearly every sentence. Cut "with confidence", "with ease" and "calm" entirely, and allow "evidence" at most once per section.

### 3.8 CTA clarity

- **V2** standardised on "Book a strategy call" (end of 34 pages), which is good. But Home ends with "Contact us" and the header says "Contact Us", while About has both "Contact our team" and "Contact us". Home has **21** CTA links (7 × "View more", including the duplicated XDMACsec card). The "Our thinking" section on Home is headed by **"Read the case studies"** linking to `/proof`, which is mislabelled. On Home, "Passwordless Security → View solution" opens a product page. Every Careers CTA ("Apply through Contact") sends job seekers into the sales form.
- **Live** had 12 different primary CTAs for the same action: "Book a Strategy Call", "Talk to Our Team", "Book an Identity Strategy Call", "Schedule an Identity Strategy Session", "Review My Auth Stack", "Review My Posture", "Request My AI Review", "Plan My Access Review", "Start My Workflow Review", "Talk to a Security Strategist", "Start the Conversation", "Get Started Now". Each solution page also carried a 9–10 field qualification form.
- **Recommendation:** one primary CTA ("Book a strategy call"), one secondary per page type ("See the case study", "View specs", "Read the article"), and "Contact us" only in the header.

---

## 4. Per-page audit

Format: **Purpose / audience · Key message · Words (live → new → target) · Keep / Cut / Merge / Move · Issues.**

### 4.1 Home: `/`
- **Purpose / audience:** first impression for CISOs and IT leaders at mid-market and regulated firms; routes to products.
- **Key message:** "XSignOn builds security products for identity, passwordless sign-in, AI evaluation and post-quantum readiness."
- **Words:** 1,012 → 672 → **450**.
- **Keep:** the V2 H1 "Protect identity. Govern risk. Prepare for what's next." (strong, 7 words), the product carousel (with corrected copy), the Ecosystem block, and the standards strip with its disclaimer.
- **Cut:** the second XDMACsec card; the duplicated article title/date text (each teaser renders its title twice); 3 of the 5 article teasers; and either "What XSignOn does" or the "Ecosystem" block. Both say identity / data and AI / passwordless / quantum in 4 items with near-identical wording ("Sign in without passwords" vs "Passwordless Security"), so keep one.
- **Move:** the PhishLens "Free check: can someone send email as your domain?" widget is fine. Give it its own line of context, and check its privacy notice, because the domain is sent to an external service.
- **Issues:**
  - PostureOne card copy contradicts the product page.
  - AMS card ("Access requests, approvals and periodic reviews") contradicts the product page.
  - "XDMACsec" is unexplained and probably misspelt.
  - British "enrolment" and "behavioural".
  - Meta description is 200 characters.
  - No canonical.
  - The live home's strongest asset, the Identity Week finalist mention, is gone. Add it as a one-line credibility strip if it is still current.
  - Live claims (500K+, 99.9% uptime, 25+ years) correctly not migrated.

### 4.2 About: `/about` (from `/about-us/`)
- **Purpose / audience:** buyers checking legitimacy; candidates.
- **Key message:** "A McKinney, Texas cybersecurity product company focused on identity, passwordless authentication and AI evaluation."
- **Words:** 1,201 visible + 1,418 hidden → 352 → **400**.
- **Keep:** the V2 structure (Who / What / How / Why / Careers / Contact).
- **Add:** one sentence on who it is for (from the live "By role" list), the founding year and leadership names (the live `/team` redirect target "#who-we-are" implies leadership content that does not exist), and the standards singleton.
- **Cut:** the fake "Our thinking" block (5 non-existent articles) and the "Named owner" orphan label, which renders twice as stray text from an illustration.
- **Issues:**
  - The live About hid 1,418 words (`d-none`): a duplicate hero, mission and vision, 6 values, and an FAQ. These are crawlable but invisible, which is a cloaking-style risk; do not carry it over.
  - Live title "About Xsignon" (lowercase s).
  - V2 H1 "Security built around identity, governance, and what comes next" is vague. Prefer "A cybersecurity product company built around identity".
  - CTA "Passwordless Authenticators →" uses the wrong product name.
  - FRE 18 is low because the copy is a list of abstract nouns ("identity, technology, data and risk baseline").
- **Aliases:** `/about/who-we-are`, `/about/what-we-do` and `/about/how-we-work` 307 to anchors. Make them 308, or delete them; the footer links to them.

### 4.3 Careers: `/careers`
- **Purpose / audience:** security engineers and analysts.
- **Key message:** "A small, senior team in McKinney, TX; two open roles; apply directly."
- **Words:** 652 → 163 → **250**.
- **Keep:** the V2 three principles and the role cards.
- **Restore:** a 4-bullet benefits list (compensation reviewed annually, hybrid/remote, client exposure, growth path) and a direct application route (careers@ or info@ email, or an ATS link) instead of "Apply through Contact".
- **Cut:** live filler like "We don't have a ping-pong table. We don't have a foosball room."
- **Issues:** H1 is just "Careers" (use "Careers at XSignOn"). The title is fine ("Build Sign-in People Trust", though "sign-in" is used as a noun). Job descriptions need location, type, and posted date (JobPosting schema requires `datePosted`).

### 4.4 Contact: `/contact`
- **Purpose:** convert.
- **Key message:** "Talk to a person; here is how to reach us."
- **Words:** 34 → 82 → **70**.
- **Keep:** the address, phone, email and "What happens next".
- **Cut:** "This form is designed to be quick and welcoming." (visitor-irrelevant), and "Every inquiry goes to a person who replies with care" (soft).
- **Add:** response-time expectation ("within one business day") and LinkedIn link.
- **Issues:** title "Contact Us | XSignOn | XSignOn". H1 sentence case "Contact us" while the header says "Contact Us".

### 4.5 Enterprise: `/enterprise` (new)
- **Purpose:** large-estate buyers; deployment models.
- **Key message:** "One view of every identity, deployable as SaaS, on-premises or air-gapped."
- **Words:** 170 → **170**.
- **Keep:** the deployment-model trio.
- **Issues:**
  - The mock console percentages (94% / 86% / 90%) need an "Example view" label.
  - "as proven in critical infrastructure deployments" is unsupported until the electrical case is sourced.
  - The standards list (6 items) differs from the 9 on Home and Solutions.
  - "command.xsignon.app" appears as a fake URL in the mock; confirm that it is not a real or reserved domain.
  - The page also duplicates the deployment-model block on `/solutions`. Keep it here and link from Solutions.
  - The H1 "Every identity. Fully in control." has no keyword. Use "Enterprise identity security" as the eyebrow or H1.

### 4.6 Products hub: `/products`
- **Purpose:** compare and choose.
- **Key message:** "Five products, one sign-in and governance program."
- **Words:** 313 → **250**.
- **Keep:** the compare widget.
- **Cut:** the 5 article teasers (they duplicate Thinking).
- **Issues:** the PostureOne and AMS cards contradict their pages; the compare widget says "AUTH Touch"; "Sign-in your team will love" and "one calm flow" are too soft; title "Our Products | XSignOn | XSignOn" (32 characters, generic). Suggested title: "Identity Security Products: PostureOne, EvalOne, XSense, Keys | XSignOn". It runs 66 characters with the brand suffix, so trim further.

### 4.7 PostureOne: `/products/postureone` (from `/postureone/`)
- **Purpose:** web and cloud security buyers.
- **Key message:** "Website and cloud security posture: firewall, traffic, file integrity, CSP, DSPM and segmentation in one view."
- **Words:** 798 → 325 → **350**.
- **Keep:** the six capability cards and the framework mapping note ("Nothing is shown as mapped until its source is connected…"), which is excellent honest copy.
- **Restore** from live: one sentence on incident response (isolate, redirect visitors to a safe page) and "Works across AWS, Azure and Google Cloud". Both are specific and differentiating.
- **Cut:** framework steps 04–06 ("Govern AI with confidence", "Keep exposure low", "Move with confidence") are filler.
- **Issues:**
  - The positioning conflict (see 3.2).
  - The meta-description fallback in `postureone.ts` is the identity-inventory tagline.
  - The hero subline runs 49 words.
  - Live keyword stuffing ("enterprise website security" 5×) is gone, which is good.

### 4.8 EvalOne: `/products/evalone` (from `/pages/evalone/`)
- **Purpose:** AI governance and security leads.
- **Key message:** "Evaluate AI systems against NIST AI RMF, OWASP, MITRE ATLAS, EU AI Act and ISO/IEC 42001, and export evidence."
- **Words:** 309 → 386 → **350**.
- **Keep:** the framework table (concrete).
- **Restore:** the live six-layer list in compressed form (target abstraction, red team, guardrails, evaluation, crosswalk, reporting). V2 mentions "a six-layer evaluation framework" but never names the layers. Also restore the red-team scope ("prompt injection, jailbreaks, data leakage, tool abuse"), which is concrete and searchable.
- **Cut:** "AI is moving into production with momentum, and reviewers value clear evidence…" (throat-clearing), and "with ease".
- **Issues:** the live "EU AI Act enforces in Aug 2026" is stale; positioning conflicts with the tracker ("Phishing Simulation").

### 4.9 XSense: `/products/xsense` (from `/xsense`)
- **Purpose:** IAM architects.
- **Key message:** "Software identity provider with MFA and identity analytics, deployable SaaS, on-prem or air-gapped."
- **Words:** 315 → 238 → **250**.
- **Restore:** the MFA targets list (Windows/RDP, RADIUS/TACACS, SAML/OIDC, SDK) and the Verify app factors (passkey, TOTP). These are the most useful facts on the live page.
- **Cut:** the placeholders "Roadmap details confirmed at release" and "Patent details pending publication". Hide the tabs instead.
- **Issues:** the patent and Ensurity ownership need attribution (3.5). The home card "Live behavioural signals … adaptive decisions" overstates what the page describes. Live H1 "Xsense".

### 4.10 AMS: `/products/ams` (from `/ams`)
- **Purpose:** IT ops running key fleets.
- **Key message:** "AMS tracks every Passwordless Key from delivery to retirement: enrollment, replacement, audit."
- **Words:** 269 → 409 → **300**.
- **Cut:** the doc-tab paragraphs that restate "What AMS covers".
- **Restore:** concrete controls from live (AD/AAD/LDAP sync, 1–5 fingerprint enrollment limit, disable PIN fallback, multi-tenant, SIEM export) and the 3 documented deployments, once approved.
- **Issues:**
  - "Keys that need replacement are handled through AMS, with clear tracking and support from XSignOn" repeats "support from XSignOn" twice in two sentences.
  - "arranging replacements with ease".
  - Title is 71 characters with the doubled suffix.
  - Home and products-hub copy describe a different product.

### 4.11 Passwordless Keys hub: `/products/passwordless-keys` (from `/passwordless-authenticators/`)
- **Purpose:** passwordless buyers choosing hardware.
- **Key message:** "Four FIDO2 biometric key models, delivered, enrolled and replaced through AMS."
- **Words:** 850 → 302 → **300**.
- **Keep:** the "Works with what you have" paragraph.
- **Replace** "Spec confirmation pending" ×4 and the "Confirm spec" table with real data from the live pages.
- **Restore:** live "Who needs this" (healthcare shared workstations, BFSI, manufacturing shift changes), compressed to one line, and the AUTH Bio Desktop "up to 3 users per key" fact. Restore the IdP FAQ from live enterprise-tech ("overlaying Okta, Ping, or Entra ID").
- **Issues:** live "Built For Mixed" is a truncated heading; live "fifteen minutes daily" is unsourced; `/products/keys` duplicate URL.

### 4.12–4.15 Key models: `/products/passwordless-keys/{bio,pro,touch,desktop}` (from `/auth-bio*`)
- **Purpose:** spec check before purchase.
- **Key message:** one differentiator per model (Bio: everyday fingerprint; Pro: FIDO2 + PIV/PKI for regulated; Touch: portable dual-USB; Desktop: shared workstations, up to 3 users).
- **Words:** 271–411 → 254–259 → **about 120 words of prose + spec table**.
- **Cut:** the sentence repeated 3× per page, and the "Platforms … Confirm spec" lines.
- **Move:** the full spec sheet (dimensions, temperatures, algorithms) into a downloadable PDF datasheet, keeping 8 key rows in the table.
- **Issues:**
  - Meta descriptions of 51–66 characters.
  - Canonical renders as localhost.
  - Live absolute claims ("Zero account takeovers", "Military-strength encryption") must not return.
  - Live narration ("The deck identifies it as…") must not return.

### 4.16 Catalog: `/catalog/` (live only)
JS-rendered with 0 crawlable words. Drop it and redirect to the Keys hub.

### 4.17 Compare: `/products/compare`
- **Purpose:** justify the switch from passwords, OTP and legacy MFA.
- **Key message:** "Only FIDO2 keys plus AMS give owner-only, hardware-backed, managed sign-in."
- **Words:** 203 → **200**.
- **Keep** as is; it is the clearest page on the new site (FRE 68).
- **Issues:** "Evidence ready for access reviews: Yes, in PostureOne and XSense" re-introduces the PostureOne identity positioning; it is inconsistent with the product page. `/compare` 307s here; make it 308.

### 4.18 Solutions hub: `/solutions`
- **Purpose:** problem-first entry.
- **Key message:** "Pick the problem; see which products solve it."
- **Words:** 413 → **300**.
- **Cut:** the 5 fake article teasers, and the deployment-model block (it lives on Enterprise).
- **Issues:** the "Teams want…" sentence pattern ×5. Quantum-Safe "Delivered by PostureOne, Passwordless Keys" is a stretch: neither product does cryptographic inventory. Say "Advisory + roadmap; sign-in hardened with Passwordless Keys". Title "Solutions · XSignOn | XSignOn".

### 4.19 Identity Governance: `/solutions/identity-governance`
- **Purpose:** IAM and governance buyers. Formerly the site's biggest page.
- **Key message:** "One view of who can reach what, with reviews on a cycle and passwordless sign-in for staff."
- **Words:** 831 visible (+ about 1,660 hidden) → 156 → **300**.
- **Keep:** the V2 four bullets.
- **Add:** a 3-row "where it starts" problem list from live (excess privilege, orphaned accounts, audit blind spots), 2 FAQs (biometric data storage, works over existing IAM), and one sourced proof link.
- **Cut** (never migrate): the hidden `d-none` sections with misattributed statistics, the "8–12 weeks" commitment, and integration claims ("Pre-built integrations with Workday, SuccessFactors, ServiceNow, Okta, and SailPoint"). The latter needs evidence before it reappears.
- **Issues:** the live meta description is 198 characters. The live page has two separate CTAs and a 10-field form.

### 4.20 AI and Digital Governance: `/solutions/ai-and-digital-governance`
- **Key message:** "Inventory AI use, map it to frameworks, keep the evidence current."
- **Words:** 813 → 148 → **300**.
- **Add:** the shadow-AI problem framing (3 lines) and 2 FAQs (what NIST AI-RMF is, what shadow AI is).
- **Cut:** "XSignOn keeps that evidence current and ready to share with confidence", and "Evidence that stays current as AI use changes, with evidence current at every step" (says "evidence current" twice in one bullet).
- **Issues:** the live FAQ "How does micro-segmentation protect our AI infrastructure?" is off-topic. Live "AI and governance" is used as a noun phrase.

### 4.21 Quantum-Safe Security: `/solutions/quantum-safe-security`
- **Key message:** "Inventory your cryptography now and plan a phased move to NIST PQC (ML-KEM, ML-DSA)."
- **Words:** 885 → 140 → **300**.
- **Add:** the "harvest now, decrypt later" explanation (2 sentences), the ML-KEM/ML-DSA FAQ, and "no rip-and-replace" (from the live FAQ "Do I need to replace all my hardware?").
- **Cut:** live repetition ("quantum safe security systems/solutions" 11×; "Why Most Organizations Wait Too Long" and "Why This Risk Matters Now" say the same thing).
- **Issues:** "Start with the inventory, with confidence." The partner (enQase) delivering PQC is unnamed.

### 4.22 Business Process: `/solutions/business-process`
- **Key message (V2):** "Access reviews and approvals as a governed, repeatable cycle."
- **Words:** 824 → 145 → **250**.
- **Issue — topic drift:** the live page is about **workflow automation** (handoffs, routing, approvals across finance, onboarding and vendor processes). V2 turned it into **access-review governance**, which overlaps Identity Governance. Decide: either restore the workflow scope (and keep the URL), or merge into Identity Governance and 308 the URL there.
- **Cut** (live): "AI business process automation" 11×; "daily" at the end of 7 sentences.

### 4.23 Enterprise Technology: `/solutions/enterprise-technology`
- **Key message:** "Add phishing-resistant sign-in over your existing IdP (Entra ID, Okta, Ping) without replacing it."
- **Words:** 826 → 135 → **300**.
- **Restore:** the live FAQ set (lost device, offline sign-in, IdP overlay, new-hire pre-registration, no biometric storage). It is the most useful buyer content on the old site and fits in about 120 words.
- **Issues:** the V2 copy "Identity sits across every system you run" is abstract. This page overlaps `/enterprise` (deployment models); cross-link, do not duplicate.

### 4.24 Proof hub: `/proof` (from `/use-cases/`)
- **Key message:** "Four deployments: banking, healthcare, industrial, IT."
- **Words:** 202 → 281 → **180**.
- **Cut:** every "pending/sourced" notice. Show customer type, date, environment and products, which the live page already provides.
- **Issues:** H1 "Proof" (use "Customer case studies"); title separator "·"; `/case-studies/page.tsx` is dead code.

### 4.25 Banking case study
- **Key message:** "A UAE bank replaced passwords with FIDO2 biometric keys managed centrally through AMS."
- **Words:** 550 → 301 → **350**.
- **V2 is the only fleshed-out case**, but it was rewritten as narrative ("…matched the high standards of the rest of its operations") with no facts. Restore the live bullets: Hybrid AD + local ADs; per-key controls (dynamic PIN, PIN fallback disabled, one Microsoft account per key, 1–5 fingerprints, remote reset); AMS hosted in the bank's data centre with zero external access.
- **Outcome:** use the live qualitative outcomes ("centralised management across locations", "controlled fingerprint enrolment") until a number is sourced. Do not print "Sourced outcome needed".

### 4.26–4.28 Healthcare, Electrical, IT case studies
- **Words:** 430 / 600 / 482 → 157 / 177 / 143 → **300 each**.
- Every section is "Case details pending" even though the live pages contain the environment, challenges, components and capabilities. Port them, condensed to Customer / Environment / Challenge (3 bullets) / What was deployed (3 bullets) / Outcome (qualitative).
- The live healthcare page says "The XSignOn Solution" while the other two say "The Ensurity Solution". Resolve the attribution (3.5).
- **Title:** use sentence case ("Biometric FIDO2 access for air-gapped industrial systems").

### 4.29 Thinking hub: `/thinking` (from `/xsignon-insights/`)
- **Key message:** "Articles on identity, AI governance and zero trust."
- **Words:** 461 → 370 → **200**.
- **Remove:** the LinkedIn mock block (fabricated counts, "XSignON" typo), or replace it with a real embed.
- **Fix:** all 5 articles share the date "June 29, 2026". Use real publish dates.
- **Merge:** fold Industry Thinking into this page as a category filter.

### 4.30 Industry Thinking: `/thinking/industry` (from `/industry-thinking/`)
7 titles with "Full text pending". Either publish the 7 pieces or **drop the page** and 308 it to `/thinking`. The live page is a template stub ("GridTech" title, double H1, "Get Started Now" CTA).

### 4.31–4.35 Articles: `/thinking/*` (from `/xsignon-insights/news-details*`)
- **Purpose:** search and nurture.
- **Words:** 914 / 572 / 391 / 560 / 480 → 376 / 311 / 239 / 267 / 271 → **600–700 each**.
- Articles are the one place where V2 **cut too much**. They were rewritten as 250–380-word product notes, while keeping the original SEO titles. Result: "Data + AI Security Built for Visibility, Control, and Trust" now discusses AI assessment evidence, not DSPM, so the title and body no longer match.
- Pick one approach per article: keep the live depth (edited) or retitle to match the new body.
- Titles are 78–115 characters with the doubled suffix. "Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model" has a stray comma and is too long. Suggested: "Non-human identities need owners, scopes and reviews".
- Add author names (not "XSignOn Team") for E-E-A-T.

### 4.36 White paper: `/white-papers/zero-trust-posture-guide`
Unreachable (redirect chain to `/solutions`). Fix the redirect first, then give it a 120–150-word abstract, a "What's inside" list of 4 bullets, the page count, and the form.

### 4.37 ROI calculator: `/roi-calculator`
- **Key message:** "Estimate help-desk time saved from your own numbers."
- **Words:** 105 → 141 → **110**.
- **Good:** removed the live unsourced "−78% / −92%" multipliers.
- **Cut:** both "being sourced" sentences; keep "Estimate only, based on your inputs."
- **Fix:** live H1 "What would XSignOn save your business?" became "ROI Calculator". Prefer "Estimate your password-reset savings".

### 4.38–4.39 Privacy and Terms
**Launch blockers.** Port the live text verbatim for legal review: SMS opt-in and opt-out, 4-year retention, Texas law, and the "XSignOn Corporation" address. The V2 sub-processor data (`src/data/legal/sub-processors.ts`, covering Resend, Sentry and others) should be added to Privacy, which the live policy lacks. Also show a "Last updated" date. H1 "Terms" → "Terms and conditions".

### 4.40 Unsubscribe, Thank-you, Verify
- Unsubscribe has 1 word of copy. Add the live sentence ("Use the form below to remove your number…"). Note that live unsubscribes **phone numbers** (SMS) while V2 unsubscribes **email**; confirm SMS opt-out still exists somewhere.
- Thank-you has no H1. Add "Thanks, we'll reply within one business day."

---

## 5. Condensed rewrites for the five most bloated pages

Selection is by live visible plus hidden words: About (2,619), Identity Governance (about 2,490), Home (1,012), Quantum-Safe (885) and Passwordless Authenticators (850). Target voice: plain, specific, US English, no reassurance adverbs, one idea per sentence, nouns that a buyer can check.

### 5.1 About
**Hero, before (live, 89 words):**
> "Built for Clarity, Control, and Next-Stage Growth. There is a version of growth that looks good on a slide deck but falls apart under regulatory scrutiny or a security incident. XSignOn exists to make sure that it is not the version our clients build. We are a governance, cybersecurity, and transformation company — and we work with organizations navigating the real pressure of modernizing, scaling, and staying defensible all at once…"

**Hero, before (V2, 26 words):** "Security built around identity, governance, and what comes next. XSignOn develops cybersecurity products and security approaches that help organizations strengthen access, govern emerging technology, and prepare for evolving digital risk."

**Hero, after (24 words):**
> **H1:** A cybersecurity product company built around identity
> **Sub:** XSignOn makes passwordless keys, identity and AI-evaluation software for regulated mid-market teams. Based in McKinney, Texas.

**Body: "What makes the model different", before (live, 92 words):** "Most advisory firms separate strategy from delivery. Most vendors separate products from outcomes. XSignOn connects strategy, governance, execution, and technology into one working model. We help clients identify the right priorities, shape solutions around real operating conditions… That is the difference between a roadmap that looks good and an operating model that actually holds…"

**After (38 words):**
> **Products and delivery from one team.** We sell the keys, the software that manages them, and the rollout. One contract covers hardware, enrollment and replacements, so you are not coordinating three vendors when a key is lost.

### 5.2 Identity Governance
**Hero, before (live, 30 words + stat bar):** "Identity Governance · 14+ Industries · 1M+ Data Assets Secured · 500K+ Identities Protected · Book an Identity Strategy Call · Where Access Risk Actually Begins: Weak identity governance often starts with scattered access decisions, excess privilege, inconsistent reviews, and authentication friction that quietly create security gaps across growing organizations today."

**Hero, before (V2, 40 words):** "Teams want one accountable sign-in for every person and agent. Accounts grow across systems, and leaders want a single, clear view of who can reach what and why, with approvals and provenance for every access."

**Hero, after (27 words):**
> **H1:** Identity governance
> **Sub:** See who and what can reach each system, from staff and contractors to service accounts and AI agents. Review access on a schedule, and remove passwords.
> **CTA:** Book a strategy call

**Body: problem section, before (live, 5 cards, 92 words):** "Password Risk: Weak credentials and reused passwords still create avoidable exposure across workforce, partner, and customer access environments daily. Excess Privilege: Overprovisioned accounts expand your attack surface and make access governance harder to defend during audits. Orphaned Accounts: … Access Friction: … Audit Blind Spots: …"

**After (3 rows, 36 words):**
> **Where access risk starts**
> - **Excess privilege.** Accounts keep permissions after role changes.
> - **Orphaned accounts.** Leavers and old service accounts stay active.
> - **Reused passwords.** One phished password opens many systems.

### 5.3 Home
**Hero, before (live, 41 words + banner H1):** "SECURE YOUR CODE. SCALE WITHOUT LIMITS. Selected as a finalist for the Identity Week America Startup Pitch! 🚀 XSignOn delivers AI-powered cybersecurity, identity governance, and quantum safe security solutions built for organizations that cannot afford to choose between protection and progress. One framework. Total coverage. Zero disruption."

**After (keep the V2 H1; tighten the sub; 33 words):**
> **Eyebrow:** Identity, governance and security
> **H1:** Protect identity. Govern risk. Prepare for what's next.
> **Sub:** Passwordless keys, identity analytics and AI evaluation for regulated mid-market teams.
> **CTAs:** Explore products · Book a strategy call
> **Credibility line:** Identity Week America 2025 startup finalist (confirm year)

**Body: product cards, before (V2):** PostureOne "A living inventory of every person, device and agent, scored continuously." AMS "Access requests, approvals and periodic reviews with a complete trail." XDMACsec "Email security for your organization." (×2)

**After (≤ 70 characters each, matching the product pages):**
> - **PostureOne:** Website and cloud security posture in one view.
> - **Passwordless Keys:** FIDO2 biometric keys, delivered and enrolled for you.
> - **EvalOne:** Test AI systems against NIST AI RMF, OWASP and the EU AI Act.
> - **XSense:** MFA and identity analytics, in SaaS, on-premises or air-gapped.
> - **AMS:** Track every key from delivery to replacement.
> - *(XDMACsec: remove until the product page exists)*

### 5.4 Quantum-Safe Security
**Hero, before (live, 23 words):** "Why This Risk Matters Now: Quantum safe encryption matters today because sensitive data stolen now may remain valuable long enough to be decrypted when current cryptography becomes vulnerable."

**Hero, before (V2, 35 words):** "Teams are preparing early for post-quantum methods and want a clear inventory of the cryptography they rely on today. With that inventory in place, planning becomes confident, sequenced and ready to share."

**Hero, after (29 words):**
> **H1:** Quantum-safe security
> **Sub:** Data stolen today can be decrypted later. We inventory your keys, certificates and algorithms, then plan a phased move to NIST post-quantum standards.

**Body: "How we approach it", before (live, 4 steps, 108 words):** "Discover Current Dependencies: Start by identifying encryption dependencies, long-retention assets, and cryptographic assumptions already embedded across infrastructure, applications, workflows, and connected third-party environments. Prioritize What Lasts Longest: … Plan Controlled Transition: Build a phased roadmap for quantum safe security systems that supports risk reduction, continuity, and measurable progress without operational overreaction. …"

**After (3 steps, 42 words):**
> 1. **Inventory.** List where encryption is used: keys, certificates, protocols, vendors.
> 2. **Prioritize.** Start with data that must stay secret for 10+ years.
> 3. **Migrate in phases.** Move to ML-KEM and ML-DSA system by system, without replacing hardware that still works.

### 5.5 Passwordless Authenticators → Passwordless Keys
**Hero, before (live, 31 words):** "Passwordless Authenticators Built For Enterprises · Why Login Breaks Under Pressure: Passwords, shared devices, phishing attempts, and scattered controls leave teams slower, less secure, and too dependent on login habits that fail under daily pressure today."

**Hero, before (V2, 41 words):** "Enterprise FIDO2 biometric security keys, delivered and supported by XSignOn. Keys provide verified authentication that only the account owner can complete. Staff carry their key with confidence, enrollment included, and XSignOn handles the hardware from order to replacement."

**Hero, after (28 words):**
> **H1:** Passwordless Keys
> **Sub:** FIDO2 biometric security keys for staff sign-in. A fingerprint on the key replaces the password. We ship, enroll and replace keys through AMS.

**Body: model cards, before (V2):** "AUTH Bio: Fingerprint-based sign-in for everyday staff roles. Spec confirmation pending: full specifications are confirmed before ordering." (×4)

**After (one line plus 3 facts each, sourced from live specs):**
> - **AUTH Bio:** Everyday fingerprint key. FIDO2 · USB · Windows Hello / Entra ID sign-in.
> - **AUTH Bio Pro:** For regulated teams. FIDO2 + PIV smart card · certificate login.
> - **AUTH Bio Touch:** Pocket-size, dual USB-A/C. <750 ms sign-in · 7 g · FIPS 140-2 module.
> - **AUTH Bio Desktop:** Shared workstations. Up to 3 users per key · locks on removal.

---

## 6. Content style guide for Sanity editors

### 6.1 Field limits (enforce with Sanity `validation`: a hard max, and a warning at the soft max)

| Field | Soft max | Hard max | Notes |
|---|---:|---:|---|
| Eyebrow | 30 characters | 40 | 2–4 words, sentence case, no full stop |
| H1 | 50 characters | 65 | Contains the page's primary keyword. Product pages: name + descriptor in the eyebrow or sub. |
| Hero sub | 140 characters (about 22 words) | 180 | One or two sentences. Says what it is and who it is for. No adjectives of feeling. |
| Section H2 | 45 characters | 60 | A statement or a noun phrase, not a question, except in FAQ |
| Section intro | 160 characters | 220 | Optional; delete if it restates the H2 |
| Card title | 30 characters | 40 | 2–5 words |
| Card body | 120 characters | 160 | One sentence, one fact |
| List bullet | 80 characters | 110 | Starts with a noun or verb; no trailing "daily/today/everywhere" |
| FAQ question | 70 characters | 90 | A real buyer question |
| FAQ answer | 300 characters | 400 | Answer in the first sentence |
| CTA label | 20 characters | 25 | Verb first. Allowed set: "Book a strategy call", "Contact us", "View specs", "Read the case study", "Read the article", "Download the guide", "Explore products". |
| Product summary (single source, reused on every card) | 70 characters | 90 | Must match the product page hero |
| Case-study outcome | 140 characters | 200 | Must reference a claim-register ID |
| Meta title | 50 characters | 60 | **Without** "\| XSignOn". The layout template appends it, and the total must stay ≤ 60, so the editor field max is about 50. |
| Meta description | 140 characters | 160 | Unique; includes keyword and benefit; no quotes |
| Image alt | — | 125 | Describe the image, not the marketing message |

### 6.2 Page-length budgets (body words)

| Page type | Budget |
|---|---|
| Home | 400–500 |
| Hub (Products, Solutions, Proof, Thinking) | 150–300 |
| Product | 250–350 + spec table |
| Hardware model | ≤ 150 + spec table + datasheet PDF |
| Solution | 250–350, including ≤ 3 FAQs |
| Case study | 250–350 |
| Article | 600–1,200 |
| Legal | as needed |

### 6.3 Tone rules
1. **Specific beats soothing.** Name the system, standard, number or step. "Works with Entra ID, Okta and Ping", not "fits your existing environment with confidence".
2. **One idea per sentence; 20-word average, 30 max.** Target Flesch reading ease of 45 or higher for marketing pages.
3. **Sentence case** for every heading, button and nav label. Proper nouns keep their case.
4. **US English** (enrollment, behavior, organization, center).
5. **"We" for XSignOn, "you" for the reader.** Avoid "Teams want…" openings.
6. **No sentence-ending filler:** "daily", "today", "every day", "everywhere", "at scale", "across the organization".
7. **No apologies or internal notes on the page.** If content is not ready, leave the optional field empty; the component hides it.
8. **Say each thing once per page.** Product descriptions come from the product document (references, not copies).

### 6.4 Banned or restricted words

**Banned:** seamless(ly), robust, cutting-edge, state-of-the-art, best-in-class, world-class, world's leading, next-gen, game-changing, revolutionary, holistic, synergy, leverage (verb), unparalleled, bulletproof, unbreakable, military-grade / military-strength, future-proof, zero disruption, effortless(ly), frictionless, empower, "total coverage", "with confidence", "with ease", calm (about software), love (about sign-in), "defensible" (as a filler adjective), "under pressure", "eliminates [attack]", "zero [account takeovers / risk]", "100% secure".

**Restricted (needs a reason):** "evidence" (at most once per section), "owner/named owner" (at most once per section), "governed", "posture", "enterprise-grade", "AI-powered" (only when the AI is described).

### 6.5 Numbers, claims and standards policy
1. **No number without a register entry.** Every statistic, percentage, customer count, time saving, SLA or uptime figure needs a `claim` document in Sanity with: claim text, source (URL or document), date, owner (a named person), and expiry (12 months). The page field references the claim; an unreferenced number fails validation.
2. **Third-party statistics** need the publisher, report name and year, and a link. Use them on articles only, not on product pages.
3. **Customer results** are published only with written approval from the customer or partner. Anonymised descriptors must be accurate ("a bank in Abu Dhabi", not "a leading bank" unless the customer approves the wording).
4. **Mock UI values** (dashboards, scores) must carry a visible "Example view" label.
5. **Standards language:** "aligned to" or "supports" for frameworks (NIST AI RMF, NIST 800-207, NIST PQC). "Certified" only with a certificate ID (FIDO2 L1/L2 cert number, SOC 2 report date). Never list SOC 2, ISO 27001 or PCI DSS in a way that implies XSignOn holds them unless it does.
6. **Absolute security claims are banned.** Use "phishing-resistant" (FIDO2), "reduces", "limits".
7. **Partner and OEM attribution:** name a partner only with a signed permission record. Where hardware or software is OEM (e.g. Ensurity ThinC-AUTH and XSense), legal decides the wording once and it lives in a reusable "attribution" field.
8. **Dates:** articles show their real publish date and a "last reviewed" date. Regulation timelines (EU AI Act) are reviewed quarterly.

### 6.6 Naming quick reference
XSignOn · PostureOne · EvalOne · XSense (XSense Verify, XSense CPP) · AMS (Asset Management System) · Passwordless Keys · AUTH Bio · AUTH Bio Pro · AUTH Bio Touch · AUTH Bio Desktop · Identity Governance · AI and Digital Governance · Quantum-Safe Security · Business Process · Enterprise Technology · FIDO2 · NIST AI RMF · NIST SP 800-207 · NIST PQC (ML-KEM, ML-DSA) · Microsoft Entra ID · post-quantum (lowercase) · passwordless authentication (lowercase, category).

---

## 7. Priority fix list

| Priority | Fix | Effort |
|---|---|---|
| P0 | Port the live Privacy and Terms (SMS terms included); remove the placeholders | S (legal review) |
| P0 | Add the ~30 live-URL redirects; remove the `/white-papers/:slug*` rule; remove `/articles/*` from the sitemap | S |
| P0 | Remove the LinkedIn mock counts and the 5 fake "Our thinking" articles in `about.ts` | XS |
| P0 | Fix the doubled title suffix; set `metadataBase`; add the missing canonicals | XS |
| P0 | Replace every "pending / confirm spec / sourced" string with real live data, or hide the section | M |
| P1 | Fix PostureOne and AMS card copy (Home, Products); remove the duplicate XDMACsec card | XS |
| P1 | Decide the Ensurity attribution; restore case-study facts and hardware specs | M |
| P1 | Grow the solution pages to about 300 words with 2–3 FAQs each; decide the Business Process scope | M |
| P1 | Re-do `claims-and-evidence-register.md` (real evidence links, named approvers) and `content-approval-tracker.md` | M |
| P2 | Merge Industry Thinking into Thinking; real article dates and authors; restore article depth | M |
| P2 | Cut the "with confidence / with ease / calm / evidence" tics site-wide | S |
| P2 | Sentence-case and US-spelling pass; one standards singleton | S |
