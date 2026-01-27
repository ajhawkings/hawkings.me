import { test, expect } from '@playwright/test'

test.describe('404 Page', () => {
  test('should return 404 status for non-existent route', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist', {
      waitUntil: 'domcontentloaded',
    })
    expect(response?.status()).toBe(404)
  })
})
