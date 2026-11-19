// Every link that comes out of Sanity passes through here before a page uses it, so a link such as
// "javascript:..." typed into the CMS can never reach a visitor. Studio's own field checks catch it earlier;
// this is the second line of defence on the way to the page.

const SAFE_SCHEMES = ["https:", "mailto:", "tel:"];
// Fields that hold a link address in the content shapes.
const LINK_KEYS = new Set(["href", "linkHref", "buttonHref", "external"]);

/** A page path ("/about"), an in-page anchor ("#who"), or an https, mailto or tel address. */
export function isSafeHref(value: string): boolean {
  const text = value.trim();
  if (text !== value || text.length === 0) return false;
  if (text.startsWith("/")) return !text.startsWith("//") && !text.includes("\\");
  if (text.startsWith("#")) return true;
  try {
    return SAFE_SCHEMES.includes(new URL(text).protocol);
  } catch {
    return false;
  }
}

/** Returns the same content with any unsafe link replaced by "/" (the home page). */
export function scrubLinks<T>(value: T): T {
  if (Array.isArray(value)) return value.map((item) => scrubLinks(item)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      out[key] =
        typeof item === "string" && LINK_KEYS.has(key)
          ? isSafeHref(item)
            ? item
            : "/"
          : scrubLinks(item);
    }
    return out as T;
  }
  return value;
}
