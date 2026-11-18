// Loads the default page content into Sanity: the "home" and "about" documents and the six products the five articles the five solutions and the four case studies.
//
//   node scripts/seed-sanity.mjs            shows what would be written (nothing is changed)
//   node scripts/seed-sanity.mjs --write    writes it
//   node scripts/seed-sanity.mjs --write --only=about    writes just one document (home, about, productsPage, insightsPage, solutionsPage, careersPage, product, article, solution, caseStudy, job, contactPage, proofPage legalPage or whitePaper)
//
// Needs, in the environment or .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
// SANITY_API_WRITE_TOKEN (an Editor token from sanity.io/manage, API, Tokens). The token is a secret: keep it in
// .env.local, never in the code. It replaces each document each time, so edits made in the Studio to them
// are overwritten: run it once, to start.
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

const load = (file, name) => {
  const source = readFileSync(resolve(file), "utf8");
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const mod = { exports: {} };
  new Function("module", "exports", "require", js)(mod, mod.exports, require);
  return mod.exports[name];
};
const content = load("src/data/home-content.ts", "homeContentFallback");
const aboutContent = load("src/data/about-content.ts", "aboutContentFallback");
const productsPageContent = load("src/data/products-page-content.ts", "productsPageFallback");
const insightsContent = load("src/data/insights-page-content.ts", "insightsPageFallback");
const articlesData = load("src/data/articles.ts", "canonicalArticles");
const solutionsData = load("src/data/solutions.ts", "canonicalSolutions");
const solutionsPageContent = load("src/data/solutions-page-content.ts", "solutionsPageFallback");
const careersContent = load("src/data/careers-page-content.ts", "careersPageFallback");
const jobsData = load("src/data/jobs.ts", "CANONICAL_JOBS");
const contactContent = load("src/data/contact-page-content.ts", "contactPageFallback");
const proofContent = load("src/data/proof-page-content.ts", "proofPageFallback");
const legalData = load("src/data/legal-pages.ts", "legalPages");
const whitePapers = load("src/data/white-papers.ts", "FALLBACK_WHITE_PAPERS");
const casePages = load("src/data/case-study-pages.ts", "caseStudyPages");
const caseRecords = load("src/data/caseStudies.ts", "canonicalCaseStudies");

let n = 0;
const key = (prefix) => `${prefix}-${(n++).toString(36)}`;
const withKeys = (items, prefix) => items.map((item) => ({ _key: key(prefix), ...item }));
const homeDoc = {
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
const aboutDoc = {
  _id: "about",
  _type: "about",
  hero: aboutContent.hero,
  who: aboutContent.who,
  whatWeDo: { ...aboutContent.whatWeDo, items: withKeys(aboutContent.whatWeDo.items, "cap") },
  how: { ...aboutContent.how, steps: withKeys(aboutContent.how.steps, "step") },
  why: { ...aboutContent.why, principles: withKeys(aboutContent.why.principles, "why") },
  productsLine: {
    ...aboutContent.productsLine,
    links: withKeys(aboutContent.productsLine.links, "link"),
  },
  careers: aboutContent.careers,
};
// --only=about writes just that document, so Studio edits to the others are kept.
const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7);

