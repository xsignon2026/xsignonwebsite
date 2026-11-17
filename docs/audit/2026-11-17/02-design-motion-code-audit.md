# XSignOn website: code audit of design system, motion, accessibility and performance

- **Repo:** `D:\New folder\XSignON\XSignON Website\xsignonwebsite`, branch `Version-2` @ `239551c` (working tree clean; nothing was changed. The CSS rebuild check wrote its output to the scratchpad only.)
- **Requirements:** `C:\Users\Vcher\Downloads\XSignOn Website Tasks..csv`: 183 rows. STATUS is "Not started" for 160 rows, "Ongoing" for 22 and "Approved" for 1.
- **Date:** 2026-11-17
- **Evidence used:** a static read of the source, the CSS statistics script output, the local `.lighthouseci/` results from 2026-11-15, and `test-results/.last-run.json`. I did not run the site in a browser.

Severity key: **Critical** (a compliance or legal claim is false, or a WCAG A/AA failure on a core journey) · **High** (a WCAG AA failure or a broken requirement on a main page) · **Medium** (a defect, debt or performance cost to fix before launch) · **Low** (hygiene).

---

## 0. Executive summary

1. **Two design systems exist side by side, and the documented one is not used.** Pages are hand-ported prototype markup: 30 `src/components/prototype/*View.tsx` files plus `HomeView.tsx`, styled by a generated 7,221-line `prototype.css`. The token-driven primitives are a separate set: `ui/cards/*`, `Section`, `Container`, `CtaSection`, `SectionHeading`, `RevealWrapper`, `Breadcrumb` and `Button`. The style guide documents them, but almost none are imported by real pages. The prototype `.btn` class has 59 usages; the token `Button`/`ButtonLink` have 6, all on `/styleguide`.
2. **Most token bypasses sit in the generated `prototype.css`.** Across the CSS I counted 371 hex values, 128 rgb()/rgba() values, 317 px font sizes (59 distinct sizes), 327 literal durations (41 distinct), 264 literal easings against 90 token easings, 28 raw z-indexes, 150 px radii and 48 distinct px spacing values. There are no spacing, duration or z-index tokens.
3. **Several motion pieces auto-advance with no visible pause control, which fails WCAG 2.2.2.** They are the home product coverflow (5.2 s), Security Ecosystem (2.2 s, also on About), GlassCubes (2.2 s, Home and About), the Products "thinking" carousel (3.2 s) and the SMIL solution illustrations (indefinite). The widgets that did have pause buttons (`WhyXSignOnHub` with `#wxPause`, and the partner hub with `#hubxPause`) are dead code.
4. **The compliance evidence does not match the code (Critical).**
   - `contrast.test.ts` and `docs/compliance/contrast-audit-palette3.md` test a palette the site does not use: `#0b0713`, Tailwind slate and violet colours, and a `#8b5cf6` focus colour.
   - The contrast doc also claims a forced-colors focus fallback. No `forced-colors` rule exists anywhere.
   - `keyboard-screenreader-audit.md` signs off controls that do not exist: `#mqPause`, a cookie banner and `#hubxPause` on Home.
   - `reflow-and-a11y.test.ts` only asserts constants against themselves.
   - `docs/motion-inventory.md` lists components that do not exist (`ThinkingBand.tsx`, `SolutionsJourney.tsx`) and omits most of the live widgets.
5. **Performance on the home page fails its own budget.** The last local LHCI run on 2026-11-15 (mobile, simulated) failed on Home: TBT is 278–336 ms against a 200 ms budget, and script is 316 KB against 260 KB. The `/styleguide` script size fails too. Home scores: performance 85–92, accessibility 95, best practices 96, SEO 69 (expected, because non-production builds are noindex). Main-thread work is 6.0 s, of which 2.3 s is style and layout. 36 of 39 `next/image` uses have no `sizes`, so mobile downloads the `w=3840` variants.
6. **The requirements sheet is out of date.** Code exists, fully or in part, for about 55 of the 72 audited rows, yet the sheet says "Not started" for all of them. See section 6.

---

## 1. Tokens, styles and the build

### 1.1 CSS architecture

| File | Lines | Layer | Notes |
|---|---|---|---|
| `src/styles/tokens.css` | 204 | unlayered `:root` + `@theme` | Colour, shadow, easing, layout and type tokens. **No spacing, duration or z-index tokens.** |
| `src/styles/prototype.css` | 7,221 | `layer(components)` | Header comment: "GENERATED … by compare/port.mjs … Do not edit by hand." **The generator `compare/port.mjs` is not in the repo** (`/compare/` is git-ignored, `.gitignore:93`), so the file cannot be regenerated. |
| `src/styles/primitives.css` | 1,861 | `layer(components)` | App-authored; holds most of the newer motion CSS (`se-*`, `std-*`, `ha-*`, `hero-scan`). |
| `src/styles/nav.css` | 463 | unlayered | Header `.nav2*`. |
| `src/styles/shell.css` | 89 | unlayered | Footer. |
| `src/app/globals.source.css` | 98 | `@layer base` | Body type, focus ring, global reduced-motion rule. |
| `src/app/globals.css` | 11,197 (240 KB) | generated | **Committed**, and rewritten by most commits. It is in `.prettierignore`. |

- **[Medium] Custom CSS build: `scripts/build-css.mjs`.**
  - There is no `postcss.config.*`. Instead the script compiles Tailwind 4 through `@tailwindcss/node` and `@tailwindcss/oxide` into `src/app/globals.css`, and `dev`/`build` run it once before `next dev --webpack` / `next build --webpack` (`package.json:6-8`).
  - The reasons are not documented anywhere. My reading is that it works around running Tailwind 4 under webpack without PostCSS. `@tailwindcss/turbopack` is a devDependency but nothing references it.
  - Consequences:
    - **No watch mode.** Edits to `src/styles/*.css`, or new Tailwind classes, do nothing in `next dev` until a restart.
    - **A hard-coded safelist** (`scripts/build-css.mjs:39-74`) papers over missed classes.
    - **Undeclared dependencies.** `@tailwindcss/node` and `@tailwindcss/oxide` are not declared in `package.json`; they are only reachable through hoisting.
    - **Constant churn.** The 240 KB generated file is committed and changes in most diffs.
  - I rebuilt into the scratchpad and diffed: the committed `globals.css` **currently matches** its sources (0 diff lines).
  - Recommendation: switch to `@tailwindcss/postcss` with `postcss.config.mjs`, stop committing `globals.css`, and delete the script.
- **[Low] styled-components is unused.** `styled-components@6.6.0` is in `dependencies` (`package.json:28`), but there are no imports, no SSR registry and no compiler flag in `next.config.ts`. Remove it.
- **[Low] Tailwind is barely used.** There are 40 arbitrary-value utilities, for example `border-[#25205c]`×4, `bg-[#160e4a]`×3 and `text-[#b4bfd3]`×2, mostly in `/styleguide`, `/tokens` and the unused `ui/*`. Live pages use prototype class names.

