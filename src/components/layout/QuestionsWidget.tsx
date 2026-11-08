"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface QuestionItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: QuestionItem[] = [
  {
    q: "How long does a passwordless rollout take?",
    a: "Typical enterprise pilot rollouts take 2 to 4 weeks. Full organization-wide deployments across branch and back-office staff are phased over 60 to 90 days with AMS managing key enrollment, lifecycle, and zero-downtime cutovers.",
  },
  {
    q: "Which frameworks does PostureOne map to?",
    a: "PostureOne continuously maps posture findings, identity inventories, and evidence to FIDO2, SOC 2 Type II, ISO 27001, NIST AI-RMF, NIST 800-207 (Zero Trust Architecture), and GDPR.",
  },
  {
    q: "Do the FIDO2 keys work with our existing identity provider?",
    a: "Yes. XSignOn AUTH biometric keys and passkeys integrate natively with Microsoft Entra ID (Azure AD), Okta, Ping Identity, Google Workspace, and any standard OIDC or SAML 2.0 IdP without modifying your user directories.",
  },
  {
    q: "What happens on a strategy call?",
    a: "A 30-minute structured technical session with a security architect. We review your current sign-in topology, legacy MFA exposure, compliance timeline, and outline an architectural migration roadmap with sample hardware keys.",
  },
];

export function QuestionsWidget(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(0);
  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const isFirstRender = useRef(true);

  // Focus management & Escape key handling
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isOpen) {
      closeBtnRef.current?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
          launcherRef.current?.focus();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    } else {
      launcherRef.current?.focus();
    }
  }, [isOpen]);

  const toggleAccordion = (idx: number) => {
    setActiveIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <>
      {/* 5.7 Fixed Launcher Button */}
      <button
        ref={launcherRef}
        type="button"
        id="questionsLauncher"
        aria-expanded={isOpen}
        aria-controls="questionsPanel"
        aria-label="Open questions dialog"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          zIndex: 100,
          background: "var(--acc, #c6001d)",
          color: "#ffffff",
          font: "600 15px/1.2 Inter, system-ui, sans-serif",
          padding: "13px 22px",
          borderRadius: "999px",
          border: "1px solid rgba(255, 255, 255, 0.22)",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.35)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          transition: "background 0.25s ease, transform 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--acc-hov, #9e0017)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--acc, #c6001d)";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.97)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>Questions</span>
      </button>

      {/* 5.7 Modal Dialog Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          id="questionsPanel"
          role="dialog"
          aria-modal="true"
          aria-label="Questions teams ask before deploying"
          style={{
            position: "fixed",
            right: "24px",
            bottom: "86px",
            zIndex: 100,
            width: "min(380px, calc(100vw - 32px))",
            maxHeight: "min(580px, calc(100vh - 120px))",
            background: "var(--d3, #0f0a3a)",
            border: "1px solid #6f7c97",
            borderRadius: "16px",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header row */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--d2, #060129)",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "17px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.01em",
              }}
            >
              Questions before deploying
            </h3>
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close questions dialog"
              onClick={() => setIsOpen(false)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "transparent",
                border: "1px solid #6f7c97",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              ✕
            </button>
          </div>

          {/* Accordion List */}
          <div
            style={{
              overflowY: "auto",
              flex: 1,
              padding: "8px 0",
            }}
          >
            {FAQ_ITEMS.map((item, idx) => {
              const isItemOpen = activeIdx === idx;
              return (
                <div
                  key={item.q}
                  style={{
                    borderBottom:
                      idx < FAQ_ITEMS.length - 1
                        ? "1px solid rgba(255, 255, 255, 0.12)"
                        : "none",
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isItemOpen}
                    onClick={() => toggleAccordion(idx)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "14px 20px",
                      background: "transparent",
                      border: "none",
                      color: isItemOpen ? "#ffffff" : "#f6f4fb",
                      fontSize: "15px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <span>{item.q}</span>
                    <span
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        border: "1px solid #6f7c97",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        transform: isItemOpen ? "rotate(45deg)" : "none",
                        transition: "transform 0.25s ease",
                        flexShrink: 0,
                        color: "#b4bfd3",
                      }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  {isItemOpen && (
                    <div
                      style={{
                        padding: "0 20px 16px 20px",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: "#b4bfd3",
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer row */}
          <div
            style={{
              padding: "14px 20px",
              background: "var(--d1, #060129)",
              borderTop: "1px solid rgba(255, 255, 255, 0.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "13px", color: "#b4bfd3" }}>
              Ready to talk architecture?
            </span>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              style={{
                background: "var(--acc, #c6001d)",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: "999px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Book call →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
