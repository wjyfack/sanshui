import { asyncRouterMap, constantRouterMap } from '@/router'

function hasPermission(roles, route) {
  if (route.name) {
    return roles.some(role => role === route.name)
  } else {
    return true
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let arr = []
        roles.forEach(item => {
          arr = [...arr, item.navName]
          if (item.childNav && item.childNav.length > 0) {
            item.childNav.forEach(childItem => {
              arr = [...arr, childItem.navName]
            })
          }
        })
        // console.log(arr)
        const accessedRouters = asyncRouterMap.filter(v => {
          // console.log(data, v)
          // if (roles.indexOf('admin') >= 0) return true
          if (hasPermission(arr, v)) {
            // console.log(v)
            // if (v.navName === 'sys_bg_manage') {
            //   v.alwaysShow = true
            // } else {
            //   v.alwaysShow = false
            // }
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(arr, child)) {
                  return child
                }
                return false
              })
              return v
            } else {
              return v
            }
          }
          return false
        })
        // console.log(accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
