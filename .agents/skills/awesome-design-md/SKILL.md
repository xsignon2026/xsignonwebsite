---
name: awesome-design-md
description: >-
  Curated catalog of enterprise design tokens, color systems, micro-shadow elevations, and component blueprints. Provides battle-tested UI recipes for KPI cards, data tables, audit timelines, and command bars.
---

# Awesome Design: Enterprise Design Tokens & Component Blueprints

## Overview
**Awesome Design** is the master design token dictionary and component blueprint catalog. Derived from modern enterprise design systems and the VoltAgent design guidelines, it provides battle-tested UI patterns, exact color scales, elevation recipes, and production component blueprints.

Instead of guessing layout metrics or improvising styles, agents reference these exact design specifications to build cohesive, high-craft interfaces across any application domain.

---

## 1. Enterprise Color Token System

A restrained, high-contrast palette optimized for dark-mode productivity:

### Neutral Foundations (Zinc / Slate Spectrum)
| Token Name | Tailwind Variable / Class | Visual Role |
| :--- | :--- | :--- |
| **Canvas Background** | `bg-background` (`hsl(240 10% 3.9%)`) | Deep base canvas behind all containers |
| **Card / Container** | `bg-card` (`hsl(240 10% 6.5%)`) | Elevated surface for cards, panels, sidebars |
| **Interactive Secondary** | `bg-secondary` (`hsl(240 3.7% 12%)`) | Buttons, badges, and selected list items |
| **Hairline Border** | `border-border/60` (`hsl(240 3.7% 18%)`) | 1px clean separation borders |
| **Muted Text** | `text-muted-foreground` (`hsl(240 5% 65%)`) | Sub-labels, secondary details, timestamps |
| **Foreground Text** | `text-foreground` (`hsl(0 0% 98%)`) | High-contrast readable body and headings |

### Semantic Signal Colors
* **Primary Brand / Action**: Indigo/Sky (`text-primary`, `bg-primary`) for primary CTAs and active tab bars.
* **Success / Online**: Emerald (`text-emerald-500`, `bg-emerald-500/10`, `border-emerald-500/20`) for healthy states, active nodes, and positive deltas.
* **Warning / Attention**: Amber (`text-amber-500`, `bg-amber-500/10`, `border-amber-500/20`) for latency warnings, degraded health, or pending review queues.
* **Critical / Destructive**: Rose/Red (`text-rose-500`, `bg-rose-500/10`, `border-rose-500/20`) for fatal errors, security breaches, and deletion actions.

---

## 2. Micro-Elevation & Border Tokens

Never use heavy, muddy drop shadows. Enforce **border-first elevation** with subtle hairline depth:

* **Standard Card Surface**:
  ```html
  className="rounded-xl border border-border/60 bg-card p-5 shadow-xs hover:border-primary/30 transition-colors duration-150"
  ```
* **Floating Dropdown / Popover**:
  ```html
  className="rounded-lg border border-border bg-popover/95 p-1 text-popover-foreground shadow-md backdrop-blur-md"
  ```
* **Center Stage Modal**:
  ```html
  className="rounded-2xl border border-border bg-card p-6 shadow-2xl ring-1 ring-white/10"
  ```

---

## 3. Production Component Blueprints

### Blueprint A: High-Density Metric Tile
Used for telemetry, operational volume, and system health counters:
```tsx
<div className="rounded-xl border border-border/60 bg-card p-5 shadow-xs hover:border-primary/30 transition-colors duration-150">
  <div className="flex items-center justify-between text-muted-foreground mb-3">
    <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/80 truncate">
      Monthly Volume
    </span>
    <Activity className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
  </div>
  <div className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
    1,284,920
  </div>
  <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-emerald-500 font-medium">
    <TrendingUp className="h-3 w-3 shrink-0" />
    <span className="tabular-nums">+12.4% from previous cycle</span>
  </p>
</div>
```

---

### Blueprint B: Industrial Data Table with Tabular Numbers
Used for audit logs, resource inventories, and permission records:
```tsx
<div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-xs">
  <div className="overflow-x-auto">
    <table className="w-full text-left text-xs">
      <thead className="border-b border-border/60 bg-secondary/30 text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
        <tr>
          <th className="py-3 px-4">Resource Identifier</th>
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4">Bandwidth</th>
          <th className="py-3 px-4">Last Updated</th>
          <th className="py-3 px-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/40 text-foreground">
        <tr className="hover:bg-secondary/20 transition-colors duration-100">
          <td className="py-3 px-4 font-bold flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
            <span className="truncate max-w-xs">Production_Cluster_Config.json</span>
          </td>
          <td className="py-3 px-4">
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500 border border-emerald-500/20">
              Operational
            </span>
          </td>
          <td className="py-3 px-4 tabular-nums text-muted-foreground">12.4 MB</td>
          <td className="py-3 px-4 tabular-nums text-muted-foreground">Today, 14:32</td>
          <td className="py-3 px-4 text-right">
            <button
              type="button"
              className="inline-flex items-center rounded px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors"
            >
              Inspect
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

---

### Blueprint C: Vertical Activity & Audit Timeline
Used for security audits, event streams, and execution traces:
```tsx
<div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60">
  {events.map((ev, idx) => (
    <div key={idx} className="relative group">
      {/* Node Marker */}
      <div className="absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background group-hover:border-primary transition-colors">
        <div className="h-2 w-2 rounded-full bg-primary" />
      </div>
      {/* Event Details */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-foreground">{ev.title}</span>
          <span className="text-[10px] text-muted-foreground tabular-nums">{ev.timestamp}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {ev.description}
        </p>
      </div>
    </div>
  ))}
</div>
```

---

### Blueprint D: Command Search & Filter Pill Bar
Used in data explorers, command bars, and navigation headers:
```tsx
<div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
  {/* Unified Search Bar */}
  <div className="relative w-full sm:w-80">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" aria-hidden="true" />
    <input
      type="text"
      placeholder="Search resources, records, tags…"
      className="w-full rounded-lg border border-border/60 bg-background pl-8 pr-12 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    />
    <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border bg-secondary px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground">
      ⌘ K
    </kbd>
  </div>
  {/* Category Filter Pills */}
  <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
    {categories.map((cat) => (
      <button
        key={cat.id}
        type="button"
        className="rounded-lg border border-border/60 bg-card hover:bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary transition-colors"
      >
        {cat.name}
      </button>
    ))}
  </div>
</div>
```

---

## 4. Grid Layout Recipes

* **Standard KPI Strip**: `grid grid-cols-2 lg:grid-cols-4 gap-4`
* **Master-Detail Workspace**: `grid grid-cols-1 lg:grid-cols-12 gap-6` (8 columns master, 4 columns detail)
* **Two-Panel Split View**: `flex flex-col lg:flex-row h-[calc(100vh-8rem)] rounded-xl border border-border bg-card/25 overflow-hidden`
