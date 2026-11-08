"use client";

import { useState } from "react";
import Link from "next/link";
import type { HomeThinking } from "@/types/home";

interface ThinkingBandProps {
  thinking?: HomeThinking;
}

const defaultThinking: HomeThinking = {
  lead: {
    title: "Data + AI Security Built for Visibility, Control, and Trust",
    date: "June 29, 2026",
    desc: "AI governance assessments start with simple questions: which AI systems are in production, who owns them, and what data they touch. This article sets out the evidence that answers each one, ready before the assessment letter arrives.",
    href: "/thinking/data-and-ai-security",
    imageAlt: "Engineer with a laptop walking past server racks in a data centre",
  },
  items: [
    {
      title: "Modern Micro-Segmentation for Zero Trust Security",
      date: "June 29, 2026",
      desc: "Micro-segmentation divides an estate into small, governed zones, and the modern version starts with identity: who and what is asking, with what assurance, before any connection is allowed.",
      href: "/thinking/modern-micro-segmentation",
      imageAlt: "Close-up of server hardware and cabling in a rack",
    },
    {
      title: "Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework",
      date: "June 29, 2026",
      desc: "Agentic AI divides a job among specialized agents that plan, act and check each other's work. For security and governance, that structure is the point: every action owned, scoped and reviewable.",
      href: "/thinking/agentic-ai-cybersecurity",
      imageAlt: "Engineer working on a laptop in a technology lab",
    },
    {
      title: "Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model",
      date: "June 29, 2026",
      desc: "A growing share of sign-ins comes from non-human identities: service accounts, automations and AI agents. Each one deserves the same governance as a person's account: an owner, a scope, and a review cycle.",
      href: "/thinking/non-human-identities",
      imageAlt: "Close-up photograph of an illuminated circuit board",
    },
  ],
};

// T-094: Our Thinking band: lead article + interactive expandable articles
export function ThinkingBand({ thinking = defaultThinking }: ThinkingBandProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      className="block think-band py-20"
      id="thinking"
      data-nav="light"
      style={{
        background: "linear-gradient(180deg, #F6F4FB 0%, #FFFFFF 100%)",
      }}
    >
      <div className="wrap mx-auto max-w-[1280px] px-6">
        <div className="sec-row mb-8">
          <h2 className="text-3xl font-semibold text-[#1A1240]">Our thinking</h2>
        </div>

        <div className="think-stack">
          {/* Lead Article */}
          <article className="think-lead">
            <div className="think-body">
              <h4 className="h4">{thinking.lead.title}</h4>
              <p className="meta">{thinking.lead.date}</p>
              <p>{thinking.lead.desc}</p>
              <Link className="link-arrow text-navy hover:text-coral inline-flex items-center gap-2" href={thinking.lead.href}>
                Read the article <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
            <div
              className="think-panel relative overflow-hidden min-h-[240px] rounded-r-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(6, 1, 41, 0.92) 0%, rgba(37, 32, 92, 0.85) 100%)",
              }}
              aria-hidden="true"
            >
              {/* 11.2 Diagonal 5px Crimson Accent Slash Bar */}
              <div
                style={{
                  position: "absolute",
                  left: "64%",
                  top: "-25%",
                  bottom: "-25%",
                  width: "5px",
                  background: "var(--acc, #c6001d)",
                  transform: "rotate(16deg)",
                  boxShadow: "0 0 16px rgba(198, 0, 29, 0.6)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center p-6 text-white/70">
                <svg
                  viewBox="0 0 120 120"
                  fill="none"
                  stroke="#9db9f5"
                  strokeWidth="2"
                  className="w-20 h-20 opacity-40"
                  aria-hidden="true"
                >
                  <rect x="20" y="20" width="80" height="80" rx="10" />
                  <path d="M20 50h80M50 20v80" stroke="#ff6a82" />
                </svg>
              </div>
            </div>
          </article>

          {/* Interactive Accordion List */}
          <div className="think-list">
            {thinking.items.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={item.title} className="think-item">
                  <button
                    type="button"
                    className="think-row"
                    aria-expanded={isOpen}
                    onClick={() => toggle(idx)}
                  >
                    <span className="t font-medium text-navy">{item.title}</span>
                    <span className="d">{item.date}</span>
                  </button>
                  <div className={`think-expand ${isOpen ? "open" : ""}`}>
                    <div className="pt-4">
                      <p className="text-slate-600 mb-4">{item.desc}</p>
                      <Link
                        className="link-arrow text-navy hover:text-coral inline-flex items-center gap-2 text-sm font-semibold"
                        href={item.href}
                      >
                        Read the article <span className="arr" aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
