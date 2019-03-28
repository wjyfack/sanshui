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
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    name: 'shouye',
    children: [{
      path: 'dashboard',
      meta: { title: '首页', icon: 'example' },
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/shebei',
    component: Layout,
    redirect: '/shebei',
    name: 'shebei',
    children: [{
      path: 'shebei',
      meta: { title: '设备管理' },
      component: () => import('@/views/shebei/index')
    }]
  },
  {
    path: '/renwu',
    component: Layout,
    redirect: '/renwu',
    name: 'renwu',
    children: [{
      path: 'renwu',
      meta: { title: '任务' },
      component: () => import('@/views/renwu/index')
    }]
  },
  {
    path: '/zhilingshu',
    component: Layout,
    redirect: '/zhilingshu',
    name: 'zhilingshu',
    children: [{
      path: 'zhilingshu',
      meta: { title: '指令书移交' },
      component: () => import('@/views/zhilingshu/index')
    }]
  },
  // {
  //   path: '/jiancha',
  //   component: Layout,
  //   redirect: '/jiancha',
  //   name: 'jiancha',
  //   children: [{
  //     path: 'jiancha',
  //     meta: { title: '检查记录表' },
  //     component: () => import('@/views/jiancha/index')
  //   }]
  // },
  {
    path: '/shengju',
    component: Layout,
    redirect: '/shengju',
    name: 'shengju',
    children: [{
      path: 'shengju',
      meta: { title: '省局数据查询' },
      component: () => import('@/views/shengju/index')
    }]
  },
  {
    path: '/tejian',
    component: Layout,
    redirect: '/tejian',
    name: 'tejian',
    children: [{
      path: 'tejian',
      meta: { title: '特检抽查' },
      component: () => import('@/views/tejian/index')
    }]
  },
  {
    path: '/houtai',
    component: Layout,
    redirect: '/houtai',
    name: 'houtai',
    children: [{
      path: 'houtai',
      meta: { title: '后台管理' },
      component: () => import('@/views/houtai/index')
    }]
  },
  // 派发
  { path: '/paifa', component: () => import('@/views/paifa/index'), hidden: true },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'hash', // hash后端支持可开history
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
