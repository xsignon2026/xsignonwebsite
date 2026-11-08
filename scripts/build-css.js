const fs = require("fs");
const path = require("path");
const { compile } = require("@tailwindcss/node");
const { Scanner } = require("@tailwindcss/oxide");

async function buildCss() {
  const rootDir = process.cwd();
  const srcDir = path.resolve(rootDir, "src");
  const sourceCssPath = path.resolve(srcDir, "app/globals.source.css");
  const outputCssPath = path.resolve(srcDir, "app/globals.css");

  if (!fs.existsSync(sourceCssPath)) {
    console.error(`Source CSS not found at ${sourceCssPath}`);
    process.exit(1);
  }

  const inputCss = fs.readFileSync(sourceCssPath, "utf8");

  console.log("Compiling Tailwind CSS v4...");
  const compiler = await compile(inputCss, {
    from: sourceCssPath,
    base: path.dirname(sourceCssPath),
    onDependency: () => {},
  });

  const scanner = new Scanner({
    sources: [
      {
        base: srcDir,
        pattern: "**/*",
        negated: false,
      },
    ],
  });

  const candidates = new Set(scanner.scan());
  console.log(`Scanned ${candidates.size} class candidates from src/`);

  // Explicitly ensure critical responsive and state utility classes are included
  const essentialClasses = [
    "hidden",
    "block",
    "inline-block",
    "flex",
    "inline-flex",
    "grid",
    "sr-only",
    "invisible",
    "visible",
    "absolute",
    "relative",
    "fixed",
    "sticky",
    "top-0",
    "left-0",
    "right-0",
    "z-10",
    "z-50",
    "z-[90]",
    "z-[95]",
    "xl:flex",
    "xl:hidden",
    "lg:flex",
    "lg:hidden",
    "md:flex",
    "md:hidden",
    "sm:flex",
    "sm:hidden",
    "group-hover:visible",
    "group-hover:scale-100",
    "group-hover:opacity-100",
    "group-focus-within:visible",
    "group-focus-within:scale-100",
    "group-focus-within:opacity-100",
  ];

  for (const cls of essentialClasses) {
    candidates.add(cls);
  }

  const compiledCss = compiler.build([...candidates]);
  fs.writeFileSync(outputCssPath, compiledCss, "utf8");
  console.log(
    `Successfully generated ${outputCssPath} (${(compiledCss.length / 1024).toFixed(1)} KB)`
  );
}

buildCss().catch((err) => {
  console.error("Failed to build CSS:", err);
  process.exit(1);
});
