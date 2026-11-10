import Link from "next/link";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function CaseBankView() {
  return (
    <div id="view-case-bank">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <Link href="/proof">Proof</Link>
            <span className="sep">/</span>
            <span className="cur">Banking</span>
          </nav>
          <h1 className="h-display">Securing Bank Access With FIDO2 Biometric Keys</h1>
          <div className="pmeta">
            <span className="ptag">Banking · Abu Dhabi</span>
            <span className="ptag">Passwordless Keys</span>
            <span className="ptag">AMS</span>
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
                A bank in Abu Dhabi used password sign-in for branch and back-office staff. Teams
                spent time each week on password resets and sign-in support, and the bank wanted a
                smoother, verified experience that matched the high standards of the rest of its
                operations.
              </p>
              <p>
                The bank set out to give every team member sign-in that works at the speed of branch
                operations and meets the audit standards the rest of the business already upholds.
              </p>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">What was deployed</h2>
            </div>
            <div className="body-copy">
              <p>
                FIDO2 keys supplied and supported by XSignOn replaced password sign-in for branch
                and back-office staff. Enrollment, replacements and exceptions ran through AMS, so
                the bank&apos;s help desk stayed focused on supporting staff.
              </p>
            </div>
            <ul className="feat-list rv" style={{ marginTop: "28px" }}>
              <li>
                <span>
                  <b>FIDO2 keys</b> for branch and back-office staff, compatible with the
                  bank&apos;s existing identity provider.
                </span>
              </li>
              <li>
                <span>
                  <b>AMS</b> for delivery, guided enrollment, replacements and exception handling.
                </span>
              </li>
              <li>
                <span>
                  <b>Pilot-first rollout</b>, so enrollment and recovery flows were proven before
                  scale-up.
                </span>
              </li>
            </ul>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Rollout</h2>
            </div>
            <div className="steps-grid three">
              <div className="step-card rv">
                <span className="how-num">01</span>
                <h4>Pilot</h4>
                <p>
                  A pilot group enrolled first. Enrollment and recovery flows were tested with real
                  staff, and the order of the wider rollout was set from what the pilot taught.
                </p>
              </div>
              <div className="step-card rv">
                <span className="how-num">02</span>
                <h4>Branch rollout</h4>
                <p>
                  Branch staff enrolled in phases, so every branch kept continuous sign-in during
                  the move. Replacements and exceptions ran through AMS.
                </p>
              </div>
              <div className="step-card rv">
                <span className="how-num">03</span>
                <h4>Back office</h4>
                <p>
                  Back-office teams followed, with help desk time freed as staff moved to verified
                  keys. Coverage stayed visible in AMS throughout.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Outcome</h2>
            </div>
            <span className="status-chip rv">
              <b>Sourced outcome needed:</b> one verifiable result, with its source and date, is
              added here before this page ships. No number is shown until it is sourced.
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
            <Link className="rel-row rv" href="/products/ams">
              <span className="t">AMS</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/solutions/enterprise-technology">
              <span className="t">Enterprise Technology</span>
              <span className="d">Solution</span>
            </Link>
            <Link className="rel-row rv" href="/proof/passwordless-access-global-healthcare">
              <span className="t">Passwordless Access For A Global Healthcare Enterprise</span>
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
              <h2 className="h2">Run a rollout your branches can trust.</h2>
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
