"use client";

import Link from "next/link";
import React, { useState } from "react";

interface WhatItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  summary: string;
  href: string;
  ctaText: string;
  related: Array<{ title: string; href: string; type: string }>;
}

const WHAT_ITEMS: WhatItem[] = [
  {
    id: "sol-identity",
    num: "01",
    title: "Identity governance",
    subtitle: "PostureOne, AMS, Passwordless Keys",
    summary:
      "A living inventory of every person, device and agent, with posture scored continuously so reviews start from evidence instead of spreadsheets.",
    href: "/solutions/identity-governance",
    ctaText: "Explore Identity Governance",
    related: [
      { title: "PostureOne", href: "/products/postureone", type: "Product" },
      { title: "AMS", href: "/products/ams", type: "Product" },
      { title: "Passwordless Keys", href: "/products/keys", type: "Product" },
    ],
  },
  {
    id: "sol-ai",
    num: "02",
    title: "AI governance",
    subtitle: "EvalOne, PostureOne",
    summary:
      "Boundaries, owners, and evidence for every agent in production. Five tiers of authority ensure agents operate strictly within human policy.",
    href: "/solutions/ai-and-digital-governance",
    ctaText: "Explore AI & Digital Governance",
    related: [
      { title: "EvalOne", href: "/products/evalone", type: "Product" },
      { title: "PostureOne", href: "/products/postureone", type: "Product" },
    ],
  },
  {
    id: "keys",
    num: "03",
    title: "Passwordless sign-in",
    subtitle: "Passwordless Keys, AMS",
    summary:
      "Sign-in your team will love: passkeys, biometrics and hardware keys in one calm flow, with recovery paths people can actually follow.",
    href: "/products/keys",
    ctaText: "View Passwordless Keys",
    related: [
      { title: "Passwordless Keys", href: "/products/keys", type: "Product" },
      { title: "AMS", href: "/products/ams", type: "Product" },
    ],
  },
  {
    id: "sol-quantum",
    num: "04",
    title: "Quantum-safe security",
    subtitle: "PostureOne, XSense",
    summary:
      "Cryptographic inventory and posture scoring to identify legacy vulnerabilities and migrate to post-quantum standards before harvest-now threats materialize.",
    href: "/solutions/quantum-safe-security",
    ctaText: "Explore Quantum-Safe Security",
    related: [
      { title: "PostureOne", href: "/products/postureone", type: "Product" },
      { title: "XSense", href: "/products/xsense", type: "Product" },
    ],
  },
];

export function ExpandingWhatWeDo(): React.JSX.Element {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeHover, setActiveHover] = useState<number>(0);

  const toggle = (id: string, index: number) => {
    setOpenId((prev) => (prev === id ? null : id));
    setActiveHover(index);
  };

  const activeItem = WHAT_ITEMS[activeHover] || WHAT_ITEMS[0];

  return (
    <div className="what-cover rv">
      <div className="about-split flip">
        <figure className="about-fig wf" id="whatFig" aria-label="What we do illustration">
          <div
            style={{
              width: "100%",
              height: "100%",
              minHeight: "360px",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(15, 12, 41, 0.95) 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "13px",
                letterSpacing: "0.14em",
                color: "#a5b4fc",
                marginBottom: "8px",
              }}
            >
              PILLAR {activeItem.num}
            </div>
            <div
              style={{
                fontFamily: "var(--disp)",
                fontSize: "clamp(22px, 2.5vw, 28px)",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "12px",
              }}
            >
              {activeItem.title}
            </div>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "14.5px",
                lineHeight: 1.6,
                maxWidth: "340px",
                margin: 0,
              }}
            >
              {activeItem.subtitle}
            </p>
          </div>
          <figcaption>
            <i className="live" aria-hidden="true" />
            <span id="whatCap">{activeItem.title}</span>
          </figcaption>
        </figure>

        <div className="what-list">
          {WHAT_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `wc-${item.id}`;

            return (
              <article
                key={item.id}
                className={`what-item rv ${isOpen ? "open" : ""}`}
                onMouseEnter={() => setActiveHover(index)}
                onFocus={() => setActiveHover(index)}
              >
                <button
                  className="what-card"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id, index)}
                >
                  <span className="wn">{item.num}</span>
                  <span className="wc-text">
                    <span className="wc-t">{item.title}</span>
                    <span className="wc-d">{item.subtitle}</span>
                  </span>
                  <span className="wa" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  className="wc-panel"
                  id={panelId}
                  role="region"
                  aria-label={item.title}
                >
                  <div className="wc-inner">
                    <p style={{ color: "var(--gray)", fontSize: "15px", lineHeight: 1.6, margin: "8px 0 16px" }}>
                      {item.summary}
                    </p>
                    <p className="wc-label" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--gray)", marginBottom: "8px" }}>
                      Covered solutions & products
                    </p>
                    <div style={{ display: "grid", gap: "8px", marginBottom: "16px" }}>
                      {item.related.map((rel) => (
                        <Link key={rel.href} className="rel-row" href={rel.href}>
                          <span className="t">{rel.title}</span>
                          <span className="d">{rel.type}</span>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={item.href}
                      className="more"
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600, fontSize: "14px" }}
                    >
                      {item.ctaText}{" "}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
