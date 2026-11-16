---
name: redesign-skill
description: >-
  Universal refactoring playbook for upgrading legacy or clunky UI into high-taste, accessible, and performant interfaces. Enforces non-breaking visual overhauls, DOM simplification, token harmonization, and state resilience across modern web applications.
---

# Redesign-Skill: Systematic UI Refactoring & Architectural Uplift

## Overview
**Redesign-Skill** provides an uncompromised, universal engineering protocol for transforming legacy, clunky, or half-baked frontend interfaces into platform-grade, high-taste products.

Redesigning software is not simply slapping new CSS classes onto old markup. It is a disciplined engineering process: **elevating visual hierarchy, eliminating DOM bloat, and standardizing interaction mechanics while strictly preserving underlying business logic, API contracts, and state models**.

---

## Role in the Modular Stack
* **Stack Position**: **Layer 3 — Systematic Refactoring & Architectural Uplift (Skill #8)**
* **Inputs**: Existing components flagged by `taste-skill` audit or legacy codebases.
* **Governing Rules**: Informs transformations using `awesome-design-md` blueprints, `gpt-taste` clean code directives, and `web-interface-guidelines` accessibility/motion standards.
* **Downstream Consumers**: Feeds directly into `output-skill` for final verification.

---

## 1. The Core Principle: Contract Preservation

A visual and structural redesign must never break runtime behavior:
* **Preserve Prop Interfaces**: Keep existing component prop signatures backward-compatible (deprecate unused props cleanly; do not arbitrarily rename callbacks).
* **Preserve Business Logic & Data Flow**: Maintain query hooks, mutation handlers, form submission pathways, and parent event emissions.
* **Decouple Logic from Presentation**: If an existing component tightly couples network fetching with render JSX, separate it into a pure presentational component and a lightweight container.

---

## 2. The 5-Stage Redesign Methodology

When tasked with redesigning a component or page, execute these 5 stages sequentially:

### Stage 1: Structural Diagnostic & Anti-Pattern Audit
Catalog the specific defects in the legacy implementation:
1. **Visual Flaws**: Excessive drop shadows, neon accents, arbitrary padding (`p-[13px]`), missing contrast.
2. **Structural Flaws**: Nested `<div>` soup, rigid pixel widths (`w-[420px]`), missing `min-w-0` on truncated flex children.
3. **Accessibility Flaws**: Naked `outline-none`, missing keyboard focus rings, non-semantic buttons.
4. **State Flaws**: Flash of empty content, unhandled error states, missing loading indicators.

### Stage 2: DOM Deconstruction & Layout Simplification
Strip away unnecessary structural complexity:
* Collapse 3–4 nested wrapper `<div>`s into a single semantic container (`<article>`, `<section>`, `<nav>`).
* Replace rigid absolute positioning with fluid CSS Grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`) or Flexbox.
* Ensure container constraints: Replace fixed widths with fluid max-widths (`w-full max-w-5xl mx-auto`).

### Stage 3: Design Token Normalization
Align all visual primitives with `awesome-design-md` tokens:
* **Backgrounds & Borders**: Replace arbitrary hex colors with semantic tokens (`bg-card`, `border-border/60`).
* **Radius Standardization**: Normalize mismatched radii to the standard scale (`rounded-xl` for cards, `rounded-lg` for controls, `rounded-full` for badges).
* **Elevation**: Replace heavy drop shadows with border-first micro-elevation (`shadow-xs` + hairline highlight).

### Stage 4: Typography & Micro-Interaction Injection
Elevate the reading experience and tactile feel:
* Enforce typographic hierarchy: tight tracking on titles (`tracking-tight font-bold`), relaxed leading on body text.
* Tag all numeric data, counts, and timers with `tabular-nums`.
* Replace raw three-dot strings `...` with the unicode ellipsis `…`.
* Add tactile micro-interactions: `active:scale-[0.98] transition-transform` and accessible focus rings `focus-visible:ring-2 focus-visible:ring-primary`.

### Stage 5: State & Feedback Elevation
Upgrade edge-state handling using `soft-skill` and `web-interface-guidelines`:
* Replace blank loading states with structured skeleton cards.
* Replace generic error text with the **3-Part Constructive Error Pattern** (What + Why + Actionable Next Step).
* Replace generic button labels with explicit outcome verbs (*"Save Changes"* over *"Submit"*).

---

## 3. Canonical Transformation: Before & After

### Example: Legacy Clunky Card ➔ Platform-Grade Component

#### ❌ The Legacy Implementation (AI Slop / Clunky)
```tsx
// ❌ Clunky, poor contrast, arbitrary shadow, naked outline, missing tabular numbers
<div className="bg-slate-800 p-6 rounded-2xl shadow-2xl border-2 border-purple-500/50 transition-all hover:scale-105">
  <div className="flex justify-between">
    <h3 className="text-white text-lg font-normal">Active Connections</h3>
    <div className="bg-purple-600 p-2 rounded-full">
      <Network className="text-white" />
    </div>
  </div>
  <p className="text-4xl text-white font-bold my-2">1,420</p>
  <span className="text-green-400 text-sm">+12% vs last week</span>
  <button onClick={onView} className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg outline-none hover:bg-purple-700">
    Click Here
  </button>
</div>
```

#### ✅ The Redesigned Implementation (Platform-Grade Standard)
```tsx
// ✅ Calm confidence, hairline border, tabular numbers, accessible focus, tactile press
<div className="rounded-xl border border-border/60 bg-card p-5 shadow-xs hover:border-primary/40 transition-colors duration-150 group">
  <div className="flex items-center justify-between text-muted-foreground mb-3">
    <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/80 truncate">
      Active Connections
    </span>
    <Network className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
  </div>
  <div className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
    1,420
  </div>
  <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-emerald-500 font-medium">
    <TrendingUp className="h-3 w-3 shrink-0" aria-hidden="true" />
    <span className="tabular-nums">+12.0% from previous baseline</span>
  </p>
  <Button
    variant="outline"
    size="sm"
    onClick={onView}
    className="w-full mt-4 justify-between text-xs font-semibold"
  >
    <span>Inspect Connection Pool</span>
    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
  </Button>
</div>
```

---

## 4. Redesign Quality Checklist

Before finalizing any refactored component:
* [ ] **Contract Intact**: Are all original props, callbacks, and data structures preserved?
* [ ] **No `transition: all`**: Are transitions explicitly scoped (`transition-colors`, `transition-transform`)?
* [ ] **Accessible Focus**: Is naked `outline-none` eliminated and replaced with `focus-visible:ring-2`?
* [ ] **Tabular Figures**: Are all numeric metrics, timestamps, and percentages tagged with `tabular-nums`?
* [ ] **Constructive Copy**: Are button labels outcome-oriented and error messages actionable?
* [ ] **Mobile Responsive**: Does the layout collapse cleanly on mobile viewports without horizontal scrolling?

