import Link from "next/link";

type LinkArrowProps = React.ComponentProps<typeof Link> & { onDark?: boolean };

// Handoff 5.3: .link-arrow, 16px / 600, accent text, arrow slides 4px right on hover.
export function LinkArrow({ onDark = false, className = "", children, ...props }: LinkArrowProps) {
  const colour = onDark ? "text-acc-ink-d" : "text-acc-ink";
  return (
    <Link
      className={`group inline-flex items-center gap-2 text-base font-semibold no-underline ${colour} ${className}`}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 ease-brand group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}
