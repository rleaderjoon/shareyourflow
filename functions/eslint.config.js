import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import googleConfig from 'eslint-config-google';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.js'],
    ignores: ['eslint.config.js', 'lib/**/*'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.dev.json'],
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...googleConfig.rules,
      'quotes': ['error', 'double'],
      'import/no-unresolved': 'off',
      'indent': ['error', 2],
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'off',
    },
  },
  {
    ignores: ['/lib/**/*', '/generated/**/*', 'eslint.config.js'],
  },
]; 