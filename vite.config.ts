import { defineConfig } from '@solidjs/start/config'
export default defineConfig({
  start: {
    server: {
      static: true,
    },
    ssr: false,
  },
})
