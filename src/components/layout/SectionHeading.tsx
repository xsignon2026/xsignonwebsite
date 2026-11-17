import Link from "next/link";
import React from "react";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
  onDark?: boolean;
  className?: string;
};

// Handoff 4.5: sec-row pattern (flex, items-baseline, space-between, wraps, mb-10/mb-7 mobile).
export function SectionHeading({
  title,
  subtitle,
  action,
  onDark = false,
  className = "",
}: SectionHeadingProps) {
  const headingColor = onDark ? "text-on-dark" : "text-txt";
  const subColor = onDark ? "text-on-dark-mut" : "text-gray";
  const actionColor = onDark ? "text-on-dark-soft hover:text-white" : "text-txt hover:text-acc";

  return (
    <div
      className={`sec-row mb-10 flex flex-wrap items-baseline justify-between gap-4 max-md:mb-7 ${className}`}
    >
      <div>
        <h2 className={`text-h2 font-bold tracking-tight ${headingColor}`}>{title}</h2>
        {subtitle && <p className={`sec-sub mt-2 text-sec-sub ${subColor}`}>{subtitle}</p>}
      </div>

      {action && (
        <Link
          href={action.href}
          className={`group inline-flex items-center gap-2 text-[17px] font-semibold underline-offset-4 hover:underline ${actionColor} transition-colors`}
        >
          <span>{action.label}</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-brand group-hover:translate-x-[3px]"
          >
            &rarr;
          </span>
        </Link>
      )}
    </div>
  );
}

type DisplayHeadingProps = {
  prefix: string;
  accentWord: string;
  suffix?: string;
  className?: string;
  onDark?: boolean;
};

// T-047: Display heading with accent selection-box effect; plain text for screen readers.
export function DisplayHeading({
  prefix,
  accentWord,
  suffix = "",
  className = "",
  onDark = true,
}: DisplayHeadingProps) {
  const textColor = onDark ? "text-white" : "text-txt";
  return (
    <h1
      className={`text-display font-bold tracking-tight ${textColor} ${className}`}
      aria-label={`${prefix} ${accentWord}${suffix ? ` ${suffix}` : ""}`}
    >
      <span aria-hidden="true">
        {prefix}{" "}
        <span className="relative inline-block border border-acc/40 bg-acc/10 px-2 py-0.5 rounded-sm">
          <span className="absolute -top-1 -left-1 h-2 w-2 rounded-xs border border-acc bg-white" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-xs border border-acc bg-white" />
          <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-xs border border-acc bg-white" />
          <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-xs border border-acc bg-white" />
          <span className="text-acc-ink-d">{accentWord}</span>
        </span>
        {suffix && ` ${suffix}`}
      </span>
    </h1>
  );
}
