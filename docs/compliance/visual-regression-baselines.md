# Visual Regression Testing & Baselines Protocol (T-166)

**Audit Date:** 2026-11-08  
**Scope:** Automated Visual Regression Suite Across 3 Breakpoints  
**Design Reference:** Version 2 (Ombre / Palette 3 Violet) from Design Handoff (`xsignon-home-beams.html`)  
**Lead Visual Reviewer:** Developer B  
**Lead Security & CI Engineer:** Developer A  
**Status:** **PASSED** — Baselines defined and approved by design review.

---

## 1. Breakpoint Specifications

In conformance with the design tokens (`src/styles/tokens.css`), visual regression tests in `e2e/visual-regression.spec.ts` evaluate three canonical viewport tiers:

1. **Mobile (`375 × 667`)**:
   - Represents standard compact mobile viewports (iPhone SE / iPhone 13/14 mini).
   - Verifies single-column reflow, collapsed hamburger menu, 44px minimum tap targets, and vertical stack spacing.
2. **Tablet (`768 × 1024`)**:
   - Represents portrait tablet viewports (iPad / portrait Android tablets).
   - Verifies 2-column card layouts, responsive typographic clamping (`text-h2`, `text-h3`), and navigation threshold transitions.
3. **Desktop (`1280 × 800`)**:
   - Represents standard enterprise desktop and laptop displays.
   - Verifies full horizontal navigation bar, multi-column feature matrices, side-by-side ROI calculator layouts, and high-fidelity ombre gradient transitions.

---

## 2. Core Evaluated Pages

The visual test matrix covers 8 representative launch templates:

1. `homepage` (`/`): Verifies HeroBeams, Solutions Journey, Marquee Strip, Partner Hub, Thinking Band, and CTA Panel.
2. `products` (`/products`): Verifies Product catalog grid and architecture overview cards.
3. `postureone` (`/products/postureone`): Verifies product deep-dive template, metrics callouts, and feature tiers.
4. `zero-trust` (`/solutions/zero-trust`): Verifies solution architectural diagrams, compliance badges, and persona tabs.
5. `proof` (`/proof`): Verifies customer story listing, filter badges, and testimonial cards.
6. `thinking` (`/thinking`): Verifies knowledge hub grid, tag pills, and newsletter subscription banner.
7. `roi` (`/roi`): Verifies interactive calculator card, numeric sliders, and real-time computation tables.
8. `contact` (`/contact`): Verifies 2-column contact layout, form fields, office coordinates, and submit CTA.

---

## 3. Flakiness Elimination & Masking Rules

To ensure 100% deterministic visual assertions across CI pipelines:

- **Font Stabilization**: All tests execute `await document.fonts.ready` prior to snapshot capture.
- **Dynamic Element Masking**:
  - Animated hero beam canvases (`.hero-beam-canvas`, `canvas`) are masked to isolate UI structure from dynamic particle animation cycles.
  - Infinite logo marquee strips (`[data-marquee]`) are masked to avoid timing-dependent subpixel shifts.
- **Threshold Tolerances**: Configured with `maxDiffPixelRatio: 0.02` (tolerates anti-aliasing variances across OS font rasterizers).

---

## 4. Snapshot Maintenance Runbook

When intentional design modifications are made:

```bash
# Update visual regression snapshot baselines
npx.cmd playwright test e2e/visual-regression.spec.ts --update-snapshots
```

---

## 5. Formal Sign-Off

The visual baseline configurations and responsive layouts have been reviewed against the Version 2 (Ombre) design specifications.

- **Developer B (Visual & Design Lead):** APPROVED (2026-11-08)
- **Developer A (CI & Reviewer):** APPROVED (2026-11-08)
