---
name: gpt-taste
description: >-
  Cognitive code-generation and architectural directives that prevent AI code slop. Enforces clean component composition, strict TypeScript types, discriminated union state machines, minimal wrapper DOM trees, and resilient client-server boundaries across React/Next.js codebases.
---

# GPT-Taste: Clean Code Architecture & Anti-Slop Directives

## Overview
**GPT-Taste** is the cognitive code-generation standard governing how AI models structure, write, and refactor modern React and Next.js applications. While `taste-skill` dictates visual craft and `web-interface-guidelines` enforces interaction mechanics, **`gpt-taste` guarantees structural code quality, maintainability, type safety, and architectural discipline**.

It systematically prevents common AI code-generation traps: monolithic single-file components, meaningless wrapper `<div>` soup, loose `any` types, boolean state flag explosions, and unprincipled `'use client'` placement.

---

## 1. Eradicating AI Code Slop

When generating or editing code, strictly reject these patterns:

* ❌ **No `<div>` Soup**: Never nest 4–5 meaningless wrapper `<div>`s purely for centering or margins. Leverage direct flexbox, CSS grid, and auto-margins on the parent container.
* ❌ **No Monolithic 500+ Line Files**: Break complex views down into cohesive, single-responsibility sub-components (<150–200 lines per file).
* ❌ **No Inline Style Hacks**: Avoid escaping to `style={{ ... }}` unless computing truly dynamic, frame-by-frame runtime coordinates (e.g. physics drag offsets, custom cursor positions). Leverage design tokens and utility classes exclusively.
* ❌ **No Redundant or Conflicting CSS Classes**: Avoid accidental duplicates such as `p-4 px-6` or `bg-white dark:bg-card bg-slate-900`. Always resolve dynamic classes through `cn()` (`clsx` + `tailwind-merge`).
* ❌ **No Loose `any` or Untyped Callbacks**: Enforce strict TypeScript interfaces, generics, and Discriminated Unions across all component props and server payloads.

---

## 2. Component Composition & Hierarchy

Structure components with high cohesion and loose coupling:

### The Container / Presenter Separation
* **Presentational Components (Leaves)**: Pure, deterministic UI components that receive strongly typed props and emit callback events. They contain zero direct database queries or API fetching logic, making them trivial to test, storybook, and preview in isolation.
* **Orchestrator Components (Containers)**: Manage data fetching, global store subscriptions, and mutation handlers, passing clean, serialized payloads down to presentational children.

### Canonical Compound Component Architecture
When authoring multi-segment UI elements (cards, menus, dialogs, accordion panels), adopt compound component patterns:

```tsx
// ✅ Canonical compound composition
<Card>
  <CardHeader>
    <CardTitle>Usage Analytics</CardTitle>
    <CardDescription>Real-time API request volume across all active regions</CardDescription>
  </CardHeader>
  <CardContent>
    <MetricsTelemetryFeed data={telemetry} />
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">Download Report</Button>
  </CardFooter>
</Card>
```

---

## 3. State Modeling via Discriminated Unions

AI code frequently falls victim to the **"Boolean Flag Explosion"** (`isLoading`, `isError`, `isSuccess`, `data`), which allows impossible runtime states (e.g. `isLoading === true` and `isError === true` simultaneously).

### The Discriminated Union Protocol
Always model asynchronous and stateful workflows as a discrete state machine using TypeScript discriminated unions:

```tsx
// ❌ AI Slop: Multiple boolean flags allowing impossible states
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<ResourceRecord[] | null>(null);

// ✅ GPT-Taste: Clean, mathematically sound state machine
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string; retryAction?: () => void };

const [state, setState] = useState<AsyncState<ResourceRecord[]>>({ status: 'idle' });
```

---

## 4. Client / Server Boundary Discipline (Next.js App Router)

Next.js 15 applications must maintain strict architectural separation across the React Server Component (RSC) boundary:

1. **Leaf-Node `'use client'` Placement**:
   * Default every route page, layout, and structural shell to a Server Component for instant server-rendered HTML and minimal client bundle size.
   * Push `'use client'` strictly down to the smallest interactive leaf nodes (e.g. an interactive toggle button, a modal wrapper, or an input field).
2. **Prop Serialization & Purity**:
   * Only pass serializable data across the RSC boundary. Never pass class instances, un-serializable symbols, or server-only functions.
3. **Strict Secret Isolation**:
   * Server Components must never forward raw environment variables, backend database connections, or secret tokens as props to Client Components.

---

## 5. Performance Code Generation Patterns

Write code that compiles cleanly and executes with zero CPU or memory waste:

* **Dynamic Code Splitting**: Dynamically import (`next/dynamic` or `React.lazy`) heavy interactive components that are not needed on initial page load (e.g. Data Visualization charts, Code Editors, 3D Graph engines, complex modal trees):
  ```tsx
  const AnalyticsChart = dynamic(() => import('@/components/analytics-chart'), {
    loading: () => <ChartSkeletonLoader />,
    ssr: false,
  });
  ```
* **Referential Stability**: Avoid recreating callback closures inside tight loops. Use functional state updaters (`setState(prev => ...)`).
* **Avoid Premature Optimization**: Do not blanket every trivial function with `useCallback` or `useMemo`. Apply them intentionally to referentially stable props passed to virtualized lists or pure memoized components.

---

## 6. Code Quality & Formatting Heuristics

* **Import Categorization**: Order imports with deliberate discipline:
  1. React & Framework Core (`react`, `next/navigation`, `next/link`)
  2. Third-Party Libraries (`lucide-react`, `motion`, `@radix-ui/*`)
  3. Shared Utilities, Stores & Hooks (`@/lib/utils`, `@/store/*`, `@/hooks/*`)
  4. Local Feature Components & Types (`./feature-card`, `@/types/*`)
* **Strict Guard Clauses**: Replace deeply nested `if-else` blocks with clean early returns for unauthorized, loading, and empty states.
