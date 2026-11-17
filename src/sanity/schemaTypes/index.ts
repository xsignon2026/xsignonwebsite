import type { SchemaTypeDefinition } from "sanity";
import { documentTypes } from "./documents";
import { objectTypes } from "./objects";
import { singletonTypes } from "./singletons";
import { testDoc } from "./testDoc";

export const schemaTypes: SchemaTypeDefinition[] = [
  ...objectTypes,
  ...singletonTypes,
  ...documentTypes,
  testDoc,
];
