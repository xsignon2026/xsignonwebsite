import type { ProofPicture } from "@/types/proof-page-content";

// The pictures the Proof hub can show. Editors choose one by name; files and descriptions live here.
export const PROOF_PICTURES: Record<ProofPicture, { src: string; alt: string }> = {
  bank: { src: "/images/proof/img-c033247b.jpg", alt: "Stone bank building with columns" },
  health: {
    src: "/images/proof/img-eac41761.jpg",
    alt: "Doctor holding a phone, wearing a stethoscope",
  },
  industrial: {
    src: "/images/proof/img-687c8549.jpg",
    alt: "Industrial worker welding with sparks",
  },
  it: {
    src: "/images/proof/img-5ed582b6.jpg",
    alt: "IT team working at laptops around a table, seen from above",
  },
};
