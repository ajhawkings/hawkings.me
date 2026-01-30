import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import * as tsParser from '@typescript-eslint/parser'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{ts,tsx,astro}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
        extraFileExtensions: ['.astro'],
      },
    },
  },
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
]
