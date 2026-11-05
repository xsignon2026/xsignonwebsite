import React from "react";
import type { CapabilityCard } from "@/types/product";

type CapabilityGridProps = {
  cards: CapabilityCard[];
};

// Handoff lines 2480-2508: Bento capability cards for product features.
export function CapabilityGrid({ cards }: CapabilityGridProps) {
  if (!cards?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {cards.map((card, index) => (
        <article
          key={index}
          className="flex flex-col justify-start rounded-card border border-line bg-card p-7 md:p-8 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-gray hover:shadow-md"
        >
          <h3 className="text-h4 font-bold text-txt tracking-tight mb-3">
            {card.title}
          </h3>
          <p className="text-body text-gray leading-relaxed m-0">
            {card.description}
          </p>
        </article>
      ))}
    </div>
  );
}
