/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-09-27 16:44:23
 * @LastEditTime: 2022-11-23 16:08:48
 * @FilePath: \traffic-web\.eslintrc.js
 * @Description: FilePath
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/recommended', '@vue/standard', 'vue-global-api'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    luckysheet: 'readonly',
    mars3d: 'readonly',
    Cesium: 'readonly'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': ['error', 'always'],
    'vue/no-multiple-template-root': 0,
    'vue/no-v-model-argument': 'off',
    'vue/no-v-html': 0,
    'no-control-regex': 0,
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    indent: 'off'
  }
}
