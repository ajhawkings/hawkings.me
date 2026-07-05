import { defineConfig } from 'astro/config'
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
  integrations: [sitemap()],
})
