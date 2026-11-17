// The four Passwordless Keys models, word for word from the approved prototype (key detail pages).
export type KeyModel = {
  slug: string;
  name: string;
  tag: string;
  method: string;
  line: string;
  ideal: string;
  feat: string;
};

export const KEY_MODELS: ReadonlyArray<KeyModel> = [
  {
    slug: "bio",
    name: "AUTH Bio",
    tag: "Biometric",
    method: "Fingerprint",
    line: "Fingerprint-based sign-in for everyday staff roles.",
    ideal: "Everyday staff roles across branch, office and field teams.",
    feat: "Fingerprint verification on the key itself, so sign-in completes with a touch that only the account owner can complete.",
  },
  {
    slug: "touch",
    name: "AUTH Bio Touch",
    tag: "Touch-activated",
    method: "Touch",
    line: "Touch-activated sign-in where a tap confirms the attempt.",
    ideal:
      "Teams that want the simplest possible step at sign-in: connect the key, tap, and the verified sign-in completes.",
    feat: "A single touch confirms the person is present at sign-in, paired with FIDO2 verification on the key.",
  },
  {
    slug: "pro",
    name: "AUTH Bio Pro",
    tag: "Biometric",
    method: "Fingerprint",
    line: "Biometric sign-in for roles that need extended management options.",
    ideal:
      "Administrators and high-assurance roles that need extended management options alongside biometric sign-in.",
    feat: "Fingerprint verification with extended management options, for the roles your policies hold to the highest assurance.",
  },
  {
    slug: "desktop",
    name: "AUTH Bio Desktop",
    tag: "Desktop",
    method: "Desktop sign-in",
    line: "Desktop-based sign-in for fixed workstations and shared terminals.",
    ideal:
      "Fixed workstations and shared terminals in branches, clinics and service desks, where the key stays with the desk.",
    feat: "A desktop form factor that stays with the workstation, ready for the next verified sign-in, shift after shift.",
  },
];

export const KEY_TABS = [
  "Product Details",
  "Overview",
  "Security",
  "Platforms",
  "Windows Sign-in",
  "Differentiators",
] as const;
