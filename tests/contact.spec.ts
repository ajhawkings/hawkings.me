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
})
