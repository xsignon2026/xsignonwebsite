import React from "react";
import type { ProductSnapshot } from "@/types/product";

type ProductSnapshotPanelProps = {
  snapshot: ProductSnapshot;
};

// S-14 / T-086: Lifecycle snapshot panel matching xsignon-home-beams.html (.snap-row).
export function ProductSnapshotPanel({ snapshot }: ProductSnapshotPanelProps) {
  if (!snapshot || !snapshot.rows || snapshot.rows.length === 0) return null;

  return (
    <div
      aria-label={snapshot.meta}
      className="mt-11 max-w-2xl rounded-2xl border border-line bg-card p-6 md:p-8 shadow-xs"
    >
      <div className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-acc-ink">
        {snapshot.meta}
      </div>
      <div className="divide-y divide-line">
        {snapshot.rows.map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[140px_1fr_40px] sm:grid-cols-[180px_1fr_50px] items-center gap-4 py-3 text-sm text-gray"
          >
            <span className="font-medium text-txt">{row.label}</span>
            <div className="h-1.5 w-full rounded-full bg-soft overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  row.color === "green" ? "bg-emerald-500" : "bg-acc"
                }`}
                style={{ width: `${Math.min(100, Math.max(0, row.percentage))}%` }}
              />
            </div>
            <b className="text-right font-semibold text-txt">{row.value}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
