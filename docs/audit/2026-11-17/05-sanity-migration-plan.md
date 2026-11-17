# XSignOn: Sanity CMS and content migration readiness audit

- Repo: `D:\New folder\XSignON\XSignON Website\xsignonwebsite` (branch `Version-2`, clean, commit `239551c`)
- Stack: `next@16.4.4`, `next-sanity@13.4.0`, `sanity@6.22.0`, React 19.3. No Portable Text renderer (`@portabletext/react`) and no migration tooling (`@sanity/client` beyond next-sanity, `@portabletext/block-tools`) are installed.
- Audit date: 2026-11-17. Read-only: no repo files changed, no Sanity dataset read or written. Of the secrets in `.env.local`, only the names were checked: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`. They match `.env.example`.
- Live site: two requests to https://xsignon.com/ only, one for the home page headers and one for `/wp-json/wp/v2/pages`.

---

## 0. Executive summary

| Question | Answer |
|---|---|
| How much page content comes from Sanity today? | **None.** All 41 rendered public URLs get their body copy from hardcoded JSX (`src/components/prototype/*View.tsx`, `src/components/home/HomeView.tsx`, `src/app/about/page.tsx`, `src/app/enterprise/page.tsx`) or from `src/data/*.ts`. |
| What does read from Sanity? | (a) The header navigation, header CTA, footer link groups and legal line, on every page (`src/lib/navigation.ts`, `src/lib/site-settings.ts`), each with a local fallback. (b) `<title>`, description, robots and JSON-LD on the 5 product pages (`src/lib/product.ts`). That is 5 of 41 URLs (12%), and metadata only. |
| Schemas | 8 document types, 3 singletons, 5 shared objects, plus `testDoc`. The schemas are broadly good (S-12 objects, singletons with fixed ids, governance on case studies). But 5 of the 8 document types (`page`, `solution`, `caseStudy`, `article`, `whitePaper`, `job`) are never queried. `home` has a query (`HOME_QUERY`) that is never imported. `linkedInPost` and `testDoc` are dead. |
| Live site platform | **Not WordPress.** It is a custom **Django** app behind nginx: `/wp-json/` returns a Django 404 that names `config.urls`. It has its own CMS (`xcms/`, `pages/<slug>/`). **Django `DEBUG = True` is on in production** and the 404 page lists all 92 URL patterns. Report this to the client now: it is a security exposure. |
| Redirects | `src/data/redirects.ts` maps legacy URLs that were guessed and do not exist (`/company`, `/demo`, `/features`…). It misses almost every real legacy URL: `/identity-governance/`, `/postureone/`, `/pages/evalone/`, `/auth-bio*`, `/xsignon-insights/<slug>/`, `/use-cases/user-case-*`, `/privacy-policy/`, `/terms-and-conditions/`, `/overview/` and more (§6). Shipping as-is would cause **heavy SEO loss**. |
| Biggest code bugs blocking migration | 1) Pages do not render CMS data at all. 2) Internal link `href` resolves to a bare `slug.current` with no leading `/` and no type prefix, in the nav, site-settings and product queries. 3) The product query projects `seo.noIndex`, but the field is `seo.noindex`. 4) The nav schema has no `description`, `featured` or `footerLink`, although `HeaderClient` renders them. 5) Probable: the `imageWithAlt` and `link` type-level `Rule.custom` validators reject `undefined`, which makes "optional" images and links required (verify with `sanity documents validate`). 6) `siteSettings.banner` and `defaultSeo` are never queried or rendered. |
| Recommendation | Treat this as **"wire the CMS, then migrate"**, not "migrate". Build a typed page-builder with brevity-enforcing validators. Convert each `*View.tsx` into a renderer that takes props. Rewrite and approve the shortened copy in a spreadsheet **before** import. Import with a deterministic-id `@sanity/client` script into `staging`, validate, preview, then promote. Add a `redirect` document type and rebuild the redirect map from the real legacy URL list. |

---

## 1. Schema inventory

Registration: `src/sanity/schemaTypes/index.ts` → `[...objectTypes, ...singletonTypes, ...documentTypes, testDoc]`.
Studio: `sanity.config.ts`. Base path `/studio`, `structureTool({ structure })`, `presentationTool({ previewUrl: { initial: siteUrl, previewMode: {enable,disable} } })`. Templates filter out singletons, and `document.actions` → `singletonActions` removes delete, duplicate and unpublish on singletons.
Structure: `src/sanity/structure.ts`. Homepage, Site settings and Navigation are pinned with fixed ids, then come all other types from `documentTypeListItems()` (**this includes `testDoc` and `linkedInPost`**).
i18n: **none.** There are no locale fields, no `@sanity/document-internationalization` and no language field. The site is English-only, which is fine; keep it that way unless the client asks.

### 1.1 Shared objects (`src/sanity/schemaTypes/objects/`)

| Type | Fields | Validation | Preview | Notes |
|---|---|---|---|---|
| `imageWithAlt` (image, hotspot) | `alt` string, `credit` string | type-level `Rule.custom(v => v?.asset ? true : "Upload an image.")`. alt is required and ≤140 (`ALT_TEXT_MAX`); credit is required | default | **Probable bug**: Sanity calls `Rule.custom` for `undefined` values, so every optional `imageWithAlt` field (`seo.socialImage` "leave empty to use the site default", `article.coverImage`, `caseStudy.logo`) blocks publishing when empty. Fix: `if (!value) return true` and use `Rule.required()` where it is really required. |
| `link` | `linkType` radio (internal/external/file), `internal` ref → `linkableTypes`, `external` url (https/mailto/tel only), `file` (.pdf) | type-level `linkIsComplete` returns "Choose a link type." for `undefined` | custom | Same probable issue: an optional `navItem.link` ("leave empty if dropdown") and `banner.link` become required. `linkableTypes` (`src/sanity/lib/linkable-types.ts`) includes `testDoc`. No anchor/hash support (About sections use `#who`, `#what`). |
| `cta` | `label` (required, ≤40), `link` (required) | ok | label + linkType | Good. Not used by `home` or `page` modules, which reinvent text+href strings. |
| `seo` | `title` (required, warn >60), `description` (required, warn >160), `socialImage`, `canonical`, `noindex` | ok | — | Field is `noindex`; `PRODUCT_BY_SLUG_QUERY` projects `noIndex` → robots never applied from CMS. |
| `richText` | blocks normal/h2/h3/blockquote, bullet/number, strong/em, `link` annotation, `imageWithAlt` | none (no length limits) | — | **Never rendered anywhere**: no PortableText component exists in `src/`. |

### 1.2 Singletons (`src/sanity/schemaTypes/singletons/`)

| Type (`_id`) | Fields | Validation | Wired? |
|---|---|---|---|
| `home` (`home`) | `announcement{enabled,badge,text,href:string}`, `hero{headline,subline,primaryButton{text,href:string},secondaryButton{…}}`, `featuredProducts[]→product` (min 1), `featuredProof[]{title,tag,metric,href:string}`, `selectedInsights[]→article`, `cta{title,subtitle,buttonText,buttonHref:string}`, `seo` | headline/subline required, no length caps; hrefs are free strings (bypass link validation, so they can break) | `HOME_QUERY` in `src/sanity/queries/home.ts` is **imported nowhere**. `src/app/page.tsx` renders `<HomeView/>` (911 lines of hardcoded JSX) and hardcodes metadata. |
| `siteSettings` (`siteSettings`) | `defaultSeo`, `headerCta` (cta), `banner{enabled,message ≤140,link}`, `footerGroups[≤6]{title ≤30, links[1..10]{label ≤30, link}}`, `legalLine` (required) | good | Header CTA, footer groups and legal line are wired (`SITE_SETTINGS_QUERY`). **`banner` and `defaultSeo` are not queried or rendered.** The footer blurb "Identity, AI governance…" and "McKinney, Texas" are hardcoded in `src/components/layout/Footer.tsx`. |
| `navigation` (`navigation`) | `items[1..8]{label ≤30, link?, children[≤8]{label, link}}` | `navItemHasDestination` | Wired via `NAVIGATION_QUERY`. The schema lacks the `description`, `featured{eyebrow,title,href,image}` and `footerLink` that `src/types/navigation.ts` and `HeaderClient.tsx` render, so publishing a nav would drop the menu cards. Internal href = `internal->slug.current` (e.g. `postureone`, not `/products/postureone`) → **broken relative links**. |

### 1.3 Documents (`src/sanity/schemaTypes/documents/`)

| Type | Key fields | Required / limits | Slug | References | Preview | Read by site? |
|---|---|---|---|---|---|---|
| `product` | name, slug, tagline, hero{subline,tags[],dashboard{score…}}, capabilityCards[]{title,description}, docTabs[]{label,content,title,badge}, framework{title,steps[]}, mappedFrameworks{chips[],note}, relatedItems[] (ref product/article/whitePaper OR inline {title,typeLabel,link}), cta{title,button:cta}, seo | name, tagline, hero.subline, card title/desc required; **no length caps** | source name, max 96, required (default uniqueness per type) | relatedItems | name/tagline | **Metadata only** (`src/lib/product.ts` → `generateMetadata` and JSON-LD in `src/app/products/[slug]/page.tsx`). The body is `PostureOneView` etc. with no props. Query omits `docTabs` and resolves reference `relatedItems` to null titles. Internal hrefs are `"/" + slug` (missing `/products/`). Initial values hardcode PostureOne copy ("The PostureOne framework") for every product. No image fields. |
| `whitePaper` | title, slug, summary (≤300, custom), coverImage (required), storageKey, gated, version, publishedAt, relatedArticles[]→article, seo | good | yes | article | title/version | **No.** `src/lib/white-paper.ts` returns a hardcoded `FALLBACK_WHITE_PAPERS`. |
| `article` | title, slug, excerpt, body richText, coverImage, author (string), topic (string), readingTime (string), featured, pullQuote, slugAliases[] (string), publishedAt, relatedWhitePaper→whitePaper, seo | only title and slug required; excerpt has no limit | yes | whitePaper | title/author | **No.** `src/lib/article.ts` uses `src/data/articles.ts`; the body is 5 hardcoded `Article*View.tsx`. |
| `caseStudy` | title, slug, industry, location, deploymentDate (string), headline, summary, logo, heroImage, challenge, challengeParagraph2, approach, deployedFeatures[], rolloutSteps[], outcome, outcomeStatus, quote{}, approvalOwner, approvalStatus (must be `approved` to publish), evidenceLink (required https), relatedProducts[]→product, relatedCaseStudies[]→caseStudy, seo | good governance; no length caps | yes | product, caseStudy | title / industry · status | **No.** `src/lib/caseStudy.ts` uses `src/data/caseStudies.ts` (metadata only); body is `Case*View.tsx`. The evidence links in data point to `https://xsignon.com/compliance/evidence/*.pdf`. No such route exists in the new app, so they need verification. |
| `solution` | title, slug, summary, ctaHeadline, challenge, features[]{lead,body}, diagramKey (5 fixed values), deliveredBy[] (**strings, not product refs**), order | `Rule.required()` (allows whitespace) | yes | **none** | title/summary | **No.** `src/lib/solution.ts` uses `src/data/solutions.ts` (metadata/JSON-LD); body is `Sol*View.tsx`. No `seo`, no image. |
| `page` | title, slug, modules[] of 6 inline anonymous objects (heroModule, richTextModule, cardsModule, accordionModule, standardsModule, ctaModule), seo | only title and slug required; module fields unvalidated; hrefs are strings | yes | none | title/slug | **No route renders `page`.** There is no `[...slug]` catch-all. |
| `job` | title, slug, department (fixed list), location, employmentType, description, active, postedAt | required basics | yes | none | title/location | **No.** `src/lib/job.ts` uses `src/data/jobs.ts`. No `applyUrl`, `validThrough` or `seo`. |
| `linkedInPost` | text, urn, url, publishedAt, badge, counts, image (raw `image`, **no alt**) | — | — | — | — | **Dead.** `src/app/api/cron/sync-linkedin/route.ts` neither reads nor writes Sanity; the UI uses `src/data/linkedin-posts.ts`. |
| `testDoc` (`src/sanity/schemaTypes/testDoc.ts`) | title, heroImage, cta, body, seo | — | — | — | — | **Dead, and its own comment says to delete it** once Product exists. Remove it from `schemaTypes/index.ts`, `linkable-types.ts` and the `DEPENDENTS` in `src/sanity/lib/revalidation.ts`. |

### 1.4 Fetch layer (`src/sanity/lib/`)
- `client.ts`: `useCdn: true`, `apiVersion: "2026-11-01"`, no token, `projectId || "missing"`.
- `fetch.ts` (`sanityFetch`): draft mode → token, `perspective: "drafts"`, `cache: "no-store"`. Published → `perspective: "published"`, `next: { tags }`. **No `cache: "force-cache"`.** In Next 16 without Cache Components, `fetch` is not cached by default (`node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md`). Caching depends on the route being statically prerendered. Make it explicit: `cache: "force-cache"`. Check `next build` output to confirm the pages are static (○), not dynamic (ƒ).
- `revalidation.ts`: tags `type:`, `doc:`, `slug:<type>:<slug>`, `layout`. `DEPENDENTS` covers only siteSettings, navigation, product (→ `type:home`, `type:productListing`, **which no fetch uses**) and testDoc.
- `src/app/api/revalidate/route.ts`: signed via `parseBody`, fails closed without a secret, ignores drafts, calls `revalidateTag(tag, "max")`. This matches Next 16 (the two-argument form is required, and `"max"` is stale-while-revalidate, so the first visitor after a publish still sees the old page). Use `{ expire: 0 }` if the "updates within a minute" acceptance test must show new content on the very first request.
- `src/app/api/draft-mode/enable/route.ts`: `defineEnableDraftMode` with the read token. The disable route only clears the caller's own cookie.
- **Missing for preview:** no `<VisualEditing/>` or `defineLive`, no stega, and no `presentationTool({ resolve: { locations, mainDocuments } })`. Presentation can open the site but cannot map documents to URLs or offer click-to-edit.

---

## 2. Route → content source map

Legend: **JSX** = hardcoded in a component. **data** = `src/data/*.ts`. **CMS-meta** = Sanity used only for metadata. Rendered URLs are counted; redirect-only and internal routes are listed separately.

| Route | Page file | Body content source today | Metadata source | Target Sanity type | Gap |
|---|---|---|---|---|---|
| `/` | `src/app/page.tsx` | JSX `src/components/home/HomeView.tsx` (+ `HeroArt`, `SecurityEcosystem`, `Standards`, `SolutionIllustration`, `ContactCta`) | hardcoded in page | `home` singleton | Schema exists, but its fields don't match the current sections (security ecosystem, four solutions, standards, partner hub). Query unused. Page not wired. |
| `/about` | `src/app/about/page.tsx` (266 lines of JSX, inline `GlassItem`/`EcoItem` arrays) + `AboutHero` | JSX; job count from `src/data/jobs.ts` | hardcoded | `page` (slug `about`) with blocks | No route for `page`; blocks missing (glass cubes, ecosystem, standards). `src/data/about.ts` is mostly dead: `AboutHow`, `AboutThinking`, `AboutWhatWeDo` and `WhyXSignOnHub` are never rendered. |
| `/enterprise` | `src/app/enterprise/page.tsx` (212 lines of JSX) | JSX | hardcoded | `page` | Not wired |
| `/careers` | `src/app/careers/page.tsx` | JSX `CareersView.tsx` | hardcoded; JobPosting JSON-LD from `src/data/jobs.ts` | `page` (careers intro) + `job` | Listing not wired. Job schema lacks applyUrl and validThrough. |
| `/contact` | `src/app/contact/page.tsx` | JSX `ContactView.tsx` + form | hardcoded | `page` (intro, side copy) or `siteSettings.contact` | Not wired (keep the form in code) |
| `/contact/thank-you` | `src/app/contact/thank-you/page.tsx` | JSX `ThankYouView.tsx` | hardcoded | keep in code (microcopy) | Optional |
| `/privacy` | `src/app/privacy/page.tsx` | JSX `PrivacyView.tsx` (+ `src/data/legal/sub-processors.ts`) | hardcoded | `legalPage` (or `page` + richText) | No renderer for richText |
| `/terms` | `src/app/terms/page.tsx` | JSX `TermsView.tsx` | hardcoded | `legalPage` | Same |
| `/products` | `src/app/products/page.tsx` | JSX `ProductsView.tsx` (714 lines) | hardcoded | `page` (hub) + `product[]` cards | Not wired; `getAllProducts()` returns local data |
| `/products/postureone` `/evalone` `/xsense` `/ams` `/keys` (+ alias `/passwordless-keys`) | `src/app/products/[slug]/page.tsx` | JSX `PostureOneView`, `EvalOneView`, `XSenseView`, `AmsView`, `KeysView` (**no props**) | **CMS-meta** via `getProductBySlug` with fallback to `src/data/products/*.ts` | `product` | Body not wired. The copy is duplicated in View and data file (e.g. "Web application firewall" appears in both). `generateStaticParams` is a fixed `VIEWS` map, so a new product needs code. |
| `/products/passwordless-keys/[model]` (bio, touch, pro, desktop) | `src/app/products/passwordless-keys/[model]/page.tsx` | data `src/data/keys.ts` + JSX | data | `productVariant` (new) or `product.variants[]` | Schema missing |
| `/products/compare` | `src/app/products/compare/page.tsx` | JSX `CompareView.tsx` | hardcoded | `comparisonTable` block on `page` or derived from product features | Schema missing |
| `/proof` | `src/app/proof/page.tsx` | JSX `ProofView.tsx` | hardcoded | `page` hub + `caseStudy[]` | Not wired |
| `/proof/[slug]` ×4 | `src/app/proof/[slug]/page.tsx` | JSX `CaseBankView`, `CaseHealthView`, `CaseElectricalView`, `CaseItView` | data `src/data/caseStudies.ts` | `caseStudy` | Body not wired. Aliases resolve in `getCaseStudyBySlug`, but the `VIEWS` lookup uses the raw slug, so `/proof/bank` → 404. |
| `/solutions` | `src/app/solutions/page.tsx` | JSX `SolutionsView.tsx` + `ThinkingShowcase` (data `src/data/about.ts`) | hardcoded | `page` hub + `solution[]` | Not wired |
| `/solutions/[slug]` ×5 | `src/app/solutions/[slug]/page.tsx` | JSX `Sol*View.tsx` | data `src/data/solutions.ts` | `solution` | Not wired; schema lacks seo, product refs, journey panels |
| `/thinking` | `src/app/thinking/page.tsx` | JSX `ThinkingView.tsx` + `LinkedInSection` (data `src/data/linkedin-posts.ts`) | hardcoded | `page` hub + `article[]` | Not wired |
| `/thinking/industry` | `src/app/thinking/industry/page.tsx` | JSX `IndustryView.tsx` | hardcoded | `page` | Not wired |
| `/thinking/[slug]` ×5 | `src/app/thinking/[slug]/page.tsx` | JSX `Article*View.tsx` | data `src/data/articles.ts` | `article` | Not wired; no PortableText renderer; new articles need code |
| `/white-papers/zero-trust-posture-guide` | `src/app/white-papers/[slug]/page.tsx` | `FALLBACK_WHITE_PAPERS` in `src/lib/white-paper.ts` + JSX | same | `whitePaper` | Not wired |
| `/roi-calculator` | `src/app/roi-calculator/page.tsx` | JSX + `RoiCalculatorClient` | hardcoded | intro copy on `page`; keep formulas in code | Optional |
| `/unsubscribe`, `/subscribe/verify` | utility pages | JSX | hardcoded | keep in code | n/a |

**Redirect-only routes (14):** `/about/how-we-work`, `/about/what-we-do`, `/about/who-we-are`, `/articles/[slug]`, `/case-studies`, `/compare`, `/products/proof`, `/products/roi`, `/resources/[slug]`, `/resources/enterprise`, `/resources/industry-thinking`, `/resources/solutions`, `/resources/thinking`, `/roi`. Several duplicate `next.config.ts` redirects (`/roi`, `/products/roi`, `/case-studies`), and some use `redirect()` (307) where they should be permanent. Move them to the redirect system.

**Internal:** `/studio`, `/styleguide` and `/tokens` are noindex, **but `/styleguide` and `/tokens` are listed in `src/app/sitemap.ts`**. The sitemap also lists 10+ URLs that redirect (`/about/*`, `/case-studies`, `/compare`, `/roi`, `/products/proof`, `/products/roi`, `/articles/*`).

**Totals:** 41 rendered public URLs. 0 have CMS-driven body. 5 have CMS-driven metadata. Layout chrome is CMS-capable on all of them but broken if populated (see §1.2).

---

## 3. Requirement status (CSV `XSignOn Website Tasks..csv`; note: the CSV's `Title` column holds the ID and `TASK` holds the title; every row below shows STATUS "Not started" in the sheet)

| ID | Done when | Verdict | Evidence |
|---|---|---|---|
| S-11 Sanity project + studio | Studio opens at /studio on preview/staging and saves a test doc | **Partial** | `src/app/studio/[[...tool]]/page.tsx`, `sanity.config.ts`, `sanity.cli.ts`, env names present. Two datasets, CORS and the preview/staging check can't be verified from the repo. |
| S-12 Shared field types | Every doc type reuses them; missing required blocks publish | **Partial** | Objects exist and are good. But `solution` and `job` have no `seo`. `linkedInPost.image` has no alt. `home` and `page` use string hrefs instead of `link`/`cta`. The custom validators probably make optional images and links required. |
| S-13 Global settings + nav | Editor can't publish a broken link or change nav without publisher rights | **Partial** | References prevent dangling links, but resolved hrefs are wrong (no `/type/` prefix). No role gating (gate-g1 marks it **GAP**). Banner and defaultSeo are not rendered. Nav schema is missing card fields. |
| S-14 Roles | Role table verified with test accounts | **Not done** | `docs/gate-g1-foundation-review.md` line 69: "GAP (deferred)". The editor guide's role matrix and SSO/MFA claims are aspirational. |
| S-15 Draft preview | Draft visible only to signed-in editors; public never shows draft | **Partial** | Mechanics are correct (`fetch.ts` no-store with token; signed enable route). But only nav, settings and product metadata are draft-aware, so there is nothing to preview for page bodies. No Visual Editing/stega/`resolve`. Scheduled-publishing decision not recorded. |
| S-16 Revalidation | Publishing a product updates page, listing and home within a minute; unsigned rejected | **Partial** | Signature, fail-closed and draft-ignore are done (`src/app/api/revalidate/route.ts`, `docs/cms-webhook.md`). But the listing and home don't read Sanity, so they can't update. `type:home`/`type:productListing` are never fetched. A renamed slug doesn't refresh the old slug tag or create a redirect. |
| T-051 Product schema | Can't publish without required fields; slug unique | **Done (schema)** / caveats | `product.ts`. Slug uniqueness comes from Sanity's default per-type check. No length limits; product-specific initial values. |
| T-053 PostureOne real content | Approved; page renders without mock data | **Not done** | Page body = `PostureOneView.tsx` JSX. CMS only feeds metadata. |
| T-063 White paper schema | Editors can attach WP to article; PDF not public | **Partial** | Schema and `article.relatedWhitePaper` exist; storageKey keeps the PDF private. Neither the article page nor the WP page reads Sanity. |
| T-090 Homepage schema + wiring | Editors change home without code; refs must exist | **Partial** | Schema yes; wiring no (`HOME_QUERY` unused). Button and proof hrefs are unvalidated strings. |
| T-096 Home content + SEO | Client approves; SEO filled | **Not done** | Nothing is wired to receive it. |
| T-098 Case study schema | Can't publish without approved status | **Done (schema)** | `approvalStatus` custom error + required `evidenceLink`/`approvalOwner`. Not rendered from CMS. |
| T-106 Solution schema + hub | Editors add a solution without code | **Not done** | Hub and detail pages are hardcoded `VIEWS` maps. Schema lacks journey panels, product references and seo. |
| T-113 Article schema | Slug change creates redirect entry; required fields enforced | **Partial** | `slugAliases[]` is a manual string list. Nothing creates a redirect. No `redirect` type. Excerpt, cover and date not required. |
| T-123 Page schema, approved blocks | Editors can only choose approved blocks | **Partial** | The block list is restricted (6 inline types). No route renders `page`, blocks are unvalidated, links are strings. |
| T-128 Job schema + careers | Listings render; expired disappear | **Partial** | Schema yes. `CareersView.tsx` hardcoded. JSON-LD from `src/data/jobs.ts`. No expiry (`validThrough`) field; manual `active` only. |
| T-145 Inventory existing site | Inventory with traffic/link data | **Not done (doc inaccurate)** | `docs/migration/site-inventory.md` lists **new** routes plus `/login` and `/register`, which do not exist in the app (`src/app/login`, `src/app/register` are absent; they are legacy Django routes). The real legacy URL set (92 Django patterns, below) and any traffic or backlink data are absent. |
| T-146 Redirect map | Every existing URL has a decision | **Not done** | `docs/migration/redirect-map.md` and `src/data/redirects.ts` map invented URLs. The doc says `/products/compare → /compare`, but the code does the opposite (`src/app/compare/page.tsx` → `/products/compare`). `/whitepapers → /resources`, and **`/resources` has no page** (404). |
| T-147 Implement/test redirects | Zero unmapped, no chains | **Partial** | `next.config.ts` `redirects()` + `src/tests/redirects.test.ts`. Real legacy URLs are unmapped. Trailing-slash legacy URLs (`/about-us/`) make 2-hop chains (`/about-us/` → `/about-us` → `/about`). |
| T-148 Downloadable assets | Old download URLs still open | **Not done** | No legacy PDF inventory. Case-study `evidenceLink`s point to `/compliance/evidence/*.pdf` on xsignon.com and are unverified. |
| T-149 Images alt/credits | No image missing alt | **Partial** | Enforced in schema for CMS images. All current images are local `/public/images/**` in JSX, outside the CMS. |
| T-150 SEO on every page | Crawl shows no missing fields | **Not done in CMS** | Metadata is hardcoded per page file. |
| T-151 Sitemap/robots/structured data | Validators pass | **Partial** | JSON-LD exists (Organization, Article, Breadcrumb, JobPosting, SoftwareApplication, Service). The sitemap includes redirecting and noindex URLs and is built from `src/data`, not Sanity. |
| T-152 Approval tracker | No page launches unapproved | **Not credible** | `docs/migration/content-approval-tracker.md` marks every route "Approved" with prototype line numbers as evidence. It lists `/about/who-we-are` etc. (now redirects) and claims "93 routes". No named approvers or dates. |
| T-153 Content freeze | Freeze announced and recorded | **Partial / inaccurate** | `docs/migration/content-freeze.md` freezes `src/data/home.ts` (does not exist) and the data files. Most copy actually lives in `*View.tsx`, which isn't listed. A freeze must also cover the **legacy Django CMS** during export. |
| T-154 Export/restore test | Restore succeeds, sample page matches | **Not done** | `scripts/sanity-dataset-backup.mjs` only parses and validates NDJSON offline; no real export/restore was recorded. The runbook's revalidate `curl -H "Authorization: Bearer"` will 401 because the route requires a Sanity signature. |
| T-175 Editor guide/training | Editor completes one publish unaided | **Not done (guide inaccurate)** | See §8. |

---

## 4. Target content model

### 4.1 Principles
1. **One renderer per block.** Each `*View.tsx` becomes a composition of typed block components that take props. Design, animation and art (`HeroArt`, `SecurityEcosystem` canvas, `SolutionArt`) stay in code and are chosen by an enum field (`variant`, `artKey`). They are never free HTML.
2. **Reference, don't repeat.** Products, standards, partners/logos, claims (stats with a source), people, CTAs and FAQs are documents or reusable objects that pages reference. A product name or "FIDO2 Level 2" then lives in one place.
3. **Brevity is a schema rule, not a guideline.** Every text field has a hard cap (error) and a target (warning). See §4.4.
4. **Links are always the `link` object** (fix the href resolver). No free-text `href` strings.
5. **Hubs are queries, not lists.** `/products`, `/solutions`, `/proof` and `/thinking` list documents with ordering fields. Optional curated arrays of references can override the order.

### 4.2 Documents (new and changed)

| Doc | Purpose | Notes |
|---|---|---|
| `page` (changed) | About, Enterprise, Careers intro, Contact intro, hubs, Thinking/Industry, ROI intro | Fields: `title`, `slug` (with a reserved-slug check), `pageBuilder` (§4.3), `seo` (required), `approval` object. Rendered by `src/app/[...slug]/page.tsx` or by fixed routes that fetch `page` by slug. |
| `home` singleton (changed) | Home | Replace free hrefs with `cta`. Replace the fixed fields with `pageBuilder` restricted to home-specific blocks, or keep typed fields that match the current sections (hero, standards ref, ecosystem, solutions ref list, featured products, featured proof → `caseStudy` refs, insights, CTA ref). |
| `product` (changed) | 5 products | Add `heroImage`, `icon`/`artKey`, `order`, `features[]` (shared `feature`), `stats[]` (refs to `claim`), `faq` ref, `variants[]` → `productVariant`. Remove the PostureOne-specific initial values. |
| `productVariant` (new) | Passwordless key models bio/touch/pro/desktop | `product` ref, slug, name, specs[] (`label`/`value` ≤40), image, tabs. Replaces `src/data/keys.ts`. |
| `solution` (changed) | 5 solutions | Add `seo`, `journeyPanels[]` (`feature`), `deliveredBy[]` → **reference product**, `artKey`, `faq`. |
| `caseStudy` (keep) | 4 stories | Add caps; `outcomeStats[]` → `claim`; `industry` → `industry` ref (optional). |
| `article` (changed) | Thinking + legacy Insights posts | `author` → `person` ref; `topic` → `topic` ref; excerpt required ≤160; body word cap; readingTime computed in GROQ (`round(length(pt::text(body)) / 5 / 200)`), not typed. |
| `whitePaper` (keep) | gated PDFs | ok |
| `job` (changed) | careers | Add `applyUrl` (link), `validThrough` date, `locationType`, `seo`. Query filters `active && (!defined(validThrough) || validThrough > now())`. |
| `legalPage` (new, or `page` with a `legal` flag) | privacy, terms | `richText` body, `effectiveDate`, `version`. |
| `claim` (new): "stat with source" | Every number on the site | `value` (≤12 chars, e.g. "99.9%"), `label` (≤40), `sourceTitle`, `sourceUrl` (https) or `evidenceFile`, `asOf` date, `approvalStatus`, `owner`. Mirrors `docs/compliance/claims-and-evidence-register.md`. A publish fails without a source. |
| `standard` (new) | FIDO2, SOC 2, ISO 27001, NIST FIPS 203/204… | name, short (≤20), logo, url. Used by standards marquee, product `mappedFrameworks`, and About. |
| `partner` / `logo` (new) | partner ecosystem, customer logos | name, logo (`imageWithAlt`, SVG preferred), url, `kind` (partner/customer/certification), `allowedUse` (approval to show the logo). |
| `person` (new) | article authors, quotes | name, role, photo. |
| `ctaBlock` (new, reusable) | "Talk to us…" bands reused on 20+ pages | heading ≤60, body ≤140, `primary: cta`, `secondary: cta`, `style`. Pages reference it, so editing it once updates everywhere (`ContactCta` today). |
| `faqItem` docs or `faq` object | FAQs | question ≤90, answer PT ≤60 words. |
| `redirect` (new) | editor-managed redirects | §4.5 |
| `siteSettings` (changed) | add `footerBlurb`, `address`, `social[]`, `defaultCta` ref, `organization` (for JSON-LD) | render `banner` and `defaultSeo` |
| `navigation` (changed) | add `description` (≤60) on children, `featured{eyebrow,title,link,image}`, `footerLink: cta` on items | match `src/types/navigation.ts` |
| Remove | `testDoc`, `linkedInPost` (or wire it to the cron sync, which should then `createOrReplace` with id `linkedin.<urn>`) | |

### 4.3 Page-builder block list (approved set for `page.pageBuilder`; each a named top-level `defineType` object, not inline)

| Block (`_type`) | Fields (caps) | Replaces |
|---|---|---|
| `heroBlock` | eyebrow ≤24, heading ≤60 (warn 45), subheading ≤160, `primary: cta`, `secondary: cta`, `artKey` enum (beams, domainScan, glassCubes, none), image | hero sections of every View |
| `sectionIntro` | eyebrow, heading ≤70, intro ≤220 | ad-hoc headings |
| `featureGrid` | `sectionIntro`, `features[]` (2–6) of `feature` {icon enum, title ≤40, body ≤140, link?}, `layout` enum (grid, bento, coverflow) | capability cards, solution checklists |
| `statsBand` | heading, `stats[]` (2–4) → **reference `claim`** | metrics strips |
| `proofPoints` | heading, `items[]` → `caseStudy` refs (1–3) | proof teasers on home/products |
| `logoWall` | heading ≤60, `logos[]` → `partner` refs, `variant` (marquee, grid) | partner/customer strips |
| `standardsMarquee` | heading, `standards[]` → `standard` refs | `Standards.tsx` |
| `ecosystem` | heading, intro, `items[]` {title ≤30, body ≤120, artKey} | `SecurityEcosystem` |
| `steps` | heading, `steps[]` (3–5) {title ≤40, body ≤140} | framework steps, How we work, rollout |
| `faqBlock` | heading, `items[]` → `faqItem` refs (≤8) | accordions |
| `richTextSection` | heading ≤70, body `richTextShort` (≤250 words) | prose sections |
| `quoteBlock` | quote ≤220, `person` ref | testimonials |
| `productTeasers` | heading, `products[]` → product refs (or "all") | product carousel |
| `articleList` | heading, `mode` (latest n / curated refs / by topic) | thinking lists |
| `comparisonTable` | rows[] {label ≤40, values per product ref} | `CompareView` |
| `ctaBand` | `ref → ctaBlock` **or** inline overrides | `ContactCta` |
| `mediaBlock` | `imageWithAlt` or video url (allow-listed hosts), caption ≤120 | images |

Not allowed: raw HTML, embeds, colour pickers, arbitrary iframes (keeps T-123 and the CSP intact). Set `options: { insertMenu: { views: [{ name: "grid" }] } }` with block preview images.

### 4.4 Brevity-enforcing validation (repo style: helpers in `src/sanity/lib/validation.ts`, unit-tested)

```ts
// src/sanity/lib/validation.ts (additions)
type PTBlock = { _type?: string; children?: { text?: string }[] };

export function plainText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";
  return (blocks as PTBlock[])
    .filter((b) => b?._type === "block")
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .join("\n");
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

// Hard cap → error, target → warning. Returns true for empty so it composes with required().
export function maxWords(limit: number, label = "This text") {
  return (value: unknown): true | string => {
    const text = typeof value === "string" ? value : plainText(value);
    const n = countWords(text);
    return n <= limit ? true : `${label} is ${n} words. Keep it to ${limit} or fewer.`;
  };
}

export function maxSentences(limit: number) {
  return (value: unknown): true | string => {
    const n = (typeof value === "string" ? value : "").split(/[.!?]+\s/).filter(Boolean).length;
    return n <= limit ? true : `Use at most ${limit} sentence${limit > 1 ? "s" : ""}.`;
  };
}

// Brevity budgets: one table the whole team agrees on (and the spreadsheet uses).
export const COPY = {
  eyebrow: 24,
  heading: 60,
  headingTarget: 45,
  subheading: 160,
  cardTitle: 40,
  cardBody: 140,
  intro: 220,
  excerpt: 160,
  statValue: 12,
  statLabel: 40,
  faqQuestion: 90,
} as const;
```

Field usage:

```ts
// objects/feature.ts
import { defineField, defineType } from "sanity";
import { COPY, isNotBlank, maxWords } from "../../lib/validation";

export const feature = defineType({
  name: "feature",
  title: "Feature",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: `Up to ${COPY.cardTitle} characters.`,
      validation: (Rule) =>
        Rule.custom((v) => isNotBlank(v, "A title is required.")).max(COPY.cardTitle),
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "text",
      rows: 2,
      description: `One sentence, up to ${COPY.cardBody} characters.`,
      validation: (Rule) => [
        Rule.custom((v) => isNotBlank(v, "Text is required.")),
        Rule.max(COPY.cardBody),
        Rule.custom(maxWords(25, "Card text")).warning(),
      ],
    }),
    defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICONS } }),
    defineField({ name: "link", title: "Link (optional)", type: "link" }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});
```

```ts
// heading with hard cap + softer target
defineField({
  name: "heading",
  title: "Heading",
  type: "string",
  validation: (Rule) => [
    Rule.custom((v) => isNotBlank(v, "A heading is required.")).max(COPY.heading),
    Rule.max(COPY.headingTarget).warning(`Aim for ${COPY.headingTarget} characters or fewer.`),
  ],
}),
```

```ts
// objects/richTextShort.ts: section prose with a word budget
export const richTextShort = defineType({
  name: "richTextShort",
  title: "Short rich text",
  type: "array",
  of: [/* same block config as richText, minus h2 (section heading is a field) */],
  validation: (Rule) => [
    Rule.custom(maxWords(250, "This section")),
    Rule.custom(maxWords(150, "This section")).warning(),
  ],
});

