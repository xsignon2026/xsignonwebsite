import { describe, expect, it } from "vitest";
import { singletonActions } from "../sanity/structure";

const actions = [
  { action: "publish" },
  { action: "duplicate" },
  { action: "delete" },
  { action: "unpublish" },
  { action: "discardChanges" },
];

describe("singletonActions", () => {
  it("removes delete, duplicate and unpublish from Site settings and Navigation", () => {
    for (const type of ["siteSettings", "navigation"]) {
      expect(singletonActions(actions, type).map((a) => a.action)).toEqual([
        "publish",
        "discardChanges",
      ]);
    }
  });

  it("leaves every action on other document types", () => {
    expect(singletonActions(actions, "testDoc")).toEqual(actions);
  });
});
