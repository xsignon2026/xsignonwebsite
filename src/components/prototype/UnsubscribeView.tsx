import Link from "next/link";
import { Suspense } from "react";
import { UnsubscribeForm } from "@/app/unsubscribe/UnsubscribeForm";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function UnsubscribeView() {
  return (
    <div id="view-unsubscribe">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Unsubscribe</span>
          </nav>
          <h1 className="h-display">Unsubscribe</h1>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div style={{ maxWidth: "560px" }}>
              <Suspense fallback={null}>
                <UnsubscribeForm />
              </Suspense>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
