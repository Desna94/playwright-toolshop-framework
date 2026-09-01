import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: [
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
      "blob-report/**",
      "coverage/**",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],

    extends: [js.configs.recommended, tseslint.configs.recommended],
  },

  eslintConfigPrettier,
);
