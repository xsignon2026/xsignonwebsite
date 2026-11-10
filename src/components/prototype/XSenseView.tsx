import Link from "next/link";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function XSenseView() {
  return (
    <div id="view-xsense">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <span className="cur">XSense</span>
          </nav>
          <h1 className="h-display">XSense</h1>
          <div className="pmeta">
            <span className="ptag">Identity analytics</span>
            <span className="ptag">MFA platform</span>
            <span className="ptag">Identity provider</span>
          </div>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="body-copy">
              <p>
                <b>XSense is the identity analytics and MFA platform behind XSignOn sign-in.</b> It
                is a software-bound identity provider: it runs the sign-in itself, analyses how
                identities are used across the organization, and gives governance teams a live,
                clear view of who is signing in, where, and with what assurance.
              </p>
              <p>
                Deployment follows your estate: <b>SaaS, on-premises, or air-gapped</b>, with the
                same identity platform in each model.
              </p>
            </div>
            <div className="key-viz rv" aria-hidden="true">
              <span className="kv-key">XS</span>
              <p>
                Sign-in events, MFA coverage and identity analytics in one platform view, feeding
                the evidence your governance reviews rely on.
              </p>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Documentation</h2>
            </div>
            <div data-tabs>
              <div className="tabs" role="tablist" aria-label="XSense documentation">
                <button className="tab-btn" role="tab" aria-selected="true" data-tab="0">
                  Product Details
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="1">
                  Overview
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="2">
                  MFA Targets
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="3">
                  Verify App
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="4">
                  Features
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="5">
                  Roadmap
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="6">
                  Patent
                </button>
              </div>
              <div className="tab-panel" data-panel="0">
                <p>
                  <b>XSense is a software-bound IAM and identity provider platform.</b> It pairs
                  identity analytics with MFA in one product, deployed as SaaS, on-premises, or
                  air-gapped.
                </p>
              </div>
              <div className="tab-panel" data-panel="1" hidden>
                <p>
                  <b>Overview.</b> XSense runs sign-in for staff and systems, records every
                  authentication with its assurance level, and surfaces the patterns governance
                  teams review.
                </p>
              </div>
              <div className="tab-panel" data-panel="2" hidden>
                <p>
                  <b>MFA targets</b> set the assurance each application needs, so high-value systems
                  ask for verified, hardware-backed sign-in while everyday tools stay fast.
                </p>
              </div>
              <div className="tab-panel" data-panel="3" hidden>
                <p>
                  <b>The Verify app</b> gives staff a clear approval step on their own device,
                  paired with the identity XSense holds for them.
                </p>
              </div>
              <div className="tab-panel" data-panel="4" hidden>
                <p>
                  <b>Features</b> include identity analytics, MFA policy by application, deployment
                  in SaaS, on-premises and air-gapped models, and evidence exports for review.
                </p>
              </div>
              <div className="tab-panel" data-panel="5" hidden>
                <p>
                  <b>Roadmap</b> items are published with each release.{" "}
                  <span className="confirm">Roadmap details confirmed at release</span>
                </p>
              </div>
              <div className="tab-panel" data-panel="6" hidden>
                <p>
                  <b>Patent</b> information is published with the product documentation.{" "}
                  <span className="confirm">Patent details pending publication</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            <Link className="rel-row rv" href="/products/ams">
              <span className="t">AMS</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/products/passwordless-keys">
              <span className="t">Passwordless Keys</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/proof/biometric-fido2-air-gapped-industrial">
              <span className="t">Biometric FIDO2 Access For Air-Gapped Industrial Systems</span>
              <span className="d">Case study</span>
            </Link>
            <Link className="rel-row rv" href="/solutions/identity-governance">
              <span className="t">Identity Governance</span>
              <span className="d">Solution</span>
            </Link>
            <Link className="rel-row rv" href="/products">
              <span className="t">Back to Our products</span>
              <span className="d">Products</span>
            </Link>
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">See your sign-in clearly.</h2>
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
