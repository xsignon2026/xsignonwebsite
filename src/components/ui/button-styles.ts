export type ButtonVariant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-(--radius-button) px-5 py-3 font-semibold no-underline transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-violet-500 text-paper hover:bg-violet-600",
  secondary: "border border-current bg-transparent hover:bg-violet-500/10",
};

export function buttonClasses(variant: ButtonVariant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}
