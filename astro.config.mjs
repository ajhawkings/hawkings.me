import { defineConfig, fontProviders } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  output: 'server',
  // Prefetch every internal link as soon as it enters the viewport, so
  // navigation feels instant (SPA-like) without client-side routing.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  devToolbar: {
    enabled: false,
  },
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
  }),
  site: 'https://www.hawkings.me',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-bricolage',
      weights: ['500 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Instrument Sans',
      cssVariable: '--font-instrument',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],
  integrations: [sitemap()],
})
