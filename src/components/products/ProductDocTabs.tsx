"use client";

import React, { useRef, useState } from "react";
import type { ProductDocTab } from "@/types/product";

type ProductDocTabsProps = {
  tabs: ProductDocTab[];
  title?: string;
  ariaLabel?: string;
};

// S-14 / T-088: Accessible tablist component matching xsignon-home-beams.html (.tabs, .tab-btn, .tab-panel).
export function ProductDocTabs({
  tabs,
  title = "Documentation",
  ariaLabel = "Product documentation",
}: ProductDocTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (!tabs || tabs.length === 0) return null;

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="py-(--section-pad) border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-txt">{title}</h2>
        </div>

        <div>
          <div
            role="tablist"
            aria-label={ariaLabel}
            className="flex flex-wrap gap-2 border-b border-line pb-4"
          >
            {tabs.map((tab, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={idx}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  role="tab"
                  id={`doctab-${idx}`}
                  aria-controls={`docpanel-${idx}`}
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveTab(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`min-h-[44px] rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-focus ${
                    isSelected
                      ? "border-d1 bg-d1 text-white shadow-xs"
                      : "border-line bg-card text-gray hover:border-ctl hover:text-txt"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="pt-7 max-w-3xl">
            {tabs.map((tab, idx) => (
              <div
                key={idx}
                role="tabpanel"
                id={`docpanel-${idx}`}
                aria-labelledby={`doctab-${idx}`}
                hidden={activeTab !== idx}
                tabIndex={0}
                className="focus:outline-none text-base md:text-lg text-gray leading-relaxed space-y-4"
              >
                {activeTab === idx && (
                  <div>
                    <p className="text-txt font-medium">{tab.content}</p>
                    {tab.badge && (
                      <div className="mt-3">
                        <span className="inline-block rounded-md bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-medium text-amber-700">
                          {tab.badge}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
