import {
  fetchInstructionList
} from '@/api/instruction'

const instruction = { // 通用滴
  state: {
    total: 0,
    list: [],
    pages: 0
  },
  mutations: {
    SET_TOTAL: (state, total) => {
      state.total = total
    },
    SET_LIST: (state, list) => {
      state.list = list
    },
    SET_PAGES: (state, pages) => {
      state.pages = pages
    }
  },
  actions: {
    fetchInstructionList({ commit }, data) {
      return new Promise((resolve, reject) => {
        fetchInstructionList(data).then(response => {
          const data = response.returnData
          commit('SET_TOTAL', data.total)
          commit('SET_LIST', data.list)
          commit('SET_PAGES', data.pages)
          resolve()
        }).catch(error => reject(error))
      })
    }
  }
}

export default instruction
