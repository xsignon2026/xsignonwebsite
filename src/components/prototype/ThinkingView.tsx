import Image from "next/image";
import Link from "next/link";
import { NewsletterSubscribe } from "@/components/thinking/NewsletterSubscribe";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
// Article photos live in /public/images/thinking; the card layout is styled under #view-thinking in primitives.css.

const ARTICLES = [
  {
    href: "/thinking/data-and-ai-security",
    title: "Data + AI Security Built for Visibility, Control, and Trust",
    excerpt:
      "The questions that show up in AI assessments, and the evidence that answers each one.",
    image: "/images/thinking/data-ai-security.jpg",
    alt: "Person working on a laptop while holding a phone",
  },
  {
    href: "/thinking/modern-micro-segmentation",
    title: "Modern Micro-Segmentation for Zero Trust Security",
    excerpt:
      "Segments drawn around identities stay accurate, because they follow the thing that actually requests access.",
    image: "/images/thinking/modern-micro-segmentation.jpg",
    alt: "Team planning with sticky notes on a whiteboard",
  },
  {
    href: "/thinking/non-human-identities",
    title: "Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model",
    excerpt:
      "Service accounts, automations and AI agents hold access too. Each one gets an owner, a scope, and a review cycle.",
    image: "/images/thinking/non-human-identities.jpg",
    alt: "Automated warehouse with rows of shelves and yellow bins",
  },
  {
    href: "/thinking/agentic-ai-cybersecurity",
    title: "Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework",
    excerpt:
      "Agents that plan, act and check each other's work, governed with owners and evidence from the first deployment.",
    image: "/images/thinking/agentic-ai-cybersecurity.jpg",
    alt: "Analytics dashboard with charts on a laptop screen",
  },
];

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
            <article className="bcard th-feat rv" style={{ marginBottom: "34px" }}>
              <div className="th-feat-body">
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
              </div>
              <div className="th-img th-feat-img">
                <Image
                  src="/images/thinking/identity-first-controls.jpg"
                  alt="Server racks with network cables and status lights"
                  fill
                  priority
                  sizes="(max-width: 760px) 100vw, 560px"
                />
              </div>
            </article>
            <div className="case-grid">
              {ARTICLES.map((a) => (
                <article key={a.href} className="case-card th-card rv">
                  <div className="th-img th-card-img">
                    <Image
                      src={a.image}
                      alt={a.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 400px"
                    />
                  </div>
                  <div className="th-card-body">
                    <div className="pmeta">
                      <span className="pill-cat">XSignOn Team</span>
                      <span className="pill-cat">June 29, 2026</span>
                    </div>
                    <h3 className="h4">{a.title}</h3>
                    <p>{a.excerpt}</p>
                    <Link className="link-arrow" href={a.href}>
                      Read the article{" "}
                      <span className="arr" aria-hidden="true">
                        &#8594;
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
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
