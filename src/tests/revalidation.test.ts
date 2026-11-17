import { describe, expect, it } from "vitest";
import { isDraftId, tagsForDocument } from "../sanity/lib/revalidation";

describe("tagsForDocument", () => {
  it("refreshes the type, the document and its address", () => {
    const tags = tagsForDocument({ _id: "abc", _type: "testDoc", slug: "hello" });
    expect(tags).toEqual(expect.arrayContaining(["type:testDoc", "doc:abc", "slug:testDoc:hello"]));
  });

  it("refreshes dependent pages: a product also updates home and listings", () => {
    const tags = tagsForDocument({ _id: "p1", _type: "product", slug: "postureone" });
    expect(tags).toEqual(expect.arrayContaining(["type:home", "type:productListing"]));
  });

  it("refreshes the layout when navigation or settings change", () => {
    expect(tagsForDocument({ _id: "navigation", _type: "navigation" })).toContain("layout");
    expect(tagsForDocument({ _id: "siteSettings", _type: "siteSettings" })).toContain("layout");
  });

  it("treats a draft id and its published id as the same document", () => {
    expect(tagsForDocument({ _id: "drafts.abc", _type: "testDoc" })).toContain("doc:abc");
  });

  it("returns nothing without a type", () => {
    expect(tagsForDocument({ _id: "abc" })).toEqual([]);
  });
});

describe("isDraftId", () => {
  it("spots drafts", () => {
    expect(isDraftId("drafts.abc")).toBe(true);
    expect(isDraftId("abc")).toBe(false);
    expect(isDraftId(undefined)).toBe(false);
  });
});
