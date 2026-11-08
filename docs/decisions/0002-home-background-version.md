# 0002: Home Background Version Selection (Closes Q-07)

**Status:** Decided. Version 2 ("ombre") confirmed. Version 5 ("descent") and other exploratory variants retired.  
**Date:** 2026-11-05  
**Owner:** Senior Frontend Engineer / Website Lead  
**References:** Design handoff spec v1.1 (`xsignon-home-design-handoff.html`), `xsignon-home-beams.html`

## The Decision

The design system exploratory phase compared multiple home background versions (v1, v2 ombre, v5 descent, v7, etc.). The design handoff confirms **Version 2 (Ombre)** with Palette 3 (Violet) as the official production specification.

## Values Defined in tokens.css

- `--bg-products`: `linear-gradient(180deg, #060129 0%, #1a1240 12%, #3b3668 40%, #6e6a9a 72%, #b3aed0 100%)`
- `--bg-partners`: `linear-gradient(180deg, #b3aed0 0%, #d9d4eb 30%, #ece8f7 65%, #f6f4fb 100%)`
- `--bg-thinking`: `linear-gradient(180deg, #f6f4fb 0%, #ffffff 100%)`
- `--bg-cta`: `#ffffff`
- Deleted: `--partners-pad-bottom: 300px` (was unique to Version 5 descent)

## Impact on Layout and Components

- Header dynamic theme switches between dark (over `#060129` hero and initial dark gradient in Products) and light (over the lower paper/white sections).
- CTA and Our Thinking sections rest on solid `#ffffff`, with dark CTA panel contrasting against the light background.
- Version selector controls and `.mocknote` chips from prototype are permanently removed from production code.
