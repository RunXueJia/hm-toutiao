import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import 'amfe-flexible'
import '@/vants'
Vue.config.productionTip = false
import { getrelativeTime } from '@/utils/day'
Vue.filter('getrelative', (time) => getrelativeTime(time))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
