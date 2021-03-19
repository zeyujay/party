import Vue from 'vue'
import Vuex from 'vuex'
import http from '../services/request'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    table: [],
    isShowQrcode: true,
    isLogin: false

  },
  mutations: {
    SET_LOGIN_STATUS (state, data) {
      state.isLogin = data
    },
    ADD_USER (state, data) {
      console.log(data)
      state.table.push(data)
    },
    SHOW_QRCODE (state, data) {
      state.isShowQrcode = data
    }
  },
  getters: {

    table: state => state.table,
    isLogin: state => state.isLogin,
    isShowQrcode: state => state.isShowQrcode
  },
  actions: {
    async login (state, params) {
      console.log(params)
      let data = await http.post('company/loginCompany', params)
      console.log(data)
      return data
    },
    async register (state, params) {
      console.log(params)
      let data = await http.post('company/registerCompany', params)
      console.log(data)
      return data
    },

  },
  modules: {
  }
})
