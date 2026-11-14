---
name: image-to-code-skill
description: >-
  Transforms UI screenshots, wireframes, and design mockups into pixel-accurate, accessible React/Next.js and Tailwind CSS components. Deconstructs visual hierarchy, maps vector icons, extracts color palettes, and ensures responsive fluid layouts.
---

# Image-to-Code Skill: High-Fidelity Visual Reconstruction

## Overview
**Image-to-Code Skill** governs the translation of visual design assets (screenshots, Figma mockups, wireframes, and UI captures) into production-ready React 19, Next.js 15, and Tailwind CSS code.

Rather than producing rigid, pixel-hardcoded clones, this skill deconstructs the visual design into **fluid, responsive, and accessible layout primitives** that adhere strictly to `taste-skill` aesthetics and `web-interface-guidelines` mechanics.

---

## 1. The 5-Step Visual Reconstruction Protocol

When analyzing a UI screenshot or visual asset, execute this phased protocol:

### Step 1: Macro Layout & Spatial Skeleton
Deconstruct the image into primary layout zones before writing any component code:
1. **Container Bounds**: Identify whether the layout is constrained (`max-w-7xl mx-auto`) or full-bleed.
2. **Structural Split**: Classify macro areas (Fixed Sidebar, Sticky Topbar, Multi-column Grid, Scrollable Feed).
3. **Responsive Mapping**: Anticipate mobile collapse:
   * Desktop 3-column layouts become single-column vertical stacks on mobile (`grid-cols-1 lg:grid-cols-3`).
   * Horizontal action bars collapse into wrap containers (`flex-wrap gap-2`).

### Step 2: Surface Hierarchy & Color Palette Extraction
Extract color tokens and map them to standard Tailwind theme variables:
* **Background Layering**:
  * Canvas Base: `bg-background`
  * Card Surfaces: `bg-card` (distinguished with `border border-border/60`)
  * Elevated Interactive Surfaces: `bg-secondary` or `bg-accent`
* **Accent & Semantic Colors**: Extract brand primary accents and semantic indicator colors (emerald for active/healthy, amber for warning/pending, rose for critical alerts).

### Step 3: Typography & Micro-Hierarchy
Analyze font sizing, visual weight, and line heights:
* Map large titles to `tracking-tight font-bold text-2xl lg:text-3xl`.
* Map uppercase section badges to `text-[10px] tracking-wider uppercase font-bold text-muted-foreground`.
* Identify numerical counters, metrics, and timestamps, immediately tagging them with `tabular-nums`.

### Step 4: Vector Icon Mapping (Lucide React)
* **Never use raster images (`.png`/`.jpg`) or raw inline SVGs for standard UI icons.**
* Map every icon in the screenshot to its semantic vector equivalent from [`lucide-react`](https://lucide.dev/):
  * Document/File ➔ `<FileText className="h-4 w-4" />`
  * Security/Shield ➔ `<ShieldCheck className="h-4 w-4" />`
  * User/Profile ➔ `<User className="h-4 w-4" />`
  * Search ➔ `<Search className="h-4 w-4" />`
  * Settings/Gear ➔ `<Settings className="h-4 w-4" />`
  * Navigation Arrows ➔ `<ArrowRight className="h-4 w-4" />`
* Decorative icons must always include `aria-hidden="true"`.

### Step 5: Micro-Interaction & State Inference
Infer interactive states visible or implied in the visual:
* Buttons must include hover states (`hover:bg-primary/90`), tactile clicks (`active:scale-[0.98]`), and keyboard focus rings (`focus-visible:ring-2`).
* Text inputs must include focus rings and placeholder styling (`placeholder:text-muted-foreground/50`).
* Tag elements must include subtle background contrast and pill geometry (`rounded-full px-2.5 py-0.5 text-xs font-semibold`).

---

## 2. Realistic Mock Data Generation

A high-fidelity visual reconstruction requires realistic, contextually authentic mock data:
* ❌ **Never use `"Lorem ipsum dolor sit amet"`** or placeholder names like `"Test Item 1"`, `"User 1"`, `"Sample Text"`.
* ✅ **Generate Contextually Authentic Content**: Align the mock data with the exact application domain depicted in the screenshot (e.g. realistic user names, authentic ISO dates, plausible financial metrics, or actual industry terminology).

---

## 3. Code Generation Guardrails

When outputting the final React/Next.js code from an image:

1. **Sub-Component Modularity**: If the image represents a full dashboard, decompose it into 3–4 modular sub-components (e.g., `MetricsOverview`, `AnalyticsChart`, `RecentTransactionsTable`) instead of one giant file.
2. **Zero `transition: all`**: Replace any generic transitions with targeted `transition-colors duration-150` or `transition-transform`.
3. **Ellipses & Glyphs**: Use unicode `…` on any truncated strings or loading indicators.
4. **Clean Tailwind**: Use `cn()` for dynamic class logic and avoid hardcoded pixel heights/widths on containers (`min-h-[...]` over fixed `h-[500px]`).
