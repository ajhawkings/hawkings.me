import { test, expect } from '@playwright/test'

test.describe('404 Page', () => {
  test('should load for non-existent route', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist')
    expect(response?.status()).toBe(404)
  })
})
