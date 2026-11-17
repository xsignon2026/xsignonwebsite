import React from "react";

// Handoff 6.5 / CSV T-050: Skip-to-content link.
// Pure <a>, visually hidden until focus-visible.
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-acc focus:px-5 focus:py-2.5 focus:text-button focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-focus"
    >
      Skip to main content
    </a>
  );
}
