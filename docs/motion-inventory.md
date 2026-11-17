# Motion & Canvas Performance Inventory Register

**Document ID**: ENG-PERF-003  
**Design Authority**: Version 2 (Ombre / Palette 3 Violet) from `xsignon-home-beams.html`  
**Status**: Active  
**Effective Date**: January 2026

---

## 1. Executive Motion Budget & Governance Policies

To ensure 60fps interaction smoothness, zero battery drain on laptops/mobile devices, and full WCAG 2.2 Success Criterion 2.2.2 (Pause, Stop, Hide) and 2.3.3 (Animation from Interactions) compliance, XSignOn enforces the following motion invariants:

$$\sum_{c \in \text{Canvases}} \mathbf{1}_{\{\text{animating}(c)\}} \le 1 \quad \land \quad (\text{prefers-reduced-motion} \implies \text{FPS} = 0)$$

1. **Single-Active-Canvas Cap**: At most **one** HTML5 `<canvas>` element may actively calculate or render frames at any given moment.
2. **Intersection Awareness**: Any canvas that scrolls out of view must immediately freeze its `requestAnimationFrame` loop via `IntersectionObserver`.
3. **Tab Inactivity Pause**: When `document.hidden` is true (background tab, minimized window), all loops pause immediately.
4. **Reduced Motion Posture**: When `(prefers-reduced-motion: reduce)` is detected, canvases compute exactly 1 initial static frame to establish ambient structure, then terminate their rendering cycle permanently.
5. **Frame Rate Capping**: Active animations are throttled using frame delta clamping ($\le 50\text{ms}$) targeting 60fps without runaway CPU cycles.

---

## 2. Complete Canvas Register

| ID / Element         | Location                                                                              | Dimensions / DPR                                              | Visual Characteristics                                                                     | Behavior under Reduced Motion                           |
| :------------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------ | :----------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| `heroBeams`          | Homepage Hero (`/`)                                                                   | Full hero width $\times$ height, DPR $\min(\text{DPR}, 2)$    | Faint $56\text{px}$ grid with glowing travelling photon beams (cyan and ruby red accents). | Static grid frame rendered, beam velocity set to 0.     |
| `heroBeamsSub` (x15) | Page Heroes (`/products/*`, `/solutions/*`, `/thinking/*`, `/enterprise`, `/careers`) | Full hero width $\times$ height, DPR $\min(\text{DPR}, 2)$    | Subdued background grid with subtle traveling pulses.                                      | Static grid lines only, loop inactive.                  |
| `aboutHeroBeams`     | About Page Hero (`/about`)                                                            | Full hero width $\times$ height, DPR $\min(\text{DPR}, 2)$    | Ambient grid beams behind breadcrumbs and headline.                                        | Static grid frame, loop inactive.                       |
| `bgPersp` (x4)       | Dark Band Sections (Resources band, CTA band, Enterprise band)                        | Full section width $\times$ height, DPR $\min(\text{DPR}, 2)$ | 3D perspective grid floor receding into vanishing horizon ($hz = 0.35$).                   | Static perspective lines without forward motion offset. |

---

## 3. Auto-Advancing Widgets Register

| Widget Component                                    | Route / Section              | Default Interval                   | Control Mechanism                                                    | Reduced Motion Default                                                    |
| :-------------------------------------------------- | :--------------------------- | :--------------------------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| **Why XSignOn Hub** (`WhyXSignOnHub.tsx`)           | `/about#why-xsignon`         | 5,000ms                            | Visible Pause/Resume button (`#wxPause`), keyboard arrow navigation. | Autoplay disabled by default; strictly user-directed tab switching.       |
| **Thinking Band Carousel** (`ThinkingBand.tsx`)     | Homepage (`/`)               | 6,000ms                            | Pause on hover/focus, previous/next accessible buttons.              | Autoplay disabled; manual navigation only.                                |
| **Solutions Journey Tabs** (`SolutionsJourney.tsx`) | Homepage (`/`)               | User-driven / optional auto-scroll | Tab list with keyboard arrow key support.                            | No automatic scrolling; instant layout updates without transition delays. |
| **Products Tab Cycler**                             | Products Hub (`/products`)   | User-driven                        | Tab interface with `aria-selected` announcements.                    | Instantaneous opacity changes, zero sliding transforms.                   |
| **Compliance Posture Overview**                     | `/enterprise` & `/resources` | 5,000ms                            | Interactive pill selectors with clear reset action.                  | Static view of primary posture (SOC 2 / ISO 27001).                       |

---

## 4. Verification & QA Audit Protocol

To verify motion invariants:

1. Open Chrome DevTools $\rightarrow$ Rendering tab $\rightarrow$ Emulate CSS media feature `prefers-reduced-motion: reduce`.
2. Inspect Performance CPU profile: CPU usage must be $\approx 0\%$ while idling on any page hero.
3. Verify with `IntersectionObserver` logging that scrolling the canvas out of view stops all RAF calls.