// article.body: long-form, but still bounded
defineField({
  name: "body",
  type: "richText",
  validation: (Rule) => [
    Rule.required(),
    Rule.custom(maxWords(1500, "The article")),
    Rule.custom(maxWords(900, "The article")).warning(),
  ],
}),
```

```ts
// Fix for optional images/links: let the field-level rule decide "required"
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  type: "image",
  options: { hotspot: true },
  validation: (Rule) =>
    Rule.custom((value: { asset?: unknown } | undefined) =>
      !value || value.asset ? true : "Upload an image, or remove this item.",
    ),
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      // Required only when an image is present.
      validation: (Rule) =>
        Rule.custom((alt, ctx) =>
          (ctx.parent as { asset?: unknown })?.asset
            ? isNotBlank(alt, "Alt text is required.")
            : true,
        ).max(ALT_TEXT_MAX),
    }),
    /* credit: same pattern */
  ],
});
// and in link.ts: Rule.custom((v) => (v === undefined ? true : linkIsComplete(v)))
// then use Rule.required() on the fields that must have a link (cta.link already does).
```

```ts
// claim (stat with source): a number cannot ship without evidence
export const claim = defineType({
  name: "claim",
  title: "Stat / claim",
  type: "document",
  fields: [
    defineField({ name: "value", type: "string", validation: (R) => R.required().max(COPY.statValue) }),
    defineField({ name: "label", type: "string", validation: (R) => R.required().max(COPY.statLabel) }),
    defineField({ name: "sourceTitle", type: "string", validation: (R) => R.required().max(80) }),
    defineField({
      name: "sourceUrl",
      type: "url",
      validation: (R) =>
        R.custom((v) => (v ? isAllowedExternalUrl(v) : "A source link is required.")),
    }),
    defineField({ name: "asOf", type: "date", validation: (R) => R.required() }),
    defineField({ name: "owner", type: "string", validation: (R) => R.required() }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
    prepare: ({ title, subtitle }) => ({ title: `${title} · ${subtitle}` }),
  },
});
```

```ts
// slug with reserved routes + unique-across-pages
const RESERVED = ["products", "solutions", "proof", "thinking", "white-papers", "api", "studio", "contact"];
defineField({
  name: "slug",
  type: "slug",
  options: { source: "title", maxLength: 64, slugify: (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") },
  validation: (Rule) =>
    Rule.required().custom((slug) =>
      slug?.current && RESERVED.includes(slug.current) ? "That address is reserved." : true,
    ),
}),
```

Studio UX: add a small custom input (`components.input`) that shows a live "34 / 60 characters · 7 words" counter, and a document badge "Over budget". Editors then see the budget while writing, not only on publish.

### 4.5 Redirects as documents

```ts
export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "source",
      title: "Old address",
      type: "string",
      description: "Path only, e.g. /postureone/ (no domain).",
      validation: (Rule) =>
        Rule.required()
          .regex(/^\/[A-Za-z0-9\-._~/:*]*$/, { name: "path" })
          .custom(async (source, ctx) => {
            const client = ctx.getClient({ apiVersion: "2026-11-01" });
            const id = ctx.document?._id.replace(/^drafts\./, "");
            const dupes = await client.fetch<number>(
              `count(*[_type=="redirect" && source==$source && !(_id in [$id, "drafts." + $id])])`,
              { source, id },
            );
            return dupes ? "Another redirect already uses this address." : true;
          }),
    }),
    defineField({ name: "destination", title: "New page", type: "link", validation: (R) => R.required() }),
    defineField({ name: "permanent", type: "boolean", initialValue: true }),
    defineField({ name: "note", type: "string" }),
  ],
  preview: { select: { title: "source", subtitle: "destination.internal.slug.current" } },
});
```

Wiring: `next.config.ts` `async redirects()` can fetch `*[_type=="redirect"]` at build time and merge it with `CANONICAL_REDIRECTS`. Add a **second Sanity webhook** (filter `_type == "redirect"`) to a Vercel Deploy Hook so a published redirect ships on the next build. Do not do per-request lookups in `proxy.ts` (Next 16's renamed middleware); that adds latency to every request. Add a test that fails on chains (destination equals another redirect's source) and loops. For **T-113**, add a document action on `article`, `product`, `solution`, `caseStudy` and `page`: on publish, if `slug.current` differs from the published slug, create `redirect.<type>.<oldslug>` automatically.

### 4.6 Central href resolver (fixes the nav, settings and product bugs)

```groq
// one GROQ fragment, reused by every query
"href": select(
  linkType == "external" => external,
  linkType == "file" => file.asset->url,
  internal->_type == "product"    => "/products/" + internal->slug.current,
  internal->_type == "solution"   => "/solutions/" + internal->slug.current,
  internal->_type == "caseStudy"  => "/proof/" + internal->slug.current,
  internal->_type == "article"    => "/thinking/" + internal->slug.current,
  internal->_type == "whitePaper" => "/white-papers/" + internal->slug.current,
  internal->_type == "home"       => "/",
  internal->_type == "page"       => "/" + internal->slug.current
) + coalesce("#" + anchor, "")
```
Add an optional `anchor` field to `link`, for `/about#who` and similar.

