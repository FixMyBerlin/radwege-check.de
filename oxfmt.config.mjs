/** @see https://oxc.rs/docs/guide/usage/formatter/config-file-reference */
/** Matches `.prettierrc` style; adds import + package.json sorting (oxfmt extensions). */
export default {
  ignorePatterns: [".astro", "dist", "node_modules", ".cache"],

  // `.prettierrc` (print width 100 — oxfmt default)
  semi: false,
  singleQuote: true,
  printWidth: 100,
  arrowParens: "always",

  sortImports: true,
  sortPackageJson: true,
};
