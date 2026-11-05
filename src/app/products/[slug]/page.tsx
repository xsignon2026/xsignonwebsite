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
import { getAllProductSlugs, getProductBySlug } from "@/lib/product";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
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
              { label: "Products", href: "/#products" },
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
        {/* Narrative & Dashboard Preview */}
        <section className="py-(--section-pad)">
          <Container>
            <div className="max-w-3xl">
              <p className="text-xl md:text-2xl text-gray leading-relaxed font-normal">
                <b className="font-semibold text-txt">{product.name} </b>
                {product.hero.subline}
              </p>
            </div>

            <ProductDashboardPreview dashboard={product.hero.dashboard} />
          </Container>
        </section>

        {/* Capability Cards (Bento) */}
        {product.capabilityCards?.length > 0 && (
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
        {product.framework?.steps?.length > 0 && (
          <section className="py-(--section-pad) border-t border-line/60">
            <Container>
              <div className="mb-10">
                <SectionHeading title={product.framework.title} />
              </div>
              <FrameworkSteps steps={product.framework.steps} />
            </Container>
          </section>
        )}

        {/* Mapped Frameworks */}
        {product.mappedFrameworks?.chips?.length > 0 && (
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

        {/* Related Items */}
        {product.relatedItems?.length > 0 && (
          <section className="py-(--section-pad) border-t border-line/60">
            <Container>
              <div className="mb-8">
                <SectionHeading title="Related" />
              </div>

              <div className="divide-y divide-line border-y border-line">
                {product.relatedItems.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="group flex flex-wrap items-baseline justify-between gap-6 py-5 px-1 transition-colors duration-150 hover:text-acc-ink"
                  >
                    <span className="text-lg font-medium text-txt group-hover:text-acc-ink transition-colors">
                      {item.title}
                    </span>
                    <span className="font-mono text-xs text-gray uppercase tracking-wider shrink-0">
                      {item.typeLabel}
                    </span>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
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
