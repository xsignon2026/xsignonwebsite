import Image from "next/image";
import Link from "next/link";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function ProofView() {
  return (
    <div id="view-proof">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <span className="cur">Proof</span>
          </nav>
          <h1 className="h-display">Proof</h1>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="body-copy">
              <p>
                <b>Case studies live here, attached to the products they prove.</b> Each study names
                the product deployed and the goal it supported. Where outcomes are still being
                sourced, that is marked clearly.
              </p>
            </div>
            <div className="case-grid" style={{ marginTop: "44px" }}>
              <article className="case-card rv">
                <div className="case-photo">
                  <Image
                    src="/images/proof/img-c033247b.jpg"
                    alt="Stone bank building with columns"
                    width={1200}
                    height={800}
                  />
                </div>
                <div className="pmeta">
                  <span className="ptag">Banking · Abu Dhabi</span>
                  <span className="ptag">Passwordless Keys · AMS</span>
                </div>
                <h3 className="h3">Securing Bank Access With FIDO2 Biometric Keys</h3>
                <p>
                  A bank in Abu Dhabi replaced password sign-in for branch and back-office staff
                  with FIDO2 keys supplied and supported by XSignOn, managed through AMS.
                </p>
                <span className="status-chip">
                  <b>Sourced outcome needed:</b> one verifiable result, with its source and date, is
                  added here before this page ships. No number is shown until it is sourced.
                </span>
                <Link className="link-arrow" href="/proof/securing-bank-access-fido2">
                  Read the case study{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </article>
              <article className="case-card rv">
                <div className="case-photo">
                  <Image
                    src="/images/proof/img-eac41761.jpg"
                    alt="Doctor holding a phone, wearing a stethoscope"
                    width={1200}
                    height={800}
                  />
                </div>
                <div className="pmeta">
                  <span className="ptag">Healthcare</span>
                  <span className="ptag">March 2020</span>
                  <span className="ptag">Passwordless Keys</span>
                </div>
                <h3 className="h3">Passwordless Access For A Global Healthcare Enterprise</h3>
                <p>
                  Passwordless access for a global healthcare enterprise, where clinical and
                  administrative staff sign in across shared workstations and shift changes.
                </p>
                <span className="status-chip">
                  <b>Case details pending:</b> deployment specifics are confirmed and sourced before
                  this page ships.
                </span>
                <Link className="link-arrow" href="/proof/passwordless-access-global-healthcare">
                  Read the case study{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </article>
              <article className="case-card rv">
                <div className="case-photo">
                  <Image
                    src="/images/proof/img-687c8549.jpg"
                    alt="Industrial worker welding with sparks"
                    width={1200}
                    height={800}
                  />
                </div>
                <div className="pmeta">
                  <span className="ptag">Electrical</span>
                  <span className="ptag">December 2023</span>
                  <span className="ptag">XSense · AMS</span>
                </div>
                <h3 className="h3">Biometric FIDO2 Access For Air-Gapped Industrial Systems</h3>
                <p>
                  Biometric FIDO2 access for air-gapped industrial systems in Asia, running on the
                  XSense identity platform with the AMS module.
                </p>
                <span className="status-chip">
                  <b>Case details pending:</b> deployment specifics are confirmed and sourced before
                  this page ships.
                </span>
                <Link className="link-arrow" href="/proof/biometric-fido2-air-gapped-industrial">
                  Read the case study{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </article>
              <article className="case-card rv">
                <div className="case-photo">
                  <Image
                    src="/images/proof/img-5ed582b6.jpg"
                    alt="IT team working at laptops around a table, seen from above"
                    width={1200}
                    height={800}
                  />
                </div>
                <div className="pmeta">
                  <span className="ptag">IT</span>
                  <span className="ptag">July 2020</span>
                  <span className="ptag">Passwordless Keys · XSense</span>
                </div>
                <h3 className="h3">Biometric-Only Authentication For A Global IT Enterprise</h3>
                <p>
                  Biometric-only authentication for a global IT enterprise, where every sign-in is
                  completed with a verified key.
                </p>
                <span className="status-chip">
                  <b>Case details pending:</b> deployment specifics are confirmed and sourced before
                  this page ships.
                </span>
                <Link className="link-arrow" href="/proof/biometric-only-authentication-global-it">
                  Read the case study{" "}
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
              <h2 className="h2">Estimate your own numbers</h2>
            </div>
            <div className="body-copy">
              <p>
                No case study result is shown without a source. To see the time your own team can
                save, the ROI calculator computes an estimate from the numbers you enter.
              </p>
            </div>
            <div style={{ marginTop: "28px" }}>
              <Link className="link-arrow" href="/roi-calculator">
                Open the ROI Calculator{" "}
                <span className="arr" aria-hidden="true">
                  &#8594;
                </span>
              </Link>
            </div>
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Become the next case study.</h2>
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
