"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type { HomeCoverflowCard } from "@/types/home";

// The visitor's "reduce motion" setting, kept in step with the system without setting state in an effect.
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

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

const productImages: Record<HomeCoverflowCard["iconKey"], { src: string; alt: string }> = {
  postureone: {
    src: "/images/products/postureone.jpg",
    alt: "Server racks with network cabling in a data centre",
  },
  keys: {
    src: "/images/products/keys.jpg",
    alt: "Person holding a phone in one hand while signing in on a laptop",
  },
  evalone: {
    src: "/images/products/evalone.jpg",
    alt: "Team running an evaluation workshop with notes on a wall",
  },
  xsense: {
    src: "/images/products/xsense.jpg",
    alt: "Engineer reviewing analytics on a monitor",
  },
  ams: {
    src: "/images/products/ams.jpg",
    alt: "Warehouse shelves of tracked inventory and parts",
  },
};

function renderCardIcon(key: HomeCoverflowCard["iconKey"]) {
  switch (key) {
    case "postureone":
      return (
        <svg
          viewBox="0 0 96 96"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
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
        <svg
          viewBox="0 0 96 96"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="10" y="10" width="76" height="76" rx="16" />
          <path d="M26 72 V52 a22 22 0 0 1 44 0 V72" />
          <path d="M34 72 V52 a14 14 0 0 1 28 0 V72" />
          <path d="M42 70 V52 a6 6 0 0 1 12 0 V70" stroke="#ff5a62" />
        </svg>
      );
    case "evalone":
      return (
        <svg
          viewBox="0 0 96 96"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="10" y="10" width="76" height="76" rx="16" />
          <circle cx="48" cy="48" r="27" />
          <circle cx="48" cy="48" r="18" />
          <circle cx="48" cy="48" r="9" />
          <path d="M48 21 A27 27 0 0 1 75 48" stroke="#ff5a62" />
        </svg>
      );
    case "xsense":
      return (
        <svg
          viewBox="0 0 96 96"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
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
        <svg
          viewBox="0 0 96 96"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="10" y="10" width="76" height="76" rx="16" />
          <path d="M48 24 L72 36 L48 48 L24 36 Z" />
          <path d="M24 50 L48 62 L72 50" opacity=".6" />
          <path d="M24 64 L48 76 L72 64" opacity=".4" />
          <circle cx="48" cy="36" r="3" fill="#ff5a62" stroke="none" />
        </svg>
      );
  }
}

// T-092: Accessible 3D Coverflow of product cards matching xsignon-home-beams.html (Version 2 Ombre)
export function ProductCoverflow({ cards = defaultCards }: ProductCoverflowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [clientWidth, setClientWidth] = useState(1200);
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragXRef = useRef<number | null>(null);
  const draggedRef = useRef(false);

  const total = cards.length;

  const goTo = (idx: number) => {
    setCurrentIndex(((idx % total) + total) % total);
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setClientWidth(containerRef.current.clientWidth);
      } else if (typeof window !== "undefined") {
        setClientWidth(window.innerWidth);
      }
    };

    if (typeof window !== "undefined") {
      updateDimensions();
      window.addEventListener("resize", updateDimensions);

      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5200);

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, total]);

  const activeCard = cards[currentIndex] ?? cards[0];

  const fan = !prefersReducedMotion && clientWidth >= 1180;
  const s = fan ? Math.max(300, (clientWidth / 2 - 100) / 2) : 0;

  return (
    <section
      className="block py-20"
      id="products"
      data-nav="dark"
      style={{
        background:
          "linear-gradient(180deg, #060129 0%, #1A1240 12%, #3B3668 40%, #6E6A9A 72%, #B3AED0 100%)",
      }}
    >
      <div className="wrap mx-auto max-w-[1280px] px-6">
        <div className="sec-row flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-[#F6F4FB]" style={{ color: "#F6F4FB" }}>
            Our products
          </h2>
          <Link
            className="products-all text-sm font-medium text-[#F6F4FB] hover:underline inline-flex items-center gap-2"
            href="/products"
            style={{ color: "#F6F4FB" }}
          >
            View all products{" "}
            <span className="arr" aria-hidden="true">
              →
            </span>
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
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              goTo(currentIndex - 1);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              goTo(currentIndex + 1);
            } else if (e.key === "Home") {
              e.preventDefault();
              goTo(0);
            } else if (e.key === "End") {
              e.preventDefault();
              goTo(total - 1);
            }
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
          <div
            className="cf-viewport"
            id="cfViewport"
            onPointerDown={(e) => {
              dragXRef.current = e.clientX;
              draggedRef.current = false;
            }}
            onPointerMove={(e) => {
              if (dragXRef.current !== null && Math.abs(e.clientX - dragXRef.current) > 8) {
                draggedRef.current = true;
              }
            }}
            onPointerUp={(e) => {
              if (dragXRef.current === null) return;
              const dx = e.clientX - dragXRef.current;
              dragXRef.current = null;
              if (Math.abs(dx) > 48) {
                if (dx < 0) {
                  goTo(currentIndex + 1);
                } else {
                  goTo(currentIndex - 1);
                }
              }
              setTimeout(() => {
                draggedRef.current = false;
              }, 40);
            }}
            onPointerCancel={() => {
              dragXRef.current = null;
              draggedRef.current = false;
            }}
          >
            <div className="cf-track" id="cfTrack">
              {cards.map((card, idx) => {
                let off = idx - currentIndex;
                off = ((off % total) + total) % total;
                if (off > total / 2) off -= total;
                const a = Math.abs(off);
                const isActive = off === 0;

                let transform = "";
                if (!prefersReducedMotion) {
                  if (fan) {
                    transform = `translateX(-50%) translateX(${off * s}px) translateZ(${-a * 110}px) rotateY(${off === 0 ? 0 : -off * 38}deg) scale(${1 - a * 0.05})`;
                  } else {
                    transform = `translateX(-50%) translateX(${off * 62}%) translateZ(${-a * 130}px) rotateY(${off === 0 ? 0 : -off * 36}deg) scale(${1 - a * 0.07})`;
                  }
                }
                const opacity = prefersReducedMotion
                  ? isActive
                    ? "1"
                    : "0"
                  : String(1 - a * 0.16);
                const zIndex = 20 - a;

                const imgData = productImages[card.iconKey] || {
                  src: "/images/products/postureone.jpg",
                  alt: card.name,
                };

                return (
                  <article
                    key={card.name}
                    className={`cf-card ${isActive ? "is-active" : ""}`}
                    data-cf={idx}
                    aria-roledescription="slide"
                    aria-label={`${idx + 1} of ${total}: ${card.name}`}
                    inert={!isActive ? true : undefined}
                    style={{
                      transform,
                      opacity,
                      zIndex,
                    }}
                    onClick={(e) => {
                      if (draggedRef.current) return;
                      if (!isActive) {
                        e.preventDefault();
                        goTo(idx);
                      }
                    }}
                  >
                    <div className="cf-photo">
                      <div className="pcard-icon">{renderCardIcon(card.iconKey)}</div>
                      <img
                        src={card.imageSrc || imgData.src}
                        alt={card.imageAlt || imgData.alt}
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                    <div className="cf-body">
                      <h3>{card.name}</h3>
                      <p className="cf-desc">{card.desc}</p>
                      <div className="cf-tags" aria-label={`${card.name} tags`}>
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
            <i key={currentIndex} className={isPaused || prefersReducedMotion ? "" : "run"} />
          </div>
        </div>
      </div>
    </section>
  );
}
