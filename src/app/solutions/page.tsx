import type { Metadata } from "next";
import Link from "next/link";
import { getAllSolutions } from "@/lib/solution";
import { SolutionDiagram } from "@/components/solutions/SolutionDiagram";
import { HeroBeams } from "@/components/home/HeroBeams";

export const metadata: Metadata = {
  title: "Solutions · XSignOn",
  description:
    "Identity governance, AI governance, quantum-safe security, business process, and enterprise technology for regulated teams.",
  openGraph: {
    title: "Solutions · XSignOn",
    description:
      "Start from the problem you are solving: Identity, AI, Quantum-safe, and Enterprise Access.",
    url: "https://xsignon.com/solutions",
    type: "website",
  },
  alternates: {
    canonical: "https://xsignon.com/solutions",
  },
};

// T-106: Solutions hub page
// Source: xsignon-home-beams.html (lines 3237-3306)
export default async function SolutionsPage() {
  const solutions = await getAllSolutions();

  return (
    <div id="view-solutions">
      {/* Hero section */}
      <section
        className="page-hero has-beams bg-[#060129] text-white py-16 relative overflow-hidden"
        style={{ backgroundColor: "#060129" }}
        data-nav="dark"
      >
        <HeroBeams />
        <div className="page-fade" aria-hidden="true" />
        <div className="wrap mx-auto max-w-[1280px] px-6 relative z-10">
          <nav className="crumbs mb-4 text-sm text-white/60" aria-label="Breadcrumb">
            <Link className="hover:text-white" href="/">
              Home
            </Link>
            <span className="sep mx-2">/</span>
            <span className="cur text-white font-medium" aria-current="page">
              Solutions
            </span>
          </nav>
          <h1 className="h-display text-4xl sm:text-5xl font-semibold">Solutions</h1>
        </div>
      </section>

      <div>
        {/* Section: Solutions List (Full-Page Ombre Gradient) */}
        <section className="page-sec py-16" id="solList" data-nav="dark">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="sec-row mb-12">
              <div>
                <h2 className="h2 text-3xl font-semibold text-[#F6F4FB] mb-2">Solutions</h2>
                <p className="sec-sub text-lg text-[#B3AED0]">
                  Start from the problem you are solving
                </p>
              </div>
            </div>

            <div className="sol-grid">
              {solutions.map((sol) => (
                <article key={sol.slug} className="sol-card" data-sol={sol.slug}>
                  <div className="sol-art">
                    <SolutionDiagram diagramKey={sol.diagramKey} />
                  </div>
                  <div className="sol-body">
                    <h3>{sol.title}</h3>
                    <p>{sol.summary}</p>
                    <Link className="link-arrow" href={`/solutions/${sol.slug}`}>
                      View solution <span className="arr" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Enterprise and Insights */}
        <section className="page-sec py-16" id="solMore" data-nav="light">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="sec-row mb-8">
              <h2 className="h2 text-3xl font-semibold text-slate-900">
                Enterprise and insights
              </h2>
            </div>

            {/* Enterprise Band */}
            <div className="ent-band mb-16">
              <div className="eb-top">
                <div className="eb-copy">
                  <h3>Enterprise</h3>
                  <p>
                    Every identity, fully in control: identity command, three deployment
                    models, and a standards posture for enterprise estates.
                  </p>
                  <Link
                    className="btn btn-white inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-navy font-semibold hover:bg-slate-100 transition-colors"
                    href="/enterprise"
                  >
                    View the Enterprise page <span className="chev" aria-hidden="true">›</span>
                  </Link>
                </div>

                <div className="eb-models">
                  <div className="eb-m">
                    <span className="ic">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 9.5a4.2 4.2 0 0 1 0 8.5z" />
                      </svg>
                    </span>
                    <b>SaaS</b>
                    <p>Runs in the cloud, with identity command from day one.</p>
                  </div>

                  <div className="eb-m">
                    <span className="ic">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M6 21V4h12v17M4 21h16M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
                      </svg>
                    </span>
                    <b>On-premises</b>
                    <p>Runs in your own data centers, under your control.</p>
                  </div>

                  <div className="eb-m">
                    <span className="ic">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="5" y="11" width="14" height="9" rx="2" />
                        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      </svg>
                    </span>
                    <b>Air-gapped</b>
                    <p>Runs fully on site, apart from public networks.</p>
                  </div>
                </div>
              </div>

              {/* Standards Posture */}
              <div className="eb-std">
                <span className="eb-lbl">Standards posture</span>
                <span>FIDO2</span>
                <span>SOC 2</span>
                <span>ISO 27001</span>
                <span>HIPAA</span>
                <span>GDPR</span>
                <span>PCI DSS</span>
                <span>NIST AI RMF</span>
                <span>NIST 800-207</span>
                <span>NIST PQC</span>
              </div>
            </div>

            {/* Our Thinking section link */}
            <div className="sec-row sol-think-head flex items-center justify-between mb-8">
              <h3 className="h3 text-2xl font-semibold text-slate-900">Our thinking</h3>
              <Link
                className="products-all inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-navy"
                href="/thinking"
              >
                All articles <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-slate-400 transition-colors">
                <span className="text-xs font-sans font-medium uppercase tracking-[0.14em] text-slate-500">Identity & Risk</span>
                <h4 className="text-xl font-semibold text-navy mt-2 mb-2">
                  Non-Human Identities, and the Future of Cyber Risk
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Why machine identities, service accounts, and AI agents require continuous
                  posture scoring and cryptographic attribution.
                </p>
                <Link
                  className="text-sm font-semibold text-navy hover:text-coral inline-flex items-center gap-1"
                  href="/thinking/non-human-identities"
                >
                  Read article <span aria-hidden="true">→</span>
                </Link>
              </article>

              <article className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-slate-400 transition-colors">
                <span className="text-xs font-sans font-medium uppercase tracking-[0.14em] text-slate-500">Data & AI Governance</span>
                <h4 className="text-xl font-semibold text-navy mt-2 mb-2">
                  Data + AI Security Built for Visibility, Control, and Trust
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Navigating the EU AI Act and NIST AI RMF with audit-ready model inventories and
                  governed access checkpoints.
                </p>
                <Link
                  className="text-sm font-semibold text-navy hover:text-coral inline-flex items-center gap-1"
                  href="/thinking/data-ai-security"
                >
                  Read article <span aria-hidden="true">→</span>
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="cta-sec sm bg-white py-16 border-t border-slate-100" data-nav="light">
          <div className="wrap mx-auto max-w-[1280px] px-6 text-center">
            <div className="cta-panel plain bg-navy text-white rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="h2 text-3xl font-semibold mb-6">
                Which solution fits your goals?
              </h2>
              <Link
                className="btn btn-white inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-navy font-semibold hover:bg-slate-100 transition-colors"
                href="/contact"
              >
                Book a strategy call <span className="chev" aria-hidden="true">›</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
