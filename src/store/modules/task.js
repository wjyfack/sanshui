import {
  fetchTaskList,
  fetchTaskCount
} from '@/api/task'
import { Message } from 'element-ui'
const task = { // 通用滴
  state: {
    total: 0,
    list: [],
    pages: 0,
    taskCount: {
      taskStatus1: 0,
      taskStatus2: 0,
      taskStatus3: 0,
      taskStatus4: 0,
      taskStatus5: 0,
      taskStatus6: 0,
      taskStatusAll: 0
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
    SET_TASKCOUNT: (state, taskCount) => {
      state.taskCount = taskCount
    }
  },
  actions: {
    fetchTaskList({ commit }, data) {
      return new Promise((resolve, reject) => {
        fetchTaskList(data).then(response => {
          if (response.resultCode === '0000000') {
            const data = response.returnData
            commit('SET_TOTAL', data.total)
            commit('SET_LIST', data.list)
            commit('SET_PAGES', data.pages)
            resolve()
          } else {
            Message({ message: response.resultDesc, type: 'error' })
            reject(response.resultDesc)
          }
        }).catch(error => reject(error))
      })
    },
    actionsTaskCount({ commit }) {
      return new Promise((resolve, reject) => {
        fetchTaskCount().then(response => {
          console.log(response)
          if (response.resultCode === '0000000') {
            const data = response.returnData
            const info = {
              taskStatus1: 0,
              taskStatus2: 0,
              taskStatus3: 0,
              taskStatus4: 0,
              taskStatus5: 0,
              taskStatus6: 0,
              taskStatusAll: 0
            }
            // 检查任务状态 1:待派发 2:待接收 3:待处理4:处理中 5:待审核6:已完成 全部：自己加
            data.forEach(element => {
              switch (element.status) {
                case '1':
                  info.taskStatus1 = element.total
                  break
                case '2':
                  info.taskStatus2 = element.total
                  break
                case '3':
                  info.taskStatus3 = element.total
                  break
                case '4':
                  info.taskStatus4 = element.total
                  break
                case '5':
                  info.taskStatus5 = element.total
                  break
                case '6':
                  info.taskStatus6 = element.total
                  break
              }
            })
            const taskStatusAll = data.reduce((tatol, item) => {
              return tatol + item.total
            }, 0)
            info.taskStatusAll = taskStatusAll
            console.log(info)
            commit('SET_TASKCOUNT', info)
          }
        })
      })
    }
  }
}

export default task
