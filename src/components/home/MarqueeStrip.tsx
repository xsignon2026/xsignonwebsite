"use client";

import { useState } from "react";

interface MarqueeStripProps {
  standards?: string[];
}

const defaultStandards = ["FIDO2", "SOC 2", "ISO 27001", "NIST AI-RMF", "NIST 800-207", "GDPR"];

// T-091, T-141: Standards marquee strip with visible pause controls and reduced motion support
export function MarqueeStrip({ standards = defaultStandards }: MarqueeStripProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="strip" data-nav="dark" role="region" aria-label="Frameworks we align with">
      <div className="wrap mx-auto max-w-[1280px] px-6">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "12px",
          }}
        >
          <p className="strip-label" style={{ margin: 0 }}>
            Aligned with the frameworks your auditors ask about
          </p>
          <button
            className="mq-pause"
            id="mqPause"
            type="button"
            aria-pressed={isPaused}
            aria-label={isPaused ? "Resume marquee scrolling" : "Pause marquee scrolling"}
            onClick={() => setIsPaused((p) => !p)}
            style={{
              padding: "4px 12px",
              borderRadius: "999px",
              border: "1px solid var(--line-d, rgba(255,255,255,0.14))",
              background: "transparent",
              color: "#b4bfd3",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {isPaused ? "▶ Resume" : "⏸ Pause"}
          </button>
        </div>
        <div className="marquee">
          <div
            className="mq-track"
            aria-hidden="true"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            <div className="mq-set">
              {standards.map((std, i) => (
                <span key={`mq1-${std}-${i}`} className="inline-flex items-center gap-6">
                  <span>{std}</span>
                  <i className="mq-dot" />
                </span>
              ))}
            </div>
            <div className="mq-set">
              {standards.map((std, i) => (
                <span key={`mq2-${std}-${i}`} className="inline-flex items-center gap-6">
                  <span>{std}</span>
                  <i className="mq-dot" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
