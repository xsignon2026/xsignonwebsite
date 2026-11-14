import Link from "next/link";
import { SolutionArt } from "@/components/prototype/SolutionArt";
import { ThinkingShowcase } from "@/components/about/ThinkingShowcase";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// NOTE: the article block inside #solThinkHost is added by hand (the prototype copies it from About).
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function SolutionsView() {
  return (
    <div id="view-solutions" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Solutions</span>
          </nav>
          <h1 className="h-display">Solutions</h1>
        </div>
      </section>
      <div>
        <section className="page-sec" id="solList" data-nav="dark">
          <div className="wrap">
            <div className="sec-row rv">
              <div>
                <h2 className="h2">Solutions</h2>
                <p className="sec-sub">Start from the problem you are solving</p>
              </div>
            </div>
            <div className="sol-grid">
              <article className="sol-card rv" data-sol="sol-identity">
                <div className="sol-art">
                  <SolutionArt name="sol-identity" />
                </div>
                <div className="sol-body">
                  <h3>Identity Governance</h3>
                  <p>
                    Teams want one accountable sign-in for every person and agent. Govern who and
                    what gets access, and prove it with confidence.
                  </p>
                  <Link className="link-arrow" href="/solutions/identity-governance">
                    View solution{" "}
                    <span className="arr" aria-hidden="true">
                      &#8594;
                    </span>
                  </Link>
                </div>
              </article>
              <article className="sol-card rv" data-sol="sol-ai">
                <div className="sol-art">
                  <SolutionArt name="sol-ai" />
                </div>
                <div className="sol-body">
                  <h3>AI and Digital Governance</h3>
                  <p>
                    Teams want AI evidence ready with confidence. Map AI use to frameworks and keep
                    evidence ready.
                  </p>
                  <Link className="link-arrow" href="/solutions/ai-and-digital-governance">
                    View solution{" "}
                    <span className="arr" aria-hidden="true">
                      &#8594;
                    </span>
                  </Link>
                </div>
              </article>
              <article className="sol-card rv" data-sol="sol-quantum">
                <div className="sol-art">
                  <SolutionArt name="sol-quantum" />
                </div>
                <div className="sol-body">
                  <h3>Quantum-Safe Security</h3>
                  <p>
                    Teams are preparing early for post-quantum methods. Inventory what you rely on
                    and plan the move with clarity and confidence.
                  </p>
                  <Link className="link-arrow" href="/solutions/quantum-safe-security">
                    View solution{" "}
                    <span className="arr" aria-hidden="true">
                      &#8594;
                    </span>
                  </Link>
                </div>
              </article>
              <article className="sol-card rv" data-sol="sol-process">
                <div className="sol-art">
                  <SolutionArt name="sol-process" />
                </div>
                <div className="sol-body">
                  <h3>Business Process</h3>
                  <p>
                    Teams want access reviews, approvals and evidence in one governed, repeatable
                    flow, with clarity at every step.
                  </p>
                  <Link className="link-arrow" href="/solutions/business-process">
                    View solution{" "}
                    <span className="arr" aria-hidden="true">
                      &#8594;
                    </span>
                  </Link>
                </div>
              </article>
              <article className="sol-card rv" data-sol="sol-enterprise">
                <div className="sol-art">
                  <SolutionArt name="sol-enterprise" />
                </div>
                <div className="sol-body">
                  <h3>Enterprise Technology</h3>
                  <p>
                    Identity sits across every system you run. Connect the platforms you already
                    have into one governed sign-in and access layer.
                  </p>
                  <Link className="link-arrow" href="/solutions/enterprise-technology">
                    View solution{" "}
                    <span className="arr" aria-hidden="true">
                      &#8594;
                    </span>
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-sec" id="solMore" data-nav="light">
          <div className="wrap">
            <div className="sec-row rv">
              <h2 className="h2">Enterprise and insights</h2>
            </div>

            <div className="ent-band rv">
              <div className="eb-top">
                <div className="eb-copy">
                  <h3>Enterprise</h3>
                  <p>
                    Every identity, fully in control: identity command, three deployment models, and
                    a standards posture for enterprise estates.
                  </p>
                  <Link className="btn btn-white" href="/enterprise">
                    View the Enterprise page{" "}
                    <span className="chev" aria-hidden="true">
                      &#8250;
                    </span>
                  </Link>
                </div>
                <div className="eb-models">
                  <div className="eb-m">
                    <span className="ic">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 9.5a4.2 4.2 0 0 1 0 8.5z" />
                      </svg>
                    </span>
                    <b>SaaS</b>
                    <p>Runs in the cloud, with identity command from day one.</p>
                  </div>
                  <div className="eb-m">
                    <span className="ic">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M6 21V4h12v17M4 21h16M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
                      </svg>
                    </span>
                    <b>On-premises</b>
                    <p>Runs in your own data centers, under your control.</p>
                  </div>
                  <div className="eb-m">
                    <span className="ic">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="5" y="11" width="14" height="9" rx="2" />
                        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      </svg>
                    </span>
                    <b>Air-gapped</b>
                    <p>Runs fully on site, apart from public networks.</p>
                  </div>
                </div>
              </div>
              <div className="eb-std">
                <span className="eb-lbl">Standards posture</span>
                <span>FIDO2</span>
                <span>SOC 2</span>
                <span>ISO 27001</span>
                <span>HIPAA</span>
                <span>GDPR</span>
                <span>PCI DSS</span>
                <span>NIST AI RMF</span>
                <span>NIST 800-207</span>
                <span>NIST PQC</span>
              </div>
            </div>

            <div className="sec-row sol-think-head rv">
              <h3 className="h3">Our thinking</h3>
              <Link className="products-all" href="/thinking">
                All articles{" "}
                <span className="arr" aria-hidden="true">
                  &#8594;
                </span>
              </Link>
            </div>
            <div id="solThinkHost">
              <ThinkingShowcase />
            </div>
          </div>
        </section>
        <section className="cta-sec sm" data-nav="light">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Which solution fits your goals?</h2>
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
