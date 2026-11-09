import type { Metadata } from "next";
import Link from "next/link";
import { HeroBeams } from "@/components/home/HeroBeams";
import { NewsletterSubscribe } from "@/components/thinking/NewsletterSubscribe";

export const metadata: Metadata = {
  title: "Industry Thinking | XSignOn",
  description:
    "Practical thinking for security, governance, and growth across modern enterprise environments.",
};

const industryCards = [
  {
    title: "How to Reduce Shadow AI Risk Before It Spreads",
    desc: "Team-adopted AI, brought into the open and into the inventory, with owners and evidence.",
  },
  {
    title: "Why Passwordless Identity Matters for Mid-Market Teams",
    desc: "Verified sign-in sized for growing teams: keys, guided enrollment, and support that scales.",
  },
  {
    title: "Zero Trust Works Best When It Starts With Identity",
    desc: "Identity-first sequencing for zero trust programs: verify the person and the agent first.",
  },
  {
    title: "How Continuous Compliance Improves Audit Readiness",
    desc: "Evidence gathered as work happens, so reviews open with the record already complete.",
  },
  {
    title: "What NIST AI-RMF Means for Practical AI Oversight",
    desc: "The framework translated into inventories, control maps and reviewer-ready evidence.",
  },
  {
    title: "Access Reviews Should Not Be a Last-Minute Exercise",
    desc: "Review cycles that run all year, with owners and deadlines carried in one flow.",
  },
];

export default function IndustryThinkingPage() {
  return (
    <div id="view-industry" className="res-view">
      {/* Page Hero with Interactive Beams */}
      <section className="page-hero has-beams" data-nav="dark">
        <HeroBeams />
        <div className="page-fade" aria-hidden="true" />
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/thinking">Our thinking</Link>
            <span className="sep">/</span>
            <span className="cur">Industry Thinking</span>
          </nav>
          <h1 className="h-display">Industry Thinking</h1>
          <div className="pmeta">
            <span className="ptag">Practical thinking for security, governance, and growth</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            {/* Featured Insight Card */}
            <article className="bcard rv" style={{ marginBottom: "34px" }}>
              <div className="pmeta">
                <span className="pill-cat">Featured insight</span>
              </div>
              <h3 className="h3" style={{ marginTop: "18px" }}>
                Why AI Governance Is Becoming a Security Priority
              </h3>
              <p>
                AI use is now part of everyday operations, and governance is joining the security
                agenda: inventories, owners, and evidence for every system in production.
              </p>
              <span className="status-chip" style={{ marginTop: "18px" }}>
                <b>Full text pending:</b> this piece is being prepared for publication.
              </span>
            </article>

            {/* Grid of 6 Industry Cards */}
            <div className="case-grid">
              {industryCards.map((item, idx) => (
                <article key={idx} className="case-card rv">
                  <h3 className="h4">{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="status-chip">
                    <b>Full text pending:</b> this piece is being prepared for publication.
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription Band */}
        <section className="page-sec">
          <div className="wrap">
            <NewsletterSubscribe sourcePage="/thinking/industry" />
          </div>
        </section>

        {/* Closing Strategy CTA */}
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Discuss what you are reading.</h2>
              <Link className="btn btn-white" href="/contact">
                Book a strategy call{" "}
                <span className="chev" aria-hidden="true">
                  &#8250;
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
