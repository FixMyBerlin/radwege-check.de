/**
 * Extra entry files outside `src/` (Astro plugin already covers `astro.config.mjs`,
 * `src/pages/**`, Vitest, Oxlint, etc.).
 *
 * Avoid `import type` from `knip`: that package is a devDependency and some installs
 * or TS setups fail to resolve it for `tsgo`/`tsc` even though the `knip` CLI works.
 */
export default {
  entry: ['taze.config.js'],
  ignoreBinaries: ['gh'],
  ignoreDependencies: [
    /** String reference in `astro.config.mjs` — not a static import. */
    'babel-plugin-react-compiler',
    /** Loaded by name in `oxlint.config.ts` (`jsPlugins`). */
    'eslint-plugin-react-compiler',
  ],
}
