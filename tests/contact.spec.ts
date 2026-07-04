import { test, expect } from '@playwright/test'

test.describe('Contact (Turnstile-gated email)', () => {
  test('GET renders the challenge, not the email', async ({ request }) => {
    const res = await request.get('/contact')
    expect(res.status()).toBe(200)
    const html = await res.text()

    expect(html).toContain('cf-turnstile')
    expect(html).toContain('id="contact-form"')
    // Email must stay hidden until verification succeeds.
    expect(html).not.toContain('hello@hawkings.me')
  })

  test('a verification POST without a token keeps the email hidden', async ({
    request,
  }) => {
    const res = await request.post('/api/contact', {
      headers: { Origin: 'http://localhost:4321' },
      form: { 'cf-turnstile-response': '' },
    })
    expect(res.status()).toBe(400)
    const json = await res.json()
    expect(json.email).toBeUndefined()
    expect(json.error).toContain('challenge')
  })

  test('reveals the email after a successful client verification', async ({
    page,
  }) => {
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({ email: 'hello@hawkings.me' }),
      })
    })

    await page.goto('/contact')
    await page.evaluate(() => {
      ;(
        window as unknown as Window & {
          onTurnstileSuccess: (token: string) => Promise<void>
        }
      ).onTurnstileSuccess('test-token')
    })

    const email = page.locator('#email-link')
    await expect(email).toHaveText('hello@hawkings.me')
    await expect(email).toHaveAttribute('href', 'mailto:hello@hawkings.me')
    await expect(page.locator('#contact-form')).toBeHidden()
  })

  test('shows API verification failures without revealing the email', async ({
    page,
  }) => {
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 403,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Verification failed. Please try again.',
        }),
      })
    })

    await page.goto('/contact')
    await page.evaluate(() => {
      ;(
        window as unknown as Window & {
          onTurnstileSuccess: (token: string) => Promise<void>
        }
      ).onTurnstileSuccess('bad-token')
    })

    await expect(page.locator('#contact-status')).toContainText(
      'Verification failed'
    )
    await expect(page.locator('#email-result')).toBeHidden()
  })
})
