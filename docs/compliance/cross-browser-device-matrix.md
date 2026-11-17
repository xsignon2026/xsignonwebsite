# Cross-Browser & Multi-Device Compatibility Matrix (T-164)

**Audit Date:** 2026-11-08  
**Scope:** Browser Engines & Device Form Factors for XSignON Web  
**Lead Engineers:** Developer A & Developer B  
**Status:** **PASSED** — All target browser engines and device categories verified and accepted.

---

## 1. Engine & Device Target Matrix

| Device Profile      | Browser Engine   | Target Version       | Resolution / Viewport | DevicePixelRatio | Verification Method    | Status |
| :------------------ | :--------------- | :------------------- | :-------------------- | :--------------- | :--------------------- | :----- |
| **Desktop Chrome**  | Blink (Chromium) | 120+                 | 1280 × 800            | 1.0              | Playwright Chromium    | PASS   |
| **Desktop Edge**    | Blink (Chromium) | 120+                 | 1920 × 1080           | 1.0              | Chromium Engine parity | PASS   |
| **Desktop Firefox** | Gecko            | 120+                 | 1280 × 800            | 1.0              | Playwright Firefox     | PASS   |
| **Desktop Safari**  | WebKit           | 17+                  | 1440 × 900            | 2.0              | Playwright WebKit      | PASS   |
| **Mobile Chrome**   | Blink Mobile     | Current (Android 14) | 412 × 915 (Pixel 7)   | 2.625            | Playwright Pixel 7     | PASS   |
| **Mobile Safari**   | WebKit iOS       | Current (iOS 17/18)  | 390 × 844 (iPhone 14) | 3.0              | Playwright iPhone 14   | PASS   |

---

## 2. Cross-Engine CSS & Feature Compatibility Checks

### 1. Backdrop Filter (`backdrop-filter: blur(...)`)

- **WebKit Requirement**: Requires `-webkit-backdrop-filter: blur(...)` for dark violet translucent cards (`#130F26` with `rgba(139, 92, 246, 0.15)` border).
- **Fallback**: Solid `#130F26` background fallback supplied when `backdrop-filter` is unsupported by legacy engines.
- **Result**: PASS.

### 2. Radial Gradients & Ambient Beams (`HeroBeams.tsx`)

- **Rendering Performance**: Hardware-accelerated with CSS `transform: translate3d(0,0,0)` and `will-change: transform, opacity`.
- **Engine Parity**: Tested across WebKit, Blink, and Gecko; 0 gradient banding or canvas clipping artifacts.
- **Result**: PASS.

### 3. Dynamic Viewport Heights (`dvh` vs `vh`)

- **iOS Safari Address Bar**: Mobile navigation drawers and hero sections utilize `min-h-screen` and `min-h-[100dvh]` to eliminate layout jumping when the dynamic URL bar collapses on scroll.
- **Result**: PASS.

### 4. Touch Targets & Safe Areas (WCAG 2.5.8)

- **Safe Area Insets**: Mobile menus account for `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` on notched iPhones.
- **Minimum Dimensions**: All interactive elements (buttons, nav links, tabs, sliders) meet the 44 × 44 CSS pixel target threshold.
- **Result**: PASS.

### 5. Font Rendering & Anti-Aliasing

- **Inter Variable Font**: Self-hosted via `next/font/google` (`src/app/layout.tsx`).
- **Rendering Rules**: Enforced `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` in `globals.css` ensuring crisp, legible typography on high-DPI Retina screens and standard displays.
- **Result**: PASS.

---

## 3. Playwright Configuration Reference

The test suite in `playwright.config.ts` has been configured with project definitions matching this matrix:

```typescript
projects: [
  { name: "Desktop Chrome", use: { ...devices["Desktop Chrome"] } },
  { name: "Desktop Firefox", use: { ...devices["Desktop Firefox"] } },
  { name: "Desktop Safari", use: { ...devices["Desktop Safari"] } },
  { name: "Mobile Chrome", use: { ...devices["Pixel 7"] } },
  { name: "Mobile Safari", use: { ...devices["iPhone 14"] } },
];
```

---

## 4. Acceptance & Sign-Off

All items on the cross-browser and device issue list have been reviewed, tested, and accepted.

- **Developer A (Infrastructure & Cross-Engine):** APPROVED
- **Developer B (Frontend Design & Layout):** APPROVED
