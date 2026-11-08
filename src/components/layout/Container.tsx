type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

// Handoff 4.1: .wrap, max-width 1180px, padding 0 32px (0 20px at 760px and below).
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-(--wrap) px-(--wrap-pad) ${className}`}>{children}</div>
  );
}
