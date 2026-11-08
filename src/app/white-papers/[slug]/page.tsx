import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { WhitePaperDownloadForm } from "@/components/forms/WhitePaperDownloadForm";
import { FALLBACK_WHITE_PAPERS, getWhitePaperBySlug } from "@/lib/white-paper";

type WhitePaperPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(FALLBACK_WHITE_PAPERS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WhitePaperPageProps): Promise<Metadata> {
  const { slug } = await params;
  const whitePaper = await getWhitePaperBySlug(slug);
  if (!whitePaper) return {};

  return {
    title: whitePaper.seo?.title || `${whitePaper.title} | XSignOn`,
    description: whitePaper.seo?.description || whitePaper.summary,
  };
}

export default async function WhitePaperPage({ params }: WhitePaperPageProps) {
  const { slug } = await params;
  const whitePaper = await getWhitePaperBySlug(slug);

  if (!whitePaper) {
    notFound();
  }

  const formattedDate = new Date(whitePaper.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

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
              { label: "Resources", href: "/thinking" },
              { label: whitePaper.title },
            ]}
            onDark={true}
            className="mb-6"
          />

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-sans font-semibold uppercase tracking-[0.14em] text-white mb-5">
            <span>Technical White Paper</span>
            <span aria-hidden="true">&bull;</span>
            <span>Version {whitePaper.version}</span>
          </div>

          <h1 className="text-display font-bold tracking-tight text-white leading-tight max-w-4xl">
            {whitePaper.title}
          </h1>

          <p className="mt-5 text-xl leading-relaxed text-[#b4bfd3] max-w-2xl">
            {whitePaper.summary}
          </p>
        </Container>
      </section>

      {/* 2. Content & Gated Download Form */}
      <div data-nav="light" className="bg-paper text-txt py-(--section-pad)">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] items-start">
            {/* Main Narrative Column */}
            <div className="space-y-10">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-txt">
                  Executive Summary
                </h2>
                <p className="text-body text-gray leading-relaxed">
                  Enterprise security models are undergoing a fundamental transformation. As identity architectures extend beyond human operators to autonomous agents and non-human identities, perimeter-based verification is insufficient. This document provides senior security architects and CISOs with a concrete implementation blueprint.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-txt">
                  Key Architecture Topics Covered
                </h2>
                <ul className="space-y-3 text-body text-gray">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft text-txt font-semibold text-xs mt-0.5">
                      1
                    </span>
                    <span>
                      <strong className="text-txt font-semibold">Continuous Posture Evaluation:</strong> Moving from one-time authentication gates to continuous cryptographic device integrity signals.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft text-txt font-semibold text-xs mt-0.5">
                      2
                    </span>
                    <span>
                      <strong className="text-txt font-semibold">Phishing-Resistant FIDO2 Workflows:</strong> Binding public-key credentials to platform TPM hardware chips to eliminate credential relay attacks.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft text-txt font-semibold text-xs mt-0.5">
                      3
                    </span>
                    <span>
                      <strong className="text-txt font-semibold">Audit Evidence Automation:</strong> Structured NDJSON telemetry generation for real-time compliance validation under FedRAMP, SOC 2, and ISO 27001.
                    </span>
                  </li>
                </ul>
              </section>

              <section className="rounded-2xl border border-line bg-card p-6 md:p-8 space-y-4">
                <h3 className="text-lg font-bold tracking-tight text-txt">
                  Document Specifications
                </h3>
                <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                  <div>
                    <dt className="text-gray font-medium">Format</dt>
                    <dd className="mt-1 font-semibold text-txt">Digital PDF</dd>
                  </div>
                  <div>
                    <dt className="text-gray font-medium">Version</dt>
                    <dd className="mt-1 font-semibold text-txt">v{whitePaper.version}</dd>
                  </div>
                  <div>
                    <dt className="text-gray font-medium">Published</dt>
                    <dd className="mt-1 font-semibold text-txt">{formattedDate}</dd>
                  </div>
                  <div>
                    <dt className="text-gray font-medium">Access Tier</dt>
                    <dd className="mt-1 font-semibold text-txt">Gated (Verified)</dd>
                  </div>
                </dl>
              </section>
            </div>

            {/* Sticky Download Sidebar */}
            <div className="lg:sticky lg:top-28">
              <WhitePaperDownloadForm
                slug={whitePaper.slug}
                title={whitePaper.title}
              />
            </div>
          </div>
        </Container>
      </div>
    </article>
  );
}
