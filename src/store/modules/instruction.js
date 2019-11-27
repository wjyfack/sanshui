import {
  fetchInstructionList,
  fetchTaskCount,
  fetchCheckCount
} from '@/api/instruction'

const instruction = { // 通用滴
  state: {
    total: 0,
    list: [],
    pages: 0,
    status: '1',
    instrCount: {
      instrStatus1: 0,
      instrStatus2: 0,
      instrStatus3: 0,
      instrStatus4: 0,
      instrStatus5: 0,
      instrStatus6: 0,
      instrStatus7: 0,
      instrStatus8: 0,
      instrStatusEnd: 0,
      instrStatusAll: 0
    },
    checkCount: {
      checkStatus0: 0,
      checkStatus1: 0,
      checkStatus2: 0,
      checkStatusAll: 0
    }
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
    },
    SET_INSTRCOUNT: (state, instrCount) => {
      state.instrCount = instrCount
    },
    SET_CHECKCOUNT: (state, info) => {
      state.checkCount = info
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
    },
    actionsIntrcCount({ commit }, data) {
      return new Promise((resolve, reject) => {
        fetchTaskCount(data).then(response => {
          // console.log(response)
          if (response.resultCode === '0000000') {
            const data = response.returnData
            const info = {
              instrStatus1: 0,
              instrStatus2: 0,
              instrStatus3: 0,
              instrStatus4: 0,
              instrStatus5: 0,
              instrStatus6: 0,
              instrStatus7: 0,
              instrStatus8: 0,
              instrStatusEnd: 0,
              instrStatusAll: 0
            }
            /**
             * 指令书处理状态
              1 镇街待移交 12 待移交 7 批准移交 3 待处理 8回复审核 4 待确认  5:处理完成 51:直接完成
              已完成：5+51
              全部：自己加
             */
            data.forEach(element => {
              switch (element.status) {
                case '1':
                  info.instrStatus1 = element.total
                  break
                case '2':
                  info.instrStatus2 = element.total
                  break
                case '3':
                  info.instrStatus3 = element.total
                  break
                case '4':
                  info.instrStatus4 = element.total
                  break
                case '5':
                  info.instrStatus5 = element.total
                  break
                case '6':
                  info.instrStatus6 = element.total
                  break
                case '7':
                  info.instrStatus7 = element.total
                  break
                case '8':
                  info.instrStatus8 = element.total
                  break
              }
            })
            const instrStatusAll = data.reduce((tatol, item) => {
              return tatol + item.total
            }, 0)
            info.instrStatusAll = instrStatusAll
            info.instrStatusEnd = info.instrStatus3 + info.instrStatus8
            // console.log(info)
            commit('SET_INSTRCOUNT', info)
          }
        })
      })
    },
    actionsCheckCount({ commit }) {
      return new Promise((resolve, reject) => {
        fetchCheckCount().then(response => {
          // console.log(response)
          if (response.resultCode === '0000000') {
            const data = response.returnData
            const info = {
              checkStatus0: 0,
              checkStatus1: 0,
              checkStatus2: 0,
              checkStatusAll: 0
            }
            data.forEach(element => {
              switch (element.status) {
                case '1':
                  info.checkStatus1 = element.total
                  break
                case '2':
                  info.checkStatus2 = element.total
                  break
                case '0':
                  info.checkStatus0 = element.total
                  break
              }
            })
            const checkStatusAll = data.reduce((tatol, item) => {
              return tatol + item.total
            }, 0)
            info.checkStatusAll = checkStatusAll
            // console.log(info)
            commit('SET_CHECKCOUNT', info)
          }
        })
      })
    }
  }
}

export default instruction
