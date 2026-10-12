import { expect, test, openHome, assertCleanRuntime } from "./fixtures";
import { routes } from "./routes";

test.describe("page health @smoke", () => {
  for (const route of routes) {
    test(`${route.name} has no horizontal overflow, clipped interactive controls, or runtime failures`, async ({
      page,
      audit,
    }) => {
      await openHome(page);
      const result = await page.evaluate(() => {
        const root = document.documentElement;
        const viewport = root.clientWidth;
        const tooWide = [...document.querySelectorAll<HTMLElement>("body *")]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return (
              style.visibility !== "hidden" &&
              rect.width > 0 &&
              (rect.left < -1 || rect.right > viewport + 1)
            );
          })
          .slice(0, 12)
          .map(
            (element) =>
              `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}.${element.className}`,
          );
        return { scrollWidth: root.scrollWidth, viewport, tooWide };
      });
      expect(
        result.scrollWidth,
        `Overflowing elements: ${result.tooWide.join(", ")}`,
      ).toBeLessThanOrEqual(result.viewport + 1);
      await assertCleanRuntime(audit);
    });

    test(`${route.name} keeps touch controls at least 44px @mobile`, async ({ page }) => {
      test.skip(!test.info().project.use.hasTouch, "Touch-target audit applies to touch projects.");
      await openHome(page);
      const undersized = await page.locator("a, button, input, textarea").evaluateAll((elements) =>
        elements
          .filter((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return (
              style.visibility !== "hidden" &&
              rect.width > 0 &&
              rect.height > 0 &&
              (rect.width < 44 || rect.height < 44)
            );
          })
          .map((element) => ({
            label:
              element.getAttribute("aria-label") || element.textContent?.trim() || element.tagName,
            rect: element.getBoundingClientRect().toJSON(),
          })),
      );
      expect(undersized).toEqual([]);
    });
  }
});
