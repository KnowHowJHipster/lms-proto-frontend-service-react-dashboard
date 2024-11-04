module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'main.tsx'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.app.json'
  },
  plugins: [
    'react-refresh',
    'eslint-plugin-no-inline-styles',
    'filename-rules',
    'jsx-a11y',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default',
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'function',
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'import',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'method',
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'property',
        format: null,
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'variable',
        format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
    ],
    'filename-rules/match': [2, { '.ts': 'kebab-case', '.tsx': 'kebab-case' }],
    'no-inline-styles/no-inline-styles': 2,
    'react/display-name': 'warn',
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    'react/jsx-max-depth': ['error', { max: 7 }],
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
    'react/jsx-sort-props': 'warn',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 0,
    'react/self-closing-comp': 'warn',
    'semi': [2, 'always'],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/default-param-last': 'off',
    'no-plusplus': 'off',
    'react/destructuring-assignment': 'off',
    'react-refresh/only-export-components': 'off',
    'import/extensions': 'off',
    'prefer-destructuring': 'off',
    'react/require-default-props': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'no-console': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/tabindex-no-positive': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/state-in-constructor': 'off',
    'react/no-array-index-key': 'off',
    'react/no-unused-prop-types': 'off',
    'react/button-has-type': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-multi-assign': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-param-reassign': 'off'
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
}
