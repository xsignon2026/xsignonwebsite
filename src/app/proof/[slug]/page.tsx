import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getApprovedCaseStudies, getCaseStudyBySlug } from "@/lib/caseStudy";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = await getApprovedCaseStudies();
  return studies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return { title: "Case Study Not Found · XSignOn" };
  }

  return {
    title: `${caseStudy.title} · Case Study · XSignOn`,
    description: caseStudy.summary,
    openGraph: {
      title: `${caseStudy.title} · XSignOn Proof`,
      description: caseStudy.summary,
      url: `https://xsignon.com/proof/${caseStudy.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://xsignon.com/proof/${caseStudy.slug}`,
    },
  };
}

// T-100: Build the case study template
// Source: xsignon-home-beams.html (lines 3003-3236).
export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div id={`view-case-${caseStudy.slug}`}>
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
            <Link className="hover:text-white" href="/proof">
              Proof
            </Link>
            <span className="sep mx-2">/</span>
            <span className="cur text-white font-medium" aria-current="page">
              {caseStudy.industry}
            </span>
          </nav>
          <h1 className="h-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-tight">
            {caseStudy.title}
          </h1>
          <div className="pmeta flex flex-wrap gap-2">
            <span className="ptag">
              {caseStudy.industry}
              {caseStudy.location ? ` · ${caseStudy.location}` : ""}
            </span>
            {caseStudy.deploymentDate && <span className="ptag">{caseStudy.deploymentDate}</span>}
            {caseStudy.relatedProducts?.map((p) => (
              <span key={p.slug} className="ptag">
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div data-nav="light" className="bg-white">
        {/* Section: Where they started */}
        <section className="page-sec py-14 border-b border-slate-100">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="sec-head mb-4">
              <h2 className="h2 text-2xl font-semibold text-navy">Where they started</h2>
            </div>
            <div className="body-copy max-w-3xl text-slate-700 leading-relaxed space-y-4">
              <p>{caseStudy.challenge}</p>
              {caseStudy.challengeParagraph2 && <p>{caseStudy.challengeParagraph2}</p>}
            </div>
          </div>
        </section>

        {/* Section: What was deployed */}
        <section className="page-sec py-14 border-b border-slate-100">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="sec-head mb-4">
              <h2 className="h2 text-2xl font-semibold text-navy">What was deployed</h2>
            </div>
            <div className="body-copy max-w-3xl text-slate-700 leading-relaxed">
              <p>{caseStudy.approach}</p>
            </div>
            {caseStudy.deployedFeatures && caseStudy.deployedFeatures.length > 0 && (
              <ul className="feat-list rv mt-8 space-y-3 max-w-3xl">
                {caseStudy.deployedFeatures.map((feat) => (
                  <li key={feat.title} className="flex items-start gap-3 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-coral mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-navy">{feat.title}</strong>: {feat.description}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Section: Rollout */}
        {caseStudy.rolloutSteps && caseStudy.rolloutSteps.length > 0 && (
          <section className="page-sec py-14 border-b border-slate-100">
            <div className="wrap mx-auto max-w-[1280px] px-6">
              <div className="sec-head mb-4">
                <h2 className="h2 text-2xl font-semibold text-navy">Rollout</h2>
              </div>
              <div className="steps-grid three">
                {caseStudy.rolloutSteps.map((step) => (
                  <div key={step.stepNumber} className="step-card rv">
                    <span className="how-num">{step.stepNumber}</span>
                    <h4 className="text-lg font-semibold text-navy mb-2">{step.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section: Outcome */}
        <section className="page-sec py-14 border-b border-slate-100">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="sec-head mb-4">
              <h2 className="h2 text-2xl font-semibold text-navy">Outcome</h2>
            </div>
            <div className="body-copy max-w-3xl text-slate-700 leading-relaxed mb-4">
              <p>{caseStudy.outcome}</p>
            </div>
            {caseStudy.outcomeStatus && (
              <div className="status-chip rv">
                <b>Status note:</b> {caseStudy.outcomeStatus}
              </div>
            )}
          </div>
        </section>

        {/* Section: Related */}
        <section className="page-sec py-14 border-b border-slate-100">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="sec-head mb-6">
              <h2 className="h2 text-2xl font-semibold text-navy">Related</h2>
            </div>
            <div className="space-y-2 max-w-3xl">
              {caseStudy.relatedProducts?.map((p) => (
                <Link
                  key={p.slug}
                  className="rel-row rv flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-slate-50 transition"
                  href={`/products/${p.slug}`}
                >
                  <span className="t font-semibold text-navy">{p.name}</span>
                  <span className="d text-sm text-slate-500">Product</span>
                </Link>
              ))}
              {caseStudy.relatedCaseStudies?.map((cs) => (
                <Link
                  key={cs.slug}
                  className="rel-row rv flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-slate-50 transition"
                  href={`/proof/${cs.slug}`}
                >
                  <span className="t font-semibold text-navy">{cs.title}</span>
                  <span className="d text-sm text-slate-500">Case study</span>
                </Link>
              ))}
              <Link
                className="rel-row rv flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-slate-50 transition"
                href="/proof"
              >
                <span className="t font-semibold text-navy">Back to Proof</span>
                <span className="d text-sm text-slate-500">Proof</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Section: CTA */}
        <section className="cta-sec sm py-12 bg-white">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="cta-panel plain rv">
              <h2 className="h2 text-2xl sm:text-3xl font-semibold text-white">
                Run a rollout your branches can trust.
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
