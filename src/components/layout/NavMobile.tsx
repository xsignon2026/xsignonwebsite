"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/types/navigation";

type NavMobileProps = {
  items: NavItem[];
  cta?: {
    label: string;
    href: string;
  } | null;
};

// Handoff 5.1 / CSV T-042: Mobile Navigation Panel (dialog, max-height 72vh, Escape key).
export function NavMobile({ items, cta }: NavMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape & restore focus
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={toggle}
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-current px-4 py-2 text-[15px] font-semibold transition-colors hover:border-acc hover:text-acc focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus cursor-pointer"
      >
        <span>{isOpen ? "Close" : "Menu"}</span>
      </button>

      {isOpen && (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-x-0 top-[62px] z-50 max-h-[72vh] overflow-y-auto border-b border-d-line bg-d1/98 p-6 text-on-dark shadow-2xl backdrop-blur-md transition-all duration-300 ease-brand"
        >
          <div className="flex flex-col gap-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <span className="text-[12px] font-bold uppercase tracking-wider text-acc-ink-d">
                  {item.label}
                </span>

                <div className="flex flex-col divide-y divide-white/10">
                  {item.link?.href && (
                    <Link
                      href={item.link.href}
                      onClick={close}
                      className="py-3 text-[17px] font-medium text-white transition-colors hover:text-acc"
                    >
                      {item.label} Overview
                    </Link>
                  )}

                  {item.children?.map((child, cIdx) => (
                    <React.Fragment key={cIdx}>
                      {child.link.href ? (
                        <Link
                          href={child.link.href}
                          onClick={close}
                          className="py-3 text-[17px] font-medium text-on-dark-soft transition-colors hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ) : (
                        <span className="py-3 text-[17px] font-medium text-on-dark-mut opacity-60">
                          {child.label}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}

            {cta && (
              <div className="pt-2">
                <Link
                  href={cta.href}
                  onClick={close}
                  className="flex w-full items-center justify-center rounded-full bg-acc py-3.5 text-button font-semibold text-white shadow-lg transition-colors hover:bg-acc-hov active:scale-[.97]"
                >
                  {cta.label}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
