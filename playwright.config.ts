import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: "html",
  use: {
    baseURL: "https://practicesoftwaretesting.com/",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "chromium",
      testIgnore: /.*\.auth\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "chromium-auth",
      testMatch: /.*\.auth\.spec\.ts/,
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
    },
  ],
});
