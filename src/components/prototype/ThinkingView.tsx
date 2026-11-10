import Link from "next/link";
import { NewsletterSubscribe } from "@/components/thinking/NewsletterSubscribe";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function ThinkingView() {
  return (
    <div id="view-thinking" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Our thinking</span>
          </nav>
          <h1 className="h-display">Our thinking</h1>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <article className="bcard rv" style={{ marginBottom: "34px" }}>
              <div className="pmeta">
                <span className="pill-cat">Featured</span>
                <span className="pill-cat">XSignOn Team</span>
                <span className="pill-cat">June 29, 2026</span>
              </div>
              <h3 className="h3" style={{ marginTop: "18px" }}>
                Elevate Enterprise Security with Identity-First Controls
              </h3>
              <p>
                Removing passwords changes more than the login screen. Enrollment, recovery and
                support all shift, and the rollout order matters more than the hardware.
              </p>
              <Link className="link-arrow" href="/thinking/identity-first-controls">
                Read the article{" "}
                <span className="arr" aria-hidden="true">
                  &#8594;
                </span>
              </Link>
            </article>
            <div className="case-grid">
              <article className="case-card rv">
                <div className="pmeta">
                  <span className="pill-cat">XSignOn Team</span>
                  <span className="pill-cat">June 29, 2026</span>
                </div>
                <h3 className="h4">Data + AI Security Built for Visibility, Control, and Trust</h3>
                <p>
                  The questions that show up in AI assessments, and the evidence that answers each
                  one.
                </p>
                <Link className="link-arrow" href="/thinking/data-and-ai-security">
                  Read the article{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </article>
              <article className="case-card rv">
                <div className="pmeta">
                  <span className="pill-cat">XSignOn Team</span>
                  <span className="pill-cat">June 29, 2026</span>
                </div>
                <h3 className="h4">Modern Micro-Segmentation for Zero Trust Security</h3>
                <p>
                  Segments drawn around identities stay accurate, because they follow the thing that
                  actually requests access.
                </p>
                <Link className="link-arrow" href="/thinking/modern-micro-segmentation">
                  Read the article{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </article>
              <article className="case-card rv">
                <div className="pmeta">
                  <span className="pill-cat">XSignOn Team</span>
                  <span className="pill-cat">June 29, 2026</span>
                </div>
                <h3 className="h4">
                  Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security
                  Model
                </h3>
                <p>
                  Service accounts, automations and AI agents hold access too. Each one gets an
                  owner, a scope, and a review cycle.
                </p>
                <Link className="link-arrow" href="/thinking/non-human-identities">
                  Read the article{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </article>
              <article className="case-card rv">
                <div className="pmeta">
                  <span className="pill-cat">XSignOn Team</span>
                  <span className="pill-cat">June 29, 2026</span>
                </div>
                <h3 className="h4">
                  Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework
                </h3>
                <p>
                  Agents that plan, act and check each other&apos;s work, governed with owners and
                  evidence from the first deployment.
                </p>
                <Link className="link-arrow" href="/thinking/agentic-ai-cybersecurity">
                  Read the article{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </article>
            </div>
            <div style={{ marginTop: "34px" }}>
              <Link className="link-arrow" href="/thinking/industry">
                Industry Thinking: practical thinking for security, governance, and growth{" "}
                <span className="arr" aria-hidden="true">
                  &#8594;
                </span>
              </Link>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <NewsletterSubscribe sourcePage="/thinking" />
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Discuss what you are reading.</h2>
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
