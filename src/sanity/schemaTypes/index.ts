import type { SchemaTypeDefinition } from "sanity";
import { objectTypes } from "./objects";
import { testDoc } from "./testDoc";

export const schemaTypes: SchemaTypeDefinition[] = [...objectTypes, testDoc];
