module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes': ['error', 'single'],//强制使用单引号
    "global-require": 0,
    'semi': ['error', 'never']//强制不使用分号结尾
  }
}
