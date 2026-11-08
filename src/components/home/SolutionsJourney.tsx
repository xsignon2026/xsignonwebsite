"use client";

import { useState } from "react";
import Link from "next/link";
import type { HomeSolutionItem } from "@/types/home";
import { PerspectiveGrid } from "@/components/motion/PerspectiveGrid";

interface SolutionsJourneyProps {
  solutions?: HomeSolutionItem[];
}

const defaultSolutions: HomeSolutionItem[] = [
  {
    title: "Identity Governance",
    desc: "Teams want one accountable sign-in for every person and agent. Govern who and what gets access, and prove it with confidence.",
    href: "/solutions/identity-governance",
    deliveredBy: ["PostureOne", "AMS", "Passwordless Keys"],
    diagramKey: "identity",
  },
  {
    title: "AI and Digital Governance",
    desc: "Teams want AI evidence ready with confidence. Map AI use to frameworks and keep evidence ready.",
    href: "/solutions/ai-and-digital-governance",
    deliveredBy: ["EvalOne", "PostureOne"],
    diagramKey: "ai",
  },
  {
    title: "Quantum-Safe Security",
    desc: "Teams are preparing early for post-quantum methods. Inventory what you rely on and plan the move with clarity and confidence.",
    href: "/solutions/quantum-safe-security",
    deliveredBy: ["PostureOne", "XSense"],
    diagramKey: "quantum",
  },
  {
    title: "Business Process",
    desc: "Access operations built around how teams work, with human review at every critical checkpoint.",
    href: "/solutions/business-process",
    deliveredBy: ["AMS", "XSense"],
    diagramKey: "process",
  },
  {
    title: "Enterprise Technology",
    desc: "Unify legacy on-prem infrastructure, air-gapped zones, and modern cloud estates under one zero-trust control plane.",
    href: "/solutions/enterprise-technology",
    deliveredBy: ["PostureOne", "Passwordless Keys", "XSense"],
    diagramKey: "enterprise",
  },
];