// Every object inside a list needs a _key in Sanity. Add them all the way down.
const addKeys = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) =>
      item && typeof item === "object" ? { _key: key("k"), ...addKeys(item) } : item,
    );
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, addKeys(v)]));
  }
  return value;
};
const productFiles = [
  ["postureone", "postureOneProduct"],
  ["keys", "keysProduct"],
  ["evalone", "evalOneProduct"],
  ["xsense", "xsenseProduct"],
  ["ams", "amsProduct"],
  ["mesh", "meshProduct"],
];
const productDocs = productFiles.map(([file, name]) => {
  const product = load(`src/data/products/${file}.ts`, name);
  const { slug, ...rest } = product;
  return {
    ...addKeys(rest),
    _id: `product-${slug}`,
    _type: "product",
    slug: { _type: "slug", current: slug },
  };
});
const productsPageDoc = {
  _id: "productsPage",
  _type: "productsPage",
  hero: productsPageContent.hero,
  newLaunches: addKeys(productsPageContent.newLaunches),
  cards: addKeys(productsPageContent.cards),
  thinking: productsPageContent.thinking,
  cta: productsPageContent.cta,
};
const insightsPageDoc = {
  _id: "insightsPage",
  _type: "insightsPage",
  hero: insightsContent.hero,
  featured: insightsContent.featured,
  cards: addKeys(insightsContent.cards),
  cta: insightsContent.cta,
};
const articleDocs = articlesData.map((a) => ({
  _id: `article-${a.slug}`,
  _type: "article",
  slug: { _type: "slug", current: a.slug },
  title: a.title,
  crumb: a.crumb,
  excerpt: a.excerpt,
  author: a.author,
  date: a.date,
  topic: a.topic,
  readingTime: a.readingTime,
  featured: !!a.featured,
  sections: addKeys(a.sections),
  relatedLinks: addKeys(a.relatedLinks),
  ctaHeadline: a.ctaHeadline,
}));
const solutionDocs = solutionsData.map((x) => {
  const { slug, products, proofAndReading, features, ...rest } = x;
  const link = ({ title, type, href }) => ({ title, type, href });
  return {
    ...addKeys(rest),
    _id: `solution-${slug}`,
    _type: "solution",
    slug: { _type: "slug", current: slug },
    features: addKeys(features),
    products: addKeys(products.map(link)),
    proofAndReading: addKeys(proofAndReading.map(link)),
  };
});
// The sign-off fields come from the existing case study records. They are copied as they are, not checked.
const caseDocs = casePages.map((page) => {
  const record = caseRecords.find((r) => r.slug === page.slug);
  const { slug, ...rest } = page;
  return {
    ...addKeys(rest),
    _id: `caseStudy-${slug}`,
    _type: "caseStudy",
    slug: { _type: "slug", current: slug },
    approvalOwner: record.approvalOwner,
    approvalStatus: record.approvalStatus,
    evidenceLink: record.evidenceLink,
  };
});
const solutionsPageDoc = {
  _id: "solutionsPage",
  _type: "solutionsPage",
  hero: solutionsPageContent.hero,
  list: solutionsPageContent.list,
  enterprise: {
    ...solutionsPageContent.enterprise,
    models: addKeys(solutionsPageContent.enterprise.models),
  },
  thinking: solutionsPageContent.thinking,
  cta: solutionsPageContent.cta,
};
const careersPageDoc = {
  _id: "careersPage",
  _type: "careersPage",
  hero: careersContent.hero,
  working: { ...careersContent.working, values: addKeys(careersContent.working.values) },
  roles: careersContent.roles,
  cta: careersContent.cta,
};
const jobDocs = jobsData.map((j) => ({
  _id: j.id,
  _type: "job",
  slug: { _type: "slug", current: j.slug },
  title: j.title,
  department: j.department,
  location: j.location,
  locationType: j.locationType,
  employmentType: j.employmentType,
  description: j.description,
  active: j.active,
  postedAt: j.postedAt,
}));
const contactPageDoc = {
  _id: "contactPage",
  _type: "contactPage",
  hero: contactContent.hero,
  details: addKeys(contactContent.details),
  closing: contactContent.closing,
  cta: contactContent.cta,
};
const proofPageDoc = {
  _id: "proofPage",
  _type: "proofPage",
  hero: proofContent.hero,
  intro: proofContent.intro,
  cards: addKeys(proofContent.cards),
  roi: proofContent.roi,
  cta: proofContent.cta,
};
const legalDocs = legalData.map((p) => {
  const { slug, ...rest } = p;
  return {
    ...addKeys(rest),
    _id: `legal-${slug}`,
    _type: "legalPage",
    slug: { _type: "slug", current: slug },
    showNotice: true,
  };
});
const whitePaperDocs = Object.values(whitePapers).map((w) => ({
  _id: `whitePaper-${w.slug}`,
  _type: "whitePaper",
  title: w.title,
  slug: { _type: "slug", current: w.slug },
  summary: w.summary,
  storageKey: w.storageKey,
  gated: w.gated,
  version: w.version,
  publishedAt: w.publishedAt,
  seo: w.seo,
}));
const docs = [
  homeDoc,
  aboutDoc,
  productsPageDoc,
  insightsPageDoc,
  solutionsPageDoc,
  careersPageDoc,
  contactPageDoc,
  proofPageDoc,
  ...productDocs,
  ...articleDocs,
  ...solutionDocs,
  ...caseDocs,
  ...jobDocs,
  ...legalDocs,
  ...whitePaperDocs,
].filter((d) => !only || d._id === only || d._type === only);

const write = process.argv.includes("--write");
if (!write) {
  console.log(JSON.stringify(docs, null, 2));
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
for (const doc of docs) {
  const result = await client.createOrReplace(doc);
  console.log(`Saved the ${result._id} document to ${projectId}/${dataset}.`);
}
