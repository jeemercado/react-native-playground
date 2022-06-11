const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'eslint:recommended',
    'eslint-config-prettier',
    'plugin:react/recommended',
    'plugin:react-perf/recommended',
    'plugin:sonarjs/recommended',
  ],
  ignorePatterns: [
    '*.d.ts',
    'babel.config.js',
    '.eslintrc.js',
    'jest.config.js',
    'react-native.config.js',
    'metro.config.js',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-perf',
    'react-hooks',
    'sonarjs',
    'import',
    'prettier',
  ],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
      },
    ],
    '@typescript-eslint/no-use-before-define': ['error'],
    'array-bracket-spacing': ['error', 'never'],
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'brace-style': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    'comma-spacing': [
      'error',
      {
        after: true,
        before: false,
      },
    ],
    curly: 'error',
    'eol-last': ['error', 'always'],
    eqeqeq: ['error', 'always'],
    'func-names': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'jsx-quotes': ['error', 'prefer-double'],
    'key-spacing': [
      'error',
      {
        mode: 'strict',
      },
    ],
    'max-depth': ['error', 3],
    'max-len': [
      'error',
      {
        code: 125,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'max-params': ['error', 3],
    'no-alert': 'error',
    'no-console': 'warn',
    'no-duplicate-imports': 'error',
    'no-empty-function': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-extra-semi': 'warn',
    'no-magic-numbers': [
      'error',
      {
        ignore: [-1, 0, 1, 2, 30, 60, 100, 1000],
        ignoreArrayIndexes: true,
      },
    ],
    'no-multi-spaces': 'warn',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 0,
      },
    ],
    'no-plusplus': 'warn',
    'no-trailing-spaces': 'warn',
    'no-unreachable': 'error',
    'no-unused-expressions': 'warn',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-var': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: 'return',
        prev: '*',
      },
    ],
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'error',
    'prettier/prettier': ['error', prettierOptions],
    quotes: ['error', 'single', { avoidEscape: true }],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-perf/jsx-no-new-array-as-prop': 'off',
    'react-perf/jsx-no-new-function-as-prop': 'off',
    'react-perf/jsx-no-new-object-as-prop': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx', '.ts'],
      },
    ],
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: true,
        reservedFirst: true,
        shorthandFirst: true,
      },
    ],
    'react/prefer-stateless-function': 'error',
    'react/reaxt-in-jsx-scope': 'off',
    'react/sort-comp': [
      'error',
      {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          '/^handle.+$/',
          'everything-else',
          'render',
        ],
      },
    ],
    semi: ['error', 'always'],
    'semi-spacing': [
      'error',
      {
        after: true,
        before: false,
      },
    ],
    'sonarjs/cognitive-complexity': ['error', 30],
    'sort-keys': [
      'error',
      'asc',
      {
        caseSensitive: false,
        minKeys: 2,
        natural: false,
      },
    ],
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        asyncArrow: 'always',
        named: 'never',
      },
    ],
    'space-in-parens': ['error', 'never'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
};
