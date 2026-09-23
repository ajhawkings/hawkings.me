# AGENTS.md

This file provides guidance for coding agents working in this repository.

## Project Overview

Personal website for Angus Hawkings (hawkings.me), built with Astro 7 and deployed to Cloudflare Workers.

Keep shared agent guidance here. Use British English for site copy and
documentation.

## Current Content

As of September 2026, the homepage describes a completed Product Manager
internship at Cloudflare, working on skew protection for Workers. Angus is
spending the third year of his University of Edinburgh Computer Science
degree on exchange at ETH Zürich. Treat this as dated context and update it
when the user supplies a new role or chapter.

The hero starts with "Hi, I'm Angus.", followed by career and education
paragraphs and the social dock. The old focus badges and technology footer
have been removed.

## Commands

Use Node 24 (`.nvmrc`) and the pnpm version pinned in `package.json`
(currently 11.22.0). Install dependencies with `pnpm install --frozen-lockfile`.

- `pnpm dev` - Start development server
- `pnpm build` - Type-check with `astro check` then build for production
- `pnpm preview` - Build then run locally under `wrangler dev`
- `pnpm test` - Run Playwright tests (Chromium; set `CROSS_BROWSER=1` to add Firefox/WebKit)
- `pnpm format` - Format code with Prettier
- `pnpm exec prettier --check AGENTS.md` - Check this guidance without rewriting other files

## Architecture

**Framework**: Astro 7 with `output: 'server'`; the home page opts into
prerendering with `export const prerender = true`.

**Deployment**: Cloudflare Workers via `@astrojs/cloudflare` adapter

**Sessions**: `session: false` in `astro.config.mjs` is intentional. The site
does not use sessions; enabling the adapter default adds an unconfigured
`SESSION` KV binding that strict Workers preview deployments reject.

**Path Alias**: `~/` maps to `./src/` (configured in tsconfig.json)

**Pages** (`src/pages/`):

- `index.astro` - Text-led hero highlighting Cloudflare experience and ETH
  Zürich exchange, followed by the `PhysicsDock` social-links component.
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
`src/assets/og-image.svg` (not deployed). The layout uses the PNG for both
Open Graph and Twitter cards. It is a separate asset: changing page copy or
metadata does not update the words rendered in the image. There is currently
no image regeneration script in `package.json`.

**Turnstile env vars**: `TURNSTILE_SITE_KEY` (public) and `TURNSTILE_SECRET_KEY`
(secret) are read from `process.env` (Workers exposes vars/secrets there with
`nodejs_compat`). Local dev keys live in `.dev.vars` (gitignored). The site key
has a test-key fallback, but the secret's always-pass fallback is development
only: a missing production secret returns an error. Keep the contact page
server-rendered so it reads the runtime site key. The public key is configured
in `wrangler.jsonc`; configure the production secret through Workers secrets.

**Tests** (`tests/`): Playwright specs covering the home page (pills, keyboard
operability of physics clones, mobile overflow) and the contact flow (email
never in the HTML, token-less POSTs rejected, mocked success/failure paths),
plus the HTTP status of the 404 page. Playwright starts the Astro dev server
with `ASTRO_DEV_BACKGROUND=0`; preserve this so the test runner can manage it.

## Role or Education Change Checklist

Review these together whenever a role, employer, university or current chapter
changes. Only change facts supplied by the user; do not infer launch dates or
whether a project is publicly available.

- `src/pages/index.astro`: update the visible career and education paragraphs
  and the `BaseLayout` description. Check past/current/future tense throughout.
- `src/layouts/BaseLayout.astro`: review the Person JSON-LD affiliations and
  any role fields. The page description feeds the description, Open Graph and
  Twitter metadata, while JSON-LD is maintained separately and shared by pages.
- `src/assets/og-image.svg` **and** `public/og-image.png`: update the image copy
  and regenerate the PNG from the SVG. Commit both. Preserve the 1200 × 630
  dimensions declared in the layout, and visually inspect the actual PNG for
  stale wording, clipping, font substitutions and accented characters.
- `tests/home.spec.ts`: update assertions for intentional copy changes and
  retain coverage of social links, keyboard operation and mobile overflow.
- This file's dated content summary: keep future agents informed of the new
  chapter. Search the repository for the previous role, employer and university
  wording to catch other references; retain accurate historical mentions.
- PR title and description: describe the final implementation, including any
  additional changes. Remove abandoned wording or promises such as "coming
  soon" if they are absent from the final page.

## Validation and Review Learnings

- For homepage changes, run `pnpm build` and `pnpm test`, then check the page
  at desktop and narrow mobile widths in both themes. Check any changed brand
  text colours for contrast; ETH has separate light and dark theme colours.
- The gravity button has `role="switch"` and reports state through
  `aria-checked`. Preserve its accessible name and keyboard operation when
  changing the visible label or styling.
- Check the rendered social image separately from the page. Passing copy
  assertions and builds did not catch the old internship title embedded in
  the PNG during the September 2026 refresh.
- For documentation-only changes, check formatting and `git diff --check`;
  application tests are unnecessary unless behaviour also changes. Asset-only
  changes need a render check and verification of dimensions.
- GitHub runs Playwright and a Prettier workflow; Prettier can commit formatting
  changes back to the branch. Sync before subsequent edits and pushes. Workers
  preview builds provide a separate deployment check. Report checks against
  the revision they actually tested, distinguishing local checks from CI.
- `.github/workflows/claude.yml` handles `@claude` mentions in issues and PR
  comments/reviews using `CLAUDE_CODE_OAUTH_TOKEN`. Include workflow changes in
  the PR summary even when the main task is a content refresh.
