import { test, expect } from '@playwright/test'

test.describe('Projects Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/projects')
    await expect(page).toHaveTitle(/Projects/)
  })

  test('should display wheel container and carousel', async ({ page }) => {
    await page.goto('/projects')

    // Check wheel container exists
    const wheelContainer = page.locator('.wheel-container')
    await expect(wheelContainer).toBeVisible()

    // Check wheel element exists
    const wheel = page.locator('#wheel')
    await expect(wheel).toBeVisible()
  })

  test('should display project cards with correct structure', async ({
    page,
  }) => {
    await page.goto('/projects')

    // Check that project cards exist
    const projectCards = page.locator('.project-card')
    await expect(projectCards).toHaveCount(6) // Based on projects.ts data

    // Check first visible card has all required elements
    const firstCard = projectCards.first()
    await expect(firstCard.locator('.project-title')).toBeVisible()
    await expect(firstCard.locator('.project-description')).toBeVisible()
    await expect(firstCard.locator('.project-tags')).toBeVisible()
    await expect(firstCard.locator('.project-links')).toBeVisible()
  })

  test('should display up to 3 tags per project', async ({ page }) => {
    await page.goto('/projects')

    const projectCards = page.locator('.project-card')
    const firstCard = projectCards.first()

    // Count tags in first card (should be max 3)
    const tags = firstCard.locator('.tag')
    const tagCount = await tags.count()
    expect(tagCount).toBeLessThanOrEqual(3)
    expect(tagCount).toBeGreaterThan(0)
  })

  test('should display project links when available', async ({ page }) => {
    await page.goto('/projects')

    const projectCards = page.locator('.project-card')
    const firstCard = projectCards.first()

    // First project (Conrad Margoles) should have both Visit and GitHub links
    const links = firstCard.locator('.project-links a')
    await expect(links).toHaveCount(2)

    const visitLink = firstCard.locator('.project-links a:has-text("Visit")')
    await expect(visitLink).toHaveAttribute(
      'href',
      'https://conradmargoles.com'
    )
    await expect(visitLink).toHaveAttribute('target', '_blank')
    await expect(visitLink).toHaveAttribute('rel', 'noopener')

    const githubLink = firstCard.locator('.project-links a:has-text("GitHub")')
    await expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/ajhawkings/conradmargoles'
    )
  })

  test('should display scroll hint', async ({ page }) => {
    await page.goto('/projects')

    const scrollHint = page.locator('.scroll-hint')
    await expect(scrollHint).toBeVisible()
    await expect(scrollHint.locator('span')).toHaveText('Scroll to explore')

    // Check SVG icon is present
    await expect(scrollHint.locator('svg')).toBeVisible()
  })

  test('should rotate carousel on scroll', async ({ page }) => {
    await page.goto('/projects')

    const wheel = page.locator('#wheel')
    const wheelContainer = page.locator('.wheel-container')

    // Get initial rotation
    const initialTransform = await wheel.evaluate(
      (el) => window.getComputedStyle(el).transform
    )

    // Scroll down on the wheel container to trigger rotation
    await wheelContainer.evaluate((el) => {
      const wheelEvent = new WheelEvent('wheel', {
        deltaY: 500, // Enough to exceed scrollThreshold of 320
        bubbles: true,
        cancelable: true,
      })
      el.dispatchEvent(wheelEvent)
    })

    // Wait for animation to start
    await page.waitForTimeout(200)

    // Get new rotation - should be different
    const newTransform = await wheel.evaluate(
      (el) => window.getComputedStyle(el).transform
    )

    expect(newTransform).not.toBe(initialTransform)
  })

  test('should have correct data attributes on cards', async ({ page }) => {
    await page.goto('/projects')

    const projectCards = page.locator('.project-card')

    // Check that each card has a data-index attribute
    for (let i = 0; i < 6; i++) {
      const card = projectCards.nth(i)
      await expect(card).toHaveAttribute('data-index', String(i))
    }
  })

  test('should apply correct styles to centered card', async ({ page }) => {
    await page.goto('/projects')

    // Wait for initialization
    await page.waitForTimeout(100)

    const projectCards = page.locator('.project-card')
    const firstCard = projectCards.first()

    // The first card should be visible (opacity near 1) at initial position
    const opacity = await firstCard.evaluate(
      (el) => window.getComputedStyle(el).opacity
    )

    // Should be highly visible (opacity close to 1)
    expect(parseFloat(opacity)).toBeGreaterThan(0.8)
  })

  test('should have pointer-events enabled only for visible cards', async ({
    page,
  }) => {
    await page.goto('/projects')

    // Wait for initialization
    await page.waitForTimeout(100)

    const projectCards = page.locator('.project-card')

    // Check pointer events on cards
    for (let i = 0; i < 6; i++) {
      const card = projectCards.nth(i)
      const opacity = await card.evaluate((el) =>
        parseFloat(window.getComputedStyle(el).opacity)
      )
      const pointerEvents = await card.evaluate(
        (el) => window.getComputedStyle(el).pointerEvents
      )

      // Cards with opacity > 0.5 should have pointer-events: auto
      if (opacity > 0.5) {
        expect(pointerEvents).toBe('auto')
      } else {
        expect(pointerEvents).toBe('none')
      }
    }
  })
})
