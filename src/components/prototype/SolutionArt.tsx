// The animated graphic for each solution, as drawn in the approved prototype. The prototype shows it on
// the Home journey and again on each Solutions hub card. Converted by compare/html2jsx.py.
export type SolutionArtName =
  "sol-identity" | "sol-ai" | "sol-quantum" | "sol-process" | "sol-enterprise";

export function SolutionArt({ name }: { name: SolutionArtName }) {
  switch (name) {
    case "sol-identity":
      return (
        <figure className="j-art">
          <svg
            viewBox="0 0 400 228"
            role="img"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Identity graph: staff, devices and AI agents connected to one governed core, each with a named owner"
          >
            <g className="art-ln art-fl">
              <path d="M200 96 L78 52" />
              <path d="M200 96 L322 52" />
              <path d="M200 96 L200 172" />
            </g>
            <circle className="art-pulse art-hotfill" cx="200" cy="96" r="28" opacity=".5" />
            <circle className="art-nd art-hot" cx="200" cy="96" r="28" />
            <path
              className="art-ln art-hot"
              d="M200 82l12 4.5v9.5c0 7-5 11-12 14.5-7-3.5-12-7.5-12-14.5v-9.5z"
            />
            <circle className="art-nd" cx="78" cy="52" r="21" />
            <circle className="art-ln" cx="78" cy="46" r="6" />
            <path className="art-ln" d="M66 62c2-7 6-10 12-10s10 3 12 10" />
            <rect className="art-nd" x="300" y="34" width="44" height="36" rx="8" />
            <path className="art-ln" d="M310 62h24M322 70v4" />
            <circle className="art-nd" cx="200" cy="172" r="21" />
            <path className="art-ln" d="M200 160l10 6v12l-10 6-10-6v-12z" />
            <text className="art-tx" x="78" y="92" textAnchor="middle">
              Staff
            </text>
            <text className="art-tx" x="322" y="92" textAnchor="middle">
              Devices
            </text>
            <text className="art-tx" x="200" y="208" textAnchor="middle">
              AI agents
            </text>
            <g transform="translate(86 126)">
              <rect className="art-nd" width="82" height="20" rx="10" />
              <text
                className="art-tx2"
                x="41"
                y="14"
                textAnchor="middle"
                style={{ fontSize: "10.5px" }}
              >
                Named owner
              </text>
            </g>
          </svg>
          <figcaption className="j-by">
            <span>Delivered by</span>
            <b>PostureOne</b>
            <b>AMS</b>
            <b>Passwordless Keys</b>
          </figcaption>
        </figure>
      );
    case "sol-ai":
      return (
        <figure className="j-art">
          <svg
            viewBox="0 0 400 228"
            role="img"
            preserveAspectRatio="xMidYMid meet"
            aria-label="AI governance: an AI system with an owner mapped to inventory, frameworks and current evidence"
          >
            <g className="art-ln art-fl">
              <path d="M110 98 C150 98 150 44 188 44" />
              <path d="M110 98 L188 98" />
              <path d="M110 98 C150 98 150 152 188 152" />
            </g>
            <circle className="art-pulse art-hotfill" cx="80" cy="98" r="30" opacity=".5" />
            <path className="art-nd art-hot" d="M80 68l26 15v30L80 128 54 113V83z" />
            <text
              className="art-tx2"
              x="80"
              y="103"
              textAnchor="middle"
              style={{ fontSize: "15px" }}
            >
              AI
            </text>
            <g>
              <rect className="art-nd" x="188" y="28" width="186" height="32" rx="9" />
              <text className="art-tx2" x="204" y="48">
                Inventory with owners
              </text>
              <circle className="art-nd" cx="354" cy="44" r="9" />
              <path className="art-ln" d="m349.5 44 3.2 3.2 5.2-6" />
            </g>
            <g>
              <rect className="art-nd" x="188" y="82" width="186" height="32" rx="9" />
              <text className="art-tx2" x="204" y="102">
                Mapped to frameworks
              </text>
              <circle className="art-nd" cx="354" cy="98" r="9" />
              <path className="art-ln" d="m349.5 98 3.2 3.2 5.2-6" />
            </g>
            <g>
              <rect className="art-nd art-hot" x="188" y="136" width="186" height="32" rx="9" />
              <text className="art-tx2" x="204" y="156">
                Evidence kept current
              </text>
              <circle className="art-nd art-hot" cx="354" cy="152" r="9" />
              <path className="art-ln art-hot" d="m349.5 152 3.2 3.2 5.2-6" />
            </g>
          </svg>
          <figcaption className="j-by">
            <span>Delivered by</span>
            <b>EvalOne</b>
            <b>PostureOne</b>
          </figcaption>
        </figure>
      );
    case "sol-quantum":
      return (
        <figure className="j-art">
          <svg
            viewBox="0 0 400 228"
            role="img"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Quantum-safe plan: inventory, prioritize, then migrate"
          >
            <g className="art-ln art-fl">
              <path d="M96 104 L174 104" />
              <path d="M226 104 L304 104" />
            </g>
            <circle className="art-nd" cx="70" cy="104" r="26" />
            <g className="art-ln">
              <rect x="58" y="92" width="10" height="10" rx="2" />
              <rect x="72" y="92" width="10" height="10" rx="2" />
              <rect x="58" y="106" width="10" height="10" rx="2" />
              <rect x="72" y="106" width="10" height="10" rx="2" />
            </g>
            <circle className="art-nd" cx="200" cy="104" r="26" />
            <path className="art-ln" d="M186 94h28M186 104h20M186 114h12" />
            <circle className="art-pulse art-hotfill" cx="330" cy="104" r="26" opacity=".5" />
            <circle className="art-nd art-hot" cx="330" cy="104" r="26" />
            <path className="art-ln art-hot" d="M318 104h24m-8-8 8 8-8 8" />
            <text className="art-tx" x="70" y="150" textAnchor="middle">
              Inventory
            </text>
            <text className="art-tx" x="200" y="150" textAnchor="middle">
              Prioritize
            </text>
            <text className="art-tx2" x="330" y="150" textAnchor="middle">
              Migrate
            </text>
            <g transform="translate(284 40)">
              <rect className="art-nd art-hot" width="92" height="22" rx="11" />
              <text
                className="art-tx2"
                x="46"
                y="15"
                textAnchor="middle"
                style={{ fontSize: "10.5px" }}
              >
                Post-quantum
              </text>
            </g>
          </svg>
          <figcaption className="j-by">
            <span>Delivered by</span>
            <b>PostureOne</b>
            <b>Passwordless Keys</b>
          </figcaption>
        </figure>
      );
    case "sol-process":
      return (
        <figure className="j-art">
          <svg
            viewBox="0 0 400 228"
            role="img"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Governed review cycle: review, approve, record evidence, repeat"
          >
            <circle className="art-ln art-fl" cx="200" cy="106" r="64" />
            <circle className="art-nd" cx="200" cy="42" r="19" />
            <path className="art-ln" d="M191 42l6 6 11-12" />
            <circle className="art-nd" cx="255" cy="138" r="19" />
            <path className="art-ln" d="M246 138l6 6 11-12" />
            <circle className="art-nd art-hot" cx="145" cy="138" r="19" />
            <path className="art-ln art-hot" d="M136 138l6 6 11-12" />
            <circle className="art-pulse art-hotfill" cx="145" cy="138" r="19" opacity=".5" />
            <text className="art-tx2" x="200" y="18" textAnchor="middle">
              Review
            </text>
            <text className="art-tx2" x="292" y="176" textAnchor="middle">
              Approve
            </text>
            <text className="art-tx2" x="108" y="176" textAnchor="middle">
              Evidence
            </text>
            <text className="art-tx" x="200" y="110" textAnchor="middle">
              One cycle
            </text>
          </svg>
          <figcaption className="j-by">
            <span>Delivered by</span>
            <b>PostureOne</b>
            <b>AMS</b>
          </figcaption>
        </figure>
      );
    case "sol-enterprise":
      return (
        <figure className="j-art">
          <svg
            viewBox="0 0 400 228"
            role="img"
            preserveAspectRatio="xMidYMid meet"
            aria-label="One governed layer connecting directories, SaaS, branch terminals and plant systems"
          >
            <g className="art-ln art-fl">
              <path d="M65 50 C65 76 150 70 160 88" />
              <path d="M155 50 C155 76 180 70 184 88" />
              <path d="M245 50 C245 76 220 70 216 88" />
              <path d="M335 50 C335 76 250 70 240 88" />
              <path d="M200 128 L200 168" />
            </g>
            <g>
              <rect className="art-nd" x="28" y="20" width="74" height="30" rx="9" />
              <text className="art-tx" x="65" y="39" textAnchor="middle">
                Directory
              </text>
            </g>
            <g>
              <rect className="art-nd" x="118" y="20" width="74" height="30" rx="9" />
              <text className="art-tx" x="155" y="39" textAnchor="middle">
                SaaS
              </text>
            </g>
            <g>
              <rect className="art-nd" x="208" y="20" width="74" height="30" rx="9" />
              <text className="art-tx" x="245" y="39" textAnchor="middle">
                Branch
              </text>
            </g>
            <g>
              <rect className="art-nd" x="298" y="20" width="74" height="30" rx="9" />
              <text className="art-tx" x="335" y="39" textAnchor="middle">
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
              opacity=".35"
            />
            <rect className="art-nd art-hot" x="110" y="88" width="180" height="40" rx="12" />
            <text className="art-tx2" x="200" y="113" textAnchor="middle">
              One governed layer
            </text>
            <g>
              <rect className="art-nd" x="130" y="168" width="140" height="28" rx="14" />
              <text
                className="art-tx2"
                x="200"
                y="186"
                textAnchor="middle"
                style={{ fontSize: "11px" }}
              >
                One posture view
              </text>
            </g>
          </svg>
          <figcaption className="j-by">
            <span>Delivered by</span>
            <b>PostureOne</b>
            <b>Passwordless Keys</b>
            <b>AMS</b>
          </figcaption>
        </figure>
      );
  }
}
