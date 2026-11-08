import Link from "next/link";
import { buttonClasses, type ButtonVariant } from "./button-styles";

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
};

// A link that looks like a button. Use this instead of putting a <button> inside an <a>.
export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
