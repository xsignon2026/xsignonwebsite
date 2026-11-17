import { cta } from "./cta";
import { imageWithAlt } from "./imageWithAlt";
import { link } from "./link";
import { richText } from "./richText";
import { seo } from "./seo";

// S-12: shared field types. Every document type reuses these instead of defining its own.
export const objectTypes = [imageWithAlt, link, cta, seo, richText];
