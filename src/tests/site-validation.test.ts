import { describe, expect, it } from "vitest";
import { bannerTextIsValid, navItemHasDestination } from "../sanity/lib/site-validation";

describe("navItemHasDestination", () => {
  it("needs a link or dropdown items", () => {
    expect(navItemHasDestination({})).not.toBe(true);
    expect(navItemHasDestination({ children: [] })).not.toBe(true);
    expect(navItemHasDestination({ link: { linkType: "internal" } })).toBe(true);
    expect(navItemHasDestination({ children: [{}] })).toBe(true);
  });
});

describe("bannerTextIsValid", () => {
  it("only requires text when the banner is on", () => {
    expect(bannerTextIsValid(false, "")).toBe(true);
    expect(bannerTextIsValid(true, "  ")).not.toBe(true);
    expect(bannerTextIsValid(true, "New: PostureOne 2.0")).toBe(true);
  });
});
