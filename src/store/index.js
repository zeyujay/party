import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    table: [],
    isShowQrcode: false
  },
  mutations: {
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
    isShowQrcode: state => state.isShowQrcode
  },
  actions: {
  },
  modules: {
  }
})
