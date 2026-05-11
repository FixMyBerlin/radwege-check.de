import { defineConfig } from "oxlint";

/**
 * React Compiler enforcement matches `babel-plugin-react-compiler` in `astro.config.mjs`,
 * via the official ESLint plugin loaded through Oxlint’s JS plugin API.
 *
 * @see https://oxc.rs/docs/guide/usage/linter/js-plugins.html
 * @see https://www.npmjs.com/package/eslint-plugin-react-compiler
 */
export default defineConfig({
  ignorePatterns: [".astro", "dist", "node_modules", ".cache"],
  jsPlugins: ["eslint-plugin-react-compiler"],
  rules: {
    "react-compiler/react-compiler": "error",
  },
});
