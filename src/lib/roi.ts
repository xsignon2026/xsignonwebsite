/**
 * S-14 / T-130: Pure Mathematical ROI Calculation Engine.
 * Computes estimated time and cost savings from verified sign-in.
 *
 * Invariants:
 *  - All inputs are clamped to non-negative numbers (Math.max(0, val)).
 *  - NaN, null, and non-finite inputs fall back safely to 0 or defaults.
 *  - Formatting complies with en-US locale numbers and currency.
 */

export interface RoiInputs {
  staff: number;
  resetsPerYear: number;
  minutesPerReset: number;
  hourlyRate: number;
}

export interface RoiResults {
  resetsPerYear: number;
  hoursPerYear: number;
  costSaved: number;
  formattedResets: string;
  formattedHours: string;
  formattedCost: string;
}

export const DEFAULT_ROI_INPUTS: Readonly<RoiInputs> = Object.freeze({
  staff: 500,
  resetsPerYear: 4,
  minutesPerReset: 20,
  hourlyRate: 45,
});

/**
 * Sanitizes an unknown input into a safe non-negative finite number.
 */
export function sanitizeRoiInput(val: unknown, fallback: number = 0): number {
  if (typeof val === "number") {
    return Number.isFinite(val) ? Math.max(0, val) : fallback;
  }
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed === "") return fallback;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback;
  }
  return fallback;
}

/**
 * Computes ROI metrics from given inputs or defaults.
 */
export function calculateRoi(inputs?: {
  staff?: number | string | null;
  resetsPerYear?: number | string | null;
  minutesPerReset?: number | string | null;
  hourlyRate?: number | string | null;
}): RoiResults {
  const staff =
    inputs?.staff !== undefined && inputs?.staff !== null
      ? sanitizeRoiInput(inputs.staff, 0)
      : DEFAULT_ROI_INPUTS.staff;

  const rpy =
    inputs?.resetsPerYear !== undefined && inputs?.resetsPerYear !== null
      ? sanitizeRoiInput(inputs.resetsPerYear, 0)
      : DEFAULT_ROI_INPUTS.resetsPerYear;

  const mins =
    inputs?.minutesPerReset !== undefined && inputs?.minutesPerReset !== null
      ? sanitizeRoiInput(inputs.minutesPerReset, 0)
      : DEFAULT_ROI_INPUTS.minutesPerReset;

  const rate =
    inputs?.hourlyRate !== undefined && inputs?.hourlyRate !== null
      ? sanitizeRoiInput(inputs.hourlyRate, 0)
      : DEFAULT_ROI_INPUTS.hourlyRate;

  // Formula as defined in design handoff:
  // n = staff * rpy
  // h = n * mins / 60
  // cost = h * rate
  const n = staff * rpy;
  const h = (n * mins) / 60;
  const cost = h * rate;

  const roundedN = Math.round(n);
  const roundedH = Math.round(h);
  const roundedCost = Math.round(cost);

  return {
    resetsPerYear: roundedN,
    hoursPerYear: roundedH,
    costSaved: roundedCost,
    formattedResets: roundedN.toLocaleString("en-US"),
    formattedHours: roundedH.toLocaleString("en-US"),
    formattedCost: `$${roundedCost.toLocaleString("en-US")}`,
  };
}
