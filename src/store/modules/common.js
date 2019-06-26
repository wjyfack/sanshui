// import {fetchMohuCom} from '@/api/shebei'
import { fetchDeviceType, fetchIntructionModel, fetchDtName } from '@/api/common'
// import { getTree } from '@/utils/common'
import { fetchTaskIllegalList } from '@/api/admin'
const common = { // 通用滴
  state: {
    comlist: [],
    deviceType: [],
    instructionModels: [],
    rules: [], // 违法条例
    problems: [], // 隐患描述
    penaltys: [], // 处罚依据条例
    measures: [], // 整改措施
    deptNames: [], // 接收任务部门
    taskAddTime: '', // 移交书日期
    localAddr: {}, // 设备地址
    taskIllegal: [] // 违规模板
  },
  mutations: {
    SET_COMPANYLIST: (state, comlist) => {
      state.comlist = comlist // sessionStorage.getItem('companyList')
    },
    SET_DEVICETYPE: (state, deviceType) => {
      state.deviceType = deviceType
    },
    SET_INSTRUCTIONMODELS: (state, instructionModels) => {
      state.instructionModels = instructionModels
    },
    SET_RULES: (state, rules) => {
      state.rules = rules
    },
    SET_PROBLEMS: (state, problems) => {
      state.problems = problems
    },
    SET_PENALTYS: (state, penaltys) => {
      state.penaltys = penaltys
    },
    SET_MEASURES: (state, measures) => {
      state.measures = measures
    },
    SET_DEPTNAMES: (state, deptNames) => {
      state.deptNames = deptNames
    },
    SET_TASKADDTIME: (state, taskAddTime) => {
      state.taskAddTime = taskAddTime
    },
    SET_TASKILLEGAL: (state, taskIllegal) => {
      state.taskIllegal = taskIllegal
    },
    SET_LOCALADDR: (state, localAddr) => {
      state.localAddr = localAddr
    }
  },
  actions: {
    actionsMohuCom({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_COMPANYLIST', [])
        resolve()
        // const comlist = sessionStorage.getItem('companyList') ? JSON.parse(sessionStorage.getItem('companyList')) : []
        // console.log(comlist.length)
        // if (comlist.length !== 0) {
        //   commit('SET_COMPANYLIST', comlist)
        //   resolve()
        // } else {
        //   fetchMohuCom().then(response => {
        //     let data = response.returnData
        //     data = data.map(item => {
        //       return {
        //         value: item.useName,
        //         id: item.id,
        //         useContactMan: item.useContactMan,
        //         useAddress: item.useAddress,
        //         useContactManTel: item.useTel
        //       }
        //     })
        //     sessionStorage.setItem('companyList', JSON.stringify(data))
        //     commit('SET_COMPANYLIST', data)
        //     resolve()
        //   }).catch(error => reject(error))
        // }
      })
    },
    actionsDeviceType({ commit }) {
      return new Promise((resolve, reject) => {
        fetchDeviceType().then(response => {
          const data = response.returnData
          // const filterData = data.filter(item => )
          commit('SET_DEVICETYPE', data)
          resolve()
        }).catch(error => reject(error))
      })
    },
    actionsInstructionModels({ commit }) {
      return new Promise((resolve, reject) => {
        fetchIntructionModel().then(response => {
          const data = response.returnData
          commit('SET_INSTRUCTIONMODELS', data) // 指令书模板
          resolve()
        }).catch(error => reject(error))
      })
    },
    actionsDeptNames({ commit }) {
      return new Promise((resolve, reject) => {
        fetchDtName().then(response => {
          const data = response.returnData
          commit('SET_DEPTNAMES', data) // 接收任务部门
          resolve()
        }).catch(error => reject(error))
      })
    },
    actionsExecTaskAddTime({ commit }, data) {
      commit('SET_TASKADDTIME', data)
    },
    actionsLocalAddr({ commit }, data) {
      commit('SET_LOCALADDR', data)
    },
    actionsTaskIllegal({ commit }) {
      return new Promise((resolve, reject) => {
        const data = {
          pageNum: '1',
          pageSize: '50',
          is_lock: '0'
        }
        fetchTaskIllegalList(data).then(response => {
          const data = response.returnData.list.map(item => {
            item.value = item.id
            item.label = item.illegalName
            return item
          })
          // const filterData = data.filter(item => )
          commit('SET_TASKILLEGAL', data)
          resolve()
        }).catch(error => reject(error))
      })
    }
  }
}

export default common
