---
name: web-interface-guidelines
description: >-
  Pervasive quality, accessibility, performance, and motion verification gate based on Vercel's Web Interface Guidelines. Evaluates and enforces smooth compositor-only animations, focus visibility, form mechanics, zero layout thrashing, and strict semantic HTML across all frontend components.
---

# Web Interface Guidelines: Pervasive Quality & Motion Gate

## Overview
Based directly on **Vercel's Web Interface Guidelines**, this skill functions as a **continuous, pervasive verification gate** across all stages of frontend design, component generation, and refactoring.

It guarantees that every web interface built is buttery-smooth, accessible to all users, highly performant, resilient to edge cases, and completely free of interaction anti-patterns.

---

## Role in the Modular Stack
* **Stack Position**: **Cross-Cutting Quality, Motion & Security Layer (Skill #2)**
* **Invocation Protocol**: Intersects every generation stage (authoring, refactoring, redesign, and final output).
* **Companion Skills**: Complements `taste-skill` (visual craft) by providing the technical, interaction, and accessibility bedrock.

---

## 1. Animation, Motion & Transitions

Ensure motion feels premium, tactile, and physically grounded without causing compositor jank or vestibular discomfort:

* **Compositor-Friendly Properties Only**: Animate strictly with `transform` and `opacity`. Never animate `width`, `height`, `margin`, `padding`, `top`, `left`, or `filter`.
* **Ban `transition: all`**: Never write `transition: all` or `transition-all`. Always explicitly list the transitioned properties (`transition-colors duration-150`, `transition-transform duration-200`, `transition-opacity`).
* **Respect `prefers-reduced-motion`**:
  * Every animation or continuous loop must honor the user's OS preference (`motion-reduce:transition-none`, `motion-reduce:animate-none`).
  * Autoplay motion lasting >5 seconds alongside other content must include pause, stop, or hide controls.
* **Interruptible Motion**: Animations must respond immediately to mid-flight user interruptions (e.g. canceling a drawer open on backdrop tap or keydown).
* **Transform Origin**: Explicitly configure `transform-origin` when scaling or rotating elements (e.g., dropdowns originating from anchor bounds).
* **Recommended Physics**: For complex layout shifts, exit animations, and spring physics, use [`motion`](https://motion.dev/) (Framer Motion) instead of fragile CSS keyframes.

---

## 2. Focus States & Keyboard Accessibility

Interactive components must be 100% navigable via keyboard:

* **No Naked `outline-none`**: Never write `outline-none` or `outline: none` without providing an accessible focus ring replacement.
* **`:focus-visible` Over `:focus`**: Use `focus-visible:` to prevent distracting focus outlines when interacting via mouse/touch while preserving high-contrast rings for keyboard users:
  ```html
  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
  ```
* **Compound Controls**: Use `focus-within:` on parent containers (e.g. search bars with embedded icon buttons or multi-segment inputs).
* **Non-Occlusion**: Sticky headers, floating toolbars, and fixed footers must never visually obscure a focused element (`scroll-margin-top` on headings and target anchors).

---

## 3. Semantic HTML & Accessibility (a11y)

* **Semantic Elements Over `<div>`**:
  * Links that navigate must use `<a>` or `<Link>` (supporting Cmd/Ctrl+click and middle-click). Never attach navigation `onClick` handlers to `<div>` or `<span>`.
  * Actions that trigger mutations must use `<button type="button">` or `<button type="submit">`.
* **Icons & Media**:
  * Decorative icons must have `aria-hidden="true"`.
  * Icon-only buttons must have an explicit `aria-label` describing the action (`aria-label="Close dialog"`).
  * Images require meaningful `alt` text (or `alt=""` if strictly decorative).
* **Heading Hierarchy**: Enforce sequential heading levels (`<h1>` through `<h6>`). Include a hidden skip-link at the top of the DOM for direct navigation to `<main>`.
* **Live Regions**: Asynchronous updates (toasts, real-time status badges, form validation errors) must announce to assistive technologies using `aria-live="polite"`.

---

## 4. Forms & Input Mechanics

Form friction ruins user experience. Enforce these mechanical standards:

* **Never Block Paste**: Never intercept `onPaste` with `preventDefault()`. Users must be allowed to paste passwords, OTPs, codes, and formatted strings.
* **Input Attributes & Virtual Keyboards**:
  * Provide meaningful `name` and `autocomplete` attributes (`autocomplete="email"`, `autocomplete="current-password"`, `autocomplete="one-time-code"`).
  * Set correct `type` (`email`, `tel`, `url`, `number`) and `inputmode` (`inputmode="numeric"`).
  * Set `spellCheck={false}` on email inputs, API keys, codes, and usernames.
* **Hit Targets & Labels**:
  * Form labels must be clickable and programmatically bound to their inputs via `htmlFor` or by nesting.
  * Checkboxes and radio buttons: label text and checkbox element must share a unified hit target (no dead zone between the box and text).
* **Loading & Error Feedback**:
  * Submit buttons must remain enabled until the network request starts, then immediately disable with a loading spinner.
  * Display validation errors inline next to the invalid input. Focus the first field with an error on submit.
* **Unsaved Changes**: Warn users before accidental tab closure or route navigation when a form has unsaved modifications.

---

## 5. Performance & Layout Stability (CLS Prevention)

Prevent Core Web Vitals degradation (Cumulative Layout Shift & Interaction to Next Paint):

* **Zero Layout Reads in Render**: Never call `getBoundingClientRect()`, `offsetHeight`, `offsetWidth`, or `scrollTop` inside the render cycle. Batch DOM measurements in `useEffect` / `requestAnimationFrame`.
* **Explicit Media Dimensions**: Every image or video container must define explicit `width` and `height` (or an aspect ratio box) to reserve space and eliminate layout shifts.
* **List Virtualization**: Any dataset or list rendering >50 dynamic items (e.g. audit logs, document catalogs, history messages) must use virtualization (e.g., [`virtua`](https://github.com/inokawa/virtua) or `content-visibility: auto`).
* **Controlled Inputs**: Controlled inputs must have lightweight `onChange` handlers with zero blocking computations per keystroke.
* **Font Loading**: High-priority fonts must specify `font-display: swap` to prevent invisible text flashes (FOIT).

---

## 6. Navigation, URL State & Deep-Linking

* **URL as Single Source of Truth**: Stateful UI filters, selected tabs, pagination indices, and expanded preview drawers should synchronize with URL search parameters (e.g., via `nuqs` or Next.js `useSearchParams`).
* **Destructive Action Safety**: Destructive actions (deleting a document, revoking access, wiping history) must require an explicit confirmation modal or provide a timed undo window.

---

## 7. Touch, Gestures & Safe Areas

* **Eliminate Tap Delays**: Apply `touch-action: manipulation` to interactive elements to eliminate the 300ms double-tap zoom delay on mobile devices.
* **Modal Containment**: Apply `overscroll-behavior: contain` to modals, bottom drawers, and sidebar sheets to prevent background page scroll-chaining.
* **Notch & Safe Areas**: Full-bleed mobile headers and footers must incorporate `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.

---

## 8. Anti-Patterns Matrix (Immediate Audit Flags)

Flag and reject any occurrence of these anti-patterns:

| Anti-Pattern | Why It Is Flagged | Required Standard |
| :--- | :--- | :--- |
| `transition: all` | Forces layout recalculation and causes jank | Target specific properties (`transition-colors`, `transition-transform`) |
| `outline-none` | Breaks accessibility for keyboard navigators | `focus-visible:ring-2 focus-visible:ring-primary` |
| `onPaste={e => e.preventDefault()}` | Hostile to password managers and user copy-paste | Remove paste prevention completely |
| `<div onClick={navigate}>` | Breaks browser history, middle-click & screen readers | Use `<Link href="...">` or `<a href="...">` |
| Image without `width`/`height` | Causes Cumulative Layout Shift (CLS) | Define explicit aspect ratio or dimensions |
| Missing `aria-label` on icon button | Screen readers announce silent or cryptic button | Add descriptive `aria-label="..."` |
| `autoFocus` on non-modal input | Disorients screen readers and mobile viewports | Remove unless inside an active modal dialog |
| Un-virtualized `.map()` (>50 items) | Severe DOM bloat and render drops | Virtualize with `virtua` or windowing |

---

## 9. Verification & Audit Reporting Protocol

When auditing components against these guidelines, output findings in the standard terse format:

```text
## [Component / File Path]

[path/to/file.tsx:line] - [VIOLATION] - [Guideline rule description]
```

Example:
```text
## frontend/features/chat/chat-input.tsx
features/chat/chat-input.tsx:110 - VIOLATION - Textarea uses naked 'outline-none' without focus-visible ring
features/chat/chat-input.tsx:142 - VIOLATION - Send icon button lacks aria-label
```

Followed immediately by the exact surgical code diff to resolve the violation.

