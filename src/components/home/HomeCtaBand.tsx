import Link from "next/link";
import type { HomeCta } from "@/types/home";
import { PerspectiveGrid } from "@/components/motion/PerspectiveGrid";

interface HomeCtaBandProps {
  cta: HomeCta;
}

// T-095, T-139, T-140: Home Contact CTA band with perspective floor grid
export function HomeCtaBand({ cta }: HomeCtaBandProps) {
  return (
    <section className="cta-sec" id="contact" data-nav="light">
      <div className="wrap mx-auto max-w-[1280px] px-6">
        <div className="cta-panel rv has-persp relative overflow-hidden">
          <PerspectiveGrid horizon={0.35} alpha={0.6} />
          <h2 className="h2 relative z-10">{cta.title}</h2>
          {cta.subtitle && (
            <p className="text-white/70 max-w-xl text-base -mt-2 relative z-10">
              {cta.subtitle}
            </p>
          )}
          <Link className="btn btn-white relative z-10" href={cta.buttonHref}>
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
