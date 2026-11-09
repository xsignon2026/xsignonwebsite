"use client";

import React, { useEffect, useRef, useState } from "react";

type RevealWrapperProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
};

// Handoff 6.2: .rv scroll reveal with progressive enhancement and reduced motion respect.
export function RevealWrapper({ children, className = "", delayMs = 0 }: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // If reduced motion is preferred, keep isClient false so content is immediately visible without animation
    if (mediaQuery.matches) {
      return;
    }

    // Schedule client animation mode asynchronously to prevent cascading renders
    const clientTimer = setTimeout(() => {
      setIsClient(true);
    }, 0);

    const el = ref.current;
    if (!el) {
      return () => clearTimeout(clientTimer);
    }

    // 1.6s failsafe: reveal regardless of scroll position
    const failsafeTimer = setTimeout(() => {
      setIsInView(true);
    }, 1600);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delayMs > 0) {
            setTimeout(() => setIsInView(true), delayMs);
          } else {
            setIsInView(true);
          }
          observer.unobserve(el);
          clearTimeout(failsafeTimer);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);

    return () => {
      clearTimeout(clientTimer);
      observer.disconnect();
      clearTimeout(failsafeTimer);
    };
  }, [delayMs]);

  // Initial SSR / no-JS state / reduced-motion: completely visible without transform or blur
  // Once mounted on client: applies translateY(12px) blur(4px) until in view
  const animatedClass = isClient
    ? isInView
      ? "translate-y-0 opacity-100 blur-none transition-all duration-800 ease-soft"
      : "translate-y-3 opacity-0 blur-[4px]"
    : "";

  return (
    <div ref={ref} className={`rv ${animatedClass} ${className}`}>
      {children}
    </div>
  );
}
