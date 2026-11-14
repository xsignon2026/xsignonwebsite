import Link from "next/link";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function PostureOneView() {
  return (
    <div id="view-postureone">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <span className="cur">PostureOne</span>
          </nav>
          <h1 className="h-display">PostureOne</h1>
          <div className="pmeta">
            <span className="ptag">Website security</span>
            <span className="ptag">Cloud security</span>
            <span className="ptag">Evidence</span>
          </div>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="body-copy">
              <p>
                <b>
                  PostureOne protects public infrastructure: websites and cloud services, in one
                  posture view.
                </b>{" "}
                Firewall, traffic protection, file integrity, content security policy, data posture
                and micro-segmentation come together with findings, owners and evidence, so every
                answer is clear and within reach.
              </p>
            </div>
            <div className="dash rv" aria-hidden="true" style={{ marginTop: "44px" }}>
              <div className="dash-bar">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dash-url">postureone.xsignon.app</span>
              </div>
              <div className="dash-body">
                <aside className="dash-side">
                  <span className="act">Overview</span>
                  <span>Protection</span>
                  <span>Findings</span>
                  <span>Evidence</span>
                  <span>Reports</span>
                </aside>
                <div className="dash-main">
                  <div className="dash-row1">
                    <div>
                      <div className="dash-label">Security posture</div>
                      <div className="dash-score">
                        86<span> / 100</span>
                      </div>
                    </div>
                    <span className="chip ok">Evidence ready</span>
                  </div>
                  <div className="dash-bars">
                    <div className="dbar">
                      <span>Firewall coverage</span>
                      <span className="track">
                        <span className="fill g" style={{ display: "block", width: "92%" }}></span>
                      </span>
                      <b>92%</b>
                    </div>
                    <div className="dbar">
                      <span>Traffic protection</span>
                      <span className="track">
                        <span className="fill" style={{ display: "block", width: "78%" }}></span>
                      </span>
                      <b>78%</b>
                    </div>
                    <div className="dbar">
                      <span>File integrity checks</span>
                      <span className="track">
                        <span className="fill" style={{ display: "block", width: "64%" }}></span>
                      </span>
                      <b>64%</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">What PostureOne covers</h2>
            </div>
            <div className="bento">
              <article className="bcard rv">
                <h3 className="h4">Web application firewall</h3>
                <p>
                  Firewall protection for public websites and applications, with rules reviewed on a
                  cycle and every change recorded as evidence.
                </p>
              </article>
              <article className="bcard rv">
                <h3 className="h4">Always-on traffic protection</h3>
                <p>
                  Traffic protection that stays on around the clock, keeping public services
                  reachable and steady for the people who rely on them.
                </p>
              </article>
              <article className="bcard rv">
                <h3 className="h4">File integrity monitoring</h3>
                <p>
                  Files across web and cloud estates are monitored continuously, and every change is
                  logged with an owner and a timestamp.
                </p>
              </article>
              <article className="bcard rv">
                <h3 className="h4">Content security policy management</h3>
                <p>
                  Content security policies are managed from one place, so coverage stays complete
                  as sites and services change.
                </p>
              </article>
              <article className="bcard rv">
                <h3 className="h4">Data security posture management</h3>
                <p>
                  DSPM brings data stores into the same posture view, with findings assigned to
                  owners and tracked to closure.
                </p>
              </article>
              <article className="bcard rv">
                <h3 className="h4">Micro-segmentation</h3>
                <p>
                  Workloads are segmented so each service reaches only what it needs, with the
                  segments visible in the posture view.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">The PostureOne framework</h2>
            </div>
            <div className="steps-grid three">
              <div className="step-card rv">
                <span className="how-num">01</span>
                <h4>See everything</h4>
                <p>
                  Websites, cloud services, data stores and segments are inventoried into one view.
                </p>
              </div>
              <div className="step-card rv">
                <span className="how-num">02</span>
                <h4>Close every gap</h4>
                <p>Findings carry owners and next steps, and close with evidence attached.</p>
              </div>
              <div className="step-card rv">
                <span className="how-num">03</span>
                <h4>Stay audit-ready</h4>
                <p>
                  Evidence stays mapped to the frameworks your auditors use, ready at any moment.
                </p>
              </div>
              <div className="step-card rv">
                <span className="how-num">04</span>
                <h4>Govern AI with confidence</h4>
                <p>AI services on the estate join the same posture view, with owners named.</p>
              </div>
              <div className="step-card rv">
                <span className="how-num">05</span>
                <h4>Keep exposure low</h4>
                <p>
                  Segmentation and policy coverage keep every public service at its best posture.
                </p>
              </div>
              <div className="step-card rv">
                <span className="how-num">06</span>
                <h4>Move with confidence</h4>
                <p>Posture stays current as the estate changes, so teams ship with clarity.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Frameworks it maps to</h2>
            </div>
            <div className="chip-row rv" aria-hidden="true">
              <span className="fchip">SOC 2</span>
              <span className="fchip">ISO 27001</span>
              <span className="fchip">NIST 800-207</span>
              <span className="fchip">GDPR</span>
              <span className="fchip">PCI DSS</span>
            </div>
            <p className="lede rv" style={{ marginTop: "22px", maxWidth: "760px" }}>
              Mappings apply where the framework fits your setup. Nothing is shown as mapped until
              its source is connected and its evidence is attached.
            </p>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            <Link className="rel-row rv" href="/solutions/identity-governance">
              <span className="t">Identity Governance</span>
              <span className="d">Solution</span>
            </Link>
            <Link className="rel-row rv" href="/solutions/enterprise-technology">
              <span className="t">Enterprise Technology</span>
              <span className="d">Solution</span>
            </Link>
            <Link className="rel-row rv" href="/proof/biometric-fido2-air-gapped-industrial">
              <span className="t">Biometric FIDO2 Access For Air-Gapped Industrial Systems</span>
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
              <h2 className="h2">See your posture in one view.</h2>
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
