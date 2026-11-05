import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// S-19 sample accessibility check: axe must find no WCAG 2.2 AA violations on these pages.
// Add every new page template to this list as it is built.
const pages = ["/", "/styleguide", "/tokens"];

for (const path of pages) {
  test(`no accessibility violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}
