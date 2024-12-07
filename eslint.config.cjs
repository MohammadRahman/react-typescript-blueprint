module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:sonarjs/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', 'sonarjs', 'jsx-a11y', 'import'],
  rules: {
    'linebreak-style': 0,
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-unused-vars': 'off', // Disable the base rule because it's conflicting with @typescript-eslint/no-unused-vars
    'arrow-parens': ['error', 'always'],
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-nested-switch': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@apis', './src/apis'],
          ['@utils', './src/utils'],
          ['@constants', './src/constants'],
          ['@components', './src/components'],
          ['@features', './src/features'],
          ['@layouts', './src/layouts'],
          ['@pages', './src/pages'],
          ['@hooks', './src/hooks'],
          ['@context', './src/context'],
          ['@mocks', './src/mocks'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
};
