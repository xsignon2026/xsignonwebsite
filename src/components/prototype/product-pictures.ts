import type { ProductPicture } from "@/types/products-page-content";

// The pictures the Products page can show. Editors choose one by name; the files and descriptions live here.
export const PRODUCT_PICTURES: Record<
  ProductPicture,
  { src: string; alt: string; height: number }
> = {
  analytics: {
    src: "/images/products/img-86bd27dc.jpg",
    alt: "An analytics dashboard on a screen",
    height: 1067,
  },
  fingerprint: {
    src: "/images/products/img-80a343ae.jpg",
    alt: "A person signing in with a fingerprint on a phone",
    height: 1067,
  },
  workshop: {
    src: "/images/products/img-b5d58838.jpg",
    alt: "A team reviewing work together in a workshop",
    height: 1067,
  },
  servers: {
    src: "/images/products/img-48a7fb34.jpg",
    alt: "Rows of servers in a data centre",
    height: 898,
  },
  // From the current xsignon.com Home page.
  postureone: {
    src: "/images/products-old/postureone-card.webp",
    alt: "Two colleagues reviewing a security dashboard on a large screen",
    height: 1315,
  },
  passwordless: {
    src: "/images/products-old/passwordless-card.webp",
    alt: "A woman signing in on a laptop with a face check on her phone",
    height: 1315,
  },
  warehouse: {
    src: "/images/products/img-02a71707.jpg",
    alt: "Organised warehouse shelves representing managed access operations",
    height: 1067,
  },
};
