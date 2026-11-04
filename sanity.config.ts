"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { singletonNames } from "./src/sanity/schemaTypes/singletons";
import { singletonActions, structure } from "./src/sanity/structure";

export default defineConfig({
  name: "xsignon",
  title: "XSignOn",
  basePath: "/studio",
  projectId: projectId || "missing",
  dataset,
  schema: {
    types: schemaTypes,
    // No "New document" entry for singletons: they already exist.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonNames.includes(schemaType)),
  },
  document: {
    actions: (prev, { schemaType }) => singletonActions(prev, schemaType),
  },
  plugins: [structureTool({ structure })],
});
