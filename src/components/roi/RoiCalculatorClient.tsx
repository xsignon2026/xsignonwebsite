"use client";

import { useState } from "react";
import { calculateRoi, DEFAULT_ROI_INPUTS } from "@/lib/roi";

export function RoiCalculatorClient() {
  const [staff, setStaff] = useState<string>(String(DEFAULT_ROI_INPUTS.staff));
  const [resetsPerYear, setResetsPerYear] = useState<string>(
    String(DEFAULT_ROI_INPUTS.resetsPerYear),
  );
  const [minutesPerReset, setMinutesPerReset] = useState<string>(
    String(DEFAULT_ROI_INPUTS.minutesPerReset),
  );
  const [hourlyRate, setHourlyRate] = useState<string>(String(DEFAULT_ROI_INPUTS.hourlyRate));

  const result = calculateRoi({
    staff,
    resetsPerYear,
    minutesPerReset,
    hourlyRate,
  });

  return (
    <div className="calc-grid">
      <div className="form-card rv">
        <div className="f-grid">
          <div className="f-field full">
            <label htmlFor="roiStaff">Staff who sign in with passwords</label>
            <input
              id="roiStaff"
              type="number"
              min="0"
              value={staff}
              onChange={(e) => setStaff(e.target.value)}
              inputMode="numeric"
            />
          </div>
          <div className="f-field full">
            <label htmlFor="roiResets">Password resets per person, per year</label>
            <input
              id="roiResets"
              type="number"
              min="0"
              step="0.5"
              value={resetsPerYear}
              onChange={(e) => setResetsPerYear(e.target.value)}
              inputMode="decimal"
            />
          </div>
          <div className="f-field">
            <label htmlFor="roiMins">Minutes per reset</label>
            <input
              id="roiMins"
              type="number"
              min="0"
              value={minutesPerReset}
              onChange={(e) => setMinutesPerReset(e.target.value)}
              inputMode="numeric"
            />
          </div>
          <div className="f-field">
            <label htmlFor="roiRate">Help desk cost per hour (USD)</label>
            <input
              id="roiRate"
              type="number"
              min="0"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              inputMode="decimal"
            />
          </div>
        </div>
      </div>
      <div className="calc-out rv" aria-live="polite">
        <div className="co-label">Estimate from your inputs · annual time your team can save</div>
        <div className="co-big" id="roiCost">
          {result.formattedCost}
        </div>
        <div className="co-row">
          <span>Resets per year</span>
          <b id="roiN">{result.formattedResets}</b>
        </div>
        <div className="co-row">
          <span>Help desk hours per year</span>
          <b id="roiH">{result.formattedHours}</b>
        </div>
        <div className="co-note">
          Estimate only. No published XSignOn outcome figures are used here; those are being
          sourced. This view focuses on reset time saved, so your team can plan with clarity.
        </div>
      </div>
    </div>
  );
}
