import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function ContactView() {
  return (
    <div id="view-contact">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Contact</span>
          </nav>
          <h1 className="h-display">Contact us</h1>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="about-split">
              <div>
                <ContactForm />
              </div>
              <div className="about-text">
                <p>
                  <b style={{ color: "var(--txt)" }}>What happens next.</b> Every inquiry goes to a
                  person who replies with care. Strategy calls are short working sessions on your
                  access, AI governance or quantum readiness goals, and you leave with a clear next
                  step.
                </p>
                <p>
                  <b style={{ color: "var(--txt)" }}>Office.</b> XSignOn Corporation, 3900 S
                  Stonebridge Dr., Suite 1101, McKinney, TX 75070.
                </p>
                <p>
                  <b style={{ color: "var(--txt)" }}>Phone.</b>{" "}
                  <a href="tel:+14698979399">+1 469-897-9399</a>
                </p>
                <p>
                  <b style={{ color: "var(--txt)" }}>Email.</b>{" "}
                  <a href="mailto:info@xsignon.com">info@xsignon.com</a>
                </p>
                <p>
                  This form is designed to be quick and welcoming. To book quickly, choose
                  &quot;Book a strategy call&quot; and share your preferred timing in the message.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Prefer reading first?</h2>
              <Link className="btn btn-white" href="/thinking">
                Browse our thinking{" "}
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
