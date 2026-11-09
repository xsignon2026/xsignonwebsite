# XSignOn fidelity survey: prototype v5 vs Next app (branch Version-2)

Date: 2026-11-09. Prototype served at http://127.0.0.1:3330 (index.html#view), app at http://127.0.0.1:3331 (`next build` with NEXT_PUBLIC_SITE_ENV=ci, `next start`).
Headless Chromium 1248, viewport height 900, reduced motion off, fonts awaited, page scrolled top to bottom to fire reveals, then `.rv` forced to `.in`. All non-localhost requests were blocked, so **both** sides render without Inter (Google Fonts is blocked for both; the fallback stack is Segoe UI on both, so type comparisons are like for like).
The app's cookie consent banner was recorded (it appears on every page, and the prototype has none) and then hidden for the screenshots so it does not cover content.

Files in this folder:

- `<view>-<width>-proto.png` / `<view>-<width>-app.png`: full-page screenshots at 1280, 900 and 375 (compare has no app shot: redirect loop).
- `cmp/<view>-<width>-<n>.png`: side-by-side chunks (prototype left, app right) for 1280 and 375 (plus home at 900).
- `data.json`: extracted structure and computed styles per view/width/side. `diff.txt`, `diff2.txt`: text diff of headings, images, buttons, widgets, bands, styles and links.
- `nav-dropdown-1280-*.png`, `nav-mobile-375-*.png`: header dropdown and mobile menu states.
- Scripts: `capture.mjs`, `compose.mjs`, `diff.mjs`, `interact.mjs`.

Grades: A pixel-close, B minor differences, C clearly different, D missing or wrong page.

---

## Site-wide deviations (apply to every view; not repeated below)

1. **Prototype layout classes are not ported.** `.wrap` (max-width 1180, 32px gutter), `.page-sec` (88px top padding), `.sec-head`, the `.page-hero` padding (44px 0 84px), `.about-*`, `.btn-ghost-d` and the rest are missing from the app CSS. The only `.page-hero` rule is a colour override (`src/app/home-and-proof.css:1429`). Pages built with the prototype class names therefore render **edge to edge at x=0 with no section spacing** (computed `.wrap`: proto max-width 1180 / padding 32, app max-width none / padding 0). Affects 404, about, the 5 articles, careers, enterprise, industry, login, register, roi, privacy, terms and thinking. Files: `src/app/globals.source.css`, `src/app/home-and-proof.css`.
2. **Buttons are not pills.** `src/app/home-and-proof.css:153-189` redefines `.btn-navy` and `.btn-white` with an 8px radius, 15px text, 24px padding and old red `#be1b23`. The prototype uses a 999px radius, 16px text, 26px padding, 48px min-height and `--acc` `#c6001d`. This hits every CTA panel and form button. The React `Button` (`src/components/ui/button-styles.ts`) is correct but is not used there.
3. **The CTA band is restyled.** `.cta-sec` in `home-and-proof.css:1253` uses background `#f8fafc` with 80/56px padding. The prototype uses a dark band (paper + perspective-grid image, 128px, or 88/110px for `.sm`) holding a full-width `.cta-panel` with grid, glow and logo tile. The app panel is flat, centred and narrower on solution pages. In `src/components/blocks/CtaSection.tsx` the panel adds a subline and an "X" tile, and the arrow renders as literal text **"&nearr;"** (line 53: HTML5-only entity, not supported by JSX).
4. **Footer** (`src/components/layout/Footer.tsx`): it adds a full "Stay informed" newsletter block (`SubscribeBlock`) that the prototype footer does not have, so the footer is 901px tall against 558px. The logo is an "X" badge plus "XSignOn" text instead of the prototype logo image (`img-990ffb0c.png`, 56px high; the app has `/images/logo-dark.png` but does not use it). The "404 page" link in the base row is missing.
5. **Header** (`src/components/layout/HeaderClient.tsx`, `NavDesktop.tsx`, `NavMobile.tsx`):
   - The CTA reads "Contact" where the prototype reads "Contact Us".
   - Nav links are white and bold with chevrons. The prototype uses grey `#b4bfd3` links with small ▾ carets, and the active item gets a white underline.
   - The dropdown is wider and offset left of its trigger.
   - Below 641px the Contact button is hidden (`hidden sm:block`), but the prototype keeps "Contact Us" next to Menu at 375.
   - The mobile menu panel is translucent so the hero shows through. Group labels are red uppercase instead of grey mono. "About XSignOn" is missing.
