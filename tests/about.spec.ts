import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveTitle(/About/)
  })

  test('should display about heading', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('h1')).toHaveText('About')
  })
})
