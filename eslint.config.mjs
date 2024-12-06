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
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect" // Automatically detect the React version
      }
    }
  },
  {
    files: ["babel.config.js"],
    languageOptions: {
      globals: globals.node
    }
  }
];