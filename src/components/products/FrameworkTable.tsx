import React from "react";
import type { ProductSpecTable } from "@/types/product";

type FrameworkTableProps = {
  table: ProductSpecTable;
};

// S-14 / T-088: Reusable specification & framework evaluation table matching table.spec.
export function FrameworkTable({ table }: FrameworkTableProps) {
  if (!table || !table.rows || table.rows.length === 0) return null;

  return (
    <section className="py-(--section-pad) border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-txt">{table.title}</h2>
          {table.subtitle && (
            <p className="mt-3 max-w-3xl text-lg text-gray leading-relaxed">{table.subtitle}</p>
          )}
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-label={table.title}
          className="overflow-x-auto rounded-xl border border-line bg-card shadow-xs focus:outline-none focus:ring-2 focus:ring-focus"
        >
          <table className="w-full border-collapse text-left text-sm md:text-base">
            <thead className="bg-soft border-b border-line">
              <tr>
                {table.columns.map((col, idx) => (
                  <th
                    key={idx}
                    scope="col"
                    className="px-5 py-3.5 font-semibold text-txt text-sm md:text-base"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {table.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-soft/40 transition-colors">
                  <th
                    scope="row"
                    className="px-5 py-4 font-semibold text-txt align-top w-48 sm:w-64"
                  >
                    {row.header}
                  </th>
                  {row.values.map((val, cIdx) => {
                    const colLabel = table.columns[cIdx + 1] || "";
                    const isConfirmSpec = val.toLowerCase().includes("confirm spec");
                    return (
                      <td key={cIdx} data-th={colLabel} className="px-5 py-4 text-gray align-top">
                        {isConfirmSpec ? (
                          <span className="inline-block rounded-md bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-xs font-medium text-amber-700">
                            {val}
                          </span>
                        ) : (
                          val
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {table.footnote && (
          <p className="mt-4 text-sm text-gray-2 leading-relaxed max-w-3xl">{table.footnote}</p>
        )}
      </div>
    </section>
  );
}