---

## 5. Migration procedure

### 5.0 Prerequisite engineering (before any content moves)
1. Fix the bugs in §0 (href resolver, `noindex`, optional image/link validation, nav fields, banner/defaultSeo rendering, explicit `cache: "force-cache"`).
2. Add the new types (§4.2–4.5). Delete `testDoc` and `linkedInPost`.
3. Add `@portabletext/react` and build block components. Refactor every `*View.tsx` into `View({ data })`, with design kept in code and copy in props. Add `generateStaticParams` from Sanity slugs, with the local data as a *build-time fallback only for CI*, not for production.
4. Draft and preview: `defineLive`/`<SanityLive/>` or keep `sanityFetch`, plus `<VisualEditing/>` in the root layout when draft mode is on, plus `presentationTool({ resolve: { locations, mainDocuments } })`.
5. Revalidation dependents: product → `type:home`, `type:page` (hubs); claim/standard/partner/ctaBlock → `type:page`, `type:home`, `type:product`, `type:solution`; redirect → deploy hook.
6. A test that fails if any production page imports from `src/data/*` content files once a type is migrated (lint rule `no-restricted-imports`). This is the guard against "migrated but still hardcoded".

### 5.1 Source and export
- The live site is **Django** (nginx, `config.urls`, a `/xcms/` CMS and `pages/<slug>/` public CMS pages, a blog at `/xsignon-insights/<slug>/`). There is no WordPress and no `wp-json`.
- **Preferred source:** ask the client for an export of the legacy CMS models (`python manage.py dumpdata <xcms app> --indent 2`, or a DB dump) and the `/media/` folder. That gives clean fields, image files and original alt text.
- **Fallback:** crawl. Seed from the live `/sitemap.xml` and from the 92 URL patterns exposed by the DEBUG 404 (list in §6). Save the raw HTML for each URL and extract main content (cheerio) into `export/legacy/<path>.json` {url, title, metaDescription, canonical, h1, sections[], images[{src, alt}], pdfs[]}.
- **Security note for the client:** `DEBUG = True` in production leaks URL config (and on server errors, settings and tracebacks). Turn it off now, independent of the migration.

