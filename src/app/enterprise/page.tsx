import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { createPageMetadata } from "@/lib/seo";
import { HeroBeams } from "@/components/home/HeroBeams";
import { getEnterprisePageContent } from "@/lib/last-pages";

export const metadata: Metadata = createPageMetadata({
  title: "Enterprise Identity Command | XSignOn",
  description:
    "Enterprise teams run identity across thousands of people, devices, services and AI agents. XSignOn gives those teams one command view.",
  path: "/enterprise",
});

export default async function EnterprisePage(): Promise<React.JSX.Element> {
  const content = await getEnterprisePageContent();
  return (
    <div id="view-enterprise" className="res-view">
      {/* Hero */}
      <section className="page-hero has-beams" data-nav="dark">
        <HeroBeams />
        <div className="page-fade" aria-hidden="true" />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/solutions">Solutions</Link>
            <span className="sep">/</span>
            <span className="cur">Enterprise</span>
          </nav>
          <h1 className="h-display">{content.hero.title}</h1>
          <div className="pmeta">
            {content.hero.tags.map((tag) => (
              <span className="ptag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div data-nav="light">
        {/* Command View & Live Dashboard */}
        <section className="page-sec">
          <div className="wrap">
            <div className="body-copy">
              <p>
                <b>{content.intro.bold}</b> {content.intro.text}
              </p>
            </div>

            <div
              className="dash rv"
              aria-label="Enterprise identity command dashboard preview"
              style={{ marginTop: "44px" }}
            >
              <div className="dash-bar">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="dash-url">command.xsignon.app</span>
              </div>
              <div className="dash-body">
                <aside className="dash-side" aria-label="Dashboard navigation">
                  <span className="act">Command</span>
                  <span>Identities</span>
                  <span>Policies</span>
                  <span>Evidence</span>
                  <span>Reports</span>
                </aside>
                <div className="dash-main">
                  <div className="dash-row1">
                    <div>
                      <div className="dash-label">Identity command</div>
                      <div className="dash-score">Live</div>
                    </div>
                    <span className="chip ok">All regions reporting</span>
                  </div>
                  <div className="dash-bars">
                    <div className="dbar">
                      <span>Identities with owners</span>
                      <span className="track">
                        <span className="fill g" style={{ display: "block", width: "94%" }} />
                      </span>
                      <b>94%</b>
                    </div>
                    <div className="dbar">
                      <span>Verified sign-in coverage</span>
                      <span className="track">
                        <span className="fill" style={{ display: "block", width: "86%" }} />
                      </span>
                      <b>86%</b>
                    </div>
                    <div className="dbar">
                      <span>Policies current</span>
                      <span className="track">
                        <span className="fill g" style={{ display: "block", width: "90%" }} />
                      </span>
                      <b>90%</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment Models */}
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">{content.deployment.title}</h2>
            </div>
            <div className="steps-grid three">
              {content.deployment.models.map((model) => (
                <div className="step-card rv" key={model.title}>
                  <h4>{model.title}</h4>
                  <p>{model.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standards Posture */}
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">{content.standards.title}</h2>
            </div>
            <div className="chip-row rv" aria-label="Supported security standards">
              {content.standards.chips.map((chip) => (
                <span className="fchip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
            <p
              className="lede rv"
              style={{
                marginTop: "22px",
                maxWidth: "760px",
                color: "var(--gray)",
                fontSize: "16px",
                lineHeight: 1.65,
              }}
            >
              {content.standards.text}
            </p>
          </div>
        </section>

        {/* Related */}
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            {content.related.map((row) => (
              <Link className="rel-row rv" href={row.href} key={row.href}>
                <span className="t">{row.title}</span>
                <span className="d">{row.type}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">{content.cta.title}</h2>
              <Link className="btn btn-white" href={content.cta.button.href}>
                {content.cta.button.label}{" "}
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
