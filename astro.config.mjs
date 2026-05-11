import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, 'src')

// https://astro.build/config
export default defineConfig({
  site: 'https://radwege-check.de',
  trailingSlash: 'never',
  integrations: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', {}]],
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