6. **Heading scale.** The page h1 is 54px/600 (h1 on product templates 53.76px/700 with line-height 67px) where the prototype uses 56px/700 with line-height 58.8px. Section h2 is 24px/600 on case, solution and proof pages against 40px/700 in the prototype.
7. **Monospace accents are gone.** Tags, chips, dates, "Confirm spec" and spec-pending notes use the sans font. The prototype uses `--mono` (ui-monospace/Cascadia Mono) for `.ptag`, `.meta`, dates and pill tags.
8. **Dead Tailwind colour classes.** `tokens.css` sets `--color-*: initial`, so default palette utilities (`bg-emerald-400`, `border-slate-100`, `bg-slate-50`, `text-slate-…`) generate no CSS. There are 73 uses, in `proof/[slug]/page.tsx` (16), `solutions/page.tsx` (12), `solutions/[slug]/page.tsx` (6), `proof/page.tsx` (6), `ProductDashboardPreview.tsx` (8), `ContactForm.tsx` (7), `VerifyClient.tsx` (6) and others. The visible result is that **dashboard progress bars render empty** and borders are missing.
9. **Hero treatment on Resources-style pages.** The prototype `.res-view .page-hero.has-beams` has beams canvas, 128px bottom padding and a fade from dark into lilac. The app hero stops hard, with no fade. The solution pages have no beams canvas at all (canvas count: proto 1, app 0).
10. **Other site-wide behaviour:**
    - Every page shows the app's cookie consent banner (`src/components/common/ConsentBanner.tsx`), which does not exist in the prototype.
    - Titles double the brand ("… | XSignOn | XSignOn") because page titles already append it and the root template appends it again (`src/app/layout.tsx` template plus each page's metadata).
    - Both sides pull Inter from fonts.googleapis.com. The app's `layout.tsx` comment claims "Self-hosted Inter" but `globals.source.css:1` imports Google Fonts.
11. **Responsive behaviour.** Neither side has horizontal overflow at 375. At 900 the prototype keeps the 2-column pinned journeys (≥900px), but the app stacks them. At 375 the app pages are 10-40% taller because of the 128px `--section-pad` against the prototype's 56px mobile `.page-sec`.

Measured section padding: prototype `.page-sec` is 88px (72px on res-view) and the app's product templates use `py-(--section-pad)` = 128px. Product pages are therefore +30-45% taller (postureone 4056 → 5305px, evalone 3983 → 5613px, keys 3852 → 5007px, xsense 2618 → 3731px, ams 3659 → 5397px).

---

## 404

Route: any unknown path (`src/app/not-found.tsx`). **Grade C**

- Unwrapped: breadcrumb, h1 and buttons sit at x=0 with no hero padding (site-wide #1).
- "Our products" and "Contact us" ghost buttons are unstyled plain text (`.btn-ghost-d` missing). Only "Back to home" is a button, and it is square-cornered (#2).
- The "404" chip lacks the mono outline style.
- Page is 1600px against 1048px because of the newsletter footer (#4).

## about

Route: `/about` (`src/app/about/page.tsx`, `src/components/about/*`). **Grade D** (renders essentially unstyled)

- None of the prototype `about-*` CSS is ported:
  - The hero is a 119px strip with no beams or back-to-home pill.
  - The in-page nav is unstyled.
  - "Who we are" has no two-column text and photo, and the 3 principle cards render as a bare list.
- All 12 prototype images are missing from the app (the prototype references img-4414a7be, img-4b87cab8, img-fc10b560, img-127cbff0, img-12ac7d61 and thinking images; 5 thinking thumbs are 404 in the prototype itself).
- "What we do": the prototype has an image beside 4 expandable cards. The app shows grey gradient placeholders ("Identity governance") and long flat product lists (`ExpandingWhatWeDo.tsx`).
- "How we work": the prototype has a dark band with a pinned 3-step journey (scroll-driven). The app shows 3 static black cards with different copy ("Discovery and Living Inventory", "Zero Trust Rollout"…).
- "Why XSignOn": the prototype has a hub diagram card with 4 pillar chips, a centre logo and rotation. The app shows a **giant black X SVG** (~300px) above raw text (`WhyXSignOnHub.tsx`).
- "Our thinking": the prototype has a featured image card plus 4 image cards with "Read more" expanders. The app shows a featured block with an "Agent Authority Tiers" bar and 2 different articles (Identity-First, Data & AI). 4 of 5 prototype thinking items are missing.
- The app adds a CTA band and an extra "Pause rotation" button. The prototype has no CTA on this page.

## ams

Route: `/products/ams` (`src/app/products/[slug]/page.tsx`). **Grade C**

- Hero: 160px top padding against 44px. Tags are uppercase filled chips instead of mono outline pills.
- Lead paragraph is 24px against 18px (body-copy). The bold lead repeats the product name ("AMS AMS …" pattern, line 125).
- Section padding is 128px against 88px (page +47%).
- The CTA shows "&nearr;", a light band and a red button (#3). The prototype has a dark band with a white pill button.
- Related links go to `/proof#case-bank` and `/resources/solutions#sol-enterprise` (redirects that lose the anchor target) instead of the case and solution pages.
- The "How it works" and documentation tabs exist (7 tabs on both).

## article-agentic

Route: `/thinking/agentic-ai-cybersecurity` (`src/app/thinking/[slug]/page.tsx`). **Grade C**

- Unwrapped layout (#1): title, body and Related run from x=0, and the Related list spans the full 1280px.
- Hero: 204px against 464px, with no fade into lilac (#9). The title wraps at 1280 differently (2 lines against 3).
- Extra "3 min read" chip.
- The pull quote has a purple left rule instead of the prototype's tinted rounded box.
- An extra in-article "Stay informed" box duplicates the footer newsletter, so the page has **two** newsletter forms.
- CTA band (#2, #3).

## article-data-ai

Route: `/thinking/data-and-ai-security`. **Grade C**

- Same deviations as article-agentic (unwrapped, short hero, duplicate newsletter, CTA style).

## article-identity-first

Route: `/thinking/identity-first-controls`. **Grade C**

- Same deviations as article-agentic.

## article-microseg

Route: `/thinking/modern-micro-segmentation`. **Grade C**

- Same deviations as article-agentic.
- **Copy differs.** The second subheading is "Segments that follow the workload", but the prototype has "Start with the services people rely on" (`src/data/articles.ts`).

## article-nonhuman

Route: `/thinking/non-human-identities`. **Grade C**

- Same deviations as article-agentic.

## careers

Route: `/careers` (`src/app/careers/page.tsx`). **Grade C**

- Unwrapped, and the hero is 85px against 242px (#1).
- Role cards are boxed, grey, with a 12px radius. The prototype uses open blocks with a 2px top rule. The `bg-[#f8fafc]`-style cards come from page classes.
- The body paragraph colour is ink `#1a1240` where the prototype uses grey `#54507a`.
- Buttons are square (#2). The careers contact link adds `?reason=Careers` (fine functionally).

## case-bank

Route: `/proof/securing-bank-access-fido2` (`src/app/proof/[slug]/page.tsx`). **Grade C**

- h2 is 24px/600 against 40px/700. Sections use `py-14` (56px) with a bottom border, against 88px open sections.
- "What was deployed" checklist has lost its green check icons.
- Rollout steps are boxed cards with red numerals. The prototype has 3 ruled columns with ink numerals.
- The sourced-outcome note is a yellow callout. The prototype uses a mono outlined note.
- Related rows are individually boxed and narrower (about 760px). "Enterprise Technology" is missing from Related.
- Wrap is 1280 with a 24px gutter against 1180 with 32px.
- CTA band (#2, #3).

## case-electrical

Route: `/proof/biometric-fido2-air-gapped-industrial`. **Grade C**

- Same deviations as case-bank.
- **The CTA heading is wrong.** It shows "Run a rollout your branches can trust." (the bank copy); the prototype has "Bring verified sign-in to air-gapped systems."

## case-health

Route: `/proof/passwordless-access-global-healthcare`. **Grade C**

- Same deviations as case-bank.
- The CTA heading is wrong: it shows the bank copy; the prototype has "Talk to us about clinical sign-in."

## case-it

Route: `/proof/biometric-only-authentication-global-it`. **Grade C**

- Same deviations as case-bank.
- The CTA heading is wrong: it shows the bank copy; the prototype has "Run biometric-only sign-in at global scale."

## compare

Route: `/compare`. **Grade D** (unreachable)

- **Infinite redirect.** `src/app/compare/page.tsx` redirects to `/products/compare`, and `src/data/redirects.ts:13` redirects `/products/compare` back to `/compare` (ERR_TOO_MANY_REDIRECTS).
- The comparison page in `src/app/products/compare/page.tsx` can never render.
- The header, footer, keys page and Products dropdown all link to this route.

## contact

Route: `/contact` (`src/app/contact/page.tsx`, `src/components/forms/ContactForm.tsx`). **Grade C**

- Hero is 377px tall with 160px top padding, against 242px.
- Form:
  - The submit button is a navy small pill. The prototype has a full-width red pill "Send message".
  - Inputs are tinted.
  - Labels have red asterisks.
  - Checkbox text is smaller.
- The right column is restructured into Office, Phone and Email sub-headings (extra h2/h3) plus a bordered note card. The prototype has one paragraph with bold run-in labels.
- "Prefer reading first?" is an inline light strip with an outline button and extra copy. The prototype has a dark CTA panel.
- The "Browse our thinking" link points to `/#thinking`; the prototype goes to the Thinking page.

## enterprise

Route: `/enterprise` (`src/app/enterprise/page.tsx`). **Grade D** (key widget renders as raw text)

- The "command.xsignon.app" dashboard (sidebar, "Live", 3 coverage bars) renders as **unstyled plain text lines**.
- Standards chips run together as "FIDO2SOC 2ISO 27001HIPAA…".
- Unwrapped layout (#1). The hero has no fade, and the lead paragraph is 17px against 22px.
- Deployment-model cards are grey with a 12px radius instead of white with an 18px radius.
- A Related link goes to `/proof/case-it` (not a real slug).
- CTA band (#2, #3).

## evalone

Route: `/products/evalone`. **Grade C**

- Same product-template deviations as ams/postureone:
  - Hero padding.
  - 24px lead with a duplicated name.
  - 128px sections (+41% height).
  - Uppercase chips.
  - CTA "&nearr;".
- The frameworks table is present.
- Related links go to `/resources/solutions#sol-ai` and `/resources/thinking#article-data-ai` (redirects that drop the target).
- No "Book a strategy call" white pill in a dark CTA.

## home

Route: `/` (`src/app/page.tsx`, `src/components/home/*`). **Grade C**

- **Background version.** The prototype renders "Our products" and "Partner ecosystem" on white/paper and fades to dark only below Partners. The app uses the violet "ombre" gradient from the hero down through products. `tokens.css` says this was decided as Q-07; it does not match the approved prototype render.
- **Hero** (`HeroSplit.tsx`):
  - The red/violet glow at the top right is missing.
  - h1 is 54px/600 against heavier 56px/700+.
  - The "trust" highlight box is red dashed instead of blue.
  - The product card is a horizontal text card with a small icon. The prototype has a split card with a large shield panel, mono "SECURITY POSTURE 01 / 05" and red active dash dots.
  - Copy column width differs.
- **Standards marquee** (`MarqueeStrip.tsx`):
  - Items wrap onto two lines ("SOC / 2", "ISO / 27001", "NIST AI- / RMF").
  - The label is left-aligned plain text, against a centred letter-spaced label.
  - An extra "Pause" button appears.
  - A green-tinted band against the prototype's dark band.
- **Coverflow** (`ProductCoverflow.tsx`):
  - Extra pause button and "PostureOne, 1 of 5" text.
  - Wider progress track. Dots are grey and white, not red.
  - Card tags are not mono.
  - At 375 the arrows clip at the left edge.
- **Partner hub** (`PartnerHub.tsx`): the prototype is a light card with a centre shield logo, "Findings" and "Evidence" dashed connectors, a "Delivered through PostureOne" box and mono labels. The app is a **dark card** with an "XS" circle, curved lines and different list items ("Workload labels", "Flow telemetry"…).
- **Solutions journey** (`SolutionsJourney.tsx`): the prototype pins the stage and cross-fades panels as you scroll (≥900px, about 2600px of scroll, light panel card). The app is a static dark tab panel. The scroll-pinning interaction is missing.
- **Thinking band** (`ThinkingBand.tsx`):
  - The prototype band is dark, with the featured "Elevate Enterprise Security with Identity-First Controls" on a white card and mono dates.
  - The app band is light, with "Data + AI Security" featured (different article and order) and outlined rows.
  - The "Read the case studies" link is missing.
- **CTA** (`HomeCtaBand.tsx`): the prototype is a dark band with a perspective-grid panel, the full logo image tile and a white pill. The app is a light band with a subline added ("Speak with our security architects…"), an "XSignOn" text tile and a square button.
- Links: the prototype links all 5 articles and all 5 solutions from home. The app home lacks the solution and article-identity-first links.
- Page height is 5174px against 7624px (mainly the missing pinned journey).

## industry

Route: `/thinking/industry` (`src/app/thinking/industry/page.tsx`). **Grade C**

- Unwrapped, with a short hero and no fade (#1, #9).
- The hero h2 is styled white 38px inside the light area.
- The newsletter card style differs, and a second newsletter appears in the footer.
- CTA band (#2, #3).

## keys

Route: `/products/keys`. **Grade C**

- Product-template deviations (hero padding, 24px lead "Passwordless Keys Enterprise…", 128px sections, uppercase chips, CTA). Page is 5007px against 3852px.
- Sections are not horizontally aligned with each other: some start at x=840, others at x=810, because of mixed containers.
- Key cards:
  - Chips are red uppercase instead of mono outline.
  - The spec-pending note is a dark-bordered box instead of a mono grey box.
  - Links read "View the AUTH Bio specifications → /products/keys#key-bio". The prototype has "View the AUTH Bio page → #key-bio", a separate key detail view. **The 4 key detail pages (key-bio, key-pro, key-touch, key-desktop) do not exist in the app.**
- The comparison table header row is not shaded, and the "Confirm spec" chips are not mono dashed.
- The related "How XSignOn compares" link hits the redirect loop (see compare).

## login

Route: `/login` (`src/app/login/page.tsx`, `src/components/auth/LoginForm.tsx`). **Grade C**

- Unwrapped, with the hero at 85px against 242px. The form card sits at x=0 and the "New to XSignOn?" line touches the left edge.
- The "Log in" button is square-cornered `#be1b23` against a pill `#c6001d`.

## postureone

Route: `/products/postureone`. **Grade C**

- Hero is 423px with breadcrumb at y=150 against 303px and y=72. Chips are uppercase filled against mono outline pills.
- The lead reads "**PostureOne** PostureOne protects…" (duplicated name, `products/[slug]/page.tsx:125`) at 24px against 18px.
- Dashboard preview: the **coverage bars are empty** (`bg-emerald-400` and `bg-blue-*` do not exist, #8). "Evidence ready" is a white outline pill against a green dot pill. The mono URL is lost.
- "What PostureOne covers" is a 3-column grid against 2 columns.
- Sections are 128px against 88px. Page is 5305px against 4056px.
- CTA: light band, "&nearr;", red button, X tile (#3).
- Related links to `/resources/solutions#sol-identity`, `/resources/proof#case-electrical` and `/#products` (redirects or anchors instead of real pages).

## privacy

Route: `/privacy` (`src/app/privacy/page.tsx`). **Grade C**

- Unwrapped, with the hero at 146px against 303px.
- Section titles are h2 (21px) where the prototype uses h3 (heading level change).
- CTA band (#2, #3).

## products

Route: `/products` (`src/app/products/page.tsx`, `ProductOverviewInteractive.tsx`). **Grade C**

- The compare table has lost its 3 product thumbnails (img-48a7fb34, img-86bd27dc, img-2c6f4413) and the row-label icons. Product links are red with a "| Remove" layout.
- Product tabs are dark-filled pills against an underlined tab bar. An extra "Platform details" h2 is added.
- The tab panel is a text card **without the product photo** (prototype img-c9abf1f6… set).
- "Our thinking": the prototype has an auto-advancing image carousel (5 image cards, dots, `js/10.js`). The app has 3 static text cards. The carousel is missing and all images are missing (0 app images against 19).
- CTA: the second heading line is faded or clipped ("in your team will love."), with "&nearr;" and a light band.
- The hero is taller (377px against 242px) and has no beams.

## proof

Route: `/proof` (`src/app/proof/page.tsx`). **Grade C**

- The 4 case photos (img-c033247b, img-eac41761, img-687c8549, img-5ed582b6) are replaced with a dark placeholder icon.
- The grid is 3 columns (orphan 4th card) against 2 columns.
- Chips are not mono. The pending notes are yellow callouts against mono outline boxes.
- "Estimate your own numbers" uses a 24px h2 against 40px.
- The CTA heading is "Talk to us about verified rollouts." where the prototype has "Become the next case study."
- The ROI link goes to `/roi`, which redirects.

## register

Route: `/register` (`src/app/register/page.tsx`). **Grade C**

- Same deviations as login: unwrapped, short hero, square `#be1b23` button.
- Card padding matches (36px).

## roi

Route: `/roi-calculator` (`src/app/roi-calculator/page.tsx`, `RoiCalculatorClient.tsx`). **Grade C**

- The calculator works: changing staff from 500 to 1000 updates $30,000 to $60,000 on both sides.
- Layout is unwrapped: the intro and result panel run to the right edge, and the result panel is not aligned with the inputs card. The hero is 85px against 242px.
- Result header text is not mono.
- Related list is full-width. CTA band (#2, #3).

## sol-ai

Route: `/solutions/ai-and-digital-governance` (`src/app/solutions/[slug]/page.tsx`). **Grade C**

- No beams canvas in the hero and no dark-to-lilac fade (#9).
- h2 is 24px/600 against 40px/700, and the lead is 18px against 22px.
- Sections are separated by full-width rules. The prototype has open lilac sections.
- "Products that deliver it" and "Proof and reading" are plain ruled rows with mono tags. The prototype uses white rounded row cards with pill tags.
- The CTA panel is narrow and centred with a square button.
- **Broken link:** "Data + AI Security" points to `/thinking/data-ai-security` (404). The slug is `data-and-ai-security`.

## sol-enterprise

Route: `/solutions/enterprise-technology`. **Grade C**

- Same deviations as sol-ai, apart from the broken link.

## sol-identity

Route: `/solutions/identity-governance`. **Grade C**

- Same deviations as sol-ai, apart from the broken link.

## sol-process

Route: `/solutions/business-process`. **Grade C**

- Same deviations as sol-ai, apart from the broken link.

## sol-quantum

Route: `/solutions/quantum-safe-security`. **Grade C**

- Same deviations as sol-ai, apart from the broken link.

## solutions

Route: `/solutions` (`src/app/solutions/page.tsx`). **Grade C** (closest of the hubs)

- The hero and gradient list are close.
- Solution cards have lost the "Delivered by" product chips at the bottom of each diagram. Cards are wider (1280 wrap against 1180) and shorter.
- "Our thinking": the prototype has a featured image card plus 4 image cards with "Read more" expanders. The app has 2 text cards (Non-Human, Data + AI). 5 images and 5 headings are missing.
- One thinking link is broken: `/thinking/data-ai-security` (404).
- The CTA is a narrow centred panel in a light band.

## terms

Route: `/terms` (`src/app/terms/page.tsx`). **Grade C**

- Same deviations as privacy: unwrapped, short hero, h3 → h2, CTA style.

## thankyou

Route: `/contact/thank-you` (`src/app/contact/thank-you/page.tsx`). **Grade C**

- Hero is 654px against 421px (160px top padding).
- An extra paragraph ("Your inquiry has been accepted into our architecture review queue…") is not in the prototype.
- An empty light band of about 150px sits between the hero and the footer.
- "Back to home" has lost its chevron.
- "Our products" and "Our thinking" link to `/#products` and `/#thinking` (home anchors) instead of the pages.

## thinking

Route: `/thinking` (`src/app/thinking/page.tsx`). **Grade C**

- Unwrapped, with the hero at 85px and no fade.
- Card titles are 28px bold against about 19px semibold.
- Extra "Preview" and "Read summary preview" links appear on every card.
- The industry link is pushed to the left edge.
- Two newsletter forms (page and footer). CTA band (#2, #3).

## unsubscribe

Route: `/unsubscribe` (`src/app/unsubscribe/page.tsx`). **Grade C**

- Hero is 377px with 160px top padding, against 242px.
- The confirmation card copy and structure differ: the "Request confirmed." block is replaced, and there is no styled "Unsubscribe" pill button.
- The extra newsletter footer makes the page 1870px against 1178px.

## xsense

Route: `/products/xsense`. **Grade C**

- Product-template deviations (hero, lead size and duplicate name, 128px sections, chips, CTA "&nearr;"). Page is 3731px against 2618px.
- Documentation tabs are present (7 on both).
- Related links go to `/proof#case-electrical` and `/resources/solutions#sol-identity` (redirects).

---

## Grade counts

A: 0 · B: 0 · C: 34 · D: 3 (about, compare, enterprise)

## Shared root causes, ranked by number of views affected

1. CTA band, CTA panel and button CSS in `src/app/home-and-proof.css` (`.btn-navy`, `.btn-white`, `.cta-sec`, `.cta-panel`) plus `src/components/blocks/CtaSection.tsx`: about 34 views.
2. Footer, newsletter block and logo in `src/components/layout/Footer.tsx` and `forms/SubscribeBlock.tsx`: 37 views.
3. Header label, nav styling and mobile menu in `HeaderClient.tsx`, `NavDesktop.tsx` and `NavMobile.tsx`: 37 views.
4. Missing prototype layout CSS (`.wrap`, `.page-sec`, `.page-hero` padding, `.sec-head`, `.about-*`, `.btn-ghost-d`) in `globals.source.css` and `home-and-proof.css`: 16 views.
5. Product detail template in `src/app/products/[slug]/page.tsx` (`--section-pad` 128, hero `pt-32 md:pt-40`, 24px lead with duplicated name, chips) and `components/products/*`: 5 views (+ products hub).
6. Hero, heading tokens and mono font usage (`tokens.css` type scale, h1 600 weight, missing `font-mono` on tags): all views.
7. Dead Tailwind palette classes caused by `--color-*: initial` in `tokens.css`: proof, case ×4, solutions ×6, contact, product dashboards.
8. Image assets not carried over: about, products, proof, solutions, home thinking (0 prototype content images used outside the home coverflow).