### 1.2 Token coverage and the main offenders

Counts come from all of `src/styles/*.css` plus `globals.source.css`; the `:root` token definitions themselves are excluded.

| Category | Hard-coded | Notes / top offenders |
|---|---|---|
| Hex colours | **371** (62 distinct) | `prototype.css` 225, `primitives.css` 134. Many duplicate an existing token: `#f6f4fb` (= `--paper`) ×21, `#b4bfd3` (= `--on-dark-mut`) ×16, `#1a1240` (= `--txt`) ×11, `#25205c` (= `--d-line`) ×9, `#c6001d` (= `--acc`) ×8, `#060129` (= `--d1`) ×6. Several come from an older palette: `#081325` (`prototype.css:105,210,214`, also `home-behaviors.ts:345`), `#0b0b10`, `#f8fafc` (`shell.css:36,48`), `#2f7bff`, `#6b6790`. |
| rgb()/rgba() | 128 | `prototype.css` 94. |
| Hex in TS/TSX | 356 | `SolutionDiagram.tsx` 61 (dead), `HeroArt.tsx` 52, `HeroVariants.tsx` 38, `SolutionIllustration.tsx` 26, `PartnerEcosystem*.tsx` 26+26 (dead), `SecurityEcosystem.tsx` 22, `QuestionsWidget.tsx` 18, `about/page.tsx` 16. |
| `style={{…}}` inline | 111 | `QuestionsWidget.tsx` 13 (the whole widget is styled inline, including `font: "600 15px/1.2 Inter…"` at :82 and `zIndex: 100` at :79/:134), `thinking/ArticleCard.tsx` 7 (dead), `HomeView.tsx` 6 (e.g. `color: "#5b667c"` at :701, `paddingTop: "48px"` at :553), `enterprise/page.tsx` 6. |
| px font sizes | **317** (59 distinct sizes) | 15px×39, 17px×27, 13px×25, 12px×23, 12.5px×20, 15.5px×20, 16.5px×13, 13.5px×11, 14.5px×10, 11.5px×5, 10.5px×2, plus 24 distinct `clamp()` values. The `--text-*` tokens are used **4 times** in all the CSS (`globals.source.css:38-61`). |
| Durations | **327** (41 distinct) | From 0.1 s to 130 s; the most common are 0.5 s ×18, 0.4 s ×13, 0.3 s ×12 and 0.18 s ×9. There are no `--dur-*` tokens. |
| Easing | 264 literal vs 90 `var(--ease*)` | Literal `ease` ×177. There are 3 extra cubic-béziers not in tokens: `(0.25,1.25,0.4,1)` at `primitives.css:774,1266`, and `(0.3,1.35,0.45,1)` ×2. |
| z-index | 28 raw | Values −1/0/1/2/90/100/200, plus inline `zIndex:100` (QuestionsWidget), JS `zIndex = 20-a` (`home-behaviors.ts:141`) and the `z-[90]`, `z-[95]`, `z-[100]` safelist. There is no scale. |
| border-radius px | 150 (22 distinct) | 999px×43, 16px×29 (= `--r`, which is used only ×14), 12, 20, 14, 10, 3, 8, 24, 6, 28, 18, 2, 9, 30, 26, 22 and 1.5px. |
| Spacing px | 48 distinct values | 1–14 (every integer), 16, 18, 20–42 (even), 44, 48, 52, 54, 56, 58, 60, 64, 72, 76, 80, 84, 88, 96, 104, 110, 128. This is not on any scale. `section.block { padding: 128px 0 }` (`prototype.css:981`) hard-codes `--section-pad`. |
| Line-height | 27 distinct | 1.6×28, 1.55×21 … 1.04, 1.07, 1.21, 1.32, 1.53. |
| Letter-spacing | 17 distinct | −0.03 … 0.22em. |
| `!important` | 19 | Including `[hidden]{display:none!important}` (`prototype.css:34`). |

- **[Medium] The type scale is defined twice and has drifted.**
  - `tokens.css:165-176` sets `--text-display` with line-height 1.08, h2 1.12 and h3 1.18.
  - `prototype.css:40-59` sets `.h-display` 1.07, `.h2` 1.15 and `.h3` 1.21. It hard-codes the same `clamp()`s, and `.h2`/`.h3` have no letter-spacing, while base `h2` uses −0.025em.
  - Pages use the `.h2` classes, so the tokens lose.
- **[Medium] Legacy alias tokens hide meaning.** `prototype.css:2-24` aliases 23 variables; for example `--navy: var(--acc)` makes "navy" mean red, `--blue` means focus and `--ink` means `--txt`. `tokens.css:11-12` also gives `--d2` and `--d3` the same value.
- **[Low]** `tokens.css:3` names `xsignon-home-beams.html` (9.8 MB, repo root) as the source of truth, but `.gitignore:91` ignores it. The design source is not versioned. `reference/prototype-v5/` (5.1 MB) is tracked.

### 1.3 Breakpoints

The requirement (S-08) sets 640/760/900/1080/1200, and the Tailwind breakpoints in `tokens.css:198-203` match. CSS media query usage:

| Query | Count | Note |
|---|---|---|
| max 640px | 4 | ok |
| **max 720px** | 5 | off-scale (`primitives.css:429,450,649,869,1285`) |
| max 760px | 25 | ok |
| **max 899px** | 1 | off by one (`prototype.css:6674`) |
| max 900px | 9 | ok, but overlaps with 899 |
| **max 1000px** | 3 | off-scale (`prototype.css:6488,6986,7162`) |
| max 1080px | 12 | ok |
| min 761 / 1081 / 1201px | 1 / 3 / 1 | ok |

JavaScript adds its own thresholds: `home-behaviors.ts:127` (≥1180), `:362` (≥900), and `prototype-behaviours.ts:213` (≥1000 / ≥640).

- **[Medium]** 9 off-scale queries, and JS breakpoints that are not tied to tokens.

### 1.4 Duplicated and dead code

Unimported files total **about 2,300 lines**, about 18% of the component code.

