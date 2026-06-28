# AGENTS.md

This file provides guidance for coding agents working in this repository.

## Project Overview

Personal website for Angus Hawkings (hawkings.me), built with Astro 5 and deployed to Cloudflare Workers.

## Commands

- `pnpm dev` - Start development server
- `pnpm build` - Type-check with `astro check` then build for production
- `pnpm preview` - Preview production build locally
- `pnpm format` - Format code with Prettier

## Architecture

**Framework**: Astro 5 with server-side rendering (`output: 'server'`)

**Deployment**: Cloudflare Workers via `@astrojs/cloudflare` adapter

**Path Alias**: `~/` maps to `./src/` (configured in tsconfig.json)

**Pages**:

- `index.astro` - The home page: a physics toy where draggable/flingable link
  pills (Twitter, LinkedIn, GitHub, Email) bounce around a warm-paper canvas
  behind a frosted "liquid glass" name card. The Email pill routes to
  `/contact` rather than a raw `mailto:`.
- `contact.astro` - A Cloudflare Turnstile-gated page that reveals the email
  address (`hello@hawkings.me`) only after the challenge is verified
  server-side against Cloudflare's `siteverify` endpoint.

**Layout**: `BaseLayout.astro` provides the warm-paper background, fonts, reset,
`<head>` meta, and a named `head` slot for per-page scripts (e.g. the Turnstile
widget). There is no shared nav.

**Turnstile env vars**: `TURNSTILE_SITE_KEY` (public) and `TURNSTILE_SECRET_KEY`
(secret) are read from `process.env` (Workers exposes vars/secrets there with
`nodejs_compat`). Local dev keys live in `.dev.vars` (gitignored); the code
falls back to Cloudflare's "always passes" test keys if unset. In production,
set the site key as a Worker var and the secret via `wrangler secret put
TURNSTILE_SECRET_KEY`.

**Content Collections** (`src/content.config.ts`): `projects` and `blog`
collections are still defined but currently unused by any page.
