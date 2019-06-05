import {
  fetchInstructionList
} from '@/api/instruction'

const instruction = { // 通用滴
  state: {
    total: 0,
    list: [],
    pages: 0,
    status: '1'
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
    },
    SET_STATUS: (state, status) => {
      state.status = status
    }
  },
  actions: {
    fetchInstructionList({ commit }, data) {
      return new Promise((resolve, reject) => {
        fetchInstructionList(data).then(response => {
          if (response.resultCode === '0000000') {
            const data = response.returnData
            const pages = data.pages
            commit('SET_TOTAL', data.total)
            commit('SET_LIST', data.list)
            commit('SET_PAGES', pages)
            resolve()
          } else {
            reject()
          }
        }).catch(error => reject(error))
      })
    },
    changeStatus({ commit }, data) {
      commit('SET_STATUS', data)
    }
  }
}

export default instruction
