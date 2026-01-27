# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Angus Hawkings (hawkings.me), built with Astro 5 and deployed to Cloudflare Workers.

## Commands

- `npm run dev` - Start development server
- `npm run build` - Type-check with `astro check` then build for production
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier

## Architecture

**Framework**: Astro 5 with server-side rendering (`output: 'server'`)

**Deployment**: Cloudflare Workers via `@astrojs/cloudflare` adapter

**Path Alias**: `~/` maps to `./src/` (configured in tsconfig.json)

**Content Collections** (`src/content/config.ts`):

- `projects` - Portfolio projects with title, description, url, github, publishDate, tags, featured
- `blog` - Blog posts with title, description, publishDate, updatedDate, tags, draft

**Layout**: Single `BaseLayout.astro` wraps all pages with NavBar, global styles, and meta tags
