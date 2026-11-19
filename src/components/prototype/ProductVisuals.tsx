import Image from "next/image";
import { MeshLogo } from "@/components/common/MeshLogo";

// The pictures and logos on the product pages. The icon is the same mark as the product card on the Home
// page, so a card and its page match. Pictures are chosen here by product; swap a file to change one.

export type ProductVisualSlug = "postureone" | "keys" | "evalone" | "xsense" | "ams" | "mesh";

const NAMES: Record<ProductVisualSlug, string> = {
  postureone: "PostureOne",
  keys: "Passwordless Keys",
  evalone: "EvalOne",
  xsense: "XSense",
  ams: "AMS",
  mesh: "XSignOn Mesh",
};

type Picture = { src: string; alt: string };

const HERO: Record<ProductVisualSlug, Picture> = {
  postureone: {
    src: "/images/products/postureone.jpg",
    alt: "Server racks with network cabling in a data centre",
  },
  keys: {
    src: "/images/products/keys.jpg",
    alt: "A person holding a phone while signing in on a laptop",
  },
  evalone: {
    src: "/images/products/evalone.jpg",
    alt: "A team reviewing notes on a wall in a workshop",
  },
  xsense: {
    src: "/images/products/xsense.jpg",
    alt: "An analytics dashboard with charts on a laptop screen",
  },
  ams: {
    src: "/images/products/ams.jpg",
    alt: "Warehouse shelves of tracked inventory and parts",
  },
  mesh: {
    src: "/images/home/img-d10eb158.jpg",
    alt: "A person with a laptop beside a lit row of server racks",
  },
};

const BAND: Record<ProductVisualSlug, Picture> = {
  postureone: {
    src: "/images/home/img-bedb86b4.jpg",
    alt: "Glass office towers seen from street level",
  },
  keys: {
    src: "/images/products/img-2c6f4413.jpg",
    alt: "A brass combination padlock resting on a keyboard beside bank cards",
  },
  evalone: {
    src: "/images/home/img-1a9a6905.jpg",
    alt: "An engineer working on a laptop among equipment and cabling",
  },
  xsense: {
    src: "/images/home/img-74215995.jpg",
    alt: "A glowing circuit diagram on a glass panel",
  },
  ams: {
    src: "/images/home/img-ccd69738.jpg",
    alt: "The back of a server unit with fans and cabling",
  },
  mesh: {
    src: "/images/home/img-bedb86b4.jpg",
    alt: "Glass office towers seen from street level",
  },
};

