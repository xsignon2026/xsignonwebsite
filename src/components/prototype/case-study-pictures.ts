// The pictures on the case study pages, taken from the current xsignon.com case studies and kept in
// /public/images/case-studies. One large picture beside the title, and up to two more inside the page
// (shown after the second and third sections). To change a picture, replace its file or its entry here.
export type CaseStudyPicture = { src: string; alt: string };

export const CASE_STUDY_PICTURES: Record<
  string,
  { hero: CaseStudyPicture; extras: CaseStudyPicture[] }
> = {
  "securing-bank-access-fido2": {
    hero: {
      src: "/images/case-studies/bank-keys.webp",
      alt: "A bank employee holding a security key to a fingerprint reader at an office door",
    },
    extras: [
      {
        src: "/images/case-studies/bank-lifecycle.webp",
        alt: "An administrator using key life cycle management software in a server room",
      },
      {
        src: "/images/case-studies/bank-custom.webp",
        alt: "A dashboard for managing security keys, with a key on the desk",
      },
    ],
  },
  "passwordless-access-global-healthcare": {
    hero: {
      src: "/images/case-studies/health-challenge.webp",
      alt: "A finger touching a glowing fingerprint scanner above a security key",
    },
    extras: [
      {
        src: "/images/case-studies/health-keys.webp",
        alt: "A person on a video call with colleagues working on laptops in several offices",
      },
      {
        src: "/images/case-studies/health-hybrid.webp",
        alt: "A developer at a desk with a padlock graphic on the monitor beside code",
      },
    ],
  },
  "biometric-fido2-air-gapped-industrial": {
    hero: {
      src: "/images/case-studies/elec-challenge.webp",
      alt: "A rugged laptop and a fingerprint security key beside industrial control equipment",
    },
    extras: [
      {
        src: "/images/case-studies/elec-keys.webp",
        alt: "A fingerprint security key on a desk next to technical drawings",
      },
      {
        src: "/images/case-studies/elec-signin.webp",
        alt: "A person holding a fingerprint security key at a Windows sign-in screen",
      },
    ],
  },
  "biometric-only-authentication-global-it": {
    hero: {
      src: "/images/case-studies/it-challenge.webp",
      alt: "A hand plugging a security key into a laptop that shows a padlock",
    },
    extras: [
      {
        src: "/images/case-studies/it-enrol.webp",
        alt: "Laptops, a desktop screen and a security key all showing fingerprint sign-in",
      },
      {
        src: "/images/case-studies/it-signin.webp",
        alt: "A person touching a security key beside a laptop showing the Windows sign-in screen",
      },
    ],
  },
};