### 5.2 Content freeze (T-153)
Announce a freeze on the **legacy CMS** from export day until DNS cutover, with change control through a sheet. Fix `docs/migration/content-freeze.md`: remove `src/data/home.ts`, and freeze the **Sanity staging dataset** instead of TS files once content lives there.

### 5.3 Editorial "reduce text" pass: **before** import (recommended)
1. Generate a spreadsheet (one tab per page group) from the export. Columns: `target _id`, `_type`, `field path`, `legacy text`, `char budget`, `word budget`, `new text`, `len` (formula), `over?` (conditional format), `claim/source`, `owner`, `status` (draft/approved), `approver`, `date`.
2. Copywriters rewrite to budget **in the sheet**. The `COPY` constants are the budgets, so the sheet and the schema agree.
3. Client approves row by row (this *is* the T-152 evidence: name + date per page).
4. Import only approved rows.

Why before and not after: the validators will reject over-length text, so importing raw legacy copy produces hundreds of red documents that editors must fix one by one in the studio. Reviewers also compare old and new side by side far more easily in a sheet. The import script stays simple (no truncation logic). Exception: long-form articles and legal pages import as-is into `richText` (convert HTML → Portable Text) and get edited in the studio, because the sheet is a poor tool for prose.

### 5.4 Transform → documents
- Script: `scripts/cms-import/` (Node, `@sanity/client`, `@portabletext/block-tools` + `jsdom` for HTML→PT in articles and legal pages, `csv-parse` for the sheet). Run it with `--dry-run` that writes `out/*.ndjson`, and with `--apply`.
- **Deterministic ids:** `product.postureone`, `solution.identity-governance`, `caseStudy.securing-bank-access-fido2`, `article.<slug>`, `claim.<slugified label>`, `partner.<name>`, `redirect.<sha1(source)>`. Use `_key`s derived from content hash + index for array items, so re-runs produce identical documents (diff-friendly, idempotent).
- **Images:** download from the legacy server (or the client's media dump) into `export/media/`, then `client.assets.upload('image', stream, { filename })`. Sanity asset ids are content-hashed, so re-uploading the same file dedupes. Set `alt` and `credit` from the sheet (required). **Never hotlink `xsignon.com/media/...`**: the old host disappears at cutover, and CSP `img-src` only allows `'self'` and `cdn.sanity.io`. For design images that stay in `/public/images`, keep them in code (art) or upload them if editors should swap them.
- **PDFs:** gated white papers keep the private `storageKey` model. Legacy public PDFs either go to Sanity `file` assets (public) or get a `redirect` from the old URL (T-148).
- **References:** import in dependency order (standards, partners, claims, people, ctaBlocks → products → solutions → caseStudies → articles/whitePapers → pages → home → navigation/siteSettings → redirects), or use `_weak: true` refs during import and strengthen them afterwards. Run `validateDatasetIntegrity` from `scripts/sanity-dataset-backup.mjs` over the NDJSON before applying.

### 5.5 Load
- Target dataset: `staging` first (or a throwaway `migration-YYYYMMDD` dataset).
- Two options:
  - `npx sanity dataset import out/all.ndjson staging --replace` for the first full load (fast, handles assets from `_sanityAsset` URLs, all-or-nothing per batch).
  - **Recommended for re-runs:** a script with `client.transaction()`, in batches of ≤100 mutations. Use `createOrReplace` for documents the script owns, and **`createIfNotExists`** for documents editors may already have touched. This avoids overwriting studio edits on a second run.
- Drafts vs published: load as **published** in `staging` (preview is then the staging site itself). Alternatively, load as `drafts.<id>` if the client wants to press Publish per page as their approval act (this pairs well with S-14 roles).

### 5.6 Validate
- `npx sanity schema validate`
- `npx sanity documents validate --dataset staging --level error -y` must give 0 errors; review warnings (over target length).
- Script checks: every page route resolves (`*[_type in [...] && !defined(slug.current)]` = 0), no `null` hrefs in nav/settings queries, every `claim` has a source, every image has alt.
- Visual: `scripts/compare-page.mjs` and the Playwright visual baselines against staging. Check that a sample of hardcoded strings no longer appears in the build (`grep -r "Web application firewall" src/components` should return 0 after a migration).

### 5.7 Preview and sign-off
Run Presentation tool walkthroughs per page group with the client. Record approval in the sheet and in the `approval` field on the document.

### 5.8 Redirects (T-145–147)
Load `redirect` docs from the legacy URL list (§6). Run a script that requests every legacy URL against staging and asserts a single hop to a 200. Include trailing-slash variants and the `*.html` and `contact.html` variants.

### 5.9 Promote and roll back
- Before promotion: `npx sanity dataset export production backups/prod-<ts>.tar.gz` (even if production is empty, this proves the restore path), and run `scripts/sanity-dataset-backup.mjs --validate` on the extracted NDJSON.
- Promote: `sanity dataset copy staging production` (plan-dependent), or export staging → import to production `--replace`.
- Roll back: import the last backup with `--replace` and trigger revalidation **with a signed webhook replay from sanity.io/manage** (not the `curl -H "Authorization: Bearer"` in `docs/migration/cms-backup-restore-runbook.md`, which the route rejects).
- Close T-154 by doing a real restore into a `restore-test` dataset and diffing one page.

### 5.10 Order, effort and dependencies

| # | Group | Content | Code work | Effort |
|---|---|---|---|---|
| 0 | Platform fixes + new schemas + block renderers + PT renderer | – | §5.0 | **L** |
| 1 | Globals: navigation, siteSettings (banner, defaultSeo, footer blurb), ctaBlock | ~1 doc each | nav schema fields, href resolver | **S** |
| 2 | Shared libraries: standards, partners/logos, claims, people, FAQ | ~40 docs | none beyond schemas | **S** |
| 3 | Products ×5 + key variants ×4 + compare + products hub | 10 docs | refactor 5 Views + Keys model page + CompareView + ProductsView (≈1,900 lines of JSX) | **L** |
| 4 | Solutions ×5 + hub | 6 | 5 Sol Views + SolutionsView | **M** |
| 5 | Case studies ×4 + proof hub (with claims/evidence approval) | 5 | 4 Case Views + ProofView | **M** |
| 6 | Thinking: 5 articles + legacy Insights posts + industry + white paper | 7+ | PT renderer, Article template replaces 5 Views | **M** |
| 7 | Home | 1 | HomeView (911 lines) | **M** |
| 8 | Company: About, Enterprise, Careers + jobs, Contact intro, ROI intro | 5 + jobs | `page` route, about page JSX | **M** |
| 9 | Legal: privacy, terms | 2 | legalPage template | **S** |
| 10 | Redirects + sitemap from Sanity | ~100 | `redirect` type, build-time load, sitemap query | **M** |
| 11 | Training (T-175), roles (S-14), freeze, cutover | – | – | **S** |

Run the editorial pass for group *n+1* while group *n* is being engineered and imported.

---

## 6. Legacy URL set (from the live Django URLconf) and the redirect gap

Legacy patterns (excluding admin, captcha and the catch-all): `/` · `overview/` · `about-us/` · `about-us/team.html` · `about-us/team-details.html` · `contact/` · `thank-you/` · `identity-governance/` (+ `service.html`, `service-details.html`) · `ai-digital-governance/` · `quantum-safe-security/` · `business-process-solutions/` · `enterprise-technology-solutions/` · `products/` · `home/` · `login/` · `register/` · `account/` · `logout/` · `auth-bio` · `auth-bio-touch` · `auth-bio-pro` · `auth-bio-desktop` · `xsense` · `ams` · `solutions/` · `enterprise/` · `catalog/` · `catalog/company/<slug>/` · `postureone/` · `passwordless-authenticators/` · `industry-thinking/` · `xsignon-insights/` · `xsignon-insights/<slug>/` · `xsignon-insights/news-details{,1,2,3,4}.html` · `use-cases/` · `use-cases/user-case-{banking,healthcare,electrical,information-technology}{,.html}` · `roi-calculator/` · `privacy-policy/` · `terms-and-conditions/` · `unsubscribe/` · `pages/<slug>/` (e.g. `pages/evalone/`) · `index-white`, `index-white-01` · `llms.txt` · `robots.txt` · `sitemap.xml` · ~30 `*/contact.html` variants · `media/<path>`.

None of these is in `src/data/redirects.ts` except `/about-us`. Suggested decisions (verify against traffic):
- `/identity-governance/` → `/solutions/identity-governance`; `/ai-digital-governance/` → `/solutions/ai-and-digital-governance`; `/quantum-safe-security/` → `/solutions/quantum-safe-security`; `/business-process-solutions/` → `/solutions/business-process`; `/enterprise-technology-solutions/` → `/solutions/enterprise-technology`
- `/postureone/` → `/products/postureone`; `/pages/evalone/` → `/products/evalone`; `/xsense` → `/products/xsense`; `/ams` → `/products/ams`; `/passwordless-authenticators/` → `/products/passwordless-keys`; `/auth-bio`, `-touch`, `-pro`, `-desktop` → `/products/passwordless-keys/{bio,touch,pro,desktop}`
- `/use-cases/` → `/proof`; `/use-cases/user-case-banking(.html)` → `/proof/securing-bank-access-fido2`, and likewise for healthcare, electrical and IT
- `/xsignon-insights/` → `/thinking`; `/xsignon-insights/<slug>/` → `/thinking/<new-slug>` (per-post map) or keep the post; `news-details*.html` → per-item decision
- `/industry-thinking/` → `/thinking/industry`; `/overview/` → `/about` or `/products` (content decision); `/privacy-policy/` → `/privacy`; `/terms-and-conditions/` → `/terms`; `/thank-you/` → `/contact`; `/home/`, `/index-white*` → `/`
- `/login/`, `/register/`, `/account/`, `/logout/`: **decide with the client**. If customers log in there today, this is a product dependency, not a marketing page. Do not 301 a login to `/contact` without agreement. Use 410 if the feature is retired.
- `/catalog/`, `/catalog/company/<slug>/`: needs an inventory (company documentation?); keep or 410.
- `*/contact.html` → `/contact`; `/llms.txt`: provide a new one.
- Next.js default `trailingSlash: false` makes `/postureone/` → `/postureone` → `/products/postureone` (2 hops). Add both slash variants in the redirect source, or normalise in one rule (`source: "/:path+/"` handled first is not possible to chain-free; prefer explicit sources with and without the slash).
- Fix `/whitepapers → /resources` (no such page) and `/company/who-we-are → /about#who-we-are` (the About anchors are `#who`, `#what`, `#ab-how`).

---

## 7. Editor workflow

- **Roles (S-14):** Free/Growth plans have only built-in roles (Administrator, Editor, Viewer, plus Contributor on Growth). "Publisher-only navigation" needs **custom roles** (Enterprise) or a workaround: hide `navigation` and `siteSettings` from the structure unless `currentUser.roles` includes `administrator`, and restrict `document.actions` by role (a UI guard, not security). Record the plan decision and a role table tested with three test accounts.
- **Preview (S-15):** add `resolve.locations` per type (product → `/products/<slug>`, etc.) and `mainDocuments`, plus `<VisualEditing/>` (stega click-to-edit). Record whether Scheduled Publishing/Releases are on the plan; if not, mark it out of scope.
- **Revalidation (S-16):** keep the signed webhook. Projection: `{_id,_type,"slug":slug.current,"oldSlug":before().slug.current}` (webhooks support `before()`/`after()` in GROQ), so a renamed slug also refreshes the old slug tag. Extend `DEPENDENTS`. Decide between `"max"` and `{ expire: 0 }` against the "within a minute" acceptance test. Fix `docs/cms-webhook.md` (it says the redirects task is "T-xxx"; it is T-113/T-147).
- **Structure/desk:** group the desk as Pages (Home, About, Enterprise, Careers, hubs) · Products (+variants) · Solutions · Proof (case studies, claims) · Thinking (articles, white papers, topics, people) · Library (standards, partners, CTA blocks, FAQs) · Settings (site settings, navigation, redirects; admin only). Hide `testDoc` and `linkedInPost`. Add orderable lists (`order` field + `orderings`) for products and solutions. Use `S.documentTypeList().filter()` views such as "Awaiting approval" (`approvalStatus != "approved"`) and "Over budget" (a GROQ length check).
- **Singletons:** current handling is good (fixed ids, no create template, no delete/duplicate/unpublish). Add `home` to the same `S.document().documentId()` pattern (already done). Remember to *create* the three singleton docs in each dataset as part of the import.
- **Document actions:** an "Approve" action that sets `approval{status, by: currentUser, at}` (role-gated). An auto-redirect-on-slug-change action wrapper (T-113). Block "Publish" on `claim` and `caseStudy` until approved (already done for case studies via validation).

---

## 8. Documentation accuracy

`docs/cms/sanity-editor-guide.md` (T-175) describes things that don't exist:
- "Sanity Studio v3". The installed version is `sanity@6.22.0`. "Branch: Version-1". The current branch is `Version-2`.
- The role matrix and "SSO (Google Workspace / Okta) with MFA strictly enforced; password-only logins disabled". There is no role configuration (gate-g1 lists S-14 as a GAP), and SSO is a plan feature that isn't set up in the repo.
- Article: "Select the contributing expert from the Author dropdown or create a new author reference". `author` is a plain string. "Custom Callout block" and "Code Blocks" are not in `richText`. "Excerpt max 160 characters" is not validated. "Publish Date… or scheduled date": scheduling is not set up.
- Preview: "click the Split Pane / Preview icon… device preview switcher". The setup is the Presentation tool, without `resolve`. Live typing updates don't work without Visual Editing/Live, and page bodies don't read Sanity at all.
- White papers: "Gating & Access Policy: Public / Gated (Lead Capture)… company size" and "Attach PDF… uploads it to cdn.sanity.io". The schema has a `gated` boolean and a private `storageKey`; there is no PDF upload field. Uploading to `cdn.sanity.io` would make the PDF public, the opposite of T-063.
- Navigation: "Site Settings → Global Navigation". Navigation is its own top-level desk item. "PostureOne, Identity Fabric, Zero-Trust Bridge": the last two are not XSignOn products. "96 static routes": there are about 41 rendered.
- Revalidation: "`revalidatePath()`… within < 3 seconds". The code uses `revalidateTag(tag, "max")` (stale-while-revalidate: the first request after a publish still gets old content).
- Exam step 6: a new article at `/thinking/continuous-adaptive-trust-the-2026-paradigm` **will 404**. `/thinking/[slug]` only renders the 5 hardcoded `VIEWS`.

`docs/migration/*`:
- `site-inventory.md`: lists `/login` and `/register` with `src/app/login/page.tsx` and `src/app/register/page.tsx`, which don't exist (they are legacy Django routes). Lists `/products/keys` as canonical, but product metadata canonicalises to `/products/passwordless-keys`. Omits the real legacy inventory. The "Inbound forms" table says white paper requests use a "Server Action". Verify this (`/api/white-papers/download` is a route).
- `redirect-map.md`: claims HTTP 308 for every rule (Next `permanent: true` is 308, fine), but `/products/compare → /compare` is the reverse of the code. `/whitepapers → /resources` targets a non-existent page. Covers guessed URLs only.
- `content-freeze.md`: freezes `src/data/home.ts` (missing) and omits the `*View.tsx` files, where the copy actually lives. Claims "93 launch pages".
- `content-approval-tracker.md`: every page "Approved", with evidence such as "Lines 3307-3375" (prototype HTML), no named approver or date, and redirect-only URLs listed as pages. It does not meet T-152.
- `cms-backup-restore-runbook.md`: the `--validate` path exists in the script, but no export or restore has been performed. The rollback `curl … -H "Authorization: Bearer <secret>"` will get 401 (the route requires a Sanity HMAC signature).
- `ownership-transfer-checklist.md`: mentions `SANITY_API_WRITE_TOKEN`, which is not used anywhere in the code (only the read token). That is fine, but the doc should say a write token is needed only for the migration script and must be revoked afterwards.
- `staging-signoff-record.md`: "CMS Backup Snapshot: NDJSON dataset validated" overstates what happened (an offline in-memory test only).

---

## 9. Risks and mitigations

| Risk | Why it is likely here | Mitigation |
|---|---|---|
| **Hardcoded copy survives "migration"** | 31 `*View.tsx` files + `HomeView` + about/enterprise page JSX + `src/data/*` fallbacks. The fallback pattern in `src/lib/product.ts` silently serves local data when Sanity returns null. | Delete the content fallbacks per group once migrated (keep only a "CMS unavailable" error boundary). Add a lint rule banning `@/data/<migrated>` imports. Add a CI grep for a list of legacy sentences. Tests should assert pages render CMS fixture data. |
| **Silent fallback masks an outage or empty dataset** | `getNavigationData`/`getSiteSettingsData`/`getProductBySlug` catch every error | Log to Sentry on fallback; in production fail the build if the dataset is empty. |
| **Draft leakage** | Low today (no-store + token only in draft mode; webhook ignores drafts) | Keep `SANITY_API_READ_TOKEN` server-only (no `NEXT_PUBLIC_`). Make published fetches explicit `cache: "force-cache"`. Never pass the token to `client` globally. With stega, strip it from metadata/JSON-LD (`stega: false` for `generateMetadata` fetches). |
| **Broken references and links** | The href resolver drops the `/type/` prefix today. `home` and `page` use free-text hrefs. | Central resolver (§4.6), `link` everywhere, `validateDatasetIntegrity` before import, `sanity documents validate` in CI against staging. |
| **Image hotlinking and missing alt** | The legacy site serves `/media/`. CSP `img-src` allows only `'self'` and `cdn.sanity.io`. | Upload every image to Sanity during import; required alt (fixed validation); never store legacy URLs. |
| **SEO loss** | Real legacy URLs unmapped. Sitemap lists redirects and noindex pages. Metadata is not in the CMS. Slug changes create no redirects. | §6 map + `redirect` docs + single-hop test. Sitemap built from Sanity (published, `!seo.noindex`). Auto-redirect on slug change. Keep titles/descriptions in `seo` (required). Search Console change-of-address is not needed (same domain), but submit the new sitemap and monitor 404s for 30 days. |
| **Over-long copy blocks publish on import** | New caps vs legacy copy | Rewrite in the sheet first (§5.3). |
| **Legacy login/account users stranded** | `/login`, `/register` and `/account` exist on the live Django site | Product decision before cutover; communicate; keep the legacy app on a subdomain if still needed. |
| **Legacy server exposure** | Django `DEBUG = True` in production | Client to disable immediately. |
| **Plan limits** | Custom roles, scheduled publishing and dataset copy depend on the Sanity plan | Decide the plan in S-14; document workarounds. |

---

## 10. Immediate next steps (suggested PR sequence)
1. PR "cms-fixes": href resolver, `noindex`, optional image/link validators, nav schema fields, banner/defaultSeo rendering, explicit cache, remove `testDoc`/`linkedInPost`, sitemap cleanup.
2. PR "cms-model": new objects/docs (`feature`, `claim`, `standard`, `partner`, `person`, `ctaBlock`, `faqItem`, `redirect`, `productVariant`, `legalPage`), page-builder blocks, brevity validators + tests, structure/desk regroup.
3. PR "render-products": PT renderer + block components; refactor product Views to props; `getProductBySlug` with no content fallback. Then T-053 (PostureOne real content) closes.
4. Copy sheet and approval for group 1–3 in parallel; import script with dry-run; staging load; validate; preview.
5. Repeat for each group; then redirects; then docs rewrite (editor guide, inventory, redirect map, freeze, approval tracker) to match reality; then T-154 real restore and T-175 training.
