import Link from "next/link";
import React from "react";
import type { RelatedItem } from "@/types/product";

type RelatedItemsProps = {
  items: RelatedItem[];
  title?: string;
};

// S-14 / T-088: Reusable related-items block matching xsignon-home-beams.html (.rel-row).
export function RelatedItems({ items, title = "Related" }: RelatedItemsProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-(--section-pad) border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-txt">{title}</h2>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group flex flex-wrap items-baseline justify-between gap-6 py-5 px-1 transition-colors duration-150"
            >
              <span className="text-lg font-medium text-txt group-hover:text-acc-ink transition-colors">
                {item.title}
              </span>
              <span className="font-mono text-xs text-gray-2 uppercase tracking-wider shrink-0">
                {item.typeLabel}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
