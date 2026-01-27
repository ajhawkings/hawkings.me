import { test, expect } from '@playwright/test'

test.describe('Projects Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/projects')
    await expect(page).toHaveTitle(/Projects/)
  })

  test('should display projects heading', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.locator('h1')).toHaveText('Projects')
  })
})
