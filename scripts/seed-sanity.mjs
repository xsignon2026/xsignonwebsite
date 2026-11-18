// Loads the default home page content into Sanity, as the "home" document.
//
//   node scripts/seed-sanity.mjs            shows what would be written (nothing is changed)
//   node scripts/seed-sanity.mjs --write    writes it
//
// Needs, in the environment or .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
// SANITY_API_WRITE_TOKEN (an Editor token from sanity.io/manage, API, Tokens). The token is a secret: keep it in
// .env.local, never in the code. It replaces the home document each time, so edits made in the Studio to that
// document are overwritten: run it once, to start.
import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const ts = require("typescript");

for (const file of [".env.local", ".env"]) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const source = readFileSync(resolve("src/data/home-content.ts"), "utf8");
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const mod = { exports: {} };
new Function("module", "exports", "require", js)(mod, mod.exports, require);
const content = mod.exports.homeContentFallback;

let n = 0;
const key = (prefix) => `${prefix}-${(n++).toString(36)}`;
const doc = {
  _id: "home",
  _type: "home",
  hero: content.hero,
  heroSlides: content.heroSlides.map((s) => ({
    _key: key("slide"),
    ...s,
    id: { _type: "slug", current: s.id },
  })),
  standards: content.standards,
  ecosystem: {
    title: content.ecosystem.title,
    items: content.ecosystem.items.map((i) => ({ _key: key("eco"), ...i })),
  },
  whatWeDo: {
    title: content.whatWeDo.title,
    allLink: content.whatWeDo.allLink,
    panels: content.whatWeDo.panels.map((p) => ({ _key: key("panel"), ...p })),
  },
  cta: content.cta,
};

const write = process.argv.includes("--write");
if (!write) {
  console.log(JSON.stringify(doc, null, 2));
  console.log("\nNothing was written. Run with --write to save this to Sanity.");
  process.exit(0);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "staging";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN first (see docs/cms-setup.md).",
  );
  process.exit(1);
}
const { createClient } = require("@sanity/client");
const client = createClient({ projectId, dataset, token, apiVersion: "2026-11-01", useCdn: false });
const result = await client.createOrReplace(doc);
console.log(`Saved the home document (${result._id}) to ${projectId}/${dataset}.`);
