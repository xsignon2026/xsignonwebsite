import { validateDocument } from "@sanity/validation";
import { createSchema } from "sanity";
import { describe, expect, it } from "vitest";
import { schemaTypes } from "../sanity/schemaTypes";

// These tests run Sanity's own validation on the real compiled schema, the same rules the studio
// applies when an editor presses Publish. The pure-function tests alone cannot show that a rule is
// actually attached to a field (a rule on a type is ignored when the type is used as a field).
const schema = createSchema({ name: "default", types: schemaTypes });

async function errorsFor(document: Record<string, unknown>): Promise<string[]> {
  // A client is required to switch custom validation on; our rules never call it.
  const result = await validateDocument({
    document: { _id: "x", _createdAt: "", _updatedAt: "", _rev: "", ...document } as never,
    client: { withConfig: () => ({}) } as never,
    getDocumentExists: async () => true,
    schema,
  });
  return result.markers.filter((m) => m.level === "error").map((m) => m.message);
}

const seo = { title: "Title", description: "Description" };
const goodImage = {
  asset: { _type: "reference", _ref: "image-abc-10x10-png" },
  alt: "a",
  credit: "c",
};

describe("shared field types block publishing", () => {
  it("accepts a complete document", async () => {
    const errors = await errorsFor({
      _type: "testDoc",
      title: "Hello",
      heroImage: goodImage,
      seo,
    });
    expect(errors).toEqual([]);
  });

  it("blocks a blank title and a missing SEO title", async () => {
    const errors = await errorsFor({ _type: "testDoc", title: "  ", seo: { description: "d" } });
    expect(errors).toContain("A title is required.");
    expect(errors).toContain("A search title is required.");
  });

  it("blocks an image with no file, no alt text or no credit", async () => {
    expect(
      await errorsFor({
        _type: "testDoc",
        title: "t",
        seo,
        heroImage: { alt: "a", credit: "c" },
      }),
    ).toContain("Upload an image.");
    expect(
      await errorsFor({
        _type: "testDoc",
        title: "t",
        seo,
        heroImage: { ...goodImage, alt: " " },
      }),
    ).toContain("Alt text is required.");
    expect(
      await errorsFor({
        _type: "testDoc",
        title: "t",
        seo,
        heroImage: { ...goodImage, credit: "" },
      }),
    ).toContain("A credit is required.");
  });

  it("blocks a link that has a type but no destination", async () => {
    const errors = await errorsFor({
      _type: "testDoc",
      title: "t",
      seo,
      cta: { label: "Go", link: { linkType: "internal" } },
    });
    expect(errors).toContain("Choose the page to link to.");
  });

  it("blocks dangerous and incomplete external links", async () => {
    const base = { _type: "testDoc", title: "t", seo };
    const bad = await errorsFor({
      ...base,
      cta: { label: "Go", link: { linkType: "external", external: "javascript:alert(1)" } },
    });
    expect(bad.join(" ")).toContain("Only https://, mailto: and tel: links are allowed.");
    const empty = await errorsFor({
      ...base,
      cta: { label: "Go", link: { linkType: "external" } },
    });
    expect(empty).toContain("Enter the web address.");
  });

  it("requires a link on a call to action", async () => {
    const errors = await errorsFor({ _type: "testDoc", title: "t", seo, cta: { label: "Go" } });
    // The same document with a complete link has no errors (see the first test), so this error is the missing link.
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe("optional links and navigation", () => {
  const settings = {
    _type: "siteSettings",
    defaultSeo: seo,
    legalLine: "© XSignOn",
  };

  it("lets the banner link and a dropdown-only menu item stay empty", async () => {
    expect(
      await errorsFor({ ...settings, banner: { enabled: true, message: "New release" } }),
    ).toEqual([]);

    const nav = await errorsFor({
      _type: "navigation",
      items: [
        {
          _type: "navItem",
          _key: "a",
          label: "Products",
          children: [
            {
              _type: "navChild",
              _key: "b",
              label: "PostureOne",
              link: { linkType: "external", external: "https://xsignon.com/p" },
            },
          ],
        },
      ],
    });
    expect(nav).toEqual([]);
  });

  it("blocks a menu item that goes nowhere, and banner text that is missing when on", async () => {
    const nav = await errorsFor({
      _type: "navigation",
      items: [{ _type: "navItem", _key: "a", label: "Empty" }],
    });
    expect(nav).toContain("Add a link, or add items to the dropdown.");

    const banner = await errorsFor({ ...settings, banner: { enabled: true } });
    expect(banner).toContain("Write the banner text, or switch the banner off.");
  });
});
