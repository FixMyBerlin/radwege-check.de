import type { KnipConfig } from "knip";

/**
 * Extra entry files outside `src/` (Astro plugin already covers `astro.config.mjs`,
 * `src/pages/**`, Vitest, Oxlint, etc.).
 */
export default {
  entry: ["oxfmt.config.mjs", "taze.config.js"],
  ignoreBinaries: ["gh"],
  ignoreDependencies: [
    /** String reference in `astro.config.mjs` — not a static import. */
    "babel-plugin-react-compiler",
    /** Loaded by name in `oxlint.config.ts` (`jsPlugins`). */
    "eslint-plugin-react-compiler",
  ],
} satisfies KnipConfig;
