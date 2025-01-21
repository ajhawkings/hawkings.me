import eslint from '@eslint/js';
import eslintConfigPrettier from "eslint-config-prettier";
import solid from "eslint-plugin-solid/configs/typescript";
import tseslint from 'typescript-eslint';
import * as tsParser from "@typescript-eslint/parser";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{ts,tsx}'],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  },
]
