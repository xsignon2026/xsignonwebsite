---
name: taste-skill
description: >-
  Universal standard for high-taste frontend aesthetics, mathematical typography, spatial rhythm, and anti-slop design engineering. Includes a full-stack contextual auditor enforcing UI polish, API contract parity, and zero-secret client inspect security across any modern web application.
---

# Taste Skill: The Universal Frontend & Architecture Standard

## Overview
**Taste Skill** is an uncompromised design and engineering doctrine for modern web applications. It bridges elite aesthetic craft (typography, spatial tension, tactile micro-interactions) with rigorous full-stack systems engineering.

It enforces a simple truth: **great software feels crafted, not generated**. It systematically eliminates the hallmarks of generic "AI slop" (cluttered cards, radioactive gradients, arbitrary spacing, unhandled edge states, layout jank) in favor of calm, intentional, platform-grade software.

---

## 1. The Anti-Slop Design Doctrine

Eliminate the visual clichés that reveal unconsidered, template-generated code:

### The Prohibitions
* ❌ **No Arbitrary Purple/Cyan Gradients**: Never slap decorative radial blur balls, neon purple glows, or iridescent border gradients onto dark backgrounds unless explicitly defining an intentional brand motif.
* ❌ **No Floaty Disconnected Card Soup**: Avoid isolating every text block into its own rounded rectangle with heavy, muddy drop shadows (`shadow-xl` / `shadow-2xl`). Surfaces must feel grounded within a unified visual plane.
* ❌ **No Naked Outline Removal**: Never write `outline-none` or `outline: none` without providing an immediate, high-contrast, accessible replacement (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`).
* ❌ **No Indiscriminate Transitions**: Never write `transition: all` or `transition-all`. Transitioning geometric properties (`width`, `height`, `margin`, `padding`) forces continuous layout recalculations on the main thread. Explicitly declare target properties (`transition-colors duration-150`, `transition-transform duration-200`, `transition-opacity`).
* ❌ **No Typographic Orphans**: Headings must employ `text-wrap: balance` or `text-pretty` to eliminate single-word dangling widows.

### The Craft Standards
* ✅ **Quiet Confidence**: Rely on negative space, precise alignment, and typography rather than excessive borders and icons.
* ✅ **Border-First Micro-Elevation**: Achieve depth using hairline borders (`border border-border/60` or `ring-1 ring-white/10`) paired with subtle micro-shadows (`shadow-xs` or `shadow-sm`) and inner highlights.
* ✅ **Cohesive Surface Cadence**: Maintain an unambiguous surface hierarchy:
  * **Canvas Ground**: `bg-background` (the foundational plane)
  * **Card Container**: `bg-card` (distinguished via subtle hairline borders)
  * **Interactive / Secondary Surface**: `bg-secondary` / `hover:bg-accent`

---

## 2. Mathematical Typography & Micro-Typography

Typography is 90% of visual design. Enforce strict typographic discipline:

### Hierarchy & Spatial Tracking
* **Hero / Display Headings (`text-3xl` – `text-5xl`)**: Tighter tracking (`tracking-tight` or `-0.025em`), bold/black font weight, and balanced wrapping (`text-wrap: balance`).
* **Section Headings (`text-lg` – `text-xl`)**: Subtle tracking reduction (`tracking-tight`), semibold font weight.
* **Body Text (`text-sm`, `text-base`)**: Normal tracking with comfortable reading leading (`leading-relaxed`).
* **Micro-Labels & Meta Badges (`text-[10px]`, `text-xs`)**: Uppercase with expanded tracking (`tracking-wider` or `tracking-widest`), medium/semibold font weight.

### Typographic Glyph Rigor
* **Ellipses**: Always use the single unicode character `…` (`&hellip;` / `\u2026`), never three periods `...`.
* **Tabular Figures**: Every numeric figure, timer, financial metric, countdown, table column, or telemetry readout **MUST** use `tabular-nums` (`font-variant-numeric: tabular-nums`) to prevent horizontal jitter during dynamic updates.
* **Non-Breaking Spaces (`&nbsp;` / `\u00A0`)**: Bind units and key shortcuts to their preceding labels so they never wrap to a lone line:
  * `10 MB`, `24 ms`, `100 USD`
  * `⌘ K`, `Ctrl Shift P`
* **Continuous Action States**: Append unicode ellipses to active verb states: `"Connecting…"`, `"Saving…"`, `"Authenticating…"`.

---

## 3. Spatial Cadence & Geometry

* **Strict 4px/8px Spatial Scale**: All margins, padding, and gaps must adhere to a strict 4px mathematical cadence (`p-1` = 4px, `p-2` = 8px, `p-3` = 12px, `p-4` = 16px, `p-6` = 24px, `p-8` = 32px).
* **Flexbox Truncation Protection**: Any flex child containing truncated text (`truncate` or `line-clamp-*`) **MUST** include `min-w-0` on its immediate parent container to prevent flex item overflow.
* **Empty & Edge States**: Empty containers are orientation guides, not blank dead-ends. Every dynamic container must define an empty state and a skeleton/shimmer state.

---

## 4. Interactive States & Micro-Interactions

Every interactive element must provide unmistakable feedback across all 5 states:
1. **Rest**: Accessible contrast exceeding WCAG 2.2 AA (4.5:1 for body text, 3:1 for large text/icons).
2. **Hover**: Smooth, subtle background or border contrast shift (`hover:bg-accent hover:text-accent-foreground transition-colors duration-150`).
3. **Active (Pressed)**: Physical, tactile depression (`active:scale-[0.98] transition-transform`).
4. **Focus-Visible**: High-contrast, keyboard-only focus ring with clear offset (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).
5. **Disabled**: Visual opacity reduction with `disabled:pointer-events-none disabled:opacity-50` and instant spinner substitution during pending mutations.

---

## 5. Full-Stack Contextual Auditor Mode

When invoked to review, audit, or inspect code, execute this three-dimensional audit:

### Dimension 1: Frontend Aesthetic & Structural Scan
* Scan for anti-patterns: `transition: all`, naked `outline-none`, missing `tabular-nums`, three-dot ellipses `...`, unhandled overflow, and missing `alt` attributes.
* Verify responsive breakpoints: ensure layouts collapse cleanly from multi-column desktop grids to fluid mobile stacks without unwanted horizontal scrollbars (`overflow-x-hidden`).

### Dimension 2: Backend & API Integration Parity
* **Route Consistency**: Verify that client-side fetch paths match backend router prefixes, versioning schemes (`/api/v1/...`), and HTTP methods.
* **Schema & Model Parity**: Verify that client deserialization matches backend serialization (field names, casing, optional vs nullable fields, enum variants).
* **HTTP Error Handling**: Ensure 400, 401, 403, 404, 422, and 500 status codes are handled with user-facing recovery actions rather than blank screens or console dumps.

### Dimension 3: Zero-Secret / Inspect Element Security Gate
Inspect the browser-facing footprint to guarantee that **NO sensitive data or secrets can be uncovered in DevTools / Inspect Element**:
* **Public Environment Variable Isolation**: Confirm that NO private API keys, database credentials, server secrets, or encryption keys are prefixed with public framework variables (e.g. `NEXT_PUBLIC_*`) or bundled into client JS.
* **DOM Attribute Sanitization**: Prohibit writing sensitive tokens, password hashes, or internal system traces into HTML attributes (`data-*`, `id`, hidden inputs).
* **Console Logging Elimination**: Flag and remove all `console.log` statements that dump tokens, credentials, or backend stack traces.
* **HttpOnly Cookie Standard**: Verify that session tokens and refresh tokens are stored in `HttpOnly`, `SameSite`, and `Secure` cookies rather than accessible `localStorage`.

---

## 6. Auditor Reporting & Remediation Protocol

Output all audit findings using this standardized, terse format:

```text
## [File / Component Path]

[path/to/file.tsx:line] - [Category: AESTHETIC | API_PARITY | SECURITY] - [Terse violation description]
```

Followed immediately by the surgical drop-in diff remediation:

```diff
- <button className="outline-none transition-all hover:shadow-lg">
+ <button className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-150 active:scale-[0.98]">
```
