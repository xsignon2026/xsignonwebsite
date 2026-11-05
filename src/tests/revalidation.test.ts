import { describe, expect, it } from "vitest";
import { isUnpublishedId, tagsForDocument } from "../sanity/lib/revalidation";

describe("tagsForDocument", () => {
  it("refreshes the type, the document and its address", () => {
    const tags = tagsForDocument({ _id: "abc", _type: "testDoc", slug: "hello" });
    expect(tags).toEqual(expect.arrayContaining(["type:testDoc", "doc:abc", "slug:testDoc:hello"]));
  });

  it("also refreshes the old address of a renamed page", () => {
    const tags = tagsForDocument({
      _id: "p1",
      _type: "product",
      slug: "postureone",
      previousSlug: "posture-one",
    });
    expect(tags).toEqual(
      expect.arrayContaining(["slug:product:postureone", "slug:product:posture-one"]),
    );
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

describe("isUnpublishedId", () => {
  it("spots drafts and release versions, but not published documents", () => {
    expect(isUnpublishedId("drafts.abc")).toBe(true);
    expect(isUnpublishedId("versions.r1.abc")).toBe(true);
    expect(isUnpublishedId("abc")).toBe(false);
    expect(isUnpublishedId(undefined)).toBe(false);
  });
});
