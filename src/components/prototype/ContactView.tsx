import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import type { ContactPageContent } from "@/types/contact-page-content";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function ContactView({ content }: { content: ContactPageContent }) {
  return (
    <div id="view-contact">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Contact</span>
          </nav>
          <h1 className="h-display">{content.hero.title}</h1>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="about-split contact-split">
              <div>
                <ContactForm />
              </div>
              <div className="about-text">
                {content.details
                  .filter((detail) => !/^what happens next/i.test(detail.label))
                  .map((detail) => (
                    <p key={detail.label}>
                      <b style={{ color: "var(--txt)" }}>{detail.label}</b>{" "}
                      {detail.href ? <a href={detail.href}>{detail.text}</a> : detail.text}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">{content.cta.title}</h2>
              <Link className="btn btn-white" href={content.cta.button.href}>
                {content.cta.button.label}{" "}
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
