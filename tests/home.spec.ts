import { test, expect } from '@playwright/test'

test.describe('Home (physics)', () => {
  test('should load the v3 hero', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Angus Hawkings/)
    await expect(page.locator('main h1')).toContainText('Building at the')
    await expect(page.locator('main h1')).toContainText('edge of the web')
  })

  test('should render the four dock pills', async ({ page }) => {
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

  test('should render featured projects from content', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('heading', { name: 'Selected work' })
    ).toBeVisible()
    await expect(
      page.getByText('Version skew protection for Workers')
    ).toBeVisible()
    await expect(
      page.getByText('Local LLM inference on Apple Silicon')
    ).toBeVisible()
    await expect(
      page.getByText('Wikipedia infrastructure editing')
    ).toBeVisible()
  })
})