| Item | Status |
|---|---|
| `components/thinking/ArticleCard.tsx` (113) vs `components/ui/cards/ArticleCard.tsx` (77) | **Neither is imported.** `ui/cards/index.ts` and all six cards (`FeatureCard`, `PrincipleCard`, `CaseCard`, `FeaturedArticle`, `WhitePaperCard`) are unused. |
| `home/PartnerEcosystem.tsx` (332) vs `PartnerEcosystemTall.tsx` (347) | Near-duplicates; both dead (replaced by `SecurityEcosystem`). |
| `home/HeroVariants.tsx` (305) | Only `HeroArtLayers` is used (`AboutHero.tsx:1`). `HeroArtTowers` (:58) and `HeroArtCore` (:172) are dead. |
| `about/AboutHow.tsx`, `AboutWhatWeDo.tsx`, `WhyXSignOnHub.tsx` | Dead. These were the implementations of T-125 and T-126, including `#wxPause`. |
| `blocks/CtaSection.tsx`, `layout/SectionHeading.tsx`, `solutions/SolutionDiagram.tsx` (427), `ui/RevealWrapper.tsx` | Dead. |
| `home-behaviors.ts` `heroCard()` :40-98, `proofWords()` :321-349, `partnerHub()` + `HUB` :477-629 | Dead at runtime: `#heroCard`, `#proofStmt` and `#partnerHub` are not in `HomeView`. |
| `prototype-behaviours.ts` `reviewLoop()` :166-187 | Dead at runtime: `#poCount` and `#poStatus` are not in `PostureOneView`. |
| Routes shadowed by `next.config.ts` redirects (:94-135) | `app/case-studies`, `app/articles/[slug]`, `app/white-papers/[slug]`, `app/roi`, `app/products/proof`, `app/products/roi` can never render. `sitemap.ts:38,47,62,68,83,126` still lists them. |
| Unused CSS | Roughly 143 of 451 class selectors in `prototype.css` (~32%) have no consumer. Examples: `.hcard`, `.hdot`, `.hubx-*`, `.mq-*`, `.pa-*`, `.about-hero`, `.ah-title`, `.cat-*`, `.col-hot`. Unused `@keyframes` include `mq`, `paPulse`, `paBob`, `paScan`, `paSpin`, `hxPulse`, `hxProg`, `ahUp`, `wxPulse` and `livePulse`. All of it ships on every route in a ~36 KB-gzip render-blocking stylesheet. |
| Prototype views vs templates | 5 product, 5 solution, 5 article and 4 case views are static JSX. `products/[slug]/page.tsx:21-41`, `solutions/[slug]/page.tsx:19-25` and `thinking/[slug]/page.tsx:20-26` map a slug to a hard-coded component, and CMS data feeds metadata and JSON-LD only. **A new CMS entry cannot render** (`thinking/[slug]/page.tsx:99-100` returns `notFound()`). |
| Breadcrumbs | `layout/Breadcrumb.tsx` (list, `aria-current`) is used on 2 pages; every other page has an inline `<nav className="crumbs">` with `/` separators and no list or `aria-current` (e.g. `AmsView.tsx:10-17`). |
| Buttons | Token `buttonClasses` (`ui/button-styles.ts`, 280 ms transitions) vs prototype `.btn` (`prototype.css:77-93`, 0.18 s / 0.1 s). |
| Reduced-motion hook | Copy-pasted 3 times: `SecurityEcosystem.tsx:215-221`, `GlassCubes.tsx:29-35`, `SolutionIllustration.tsx:329-336`. The `in-view` and `hold` logic is also duplicated between SecurityEcosystem and GlassCubes. |

- **[Medium]** Remove the dead code, or adopt the template components; today the style guide documents components the site does not ship.

### 1.5 Fonts (S-09)

