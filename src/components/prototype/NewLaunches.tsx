import Image from "next/image";
import Link from "next/link";
import { NewLaunchesFx } from "@/components/prototype/NewLaunchesFx";
import { PRODUCT_PICTURES } from "@/components/prototype/product-pictures";
import type { ProductsPageContent } from "@/types/products-page-content";

// "New launches" on the Products page: the three newest products as large cards, the picture on one side and
// the text on the other, alternating. The list comes from the CMS (default in
// src/data/products-page-content.ts). The pictures are the ones the existing product cards already use.

export type Launch = ProductsPageContent["newLaunches"]["items"][number];

export function NewLaunches({ title, items }: { title: string; items: ReadonlyArray<Launch> }) {
  return (
    <section
      className="page-sec"
      id="newLaunches"
      style={{ paddingTop: "72px", paddingBottom: "0" }}
    >
      <div className="wrap">
        <div className="sec-row rv">
          <h2 className="h2">{title}</h2>
        </div>
        <ul className="nl-list" id="nlList">
          {items.map((p, i) => (
            <li
              key={p.name}
              className="nl-card"
              data-flip={i % 2 === 1 || undefined}
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="nl-img">
                <Image
                  src={PRODUCT_PICTURES[p.picture].src}
                  alt={PRODUCT_PICTURES[p.picture].alt}
                  width={1600}
                  height={1067}
                  sizes="(max-width: 900px) 100vw, 640px"
                />
              </div>
              <div className="nl-body">
                <span className="nl-tag">{p.tag}</span>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <Link className="link-arrow" href={p.href}>
                  {p.cta}{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <NewLaunchesFx />
      </div>
    </section>
  );
}
