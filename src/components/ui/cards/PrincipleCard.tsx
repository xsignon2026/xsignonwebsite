import React from "react";

type PrincipleCardProps = {
  number: string;
  title: string;
  description: string;
  className?: string;
};

export function PrincipleCard({ number, title, description, className = "" }: PrincipleCardProps) {
  return (
    <article
      tabIndex={0}
      className={`group flex flex-col justify-between rounded-card border border-line bg-card p-8 shadow-carousel transition-[transform,box-shadow,border-color] duration-300 ease-brand hover:border-acc/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus active:scale-[.97] ${className}`}
    >
      <div>
        <span className="text-eyebrow font-bold tracking-widest text-acc uppercase">{number}</span>
        <h3 className="mt-4 text-card-title font-bold tracking-tight text-txt">{title}</h3>
        <p className="mt-3 text-card-desc text-gray leading-relaxed">{description}</p>
      </div>
    </article>
  );
}
