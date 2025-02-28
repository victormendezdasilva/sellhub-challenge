import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e-tests/tests",
  timeout: 40000,
  retries: 3,
  workers: 1,
  use: {
    baseURL: "https://impactshop.sellhub.cx/",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: false,
    ignoreHTTPSErrors: true,
  },
  outputDir: "test-artifacts",
  expect: { timeout: 40000 },
  reporter: [["list"], ["html", { outputFolder: "playwright-report" }]],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});
