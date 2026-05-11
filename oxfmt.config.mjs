/** @see https://oxc.rs/docs/guide/usage/formatter/config-file-reference */
/** Matches the former `.prettierrc`; adds import + package.json sorting (oxfmt extensions). */
export default {
  ignorePatterns: [".astro", "dist", "node_modules", ".cache"],

  // Former `.prettierrc`
  semi: false,
  singleQuote: true,
  printWidth: 80,
  arrowParens: "always",

  sortImports: true,
  sortPackageJson: true,
};
