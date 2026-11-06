import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CtaSection } from "@/components/blocks/CtaSection";
import { CapabilityGrid } from "@/components/products/CapabilityGrid";
import { FrameworkSteps } from "@/components/products/FrameworkSteps";
import { ProductDashboardPreview } from "@/components/products/ProductDashboardPreview";
import { ProductChecklistPanel } from "@/components/products/ProductChecklistPanel";
import { ProductSnapshotPanel } from "@/components/products/ProductSnapshotPanel";
import { ProductCaseCards } from "@/components/products/ProductCaseCards";
import { ProductKeyViz } from "@/components/products/ProductKeyViz";
import { ProductDocTabs } from "@/components/products/ProductDocTabs";
import { FrameworkTable } from "@/components/products/FrameworkTable";
import { RelatedItems } from "@/components/products/RelatedItems";
import { getAllProductSlugs, getProductBySlug } from "@/lib/product";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

// Strict slug regex whitelist for SSRF/injection protection
const PRODUCT_SLUG_REGEX = /^[a-z0-9-]+$/;

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!PRODUCT_SLUG_REGEX.test(slug)) return {};
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.seo?.title || `${product.name} | XSignOn`,
    description: product.seo?.description || product.tagline,
    alternates: product.seo?.canonical
      ? { canonical: product.seo.canonical }
      : undefined,
    robots: product.seo?.noIndex
      ? { index: false, follow: false }
      : undefined,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  if (!PRODUCT_SLUG_REGEX.test(slug)) {
    notFound();
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <article className="min-h-screen">
      {/* 1. Page Hero: dark violet base */}
      <section
        data-nav="dark"
        className="bg-d1 pt-32 pb-16 md:pt-40 md:pb-20 text-white border-b border-d-line"
      >
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.name },
            ]}
            onDark={true}
            className="mb-6"
          />

          <h1 className="text-display font-bold tracking-tight text-white leading-tight">
            {product.name}
          </h1>

          {product.hero.tags?.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {product.hero.tags.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs tracking-wider uppercase text-on-dark-soft border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* 2. Light sections body */}
      <div data-nav="light" className="bg-paper text-txt">
        {/* Narrative & Metrics */}
        <section className="py-(--section-pad)">
          <Container>
            <div className="max-w-3xl">
              <p className="text-xl md:text-2xl text-gray leading-relaxed font-normal">
                <b className="font-semibold text-txt">{product.name} </b>
                {product.hero.subline}
              </p>

              {product.extraNarrative?.map((paragraph, idx) => (
                <p key={idx} className="mt-4 text-lg text-gray leading-relaxed font-normal">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* PostureOne Dashboard Preview */}
            {product.hero.dashboard && (
              <ProductDashboardPreview dashboard={product.hero.dashboard} />
            )}

            {/* EvalOne Checklist Panel */}
            {product.checklist && (
              <ProductChecklistPanel checklist={product.checklist} />
            )}

            {/* AMS Lifecycle Snapshot Panel */}
            {product.snapshot && (
              <ProductSnapshotPanel snapshot={product.snapshot} />
            )}

            {/* XSense Visual Badge */}
            {product.keyViz && (
              <ProductKeyViz keyViz={product.keyViz} />
            )}

            {/* Passwordless Keys Case Cards */}
            {product.caseCards && (
              <ProductCaseCards cards={product.caseCards} />
            )}
          </Container>
        </section>

        {/* Capability Cards (Bento) */}
        {product.capabilityCards && product.capabilityCards.length > 0 && (
          <section className="py-(--section-pad) border-t border-line/60">
            <Container>
              <div className="mb-10">
                <SectionHeading title={`What ${product.name} covers`} />
              </div>
              <CapabilityGrid cards={product.capabilityCards} />
            </Container>
          </section>
        )}

        {/* Framework Steps */}
        {product.framework?.steps && product.framework.steps.length > 0 && (
          <section className="py-(--section-pad) border-t border-line/60">
            <Container>
              <div className="mb-10">
                <SectionHeading title={product.framework.title} />
              </div>
              <FrameworkSteps steps={product.framework.steps} />
            </Container>
          </section>
        )}

        {/* Specification & Evaluation Tables (EvalOne, Passwordless Keys) */}
        {product.specTable && (
          <FrameworkTable table={product.specTable} />
        )}

        {/* Documentation Tablist (XSense, AMS) */}
        {product.docTabs && (
          <ProductDocTabs
            tabs={product.docTabs}
            title="Documentation"
            ariaLabel={`${product.name} documentation`}
          />
        )}

        {/* Works with Section (Passwordless Keys) */}
        {product.worksWith && (
          <section className="py-(--section-pad) border-t border-line/60">
            <Container>
              <div className="mb-6">
                <SectionHeading title={product.worksWith.title} />
              </div>
              <div className="max-w-3xl space-y-4 text-base md:text-lg text-gray leading-relaxed">
                {product.worksWith.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {product.worksWith.linkHref && product.worksWith.linkText && (
                <div className="mt-7">
                  <Link
                    href={product.worksWith.linkHref}
                    className="group inline-flex items-center gap-2 text-base font-semibold text-acc-ink hover:underline underline-offset-4"
                  >
                    <span>{product.worksWith.linkText}</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              )}
            </Container>
          </section>
        )}

        {/* Mapped Regulatory Frameworks */}
        {product.mappedFrameworks?.chips && product.mappedFrameworks.chips.length > 0 && (
          <section className="py-(--section-pad) border-t border-line/60">
            <Container>
              <div className="mb-8">
                <SectionHeading title="Frameworks it maps to" />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {product.mappedFrameworks.chips.map((chip, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-line bg-card px-4 py-1.5 font-mono text-xs font-medium text-gray shadow-xs"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {product.mappedFrameworks.note && (
                <p className="mt-6 max-w-2xl text-body text-gray leading-relaxed">
                  {product.mappedFrameworks.note}
                </p>
              )}
            </Container>
          </section>
        )}

        {/* Reusable Related Items */}
        {product.relatedItems && (
          <RelatedItems items={product.relatedItems} />
        )}

        {/* Bottom CTA Panel */}
        <CtaSection
          title={product.cta?.title || "See your posture in one view."}
          subtitle="Speak with our security architects to evaluate your infrastructure and design a roadmap."
          buttonText={product.cta?.buttonText || "Book a strategy call"}
          buttonHref={product.cta?.buttonHref || "/contact"}
        />
      </div>
    </article>
  );
}
