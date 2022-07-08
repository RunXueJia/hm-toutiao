import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const userKey = 'TOUTIAO-USER'
export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem(userKey)) || {}
  },
  getters: {
  },
  mutations: {
    setUser(state, data) {
      state.user = data,
        localStorage.setItem(userKey, JSON.stringify(data))
    }
  },
  actions: {
  },
  modules: {
  }
})
