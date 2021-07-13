import store from '../store'
import ReconnectingWebSocket from "reconnecting-websocket";
import { MESSAGE_TYPE } from "vue-baberrage";

const socketUrl = 'wss://htoh.webmaster.me:8081//ws/link/'
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
    console.log(socketUrl, url)
    this.ws = new ReconnectingWebSocket(socketUrl + url, null, {
      binaryType: 'arraybuffer',
      debug: false,
      reconnectInterval: 4000,
      timeoutInterval: 5000
    })
    this.ws.onopen = () => {
      console.log('socket connected')
      /*   this.socketSubscribe({
          token: '1'
        }) */
      //if (next) next()
    }
    this.ws.close = function () {
      console.log('socket disconnected')
    }
    this.ws.onmessage = function (data) {
      console.log(data);

      if (data.data) {
        let result = JSON.parse(data.data);

        if (result.callback == "userLogin") {
          if (result.status == 200) {
            let user = {
              username: result.data.nickname,
              imgurl: result.data.imgUrl || this.imageUrl,
              openId: result.data.openId
            };
            store.commit("ADD_USER", user);
          }

        }
        if (result.callback == 'linkSuccess') {
          if (result.status == 200)
            store.commit("SHOW_QRCODE", true);
        }
        if (result.callback == 'sendMessage') {
          if (result.status == 200) {
            store.commit("ADD_MESSAGE", result.data);

          }

        }
        if (result.callback == 'pushScreen') {
          if (result.status == 200) {
            let data = {
              id: store.state.barrageList.length,
              avatar: result.data.imgUrl,
              msg: result.data.message,
              time: 10,
              type: MESSAGE_TYPE.NORMAL,
              //barrageStyle: v.barrageStyle,
            }
            store.commit("ADD_BARRAGE", data);
          }

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
