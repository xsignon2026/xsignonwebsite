"use client";

import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

/**
 * HeroBeams (T-091, T-138, T-140)
 * Wraps the shared BeamsCanvas component for the homepage and other hero views.
 */
export function HeroBeams() {
  return <BeamsCanvas id="heroBeams" className="hero-beams" />;
}
