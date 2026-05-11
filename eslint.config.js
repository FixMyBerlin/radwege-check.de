const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    ignores: [
      "**/node_modules/**",
      "**/.cache/**",
      "**/public/**",
      "**/coverage/**",
      "**/.pnp/**",
      "**/.pnp.js",
      "**/*.log",
    ],
  },
  ...compat.extends("plugin:react/recommended", "prettier", "plugin:prettier/recommended"),
  {
    languageOptions: {
      ecmaVersion: 2019,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: ".",
        },
      },
      react: {
        version: "detect",
      },
    },
    rules: {
      "prettier/prettier": "error",
      "import/prefer-default-export": "off",
      "react/prop-types": "off",
      "react/jsx-filename-extension": "off",
      "react/jsx-props-no-spreading": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.[jt]s",
            "**/*.spec.[jt]s",
            "**/*.test.[jt]sx",
            "**/*.spec.[jt]sx",
          ],
        },
      ],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
        },
      ],
      "react/function-component-definition": [
        2,
        {
          namedComponents: "function-declaration",
        },
      ],
    },
  },
  ...compat.extends(
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ),
  {
    files: ["**/*.+(ts|tsx)"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      import: importPlugin,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "warn",
      "import/no-unresolved": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/*.test.ts", "**/*.spec.ts", "**/*.test.tsx", "**/*.spec.tsx"],
        },
      ],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/require-default-props": "off",
      "arrow-body-style": "off",
    },
  },
];
