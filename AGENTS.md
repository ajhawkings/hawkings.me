# AGENTS.md

This file provides guidance for coding agents working in this repository.

## Project Overview

Personal website for Angus Hawkings (hawkings.me), built with Astro 7 and deployed to Cloudflare Workers.

## Commands

- `pnpm dev` - Start development server
- `pnpm build` - Type-check with `astro check` then build for production
- `pnpm preview` - Build then run locally under `wrangler dev`
- `pnpm test` - Run Playwright tests (Chromium; set `CROSS_BROWSER=1` to add Firefox/WebKit)
- `pnpm format` - Format code with Prettier

## Architecture

**Framework**: Astro 7 with `output: 'server'`; the home page opts into
prerendering with `export const prerender = true`.

**Deployment**: Cloudflare Workers via `@astrojs/cloudflare` adapter

**Path Alias**: `~/` maps to `./src/` (configured in tsconfig.json)

**Pages** (`src/pages/`):

- `index.astro` - Hero with name, focus chips, and the `PhysicsDock`
  social-links component.
- `contact.astro` - A Cloudflare Turnstile-gated page. The client posts the
  challenge token to `/api/contact`, which reveals the email address only on
  success.
- `api/contact.ts` - POST endpoint that verifies the Turnstile token
  server-side against Cloudflare's `siteverify` endpoint and returns
  `hello@hawkings.me` (or an error).
- `404.astro` - Not-found page (sets `Astro.response.status = 404`).

**Components** (`src/components/`):

- `SiteNav.astro` - Shared glass pill nav (brand, "Say hello" CTA, dark-mode
  toggle persisted to `localStorage.theme`).
- `PhysicsDock.astro` - Dock of social link pills with an optional gravity
  toggle: pills are cloned into fixed-position bodies and simulated with a
  small rAF physics loop (drag, fling, collisions).

**Layout & styles**: `BaseLayout.astro` renders `<head>` meta (SEO/OG/Twitter,
JSON-LD, canonical), the theme-bootstrap inline script, the animated gradient
"sky" background, `SiteNav`, and a named `head` slot for per-page scripts
(e.g. the Turnstile widget). Shared styles and light/dark theme variables live
in `src/styles/global.css` (theme switches on `html[data-theme]`).

**OG image**: served from `public/og-image.png`; its SVG design source is
`src/assets/og-image.svg` (not deployed).

**Turnstile env vars**: `TURNSTILE_SITE_KEY` (public) and `TURNSTILE_SECRET_KEY`
(secret) are read from `process.env` (Workers exposes vars/secrets there with
`nodejs_compat`). Local dev keys live in `.dev.vars` (gitignored); the code
falls back to Cloudflare's "always passes" test keys if unset. In production,
set the site key as a Worker var and the secret via `wrangler secret put
TURNSTILE_SECRET_KEY`.

**Tests** (`tests/`): Playwright specs covering the home page (pills, keyboard
operability of physics clones, mobile overflow) and the contact flow (email
never in the HTML, token-less POSTs rejected, mocked success/failure paths).
