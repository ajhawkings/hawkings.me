import { test, expect } from '@playwright/test'

test.describe('Contact (Turnstile-gated email)', () => {
  test('GET renders the challenge, not the email', async ({ request }) => {
    const res = await request.get('/contact')
    expect(res.status()).toBe(200)
    const html = await res.text()

    expect(html).toContain('cf-turnstile')
    expect(html).toContain('id="cf-form"')
    // Email must stay hidden until verification succeeds.
    expect(html).not.toContain('hello@hawkings.me')
  })

  test('a POST without a token keeps the email hidden', async ({ request }) => {
    // No token means we never even call siteverify, so this is stable
    // regardless of whether real or test Turnstile keys are configured.
    // (Origin header satisfies Astro's built-in CSRF check for form POSTs.)
    const res = await request.post('/contact', {
      headers: { Origin: 'http://localhost:4321' },
      form: { 'cf-turnstile-response': '' },
    })
    expect(res.status()).toBe(200)
    const html = await res.text()
    expect(html).not.toContain('hello@hawkings.me')
    expect(html).toContain('cf-turnstile')
  })
})
