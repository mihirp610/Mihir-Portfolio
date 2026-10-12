import { expect, test, openHome } from "./fixtures";

test("portfolio home visual baseline", async ({ page }) => {
  test.skip(!test.info().project.name.startsWith("chromium"), "Visual baselines are stabilized on Chromium; functional checks run in every engine.");
  await openHome(page);
  await page.addStyleTag({
    content:
      "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}",
  });
  await page.screenshot({ path: test.info().outputPath("home.png"), fullPage: true });
  await expect(page).toHaveScreenshot("home.png", {
    fullPage: true,
    mask: [page.locator(".noise")],
  });
});
