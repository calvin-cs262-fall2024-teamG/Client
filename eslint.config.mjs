import structuredClone from '@ungap/structured-clone';

if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = structuredClone;
}

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "react/prop-types": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",
      "no-var": "error",
      "eqeqeq": ["error", "always"],
      "curly": "error",
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "always"]
    }
  },
  {
    files: ["babel.config.js"],
    languageOptions: {
      globals: globals.node
    }
  }
];