"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";

type ProductKey = "postureone" | "xsense" | "authtouch";

interface ProductColDef {
  key: ProductKey;
  name: string;
  viewHref: string;
  imgAlt: string;
  whatItDoes: string;
  bestFor: string;
  delivery: string[];
  worksWith: string[];
}

const PRODUCTS_MAP: Record<ProductKey, ProductColDef> = {
  postureone: {
    key: "postureone",
    name: "PostureOne",
    viewHref: "/products/postureone",
    imgAlt: "Server racks with network cabling in a data centre",
    whatItDoes: "Website and cloud security posture in one view.",
    bestFor: "Findings, owners and evidence in one place.",
    delivery: ["Platform view", "Mapped to frameworks"],
    worksWith: ["Websites", "Cloud services", "Data stores"],
  },
  xsense: {
    key: "xsense",
    name: "XSense",
    viewHref: "/products/xsense",
    imgAlt: "Analytics dashboard with charts on a laptop screen",
    whatItDoes: "Identity analytics and MFA through a governed identity provider.",
    bestFor: "A live view of sign-in and MFA coverage at scale.",
    delivery: ["SaaS", "On-premises", "Air-gapped"],
    worksWith: ["Passwordless Keys", "AMS"],
  },
  authtouch: {
    key: "authtouch",
    name: "AUTH Touch",
    viewHref: "/products/keys#key-touch",
    imgAlt: "Combination padlock and chip cards resting on a keyboard",
    whatItDoes: "A FIDO2 security key: one touch confirms the person is present.",
    bestFor: "The simplest sign-in step: connect, tap, done.",
    delivery: ["Hardware key", "Supported by XSignOn"],
    worksWith: ["Existing identity provider", "AMS"],
  },
};

const ALL_KEYS: ProductKey[] = ["postureone", "xsense", "authtouch"];

interface PlatformTab {
  id: string;
  label: string;
  title: string;
  tags: string[];
  description: string;
  href: string;
}

const PLATFORM_TABS: PlatformTab[] = [
  {
    id: "tab-postureone",
    label: "PostureOne",
    title: "PostureOne",
    tags: ["Identity inventory", "Posture scoring", "Continuous review"],
    description:
      "A living inventory of every person, device and agent, with posture scored continuously so reviews start from evidence instead of spreadsheets.",
    href: "/products/postureone",
  },
  {
    id: "tab-keys",
    label: "Passwordless Keys",
    title: "Passwordless Keys",
    tags: ["Passkeys", "Biometrics", "Hardware keys", "4 AUTH models"],
    description:
      "Sign-in your team will love: passkeys, biometrics and hardware keys in one calm flow, with recovery paths people can actually follow.",
    href: "/products/keys",
  },
  {
    id: "tab-evalone",
    label: "EvalOne",
    title: "EvalOne",
    tags: ["Agent evaluation", "Evidence packs", "Sign-off flows"],
    description:
      "Agents are evaluated the way great teams review code: structured checks, attached evidence and a named reviewer before authority grows.",
    href: "/products/evalone",
  },
  {
    id: "tab-xsense",
    label: "XSense",
    title: "XSense",
    tags: ["Live signals", "Behaviour context", "Adaptive decisions"],
    description:
      "Behavioural and contextual signals stream into every access decision, so the platform responds to the moment rather than a static rule.",
    href: "/products/xsense",
  },
  {
    id: "tab-ams",
    label: "AMS",
    title: "AMS",
    tags: ["Access requests", "Approvals", "Periodic reviews"],
    description:
      "The day-to-day home of access operations: requests, approvals and periodic reviews with clear owners and a complete trail.",
    href: "/products/ams",
  },
];

