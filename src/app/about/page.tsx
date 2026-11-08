import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { createPageMetadata } from "@/lib/seo";
import { ExpandingWhatWeDo } from "@/components/about/ExpandingWhatWeDo";
import { WhyXSignOnHub } from "@/components/about/WhyXSignOnHub";
import { HeroBeams } from "@/components/home/HeroBeams";

export const metadata: Metadata = createPageMetadata({
  title: "About XSignOn | Sign-in People Trust. Governance Auditors Check.",
  description:
    "XSignOn works with regulated teams to replace passwords with sign-in people can trust, and to govern access for staff, devices, and AI agents.",
  path: "/about",
});

export default function AboutPage(): React.JSX.Element {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "XSignOn",
    url: "https://xsignon.com",
    logo: "https://xsignon.com/icon.svg",
    description:
      "Enterprise identity governance and passwordless authentication platform.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "McKinney",
      addressRegion: "TX",
      addressCountry: "US",
    },
    sameAs: ["https://www.linkedin.com/company/xsignon"],
  };

  return (
    <div id="view-about">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* Hero */}
      <section className="about-hero page-hero has-beams" id="aboutHero" data-nav="dark">
        <HeroBeams />
        <div className="page-fade" aria-hidden="true" />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">About</span>
          </nav>
          <h1 className="h-display ah-title" aria-label="About XSignOn">
            About XSignOn
          </h1>
          <p className="about-sub" style={{ color: "var(--d-mut, #94a3b8)", fontSize: "clamp(18px, 2vw, 22px)", maxWidth: "680px" }}>
            Sign-in people can trust. Governance an auditor can check.
          </p>
        </div>
      </section>

      {/* Sticky In-Page Navigation Bar */}
      <nav
        aria-label="In-page About navigation"
        style={{
          position: "sticky",
          top: "60px",
          zIndex: 40,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--line)",
          padding: "12px 0",
        }}
      >
        <div className="wrap" style={{ display: "flex", gap: "20px", overflowX: "auto", whiteSpace: "nowrap" }}>
          <a href="#who" className="subnav-link" style={{ fontSize: "14px", fontWeight: 600, color: "var(--txt)" }}>
            Who we are
          </a>
          <a href="#what" className="subnav-link" style={{ fontSize: "14px", fontWeight: 600, color: "var(--txt)" }}>
            What we do
          </a>
          <a href="#how" className="subnav-link" style={{ fontSize: "14px", fontWeight: 600, color: "var(--txt)" }}>
            How we work
          </a>
          <a href="#why" className="subnav-link" style={{ fontSize: "14px", fontWeight: 600, color: "var(--txt)" }}>
            Why XSignOn
          </a>
          <a href="#think" className="subnav-link" style={{ fontSize: "14px", fontWeight: 600, color: "var(--txt)" }}>
            Our thinking
          </a>
        </div>
      </nav>

      <div data-nav="light">
        {/* Section 1: Who we are */}
        <section className="about-sec page-sec" id="who" style={{ scrollMarginTop: "120px" }}>
          <div className="wrap">
            <div className="sec-row rv">
              <h2 className="h2">Who we are</h2>
            </div>
            <div className="about-split">
              <div className="about-text rv">
                <p className="statement">
                  XSignOn works with regulated teams to replace passwords with sign-in people can trust, and to govern access for staff, devices and AI agents with evidence an auditor can check.
                </p>
                <p>
                  Our name points at the moment that matters most: the sign-on. We focus our work there, from the keys staff carry to the governance behind them.
                </p>
              </div>
              <figure className="about-fig rv" aria-label="Who we are banner">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "280px",
                    background:
                      "linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "var(--disp)", fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>
                      Identity at the Center
                    </div>
                    <p style={{ color: "#cbd5e1", fontSize: "14px", margin: 0 }}>
                      Built in McKinney, Texas. Deployed across regulated global enterprises.
                    </p>
                  </div>
                </div>
                <figcaption>
                  <i className="live" aria-hidden="true" />
                  Sign-in people can trust
                </figcaption>
              </figure>
            </div>

            <div className="principles">
              <article className="principle rv">
                <span className="pi" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <h4>Cryptographic root of trust</h4>
                <p>
                  FIDO2 Level 2+ hardware-backed biometric attestation eliminates shared credentials and phishing vectors at the source.
                </p>
              </article>

              <article className="principle rv">
                <span className="pi" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </span>
                <h4>Continuous evidence</h4>
                <p>
                  Unforgeable proof packs for SOC 2, ISO 27001, and NIST AI-RMF are produced automatically from day-to-day operations.
                </p>
              </article>

              <article className="principle rv">
                <span className="pi" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <h4>Human-in-the-loop oversight</h4>
                <p>
                  AI systems evaluate and advise; named security owners approve, hold authority, and decide.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Section 2: What we do */}
        <section className="about-sec page-sec" id="what" style={{ scrollMarginTop: "120px" }}>
          <div className="wrap">
            <div className="sec-row rv">
              <h2 className="h2">What we do</h2>
            </div>
            <ExpandingWhatWeDo />
          </div>
        </section>

        {/* Section 3: How we work */}
        <section className="about-sec page-sec" id="how" data-nav="dark" style={{ background: "var(--d0, #08070d)", color: "var(--d-txt, #f6f5fa)", scrollMarginTop: "120px" }}>
          <div className="wrap">
            <div className="sec-row rv">
              <h2 className="h2" style={{ color: "#ffffff" }}>How we work</h2>
            </div>
            <div className="how-box">
              <div className="steps-grid three">
                <div className="step-card rv" style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "#a5b4fc", marginBottom: "8px" }}>
                    01 · BASELINE
                  </div>
                  <h4 style={{ color: "#ffffff", fontSize: "18px", marginBottom: "8px" }}>Discovery and Living Inventory</h4>
                  <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.6 }}>
                    We surface every person, device, service account and AI agent with current posture scored continuously.
                  </p>
                  <p className="you-get" style={{ color: "#cbd5e1", fontSize: "13.5px", marginTop: "12px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "8px" }}>
                    <b>You get:</b> A living inventory, an objective risk score, and missing owners identified.
                  </p>
                </div>

                <div className="step-card rv" style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "#a5b4fc", marginBottom: "8px" }}>
                    02 · ARCHITECTURE
                  </div>
                  <h4 style={{ color: "#ffffff", fontSize: "18px", marginBottom: "8px" }}>Zero Trust Rollout</h4>
                  <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.6 }}>
                    We design the target state across products, policies and frameworks, then sequence rollout so teams keep continuous access.
                  </p>
                  <p className="you-get" style={{ color: "#cbd5e1", fontSize: "13.5px", marginTop: "12px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "8px" }}>
                    <b>You get:</b> A target architecture, a phased plan, and recovery flows tested with real staff.
                  </p>
                </div>

                <div className="step-card rv" style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "#a5b4fc", marginBottom: "8px" }}>
                    03 · GOVERNANCE
                  </div>
                  <h4 style={{ color: "#ffffff", fontSize: "18px", marginBottom: "8px" }}>Continuous Compliance & Response</h4>
                  <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.6 }}>
                    Posture stays current after go-live. Access reviews run on a cycle and evidence stays mapped to auditor frameworks.
                  </p>
                  <p className="you-get" style={{ color: "#cbd5e1", fontSize: "13.5px", marginTop: "12px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "8px" }}>
                    <b>You get:</b> Current posture in one view and evidence ready when an auditor asks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Why XSignOn */}
        <section className="about-sec page-sec" id="why" style={{ scrollMarginTop: "120px" }}>
          <div className="wrap">
            <div className="sec-row rv">
              <div>
                <h2 className="h2">Why XSignOn</h2>
                <p className="sec-sub">Governance on the inside</p>
              </div>
            </div>
            <WhyXSignOnHub />
          </div>
        </section>

        {/* Section 5: Our thinking */}
        <section className="about-sec page-sec" id="think" style={{ scrollMarginTop: "120px" }}>
          <div className="wrap">
            <div className="sec-row rv">
              <div>
                <h2 className="h2">Our thinking</h2>
                <p className="sec-sub">Ideas from the team building it</p>
              </div>
              <Link className="products-all" href="/thinking">
                All articles <span aria-hidden="true">→</span>
              </Link>
            </div>

            <article className="t-feat rv">
              <div className="tf-body">
                <p className="kicker">Featured</p>
                <h3>Tiers, not toggles: a richer language for agent authority</h3>
                <p className="tf-p">
                  On and off is too blunt for agents that book, buy and build. Five tiers give teams a vocabulary for autonomy that grows with trust.
                </p>
                <Link className="more" href="/thinking/agentic-ai-cybersecurity">
                  Read the article{" "}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
              <div className="tf-img" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
                <span style={{ color: "#a5b4fc", fontFamily: "var(--disp)", fontSize: "20px", fontWeight: 700 }}>
                  Agent Authority Tiers
                </span>
              </div>
            </article>

            <div className="t-list">
              <article className="tcard rv">
                <div className="tc-body">
                  <h3>Elevate Enterprise Security with Identity-First Controls</h3>
                  <p className="excerpt">
                    Why modern perimeter defenses fail without continuous identity verification and cryptographically bound device attestation.
                  </p>
                  <Link href="/thinking/identity-first-controls" className="more" style={{ marginTop: "12px", display: "inline-block" }}>
                    Read article →
                  </Link>
                </div>
              </article>

              <article className="tcard rv">
                <div className="tc-body">
                  <h3>Data & AI Security in Regulated Environments</h3>
                  <p className="excerpt">
                    Navigating NIST AI-RMF, ISO 42001, and cross-border sovereignty requirements for enterprise LLM deployments.
                  </p>
                  <Link href="/thinking/data-and-ai-security" className="more" style={{ marginTop: "12px", display: "inline-block" }}>
                    Read article →
                  </Link>
                </div>
              </article>
            </div>

            <div className="about-bottom" style={{ textAlign: "center", marginTop: "48px" }}>
              <Link className="back-pill on-light" href="/">
                <span className="arr" aria-hidden="true">←</span>
                Back to home
              </Link>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Talk to us about sign-in your team will love.</h2>
              <Link className="btn btn-white" href="/contact">
                Book a strategy call <span className="chev" aria-hidden="true">›</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
