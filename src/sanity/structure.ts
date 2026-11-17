import type { StructureResolver } from "sanity/structure";
import { singletonNames } from "./schemaTypes/singletons";

// S-13: Site settings and Navigation open directly (one fixed document each) instead of a list.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .id("home")
        .child(S.document().schemaType("home").documentId("home")),
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Navigation")
        .id("navigation")
        .child(S.document().schemaType("navigation").documentId("navigation")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !singletonNames.includes(item.getId() ?? "")),
    ]);

// Singletons cannot be duplicated, deleted or unpublished from the studio.
const blockedActions = ["delete", "duplicate", "unpublish"];

export const singletonActions = <T extends { action?: string }>(
  actions: T[],
  schemaType: string,
): T[] =>
  singletonNames.includes(schemaType)
    ? actions.filter((a) => !blockedActions.includes(a.action ?? ""))
    : actions;
