<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import ReconnectingWebSocket from "reconnecting-websocket";
export default {
  created() {
    let option = {
      url: "ws://racknerd.slonger.net/active/v1/chat/ws-msg",
      callback: this.callback,
    };
    var socket = this.initSocket(option);
  },
  methods: {
    initSocket(option) {
      //服务器地址
      //var locate = window.location;
      var url = option.url;
      //回调函数
      var callback = option.callback;
      if (typeof callback !== "function") {
        console.log("callback 必须为函数");
        return false;
      }
      //一些对浏览器的兼容已经在插件里面完成
      var websocket = new ReconnectingWebSocket(url, null, {
        debug: true,
        reconnectInterval: 3000,
      });
      //var websocket = new WebSocket(url);

      //连接发生错误的回调方法
      websocket.onerror = function(e) {
        console.log(e);
        console.log("websocket.error");
      };

      //连接成功建立的回调方法
      websocket.onopen = function(event) {
        console.log("onopen");
        var param = {
          msg: "123456",
        };
        websocket.send(JSON.stringify(param));
      };

      //接收到消息的回调方法
      websocket.onmessage = (event) => {
        this.callback(event.data);
      };

      //连接关闭的回调方法
      websocket.onclose = function(e) {
        websocket.close();
        console.log(e);
        console.log("websocket.onclose");
      };

      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function() {
        websocket.close();
      };
      return websocket;
    },
    callback(data) {
      let result = JSON.parse(data);
      console.log(result);

      if (result.type == "login") {
        let user = {
          username: result.username,
          imgurl: result.imgurl,
        };
        this.$store.commit("ADD_USER", user);
      }
    },
  },
};
</script>
<style lang="stylus">
#app
  width 100%
  height 100%
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>
