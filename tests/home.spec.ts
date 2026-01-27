import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Home/)
  })

  test('should display welcome message', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toHaveText('Welcome to hawkings.me')
  })

  test('should have GitHub link', async ({ page }) => {
    await page.goto('/')
    const githubLink = page.locator('a[href="https://github.com/ajhawkings"]')
    await expect(githubLink).toBeVisible()
    await expect(githubLink).toHaveText('GitHub profile')
  })
})
