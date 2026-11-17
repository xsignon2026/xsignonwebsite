import Link from "next/link";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function ArticleIdentityFirstView() {
  return (
    <div id="view-article-identity-first" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/thinking">Our thinking</Link>
            <span className="sep">/</span>
            <span className="cur">Identity-first controls</span>
          </nav>
          <h1 className="h-display">Elevate Enterprise Security with Identity-First Controls</h1>
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
              <h3 className="h3">The login screen is the smallest change</h3>
              <p>
                Teams planning a passwordless rollout spend most of their energy on the sign-in
                moment: the key, the tap, the biometric. That moment is the easiest part. Moving to
                verified keys improves enrollment, recovery and support even more than the login
                screen, and those three shape a confident rollout.
              </p>
              <p>
                Enrollment is the first contact most staff have with the new system, and clear,
                guided enrollment sets a confident tone from day one. Recovery is the moment that
                matters most: a staff member who needs a replacement key on a Monday morning is
                working again by Monday afternoon, with a verified key and human support. The help
                desk shines in both, because every enrollment and recovery is a chance to give staff
                a smooth, supported experience.
              </p>
              <h3 className="h3">Rollout order matters more than the hardware</h3>
              <p>
                The instinct is to start with the easiest group. The better move is to start with a
                priority group small enough to learn from. A pilot with branch managers or field
                staff shows how enrollment works in the real world, while the group is small enough
                that each person gets a human response.
              </p>
              <p>
                Phasing protects access during the move. Every team member keeps access to the
                systems they need throughout the rollout. Parallel sign-in during the transition is
                a strength: it keeps the business running smoothly while the secure path becomes the
                default.
              </p>
              <div className="pull">
                The rollout order matters more than the hardware: pilot the priority group first,
                and everyone keeps access during the move.
              </div>
              <h3 className="h3">What the help desk actually gets</h3>
              <p>
                Keys move help desk work to enrollment and replacement, which are planned events
                teams can schedule. The help desk gains work it can plan, measure and improve, and
                staff gain time back every week.
              </p>
              <p>
                That shift is worth naming when you ask for the budget. The value case for
                passwordless is clear: time saved on resets every week, smoother days at the branch,
                and sign-in that meets the same high standard as the rest of the program.
              </p>
            </div>
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
              <h2 className="h2">Plan a rollout in the right order.</h2>
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
