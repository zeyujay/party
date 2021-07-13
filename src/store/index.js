import Vue from 'vue'
import Vuex from 'vuex'
import http from '../services/request'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    table: [],
    isShowQrcode: false,
    isLogin: false,
    messageList: [],
    barrageList: [],
    deviceMac: '',
    isEndVote: true,
    isbeginVote: false
  },
  mutations: {
    SET_LOGIN_STATUS (state, data) {
      state.isLogin = data
    },
    ADD_USER (state, data) {
      console.log(data)
      for (let i = 0; i < state.table.length; i++) {
        if (state.table[i].openId == data.openId) {
          state.table[i] = data

          return
        }

      }
      state.table.push(data)
    },
    SHOW_QRCODE (state, data) {
      state.isShowQrcode = data
    },
    ADD_MESSAGE (state, data) {
      state.messageList.push(data)
    },
    ADD_BARRAGE (state, data) {

      state.barrageList.push(data)
    },
    SET_MESSAGELIST (state, data) {
      state.messageList = data
    },
    CLEAR_MESSAGE (state, data) {
      state.messageList = data
    },
    SET_DEVICEMAC (state, data) {
      state.deviceMac = data
    },
    SET_END_VOTE (state, data) {
      state.isEndVote = data
    },
    SET_BEGIN_VOTE (state, data) {
      state.isbeginVote = data
    }
  },
  getters: {

    table: state => state.table,
    isLogin: state => state.isLogin,
    isShowQrcode: state => state.isShowQrcode,
    messageList: state => state.messageList,
    barrageList: state => state.barrageList,
    deviceMac: state => state.deviceMac,
    isEndVote: state => state.isEndVote,
    isbeginVote: state => state.isbeginVote,
  },
  actions: {
    async login (state, params) {
      console.log(params)
      let data = await http.post('business/screen/getQrcode', params)
      console.log(data)
      return data
    },
    async register (state, params) {
      console.log(params)
      let data = await http.post('company/registerCompany', params)
      console.log(data)
      return data
    },
    async addTitle (state, params) {
      console.log(params)
      let data = await http.post('/business/question/save', params)
      console.log(data)
      return data
    },
    async editTitle (state, params) {
      console.log(params)
      let data = await http.post('/business/question/save', params)
      console.log(data)
      return data
    },
    async delTitle (state, params) {
      console.log(params)
      let data = await http.post('/business/question/delete', params)
      console.log(data)
      return data
    },
    async allTitle (state, params) {
      console.log(params)
      let data = await http.get('/business/question/listAll', params)
      console.log(data)
      return data
    },
    async beginVote (state, params) {
      console.log(params)
      let data = await http.post('/business/question/start', params)
      console.log(data)
      return data
    },
    async voteDetails (state, params) {
      console.log(params)
      let data = await http.get('/business/question/getPublishRecord', params)
      console.log(data)
      return data
    },
    async endVote (state, params) {
      console.log(params)
      let data = await http.post('/business/question/end', params)
      console.log(data)
      return data
    },
    async endScreen (state, params) {
      console.log(params)
      let data = await http.post('/business/screen/close', params)
      console.log(data)
      return data
    },

  },
  modules: {
  }
})
