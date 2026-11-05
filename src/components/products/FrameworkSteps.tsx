import React from "react";
import type { FrameworkStep } from "@/types/product";

type FrameworkStepsProps = {
  steps: FrameworkStep[];
};

// Handoff lines 2511-2525: Numbered framework steps.
export function FrameworkSteps({ steps }: FrameworkStepsProps) {
  if (!steps?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
      {steps.map((step, index) => (
        <div
          key={index}
          className="border-t-2 border-txt pt-4 flex flex-col justify-start"
        >
          <span className="font-bold text-2xl tracking-tight text-txt">
            {step.stepNumber}
          </span>
          <h4 className="text-lg font-bold text-txt tracking-tight mt-2 mb-2">
            {step.title}
          </h4>
          <p className="text-body text-gray leading-relaxed m-0">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
