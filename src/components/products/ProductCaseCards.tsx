import Link from "next/link";
import React from "react";
import type { ProductCaseCard } from "@/types/product";

type ProductCaseCardsProps = {
  cards: ProductCaseCard[];
};

// S-14 / T-085: Case cards grid matching xsignon-home-beams.html (.case-grid, .case-card).
export function ProductCaseCards({ cards }: ProductCaseCardsProps) {
  if (!cards || cards.length === 0) return null;

  return (
    <div className="mt-11 grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, idx) => (
        <article
          key={idx}
          className="flex flex-col items-start rounded-2xl border border-line bg-card p-8 shadow-xs transition-colors hover:border-ctl"
        >
          <div className="mb-3">
            <span className="rounded-full bg-soft px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-acc-ink">
              {card.tag}
            </span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-txt">{card.title}</h3>

          <p className="mt-3 text-base text-gray leading-relaxed">{card.description}</p>

          {card.statusNotice && (
            <div className="mt-4 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 text-xs font-medium text-amber-800 leading-normal">
              {card.statusNotice}
            </div>
          )}

          <div className="mt-auto pt-6">
            <Link
              href={card.linkHref}
              className="group inline-flex items-center gap-2 text-base font-semibold text-acc-ink hover:underline underline-offset-4"
            >
              <span>{card.linkText}</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
