"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { NavItem } from "@/types/navigation";
import { NavDesktop } from "./NavDesktop";
import { NavMobile } from "./NavMobile";
import { ButtonLink } from "../ui/ButtonLink";

type HeaderClientProps = {
  navItems: NavItem[];
  headerCta: {
    label: string;
    href: string;
  } | null;
};

// Handoff 5.1 / CSV T-041: Header Client with theme detection (84px offset) and sticky blur.
export function HeaderClient({ navItems, headerCta }: HeaderClientProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 0);

    function checkTheme() {
      // Find the first [data-nav] section that covers the point 84px from viewport top
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav]"),
      );
      const targetY = 84;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= targetY && rect.bottom >= targetY) {
          const navTheme = section.getAttribute("data-nav");
          if (navTheme === "light" || navTheme === "dark") {
            setTheme(navTheme);
            return;
          }
        }
      }
    }

    checkTheme();
    window.addEventListener("scroll", checkTheme, { passive: true });
    window.addEventListener("resize", checkTheme, { passive: true });
    window.addEventListener("popstate", checkTheme);

    // Observe client-side route transitions when main content updates
    const observer = new MutationObserver(() => {
      checkTheme();
    });
    const mainEl = document.getElementById("main-content");
    if (mainEl) {
      observer.observe(mainEl, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(mountTimer);
      observer.disconnect();
      window.removeEventListener("scroll", checkTheme);
      window.removeEventListener("resize", checkTheme);
      window.removeEventListener("popstate", checkTheme);
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-[90] h-[69px] max-md:h-[62px] w-full border-b backdrop-blur-md ease-brand ${
        mounted ? "transition-colors duration-200" : ""
      } ${
        isDark
          ? "border-d-line bg-d1/97 text-white"
          : "border-line bg-paper/97 text-txt"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1180px] items-center justify-between px-8 max-md:px-5">
        {/* Logo */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 text-[22px] font-extrabold tracking-tight transition-transform active:scale-[.98]"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-acc text-[15px] font-black text-white shadow-sm"
          >
            X
          </span>
          <span className="font-sans font-extrabold tracking-[-0.03em]">
            XSignOn
          </span>
          <span className="sr-only"> - Simplifying cybersecurity</span>
        </Link>

        {/* Desktop Nav */}
        <NavDesktop items={navItems} />

        {/* Right CTA & Mobile Menu */}
        <div className="flex items-center gap-3">
          {headerCta && (
            <div className="hidden sm:block">
              <ButtonLink
                href={headerCta.href}
                variant="contact"
                className={isDark ? "border-on-dark-ctl text-white" : "border-ctl text-txt"}
              >
                {headerCta.label}
              </ButtonLink>
            </div>
          )}

          <NavMobile items={navItems} cta={headerCta} />
        </div>
      </div>
    </header>
  );
}
