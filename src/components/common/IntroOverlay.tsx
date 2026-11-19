import { IntroPlayer } from "./IntroPlayer";

// Put at the top of a page to open it with the intro. The small script runs before the first paint: when this
// visit has already seen the intro, or motion is reduced, it hides the intro so the page never flashes dark.
const SKIP_SCRIPT = `try{if(sessionStorage.getItem("xs-intro-seen")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro-skip")}}catch(e){}`;

export function IntroOverlay({ src = "/videos/logo-intro.mp4" }: { src?: string }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SKIP_SCRIPT }} />
      <IntroPlayer src={src} />
    </>
  );
}
