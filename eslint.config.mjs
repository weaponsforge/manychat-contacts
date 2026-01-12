// @ts-check

import globals from 'globals'
import pluginJs from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

/*
export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
);
*/

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ['node_modules/**'] },
  {
    rules: {
      // 'no-unused-vars': 'off',
      'no-undef': 'error',
      'no-trailing-spaces': 'error',
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'eol-last': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }
      ]
    }
  }
])
