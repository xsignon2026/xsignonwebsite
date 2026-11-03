type SectionProps = {
  band?: "light" | "dark";
  id?: string;
  className?: string;
  children: React.ReactNode;
};

// Handoff 4.1: section.block, 128px top and bottom (76px at 760px and below).
// Dark bands use --d1 with the red and violet glows, and set data-nav="dark" for the header theme.
export function Section({ band = "light", id, className = "", children }: SectionProps) {
  if (band === "dark") {
    return (
      <section
        id={id}
        data-nav="dark"
        className={`band-dark relative isolate overflow-hidden bg-d1 py-(--section-pad) text-on-dark-mut ${className}`}
        style={{
          backgroundImage:
            "radial-gradient(60% 70% at 100% 0%, var(--g1s), transparent 70%), radial-gradient(60% 70% at 0% 100%, var(--g2s), transparent 70%)",
        }}
      >
        {children}
      </section>
    );
  }
  return (
    <section
      id={id}
      data-nav="light"
      className={`bg-paper py-(--section-pad) text-txt ${className}`}
    >
      {children}
    </section>
  );
}
