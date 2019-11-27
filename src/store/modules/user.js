import { login, getInfo } from '@/api/login' // logout,
import { getToken, setToken, removeToken } from '@/utils/auth'
import avatar from '@/assets/avatar.png'
import { Message } from 'element-ui'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: avatar,
    roles: [],
    userInfo: {},
    deptArea: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_DEPTAREA: (state, deptArea) => {
      state.deptArea = deptArea
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          if (response.resultCode === '0000000') {
            const data = response.returnData
            console.log(response, 123123)
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            // commit('SET_ROLES', data.roleNavList) // 获取角色
            commit('SET_USERINFO', data)
            commit('SET_NAME', data.userNickName)
            if (data.deptArea4Ids && data.deptArea4Names) {
              const deptArea4Ids = data.deptArea4Ids.split(',')
              const deptArea4Names = data.deptArea4Names.split(',')
              const deptArea = deptArea4Ids.map((item, index) => {
                return {
                  value: item,
                  label: deptArea4Names[index]
                }
              })
              commit('SET_DEPTAREA', deptArea)
            }

            resolve()
          } else {
            Message({ message: response.resultDesc, type: 'error' })
            reject(response.resultDesc)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.returnData
          // commit('SET_ROLES', '1')
          // console.log(data)
          commit('SET_ROLES', data)
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
