import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { RoiCalculatorClient } from "@/components/roi/RoiCalculatorClient";

export const metadata: Metadata = createPageMetadata({
  title: "ROI Calculator | XSignOn",
  description:
    "Estimate the annual time and cost your team can save with verified passwordless sign-in and reduced help desk password resets.",
  path: "/roi-calculator",
});

export default function RoiCalculatorPage() {
  return (
    <div id="view-roi">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <span className="cur">ROI Calculator</span>
          </nav>
          <h1 className="h-display">ROI Calculator</h1>
        </div>
      </section>

      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="body-copy" style={{ marginBottom: "40px" }}>
              <p>
                <b>
                  This calculator estimates the time your team can save with verified sign-in, from the numbers you enter.
                </b>{" "}
                Every result is computed live from your inputs and labeled as an estimate. Published figures from XSignOn deployments are being sourced and will be added with their sources.
              </p>
            </div>
            <RoiCalculatorClient />
          </div>
        </section>

        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            <Link className="rel-row rv" href="/products/keys">
              <span className="t">Passwordless Keys</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/proof">
              <span className="t">All case studies in Proof</span>
              <span className="d">Proof</span>
            </Link>
            <Link
              className="rel-row rv"
              href="/thinking/identity-first-controls"
            >
              <span className="t">Elevate Enterprise Security with Identity-First Controls</span>
              <span className="d">Insight</span>
            </Link>
          </div>
        </section>

        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Bring us your estimate. We will bring a plan.</h2>
              <Link className="btn btn-white" href="/contact">
                Book a strategy call <span className="chev" aria-hidden="true">&#8250;</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
