const getters = {}
const state = {
  index: 0, // 春运第几天
  nlDate: '', // 农历日期
  date: '', // 阳历日期
  glEnd: '' // 春运阳历结束日期
}
const mutations = {
  changeDate: (state, { index, nlDate, glEnd, date }) => {
    state.index = index
    state.nlDate = nlDate
    state.date = date
    state.glEnd = glEnd
  }
}
const actions = {
  setDate: ({ commit }, { index, nlDate, date, glEnd }) => {
    commit('changeDate', { index, nlDate, date, glEnd })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
