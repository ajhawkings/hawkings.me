import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'
import * as tsParser from '@typescript-eslint/parser'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // Sets up astro-eslint-parser for *.astro files (and tsParser for the
  // <script> blocks inside them). Must come before the prettier config.
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  },
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
]
