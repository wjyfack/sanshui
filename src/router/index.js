import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    meta: { title: '首页' },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  { path: '/paifa', component: () => import('@/views/paifa/index'), hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'hash', // hash后端支持可开history
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    name: 'sys_home_page',
    children: [{
      path: 'dashboard',
      meta: { title: '首页', icon: 'home' },
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/shebei',
    component: Layout,
    redirect: '/shebei',
    name: 'sys_device',
    children: [{
      path: 'shebei',
      meta: { title: '设备管理', icon: 'shibei' },
      component: () => import('@/views/shebei/index')
    }]
  },
  {
    path: '/renwu',
    component: Layout,
    redirect: '/renwu',
    name: 'sys_task',
    children: [{
      path: 'renwu',
      meta: { title: '任务', icon: 'renwu' },
      component: () => import('@/views/renwu/index')
    }]
  },
  {
    path: '/zhilingshu',
    component: Layout,
    redirect: '/zhilingshu',
    name: 'sys_command',
    children: [{
      path: 'zhilingshu',
      meta: { title: '指令书移交', icon: 'yijiao' },
      component: () => import('@/views/zhilingshu/index')
    }]
  },
  {
    path: '/shengju',
    component: Layout,
    redirect: '/shengju',
    name: 'sys_province_data',
    children: [{
      path: 'shengju',
      meta: { title: '省局数据查询', icon: 'shuju' },
      component: () => import('@/views/shengju/index')
    }]
  },
  {
    path: '/houtai',
    component: Layout,
    redirect: '/houtai',
    name: 'sys_bg_manage',
    // alwaysShow: true,
    meta: { title: '后台管理', icon: 'houtai' },
    children: [{
      name: 'sys_acount',
      path: 'account',
      meta: { title: '用户管理' },
      component: () => import('@/views/houtai/account/index')
    }, {
      name: 'sys_commandBase_mode',
      path: 'instrucBase',
      meta: { title: '指令书基础管理' },
      component: () => import('@/views/houtai/instrucBase/index')
    }, {
      name: 'sys_command_mode',
      path: 'instruc',
      meta: { title: '指令书模板管理' },
      component: () => import('@/views/houtai/instrucTemp/index')
    }
    // , {
    //   hidden: true,
    //   path: 'weigui',
    //   meta: { title: '违规模板管理' },
    //   component: () => import('@/views/houtai/weigui/weigui')
    // }
    ]
  },
  {
    path: '/units',
    component: Layout,
    redirect: '/units',
    name: 'sys_comany',
    children: [{
      path: 'units',
      meta: { title: '单位管理', icon: 'units' },
      component: () => import('@/views/units_manager/index')
    }]
  }
]

