import Link from "next/link";
import React from "react";
import { Container } from "../layout/Container";
import { PerspectiveGrid } from "@/components/motion/PerspectiveGrid";

type CtaSectionProps = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
};

// Handoff section 11 / CSV T-046: CTA Section with Version 2 white background and dark glowing panel.
export function CtaSection({
  title = "Ready to simplify identity and quantum-safe security?",
  subtitle = "Speak with our security architects to evaluate your identity posture and design a migration roadmap.",
  buttonText = "Book a strategy call",
  buttonHref = "/contact",
  className = "",
}: CtaSectionProps) {
  return (
    <section id="cta" data-nav="light" className={`bg-white py-(--section-pad) ${className}`}>
      <Container>
        <div
          className="relative isolate overflow-hidden rounded-card border border-white/20 bg-d1 p-10 md:p-14 text-white shadow-2xl"
          style={{
            backgroundImage:
              "radial-gradient(60% 70% at 100% 0%, var(--g1s), transparent 70%), radial-gradient(60% 70% at 0% 100%, var(--g2s), transparent 70%)",
          }}
        >
          <PerspectiveGrid horizon={0.35} alpha={0.5} />
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
            {/* Left Content */}
            <div className="max-w-2xl">
              <h2 className="text-h2 font-bold tracking-tight text-white leading-tight">{title}</h2>
              <p className="mt-4 text-body text-on-dark-mut leading-relaxed">{subtitle}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={buttonHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-acc px-7 py-3 text-button font-semibold text-white shadow-lg transition-[background-color,transform] duration-280 ease-brand hover:bg-acc-hov active:scale-[.97]"
                >
                  <span>{buttonText}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>

            {/* Right Logo Tile (Hidden at <= 1080px) */}
            <div className="hidden xl:flex h-44 w-44 flex-none items-center justify-center rounded-card border border-d-line bg-d2 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-acc text-[32px] font-black text-white shadow-lg">
                X
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
