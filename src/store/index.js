import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'
Vue.use(Vuex)
const userKey = 'TOUTIAO-USER'
export default new Vuex.Store({
  state: {
    user: getItem(userKey) || {}

  },
  getters: {
    token: (state) => state.user.token
  },
  mutations: {
    setUser(state, data) {
      state.user = data,
        // localStorage.setItem(userKey, JSON.stringify(data))
        setItem(userKey, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
