import { test, expect } from '@playwright/test'

test.describe('Home (physics)', () => {
  test('should load the hero', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Angus Hawkings/)
    await expect(page.locator('main h1')).toContainText("Hi, I'm Angus")
    await expect(page.locator('main h1')).toContainText('Product Manager')
  })

  test('should spawn the four draggable link pills', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.pill')).toHaveCount(4)
  })

  test('should link socials externally and email internally', async ({
    page,
  }) => {
    await page.goto('/')

    const github = page.locator('a.pill[href="https://github.com/ajhawkings"]')
    await expect(github).toHaveAttribute('target', '_blank')
    await expect(github).toHaveAttribute('rel', /noopener/)

    // The email pill routes to the Turnstile-gated page, not a raw mailto.
    const email = page.locator('a.pill[href="/contact"]')
    await expect(email).toHaveCount(1)
    await expect(email).not.toHaveAttribute('target', '_blank')
  })
})
