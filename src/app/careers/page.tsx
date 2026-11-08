import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { createPageMetadata } from "@/lib/seo";
import { generateJobPostingJsonLd, getActiveJobs } from "@/lib/job";
import { JsonLd } from "@/components/common/JsonLd";
import { createBreadcrumbSchema } from "@/lib/schema-org";

export const metadata: Metadata = createPageMetadata({
  title: "Careers at XSignOn | Build Sign-in People Trust",
  description:
    "Join XSignOn in McKinney, Texas or remotely. We are building the future of enterprise passwordless identity and AI governance.",
  path: "/careers",
});

export default function CareersPage(): React.JSX.Element {
  const jobs = getActiveJobs();

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Careers", url: "/careers" },
  ]);

  const jobSchemas = jobs.map((job) => generateJobPostingJsonLd(job));

  return (
    <div id="view-careers">
      {/* Google Jobs Schema.org JSON-LD & Breadcrumbs */}
      <JsonLd schema={[...jobSchemas, breadcrumbSchema]} />

      {/* Hero */}
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/about">About</Link>
            <span className="sep">/</span>
            <span className="cur">Careers</span>
          </nav>
          <h1 className="h-display">Careers</h1>
        </div>
      </section>

      <div data-nav="light">
        {/* Working Here Values */}
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Working here</h2>
            </div>
            <div className="steps-grid three">
              <div className="step-card rv">
                <h4>Evidence over assertion</h4>
                <p>
                  We work the way our products work: claims point at evidence, and owners are named. It applies to posture reviews and to how we run the company.
                </p>
              </div>
              <div className="step-card rv">
                <h4>The secure way is the easy way</h4>
                <p>
                  Security work that slows teams down is unfinished design. We hold our own tools to the standard we sell.
                </p>
              </div>
              <div className="step-card rv">
                <h4>Small team, real responsibility</h4>
                <p>
                  XSignOn is an early team in McKinney, Texas. The work touches products customers trust for every sign-in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Open roles</h2>
            </div>
            <div className="case-grid">
              {jobs.map((job) => (
                <article key={job.id} className="case-card rv">
                  <div className="pmeta">
                    <span
                      className="ptag"
                      style={{ borderColor: "var(--line)", color: "var(--gray)" }}
                    >
                      {job.locationType === "hybrid"
                        ? `Hybrid · ${job.location}`
                        : job.location}
                    </span>
                  </div>
                  <h3 className="h3">{job.title}</h3>
                  <p>{job.description}</p>
                  <Link
                    className="link-arrow"
                    href="/contact?reason=Careers"
                  >
                    Apply through Contact
                    <span className="sr-only"> for {job.title}</span>{" "}
                    <span className="arr" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </article>
              ))}
            </div>

            {/* General Applications */}
            <div className="role-state rv" style={{ marginTop: "36px" }}>
              <h3 className="h3">General applications</h3>
              <p>
                For roles beyond the two listed here, send your background through Contact and choose &ldquo;Careers&rdquo; as the reason.
              </p>
              <Link className="btn btn-navy" href="/contact?reason=Careers">
                Contact us about careers
              </Link>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Want to build sign-in people trust?</h2>
              <Link className="btn btn-white" href="/contact?reason=Careers">
                Get in touch <span className="chev" aria-hidden="true">›</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
