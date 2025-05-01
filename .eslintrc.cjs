// .eslintrc.js

/**
 * ESLint 規則
 * https://eslint.org/docs/latest/rules/
 */
module.exports = {
  root: true,
  extends: ['@nuxtjs/eslint-config-typescript'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    // 自訂規則
    // 使用 console 時警告提示
    // 'no-console': 'warn',

    // 引號規則
    quotes: ['error', 'single'],

    // 禁止使用 var
    'no-var': 'error',

    // 空行控制
    'no-multiple-empty-lines': ['error', { max: 1 }],

    // 函數空格
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],

    // 縮進使用 2 個空格
    indent: ['error', 2],

    // 關閉 multi-word 規則
    'vue/multi-word-component-names': 'off',

    // 關閉禁止使用 new 的規則
    'no-new': 'off',

    // 禁止未使用的變量
    'no-unused-vars': 'warn',

    // 禁用 console
    'no-console': 'off',

    // 要求使用 === 和 !==
    eqeqeq: 'error',

    // 行尾不允許有空格
    // 'no-trailing-spaces': 'error',

    // 行尾必須使用分號
    // semi: ['error', 'always'],

    // TypeScript 特定規則
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'warn'

    // 禁止使用 any 類型
    // '@typescript-eslint/no-explicit-any': 'warn',
  }
}
