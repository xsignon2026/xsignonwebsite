import Link from "next/link";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function CaseHealthView() {
  return (
    <div id="view-case-health">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <Link href="/proof">Proof</Link>
            <span className="sep">/</span>
            <span className="cur">Healthcare</span>
          </nav>
          <h1 className="h-display">Passwordless Access For A Global Healthcare Enterprise</h1>
          <div className="pmeta">
            <span className="ptag">Healthcare</span>
            <span className="ptag">March 2020</span>
            <span className="ptag">Passwordless Keys</span>
          </div>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Where they started</h2>
            </div>
            <div className="body-copy">
              <p>
                A global healthcare enterprise set out to give clinical and administrative staff
                passwordless access. Staff sign in across shared workstations and shift changes,
                where fast, verified sign-in helps care teams keep moving smoothly. This study
                covers the FIDO2 key rollout for that environment, completed in March 2020.
              </p>
            </div>
            <span className="status-chip rv" style={{ marginTop: "24px" }}>
              <b>Case details pending:</b> deployment specifics are confirmed and sourced before
              this page ships.
            </span>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">What was deployed</h2>
            </div>
            <span className="status-chip rv">
              <b>Case details pending:</b> deployment scope is confirmed before this section ships.
            </span>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Rollout</h2>
            </div>
            <span className="status-chip rv">
              <b>Case details pending:</b> rollout phases are confirmed before this section ships.
            </span>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Outcome</h2>
            </div>
            <span className="status-chip rv">
              <b>Sourced outcome needed:</b> no result is shown until it is verifiable, with its
              source and date.
            </span>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            <Link className="rel-row rv" href="/products/passwordless-keys">
              <span className="t">Passwordless Keys</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/solutions/enterprise-technology">
              <span className="t">Enterprise Technology</span>
              <span className="d">Solution</span>
            </Link>
            <Link className="rel-row rv" href="/proof/securing-bank-access-fido2">
              <span className="t">Securing Bank Access With FIDO2 Biometric Keys</span>
              <span className="d">Case study</span>
            </Link>
            <Link className="rel-row rv" href="/proof/biometric-fido2-air-gapped-industrial">
              <span className="t">Biometric FIDO2 Access For Air-Gapped Industrial Systems</span>
              <span className="d">Case study</span>
            </Link>
            <Link className="rel-row rv" href="/proof/biometric-only-authentication-global-it">
              <span className="t">Biometric-Only Authentication For A Global IT Enterprise</span>
              <span className="d">Case study</span>
            </Link>
            <Link className="rel-row rv" href="/proof">
              <span className="t">Back to Proof</span>
              <span className="d">Proof</span>
            </Link>
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Talk to us about clinical sign-in.</h2>
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
