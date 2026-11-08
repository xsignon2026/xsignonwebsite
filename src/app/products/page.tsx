import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { createPageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { CtaSection } from "@/components/blocks/CtaSection";
import { ProductOverviewInteractive } from "@/components/products/ProductOverviewInteractive";
import { HeroBeams } from "@/components/home/HeroBeams";

export const metadata: Metadata = createPageMetadata({
  title: "Our Products | XSignOn",
  description:
    "Explore XSignOn's zero-trust products: PostureOne, Passwordless Keys, EvalOne, XSense, and AMS.",
  path: "/products",
});

const FEATURED_ARTICLES = [
  {
    title: "Elevate Enterprise Security with Identity-First Controls",
    category: "Insight",
    href: "/resources/thinking#article-identity-first",
  },
  {
    title: "Data + AI Security Built for Visibility, Control, and Trust",
    category: "Insight",
    href: "/resources/thinking#article-data-ai",
  },
  {
    title: "Modern Micro-Segmentation for Zero Trust Security",
    category: "Insight",
    href: "/resources/thinking#article-microseg",
  },
  {
    title: "Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework",
    category: "Insight",
    href: "/resources/thinking#article-agentic",
  },
  {
    title: "Non-Human Identities, and the Future of Cyber Risk",
    category: "Insight",
    href: "/resources/thinking#article-nonhuman",
  },
];

// S-14 / T-082: Products Overview Hub.
export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      {/* 1. Page Hero: Dark violet base with canvas styling */}
      <section
        data-nav="dark"
        className="bg-d1 pt-32 pb-16 md:pt-40 md:pb-20 text-white border-b border-d-line has-beams relative overflow-hidden"
      >
        <HeroBeams />
        <div className="page-fade" aria-hidden="true" />
        <Container className="relative z-10">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Products" }]}
            onDark={true}
            className="mb-6"
          />

          <h1 className="text-display font-bold tracking-tight text-white leading-tight">
            Our products
          </h1>
        </Container>
      </section>

      {/* 2. Interactive Comparison Table & Tabbed Platform Sections */}
      <div data-nav="light" className="bg-paper text-txt">
        <ProductOverviewInteractive />

        {/* 3. Our Thinking Carousel / Grid */}
        <section id="prodThinking" className="border-t border-line/60 py-(--section-pad)">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <h2 className="text-display-sm font-bold text-txt">Our thinking</h2>
              <Link
                href="/resources/thinking"
                className="group inline-flex items-center gap-2 text-base font-semibold text-acc-ink hover:underline underline-offset-4"
              >
                <span>All articles</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURED_ARTICLES.slice(0, 3).map((art, idx) => (
                <Link
                  key={idx}
                  href={art.href}
                  className="group flex flex-col justify-between rounded-2xl border border-line bg-card p-6 shadow-xs transition-colors hover:border-ctl"
                >
                  <div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-acc-ink">
                      {art.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-txt group-hover:text-acc-ink transition-colors leading-snug">
                      {art.title}
                    </h3>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-acc-ink">
                    <span>Read article</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* 4. Bottom CTA Panel */}
        <CtaSection
          title="Talk to us about sign-in your team will love."
          subtitle="Speak with our security architects to evaluate your infrastructure and design a roadmap."
          buttonText="Book a strategy call"
          buttonHref="/contact"
        />
      </div>
    </div>
  );
}
