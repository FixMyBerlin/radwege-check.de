import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, 'src')

// https://astro.build/config
export default defineConfig({
  site: 'https://radwege-check.de',
  // Default Astro behavior: match both `/path` and `/path/` (production bookmarks use trailing slash).
  // `never` breaks legacy URLs like `/hauptstrassen/?filter=…` in dev/preview with a 404.
  trailingSlash: 'ignore',
  integrations: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', {}]],
      },
    }),
    sitemap({
      namespaces: {
        news: false,
        video: false,
        xhtml: false,
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '~': srcDir,
      },
    },
    ssr: {
      noExternal: ['nuqs'],
    },
  },
})
