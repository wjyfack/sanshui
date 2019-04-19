import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import device from './modules/shebei'
import common from './modules/common'
import task from './modules/task'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    device,
    common,
    task
  },
  getters
})

export default store
