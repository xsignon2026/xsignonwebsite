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
            <p className="text-white/70 max-w-xl text-base -mt-2 relative z-10">{cta.subtitle}</p>
          )}
          <Link className="btn btn-white relative z-10" href={cta.buttonHref}>
            {cta.buttonText}{" "}
            <span className="chev" aria-hidden="true">
              ›
            </span>
          </Link>
          {/* 11.3 Authentic Logo Tile (hidden on narrow screens) */}
          <div
            className="cta-card cta-logo hidden lg:flex items-center justify-center absolute right-12 top-1/2 -translate-y-1/2 w-[340px] h-[240px] rounded-2xl border border-[#25205c] shadow-2xl overflow-hidden pointer-events-none"
            style={{
              background:
                "radial-gradient(260px 180px at 50% 50%, rgba(198, 0, 29, 0.18), transparent 70%), #0f0a3a",
              boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
            }}
            aria-hidden="true"
          >
            {/* Concentric rings */}
            <span
              className="absolute w-[210px] h-[210px] rounded-full border border-[#25205c]"
              style={{ pointerEvents: "none" }}
            />
            <span
              className="absolute w-[320px] h-[320px] rounded-full border border-[#25205c]"
              style={{ pointerEvents: "none" }}
            />
            {/* White XSignOn wordmark */}
            <div className="relative z-10 flex items-center gap-3">
              <span className="text-2xl font-bold tracking-tight text-white">
                XSign<span className="text-[#ff6a82]">On</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
