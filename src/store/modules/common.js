import {
  fetchMohuCom
} from '@/api/shebei'
import { fetchDeviceType } from '@/api/common'
// import { getTree } from '@/utils/common'

const common = { // 通用滴
  state: {
    comlist: [],
    deviceType: []
  },
  mutations: {
    SET_COMPANYLIST: (state, companyList) => {
      state.comlist = companyList
    },
    SET_DEVICETYPE: (state, deviceType) => {
      state.deviceType = deviceType
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
              useContactManTel: item.useContactManTel
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
    }
  }
}

export default common
