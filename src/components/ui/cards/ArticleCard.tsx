"use client";

import React, { useId, useState } from "react";

type ArticleCardProps = {
  category: string;
  title: string;
  summary: string;
  fullText?: string;
  date?: string;
  className?: string;
};

export function ArticleCard({
  category,
  title,
  summary,
  fullText,
  date,
  className = "",
}: ArticleCardProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <article
      tabIndex={0}
      className={`group flex flex-col justify-between rounded-card border border-line bg-card p-7 shadow-carousel transition-[transform,box-shadow,border-color] duration-300 ease-brand hover:border-acc/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus active:scale-[.97] ${className}`}
    >
      <div>
        <div className="flex items-center justify-between text-caption text-gray">
          <span className="text-eyebrow font-bold uppercase tracking-wider text-acc">
            {category}
          </span>
          {date && <time>{date}</time>}
        </div>

        <h3 className="mt-3 text-card-title font-bold tracking-tight text-txt">{title}</h3>
        <p className="mt-2 text-card-desc text-gray leading-relaxed">{summary}</p>

        {fullText && (
          <div
            id={contentId}
            hidden={!expanded}
            className={`overflow-hidden transition-all duration-300 ease-brand ${
              expanded ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="border-t border-line pt-3 text-card-desc text-txt leading-relaxed">
              {fullText}
            </p>
          </div>
        )}
      </div>

      {fullText && (
        <div className="mt-5 pt-2">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-caption font-semibold text-acc hover:text-acc-hov focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <span>{expanded ? "Show less" : "Read more"}</span>
            <span
              aria-hidden="true"
              className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            >
              &darr;
            </span>
          </button>
        </div>
      )}
    </article>
  );
}
