import Vue from 'vue'
import Vuex from 'vuex'
// import actions from './actions'
// import mutations from './mutations'
import login from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  modules: {
    login
  }
  // mutations,
  // actions
})