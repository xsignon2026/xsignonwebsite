import Link from "next/link";
import React from "react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  onDark?: boolean;
  className?: string;
};

// CSV T-044: Accessible Breadcrumbs component for subpages.
export function Breadcrumb({ items, onDark = false, className = "" }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  const baseText = onDark ? "text-on-dark-sub" : "text-gray";
  const activeText = onDark ? "text-white" : "text-txt";
  const hoverText = onDark ? "hover:text-white" : "hover:text-acc";

  return (
    <nav aria-label="Breadcrumb" className={`py-3 text-[13.5px] ${className}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className="flex items-center gap-2">
              {idx > 0 && (
                <span aria-hidden="true" className={onDark ? "text-on-dark-ctl" : "text-gray/50"}>
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={`font-semibold ${activeText}`}
                >
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={`transition-colors ${baseText} ${hoverText}`}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
