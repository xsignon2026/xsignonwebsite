import React from "react";
import type { ProductKeyViz as KeyVizType } from "@/types/product";

type ProductKeyVizProps = {
  keyViz: KeyVizType;
};

// S-14 / T-084: Key visual component matching xsignon-home-beams.html (.key-viz, .kv-key).
export function ProductKeyViz({ keyViz }: ProductKeyVizProps) {
  if (!keyViz) return null;

  return (
    <div
      aria-hidden="true"
      className="mt-8 flex flex-wrap sm:flex-nowrap items-center gap-4 rounded-xl bg-soft p-5 max-w-2xl border border-line/40"
    >
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-acc text-white font-bold text-xl shadow-xs">
        {keyViz.badge}
      </div>
      <p className="text-sm md:text-base text-gray leading-relaxed m-0">{keyViz.description}</p>
    </div>
  );
}
