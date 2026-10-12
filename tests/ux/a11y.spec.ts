import AxeBuilder from "@axe-core/playwright";
import { expect, test, openHome } from "./fixtures";

test("home meets WCAG 2.2 AA automated checks @smoke", async ({ page }) => {
  await openHome(page);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("keyboard navigation exposes a visible focus indicator and reaches the menu", async ({
  page,
}) => {
  await openHome(page);
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toBeVisible();
  const outline = await focused.evaluate((element) => {
    const style = getComputedStyle(element);
    return style.outlineStyle !== "none" || style.boxShadow !== "none";
  });
  expect(outline).toBeTruthy();
});