- `layout.tsx:15-20` uses `next/font/google` Inter with weights 300–800 and `display: swap`, served from `/_next/static/media/*.woff2` (49 KB, one file). `next.config.ts:19` sets `font-src 'self'`. There are no `fonts.googleapis` references, and LHCI shows no third-party font requests. **Done.** (Weight 300 is extra to the requirement's 400–800.)
- **[Low]** `font: 700 12px Inter` (`prototype.css:6615,6622`) and the QuestionsWidget (`:82`) name the family literally. next/font registers it under a hashed family name, so these spots get the system font, not the self-hosted Inter.

---

## 2. Motion

### 2.1 Per-animation table

"Offscreen pause" means the animation stops when out of view; "Tab hidden" means it stops when the browser tab is hidden. "Layout?" flags properties that cause layout or paint rather than just compositing.

| # | Animation (file) | Where | What animates | Layout? | Duration / easing | Trigger | Offscreen pause | Tab hidden | Unmount cleanup | Reduced motion | Pause control (2.2.2) | Findings |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **BeamsCanvas** (`motion/BeamsCanvas.tsx`) | Home hero, About hero, 15 page heroes (`page-beams`), `/enterprise` via `HeroBeams` | 2D canvas: 56 px grid plus 4–16 gradient beams | canvas paint | rAF; `dt` clamped ≤50 ms; **no fps cap** | IntersectionObserver (`:174-190`) | Yes | Yes (`:192-199`) | Yes (`:203-209`) | One static grid frame (`:101`); the media query is read once with no change listener | n/a (decorative) | **[Medium]** No frame-rate cap (T-138 requires one), so 120 Hz screens draw at 120 fps. Grid redrawn each frame with ~40 separate `stroke()` calls (`:88-99`). New `createLinearGradient` per beam per frame (`:114`). ResizeObserver re-randomises all beams on every resize (`:166-171`). DPR capped at 2 (`:68`), good. Hidden ≤760 px on Home only (`primitives.css:694-700`); page heroes run on phones. |
| 2 | **PerspectiveGrid** (`motion/PerspectiveGrid.tsx`) | Home "What XSignOn does", ContactCta (Home, About), ProductsView | Canvas: 45 rays plus 12 moving rows | canvas paint | rAF, `t*0.3` | IntersectionObserver | Yes | Yes | Yes | Static frame | n/a | **[Medium]** `bandRGB()` calls `getComputedStyle(documentElement)` **every frame** (`:41-53`, called from `draw()` at `:94`), which can force style recalc. Same missing fps cap. |
| 3 | **motionCoordinator** (`motion/motionCoordinator.ts`) | all canvases | Enforces at most 1 active canvas | — | — | `requestActive` | — | — | `unregister` | — | — | **[Medium] Pause-only.** `requestActive` pauses the previous canvas (`:29-33`), but nothing ever calls `resume()`. When the newer canvas leaves the viewport, the older one stays frozen even though it is still visible, because its IntersectionObserver will not fire again. |
| 4 | **Coverflow** (`home-behaviors.ts:101-288`) | Home "Our products" | Inline `transform` (translateX/Z, rotateY, scale), `opacity`, `zIndex` (`:136-142`); `.cf-photo` **height** 0.55 s (`prototype.css:6692`); `.cf-dot` **width** (`:3133,3737`) | height and width animate | `setInterval` 5,200 ms | On load | **No** (runs while offscreen) | Yes | Yes | No autoplay, no transforms | **None.** Pauses only on hover, focus or a hidden tab; the progress bar `.cf-timer` is `display:none` (`primitives.css:684-689`) | **[High]** WCAG 2.2.2 failure. **[Medium]** `#cfStatus aria-live="polite"` (`HomeView.tsx:539`) is rewritten on every auto-advance (`:149`), so screen readers announce every 5.2 s. Window `resize` listener not throttled. Content bug: two "XDMACsec" slides (`HomeView.tsx:418,465`). |
| 5 | **Reveal `.rv`** (`home-behaviors.ts:291-318`) | Home and all prototype pages | `transform` plus **`filter: blur`** | blur filter is paint-heavy | 0.5 s `ease` (`prototype.css:1004`) or 0.8 s `--ease-soft` (`:3754`); `primitives.css:683` sets `filter:none` | IntersectionObserver threshold 0.12 | — (one-shot) | — | Yes | Shows everything (`:294`, `prototype.css:3885`) | n/a | Safe without JS (gated on `html.js`), with a 1.6 s failsafe. **[Low]** Three conflicting `.rv` definitions. `RevealWrapper.tsx` (T-049) duplicates this logic and is unused. |
| 6 | **Journey pin** (`home-behaviors.ts:352-387`) | Home "What XSignOn does" | Class toggles; sticky stage | layout | scroll-driven | `scroll` (passive) | — | — | Yes | Pin disabled | n/a | **[Medium]** Scroll handler reads `getBoundingClientRect()` and toggles classes on every scroll event with no rAF batching. Lighthouse reports forced-reflow time attributed to the page chunk. Rail buttons have no `aria-current` or `aria-pressed` (`HomeView.tsx:583-597`). |
| 7 | **Thinking rows** (`home-behaviors.ts:390-475`) | Home "Our thinking" | `grid-template-rows` 0.45 s (`prototype.css:3762`) | **layout** | 0.45 s `--ease` | hover, focus, tap | — | — | Yes | Global rule removes the transition | n/a | **[Medium]** Expanding on hover shifts content below, and hover is not a discrete input, so these shifts **count toward field CLS**. `aria-expanded` is on a `<Link>` (`HomeView.tsx:725-729`), so a navigating link also claims to expand. |
| 8 | **SecurityEcosystem** (`home/SecurityEcosystem.tsx`) | Home "Security Ecosystem", About "Why XSignOn" | React state every **2,200 ms** re-renders the whole SVG (`:251-257`); `.se-drop` opacity/transform 0.6/0.8 s staggered 140 ms; `se-flow` 3.2 s and `se-blink` 2.4 s infinite (stroke-dashoffset paint); mobile `.se-now` fades 0.5 s | dashoffset paint | 2.2 s | First time in view, then **forever** (`inView` is never reset, `:226-233`) | **No** after the first view | Partly (`document.hidden` checked per tick) | Yes | JS listener plus CSS; static list on mobile (`:423-433`) | **None.** Hold only on desktop pointer hover (`:294-296`); no keyboard control | **[High]** WCAG 2.2.2 failure. On phones the four items are reachable **only by waiting**: `.se-now` shows one item at a time (`:434-455`), the desktop SVG is hidden, and there are no buttons. Fails T-093 and T-126. **[High]** Mobile pills are white on `#8f89b8` at **3.26:1** (`primitives.css:929-936`; Lighthouse color-contrast failure). Entrance relies on `html.js` with no timeout fallback; if this component's JS fails, blocks stay at `opacity:0` (`primitives.css:766-776`). |
| 9 | **GlassCubes** (`common/GlassCubes.tsx`) | Home "Standards", About "How we work" | Highlight cycles every 2,200 ms (`:64-70`); `std-drop` 0.8 s; `std-flow` 1.2 s infinite | transform/opacity | 2.2 s | First in view, then forever | **No** | Partly | Yes | JS plus CSS (`primitives.css:1300-1310`) | **None** (pointer hold only) | **[High]** WCAG 2.2.2 failure (decorative, but it changes caption emphasis indefinitely). Same `html.js` hidden-until-hydrated risk (`primitives.css:1261-1268`). |
| 10 | **SolutionIllustration** (`home/SolutionIllustration.tsx`) | Home ×4, About ×5 | **SMIL** `<animate>`, `<animateMotion>`, `<animateTransform>` (durations 2.4–15 s, `repeatCount="indefinite"`), plus CSS `si-trace`/`si-node` | SVG repaint on main thread | 2.4–15 s | Immediately | **No** | No (SMIL keeps its timeline) | n/a | JS `move={!reduced}` (`:329-354`). The global CSS rule does **not** stop SMIL, and server-rendered markup includes the animations, so reduced-motion visitors see motion until hydration | **None** | **[Medium]** Indefinite motion with no pause. 9 concurrent SMIL scenes on About alongside a canvas, GlassCubes and SecurityEcosystem. The "one canvas" cap ignores SVG and CSS motion. |
| 11 | **HeroArt floats** (`primitives.css:1100-1167`) | Home hero | `ha-float` 7 s and `ha-slide` 4 s (transform), `ha-draw` 5 s (**stroke-dashoffset** plus `drop-shadow` filter) | dashoffset and filter paint | 4–7 s infinite | Load | No (CSS) | Browser throttles | — | CSS `animation:none` | **None** | **[Medium]** Combined with #1 and #12, the home hero has three or more moving layers next to the H1. |
| 12 | **Hero lines drift** (`prototype.css:480-511`) | Home hero | `transform` (90 s/130 s) and `opacity` (64 s) on a 114%×128% SVG | composited | 64–130 s | Load | No | — | — | CSS | n/a (very slow) | **[Low]** Fine; hidden ≤760 px. |
| 13 | **HeroDomainScan** (`home/HeroDomainScan.tsx`) | Home hero | `hero-scan-slide` 1.6 s infinite bar (`primitives.css:1696`); step text every 5.5 s (`:39-43`) | transform | Up to about 60 s | User submit | — | — | Yes (abort plus clear) | CSS | Bounded and user-initiated | **[Low]** The result replaces the form more than 500 ms after input, so the shift counts toward CLS. Otherwise a good pattern: `aria-live` summary, focus moved to the result, `role="alert"` errors. |
| 14 | **Think carousel** (`prototype-behaviours.ts:191-286`) | `/products` | `translateX` transition; dot **width** (`prototype.css:6012`) | width | `setInterval` 3,200 ms | Load | **No** | Partly | Yes (removes clones) | No autoplay | **None.** No hover or focus pause either | **[High]** WCAG 2.2.2 failure. Cloned cards get `aria-hidden` and `tabIndex=-1` (ok, the card is the link). Dot buttons (added by JS) have no `aria-current`, and are 9×9 px with an 8 px gap. |
| 15 | **Doc/product tabs** (`prototype-behaviours.ts:26-82`) | XSense, AMS, Keys; `/products` | `prodFade` 0.7 s | opacity | — | Click | — | — | Yes | — | n/a | **[Medium]** `docTabs` has no arrow keys, roving tabindex or `aria-controls` (`XSenseView.tsx:55-60`). `productTabs` is correct. |
| 16 | **SolutionArt** (`prototype.css:6626-6690`) | `/solutions` | `art-fl` 2.6 s dashoffset, `art-pulse` 2.8 s scale | paint | Infinite | Load | No | — | — | CSS | None | **[Medium]** Indefinite decorative motion. |
| 17 | **svFill bars** (`prototype.css:6942-6956`) | Solution pages | `scaleX` 1.2 s forwards | composited | One-shot | `.in` from reveal | — | — | — | Forced to `transform:none` (`:7009-7012`) | n/a | OK. |
| 18 | **Header** (`nav.css:90,245-330`) | All pages | Panel `nav2-in` 0.16 s; drawer transform plus `visibility` 0.25/0.3 s | composited | — | User | — | — | — | Handled (`nav.css:321`) | n/a | OK. |
| 19 | **Layout transitions elsewhere** | various | `width` at `prototype.css:718,3133,3737,6012` and `primitives.css:845`; `max-height` at `:1613,3765`; `grid-template-rows` at `:3342,5693,5700`; `left,width` at `:4012` | layout | — | — | — | — | — | Global rule | — | **[Low]** Replace with transform/scale or `interpolate-size`. |
| 20 | **Global reduced-motion rule** (`globals.source.css:90-98`) | All | `animation:none!important; transition:none!important` | — | — | — | — | — | — | Covers CSS only. **Not** SMIL (#10), canvases or JS timers that do not check the media query | — | Each JS piece checks `matchMedia` itself, in two different ways: once at mount (#1, #2, home-behaviors, prototype-behaviours) or with a `change` listener (#8, #9, #10). |

### 2.2 Motion against the requirements and `docs/motion-inventory.md`

- **[Critical, documentation integrity] The inventory does not describe the site.** `docs/motion-inventory.md` says it registers `WhyXSignOnHub` (5 s, `#wxPause`), `ThinkingBand.tsx` (6 s), `SolutionsJourney.tsx` and a "Compliance Posture Overview" (5 s). None of these exist or render. It omits the coverflow, SecurityEcosystem, GlassCubes, the think carousel, the SMIL illustrations, HeroArt and SolutionArt. Its "frame rate capping" policy is only a delta clamp. The "21 canvases" in T-137 come out as 1 home + 1 About + 15 page heroes + about 4 perspective grids, which roughly matches. The doc has no task ID and is not referenced from T-137.
- **[High] The cap counts canvases only.** About runs 1 canvas, 5 SMIL illustrations, GlassCubes, SecurityEcosystem and a PerspectiveGrid in the CTA. Home runs 3 canvases, 4 SMIL scenes, coverflow, SecurityEcosystem, GlassCubes, HeroArt, hero-lines and journey.
- **[High] The motion end-to-end tests are stale or tautological.**
  - `e2e/motion.spec.ts:13-22` targets `.pt-card` and `.pt-sp` (PartnerEcosystem, removed). `:43-54` targets `#heroCard` and `.mq-track` (not rendered).
  - The "loop pauses when out of viewport" test (`:26-37`) only asserts the canvas's bounding box is above the viewport; it never checks rAF.
  - `test-results/.last-run.json` shows **12 failed tests**: the company, home and motion specs.
- No-JS and failed-JS behaviour: content is visible without JS because every hide is gated on `html.js`. Reduced motion is honoured in CSS. **Gaps:** if a component fails after `html.js` is set, SE and GlassCubes blocks stay hidden; SMIL plays before hydration; the coordinator never resumes.

---

## 3. Accessibility in code

| Severity | Finding | Evidence |
|---|---|---|
| **Critical** | **Focus can disappear.** The base focus ring is `outline:none` plus a `box-shadow` in `@layer base` (`globals.source.css:65-76`). Any rule in `layer(components)` (prototype and primitives CSS) that sets `box-shadow` wins whatever the specificity, so the ring is lost on focus. Examples: `a.hub-card` (`prototype.css:3845`), `.qa-launcher` (`:1497`), `.wx-node[aria-selected]` (`:5524`), `.sol-card` (`:6782`), `.cf-card.is-active` (`:4506`). **There is no `@media (forced-colors)` rule anywhere**, so in Windows High Contrast the box-shadow is dropped and `outline:none` leaves no indicator. The contrast doc's claim of a forced-colors fallback is false. | `globals.source.css:65-76`; grep for `forced-colors`: 0 hits |
| Medium | **Focus styles are inconsistent.** There are three systems: the base double ring (box-shadow), nav `outline: 2px solid var(--focus)` (`nav.css:69-76,317,404`), and hub/form outlines (`prototype.css:2122` uses `--blue`, `:4230` uses `--acc-ink`). `border-radius:6px` on every `:focus-visible` (`globals.source.css:70`) reshapes unlayered elements on focus. | — |
| High | **Auto-advancing content has no pause:** coverflow, SecurityEcosystem, GlassCubes, think carousel, SMIL (see section 2). | WCAG 2.2.2 |
| High | **SecurityEcosystem on phones** exposes its four items one at a time with no control, and the desktop SVG works by pointer only. | `SecurityEcosystem.tsx:285-302,423-455` |
| High | **Contrast:** white on `#8f89b8` is 3.26:1 (SE mobile pills). Pre-scroll proof words (`#d5dbe5`, 1.39:1) are dead code. Measured token pairs pass: `--gray`/paper 6.86, `--acc` button 6.14, `--on-dark-ctl`/`--d1` 4.79. However `--on-dark-ctl` on `--d2` is **4.45** and fails if used for small text. | `primitives.css:929-936`; Lighthouse `color-contrast` |
| Critical | **The contrast evidence is invalid.** `src/tests/contrast.test.ts:27-36` hard-codes `#0b0713`, `#150d27`, Tailwind slate/violet and `#8b5cf6`. None of these are in `tokens.css`, so the test passes regardless of the real palette. `docs/compliance/contrast-audit-palette3.md` repeats the same fictional palette and a "3px solid #8b5cf6" focus ring (the real ring is `#0b57d0`/`#a9e1ff` box-shadow). | — |
| Critical | **Other a11y evidence is not credible.** `keyboard-screenreader-audit.md:17-23,53-56` signs off `#mqPause`, a cookie consent banner with focus trap, and `#hubxPause` on Home; none exists. `reflow-and-a11y.test.ts:4-34` asserts literals against themselves. | — |
| Medium | **Mobile nav (T-042):** focus is not moved into the drawer when it opens and not returned to the burger on close. There is no `inert` on the page behind, even though a scrim is shown and scroll is locked (`HeaderClient.tsx:76-83,196-231`). The close button uses `tabIndex` toggling (`:238`); the drawer is `visibility:hidden` when closed (`nav.css:290`), which is good. | — |
| Low | **Desktop mega menu:** Escape closes it but does not return focus to the chevron (`HeaderClient.tsx:57-61`). The panel stays open when keyboard focus tabs out (there is no `focusout`). Chevron buttons have `aria-expanded` and `aria-controls`, which is good. | — |
| Medium | **QuestionsWidget** declares `role="dialog" aria-modal="true"` (`:127-129`) but has no focus trap. Its launcher label stays "Open questions dialog" while open. The widget sits outside all landmarks, after `<footer>`. | `QuestionsWidget.tsx` |
| Medium | **Heading order:** 18 templates skip levels. Home, enterprise, AMS, EvalOne, PostureOne, Careers and CaseBank go h2→h4; all 5 articles, Industry, Keys, Privacy, Proof, Terms and Thinking go h1→h3. Lighthouse flags `heading-order` on Home. CI axe does not catch it because it uses WCAG tags only and excludes best-practice. | `e2e/a11y.spec.ts:57-58` |
| Medium | **Target size (2.5.8):** carousel dots are 9×9 px with an 8 px gap, a 17 px pitch, so they fail the 24 px rule including its spacing exception. | `prototype.css:3122-3131,6000-6011` |
| Medium | **Tabs:** `docTabs` buttons have `role="tab"` but no arrow keys, roving tabindex or `aria-controls`. | `prototype-behaviours.ts:26-46` |
| Low | **Breadcrumbs:** most pages use inline `nav.crumbs` with literal "/" separators and no `aria-current`. | e.g. `AmsView.tsx:10-17` |
| Low | **Studio route** renders inside the site shell: header, footer, the QuestionsWidget, and a nested `<main>` in the unconfigured case. | `layout.tsx:42-48`, `studio/[[...tool]]/page.tsx:12` |
| OK | Skip link (`SkipLink.tsx`) targets `<main id="main-content">`; the header, nav, main and footer landmarks are present. | `layout.tsx:42-46` |
| OK | **Contact form:** labels, `aria-invalid`, `aria-describedby`, focus on first error, `role="alert"` failure message, `aria-busy`. The SMS consent checkbox from T-054 is intentionally omitted (`ContactForm.tsx:10-11`); this needs sign-off. | `ContactForm.tsx:128-226` |
| OK | **Images:** all 39 `next/image` uses have `alt`; 4 decorative uses have `alt=""`. Icon-only buttons have names. | — |

---

## 4. Performance

- **Client components: 29 `"use client"` files.** The heavy ones are `SecurityEcosystem` (458 lines with the whole SVG in JS), `SolutionIllustration`, `GlassCubes`, `HeroDomainScan`, `HeaderClient`, `QuestionsWidget` and both behaviour runners.
- **[High] Home fails its budget** (LHCI 2026-11-15, `lighthouserc.cjs` mobile profile, 3 runs):

  | URL | Perf | A11y | BP | SEO | LCP | CLS | TBT | JS | Img | Total |
  |---|---|---|---|---|---|---|---|---|---|---|
  | `/` | 85 / 92 / 92 | 95 | 96 | 69* | 1.24–1.26 s | 0 | **278–336 ms (fail >200)** | **316 KB (fail >260)** | 451 KB | 938 KB |
  | `/styleguide` | 97 | 100 | 96 | 66* | 1.07 s | 0 | 184–192 ms | **317 KB (fail)** | 73 KB | 549 KB |

  \*SEO is low because non-production builds are noindex, as intended.

  Main thread: 6.0 s, of which 2.3 s is style and layout. Unused JS is about 119 KB. Two stylesheets are render-blocking, the 36 KB one being mostly the unused prototype CSS. `max-potential-fid` is 500 ms.
- **[High] Image sizing.** 36 of 39 `<Image>` have no `sizes` (`ProductsView.tsx` ×14, `HomeView.tsx` ×12, `ProofView.tsx` ×4). On mobile, Home requests `/_next/image?…&w=3840` for 156 KB and 108 KB card images. Only the header logo has `priority`; the LCP is the H1, which is fine. Header mega-menu feature images use `loading="eager"` inside hidden panels on every page (`HeaderClient.tsx:164-171`).
- **[Medium] The budgets disagree with each other.** `lighthouserc.cjs` budgets only `/` (labelled "placeholder") and `/styleguide`. `.lighthouserc.json` (total-byte-weight 180 KB, perf ≥0.95, a11y 1.0) is ignored by `lhci autorun` because the `.cjs` file is used, which the run's port 3101 confirms. `docs/performance/budgets.json` (script 180 KB, image 350 KB) is referenced by nothing. There are no product, article, listing or form templates in the LHCI matrix.
- **Sanity Studio** is confined to `/studio` (`next-sanity/studio`); public routes import only the client and fetch helpers. That is fine.
- **Repo weight.** `xsignon-home-beams.html` (9.8 MB) is untracked (git-ignored), so it does not ship. `reference/` is 5.1 MB tracked. `public/` is 9.0 MB across 53 files, with **duplicate binaries**: `home/img-02a71707.jpg` = `products/img-02a71707.jpg` = `products/ams.jpg` = `thinking/non-human-identities.jpg` (526 KB each), and `home/img-48a7fb34.jpg` = `products/img-48a7fb34.jpg` = `products/postureone.jpg` (321 KB).
- **15 largest files in `public/`:**
  1. `public/images/thinking/non-human-identities.jpg`, 526 KB
  2. `public/images/products/img-02a71707.jpg`, 526 KB
  3. `public/images/products/ams.jpg`, 526 KB
  4. `public/images/home/img-02a71707.jpg`, 526 KB
  5. `public/images/home/img-ccd69738.jpg`, 374 KB
  6. `public/images/home/img-bedb86b4.jpg`, 346 KB
  7. `public/images/home/img-74215995.jpg`, 343 KB
  8. `public/images/thinking/identity-first-controls.jpg`, 321 KB
  9. `public/images/products/postureone.jpg`, 321 KB
  10. `public/images/products/img-48a7fb34.jpg`, 321 KB
  11. `public/images/home/img-48a7fb34.jpg`, 321 KB
  12. `public/images/home/img-d10eb158.jpg`, 317 KB
  13. `public/images/home/img-1a9a6905.jpg`, 312 KB
  14. `public/images/proof/img-c033247b.jpg`, 210 KB
  15. `public/images/thinking/data-ai-security.jpg`, 206 KB
- **[Medium] Main-thread motion cost.** Per-frame `getComputedStyle` (PerspectiveGrid); a scroll handler without rAF (journey); SMIL repaint; two 2.2 s React re-renders of large SVGs that keep running offscreen; a coverflow interval that also runs offscreen.
- **[Low] RUM.** `WebVitals.tsx` sends beacons to the first-party `/api/telemetry/vitals` with no consent check. That is acceptable for first-party, cookieless data but should be documented.

---

## 5. Other notes

- `sitemap.ts` lists the noindex `/styleguide` and `/tokens` (:88-89), and redirected URLs (see 1.4). **[Low]**
- `layout.tsx` and `about/page.tsx:146-149` both emit Organization JSON-LD; `page.tsx:43-46` adds WebSite JSON-LD by hand instead of using `JsonLd`. **[Low]**
- Visual-regression baselines exist only as `*-Desktop-Chrome-win32.png`, including the "mobile" and "tablet" ones rendered in Desktop Chrome. CI greps them out (`playwright.config.ts:20`). **[Medium]**

---

## 6. Requirements compliance matrix

Status key: **Done**, **Partial**, **Not done**, or **Can't verify** (needs a browser, device, sign-off or approval). "Sheet stale" means the sheet says "Not started" although code exists. All 72 rows below say "Not started" in the sheet.

| ID | Requirement (short) | Code status | Evidence (file) | Sheet stale? |
|---|---|---|---|---|
| S-08 | Tokens → @theme, breakpoints, token page | **Partial** | `src/styles/tokens.css` feeds `@theme` with 640/760/900/1080/1200 and `/tokens` exists. **No spacing tokens**; 7k lines of CSS bypass them; 9 off-scale media queries. | Yes |
| S-09 | Self-host Inter | **Done** | `src/app/layout.tsx:15-20`; `font-src 'self'` in `next.config.ts:19`; no Google requests in LHCI | Yes |
| S-10 | Base styles, focus on both bands, reduced motion, style guide | **Partial** | `globals.source.css:65-98`, `/styleguide`. The focus ring is overridden by component box-shadows, there is no forced-colors rule, and the style guide documents unused components. | Yes |
| S-19 | Playwright and axe in CI | **Done** | `.github/workflows/ci.yml` e2e job; `e2e/a11y.spec.ts` (44 URLs). Local last run failed 12 tests. | Yes |
| S-20 | LHCI budgets per template | **Partial** | `lighthouserc.cjs` has only `/` and `/styleguide`; `.lighthouserc.json` and `budgets.json` are unused; Home currently fails | Yes |
| T-041 | Header dropdowns, keyboard, CMS | **Done** (minor issues) | `HeaderClient.tsx`, `Header.tsx`: Escape and click-outside, `aria-expanded`; focus not returned after Escape | Yes |
| T-042 | Mobile nav, focus management | **Partial** | `HeaderClient.tsx:196-300`: `aria-expanded` and close on route change, but no focus move, return or containment | Yes |
| T-043 | Footer from CMS, newsletter slot | **Partial** | `Footer.tsx`: groups from settings; **no newsletter slot** | Yes |
| T-044 | Breadcrumbs with current state and JSON-LD | **Partial** | `layout/Breadcrumb.tsx` on 2 pages; inline `nav.crumbs` elsewhere has no `aria-current`; JSON-LD via `createBreadcrumbSchema` | Yes |
| T-045 | Hero readable with motion off | **Done** | Canvases are `aria-hidden`; text is server-rendered (`HomeView.tsx:58-90`) | Yes |
| T-046 | Full and small CTA, CMS text | **Partial** | `common/ContactCta.tsx` is hard-coded; `blocks/CtaSection.tsx` (props) is dead; no small variant | Yes |
| T-047 | Display heading, section heading, bands | **Partial** | `.h1-acc` span reads as plain text (`HomeView.tsx:63-66`); `SectionHeading.tsx` is dead | Yes |
| T-048 | Cards with focus states and `aria-expanded` read-more | **Partial** | `ui/cards/*` exist but **none is imported**; pages use prototype markup | Yes |
| T-049 | Scroll reveal is no-JS and reduced-motion safe | **Done** (caveats) | `home-behaviors.ts:291-318` gated on `html.js` with a 1.6 s failsafe; `RevealWrapper.tsx` unused; SE and GlassCubes entrances have no failsafe | Yes |
| T-050 | Skip link and landmarks | **Done** | `SkipLink.tsx`, `layout.tsx:42-46` | Yes |
| T-052 | Product template from CMS | **Partial** | `products/[slug]/page.tsx:21-41` maps to static `*View.tsx`; CMS feeds metadata only | Yes |
| T-054 | Contact form states | **Partial** | `ContactForm.tsx` covers the states; SMS consent omitted by decision (needs sign-off) | Yes |
| T-058 | Thank-you page, gated, noindex | **Done** | `contact/thank-you/page.tsx:7-21` (cookie gate, `robots: noindex`) | Yes |
| T-082 | Products tabs and comparison column highlight | **Partial** | `productTabs` has correct keyboard support (`prototype-behaviours.ts:49-82`); **no column highlight** (`.col-hot` CSS unused) | Yes |
| T-083 | EvalOne page | **Partial** / Can't verify approval | `EvalOneView.tsx` (static) | Yes |
| T-084 | XSense page | **Partial** | `XSenseView.tsx`; tabs lack arrow keys | Yes |
| T-085 | Passwordless Keys page | **Partial** | `KeysView.tsx`, `passwordless-keys/[model]` | Yes |
| T-086 | AMS page | **Partial** | `AmsView.tsx` | Yes |
| T-087 | Compare page, table at 320 px | **Partial** / Can't verify 320 px | `CompareView.tsx:30-31` (`.tbl-wrap` uses `overflow:hidden`) | Yes |
| T-088 | Related items and framework blocks from CMS | **Not done** (rendering) | Related rows are hard-coded in views; the schema has references | — |
| T-089 | Products design QA | **Can't verify** | `e2e/products.spec.ts` only | — |
| T-090 | Homepage schema and wiring | **Partial** | `sanity/schemaTypes/singletons/home.ts` and `queries/home.ts` exist; **`HomeView` ignores them** (no imports) | Yes |
| T-091 | Hero slider with pause | **Not done** (design changed) | No slider in `HomeView`; `heroCard()` dead (`home-behaviors.ts:40-98`) | — |
| T-092 | Product carousel | **Partial** | Coverflow has prev, next, dots and keys, but **autoplay without a pause control** (`home-behaviors.ts:151-159`) | Yes |
| T-093 | Partner hub with links, no waiting | **Not done** | Replaced by `SecurityEcosystem` (no links; mobile requires waiting) | — |
| T-094 | Solutions and thinking bands from content | **Partial** | Bands exist but are hard-coded (`HomeView.tsx:567-905`) | Yes |
| T-095 | Contact CTA band | **Done** | `ContactCta.tsx` links to `/contact` | Yes |
| T-097 | Home QA and performance budget | **Not done** | LHCI: TBT 330 ms, JS 316 KB, both over budget | — |
| T-099 | Proof hub | **Partial** | `ProofView.tsx` static; "published only" is not enforced by the CMS | Yes |
| T-100 | Case study template | **Partial** | `Case*View.tsx` static per case; `proof/[slug]/page.tsx` | Yes |
| T-106 | Solution schema and hub | **Partial** | `sanity/.../solution.ts` exists; hub is a static `SolutionsView.tsx` | Yes |
| T-107 | Solution template with accessible tab panels | **Partial** | `Sol*View.tsx` have **no tabs** (static sections) | Yes |
| T-114 | Thinking hub with read-more toggles | **Partial** | `ThinkingView.tsx` has no read-more toggles; the toggle cards are dead | Yes |
| T-115 | Article template: progress line, byline, slots | **Partial** | `Article*View.tsx` have no progress line, author/date block, or subscribe and white-paper slots | Yes |
| T-121 | Industry Thinking page | **Done** (code) / Can't verify approval | `IndustryView.tsx`, `thinking/industry/page.tsx` | Yes |
| T-124 | About with in-page nav | **Partial** | `about/page.tsx`: no in-page nav, no "Our thinking" section | Yes |
| T-125 | Expanding "What we do" cards | **Not done** | Static `ul.ab-cap` (`about/page.tsx:181-196`); `AboutWhatWeDo.tsx` dead | — |
| T-126 | Why XSignOn hub with pause | **Not done** | Uses `SecurityEcosystem` (no pause); `WhyXSignOnHub.tsx` (with `#wxPause`) dead | — |
| T-127 | Enterprise page | **Done** (code) / Can't verify approval | `app/enterprise/page.tsx` | Yes |
| T-128 | Jobs and Careers, expiry | **Partial** | `lib/job.ts:7-9` filters on `active`, **not on an expiry date**; `CareersView` static; JobPosting JSON-LD present | Yes |
| T-130 | ROI logic and tests | **Done** | `lib/roi.ts`, `src/tests/roi.test.ts` | Yes |
| T-131 | ROI page labels, announcements, errors | **Partial** | `RoiCalculatorClient.tsx`: labels and `aria-live`; **no error messages** | Yes |
| T-134 | 404, error and moved states | **Done** (moved state unverified) | `app/not-found.tsx`, `app/error.tsx` | Yes |
| T-135 | Analytics after consent, inventory | **Partial** | `lib/analytics.ts` API with **no banner UI** and no analytics loaded; `docs/compliance/script-inventory.md` | Yes |
| T-137 | Motion inventory and cap | **Partial** | `docs/motion-inventory.md` is inaccurate; the cap counts canvases only | Yes |
| T-138 | BeamsCanvas rules | **Partial** | Visibility, tab-hidden, static frame and failure safety are met; **no fps cap**; coordinator never resumes | Yes |
| T-139 | PerspectiveGrid | **Partial** | Same as T-138, plus per-frame `getComputedStyle` | Yes |
| T-140 | Motion on page heroes within cap | **Partial** | 15 views use `BeamsCanvas`; coordinator pause/resume bug | Yes |
| T-141 | Pause controls on widgets that move more than 5 s | **Not done** | Coverflow, SE, GlassCubes, think carousel and SMIL have no pause | — |
| T-142 | Solution graphics with static fallbacks | **Partial** | `SolutionArt.tsx` has static `aria-label`s and reduced-motion CSS; not a reuse of the home graphics | Yes |
| T-143 | Motion on the target profile | **Not done** | TBT over budget; the motion test is tautological | — |
| T-144 | Reduced-motion and no-JS fallbacks verified | **Partial** | CSS paths are safe; SMIL plays before hydration; the motion spec is failing and stale | Yes |
| T-156 | axe on every template | **Partial** | Runs in CI on desktop only; misses mobile-only contrast and heading order | Yes |
| T-157 | Manual keyboard and screen-reader pass | **Can't verify**; evidence not credible | `keyboard-screenreader-audit.md` cites non-existent controls | — |
| T-158 | Zoom, reflow, touch, errors | **Partial** | 9 px dots fail 2.5.8; `reflow-and-a11y.test.ts` is tautological | — |
| T-159 | Contrast on every band | **Not done** (evidence invalid) | `contrast.test.ts` uses the wrong palette; a real 3.26:1 failure exists | — |
| T-160 | LHCI green, field RUM | **Partial** | `WebVitals.tsx` RUM is live; LHCI red | Yes |
| T-164 | Cross-browser and devices | **Can't verify** | Playwright Firefox/WebKit/mobile projects run locally only (`playwright.config.ts:21-30`) | — |
| T-165 | End-to-end suite in CI | **Partial** | Suite present; local last run failed 12 tests; specs reference removed markup | Yes |
| T-166 | Visual regression at 3 breakpoints | **Partial** | Baselines are win32 Desktop Chrome only and skipped in CI | Yes |

The sheet is out of date for every Done and Partial row marked "Yes" above, which is about 55 rows. The rows without a "Yes" are not done at all or cannot be verified from code, so "Not started" is broadly right for them. However, T-157 and T-159 have sign-off docs that claim completion and do not match the code.

---

## 7. Fix order

1. **Accessibility blockers.**
   - Add visible pause/play controls, honoured by keyboard, to the coverflow, SecurityEcosystem, GlassCubes, the think carousel and the SMIL illustrations. Alternatively, stop auto-advancing after one cycle.
   - Give SecurityEcosystem buttons on phones so all four items can be reached without waiting.
   - Fix the SE pill contrast.
   - Make the focus ring use `outline` (plus `outline-offset`) instead of a base-layer `box-shadow`, and add `@media (forced-colors: active)`.
2. **Evidence integrity.** Regenerate the contrast test from `tokens.css`. Rewrite or retract `contrast-audit-palette3.md`, `keyboard-screenreader-audit.md`, `motion-inventory.md` and `reflow-and-a11y.test.ts`. Fix the 12 failing end-to-end tests.
3. **Performance.**
   - Add `sizes` to all `<Image>`.
   - Pause the 2.2 s widgets and SMIL when offscreen.
   - Cache the grid layer and drop the per-frame `getComputedStyle` in the canvases, add a 30–45 fps cap, and make the coordinator resume the previous canvas.
   - Throttle the journey scroll handler with rAF.
   - Purge the roughly 32% unused `prototype.css`.
4. **Design system.**
   - Add spacing, duration and z-index tokens.
   - Collapse the two `.rv` and `.h*` definitions and remove the off-scale breakpoints.
   - Delete the about 2,300 lines of dead components and the shadowed routes, and remove `styled-components`.
   - Move to `@tailwindcss/postcss` and stop committing `globals.css`.
5. **Requirements.** Wire Home, Products, Solutions and Thinking to their CMS schemas (T-052, T-090, T-094, T-106), then update the sheet's STATUS column.
