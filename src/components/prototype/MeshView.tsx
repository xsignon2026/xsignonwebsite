import Link from "next/link";
import { ProductBand, ProductHeroImage } from "@/components/prototype/ProductVisuals";
import { MeshLogo } from "@/components/common/MeshLogo";

// The XSignOn Mesh product page, in the same layout as the other product pages.
export function MeshView() {
  return (
    <div id="view-xsignon-mesh">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <span className="cur">XSignOn Mesh</span>
          </nav>
          <div className="ph-split">
            <div className="ph-text">
              <div className="mesh-title">
                <span className="mesh-logo" style={{ color: "#fff" }}>
                  <MeshLogo size={64} title="XSignOn Mesh logo" />
                </span>
                <h1 className="h-display">XSignOn Mesh</h1>
              </div>
              <div className="pmeta">
                <span className="ptag">Micro-segmentation</span>
                <span className="ptag">Containment</span>
                <span className="ptag">Zero trust</span>
              </div>
            </div>
            <ProductHeroImage slug="mesh" />
          </div>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="body-copy">
              <p>
                <b>XSignOn Mesh is the micro-segmentation and containment product from XSignOn.</b>{" "}
                It divides an environment into small, controlled zones, sets the policy for every
                flow between them, and contains a threat before it can spread. Its zone maps,
                policies and containment events feed the posture view in PostureOne.
              </p>
              <p>
                Segmentation works <b>alongside the tools your teams already use</b>, so nothing has
                to be replaced to start.
              </p>
            </div>
            <div className="key-viz rv" aria-hidden="true">
              <span className="kv-key">XM</span>
              <p>
                Zones, flows and containment events in one map, feeding the evidence your governance
                reviews rely on.
              </p>
            </div>
          </div>
        </section>
        <ProductBand slug="mesh" />
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Documentation</h2>
            </div>
            <div data-tabs>
              <div className="tabs" role="tablist" aria-label="XSignOn Mesh documentation">
                <button className="tab-btn" role="tab" aria-selected="true" data-tab="0">
                  Product Details
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="1">
                  Overview
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="2">
                  Features
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="3">
                  Deployment
                </button>
              </div>
              <div className="tab-panel" data-panel="0">
                <p>
                  <b>XSignOn Mesh is the micro-segmentation and containment product.</b> It maps
                  zones and flows, applies segmentation policy and records containment events.
                </p>
              </div>
              <div className="tab-panel" data-panel="1" hidden>
                <p>
                  <b>Overview.</b> Mesh shows which systems talk to which, proposes zones and flow
                  policy, and limits movement between zones so a single failure stays small.
                </p>
              </div>
              <div className="tab-panel" data-panel="2" hidden>
                <p>
                  <b>Features</b> include zone and flow maps, segmentation policy, containment
                  events and evidence that feeds PostureOne.{" "}
                  <span className="confirm">Feature list confirmed at release</span>
                </p>
              </div>
              <div className="tab-panel" data-panel="3" hidden>
                <p>
                  <b>Deployment</b> follows your estate, with details published alongside the
                  product documentation.{" "}
                  <span className="confirm">Deployment details pending publication</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            <Link className="rel-row rv" href="/products/postureone">
              <span className="t">PostureOne</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/products/xsense">
              <span className="t">XSense</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/solutions/enterprise-technology">
              <span className="t">Enterprise Technology</span>
              <span className="d">Solution</span>
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
              <h2 className="h2">Contain risk before it spreads.</h2>
              <Link className="btn btn-white" href="/contact">
                Contact us{" "}
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
