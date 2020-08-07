import Vue from 'vue'
import Vuex from 'vuex'
import system from './modules/system'
import organization from './modules/organization'
// import workList from './modules/env'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    system,  // 系統類
    organization,  // 組織表
    // env,  // 環境變數
  }
})
