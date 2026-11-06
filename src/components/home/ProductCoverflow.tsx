"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { HomeCoverflowCard } from "@/types/home";

interface ProductCoverflowProps {
  cards?: HomeCoverflowCard[];
}

const defaultCards: HomeCoverflowCard[] = [
  {
    name: "PostureOne",
    desc: "A living inventory of every person, device and agent, scored continuously.",
    tags: ["Identity inventory", "Posture scoring", "Continuous review"],
    href: "/products/postureone",
    iconKey: "postureone",
    imageAlt: "Server racks with network cabling in a data centre",
  },
  {
    name: "Passwordless Keys",
    desc: "Passkeys, biometrics and hardware keys in one calm sign-in flow.",
    tags: ["Passkeys", "Biometrics", "Hardware keys"],
    href: "/products/keys",
    iconKey: "keys",
    imageAlt: "Person holding a phone in one hand while signing in on a laptop",
  },
  {
    name: "EvalOne",
    desc: "Agents evaluated with structured checks, evidence and a named reviewer.",
    tags: ["Agent evaluation", "Evidence packs", "Sign-off flows"],
    href: "/products/evalone",
    iconKey: "evalone",
    imageAlt: "Team running an evaluation workshop with notes on a wall",
  },
  {
    name: "XSense",
    desc: "Identity analytics and software-bound sign-in for enterprise access.",
    tags: ["Identity analytics", "Software MFA", "Session telemetry"],
    href: "/products/xsense",
    iconKey: "xsense",
    imageAlt: "Engineer reviewing analytics on a monitor",
  },
  {
    name: "AMS",
    desc: "Access requests, approvals and periodic reviews with a complete trail.",
    tags: ["Access requests", "Approvals", "Periodic reviews"],
    href: "/products/ams",
    iconKey: "ams",
    imageAlt: "Warehouse shelves of tracked inventory and parts",
  },
];

function renderCardIcon(key: HomeCoverflowCard["iconKey"]) {
  switch (key) {
    case "postureone":
      return (
        <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="10" y="10" width="76" height="76" rx="16" />
          <line x1="48" y1="10" x2="48" y2="86" />
          <line x1="10" y1="48" x2="86" y2="48" />
          <path d="M48 10 H70 a16 16 0 0 1 16 16 V48 H48 Z" stroke="#ff5a62" />
          <circle cx="29" cy="29" r="4" />
          <circle cx="67" cy="29" r="4" />
          <circle cx="29" cy="67" r="4" />
          <circle cx="67" cy="67" r="4" />
        </svg>
      );
    case "keys":
      return (
        <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="10" y="10" width="76" height="76" rx="16" />
          <path d="M26 72 V52 a22 22 0 0 1 44 0 V72" />
          <path d="M34 72 V52 a14 14 0 0 1 28 0 V72" />
          <path d="M42 70 V52 a6 6 0 0 1 12 0 V70" stroke="#ff5a62" />
        </svg>
      );
    case "evalone":
      return (
        <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="10" y="10" width="76" height="76" rx="16" />
          <circle cx="48" cy="48" r="27" />
          <circle cx="48" cy="48" r="18" />
          <circle cx="48" cy="48" r="9" />
          <path d="M48 21 A27 27 0 0 1 75 48" stroke="#ff5a62" />
        </svg>
      );
    case "xsense":
      return (
        <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="10" y="10" width="76" height="76" rx="16" />
          <circle cx="48" cy="48" r="10" />
          <line x1="61" y1="48" x2="68" y2="48" stroke="#ff5a62" />
          <line x1="28" y1="48" x2="35" y2="48" />
          <line x1="48" y1="28" x2="48" y2="35" />
          <line x1="48" y1="61" x2="48" y2="68" />
        </svg>
      );
    case "ams":
      return (
        <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="10" y="10" width="76" height="76" rx="16" />
          <path d="M48 24 L72 36 L48 48 L24 36 Z" />
          <path d="M24 50 L48 62 L72 50" opacity=".6" />
          <path d="M24 64 L48 76 L72 64" opacity=".4" />
          <circle cx="48" cy="36" r="3" fill="#ff5a62" stroke="none" />
        </svg>
      );
  }
}

// T-092: Accessible Coverflow of product cards
export function ProductCoverflow({ cards = defaultCards }: ProductCoverflowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const total = cards.length;

  const goTo = (idx: number) => {
    setCurrentIndex(((idx % total) + total) % total);
  };

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  const activeCard = cards[currentIndex] ?? cards[0];

  return (
    <section className="block py-20 bg-white" id="products" data-nav="light">
      <div className="wrap mx-auto max-w-[1280px] px-6">
        <div className="sec-row flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-navy">Our products</h2>
          <Link
            className="products-all text-sm font-medium text-navy hover:text-coral inline-flex items-center gap-2"
            href="/products"
          >
            View all products <span className="arr" aria-hidden="true">→</span>
          </Link>
        </div>

        <div
          ref={containerRef}
          className="coverflow"
          id="productCoverflow"
          role="region"
          aria-roledescription="carousel"
          aria-label="Our products"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") goTo(currentIndex - 1);
            if (e.key === "ArrowRight") goTo(currentIndex + 1);
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(e) => {
            if (!containerRef.current?.contains(e.relatedTarget as Node)) {
              setIsPaused(false);
            }
          }}
        >
          <div className="cf-viewport">
            <div
              ref={trackRef}
              className="cf-track"
              style={{
                transform: `translateX(calc(50% - 170px - ${currentIndex * (340 + 24)}px))`,
              }}
            >
              {cards.map((card, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <article
                    key={card.name}
                    className={`cf-card ${isActive ? "is-active" : ""}`}
                    data-cf={idx}
                    aria-roledescription="slide"
                    aria-label={`${idx + 1} of ${total}: ${card.name}`}
                    inert={!isActive ? true : undefined}
                  >
                    <div className="cf-photo">
                      <div className="pcard-icon">
                        {renderCardIcon(card.iconKey)}
                      </div>
                    </div>
                    <div className="cf-body">
                      <h3>{card.name}</h3>
                      <p className="cf-desc">{card.desc}</p>
                      <div
                        className="cf-tags"
                        aria-label={`${card.name} tags`}
                      >
                        {card.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <Link
                        className="btn pcard-btn cf-btn"
                        href={card.href}
                        tabIndex={isActive ? 0 : -1}
                        aria-label={`View more about ${card.name}`}
                      >
                        View more{" "}
                        <span className="arr" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="cf-controls">
            <button
              className="cf-arrow cf-prev"
              type="button"
              aria-label="Previous product"
              onClick={() => goTo(currentIndex - 1)}
            >
              ←
            </button>
            <div className="cf-dots" role="group" aria-label="Choose product">
              {cards.map((card, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={card.name}
                    className={`cf-dot ${isActive ? "act" : ""}`}
                    type="button"
                    aria-label={`Show ${card.name}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => goTo(idx)}
                  />
                );
              })}
            </div>
            <button
              className="cf-arrow cf-next"
              type="button"
              aria-label="Next product"
              onClick={() => goTo(currentIndex + 1)}
            >
              →
            </button>
            <p className="cf-status" id="cfStatus" aria-live="polite">
              {activeCard.name}, {currentIndex + 1} of {total}
            </p>
          </div>

          <div className="cf-timer" aria-hidden="true">
            <i className={isPaused ? "" : "run"} />
          </div>
        </div>
      </div>
    </section>
  );
}
