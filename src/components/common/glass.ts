// Shared data for the glass-block rows (kept out of the client component so server pages can read it).

export type GlassItem = {
  label: string; // short text printed on the top of the block
  title: string;
  kind: string;
  text: string;
  top: string;
  left: string;
  right: string;
};

export const GLASS_COLOURS = [
  { top: "#b3aed0", left: "#8f89b8", right: "#6f67a8" },
  { top: "#6f67a8", left: "#554d90", right: "#3b3668" },
  { top: "#3b3668", left: "#2c2757", right: "#1f1b45" },
  { top: "#d4163a", left: "#a60019", right: "#7a0012" },
] as const;
