import Link from "next/link";
import type { HomeCta } from "@/types/home";

interface HomeCtaBandProps {
  cta: HomeCta;
}

// T-095: Home Contact CTA band
export function HomeCtaBand({ cta }: HomeCtaBandProps) {
  return (
    <section className="cta-sec" id="contact" data-nav="light">
      <div className="wrap mx-auto max-w-[1280px] px-6">
        <div className="cta-panel rv has-persp">
          <h2 className="h2">{cta.title}</h2>
          {cta.subtitle && (
            <p className="text-white/70 max-w-xl text-base -mt-2">
              {cta.subtitle}
            </p>
          )}
          <Link className="btn btn-white" href={cta.buttonHref}>
            {cta.buttonText} <span className="chev" aria-hidden="true">›</span>
          </Link>
          <div className="cta-card cta-logo" aria-hidden="true">
            <span className="cl-ring r1" />
            <span className="cl-ring r2" />
            <div className="w-16 h-16 rounded-full bg-coral/20 border border-coral flex items-center justify-center font-bold text-coral text-lg shadow-lg">
              XS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
