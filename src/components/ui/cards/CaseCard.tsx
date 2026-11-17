import React from "react";

type CaseCardProps = {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric?: string;
  className?: string;
};

export function CaseCard({ quote, author, role, company, metric, className = "" }: CaseCardProps) {
  return (
    <article
      tabIndex={0}
      className={`group flex flex-col justify-between rounded-card border border-line bg-card p-8 shadow-carousel transition-[transform,box-shadow,border-color] duration-300 ease-brand hover:border-acc/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus active:scale-[.97] ${className}`}
    >
      <div>
        {metric && (
          <div className="mb-4 text-h3 font-extrabold tracking-tight text-acc">{metric}</div>
        )}
        <blockquote className="text-body text-txt italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <div className="font-semibold text-txt">{author}</div>
        <div className="text-caption text-gray">
          {role}, <span className="font-medium text-txt">{company}</span>
        </div>
      </div>
    </article>
  );
}
