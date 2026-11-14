import Link from "next/link";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function SolEnterpriseView() {
  return (
    <div id="view-sol-enterprise" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/solutions">Solutions</Link>
            <span className="sep">/</span>
            <span className="cur">Enterprise Technology</span>
          </nav>
          <h1 className="h-display">Enterprise Technology</h1>
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
                Identity sits across every system you run: directories, SaaS, branch terminals,
                plant systems. Teams want the platforms they already have working as one governed
                layer, with clear ownership for every connection.
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
                  <b>Connect the platforms you have</b> into one governed sign-in and access layer,
                  through standard protocols.
                </span>
              </li>
              <li>
                <span>
                  <b>Verified sign-in</b> with FIDO2 keys that work with your existing identity
                  provider.
                </span>
              </li>
              <li>
                <span>
                  <b>One posture view</b> across the connected systems, instead of one console per
                  platform.
                </span>
              </li>
              <li>
                <span>
                  <b>Key fleet management</b> through AMS, so hardware stays fully supported by
                  XSignOn.
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
            <Link className="rel-row rv" href="/products/postureone">
              <span className="t">PostureOne</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/products/passwordless-keys">
              <span className="t">Passwordless Keys</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/products/ams">
              <span className="t">AMS</span>
              <span className="d">Product</span>
            </Link>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Proof and reading</h2>
            </div>
            <Link className="rel-row rv" href="/proof/securing-bank-access-fido2">
              <span className="t">Securing Bank Access With FIDO2 Biometric Keys</span>
              <span className="d">Case study</span>
            </Link>
            <Link className="rel-row rv" href="/thinking/identity-first-controls">
              <span className="t">Elevate Enterprise Security with Identity-First Controls</span>
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
              <h2 className="h2">Make your systems work as one layer.</h2>
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
