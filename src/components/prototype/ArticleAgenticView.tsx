import Link from "next/link";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function ArticleAgenticView() {
  return (
    <div id="view-article-agentic" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/thinking">Our thinking</Link>
            <span className="sep">/</span>
            <span className="cur">Agentic AI</span>
          </nav>
          <h1 className="h-display">
            Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework
          </h1>
          <div className="pmeta">
            <span className="ptag">XSignOn Team</span>
            <span className="ptag">June 29, 2026</span>
          </div>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="art-body">
              <h3 className="h3">Agents that work in teams</h3>
              <p>
                Agentic AI systems divide a job among specialized agents that plan, act and check
                each other&apos;s work. Frameworks such as AutoGen make that pattern practical:
                agents hold defined roles, pass tasks between them, and keep a record of what each
                one did.
              </p>
              <p>
                For security and governance work, that structure is the point. A finding can be
                gathered by one agent, verified by a second, and prepared for human review by a
                third, with the full trail available as evidence.
              </p>
              <h3 className="h3">Governance is designed in, from the first agent</h3>
              <p>
                Every agent is a non-human identity, and it earns the same treatment as any other: a
                named owner, a scoped set of permissions, and activity that is recorded and
                reviewable. The system prepares, and the human decides, at the steps that matter.
              </p>
              <p>
                Evaluation keeps pace with deployment. Agent behavior is tested against recognized
                frameworks before release and monitored after it, so confidence in the system is
                based on evidence, refreshed continuously.
              </p>
              <div className="pull">
                The system prepares, and the human decides. Agentic AI earns its place when every
                action it takes is owned, scoped and reviewable.
              </div>
              <h3 className="h3">What good looks like</h3>
              <p>
                A well-governed agentic deployment reads like a good team roster: each agent has a
                role, a manager, and a clear boundary. Teams that set those three things up first
                find that scale is the easy part.
              </p>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            <Link className="rel-row rv" href="/products/evalone">
              <span className="t">EvalOne</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/solutions/ai-and-digital-governance">
              <span className="t">AI and Digital Governance</span>
              <span className="d">Solution</span>
            </Link>
            <Link className="rel-row rv" href="/thinking/non-human-identities">
              <span className="t">
                Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security
                Model
              </span>
              <span className="d">Insight</span>
            </Link>
            <Link className="rel-row rv" href="/thinking">
              <span className="t">Back to Our thinking</span>
              <span className="d">Our thinking</span>
            </Link>
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Put agents to work, with owners.</h2>
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
