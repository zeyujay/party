import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { vueBaberrage } from 'vue-baberrage'
import Vconsole from 'vconsole'
//import echarts from 'echarts'
var echarts = require('echarts')
Vue.prototype.$echarts = echarts

import './assets/style'
Vue.config.productionTip = false
Vue.use(vueBaberrage)
//Vue.prototype.$vConsole = new Vconsole()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
