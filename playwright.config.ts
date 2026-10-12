import { defineConfig } from "@playwright/test";

const viewports = [
  ["320x568", { width: 320, height: 568 }],
  ["360x640", { width: 360, height: 640 }],
  ["375x667", { width: 375, height: 667 }],
  ["390x844", { width: 390, height: 844 }],
  ["414x896", { width: 414, height: 896 }],
  ["844x390", { width: 844, height: 390 }],
  ["768x1024", { width: 768, height: 1024 }],
  ["820x1180", { width: 820, height: 1180 }],
  ["1024x768", { width: 1024, height: 768 }],
  ["1280x720", { width: 1280, height: 720 }],
  ["1440x900", { width: 1440, height: 900 }],
  ["1920x1080", { width: 1920, height: 1080 }],
  ["2560x1440", { width: 2560, height: 1440 }],
] as const;

const phoneWidths = new Set([320, 360, 375, 390, 414, 844]);
const engines = ["chromium", "firefox", "webkit"] as const;

export default defineConfig({
  testDir: "tests/ux",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  snapshotPathTemplate: "{testDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}",
  reporter: [["html", { open: "never", outputFolder: "playwright-report" }], ["list"]],
  use: {
    baseURL: "http://127.0.0.1:8080",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    colorScheme: "dark",
    reducedMotion: "reduce",
  },
  expect: { timeout: 10_000, toHaveScreenshot: { animations: "disabled", caret: "hide" } },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1",
    url: "http://127.0.0.1:8080",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: engines.flatMap((browserName) =>
    viewports.map(([name, viewport]) => ({
      name: `${browserName}-${name}`,
      testIgnore: browserName === "firefox" && process.platform === "darwin" ? /./ : undefined,
      use: {
        browserName,
        viewport,
        isMobile: phoneWidths.has(viewport.width),
        hasTouch: phoneWidths.has(viewport.width),
      },
    })),
  ),
  outputDir: "test-results",
});
