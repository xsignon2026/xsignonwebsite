import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { KEY_MODELS, KEY_TABS, type KeyModel } from "@/data/keys";

// One page per key model, built from one template (documentation tabs and a specification table), as in
// the approved prototype.
type KeyPageProps = { params: Promise<{ model: string }> };

export function generateStaticParams() {
  return KEY_MODELS.map((key) => ({ model: key.slug }));
}

const find = (slug: string) => KEY_MODELS.find((key) => key.slug === slug);

export async function generateMetadata({ params }: KeyPageProps): Promise<Metadata> {
  const key = find((await params).model);
  if (!key) return {};
  return {
    title: `${key.name} | Passwordless Keys | XSignOn`,
    description: key.line,
    alternates: { canonical: `/products/passwordless-keys/${key.slug}` },
  };
}

function tabText(key: KeyModel, tab: number): ReactNode {
  switch (tab) {
    case 0:
      return (
        <p>
          <b>{key.name} is an enterprise FIDO2 security key, delivered and supported by XSignOn.</b>{" "}
          {key.line} Enrollment, replacement and lifecycle run through AMS.
        </p>
      );
    case 1:
      return (
        <p>
          <b>Overview.</b> {key.feat}
        </p>
      );
    case 2:
      return (
        <p>
          <b>Security.</b> The key is FIDO2 certified and completes verification on the device, so
          sign-in is bound to the person holding the key and the service they are signing in to.
        </p>
      );
    case 3:
      return (
        <p>
          <b>Platforms.</b> Compatibility is confirmed against your identity provider and device mix
          before any hardware is ordered. <span className="confirm">Confirm spec</span>
        </p>
      );
    case 4:
      return (
        <p>
          <b>Windows sign-in</b> is supported through standard FIDO2 flows, with enrollment guided
          in AMS. <span className="confirm">Confirm spec</span>
        </p>
      );
    default:
      return (
        <p>
          <b>What sets it apart.</b> {key.feat} Delivered and supported by XSignOn, with AMS
          carrying delivery, enrollment and replacements.
        </p>
      );
  }
}

export default async function KeyModelPage({ params }: KeyPageProps) {
  const key = find((await params).model);
  if (!key) notFound();
  const siblings = KEY_MODELS.filter((other) => other.slug !== key.slug);
  const id = `view-key-${key.slug}`;

  return (
    <>
      <div id={id}>
        <section className="page-hero" data-nav="dark">
          <div className="wrap">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <Link href="/products">Products</Link>
              <span className="sep">/</span>
              <Link href="/products/passwordless-keys">Passwordless Keys</Link>
              <span className="sep">/</span>
              <span className="cur">{key.name}</span>
            </nav>
            <h1 className="h-display">{key.name}</h1>
            <div className="pmeta">
              <span className="ptag">{key.tag}</span>
              <span className="ptag">FIDO2</span>
              <span className="ptag">Delivered and supported by XSignOn</span>
            </div>
          </div>
        </section>
        <div data-nav="light">
          <section className="page-sec">
            <div className="wrap">
              <div className="body-copy">
                <p>
                  <b>{key.line}</b> {key.feat}
                </p>
              </div>
              <div className="key-viz" aria-hidden="true">
                <span className="kv-key">{key.name.replace("AUTH ", "")}</span>
                <p>Ideal for: {key.ideal}</p>
              </div>
            </div>
          </section>
          <section className="page-sec">
            <div className="wrap">
              <div className="sec-head">
                <h2 className="h2">Documentation</h2>
              </div>
              <div data-tabs>
                <div className="tabs" role="tablist" aria-label={`${key.name} documentation`}>
                  {KEY_TABS.map((tab, i) => (
                    <button
                      key={tab}
                      className="tab-btn"
                      role="tab"
                      aria-selected={i === 0}
                      data-tab={i}
                      type="button"
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {KEY_TABS.map((tab, i) => (
                  <div className="tab-panel" data-panel={i} hidden={i !== 0} key={tab}>
                    {tabText(key, i)}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="page-sec">
            <div className="wrap">
              <div className="sec-head">
                <h2 className="h2">Specifications</h2>
              </div>
              <div className="tbl-wrap">
                <table className="spec">
                  <tbody>
                    <tr>
                      <th scope="row">Sign-in method</th>
                      <td>{key.method}</td>
                    </tr>
                    <tr>
                      <th scope="row">Form factor</th>
                      <td>
                        <span className="confirm">Confirm spec</span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Interface</th>
                      <td>
                        <span className="confirm">Confirm spec</span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">FIDO2 certification</th>
                      <td>FIDO2 certified</td>
                    </tr>
                    <tr>
                      <th scope="row">Delivered and supported by XSignOn</th>
                      <td>Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="lede" style={{ marginTop: "22px", maxWidth: "760px" }}>
                Cells marked for confirmation are verified against your identity provider and device
                mix before any hardware is ordered.
              </p>
            </div>
          </section>
          <section className="page-sec">
            <div className="wrap">
              <div className="sec-head">
                <h2 className="h2">Related</h2>
              </div>
              <Link className="rel-row" href="/products/passwordless-keys">
                <span className="t">Passwordless Keys</span>
                <span className="d">Product</span>
              </Link>
              <Link className="rel-row" href="/products/ams">
                <span className="t">AMS</span>
                <span className="d">Product</span>
              </Link>
              {siblings.map((other) => (
                <Link
                  className="rel-row"
                  href={`/products/passwordless-keys/${other.slug}`}
                  key={other.slug}
                >
                  <span className="t">{other.name}</span>
                  <span className="d">Key</span>
                </Link>
              ))}
              <Link className="rel-row" href="/proof/securing-bank-access-fido2">
                <span className="t">Securing Bank Access With FIDO2 Biometric Keys</span>
                <span className="d">Case study</span>
              </Link>
            </div>
          </section>
          <section className="cta-sec sm">
            <div className="wrap">
              <div className="cta-panel plain">
                <h2 className="h2">Get keys that arrive ready to enroll.</h2>
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
      <PrototypeBehaviors root={id} features={["docTabs"]} />
    </>
  );
}
