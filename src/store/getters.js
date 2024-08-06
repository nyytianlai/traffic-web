/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-04-18 17:27:55
 * @LastEditTime: 2022-09-29 15:40:46
 * @FilePath: \ImmediateAction_web\src\store\getters.js
 * @Description: FilePath
 */
const getters = {
  rootFontSize: (state) => state.system.rootFontSize,
  vHeight: (state) => state.system.vHeight,
  index: (state) => state.spring.index,
  nlDate: (state) => state.spring.nlDate,
  date: (state) => state.spring.date,
  glEnd: (state) => state.spring.glEnd,
}
export default getters
