import {
  fetchMohuCom
} from '@/api/shebei'
import { fetchDeviceType, fetchIntructionModel, fetchDtName } from '@/api/common'
// import { getTree } from '@/utils/common'

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
    taskAddTime: '' // 移交书日期
  },
  mutations: {
    SET_COMPANYLIST: (state, companyList) => {
      state.comlist = companyList
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
    }
  },
  actions: {
    actionsMohuCom({ commit }) {
      return new Promise((resolve, reject) => {
        fetchMohuCom().then(response => {
          let data = response.returnData
          data = data.map(item => {
            return {
              value: item.useName,
              id: item.id,
              useContactMan: item.useContactMan,
              useAddress: item.useAddress,
              useContactManTel: item.useTel
            }
          })
          commit('SET_COMPANYLIST', data)
          resolve()
        }).catch(error => reject(error))
      })
    },
    actionsDeviceType({ commit }) {
      return new Promise((resolve, reject) => {
        fetchDeviceType().then(response => {
          const data = response.returnData
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
          commit('SET_DEPTNAMES', data) // 指令书模板
          resolve()
        }).catch(error => reject(error))
      })
    },
    actionsExecTaskAddTime({ commit }, data) {
      commit('SET_TASKADDTIME', data)
    }
  }
}

export default common
