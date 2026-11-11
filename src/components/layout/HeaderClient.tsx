"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/types/navigation";

type HeaderClientProps = {
  navItems: NavItem[];
  headerCta: {
    label: string;
    href: string;
  } | null;
};

const Chevron = () => (
  <svg
    className="nav2-chev"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// The site header: a light bar with the menus opening as wide panels underneath (a "mega menu"), and on
// phones a card with one expandable row per menu. A menu opens when the visitor points at it, presses it
// or reaches it with the keyboard; Escape, a click elsewhere or leaving the page closes it.
export function HeaderClient({ navItems, headerCta }: HeaderClientProps) {
  const pathname = usePathname();
  const baseId = useId();
  const root = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [section, setSection] = useState<number | null>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Going to another page closes everything. (Adjusting state while rendering is the supported way to
  // react to a changed value without an effect.)
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMenuOpen(false);
    setSection(null);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(null);
      setMenuOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) {
        setOpen(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  const cancelClose = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };
  const hoverOpen = (index: number) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    cancelClose();
    setOpen(index);
  };

  return (
    <header className="nav2" id="siteHeader" ref={root} onPointerLeave={closeSoon}>
      <div className="nav2-bar">
        <Link className="nav2-logo" href="/" aria-label="XSignOn home">
          <Image
            src="/images/logo-light.png"
            alt="XSignOn - Simplifying cybersecurity"
            width={760}
            height={198}
            priority
          />
        </Link>

        <nav className="nav2-links" aria-label="Primary">
          {navItems.map((item, i) => {
            const panelId = `${baseId}-panel-${i}`;
            const isOpen = open === i;
            return (
              <div className="nav2-item" key={item.label} onPointerEnter={hoverOpen(i)}>
                <div className="nav2-trig-wrap" data-open={isOpen || undefined}>
                  {item.link?.href ? (
                    <Link className="nav2-trigger" href={item.link.href}>
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="nav2-trigger"
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      {item.label}
                    </button>
                  )}
                  <button
                    type="button"
                    className="nav2-chevbtn"
                    aria-label={`${item.label} menu`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <Chevron />
                  </button>
                </div>

                <div
                  className={`nav2-panel${item.featured ? " has-feature" : ""}`}
                  id={panelId}
                  hidden={!isOpen}
                  onPointerEnter={cancelClose}
                >
                  <div className="nav2-panel-body">
                    <ul className="nav2-list">
                      {(item.children ?? []).map((child) =>
                        child.link.href ? (
                          <li key={child.label}>
                            <Link className="nav2-card" href={child.link.href}>
                              <span className="nav2-card-title">{child.label}</span>
                              {child.description && (
                                <span className="nav2-card-text">{child.description}</span>
                              )}
                            </Link>
                          </li>
                        ) : null,
                      )}
                    </ul>
                    {item.featured && (
                      <Link className="nav2-feature" href={item.featured.href}>
                        <Image
                          src={item.featured.image.src}
                          alt={item.featured.image.alt}
                          width={600}
                          height={380}
                          sizes="320px"
                          loading="eager"
                        />
                        <span className="nav2-eyebrow">{item.featured.eyebrow}</span>
                        <span className="nav2-feature-title">{item.featured.title}</span>
                      </Link>
                    )}
                  </div>
                  {item.footerLink && (
                    <div className="nav2-panel-foot">
                      <Link href={item.footerLink.href}>
                        {item.footerLink.label} <span aria-hidden="true">&#8594;</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="nav2-actions">
          {headerCta && (
            <Link className="nav2-cta" href={headerCta.href}>
              {headerCta.label}
            </Link>
          )}
          <button
            type="button"
            className="nav2-burger"
            aria-expanded={menuOpen}
            aria-controls={`${baseId}-mobile`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <nav className="nav2-mobile" id={`${baseId}-mobile`} aria-label="Mobile" hidden={!menuOpen}>
        {navItems.map((item, i) => {
          const isOpen = section === i;
          return (
            <div className="nav2-m-group" key={item.label}>
              <div className="nav2-m-row">
                {item.link?.href ? (
                  <Link className="nav2-m-head nav2-m-link" href={item.link.href}>
                    {item.label}
                  </Link>
                ) : (
                  <span className="nav2-m-head">{item.label}</span>
                )}
                <button
                  type="button"
                  className="nav2-m-toggle"
                  aria-label={`${item.label} menu`}
                  aria-expanded={isOpen}
                  onClick={() => setSection(isOpen ? null : i)}
                >
                  <Chevron />
                </button>
              </div>
              {isOpen && (
                <ul className="nav2-m-list">
                  {(item.children ?? []).map((child) =>
                    child.link.href ? (
                      <li key={child.label}>
                        <Link href={child.link.href}>{child.label}</Link>
                      </li>
                    ) : null,
                  )}
                  {item.footerLink && (
                    <li>
                      <Link href={item.footerLink.href}>{item.footerLink.label}</Link>
                    </li>
                  )}
                </ul>
              )}
            </div>
          );
        })}
        {headerCta && (
          <Link className="nav2-cta nav2-m-cta" href={headerCta.href}>
            {headerCta.label}
          </Link>
        )}
      </nav>
    </header>
  );
}
