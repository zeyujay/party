<template>
  <div class="home">
    <component class="container"
               :is="currentView"></component>
    <div class="qrcode"
         v-if="isShowQrcode">
      <!--  <img src="../assets/image/qrcode.png"
           alt="" /> -->
      <img :src="'https://htoh.webmaster.me:8081/business/screen/getQrcode?deviceMac='+deviceMac"
           alt="" />
    </div>
    <div class="nav_bar">
      <div class="nav_bar_left">
        <div class="nav_bar_item"
             v-for="(item, index) in navBar"
             :key="index"
             @click="changeView(item.view)">
          <img class="nav_bar_item_img"
               :src="currentView==item.view?item.imgUrl1:item.imgUrl"
               alt="" />
          <span class="nav_bar_item_text">{{ item.name }}</span>
        </div>
        <div class="nav_bar_item"
             @click="changeView('isBullet')">
          <img class="nav_bar_item_img"
               :src="isBrrages?require('../assets/image/danmu1.png'): require('../assets/image/danmu0.png')"
               alt="" />
          <span class="nav_bar_item_text">弹幕</span>
        </div>
      </div>
      <div class="nav_bar_right">
        <div class="nav_bar_item"
             v-for="(item, index) in navBarRight"
             :key="index"
             @click="changeView(item.view)">
          <img class="nav_bar_item_img"
               :src="require('../assets/image/download.png')"
               alt="" />
          <span class="nav_bar_item_text">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div v-show="isBrrages"
         class="barrages-drop-panel">
      <div class="barrages-drop">
        <vue-baberrage :isShow="barrageIsShow"
                       :barrageList="barrageList"
                       :loop="barrageLoop">
        </vue-baberrage>
      </div>
      <!--  <button class="add"
              @click="addMessage">add</button> -->
    </div>
    <div v-if="isDownLoad"
         class="download">
      <div>
        <span>Excel文件下载二维码</span>
        <div @click="downloadExcel"
             class="download_confirm">确定</div>
      </div>
    </div>
    <div class="download_rcode"
         v-if="isShowDownQrcode"
         ref="qrCodeUrl"
         @click="isShowDownQrcode=false">
      <img src="../assets/image/qrcode.png"
           alt=""
           @click.stop="isShowDownQrcode=true" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ThreePicture from "../components/ThreePicture";
import Vote from "../components/Vote";
import OnTheWall from "../components/OnTheWall";
import SocketService from "../services/socket";
import { mapGetters } from "vuex";
import Vue from "vue";
import { vueBaberrage, MESSAGE_TYPE } from "vue-baberrage";
Vue.use(vueBaberrage);
import QRCode from 'qrcodejs2'

