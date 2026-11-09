import type { Metadata } from "next";
import Link from "next/link";
import { getApprovedCaseStudies } from "@/lib/caseStudy";

export const metadata: Metadata = {
  title: "Proof & Case Studies · XSignOn",
  description:
    "Verified case studies attached to the products they prove. Real-world rollouts across banking, healthcare, industrial, and IT enterprises.",
  openGraph: {
    title: "Proof & Case Studies · XSignOn",
    description:
      "Real-world deployments across banking, healthcare, industrial, and enterprise IT.",
    url: "https://xsignon.com/proof",
    type: "website",
  },
  alternates: {
    canonical: "https://xsignon.com/proof",
  },
};

// T-099: Proof hub page listing canonical approved case studies
// Source: xsignon-home-beams.html (lines 2939-3002).
export default async function ProofPage() {
  const caseStudies = await getApprovedCaseStudies();

  return (
    <div id="view-proof">
      {/* Hero section */}
      <section
        className="page-hero bg-[#060129] text-white py-16"
        style={{ backgroundColor: "#060129" }}
        data-nav="dark"
      >
        <div className="wrap mx-auto max-w-[1280px] px-6">
          <nav className="crumbs mb-4 text-sm text-white/60" aria-label="Breadcrumb">
            <Link className="hover:text-white" href="/">
              Home
            </Link>
            <span className="sep mx-2">/</span>
            <Link className="hover:text-white" href="/products">
              Products
            </Link>
            <span className="sep mx-2">/</span>
            <span className="cur text-white font-medium" aria-current="page">
              Proof
            </span>
          </nav>
          <h1 className="h-display text-4xl sm:text-5xl font-semibold">Proof</h1>
        </div>
      </section>

      {/* Main Grid Section */}
      <div data-nav="light" className="bg-white">
        <section className="page-sec py-16">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="body-copy max-w-3xl text-lg text-slate-700 leading-relaxed mb-12">
              <p>
                <b>Case studies live here, attached to the products they prove.</b> Each study names
                the product deployed and the goal it supported. Where outcomes are still being
                sourced, that is marked clearly.
              </p>
            </div>

            <div className="case-grid">
              {caseStudies.map((study) => (
                <article key={study.slug} className="case-card rv">
                  <div className="case-photo">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <div className="pmeta">
                    <span className="ptag">
                      {study.industry}
                      {study.location ? ` · ${study.location}` : ""}
                    </span>
                    {study.deploymentDate && <span className="ptag">{study.deploymentDate}</span>}
                    {study.relatedProducts?.map((p) => (
                      <span key={p.slug} className="ptag">
                        {p.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="h3 text-xl font-semibold text-navy mt-1 mb-3">{study.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                    {study.summary}
                  </p>
                  {study.outcomeStatus && (
                    <span className="status-chip">
                      <b>Sourced outcome:</b> {study.outcomeStatus}
                    </span>
                  )}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <Link
                      className="link-arrow text-navy hover:text-coral inline-flex items-center gap-2 font-semibold text-sm"
                      href={`/proof/${study.slug}`}
                    >
                      Read the case study{" "}
                      <span className="arr" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Estimate Section */}
        <section className="page-sec py-12 border-t border-slate-100 bg-slate-50">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="sec-head mb-4">
              <h2 className="h2 text-2xl font-semibold text-navy">Estimate your own numbers</h2>
            </div>
            <div className="body-copy max-w-2xl text-slate-600 leading-relaxed">
              <p>
                No case study result is shown without a source. To see the time your own team can
                save, the ROI calculator computes an estimate from the numbers you enter.
              </p>
            </div>
            <div className="mt-6">
              <Link
                className="link-arrow text-navy hover:text-coral inline-flex items-center gap-2 font-semibold"
                href="/roi"
              >
                Open the ROI Calculator{" "}
                <span className="arr" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="cta-sec py-16 bg-white border-t border-slate-100">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="cta-panel rv">
              <h2 className="h2 text-2xl sm:text-3xl font-semibold text-white">
                Talk to us about verified rollouts.
              </h2>
              <Link className="btn btn-white" href="/contact">
                Book a strategy call{" "}
                <span className="chev" aria-hidden="true">
                  ›
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
