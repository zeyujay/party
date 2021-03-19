import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { vueBaberrage } from 'vue-baberrage'
import './assets/style'
Vue.config.productionTip = false
Vue.use(vueBaberrage)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
