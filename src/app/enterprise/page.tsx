import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { createPageMetadata } from "@/lib/seo";
import { HeroBeams } from "@/components/home/HeroBeams";

export const metadata: Metadata = createPageMetadata({
  title: "Enterprise Identity Command | XSignOn",
  description:
    "Enterprise teams run identity across thousands of people, devices, services and AI agents. XSignOn gives those teams one command view.",
  path: "/enterprise",
});

export default function EnterprisePage(): React.JSX.Element {
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
          <h1 className="h-display">Every identity. Fully in control.</h1>
          <div className="pmeta">
            <span className="ptag">Enterprise</span>
            <span className="ptag">Identity command</span>
          </div>
        </div>
      </section>

      <div data-nav="light">
        {/* Command View & Live Dashboard */}
        <section className="page-sec">
          <div className="wrap">
            <div className="body-copy">
              <p>
                <b>
                  Enterprise teams run identity across thousands of people, devices, services and AI
                  agents.
                </b>{" "}
                XSignOn gives those teams one command view: every identity inventoried, every
                sign-in verified, and every access carrying an owner and evidence.
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
              <h2 className="h2">Deployment models</h2>
            </div>
            <div className="steps-grid three">
              <div className="step-card rv">
                <h4>SaaS</h4>
                <p>
                  The platform runs in the cloud, with identity command available from day one and
                  updates handled by XSignOn.
                </p>
              </div>
              <div className="step-card rv">
                <h4>On-premises</h4>
                <p>
                  The platform runs inside your own data centers, under your operational control,
                  with the same continuous posture scoring.
                </p>
              </div>
              <div className="step-card rv">
                <h4>Air-gapped</h4>
                <p>
                  For estates separated from public networks, the platform runs fully on site, as
                  proven in critical infrastructure deployments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Standards Posture */}
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Standards posture</h2>
            </div>
            <div className="chip-row rv" aria-label="Supported security standards">
              <span className="fchip">FIDO2</span>
              <span className="fchip">SOC 2</span>
              <span className="fchip">ISO 27001</span>
              <span className="fchip">HIPAA</span>
              <span className="fchip">NIST AI-RMF</span>
              <span className="fchip">NIST PQC</span>
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
              Evidence for each standard is produced from the work itself: sign-ins, reviews and
              evaluations carry the timestamps and cryptographic proofs auditors require.
            </p>
          </div>
        </section>

        {/* Related */}
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            <Link className="rel-row rv" href="/solutions/enterprise-technology">
              <span className="t">Enterprise Technology</span>
              <span className="d">Solution</span>
            </Link>
            <Link className="rel-row rv" href="/products/xsense">
              <span className="t">XSense</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/proof/case-it">
              <span className="t">Biometric-Only Authentication For A Global IT Enterprise</span>
              <span className="d">Case study</span>
            </Link>
            <Link className="rel-row rv" href="/solutions">
              <span className="t">Back to Solutions</span>
              <span className="d">Solutions</span>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Bring every identity into one view.</h2>
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
