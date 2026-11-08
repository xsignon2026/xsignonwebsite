"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setIsVisible(false);
        return;
      }

      const currentProgress = Math.min(
        1,
        Math.max(0, window.scrollY / scrollHeight)
      );
      setProgress(currentProgress);
      setIsVisible(window.scrollY > 40);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      id="readProg"
      aria-hidden="true"
      style={{
        transform: `scaleX(${progress.toFixed(3)})`,
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
}
