import Link from "next/link";
import React from "react";
import type { NavChild } from "@/types/navigation";

type NavDropdownProps = {
  items: NavChild[];
};

// Handoff 5.1: Nav dropdown, opens on hover OR focus-within, accessible keyboard support.
export function NavDropdown({ items }: NavDropdownProps) {
  if (!items || items.length === 0) return null;

  return (
    <div
      role="menu"
      className="invisible absolute top-[calc(100%+8px)] left-0 min-w-[240px] scale-95 rounded-card border border-d-line bg-d2 p-2 opacity-0 shadow-dropdown transition-all duration-200 ease-brand group-hover:visible group-hover:scale-100 group-hover:opacity-100 group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100 z-[95]"
    >
      <ul className="flex flex-col gap-0.5">
        {items.map((item, idx) => (
          <li key={idx} role="none">
            {item.link.href ? (
              <Link
                href={item.link.href}
                role="menuitem"
                className="block rounded-lg px-3.5 py-2 text-[14.5px] font-medium text-on-dark-mut transition-colors duration-150 hover:bg-white/5 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:outline-none"
              >
                {item.label}
              </Link>
            ) : (
              <span className="block px-3.5 py-2 text-[14.5px] font-medium text-on-dark-mut opacity-60">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
