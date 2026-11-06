import React from "react";
import type { ProductChecklist } from "@/types/product";

type ProductChecklistPanelProps = {
  checklist: ProductChecklist;
};

// S-14 / T-083: Evaluation checklist matching xsignon-home-beams.html (.ui-panel, .rev-item).
export function ProductChecklistPanel({ checklist }: ProductChecklistPanelProps) {
  if (!checklist || !checklist.items || checklist.items.length === 0) return null;

  return (
    <div
      aria-label={checklist.meta}
      className="mt-11 max-w-2xl rounded-2xl border border-line bg-card p-6 md:p-8 shadow-xs"
    >
      <div className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-acc-ink">
        {checklist.meta}
      </div>
      <div className="divide-y divide-line">
        {checklist.items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3.5 py-3 text-base ${
              item.done ? "text-gray" : "text-txt font-medium"
            }`}
          >
            <span
              aria-hidden="true"
              className={`grid h-5 w-5 place-items-center rounded-full text-xs font-bold transition-colors ${
                item.done
                  ? "bg-emerald-600 text-white"
                  : "border border-ctl text-transparent"
              }`}
            >
              ✓
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
