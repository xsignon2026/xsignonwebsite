import Link from "next/link";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function SolAiView() {
  return (
    <div id="view-sol-ai" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/solutions">Solutions</Link>
            <span className="sep">/</span>
            <span className="cur">AI and Digital Governance</span>
          </nav>
          <h1 className="h-display">AI and Digital Governance</h1>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">What teams come to XSignOn to achieve</h2>
            </div>
            <div className="body-copy">
              <p>
                Teams are bringing AI into production and want clear, ready evidence of how each
                system is governed: who owns it, what data it touches, and which frameworks it was
                assessed against. XSignOn keeps that evidence current and ready to share with
                confidence.
              </p>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">How XSignOn supports it</h2>
            </div>
            <ul className="feat-list rv">
              <li>
                <span>
                  <b>AI use inventoried with owners</b>, including the deployments that never went
                  through procurement.
                </span>
              </li>
              <li>
                <span>
                  <b>Evaluations mapped to frameworks</b> like NIST AI-RMF, so assessments start
                  from a complete map.
                </span>
              </li>
              <li>
                <span>
                  <b>Agent access governed</b> like any other access: inventoried, owned, and
                  reviewed on a cycle.
                </span>
              </li>
              <li>
                <span>
                  <b>Evidence that stays current</b> as AI use changes, with evidence current at
                  every step.
                </span>
              </li>
            </ul>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Products that deliver it</h2>
            </div>
            <Link className="rel-row rv" href="/products/evalone">
              <span className="t">EvalOne</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/products/postureone">
              <span className="t">PostureOne</span>
              <span className="d">Product</span>
            </Link>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Proof and reading</h2>
            </div>
            <Link className="rel-row rv" href="/proof">
              <span className="t">All case studies in Proof</span>
              <span className="d">Proof</span>
            </Link>
            <Link className="rel-row rv" href="/thinking/data-and-ai-security">
              <span className="t">Data + AI Security Built for Visibility, Control, and Trust</span>
              <span className="d">Insight</span>
            </Link>
            <Link className="rel-row rv" href="/solutions">
              <span className="t">Back to Solutions</span>
              <span className="d">Solutions</span>
            </Link>
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Keep AI evidence ready, with confidence.</h2>
              <Link className="btn btn-white" href="/contact">
                Book a strategy call{" "}
                <span className="chev" aria-hidden="true">
                  &#8250;
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
