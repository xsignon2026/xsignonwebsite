---
name: stitch-skill
description: >-
  Harmonizes and stitches disparate UI components into cohesive, production-grade page layouts. Normalizes design tokens, coordinates split-view scroll containers, aligns z-index layers, and choreographs responsive multi-panel workspaces.
---

# Stitch-Skill: Unified Layout Assembly & Composition

## Overview
**Stitch-Skill** governs the assembly of independent, disparate UI components into seamless, cohesive, production-grade pages.

When individual cards, tables, charts, and forms are combined on a single screen, interfaces often look fragmented—exhibiting competing border radii, conflicting margins, mismatched card elevations, and uncoordinated scrollbars. **Stitch-Skill acts as the master layout architect**, harmonizing every block into a single unified workspace.

---

## 1. The 4 Pillars of Seamless Layout Stitching

### Pillar 1: Shell Architecture & Layout Rails
A page must have an unambiguous macro skeleton. Define standard layout rails:
* **Fixed Navigation Spine**: Left sidebar (`w-64 shrink-0 hidden md:block`) with dedicated internal scroll.
* **Sticky Utility Header**: Top navigation bar (`sticky top-0 z-40 h-16 backdrop-blur-md bg-card/85 border-b border-border`).
* **Main Canvas Container**: Constrained workspace (`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6`).
* **Contextual Sidecar / Inspector**: Right-hand drawer or split pane (`w-80 lg:w-96 shrink-0 border-l border-border bg-card/50`).

### Pillar 2: Design Token Normalization Gate
When assembling components from different authors or libraries, normalize their visual tokens:
* **Border Radius Hierarchy**:
  * Page shells & Large Cards: `rounded-xl` (12px)
  * Modals & Dialogs: `rounded-2xl` (16px)
  * Buttons, Inputs, Menu Items: `rounded-lg` (8px)
  * Badges, Status Pills, Avatars: `rounded-full` (9999px)
* **Hairline Borders**: Force uniform border tone (`border border-border/60`) across all stitched cards. Never mix thick 2px borders with 1px hairline borders in the same row.
* **Elevation Harmony**: Avoid competing shadows. Standardize on subtle hairline borders with `shadow-xs` or `shadow-sm`.

### Pillar 3: Multi-Panel Workspaces & Independent Scroll Areas
In split workspaces and master-detail dashboards (e.g. Master List + Inspector, Activity Stream + Detail View):
* **Independent Scroll Containers**: The parent page must remain locked to the viewport (`h-[calc(100vh-4rem)] overflow-hidden`), while child columns scroll independently (`overflow-y-auto overscroll-contain`).
* **Split Layout Ratios**:
  * Master Column (List / Feed): 60%–70% width (`lg:col-span-8` or `flex-1`).
  * Detail Column (Inspector / Actions): 30%–40% width (`lg:col-span-4` or `w-96`).
* **Synchronized Selections**: Selecting an entity in the master view must immediately highlight the corresponding detail view without triggering full-page scroll jumps.

### Pillar 4: Z-Index Layer Stratification
Prevent rogue `z-index` collisions by strictly enforcing the z-index scale:

| Layer | Tailwind Class | Usage |
| :--- | :--- | :--- |
| **Base Canvas** | `z-0` | Normal cards, data tables, metrics grids |
| **Sticky Rails** | `z-10` | Sticky table headers, local tabs |
| **Layout Sidebars** | `z-30` | Collapsible navigation sidebars |
| **App Header** | `z-40` | Main global sticky navigation bar |
| **Slide-over Panels** | `z-40` | Right-side inspection drawers, mobile sheets |
| **Modals & Dialogs** | `z-50` | Center-stage confirmation dialogs, backdrops |
| **Toasts & Tooltips** | `z-[60]` | Global notification banners, high-priority popovers |

---

## 2. Responsive Choreography (Mobile to Desktop)

Stitched layouts must collapse logically as viewports shrink:
1. **Desktop (`≥ 1024px`)**: Full multi-column view with side-by-side inspection rails.
2. **Tablet (`768px – 1023px`)**: Collapse sidebar to icon rail (`w-16`), shift detail pane to a toggleable overlay sheet.
3. **Mobile (`< 768px`)**: Stack all grids into a single vertical stream (`grid-cols-1`). Bottom sheets replace modal dialogs (`fixed inset-x-0 bottom-0`).

---

## 3. Stitching Assembly Checklist

Before considering a multi-component page assembled:
* [ ] **Consistent Gaps**: Do all adjacent cards share identical grid gaps (`gap-4` or `gap-6`)?
* [ ] **No Double Borders**: Ensure adjacent cards or panels do not create accidental 2px borders (`border-r` next to `border-l`).
* [ ] **Container Padding Parity**: Are inner padding values consistent across all sibling cards (e.g. all use `p-5` or `p-6`)?
* [ ] **Heading Alignment**: Do all cards align their title baselines and icon badges consistently across horizontal rows?
* [ ] **Empty State Coordination**: If one widget in a stitched layout has zero data, does it gracefully render an inline empty state without breaking the heights of sibling widgets?
