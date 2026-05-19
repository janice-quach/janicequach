// @ts-check
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://janicequach.com',
  server: { port: 7777 },
  integrations: [sitemap()],
})
