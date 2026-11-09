"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { NavItem } from "@/types/navigation";

type HeaderClientProps = {
  navItems: NavItem[];
  headerCta: {
    label: string;
    href: string;
  } | null;
};

// The site header, built from the prototype's markup and classes (src/styles/shell.css).
// It switches between a dark and a light look depending on the band under it (data-nav on sections).
export function HeaderClient({ navItems, headerCta }: HeaderClientProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function checkTheme() {
      // The first [data-nav] band that covers the point 84px from the top of the window.
      const targetY = 84;
      for (const section of document.querySelectorAll<HTMLElement>("[data-nav]")) {
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
    // Pages change without a reload, so look again when the content changes.
    const observer = new MutationObserver(checkTheme);
    const main = document.getElementById("main-content");
    if (main) observer.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkTheme);
      window.removeEventListener("resize", checkTheme);
      window.removeEventListener("popstate", checkTheme);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header className={`site nav-${theme}`} id="siteHeader">
      <div className="wrap">
        <Link className="logo" href="/" aria-label="XSignOn home" onClick={close}>
          <Image
            className="logo-img on-dark"
            src="/images/logo-dark.png"
            alt="XSignOn - Simplifying cybersecurity"
            width={760}
            height={198}
            priority
          />
          <Image
            className="logo-img on-light"
            src="/images/logo-light.png"
            alt=""
            aria-hidden="true"
            width={760}
            height={198}
            priority
          />
        </Link>

        <nav className="main" aria-label="Primary">
          {navItems.map((item) => {
            const children = (item.children ?? []).filter((child) => !child.mobileOnly);
            return (
              <div className="nav-item" key={item.label}>
                <Link className="nav-link" href={item.link?.href ?? "#"}>
                  {item.label}{" "}
                  {children.length > 0 && (
                    <span className="caret" aria-hidden="true">
                      &#9662;
                    </span>
                  )}
                </Link>
                {children.length > 0 && (
                  <div className="dropdown">
                    {children.map((child) =>
                      child.link.href ? (
                        <Link key={child.label} href={child.link.href}>
                          {child.label}
                        </Link>
                      ) : null,
                    )}
                    {item.crossLink && (
                      <div className="drop-foot">
                        <span className="meta">Cross-link</span>
                        <Link href={item.crossLink.href}>{item.crossLink.label}</Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="head-actions">
          {headerCta && (
            <Link className="btn btn-contact" href={headerCta.href} onClick={close}>
              {headerCta.label}
            </Link>
          )}
          <button
            className="menu-btn"
            id="menuBtn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobileNav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </button>
        </div>
      </div>

      <nav className={`mobile-nav${menuOpen ? " open" : ""}`} id="mobileNav" aria-label="Mobile">
        {navItems.map((item) => (
          <React.Fragment key={item.label}>
            <div className="m-group">{item.label}</div>
            {(item.children ?? []).map((child) =>
              child.link.href ? (
                <Link key={child.label} href={child.link.href} onClick={close}>
                  {child.label}
                </Link>
              ) : null,
            )}
          </React.Fragment>
        ))}
        {headerCta && (
          <Link className="m-top" href={headerCta.href} onClick={close}>
            {headerCta.label}
          </Link>
        )}
      </nav>
    </header>
  );
}
