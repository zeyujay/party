import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    table: []
  },
  mutations: {
    ADD_USER (state, data) {
      console.log(data)
      state.table.push(data)
    }
  },
  getters: {
    table: state => state.table
  },
  actions: {
  },
  modules: {
  }
})
