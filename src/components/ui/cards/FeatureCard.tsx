import React from "react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  badge?: string;
  onDark?: boolean;
  className?: string;
};

export function FeatureCard({
  title,
  description,
  icon,
  badge,
  onDark = false,
  className = "",
}: FeatureCardProps) {
  const bg = onDark ? "bg-d2 text-on-dark-soft border-d-line" : "bg-card text-txt border-line";
  const descColor = onDark ? "text-on-dark-mut" : "text-gray";

  return (
    <article
      tabIndex={0}
      className={`group relative flex flex-col justify-between rounded-card border p-7 shadow-carousel transition-[transform,box-shadow,border-color] duration-300 ease-brand hover:border-acc/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus active:scale-[.97] ${bg} ${className}`}
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          {icon && <div className="text-acc">{icon}</div>}
          {badge && (
            <span className="inline-block rounded-full border border-line bg-paper px-2.5 py-0.5 text-eyebrow font-semibold uppercase tracking-wider text-gray">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-card-title font-bold tracking-tight">{title}</h3>
        <p className={`mt-3 text-card-desc leading-relaxed ${descColor}`}>{description}</p>
      </div>
    </article>
  );
}
