import Link from "next/link";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function KeysView() {
  return (
    <div id="view-keys">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <span className="cur">Passwordless Keys</span>
          </nav>
          <h1 className="h-display">Passwordless Keys</h1>
          <div className="pmeta">
            <span className="ptag">FIDO2</span>
            <span className="ptag">Hardware</span>
            <span className="ptag">Biometric</span>
          </div>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="body-copy">
              <p>
                <b>Enterprise FIDO2 biometric security keys, delivered and supported by XSignOn.</b>{" "}
                Keys provide verified authentication that only the account owner can complete. Staff
                carry their key with confidence, enrollment included, and XSignOn handles the
                hardware from order to replacement.
              </p>
            </div>
            <div className="case-grid" style={{ marginTop: "44px" }}>
              <article className="case-card rv">
                <div className="pmeta">
                  <span className="ptag">Biometric</span>
                </div>
                <h3 className="h3">AUTH Bio</h3>
                <p>Fingerprint-based sign-in for everyday staff roles.</p>
                <span className="status-chip">
                  <b>Spec confirmation pending:</b> full specifications are confirmed before
                  ordering.
                </span>
                <Link className="link-arrow" href="/products/passwordless-keys/bio">
                  View the AUTH Bio page{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </article>
              <article className="case-card rv">
                <div className="pmeta">
                  <span className="ptag">Biometric</span>
                </div>
                <h3 className="h3">AUTH Bio Pro</h3>
                <p>Biometric sign-in for roles that need extended management options.</p>
                <span className="status-chip">
                  <b>Spec confirmation pending:</b> full specifications are confirmed before
                  ordering.
                </span>
                <Link className="link-arrow" href="/products/passwordless-keys/pro">
                  View the AUTH Bio Pro page{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </article>
              <article className="case-card rv">
                <div className="pmeta">
                  <span className="ptag">Touch-activated</span>
                </div>
                <h3 className="h3">AUTH Bio Touch</h3>
                <p>Touch-activated sign-in where a tap confirms the attempt.</p>
                <span className="status-chip">
                  <b>Spec confirmation pending:</b> full specifications are confirmed before
                  ordering.
                </span>
                <Link className="link-arrow" href="/products/passwordless-keys/touch">
                  View the AUTH Bio Touch page{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </article>
              <article className="case-card rv">
                <div className="pmeta">
                  <span className="ptag">Desktop</span>
                </div>
                <h3 className="h3">AUTH Bio Desktop</h3>
                <p>Desktop-based sign-in for fixed workstations and shared terminals.</p>
                <span className="status-chip">
                  <b>Spec confirmation pending:</b> full specifications are confirmed before
                  ordering.
                </span>
                <Link className="link-arrow" href="/products/passwordless-keys/desktop">
                  View the AUTH Bio Desktop page{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </article>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Hardware comparison</h2>
            </div>
            <div className="tbl-wrap rv">
              <table className="spec">
                <thead>
                  <tr>
                    <th scope="col">Detail</th>
                    <th scope="col">AUTH Bio</th>
                    <th scope="col">AUTH Bio Pro</th>
                    <th scope="col">AUTH Bio Touch</th>
                    <th scope="col">AUTH Bio Desktop</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Sign-in method</th>
                    <td data-th="AUTH Bio">
                      <span className="confirm">Confirm spec</span>
                    </td>
                    <td data-th="AUTH Bio Pro">
                      <span className="confirm">Confirm spec</span>
                    </td>
                    <td data-th="AUTH Bio Touch">
                      <span className="confirm">Confirm spec</span>
                    </td>
                    <td data-th="AUTH Bio Desktop">
                      <span className="confirm">Confirm spec</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Form factor</th>
                    <td data-th="AUTH Bio">
                      <span className="confirm">Confirm spec</span>
                    </td>
                    <td data-th="AUTH Bio Pro">
                      <span className="confirm">Confirm spec</span>
                    </td>
                    <td data-th="AUTH Bio Touch">
                      <span className="confirm">Confirm spec</span>
                    </td>
                    <td data-th="AUTH Bio Desktop">
                      <span className="confirm">Confirm spec</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Interface</th>
                    <td data-th="AUTH Bio">
                      <span className="confirm">Confirm spec</span>
                    </td>
                    <td data-th="AUTH Bio Pro">
                      <span className="confirm">Confirm spec</span>
                    </td>
                    <td data-th="AUTH Bio Touch">
                      <span className="confirm">Confirm spec</span>
                    </td>
                    <td data-th="AUTH Bio Desktop">
                      <span className="confirm">Confirm spec</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">FIDO2 certification</th>
                    <td data-th="AUTH Bio">FIDO2 certified</td>
                    <td data-th="AUTH Bio Pro">FIDO2 certified</td>
                    <td data-th="AUTH Bio Touch">FIDO2 certified</td>
                    <td data-th="AUTH Bio Desktop">FIDO2 certified</td>
                  </tr>
                  <tr>
                    <th scope="row">Delivered and supported by XSignOn</th>
                    <td data-th="AUTH Bio">Yes</td>
                    <td data-th="AUTH Bio Pro">Yes</td>
                    <td data-th="AUTH Bio Touch">Yes</td>
                    <td data-th="AUTH Bio Desktop">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="lede rv" style={{ marginTop: "22px", maxWidth: "760px" }}>
              Specifications are confirmed against your identity provider and device mix before any
              hardware is ordered. Cells marked for confirmation are never shipped as fact.
            </p>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Works with what you have</h2>
            </div>
            <div className="body-copy">
              <p>
                The keys are FIDO2 certified and work with existing identity providers through
                standard protocols, so the rollout does not start with replacing your stack.{" "}
                <b>
                  Compatibility and enrollment are confirmed against your provider before any
                  hardware is ordered.
                </b>
              </p>
              <p>
                Enrollment, replacement and exceptions run through AMS, so your help desk stays
                focused on supporting staff.
              </p>
            </div>
            <div style={{ marginTop: "28px" }}>
              <Link className="link-arrow" href="/products/ams">
                How AMS manages the keys{" "}
                <span className="arr" aria-hidden="true">
                  &#8594;
                </span>
              </Link>
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
            <Link className="rel-row rv" href="/products/compare">
              <span className="t">How XSignOn compares</span>
              <span className="d">Comparison</span>
            </Link>
            <Link className="rel-row rv" href="/proof/securing-bank-access-fido2">
              <span className="t">Securing Bank Access With FIDO2 Biometric Keys</span>
              <span className="d">Case study</span>
            </Link>
            <Link className="rel-row rv" href="/thinking/identity-first-controls">
              <span className="t">Elevate Enterprise Security with Identity-First Controls</span>
              <span className="d">Insight</span>
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
              <h2 className="h2">Get keys that arrive ready to enroll.</h2>
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
