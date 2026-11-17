// Side-by-side screenshots of one prototype page and the matching app page, at 1280, 900 and 375 px.
//
//   1. Start the app:      npm run build && npm run start      (or npm run dev), at http://localhost:3000
//   2. One-time setup:     npx playwright install chromium
//   3. Compare one page:   node scripts/compare-page.mjs <prototype view> <app route>
//      Examples:           node scripts/compare-page.mjs home /
//                          node scripts/compare-page.mjs postureone /products/postureone
//
// The prototype view is the name after "view-" in reference/prototype-v5/index.html (home, products,
// postureone, sol-ai, case-bank ...). Pictures are written to compare/<view>-<width>-proto.png and
// compare/<view>-<width>-app.png. Open the pair and compare them; fix the app until they match.
// Set APP_URL to test another address, for example APP_URL=http://localhost:3100.
import { createServer } from "node:http";
import { mkdir, readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { chromium } from "@playwright/test";

const [view, route = "/"] = process.argv.slice(2);
if (!view) {
  console.error("Usage: node scripts/compare-page.mjs <prototype view> <app route>");
  process.exit(1);
}
const appUrl = process.env.APP_URL ?? "http://localhost:3000";
const root = resolve("reference", "prototype-v5");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

// A tiny static server for the prototype, bound to this machine only.
const server = createServer(async (req, res) => {
  try {
    const path = new URL(req.url ?? "/", "http://localhost").pathname;
    const file = normalize(join(root, path === "/" ? "index.html" : path));
    if (!file.startsWith(root)) throw new Error("outside the prototype folder");
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end("Not found");
  }
});
await new Promise((done) => server.listen(5199, "127.0.0.1", done));

// Scroll to the bottom and back, so pictures and "reveal on scroll" pieces have appeared.
async function settle(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
}

const browser = await chromium.launch();
await mkdir("compare", { recursive: true });
for (const width of [1280, 900, 375]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const proto = await context.newPage();
  await proto.goto(`http://127.0.0.1:5199/index.html#${view}`, { waitUntil: "networkidle" });
  await settle(proto);
  await proto.screenshot({ path: `compare/${view}-${width}-proto.png`, fullPage: true });

  const app = await context.newPage();
  await app.goto(`${appUrl}${route}`, { waitUntil: "networkidle" });
  await settle(app);
  await app.screenshot({ path: `compare/${view}-${width}-app.png`, fullPage: true });
  await context.close();
  console.log(`${width}px done`);
}
await browser.close();
server.close();
console.log(
  `Pictures are in the compare folder: ${view}-<width>-proto.png and ${view}-<width>-app.png`,
);
