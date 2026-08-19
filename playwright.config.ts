import { defineConfig, devices } from '@playwright/test'

const projects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
]

if (process.env.CROSS_BROWSER) {
  projects.push(
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  )
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://127.0.0.1:4321',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects,

  /* Run your local dev server before starting the tests */
  webServer: {
    // Invoke the Astro binary directly so Playwright can kill the server on
    // teardown. Astro 7 backgrounds dev servers in detected agent environments
    // unless ASTRO_DEV_BACKGROUND is set, so opt out of that auto-detection.
    // Use 127.0.0.1 because localhost can resolve to ::1.
    command: './node_modules/.bin/astro dev --host 127.0.0.1',
    env: { ASTRO_DEV_BACKGROUND: '0' },
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
