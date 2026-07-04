import type { APIRoute } from 'astro'

export const prerender = false

const EMAIL = 'hello@hawkings.me'
const SITEVERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const form = await request.formData().catch(() => null)
  const token = form?.get('cf-turnstile-response')

  if (typeof token !== 'string' || token.length === 0) {
    return Response.json(
      { error: 'Please complete the challenge first.' },
      { status: 400 }
    )
  }

  // Runtime Worker secret (set via `wrangler secret put`); nodejs_compat
  // exposes it on process.env. import.meta.env is build-time only and would
  // silently fall back to the always-pass test key in production.
  const secret =
    process.env.TURNSTILE_SECRET_KEY ?? '1x0000000000000000000000000000000AA'
  const body = new FormData()
  body.append('secret', secret)
  body.append('response', token)
  if (clientAddress) body.append('remoteip', clientAddress)

  try {
    const response = await fetch(SITEVERIFY_URL, { method: 'POST', body })
    const data = (await response.json()) as { success?: boolean }

    if (data.success !== true) {
      return Response.json(
        { error: 'Verification failed. Please try again.' },
        { status: 403 }
      )
    }

    return Response.json({ email: EMAIL })
  } catch {
    return Response.json(
      { error: 'Could not reach the verification service. Please try again.' },
      { status: 502 }
    )
  }
}
