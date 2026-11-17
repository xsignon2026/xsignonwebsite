import Image from "next/image";
import Link from "next/link";
import { AboutThinkingCards } from "@/components/about/AboutThinking";
import { aboutThinking } from "@/data/about";

// The featured article and the four article cards. Used on About and, as in the prototype, again on the
// Solutions page (the prototype copies the About block into it).
export function ThinkingShowcase() {
  const featured = aboutThinking.featured;
  return (
    <>
      <article className="t-feat rv">
        <div className="tf-body">
          <p className="kicker">Featured</p>
          <h3>{featured.title}</h3>
          <p className="tf-p">{featured.text}</p>
          <Link className="more" href={featured.href}>
            Read the article{" "}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
        <div className="tf-img">
          <Image
            src={featured.image.src}
            alt={featured.image.alt}
            width={featured.image.width}
            height={featured.image.height}
            sizes="(max-width: 900px) 100vw, 520px"
          />
        </div>
      </article>
      <AboutThinkingCards />
    </>
  );
}
