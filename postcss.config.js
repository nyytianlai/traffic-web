/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-04-20 19:27:16
 * @LastEditTime: 2022-08-03 16:40:59
 * @FilePath: \zndd-web\postcss.config.js
 * @Description: FilePath
 */
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-plugin-px2rem': {
      rootValue: 100,
      unitPrecision: 5,
      propWhiteList: [],
      propBlackList: [],
      exclude:false,
      selectorBlackList: [],
      ignoreIdentifier: false,
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
      // exclude: /src|charts/i
    }
  }
}
