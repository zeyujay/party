<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import SocketService from "./services/socket";
export default {
  data() {
    return {
      imageUrl: require("./assets/logo.png"),
    };
  },
  created() {
    try {
      this.Socket = new SocketService();

      this.Socket.connectStreams();
    } catch (error) {
      console.log(error);
    }
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
