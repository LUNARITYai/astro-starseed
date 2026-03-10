import { defineConfig, devices } from "@playwright/test";

function getLatestIPhone(): string {
  const iPhoneModels = Object.keys(devices)
    .filter((name) => /^iPhone \d+$/.test(name))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)![0]);
      const numB = parseInt(b.match(/\d+/)![0]);
      return numA - numB;
    });
  return iPhoneModels[iPhoneModels.length - 1];
}

/**
 * Playwright E2E testing configuration
 * Tests run against the built static site via preview server
 */
export default defineConfig({
  // Test directory
  testDir: "./e2e/tests",

  // Maximum time one test can run
  timeout: 30 * 1000,

  // Expect timeout for assertions
  expect: {
    timeout: 5000,
  },

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["list"], // Console output
  ],

  // Shared settings for all projects
  use: {
    // Base URL for navigation
    baseURL: "http://localhost:4321",

    // Collect trace when retrying the failed test
    trace: "on-first-retry",

    // Screenshot only on failure
    screenshot: "only-on-failure",

    // Video only on failure
    video: "retain-on-failure",
  },

  // Configure projects for major browsers
  projects: [
    {
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "chromium-mobile",
      use: {
        ...devices[getLatestIPhone()],
        defaultBrowserType: "chromium",
      },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: "pnpm run preview",
    port: 4321,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
