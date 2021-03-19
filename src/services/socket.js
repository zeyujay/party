import store from '../store'
import ReconnectingWebSocket from "reconnecting-websocket";

const socketUrl = 'ws://ht.slonger.net:8081/websocket/1'
// const socketUrl = 'wss://test-wss-quotes.fdzq.com/quote'

export default class Socket {
  constructor() {
    this.ws = null
  }
  close () {
    this.ws.close()
  }
  connectStreams (next, url) {
    /* eslint-disable-next-line */
    console.log(socketUrl)
    this.ws = new ReconnectingWebSocket(url || socketUrl, null, {
      binaryType: 'arraybuffer',
      debug: false,
      reconnectInterval: 4000,
      timeoutInterval: 5000
    })
    this.ws.onopen = () => {
      console.log('socket connected')
      this.socketSubscribe({
        token: '1'
      })
      //if (next) next()
    }
    this.ws.close = function () {
      console.log('socket disconnected')
    }
    this.ws.onmessage = function (data) {
      console.log(data);

      if (data.data) {
        let result = JSON.parse(data.data);

        if (result.type == "login") {
          let user = {
            username: result.username,
            imgurl: this.imageUrl || result.imgurl,
          };
          store.commit("ADD_USER", user);
        }
        if (result.type == 'token') {
          if (result.token == 1)
            store.commit("SHOW_QRCODE", true);
        }
      }
    }
    window.onbeforeunload = () => {
      this.ws.close()
    }
    window.onunload = () => {
      this.ws.close()
    }
  }
  socketClose () {
    this.ws.close()
  }
  socketSubscribe (params) {
    this.ws.send(JSON.stringify(params))
  }
}
