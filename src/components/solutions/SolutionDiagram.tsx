import React from "react";
import type { Solution } from "@/types/solution";

interface SolutionDiagramProps {
  diagramKey: Solution["diagramKey"];
  className?: string;
}

export function SolutionDiagram({ diagramKey, className = "" }: SolutionDiagramProps) {
  switch (diagramKey) {
    case "identity":
      return (
        <svg
          viewBox="0 0 400 228"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Identity graph: staff, devices and AI agents connected to one governed core, each with a named owner"
          className={className}
        >
          <g stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none">
            <path d="M200 96 L78 52" />
            <path d="M200 96 L322 52" />
            <path d="M200 96 L200 172" />
          </g>
          <circle className="art-pulse art-hotfill" cx="200" cy="96" r="28" opacity="0.5" />
          <circle cx="200" cy="96" r="28" stroke="#ff5a62" strokeWidth="2" fill="none" />
          <path
            d="M200 82l12 4.5v9.5c0 7-5 11-12 14.5-7-3.5-12-7.5-12-14.5v-9.5z"
            stroke="#ff5a62"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="78"
            cy="52"
            r="21"
            stroke="#9db9f5"
            strokeWidth="1.5"
            fill="rgba(0,18,51,0.8)"
          />
          <circle cx="78" cy="46" r="6" stroke="#9db9f5" strokeWidth="1.5" fill="none" />
          <path
            d="M66 62c2-7 6-10 12-10s10 3 12 10"
            stroke="#9db9f5"
            strokeWidth="1.5"
            fill="none"
          />
          <rect
            x="300"
            y="34"
            width="44"
            height="36"
            rx="8"
            stroke="#9db9f5"
            strokeWidth="1.5"
            fill="rgba(0,18,51,0.8)"
          />
          <path d="M310 62h24M322 70v4" stroke="#9db9f5" strokeWidth="1.5" fill="none" />
          <circle
            cx="200"
            cy="172"
            r="21"
            stroke="#9db9f5"
            strokeWidth="1.5"
            fill="rgba(0,18,51,0.8)"
          />
          <path
            d="M200 160l10 6v12l-10 6-10-6v-12z"
            stroke="#9db9f5"
            strokeWidth="1.5"
            fill="none"
          />
          <text x="78" y="92" textAnchor="middle" fill="#9db9f5" fontSize="12">
            Staff
          </text>
          <text x="322" y="92" textAnchor="middle" fill="#9db9f5" fontSize="12">
            Devices
          </text>
          <text x="200" y="208" textAnchor="middle" fill="#9db9f5" fontSize="12">
            AI agents
          </text>
          <g transform="translate(86 126)">
            <rect
              width="82"
              height="20"
              rx="10"
              stroke="#9db9f5"
              strokeWidth="1"
              fill="rgba(0,18,51,0.8)"
            />
            <text x="41" y="14" textAnchor="middle" fill="#ffffff" fontSize="10.5">
              Named owner
            </text>
          </g>
        </svg>
      );

    case "ai":
      return (
        <svg
          viewBox="0 0 400 228"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          aria-label="AI governance: an AI system with an owner mapped to inventory, frameworks and current evidence"
          className={className}
        >
          <g stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none">
            <path d="M110 98 C150 98 150 44 188 44" />
            <path d="M110 98 L188 98" />
            <path d="M110 98 C150 98 150 152 188 152" />
          </g>
          <circle className="art-pulse art-hotfill" cx="80" cy="98" r="30" opacity="0.5" />
          <path
            d="M80 68l26 15v30L80 128 54 113V83z"
            stroke="#ff5a62"
            strokeWidth="2"
            fill="none"
          />
          <text x="80" y="103" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="bold">
            AI
          </text>
          <g>
            <rect
              x="188"
              y="28"
              width="186"
              height="32"
              rx="9"
              stroke="#9db9f5"
              strokeWidth="1"
              fill="rgba(0,18,51,0.8)"
            />
            <text x="204" y="48" fill="#ffffff" fontSize="12.5">
              Inventory with owners
            </text>
            <circle cx="354" cy="44" r="9" stroke="#9db9f5" strokeWidth="1" fill="none" />
            <path d="m349.5 44 3.2 3.2 5.2-6" stroke="#9db9f5" strokeWidth="1.5" fill="none" />
          </g>
          <g>
            <rect
              x="188"
              y="82"
              width="186"
              height="32"
              rx="9"
              stroke="#9db9f5"
              strokeWidth="1"
              fill="rgba(0,18,51,0.8)"
            />
            <text x="204" y="102" fill="#ffffff" fontSize="12.5">
              Mapped to frameworks
            </text>
            <circle cx="354" cy="98" r="9" stroke="#9db9f5" strokeWidth="1" fill="none" />
            <path d="m349.5 98 3.2 3.2 5.2-6" stroke="#9db9f5" strokeWidth="1.5" fill="none" />
          </g>
          <g>
            <rect
              x="188"
              y="136"
              width="186"
              height="32"
              rx="9"
              stroke="#ff5a62"
              strokeWidth="1.5"
              fill="rgba(255,90,98,0.15)"
            />
            <text x="204" y="156" fill="#ffffff" fontSize="12.5">
              Evidence kept current
            </text>
            <circle cx="354" cy="152" r="9" stroke="#ff5a62" strokeWidth="1" fill="none" />
            <path d="m349.5 152 3.2 3.2 5.2-6" stroke="#ff5a62" strokeWidth="1.5" fill="none" />
          </g>
        </svg>
      );

    case "quantum":
      return (
        <svg
          viewBox="0 0 400 228"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Quantum-safe plan: inventory, prioritize, then migrate"
          className={className}
        >
          <g stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none">
            <path d="M96 104 L174 104" />
            <path d="M226 104 L304 104" />
          </g>
          <circle
            cx="70"
            cy="104"
            r="26"
            stroke="#9db9f5"
            strokeWidth="1.5"
            fill="rgba(0,18,51,0.8)"
          />
          <g stroke="#9db9f5" strokeWidth="1.5" fill="none">
            <rect x="58" y="92" width="10" height="10" rx="2" />
            <rect x="72" y="92" width="10" height="10" rx="2" />
            <rect x="58" y="106" width="10" height="10" rx="2" />
            <rect x="72" y="106" width="10" height="10" rx="2" />
          </g>
          <circle
            cx="200"
            cy="104"
            r="26"
            stroke="#9db9f5"
            strokeWidth="1.5"
            fill="rgba(0,18,51,0.8)"
          />
          <path
            d="M186 94h28M186 104h20M186 114h12"
            stroke="#9db9f5"
            strokeWidth="1.5"
            fill="none"
          />
          <circle className="art-pulse art-hotfill" cx="330" cy="104" r="26" opacity="0.5" />
          <circle
            cx="330"
            cy="104"
            r="26"
            stroke="#ff5a62"
            strokeWidth="2"
            fill="rgba(255,90,98,0.2)"
          />
          <path
            d="M330 88l12 7v14l-12 7-12-7v-14z"
            stroke="#ff5a62"
            strokeWidth="1.5"
            fill="none"
          />
          <text x="70" y="146" textAnchor="middle" fill="#9db9f5" fontSize="12">
            Inventory
          </text>
          <text x="200" y="146" textAnchor="middle" fill="#9db9f5" fontSize="12">
            Prioritize
          </text>
          <text x="330" y="146" textAnchor="middle" fill="#ff5a62" fontSize="12">
            Migrate
          </text>
          <g transform="translate(284 40)">
            <rect
              width="92"
              height="22"
              rx="11"
              stroke="#ff5a62"
              strokeWidth="1"
              fill="rgba(255,90,98,0.2)"
            />
            <text x="46" y="15" textAnchor="middle" fill="#ffffff" fontSize="10.5">
              Post-quantum
            </text>
          </g>
        </svg>
      );

    case "process":
      return (
        <svg
          viewBox="0 0 400 228"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Governed review cycle: review, approve, record evidence, repeat"
          className={className}
        >
          <circle
            cx="200"
            cy="106"
            r="64"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="42"
            r="19"
            stroke="#9db9f5"
            strokeWidth="1.5"
            fill="rgba(0,18,51,0.8)"
          />
          <path d="M191 42l6 6 11-12" stroke="#9db9f5" strokeWidth="1.5" fill="none" />
          <circle
            cx="255"
            cy="138"
            r="19"
            stroke="#9db9f5"
            strokeWidth="1.5"
            fill="rgba(0,18,51,0.8)"
          />
          <path d="M246 138l6 6 11-12" stroke="#9db9f5" strokeWidth="1.5" fill="none" />
          <circle className="art-pulse art-hotfill" cx="145" cy="138" r="19" opacity="0.5" />
          <circle cx="145" cy="138" r="19" stroke="#ff5a62" strokeWidth="1.5" fill="none" />
          <path d="M136 138l6 6 11-12" stroke="#ff5a62" strokeWidth="1.5" fill="none" />
          <text x="200" y="18" textAnchor="middle" fill="#ffffff" fontSize="12">
            Review
          </text>
          <text x="292" y="176" textAnchor="middle" fill="#ffffff" fontSize="12">
            Approve
          </text>
          <text x="108" y="176" textAnchor="middle" fill="#ffffff" fontSize="12">
            Evidence
          </text>
          <text x="200" y="110" textAnchor="middle" fill="#9db9f5" fontSize="12">
            One cycle
          </text>
        </svg>
      );

    case "enterprise":
    default:
      return (
        <svg
          viewBox="0 0 400 228"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          aria-label="One governed layer connecting directories, SaaS, branch terminals and plant systems"
          className={className}
        >
          <g stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none">
            <path d="M65 50 C65 76 150 70 160 88" />
            <path d="M155 50 C155 76 180 70 184 88" />
            <path d="M245 50 C245 76 220 70 216 88" />
            <path d="M335 50 C335 76 250 70 240 88" />
            <path d="M200 128 L200 168" />
          </g>
          <g>
            <rect
              x="28"
              y="20"
              width="74"
              height="30"
              rx="9"
              stroke="#9db9f5"
              strokeWidth="1"
              fill="rgba(0,18,51,0.8)"
            />
            <text x="65" y="39" textAnchor="middle" fill="#9db9f5" fontSize="12">
              Directory
            </text>
          </g>
          <g>
            <rect
              x="118"
              y="20"
              width="74"
              height="30"
              rx="9"
              stroke="#9db9f5"
              strokeWidth="1"
              fill="rgba(0,18,51,0.8)"
            />
            <text x="155" y="39" textAnchor="middle" fill="#9db9f5" fontSize="12">
              SaaS
            </text>
          </g>
          <g>
            <rect
              x="208"
              y="20"
              width="74"
              height="30"
              rx="9"
              stroke="#9db9f5"
              strokeWidth="1"
              fill="rgba(0,18,51,0.8)"
            />
            <text x="245" y="39" textAnchor="middle" fill="#9db9f5" fontSize="12">
              Branch
            </text>
          </g>
          <g>
            <rect
              x="298"
              y="20"
              width="74"
              height="30"
              rx="9"
              stroke="#9db9f5"
              strokeWidth="1"
              fill="rgba(0,18,51,0.8)"
            />
            <text x="335" y="39" textAnchor="middle" fill="#9db9f5" fontSize="12">
              Plant
            </text>
          </g>
          <rect
            className="art-pulse art-hotfill"
            x="110"
            y="88"
            width="180"
            height="40"
            rx="12"
            opacity="0.35"
          />
          <rect
            x="110"
            y="88"
            width="180"
            height="40"
            rx="12"
            stroke="#ff5a62"
            strokeWidth="1.5"
            fill="none"
          />
          <text x="200" y="113" textAnchor="middle" fill="#ffffff" fontSize="12.5">
            One governed layer
          </text>
          <g>
            <rect
              x="130"
              y="168"
              width="140"
              height="28"
              rx="14"
              stroke="#9db9f5"
              strokeWidth="1"
              fill="rgba(0,18,51,0.8)"
            />
            <text x="200" y="186" textAnchor="middle" fill="#ffffff" fontSize="11">
              One posture view
            </text>
          </g>
        </svg>
      );
  }
}
