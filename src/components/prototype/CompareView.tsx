import Link from "next/link";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function CompareView() {
  return (
    <div id="view-compare">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <span className="cur">How XSignOn compares</span>
          </nav>
          <h1 className="h-display">How XSignOn compares</h1>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="body-copy rv" style={{ marginBottom: "34px" }}>
              <p>
                <b>Four ways to run sign-in, compared on what each one gives your team.</b> XSignOn
                pairs FIDO2 hardware with a governed platform, so the sign-in itself, the enrollment
                behind it, and the evidence after it all come from one place.
              </p>
            </div>
            <div className="tbl-wrap rv">
              <table className="spec">
                <thead>
                  <tr>
                    <th scope="col">Capability</th>
                    <th scope="col">XSignOn</th>
                    <th scope="col">Password-based sign-in</th>
                    <th scope="col">One-time codes</th>
                    <th scope="col">Legacy MFA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Sign-in only the account owner can complete</th>
                    <td data-th="XSignOn">Yes, with a verified key</td>
                    <td data-th="Password-based sign-in">Shared secret</td>
                    <td data-th="One-time codes">Code shared by message</td>
                    <td data-th="Legacy MFA">Added on top of a password</td>
                  </tr>
                  <tr>
                    <th scope="row">Nothing to remember or type</th>
                    <td data-th="XSignOn">Yes</td>
                    <td data-th="Password-based sign-in">Password to remember</td>
                    <td data-th="One-time codes">Code to type each time</td>
                    <td data-th="Legacy MFA">Password plus a second step</td>
                  </tr>
                  <tr>
                    <th scope="row">Hardware-backed verification</th>
                    <td data-th="XSignOn">Yes, FIDO2 keys</td>
                    <td data-th="Password-based sign-in">No</td>
                    <td data-th="One-time codes">No</td>
                    <td data-th="Legacy MFA">Varies by setup</td>
                  </tr>
                  <tr>
                    <th scope="row">Enrollment and lifecycle managed for you</th>
                    <td data-th="XSignOn">Yes, through AMS</td>
                    <td data-th="Password-based sign-in">Reset by help desk</td>
                    <td data-th="One-time codes">Managed per account</td>
                    <td data-th="Legacy MFA">Managed per account</td>
                  </tr>
                  <tr>
                    <th scope="row">Recovery with a verified replacement</th>
                    <td data-th="XSignOn">Yes, guided by AMS</td>
                    <td data-th="Password-based sign-in">Reset questions and calls</td>
                    <td data-th="One-time codes">Re-registration per service</td>
                    <td data-th="Legacy MFA">Re-registration per service</td>
                  </tr>
                  <tr>
                    <th scope="row">Evidence ready for access reviews</th>
                    <td data-th="XSignOn">Yes, in PostureOne and XSense</td>
                    <td data-th="Password-based sign-in">Assembled by hand</td>
                    <td data-th="One-time codes">Assembled by hand</td>
                    <td data-th="Legacy MFA">Assembled by hand</td>
                  </tr>
                  <tr>
                    <th scope="row">Works with your existing identity provider</th>
                    <td data-th="XSignOn">Yes, standard protocols</td>
                    <td data-th="Password-based sign-in">Yes</td>
                    <td data-th="One-time codes">Yes</td>
                    <td data-th="Legacy MFA">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="lede rv" style={{ marginTop: "22px", maxWidth: "760px" }}>
              Every XSignOn row is delivered by the products on this site: the keys, AMS, XSense and
              PostureOne, working as one program.
            </p>
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
            <Link className="rel-row rv" href="/proof/securing-bank-access-fido2">
              <span className="t">Securing Bank Access With FIDO2 Biometric Keys</span>
              <span className="d">Case study</span>
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
              <h2 className="h2">Compare it against your current sign-in.</h2>
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
