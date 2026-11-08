import { describe, it, expect } from "vitest";

// W3C Relative Luminance & Contrast Ratio calculation (WCAG 2.2 AA)
function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace("#", "");
  const num = parseInt(cleanHex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function getRelativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("T-159: Color Contrast Audit for Version 2 (Ombre / Palette 3 Violet)", () => {
  const darkBase = "#0b0713";
  const darkCard = "#150d27";
  const whiteText = "#ffffff";
  const slate200 = "#e2e8f0";
  const slate300 = "#cbd5e1";
  const violet300 = "#c4b5fd";
  const slate400 = "#94a3b8";
  const violet400 = "#a78bfa";
  const violetFocus = "#8b5cf6";
  const redError = "#f87171";

  it("ensures headlines meet WCAG AAA contrast (>= 7.0:1) on dark base and cards", () => {
    expect(getContrastRatio(whiteText, darkBase)).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(whiteText, darkCard)).toBeGreaterThanOrEqual(7.0);
  });

  it("ensures primary and secondary body text meet WCAG AA normal text contrast (>= 4.5:1)", () => {
    expect(getContrastRatio(slate200, darkBase)).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio(slate300, darkBase)).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio(slate200, darkCard)).toBeGreaterThanOrEqual(4.5);
  });

  it("ensures violet accents, links, and muted labels meet WCAG AA contrast (>= 4.5:1)", () => {
    expect(getContrastRatio(violet300, darkBase)).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio(slate400, darkBase)).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio(violet400, darkBase)).toBeGreaterThanOrEqual(4.5);
  });

  it("ensures focus indicator ring meets WCAG non-text UI component contrast (>= 3.0:1)", () => {
    expect(getContrastRatio(violetFocus, darkCard)).toBeGreaterThanOrEqual(3.0);
    expect(getContrastRatio(violetFocus, darkBase)).toBeGreaterThanOrEqual(3.0);
  });

  it("ensures form error typography meets WCAG AA contrast (>= 4.5:1)", () => {
    expect(getContrastRatio(redError, darkBase)).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio(redError, darkCard)).toBeGreaterThanOrEqual(4.5);
  });
});
