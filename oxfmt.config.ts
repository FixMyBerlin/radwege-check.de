import { defineConfig } from 'oxfmt'

/**
 * Prettier-like defaults + oxfmt extensions (import / package.json sorting).
 *
 * Use this filename (`oxfmt.config.ts`) or `.oxfmtrc.json` / `.oxfmtrc.jsonc` — oxfmt does **not**
 * auto-discover `oxfmt.config.mjs`, so settings were previously ignored when running `oxfmt src`.
 *
 * @see https://oxc.rs/docs/guide/usage/formatter/config-file-reference
 */
export default defineConfig({
  ignorePatterns: ['.astro', 'dist', 'node_modules', '.cache'],

  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  proseWrap: 'preserve',
  singleAttributePerLine: false,
  htmlWhitespaceSensitivity: 'css',
  embeddedLanguageFormatting: 'auto',

  sortImports: true,
  sortPackageJson: true,
})
