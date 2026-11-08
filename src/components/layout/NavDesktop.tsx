import Link from "next/link";
import React from "react";
import type { NavItem } from "@/types/navigation";
import { NavDropdown } from "./NavDropdown";

type NavDesktopProps = {
  items: NavItem[];
};

// Handoff 5.1: Desktop navigation bar (hidden at <= 1080px).
export function NavDesktop({ items }: NavDesktopProps) {
  return (
    <nav aria-label="Main Navigation" className="hidden xl:flex items-center gap-1">
      {items.map((item, idx) => {
        const hasChildren = item.children && item.children.length > 0;
        const href = item.link?.href;

        return (
          <div key={idx} className="group relative">
            {href ? (
              <Link
                href={href}
                className="relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[15px] font-medium text-inherit transition-colors hover:text-acc focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                <span>{item.label}</span>
                {hasChildren && (
                  <svg
                    aria-hidden="true"
                    className="h-2.5 w-2.5 opacity-70 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                    viewBox="0 0 10 6"
                    fill="currentColor"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                )}
              </Link>
            ) : (
              <button
                type="button"
                className="relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[15px] font-medium text-inherit transition-colors hover:text-acc focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus cursor-pointer"
                aria-haspopup="true"
              >
                <span>{item.label}</span>
                {hasChildren && (
                  <svg
                    aria-hidden="true"
                    className="h-2.5 w-2.5 opacity-70 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                    viewBox="0 0 10 6"
                    fill="currentColor"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                )}
              </button>
            )}

            {hasChildren && <NavDropdown items={item.children!} />}
          </div>
        );
      })}
    </nav>
  );
}
