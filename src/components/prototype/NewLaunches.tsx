import Image from "next/image";
import Link from "next/link";
import { NewLaunchesFx } from "@/components/prototype/NewLaunchesFx";

// "New launches" on the Products page: the three newest products as large cards, the picture on one side and
// the text on the other, alternating. For now this list is edited here; later it can come from the CMS. The
// pictures are the ones the existing product cards already use.

export type Launch = {
  name: string;
  tag: string;
  text: string;
  href: string;
  cta: string;
  image: { src: string; alt: string };
};

export const launches: ReadonlyArray<Launch> = [
  {
    name: "XSignOn Mesh",
    tag: "Micro-segmentation",
    text: "Micro-segmentation and containment that keeps one failure small, with zone and flow maps that feed your posture view.",
    href: "/products/xsignon-mesh",
    cta: "Explore XSignOn Mesh",
    image: { src: "/images/products/img-86bd27dc.jpg", alt: "An analytics dashboard on a screen" },
  },
  {
    name: "Passwordless Keys",
    tag: "Passwordless",
    text: "Passkeys, biometrics and hardware keys in one calm sign-in flow, so people prove who they are without a password.",
    href: "/products/passwordless-keys",
    cta: "Explore the keys",
    image: {
      src: "/images/products/img-80a343ae.jpg",
      alt: "A person signing in with a fingerprint on a phone",
    },
  },
  {
    name: "EvalOne",
    tag: "AI evaluation",
    text: "Agents evaluated with structured checks, evidence and a named reviewer, ready for the people who sign off.",
    href: "/products/evalone",
    cta: "Explore EvalOne",
    image: {
      src: "/images/products/img-b5d58838.jpg",
      alt: "A team reviewing work together in a workshop",
    },
  },
];

export function NewLaunches() {
  return (
    <section
      className="page-sec"
      id="newLaunches"
      style={{ paddingTop: "72px", paddingBottom: "0" }}
    >
      <div className="wrap">
        <div className="sec-row rv">
          <h2 className="h2">New launches</h2>
        </div>
        <ul className="nl-list" id="nlList">
          {launches.map((p, i) => (
            <li
              key={p.name}
              className="nl-card"
              data-flip={i % 2 === 1 || undefined}
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="nl-img">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  width={1600}
                  height={1067}
                  sizes="(max-width: 900px) 100vw, 640px"
                />
              </div>
              <div className="nl-body">
                <span className="nl-tag">{p.tag}</span>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <Link className="link-arrow" href={p.href}>
                  {p.cta}{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <NewLaunchesFx />
      </div>
    </section>
  );
}