/** The product's line mark, the same as on its Home page card. */
export function ProductIcon({ slug, size = 72 }: { slug: ProductVisualSlug; size?: number }) {
  if (slug === "mesh") {
    return (
      <span className="ph-icon" style={{ width: size, height: size, color: "#fff" }}>
        <MeshLogo size={size} />
      </span>
    );
  }
  return (
    <span className="ph-icon" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 96 96"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="10" y="10" width="76" height="76" rx="16" />
        {slug === "postureone" && (
          <>
            <line x1="48" y1="10" x2="48" y2="86" />
            <line x1="10" y1="48" x2="86" y2="48" />
            <path
              d="M48 10 H70 a16 16 0 0 1 16 16 V48 H48 Z"
              stroke="currentColor"
              className="acc"
            />
            <circle cx="29" cy="29" r="4" />
            <circle cx="67" cy="29" r="4" />
            <circle cx="29" cy="67" r="4" />
            <circle cx="67" cy="67" r="4" />
            <path
              d="M48 39 l8.5 3.2 V50 c0 5.2-3.6 8.4-8.5 10.5 C43.1 58.4 39.5 55.2 39.5 50 V42.2 Z"
              className="bgfill"
            />
          </>
        )}
        {slug === "keys" && (
          <>
            <path d="M26 72 V52 a22 22 0 0 1 44 0 V72" />
            <path d="M34 72 V52 a14 14 0 0 1 28 0 V72" />
            <path d="M42 70 V52 a6 6 0 0 1 12 0 V70" stroke="currentColor" className="acc" />
          </>
        )}
        {slug === "evalone" && (
          <>
            <circle cx="48" cy="48" r="27" />
            <circle cx="48" cy="48" r="18" />
            <circle cx="48" cy="48" r="9" />
            <path d="M48 21 A27 27 0 0 1 75 48" stroke="currentColor" className="acc" />
            <circle cx="48" cy="48" r="3.5" fill="currentColor" stroke="none" />
          </>
        )}
        {slug === "xsense" && (
          <>
            <circle cx="48" cy="48" r="10" />
            <line x1="61" y1="48" x2="68" y2="48" />
            <line x1="55" y1="59" x2="58" y2="65" />
            <line x1="41" y1="59" x2="38" y2="65" />
            <line x1="35" y1="48" x2="28" y2="48" />
            <line x1="41" y1="37" x2="38" y2="31" />
            <line x1="55" y1="37" x2="58" y2="31" />
            <circle cx="73" cy="48" r="3.5" className="bgfill" />
            <circle cx="61" cy="70" r="3.5" className="bgfill" />
            <circle cx="35" cy="70" r="3.5" className="bgfill" />
            <circle cx="23" cy="48" r="3.5" className="bgfill" />
            <circle cx="35" cy="26" r="3.5" className="bgfill" />
            <circle cx="61" cy="26" r="3.5" className="bgfill acc" stroke="currentColor" />
          </>
        )}
        {slug === "ams" && (
          <>
            <path d="M52.2 24.4 A24 24 0 0 1 71.6 43.8" stroke="currentColor" className="acc" />
            <path d="M71.6 52.2 A24 24 0 0 1 52.2 71.6" />
            <path d="M43.8 71.6 A24 24 0 0 1 24.4 52.2" />
            <path d="M24.4 43.8 A24 24 0 0 1 43.8 24.4" />
            <circle cx="48" cy="48" r="4" fill="currentColor" stroke="none" />
          </>
        )}
      </svg>
    </span>
  );
}

/** The large picture beside the title in the page hero. */
export function ProductHeroImage({ slug }: { slug: ProductVisualSlug }) {
  const pic = HERO[slug];
  return (
    <div className="ph-image">
      <Image src={pic.src} alt={pic.alt} fill priority sizes="(max-width: 900px) 100vw, 520px" />
    </div>
  );
}

/** A wide picture with the product mark and name over it, between the opening and the detail. */
export function ProductBand({ slug }: { slug: ProductVisualSlug }) {
  const pic = BAND[slug];
  return (
    <section className="page-sec ph-band-sec">
      <div className="wrap">
        <figure className="ph-band rv">
          <Image src={pic.src} alt={pic.alt} fill sizes="(max-width: 1200px) 100vw, 1200px" />
          <figcaption>
            <ProductIcon slug={slug} size={52} />
            <span>{NAMES[slug]}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

const GALLERY: Partial<
  Record<ProductVisualSlug, { src: string; alt: string; caption: string; w: number; h: number }[]>
> = {
  keys: [
    {
      src: "/images/products-old/auth-bio.webp",
      alt: "The AUTH Bio biometric security key",
      caption: "AUTH Bio",
      w: 486,
      h: 1100,
    },
    {
      src: "/images/products-old/auth-bio-pro.webp",
      alt: "The AUTH Bio Pro biometric security key",
      caption: "AUTH Bio Pro",
      w: 495,
      h: 1100,
    },
  ],
  ams: [
    {
      src: "/images/products-old/ams.webp",
      alt: "Diagram of AMS around the AUTH Bio, Bio Pro, Desktop and Touch keys: life cycle management, key assignment, controlled enrolment, PIN policy, audit log reports and directory integration",
      caption: "AMS covers the key life cycle across the AUTH key models",
      w: 500,
      h: 495,
    },
  ],
};

/** Product photos taken from the current xsignon.com, shown under the picture band. */
export function ProductGallery({ slug }: { slug: ProductVisualSlug }) {
  const items = GALLERY[slug];
  if (!items) return null;
  return (
    <section className="page-sec ph-gallery-sec">
      <div className="wrap">
        <div className="ph-gallery rv">
          {items.map((item) => (
            <figure key={item.src}>
              <Image src={item.src} alt={item.alt} width={item.w} height={item.h} />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
