"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeHeroSlide } from "@/types/home";

interface HeroSliderProps {
  slides?: HomeHeroSlide[];
}

const defaultSlides: HomeHeroSlide[] = [
  {
    name: "PostureOne",
    category: "Security Posture",
    count: "01 / 05",
    desc: "Website and cloud security posture in one view, with findings, owners and evidence in a single place.",
    iconKey: "postureone",
  },
  {
    name: "EvalOne",
    category: "AI Evaluation",
    count: "02 / 05",
    desc: "AI systems evaluated against recognized frameworks, with evidence a reviewer can follow.",
    iconKey: "evalone",
  },
  {
    name: "XSense",
    category: "Identity Analytics and MFA",
    count: "03 / 05",
    desc: "Identity analytics and a software-bound identity provider for governed sign-in at scale.",
    iconKey: "xsense",
  },
  {
    name: "Passwordless Keys",
    category: "FIDO2 Hardware Keys",
    count: "04 / 05",
    desc: "FIDO2 biometric keys in four models, delivered and supported by XSignOn.",
    iconKey: "keys",
  },
  {
    name: "AMS",
    category: "Key Management",
    count: "05 / 05",
    desc: "The platform that delivers, enrolls and manages passwordless keys across the organization.",
    iconKey: "ams",
  },
];

function renderHeroSvg(iconKey: HomeHeroSlide["iconKey"]) {
  switch (iconKey) {
    case "postureone":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="#9db9f5"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M60 12l38 13v26c0 26-16 44-38 55C38 95 22 77 22 51V25z" />
          <path
            d="M60 25l26 9v18c0 19-11 32-26 41C45 84 34 71 34 52V34z"
            opacity=".6"
          />
          <path
            d="M60 38l15 5v9c0 12-6.5 21-15 27C51.5 73 45 64 45 52v-9z"
            opacity=".38"
          />
          <line x1="60" y1="12" x2="60" y2="106" stroke="#ff5a62" />
        </svg>
      );
    case "evalone":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="#9db9f5"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="60" cy="60" r="46" opacity=".45" />
          <circle cx="60" cy="60" r="33" opacity=".65" />
          <circle cx="60" cy="60" r="20" />
          <line x1="60" y1="6" x2="60" y2="24" />
          <line x1="60" y1="96" x2="60" y2="114" />
          <line x1="6" y1="60" x2="24" y2="60" />
          <line x1="96" y1="60" x2="114" y2="60" />
          <circle cx="60" cy="60" r="5" fill="#ff5a62" stroke="none" />
        </svg>
      );
    case "xsense":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="#9db9f5"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M28 78V58a32 32 0 0 1 64 0v20" opacity=".5" />
          <path d="M40 84V58a20 20 0 0 1 40 0v26" opacity=".75" />
          <path d="M52 88V60a8 8 0 0 1 16 0v30" />
          <line x1="60" y1="66" x2="60" y2="96" stroke="#ff5a62" />
          <path d="M22 92c10 6 23 9 38 9s28-3 38-9" opacity=".5" />
        </svg>
      );
    case "keys":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="#9db9f5"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <rect x="24" y="38" width="72" height="46" rx="14" />
          <circle cx="47" cy="61" r="10" />
          <line x1="57" y1="61" x2="84" y2="61" />
          <line x1="76" y1="61" x2="76" y2="72" />
          <line x1="84" y1="61" x2="84" y2="75" />
          <circle cx="47" cy="61" r="3.5" fill="#ff5a62" stroke="none" />
        </svg>
      );
    case "ams":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="#9db9f5"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M60 18l40 15-40 15-40-15z" />
          <path d="M24 52l36 13 36-13" opacity=".65" />
          <path d="M24 71l36 13 36-13" opacity=".4" />
          <circle cx="60" cy="33" r="3.5" fill="#ff5a62" stroke="none" />
        </svg>
      );
  }
}

// T-091: Hero product carousel: auto-advance, keyboard navigation, and explicit pause control
export function HeroSlider({ slides = defaultSlides }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const isPaused = userPaused || isHovered;
  const total = slides.length;

  const show = (idx: number) => {
    setActiveIndex(((idx % total) + total) % total);
  };

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      show(activeIndex - 1);
    } else if (e.key === "ArrowRight") {
      show(activeIndex + 1);
    }
  };

  return (
    <div
      ref={cardRef}
      className="hcard"
      id="heroCard"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured products"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={(e) => {
        if (!cardRef.current?.contains(e.relatedTarget as Node)) {
          setIsHovered(false);
        }
      }}
    >
      <div className="hslides">
        {slides.map((slide, idx) => {
          const isActive = idx === activeIndex;
          return (
            <article
              key={slide.name}
              className={`hslide ${isActive ? "act" : ""}`}
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${total}: ${slide.name}`}
              aria-hidden={isActive ? "false" : "true"}
            >
              <div className="hviz" aria-hidden="true">
                {renderHeroSvg(slide.iconKey)}
              </div>
              <div className="hinfo">
                <div className="hinfo-top">
                  <p className="hcat">{slide.category}</p>
                  <span className="hcount">{slide.count}</span>
                </div>
                <h3>{slide.name}</h3>
                <p className="hdesc">{slide.desc}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="hctl">
        <div className="hdots" role="group" aria-label="Choose slide">
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.name}
                type="button"
                className={`hdot ${isActive ? "act" : ""}`}
                aria-label={`Show slide ${idx + 1}: ${slide.name}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => show(idx)}
              />
            );
          })}
        </div>
        <button
          type="button"
          className="hpause"
          aria-pressed={userPaused}
          aria-label={userPaused ? "Resume product slides auto-rotation" : "Pause product slides auto-rotation"}
          onClick={() => setUserPaused((prev) => !prev)}
        >
          {userPaused ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
}
