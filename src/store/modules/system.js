/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-04-18 17:27:55
 * @LastEditTime: 2022-11-01 15:20:16
 * @FilePath: \vite-antdV\src\store\modules\system.js
 * @Description: FilePath
 */
const getters = {
}
const state = {
  rootFontSize: 100,
  vHeight: 1080
}
const mutations = {
  changeRootFontSize: (state, { rootFontSize, vHeight }) => {
    state.rootFontSize = rootFontSize
    state.vHeight = vHeight
  }
}
const actions = {
  setRootFontSize ({ commit }, { rootFontSize, vHeight }) {
    commit('changeRootFontSize', { rootFontSize: rootFontSize, vHeight })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
