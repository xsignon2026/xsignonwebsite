// S-16: which cache tags to refresh when a document changes. Pure functions, so they can be tested.
//
// Pages tag their Sanity reads (see sanityFetch). The tag names are:
//   type:<documentType>   every read of that type, such as a product listing
//   doc:<documentId>      one document
//   slug:<type>:<slug>    one page, found by its address
//   layout                header, footer and banner, which appear on every page

export type ChangedDocument = {
  _id?: string;
  _type?: string;
  slug?: string | null;
};

// When a document of this type changes, these other tags must refresh too.
// Example: a product also appears on the home page and in listing cards.
// Add a line here whenever a new type shows up on another page.
const DEPENDENTS: Record<string, string[]> = {
  siteSettings: ["layout"],
  navigation: ["layout"],
  product: ["type:home", "type:productListing"],
  testDoc: [],
};

export function tagsForDocument(doc: ChangedDocument): string[] {
  const type = doc._type;
  if (!type) return [];
  const tags = new Set<string>([`type:${type}`]);
  if (doc._id) tags.add(`doc:${doc._id.replace(/^drafts\./, "")}`);
  if (doc.slug) tags.add(`slug:${type}:${doc.slug}`);
  for (const tag of DEPENDENTS[type] ?? []) tags.add(tag);
  return [...tags];
}

// Drafts are never public, so saving a draft must not refresh the live site.
export function isDraftId(id: string | undefined): boolean {
  return Boolean(id?.startsWith("drafts."));
}
