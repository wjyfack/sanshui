import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import 'viewerjs/dist/viewer.css'
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
// import '@/permission' // permission control
import '@/router/main'

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
// import '../mock' // simulation data

// import VuePreview from 'vue-preview'
// import Viewer from 'viewerjs'

// defalut vue-preview
// Vue.use(VuePreview)

// Vue.use(VuePreview, {
//   mainClass: 'pswp--minimal--dark',
//   barsSize: { top: 0, bottom: 0 },
//   captionEl: false,
//   fullscreenEl: true,
//   shareEl: false,
//   bgOpacity: 0.85,
//   tapToClose: true,
//   tapToToggleControls: false
// })

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
