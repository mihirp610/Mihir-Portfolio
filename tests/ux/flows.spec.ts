import { expect, test, openHome } from "./fixtures";

test.describe("frustrated-user flows @smoke", () => {
  test("navigation remains usable after rapid menu interaction @mobile", async ({ page }) => {
    test.skip(!test.info().project.use.hasTouch, "Mobile-menu flow applies to touch projects.");
    await openHome(page);
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.dblclick();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await menu.click();
    await page.getByRole("link", { name: "Contact" }).last().click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("contact form blocks invalid entries and gives an honest completion state", async ({
    page,
  }) => {
    await openHome(page);
    await page.locator("#contact").scrollIntoViewIfNeeded();
    const submit = page.getByRole("button", { name: /Send message/i });
    await submit.click();
    await expect(page.getByLabel("Your name")).toBeFocused();
    await page.getByLabel("Your name").fill("محمد 😀 <script>");
    await page.getByLabel("Email address").fill("not-an-email");
    await page.getByLabel("Your message").fill("x".repeat(2000));
    await submit.click();
    await expect(page.getByLabel("Email address")).toBeFocused();
    await page.getByLabel("Email address").fill("person@example.com");
    await Promise.all([submit.click(), submit.click()]);
    await expect(page.getByRole("button", { name: /Email client opened/i })).toBeDisabled();
    await expect(page.getByRole("status")).toContainText("Email client opened");
  });

  test("gallery controls retain a single active item and recover after history navigation", async ({
    page,
  }) => {
    await openHome(page);
    await page.locator("#projects").scrollIntoViewIfNeeded();
    const projects = page.getByRole("region", { name: "projects gallery" });
    await projects.getByRole("button", { name: "Slide 2" }).click();
    await expect(projects.getByRole("button", { name: "Slide 2" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    await page.goBack();
    await page.goForward();
    await expect(page.locator("main")).toBeVisible();
  });
});
