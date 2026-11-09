"use client";

interface MarqueeStripProps {
  standards?: string[];
}

const defaultStandards = ["FIDO2", "SOC 2", "ISO 27001", "NIST AI-RMF", "NIST 800-207", "GDPR"];

// T-091, T-141: Standards marquee strip with reduced motion support
export function MarqueeStrip({ standards = defaultStandards }: MarqueeStripProps) {
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
        </div>
        <div className="marquee">
          <div className="mq-track" aria-hidden="true">
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
