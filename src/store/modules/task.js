import {
  fetchTaskList
} from '@/api/task'

const task = { // 通用滴
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
    fetchTaskList({ commit }, data) {
      return new Promise((resolve, reject) => {
        fetchTaskList(data).then(response => {
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

export default task
