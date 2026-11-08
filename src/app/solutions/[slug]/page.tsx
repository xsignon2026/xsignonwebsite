import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSolutions, getSolutionBySlug } from "@/lib/solution";
import { JsonLd } from "@/components/common/JsonLd";
import { createServiceSchema, createBreadcrumbSchema } from "@/lib/schema-org";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const solutions = await getAllSolutions();
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);

  if (!solution) {
    return { title: "Solution Not Found · XSignOn" };
  }

  return {
    title: `${solution.title} · Solution · XSignOn`,
    description: solution.summary,
    openGraph: {
      title: `${solution.title} · XSignOn Solution`,
      description: solution.summary,
      url: `https://xsignon.com/solutions/${solution.slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://xsignon.com/solutions/${solution.slug}`,
    },
  };
}

// T-107: Generic Solution Detail Page Template
// T-108: Identity Governance
// T-109: AI and Digital Governance
// T-110: Quantum-Safe Security
// Source: xsignon-home-beams.html (lines 3307-3567)
export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const serviceSchema = createServiceSchema({
    title: solution.title,
    summary: solution.summary,
    slug: solution.slug,
  });

  const breadcrumbsSchema = createBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/solutions" },
    { name: solution.title, url: `/solutions/${solution.slug}` },
  ]);

  return (
    <div id={`view-sol-${solution.slug}`} className="res-view">
      {/* Schema.org Service & Breadcrumbs */}
      <JsonLd schema={[serviceSchema, breadcrumbsSchema]} />

      {/* Hero section */}
      <section
        className="page-hero has-beams bg-[#060129] text-white py-16"
        style={{ backgroundColor: "#060129" }}
        data-nav="dark"
      >
        <div className="wrap mx-auto max-w-[1280px] px-6">
          <nav className="crumbs mb-4 text-sm text-white/60" aria-label="Breadcrumb">
            <Link className="hover:text-white" href="/">
              Home
            </Link>
            <span className="sep mx-2">/</span>
            <Link className="hover:text-white" href="/solutions">
              Solutions
            </Link>
            <span className="sep mx-2">/</span>
            <span className="cur text-white font-medium" aria-current="page">
              {solution.title}
            </span>
          </nav>
          <h1 className="h-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-tight">
            {solution.title}
          </h1>
        </div>
      </section>

      {/* Main Content Sections */}
      <div data-nav="light" className="bg-white">
        {/* Section 1: What teams come to XSignOn to achieve */}
        <section className="page-sec py-14 border-b border-slate-100">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="sec-head mb-6">
              <h2 className="h2 text-2xl font-semibold text-navy">
                What teams come to XSignOn to achieve
              </h2>
            </div>
            <div className="body-copy max-w-3xl text-lg text-slate-700 leading-relaxed">
              <p>{solution.challenge}</p>
            </div>
          </div>
        </section>

        {/* Section 2: How XSignOn supports it */}
        <section className="page-sec py-14 border-b border-slate-100">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="sec-head mb-6">
              <h2 className="h2 text-2xl font-semibold text-navy">
                How XSignOn supports it
              </h2>
            </div>
            <ul className="feat-list">
              {solution.features.map((feat) => (
                <li key={feat.lead}>
                  <span>
                    <b>{feat.lead}</b> {feat.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 3: Products that deliver it */}
        <section className="page-sec py-14 border-b border-slate-100">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="sec-head mb-6">
              <h2 className="h2 text-2xl font-semibold text-navy">
                Products that deliver it
              </h2>
            </div>
            <div className="max-w-3xl">
              {solution.products.map((p) => (
                <Link key={p.slug} className="rel-row" href={p.href}>
                  <span className="t">{p.title}</span>
                  <span className="d">{p.type}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Proof and reading */}
        <section className="page-sec py-14 border-b border-slate-100">
          <div className="wrap mx-auto max-w-[1280px] px-6">
            <div className="sec-head mb-6">
              <h2 className="h2 text-2xl font-semibold text-navy">
                Proof and reading
              </h2>
            </div>
            <div className="max-w-3xl">
              {solution.proofAndReading.map((r) => (
                <Link key={r.slug} className="rel-row" href={r.href}>
                  <span className="t">{r.title}</span>
                  <span className="d">{r.type}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: High-Converting CTA */}
        <section className="cta-sec sm py-16 bg-white" data-nav="light">
          <div className="wrap mx-auto max-w-[1280px] px-6 text-center">
            <div className="cta-panel plain bg-navy text-white rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="h2 text-3xl font-semibold mb-6">
                {solution.ctaHeadline}
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
