<template>
  <div class="home">
    <component class="container" :is="currentView"></component>
    <div class="qrcode" v-if="isShowQrcode">
      <img src="../assets/qrcode.png" alt="" />
      <p>扫码参与活动</p>
    </div>
    <div class="nav_bar">
      <div
        v-for="(item, index) in navBar"
        :key="index"
        @click="changeView(item.view)"
      >
        <img src="" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ThreePicture from "../components/ThreePicture";
import Message from "../components/Message";
import OnTheWall from "../components/OnTheWall";
import SocketService from "../services/socket";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      currentView: "ThreePicture",
      navBar: [
        { name: "3d签到", view: "ThreePicture" },
        { name: "上墙", view: "OnTheWall" },
        { name: "3d签到", view: "ThreePicture" },
        { name: "现场抽奖", view: "ThreePicture" },
        { name: "大屏投票", view: "Message" },
        { name: "音效", view: "isMusic" },
        { name: "小程序码", view: "isQrCode" },
        { name: "弹幕", view: "isBullet" },
        { name: "退出账号", view: "exit" },
      ],
    };
  },
  computed: {
    ...mapGetters(["isLogin", "isShowQrcode"]),
  },
  created() {
    try {
      this.Socket = new SocketService();

      this.Socket.connectStreams();
    } catch (error) {
      console.log(error);
    }
  },
  destroyed() {
    this.Socket.socketClose();
  },
  components: { ThreePicture, Message, OnTheWall },
  methods: {
    changeView(view) {
      console.log(view);
      switch (view) {
        case "isMusic":
          break;
        case "isQrCode":
          break;
        case "isBullet":
          break;
        case "exit":
          this.$router.push({ name: "Login" });
          break;
        default:
          break;
      }
      this.currentView = view;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.isLogin) next("/login");
    });
  },
};
</script>
<style lang="css" scoped>
.home {
  height: 100%;
  width: 100%;
  position: relative;
}
.container {
  height: calc(100% - 1.2rem);
}
.nav_bar {
  height: 1.2rem;
  width: 98%;
  margin: 0 auto;
  left: 0;
  right: 0;
  position: absolute;
  bottom: 0.1rem;
  display: flex;
  background: #d7d7d7;
  border-radius: 20px;
}
.nav_bar > div {
  height: 1.2rem;
  width: 1.2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-around;
  align-items: center;
  font-size: 0.2rem;
  color: #555;
}
.nav_bar > div > img {
  height: 0.8rem;
  width: 0.8rem;
}
.nav_bar > div > span {
  display: inline-block;
  height: 0.2rem;
  width: 0.8rem;
}
.qrcode {
  width: 1.5rem;
  height: 2rem;
  position: absolute;
  right: 0.1rem;
  bottom: 1.5rem;
  font-size: 0.2rem;
}
.qrcode img {
  width: 1.5rem;
  height: 1.5rem;
}
.qrcode p {
  text-align: center;
  color: #555;
}
</style>
