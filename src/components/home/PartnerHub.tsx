"use client";

import { useEffect, useState } from "react";
import type { HomePartnerCategory } from "@/types/home";

interface PartnerHubProps {
  categories?: HomePartnerCategory[];
}

const defaultCategories: HomePartnerCategory[] = [
  {
    id: "microseg",
    label: "Micro-segmentation",
    fromPartners: ["Workload labels", "Flow telemetry", "Enforcement points"],
    inXSignOn: ["Identity binding", "Attestation events", "Audit timeline"],
    deliveredThrough: ["PostureOne", "XSense"],
    detailText:
      "Network micro-segmentation telemetry feeds into XSignOn to map network flows to verified identities and posture states.",
  },
  {
    id: "data-ai",
    label: "Data + AI security",
    fromPartners: ["Prompt evaluations", "Data classification", "Model registry"],
    inXSignOn: ["Agent identities", "Owner sign-offs", "Review cycles"],
    deliveredThrough: ["EvalOne", "PostureOne"],
    detailText:
      "AI security scanners and data classifications connect directly into EvalOne to assemble human-reviewed evidence packs.",
  },
  {
    id: "biometrics",
    label: "Hardware biometrics",
    fromPartners: ["FIDO2 authenticators", "Biometric matches", "Firmware attestation"],
    inXSignOn: ["Enrollment records", "Lifecycle state", "Audit evidence"],
    deliveredThrough: ["Passwordless Keys", "AMS"],
    detailText:
      "Certified biometric authenticators pair with AMS for hands-free organizational provisioning and revocation.",
  },
  {
    id: "quantum",
    label: "Quantum-safe",
    fromPartners: ["Post-quantum crypto", "Hybrid key exchange", "Entropy sources"],
    inXSignOn: ["Algorithm inventory", "Migration status", "Policy guardrails"],
    deliveredThrough: ["PostureOne", "XSense"],
    detailText:
      "Quantum-resilient algorithm discovery feeds into PostureOne dashboards to plan safe cryptographic transitions.",
  },
];

// T-093: Build the partner ecosystem hub
// Invariant: All partner links and categories reachable without waiting for rotation.
export function PartnerHub({ categories = defaultCategories }: PartnerHubProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = categories.length;

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % total);
    }, 7000);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  const current = categories[activeTab] ?? categories[0];

  return (
    <section className="block py-16 bg-white" id="partners" data-nav="light">
      <div className="wrap mx-auto max-w-[1280px] px-6">
        <div className="sec-row mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-navy">Partner ecosystem</h2>
            <p className="text-slate-500 mt-1">Works alongside the tools your teams already use</p>
          </div>
        </div>

        <div className="hubx" id="partnerHub">
          {/* Tablist for partner categories */}
          <div className="hubx-tabs" role="tablist" aria-label="Partner type">
            {categories.map((cat, idx) => {
              const isSelected = idx === activeTab;
              return (
                <button
                  key={cat.id}
                  className="hubx-tab"
                  type="button"
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => {
                    setActiveTab(idx);
                    setIsPaused(true);
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* SVG Visual connection curves */}
          <svg
            className="hubx-top"
            viewBox="0 0 600 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className={`hx-conn ${activeTab === 0 ? "on" : ""}`}
              d="M75 0 C75 50, 240 40, 300 96"
            />
            <path
              className={`hx-conn ${activeTab === 1 ? "on" : ""}`}
              d="M225 0 C225 52, 285 46, 300 96"
            />
            <path
              className={`hx-conn ${activeTab === 2 ? "on" : ""}`}
              d="M375 0 C375 52, 315 46, 300 96"
            />
            <path
              className={`hx-conn ${activeTab === 3 ? "on" : ""}`}
              d="M525 0 C525 50, 360 40, 300 96"
            />
            {!isPaused && (
              <path
                className="hx-pulse"
                pathLength="100"
                d={
                  activeTab === 0
                    ? "M75 0 C75 50, 240 40, 300 96"
                    : activeTab === 1
                    ? "M225 0 C225 52, 285 46, 300 96"
                    : activeTab === 2
                    ? "M375 0 C375 52, 315 46, 300 96"
                    : "M525 0 C525 50, 360 40, 300 96"
                }
              />
            )}
          </svg>

          {/* Core interactive middle stage */}
          <div
            className="hubx-mid"
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
          >
            <div className="hubx-box">
              <div className="hubx-label">From partners</div>
              <div className="hubx-rows">
                {current.fromPartners.map((item) => (
                  <span key={item}>
                    <i className="w-1.5 h-1.5 rounded-full bg-coral inline-block mr-2" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="hubx-centre">
              <span className="hx-ring r1" />
              <span className="hx-ring r2" />
              <span className="hx-ring r3" />
              <div className="hubx-core" role="img" aria-label="XSignOn">
                <span>XS</span>
              </div>
            </div>

            <div className="hubx-box">
              <div className="hubx-label">Lands in XSignOn</div>
              <div className="hubx-rows">
                {current.inXSignOn.map((item) => (
                  <span key={item}>
                    <i className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block mr-2" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery platforms */}
          <div className="hubx-plat" aria-label="Where it shows up">
            <span className="text-xs text-white/50 uppercase tracking-wider self-center mr-2">
              Delivered through:
            </span>
            {current.deliveredThrough.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>

          {/* Dynamic description */}
          <p className="hubx-detail" id="hubxDetail" aria-live="polite">
            {current.detailText}
          </p>

          {/* Timer and visible Pause control */}
          <div className="hubx-foot">
            <div className="hubx-timer" aria-hidden="true">
              <i style={{ animationPlayState: isPaused ? "paused" : "running" }} />
            </div>
            <button
              className="hubx-pause"
              id="hubxPause"
              type="button"
              aria-pressed={isPaused}
              aria-label={isPaused ? "Resume partner rotation" : "Pause partner rotation"}
              onClick={() => setIsPaused((prev) => !prev)}
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
          </div>
        </div>

        {/* Semantic fallback listing all partners to guarantee zero rotation gating (T-093) */}
        <div className="sr-only">
          <h3>All Partner Ecosystem Capabilities</h3>
          <ul>
            {categories.map((cat) => (
              <li key={`sr-${cat.id}`}>
                <h4>{cat.label}</h4>
                <p>{cat.detailText}</p>
                <p>From partners: {cat.fromPartners.join(", ")}</p>
                <p>In XSignOn: {cat.inXSignOn.join(", ")}</p>
                <p>Delivered through: {cat.deliveredThrough.join(", ")}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
