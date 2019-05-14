import {
  fetchList
} from '@/api/shebei'

const device = {
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
    getDeviceList({ commit }, listInfo) {
      return new Promise((resolve, reject) => {
        fetchList(listInfo).then(response => {
          if (response.resultCode === '0000000') {
            const data = response.returnData
            commit('SET_TOTAL', data.total)
            commit('SET_LIST', data.list)
            commit('SET_PAGES', data.pages)
            resolve()
          } else {
            reject(response.resultDesc)
          }
        }).catch(error => reject(error))
      })
    }
  }
}

export default device
