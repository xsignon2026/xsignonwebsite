import Link from "next/link";
import React from "react";
import type { WhitePaper } from "@/types/white-paper";

type WhitePaperCardProps = {
  whitePaper?: WhitePaper | null;
  className?: string;
};

// T-073: White Paper Card for article pages.
// CRITICAL INVARIANT: Appears ONLY when a white paper is attached (returns null otherwise).
export function WhitePaperCard({
  whitePaper,
  className = "",
}: WhitePaperCardProps) {
  if (!whitePaper || !whitePaper.slug) {
    return null;
  }

  return (
    <aside
      aria-label="Related White Paper"
      className={`rounded-2xl border border-line bg-card p-7 md:p-8 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-acc/40 hover:shadow-md ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.14em] text-acc">
        <span>White Paper</span>
        <span aria-hidden="true">&bull;</span>
        <span>v{whitePaper.version || "1.0"}</span>
      </div>

      <h3 className="mt-3 text-xl font-bold tracking-tight text-txt">
        {whitePaper.title}
      </h3>

      <p className="mt-2.5 text-sm leading-relaxed text-gray line-clamp-3">
        {whitePaper.summary}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-line">
        <span className="text-xs text-gray font-medium">Format: Gated PDF</span>
        <Link
          href={`/white-papers/${whitePaper.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-txt hover:text-acc-ink underline underline-offset-4"
        >
          <span>Get white paper</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </aside>
  );
}
