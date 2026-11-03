type SectionProps = {
  band?: "light" | "dark";
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ band = "light", id, className = "", children }: SectionProps) {
  const bandClass =
    band === "dark" ? "band-dark bg-band-dark text-paper" : "band-light bg-band-light text-ink";
  return (
    <section id={id} className={`${bandClass} py-(--spacing-section) ${className}`}>
      {children}
    </section>
  );
}
