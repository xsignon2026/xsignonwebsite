// Handoff 5.2 Buttons.
export type ButtonVariant = "primary" | "white" | "outline" | "contact";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-[26px] py-3 text-button font-semibold no-underline transition-[background-color,border-color,color,transform] duration-[280ms,280ms,280ms,150ms] ease-brand active:scale-[.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100";

const variants: Record<ButtonVariant, string> = {
  // .btn-navy: accent fill, hover #9e0017
  primary: "border border-transparent bg-acc text-white hover:bg-acc-hov",
  // .btn-white: used on the CTA panel
  white: "border border-transparent bg-white text-[#081325] hover:bg-paper",
  // .pcard-btn: outline on light
  outline:
    "min-h-11 border border-gray bg-transparent px-5 py-2.5 text-[15px] text-txt hover:border-acc hover:bg-acc hover:text-white focus-visible:border-acc focus-visible:bg-acc focus-visible:text-white",
  // .btn-contact: header
  contact:
    "min-h-11 border border-on-dark-ctl bg-transparent px-[22px] py-[9px] text-[15px] text-inherit hover:border-acc hover:bg-acc hover:text-white focus-visible:border-acc focus-visible:bg-acc focus-visible:text-white",
};

export function buttonClasses(variant: ButtonVariant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}