function renderSolutionSvg(key: HomeSolutionItem["diagramKey"]) {
  switch (key) {
    case "identity":
      return (
        <svg viewBox="0 0 400 228" role="img" preserveAspectRatio="xMidYMid meet" aria-label="Identity graph: staff, devices and AI agents connected to one governed core">
          <g stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
            <path d="M200 96 L78 52" />
            <path d="M200 96 L322 52" />
            <path d="M200 96 L200 172" />
          </g>
          <circle cx="200" cy="96" r="28" fill="rgba(255,90,98,0.2)" />
          <circle cx="200" cy="96" r="28" stroke="#ff5a62" strokeWidth="2" fill="none" />
          <path d="M200 82l12 4.5v9.5c0 7-5 11-12 14.5-7-3.5-12-7.5-12-14.5v-9.5z" stroke="#ff5a62" strokeWidth="1.5" fill="none" />
          <circle cx="78" cy="52" r="21" stroke="#9db9f5" strokeWidth="1.5" fill="rgba(0,18,51,0.8)" />
          <circle cx="78" cy="46" r="6" stroke="#9db9f5" strokeWidth="1.5" fill="none" />
          <path d="M66 62c2-7 6-10 12-10s10 3 12 10" stroke="#9db9f5" strokeWidth="1.5" fill="none" />
          <rect x="300" y="34" width="44" height="36" rx="8" stroke="#9db9f5" strokeWidth="1.5" fill="rgba(0,18,51,0.8)" />
          <path d="M310 62h24M322 70v4" stroke="#9db9f5" strokeWidth="1.5" />
          <circle cx="200" cy="172" r="21" stroke="#9db9f5" strokeWidth="1.5" fill="rgba(0,18,51,0.8)" />
          <path d="M200 160l10 6v12l-10 6-10-6v-12z" stroke="#9db9f5" strokeWidth="1.5" fill="none" />
          <text x="78" y="92" textAnchor="middle" fill="#9db9f5" fontSize="12">Staff</text>
          <text x="322" y="92" textAnchor="middle" fill="#9db9f5" fontSize="12">Devices</text>
          <text x="200" y="208" textAnchor="middle" fill="#9db9f5" fontSize="12">AI agents</text>
        </svg>
      );
    case "ai":
      return (
        <svg viewBox="0 0 400 228" role="img" preserveAspectRatio="xMidYMid meet" aria-label="AI governance mapping to frameworks">
          <g stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
            <path d="M110 98 C150 98 150 44 188 44" fill="none" />
            <path d="M110 98 L188 98" fill="none" />
            <path d="M110 98 C150 98 150 152 188 152" fill="none" />
          </g>
          <circle cx="80" cy="98" r="30" fill="rgba(255,90,98,0.2)" />
          <path d="M80 68l26 15v30L80 128 54 113V83z" stroke="#ff5a62" strokeWidth="2" fill="none" />
          <text x="80" y="103" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">AI</text>
          <g transform="translate(188, 28)">
            <rect width="186" height="32" rx="9" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
            <text x="16" y="20" fill="#fff" fontSize="13">Inventory with owners</text>
          </g>
          <g transform="translate(188, 82)">
            <rect width="186" height="32" rx="9" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
            <text x="16" y="20" fill="#fff" fontSize="13">Mapped to frameworks</text>
          </g>
          <g transform="translate(188, 136)">
            <rect width="186" height="32" rx="9" fill="rgba(255,90,98,0.15)" stroke="#ff5a62" />
            <text x="16" y="20" fill="#fff" fontSize="13">Evidence kept current</text>
          </g>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 400 228" role="img" preserveAspectRatio="xMidYMid meet" aria-label="Security Architecture">
          <circle cx="200" cy="114" r="50" stroke="#6366f1" strokeWidth="2" fill="rgba(99,102,241,0.1)" />
          <circle cx="200" cy="114" r="8" fill="#ff5a62" />
          <path d="M120 114 H280 M200 34 V194" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <rect x="70" y="90" width="80" height="48" rx="8" stroke="#9db9f5" strokeWidth="1.5" fill="rgba(6,1,41,0.8)" />
          <text x="110" y="120" textAnchor="middle" fill="#fff" fontSize="12">Zero Trust</text>
          <rect x="250" y="90" width="80" height="48" rx="8" stroke="#9db9f5" strokeWidth="1.5" fill="rgba(6,1,41,0.8)" />
          <text x="290" y="120" textAnchor="middle" fill="#fff" fontSize="12">Governed</text>
        </svg>
      );
  }
}

// T-094: Solutions Journey component
export function SolutionsJourney({ solutions = defaultSolutions }: SolutionsJourneyProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      className="block dark has-persp py-20 relative overflow-hidden"
      id="resources"
      data-nav="dark"
      style={{ backgroundColor: "#060129" }}
    >
      <PerspectiveGrid horizon={0.38} alpha={1.7} />
      <div className="wrap mx-auto max-w-[1280px] px-6 relative z-10">
        <div className="sec-row flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-white">Solutions</h2>
          <Link
            className="products-all text-sm font-medium text-white/80 hover:text-coral inline-flex items-center gap-2"
            href="/solutions"
          >
            View all solutions <span className="arr" aria-hidden="true">→</span>
          </Link>
        </div>

        <div id="solutions">
          <div className="journey" id="journey">
            <div className="j-stage">
              <div className="j-rail" role="tablist" aria-label="Solutions rail">
                {solutions.map((sol, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={sol.title}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={isActive ? "act" : ""}
                      onClick={() => setActiveIdx(idx)}
                    >
                      {sol.title}
                    </button>
                  );
                })}
              </div>

              <div className="j-panels">
                {solutions.map((sol, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <article
                      key={sol.title}
                      className={`j-panel ${isActive ? "act" : ""}`}
                      role="tabpanel"
                      aria-hidden={isActive ? "false" : "true"}
                    >
                      <div className="j-txt">
                        <h4 className="h4">{sol.title}</h4>
                        <p>{sol.desc}</p>
                        <Link className="link-arrow" href={sol.href}>
                          View solution <span className="arr" aria-hidden="true">→</span>
                        </Link>
                      </div>
                      <figure className="j-art">
                        {renderSolutionSvg(sol.diagramKey)}
                        <figcaption className="j-by">
                          <span>Delivered by:</span>
                          {sol.deliveredBy.map((p) => (
                            <b key={p}>{p}</b>
                          ))}
                        </figcaption>
                      </figure>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