export function ProductOverviewInteractive() {
  // 1. Comparison Table Column Selection State
  const [selectedKeys, setSelectedKeys] = useState<ProductKey[]>(ALL_KEYS);
  const [hoveredCol, setHoveredCol] = useState<ProductKey | null>(null);
  const removeBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const addBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const toggleRemove = (key: ProductKey) => {
    const next = selectedKeys.filter((k) => k !== key);
    setSelectedKeys(next);
    // Move focus gracefully to avoid keyboard focus loss
    setTimeout(() => {
      addBtnRefs.current[key]?.focus();
    }, 50);
  };

  const toggleAdd = (key: ProductKey) => {
    const next = [...selectedKeys, key];
    setSelectedKeys(next);
    setTimeout(() => {
      removeBtnRefs.current[key]?.focus();
    }, 50);
  };

  const clearAll = () => {
    setSelectedKeys([]);
  };

  // 2. Platform Tablist State
  const [activePlatformTab, setActivePlatformTab] = useState(0);
  const platformTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handlePlatformKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % PLATFORM_TABS.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + PLATFORM_TABS.length) % PLATFORM_TABS.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = PLATFORM_TABS.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActivePlatformTab(nextIndex);
    platformTabRefs.current[nextIndex]?.focus();
  };

  const removedKeys = ALL_KEYS.filter((k) => !selectedKeys.includes(k));

  return (
    <div className="space-y-20 py-(--section-pad)">
      {/* SECTION 1: OVERVIEW OF PRODUCTS & DYNAMIC COMPARISON TABLE */}
      <section id="prodOverview">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-display-sm font-bold text-txt">Overview of products</h2>
            <div className="flex items-center gap-4">
              <p id="ovCount" aria-live="polite" className="font-sans text-sm text-gray">
                {selectedKeys.length} of {ALL_KEYS.length} selected
              </p>
              {selectedKeys.length > 0 && (
                <button
                  type="button"
                  id="ovClear"
                  onClick={clearAll}
                  className="text-sm font-semibold text-acc-ink hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-focus rounded-md px-1 py-0.5"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Table Container */}
          {selectedKeys.length > 0 && (
            <div
              tabIndex={0}
              role="region"
              aria-label="Product comparison table"
              className="overflow-x-auto rounded-2xl border border-line bg-card shadow-xs focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <table className="w-full border-collapse text-left" id="ovTable">
                <thead>
                  <tr className="border-b border-line bg-soft">
                    <th scope="col" className="p-5 font-semibold text-txt w-56 min-w-[200px]">
                      <span className="text-base">Compare products</span>
                    </th>
                    {ALL_KEYS.map((key) => {
                      if (!selectedKeys.includes(key)) return null;
                      const prod = PRODUCTS_MAP[key];
                      const isColActive = hoveredCol === key;
                      return (
                        <th
                          key={key}
                          scope="col"
                          onMouseEnter={() => setHoveredCol(key)}
                          onMouseLeave={() => setHoveredCol(null)}
                          onFocus={() => setHoveredCol(key)}
                          onBlur={() => setHoveredCol(null)}
                          className={`p-5 align-top min-w-[260px] transition-colors ${
                            isColActive ? "bg-card ring-1 ring-ctl" : ""
                          }`}
                        >
                          <div className="flex flex-col items-start gap-2">
                            <span className="text-xl font-bold text-txt">{prod.name}</span>
                            <div className="flex items-center gap-3 text-sm">
                              <Link
                                href={prod.viewHref}
                                className="font-semibold text-acc-ink hover:underline underline-offset-4"
                              >
                                View {prod.name}
                              </Link>
                              <span className="text-line" aria-hidden="true">
                                |
                              </span>
                              <button
                                ref={(el) => {
                                  removeBtnRefs.current[key] = el;
                                }}
                                type="button"
                                onClick={() => toggleRemove(key)}
                                className="text-gray hover:text-txt text-xs font-medium hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-sm md:text-base">
                  {/* Row 1: What it does */}
                  <tr className="hover:bg-soft/30 transition-colors">
                    <th scope="row" className="p-5 font-semibold text-txt align-top">
                      What it does
                    </th>
                    {ALL_KEYS.map((key) => {
                      if (!selectedKeys.includes(key)) return null;
                      const prod = PRODUCTS_MAP[key];
                      return (
                        <td
                          key={key}
                          data-th={prod.name}
                          onMouseEnter={() => setHoveredCol(key)}
                          onMouseLeave={() => setHoveredCol(null)}
                          className={`p-5 text-gray align-top transition-colors ${
                            hoveredCol === key ? "bg-soft/50 font-medium text-txt" : ""
                          }`}
                        >
                          {prod.whatItDoes}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row 2: Best for */}
                  <tr className="hover:bg-soft/30 transition-colors">
                    <th scope="row" className="p-5 font-semibold text-txt align-top">
                      Best for
                    </th>
                    {ALL_KEYS.map((key) => {
                      if (!selectedKeys.includes(key)) return null;
                      const prod = PRODUCTS_MAP[key];
                      return (
                        <td
                          key={key}
                          data-th={prod.name}
                          onMouseEnter={() => setHoveredCol(key)}
                          onMouseLeave={() => setHoveredCol(null)}
                          className={`p-5 text-gray align-top transition-colors ${
                            hoveredCol === key ? "bg-soft/50 font-medium text-txt" : ""
                          }`}
                        >
                          {prod.bestFor}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row 3: Delivery */}
                  <tr className="hover:bg-soft/30 transition-colors">
                    <th scope="row" className="p-5 font-semibold text-txt align-top">
                      Delivery
                    </th>
                    {ALL_KEYS.map((key) => {
                      if (!selectedKeys.includes(key)) return null;
                      const prod = PRODUCTS_MAP[key];
                      return (
                        <td
                          key={key}
                          data-th={prod.name}
                          onMouseEnter={() => setHoveredCol(key)}
                          onMouseLeave={() => setHoveredCol(null)}
                          className={`p-5 align-top transition-colors ${
                            hoveredCol === key ? "bg-soft/50" : ""
                          }`}
                        >
                          <div className="flex flex-wrap gap-1.5">
                            {prod.delivery.map((chip, cIdx) => (
                              <span
                                key={cIdx}
                                className="rounded-full bg-soft px-3 py-1 font-sans text-xs text-txt border border-line"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row 4: Works with */}
                  <tr className="hover:bg-soft/30 transition-colors">
                    <th scope="row" className="p-5 font-semibold text-txt align-top">
                      Works with
                    </th>
                    {ALL_KEYS.map((key) => {
                      if (!selectedKeys.includes(key)) return null;
                      const prod = PRODUCTS_MAP[key];
                      return (
                        <td
                          key={key}
                          data-th={prod.name}
                          onMouseEnter={() => setHoveredCol(key)}
                          onMouseLeave={() => setHoveredCol(null)}
                          className={`p-5 align-top transition-colors ${
                            hoveredCol === key ? "bg-soft/50" : ""
                          }`}
                        >
                          <div className="flex flex-wrap gap-1.5">
                            {prod.worksWith.map((chip, cIdx) => (
                              <span
                                key={cIdx}
                                className="rounded-full bg-card px-3 py-1 font-sans text-xs text-gray border border-line shadow-xs"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Add-back buttons container */}
          {removedKeys.length > 0 && (
            <div
              id="ovAddback"
              className="mt-6 rounded-2xl border border-dashed border-ctl bg-soft/50 p-6 md:p-8"
            >
              <p className="font-semibold text-txt text-base">Select products to compare</p>
              <div className="mt-3 flex flex-wrap gap-3" id="ovAddBtns">
                {removedKeys.map((key) => {
                  const prod = PRODUCTS_MAP[key];
                  return (
                    <button
                      key={key}
                      ref={(el) => {
                        addBtnRefs.current[key] = el;
                      }}
                      type="button"
                      onClick={() => toggleAdd(key)}
                      className="min-h-[44px] rounded-full border border-line bg-card px-5 py-2 text-sm font-semibold text-acc-ink shadow-xs hover:border-ctl hover:bg-white focus:outline-none focus:ring-2 focus:ring-focus transition-colors"
                    >
                      Add {prod.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: PLATFORM TABS (ACCESSIBLE TABLIST) */}
      <section id="platform" className="border-t border-line/60 pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-display-sm font-bold text-txt">Platform details</h2>
          </div>

          <div
            role="tablist"
            aria-label="Products platform selector"
            className="flex flex-wrap gap-2 border-b border-line pb-4"
            id="prodxTabs"
          >
            {PLATFORM_TABS.map((tab, idx) => {
              const isSelected = activePlatformTab === idx;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    platformTabRefs.current[idx] = el;
                  }}
                  role="tab"
                  id={`ptab-${idx}`}
                  aria-controls={`ppanel-${idx}`}
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActivePlatformTab(idx)}
                  onKeyDown={(e) => handlePlatformKeyDown(e, idx)}
                  className={`min-h-[44px] rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-focus ${
                    isSelected
                      ? "border-d1 bg-d1 text-white shadow-xs"
                      : "border-line bg-card text-gray hover:border-ctl hover:text-txt"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="pt-8">
            {PLATFORM_TABS.map((tab, idx) => (
              <article
                key={tab.id}
                role="tabpanel"
                id={`ppanel-${idx}`}
                aria-labelledby={`ptab-${idx}`}
                hidden={activePlatformTab !== idx}
                tabIndex={0}
                className="focus:outline-none rounded-2xl border border-line bg-card p-8 md:p-10 shadow-xs max-w-3xl"
              >
                {activePlatformTab === idx && (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-txt">
                      {tab.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {tab.tags.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-full bg-soft px-3 py-1 font-sans text-xs font-medium text-gray border border-line"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 text-base md:text-lg text-gray leading-relaxed">
                      {tab.description}
                    </p>

                    <div className="mt-6">
                      <Link
                        href={tab.href}
                        className="group inline-flex items-center gap-2 text-base font-semibold text-acc-ink hover:underline underline-offset-4"
                      >
                        <span>View {tab.title}</span>
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
