import Image from "next/image";
import Link from "next/link";
import { PerspectiveGrid } from "@/components/motion/PerspectiveGrid";

// The closing call to action, shared by Home and About so every page ends the same way.
export function ContactCta() {
  return (
    <section className="cta-sec" id="contact" data-nav="dark">
      <div className="wrap">
        <div className="cta-panel rv has-persp">
          <PerspectiveGrid className="bg-persp" horizon={0.28} alpha={1.6} />
          <h2 className="h2">
            Let&apos;s talk about your organization&apos;s security priorities.
          </h2>
          <Link className="btn btn-white" href="/contact">
            Contact us{" "}
            <span className="chev" aria-hidden="true">
              &#8250;
            </span>
          </Link>
          <div className="cta-card cta-logo" aria-hidden="true">
            <span className="cl-ring r1"></span>
            <span className="cl-ring r2"></span>
            <Image src="/images/home/img-990ffb0c.png" alt="" width={760} height={198} />
          </div>
        </div>
      </div>
    </section>
  );
}