var qrcode
export default {
  name: "Home",
  data () {
    return {
      currentView: "ThreePicture",
      navBar: [
        {
          name: "签到", view: "ThreePicture", imgUrl: require('../assets/image/qiandao0.png'),
          imgUrl1: require('../assets/image/qiandao1.png')
        },
        {
          name: "上墙", view: "OnTheWall", imgUrl: require('../assets/image/shangqiang0.png'),
          imgUrl1: require('../assets/image/shangqiang1.png')
        },
        //{ name: "问卷调查", view: "OnTheWall", imgUrl: require('../assets/image/wenjuan.png') },
        //{ name: "现场抽奖", view: "ThreePicture", imgUrl: require('../assets/image/choujiang.png') },
        {
          name: "投票", view: "Vote", imgUrl: require('../assets/image/toupiao0.png'),
          imgUrl1: require('../assets/image/toupiao1.png')
        },


      ],
      navBarRight: [
        /* { name: "音效", view: "isMusic" },
        { name: "小程序码", view: "isQrCode" },
        */
        { name: "下载记录", view: "download" },
        { name: "退出系统", view: "exit" },

      ],


      msg: "马优晨就是个辣鸡~",
      barrageIsShow: true,
      messageHeight: 3,
      boxHeight: 500,
      barrageLoop: true,
      maxWordCount: 3,
      throttleGap: 5000,
      lanesCount: 10,
      //barrageList: [],
      isBrrages: true,

      isDownLoad: false,
      isShowDownQrcode: false


    };
  },
  computed: {
    ...mapGetters(["isLogin", "isShowQrcode", 'barrageList', 'deviceMac']),
  },
  created () {



  },
  mounted () {
    window.onbeforeunload = async () => {
      await this.$store.dispatch('endScreen', { deviceMac: this.deviceMac })
    };
    if (process.env.NODE_ENV == 'production') {
      document.addEventListener('plusready', () => {
        //console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。")
        window.plus.device.getInfo({
          success: (e) => {
            //alert('getDeviceInfo success: ' + JSON.stringify(e));
            this.$store.commit('SET_DEVICEMAC', e.uuid)
            try {
              this.Socket = new SocketService();

              this.Socket.connectStreams(null, this.deviceMac);
            } catch (error) {
              console.log(error);
            }
          },
          fail: (e) => {
            alert('getDeviceInfo failed: ' + JSON.stringify(e));
          }
        });
      });
    } else {
      this.$store.commit('SET_DEVICEMAC', 2)
      try {
        this.Socket = new SocketService();

        this.Socket.connectStreams(null, this.deviceMac);
      } catch (error) {
        console.log(error);
      }
    }


    //this.login()
  },
  destroyed () {
    this.Socket.socketClose();
  },
  components: { ThreePicture, Vote, OnTheWall },
  methods: {
    creatQrCode () {
      qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: 'https://htoh.webmaster.me:8081/business/screen/getExcel?deviceMac=' + this.deviceMac, // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    downloadExcel () {
      this.isDownLoad = false
      this.isShowDownQrcode = true
    },
    changeView (view) {
      console.log(view);
      switch (view) {
        /*  case "isMusic":
           break;
          */
        case "isBullet":
          this.isBrrages = !this.isBrrages
          break;
        case "download":
          this.isDownLoad = true
          break;
        case "exit":
          this.$store.dispatch('endScreen', { deviceMac: this.deviceMac })

          if (window.plus) {

            window.plus.runtime.quit();
          }

          break;
        default:
          this.currentView = view;
          break;
      }

    },
    addMessage () {
      let v = {
        id: this.barrageList.length,
        avatar:
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
        msg: "111",
        time: 10,
        barrageStyle: "red",
      };
      this.barrageList.push({
        id: v.id,
        avatar: v.avatar,
        msg: v.msg,
        time: v.time,
        type: MESSAGE_TYPE.NORMAL,
        barrageStyle: v.barrageStyle,
      });
    },
    addToList () {
      let list = [
        {
          id: 1,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 10,
          barrageStyle: "red",
        },
      ];
      list.forEach((v) => {
        this.barrageList.push({
          id: v.id,
          avatar: v.avatar,
          msg: v.msg,
          time: v.time,
          type: MESSAGE_TYPE.NORMAL,
          barrageStyle: v.barrageStyle,
        });
      });
    },
    async login () {
      /*  this.$store.commit("SET_LOGIN_STATUS", true);
       this.$router.push({ name: "Home" }); */
      let data = {
        deviceMac: 'weqeqeqweqw'
      };
      let result = await this.$store.dispatch("login", data);
      if (result.code == 200) {
        console.log(result)
      }
    },
  },
  /*  beforeRouteEnter (to, from, next) {
     next((vm) => {
       if (!vm.isLogin) next("/login");
     });
   }, */
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
  width: 100%;
  margin: 0 auto;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.2);
  font-size: 0.2rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 0.28rem;
}

.nav_bar_left,
.nav_bar_right {
  height: 1.2rem;
  display: flex;
  border-radius: 20px;
}
.nav_bar_left {
}
.nav_bar_right {
}
.nav_bar_item {
  width: 1.2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  font-size: 0.2rem;
  margin-top: 0.19rem;
}
.nav_bar_item_img {
  height: 0.6rem;
  width: 0.6rem;
  margin-bottom: 0.06rem;
}
.nav_bar_item_text {
  display: inline-block;
  height: 0.2rem;
  width: 0.8rem;
}
.qrcode {
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  right: 0.5rem;
  bottom: 2rem;
  font-size: 0.2rem;
}
.qrcode img {
  width: 2.5rem;
  height: 2.5rem;
  border: 0.05rem solid #ffd054;
  background: #fff;
  border-radius: 50%;
}
.qrcode p {
  text-align: center;
  color: #555;
}
.barrages-drop-panel {
  position: fixed;
  bottom: 3.5rem;
  top: 0;
  left: 0;
  right: 0;
}
.barrages-drop {
  height: 100%;
  width: 100%;
  position: relative;
}
.baberrage-stage {
  margin-top: 0 !important;
  height: 100% !important;
}
.blue {
  border-radius: 100px;
  background: #e6ff75;
  color: #fff;
}

.green {
  border-radius: 100px;
  background: #75ffcd;
  color: #fff;
}
.red {
  border-radius: 100px;
  background: #e68fba;
  color: #fff;
}
.yellow {
  border-radius: 100px;
  background: #dfc795;
  color: #fff;
}
.baberrage-stage {
  position: absolute;
  width: 100%;
  height: 212px;
  overflow: hidden;
  top: 0;
  margin-top: 130px;
}
.download {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.download > div {
  width: 3.6rem;
  height: 1.95rem;
  background: #ffffff;
  box-shadow: 0rem 0.02rem 0.41rem 0.05rem rgba(146, 146, 146, 0.5);
  border-radius: 0.1rem;
  font-size: 0.24rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #000000;
  line-height: 0.33rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.65rem 0.4rem 0.65rem;
  box-sizing: border-box;
}
.download_confirm {
  width: 1.1rem;
  height: 0.32rem;
  background: #e22415;
  border-radius: 0.2rem;
  font-size: 0.2rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 0.32rem;
  text-align: center;
}
.barrages-drop .baberrage-item {
  padding: 0.5rem !important;
}
.download_rcode {
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
