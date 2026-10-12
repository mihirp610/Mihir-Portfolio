import { expect, test as base, type Page } from "@playwright/test";

type Audit = { consoleErrors: string[]; failedRequests: string[]; badResponses: string[] };

export const test = base.extend<{ audit: Audit }>({
  audit: async ({ page }, use) => {
    const audit: Audit = { consoleErrors: [], failedRequests: [], badResponses: [] };
    page.on("console", (message) => {
      if (message.type() === "error") audit.consoleErrors.push(message.text());
    });
    page.on("requestfailed", (request) =>
      audit.failedRequests.push(`${request.method()} ${request.url()}`),
    );
    page.on("response", (response) => {
      if (response.url().startsWith("http://127.0.0.1:8080") && response.status() >= 400) {
        audit.badResponses.push(`${response.status()} ${response.url()}`);
      }
    });
    await use(audit);
  },
});

export { expect };

export async function openHome(page: Page) {
  await page.goto("/");
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("[data-ux-loader]")).toBeHidden();
}

export async function assertCleanRuntime(audit: Audit) {
  expect(audit.consoleErrors, `Console errors:\n${audit.consoleErrors.join("\n")}`).toEqual([]);
  expect(audit.failedRequests, `Failed requests:\n${audit.failedRequests.join("\n")}`).toEqual([]);
  expect(audit.badResponses, `HTTP failures:\n${audit.badResponses.join("\n")}`).toEqual([]);
}
