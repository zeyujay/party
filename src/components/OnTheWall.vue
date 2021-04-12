<template>
  <div class="main">
    <!-- <div @click="addMessage"
         class="message_title">微信上墙</div> -->
    <div class="message_list"
         ref="messageList">
      <div ref="messageItem"
           :class="['message_item', item.account ? 'message_item_add' : '']"
           :key="index"
           v-for="(item, index) in messageList">
        <div class="message_avatar">
          <img :src="item.imgUrl"
               alt="" />
        </div>

        <div class="message_right">
          <p><span class="message_name">{{ item.nickName }}</span> <span class='message_time'>{{item.date}}</span></p>
          <p class="message_msg">{{ item.message }}</p>
        </div>
      </div>
    </div>
    <div class="message_sum"><span class="message_num">{{messageList.length}}</span>条信息</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: "OneTheWall",
  data () {
    return {
      /* messageList: [
        {
          name: "qwqw",
          image:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg:
            "“qwqwqwqwqwqwqwqwqw未入围IE殴辱我问IU惹我姨荣IE我认为任务任务惹我人无哦我如未入围哦一荣IE无人噢诶吴荣我侮辱额外”",
        },
        {
          name: "qwqw",
          image:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: "“qwqwqwqwqwqwqwqwqw”",
        },
      ], */
    };
  },
  watch: {
    messageList: {
      handler: function (v, ov) {
        /* if (this.$refs.messageList.children.length >= 3) {
          this.$refs.messageList.removeChild(this.$refs.messageList.children[0]);
        } */
        this.$nextTick(() => {
          this.$refs.messageList.scrollTop = this.$refs.messageList.scrollTop + this.$refs.messageList.scrollHeight

        })
      },
      deep: true
    },
  },
  computed: {
    ...mapGetters(['messageList'])
  },
  mounted () {
    /*  if (this.messageList.length >= 3) {
       this.$store.commit('SET_MESSAGELIST', this.messageList.slice(3, 0))
     } */
  },
  destroyed () {/* 
    this.$store.commit('CLEAR_MESSAGE', []) */
  },
  methods: {
    addMessage () {
      console.log(this.$refs.messageList.clientHeight);


      console.log(this.$refs.messageList.clientHeight);
      this.messageList.push({
        name: "qwqw",
        image:
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
        msg:
          "“qwqwqwqwqwqwqwqwqw未入围IE殴辱我问IU惹我姨荣IE我认为任务任务惹我人无哦我如未入围哦一荣IE无人噢诶吴荣我侮辱额外”",
      });

    },
  },
}
</script>
<style lang="css">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.message_title {
  color: #a9221f;
  font-size: 0.1rem;
}
.message_list {
  width: 60%;
  height: 8.5rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}
.message_list::-webkit-scrollbar {
  width: 0 !important;
}
.message_item {
  width: 82%;
  height: 1.36rem;
  background: rgba(255, 255, 255, 0.57);
  border-radius: 0.1rem;
  position: relative;
  overflow: hidden;
  margin-top: 0.14rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 0 0.52rem 0 0.43rem;
}
.message_item_add {
  animation: addMessage 1000ms;
}
.message_avatar {
  width: 0.7rem;
  height: 0.7rem;
  overflow: hidden;
  margin-left: 0.1rem;
  border-radius: 50%;
  flex-shrink: 0;
}
.message_avatar img {
  width: 100%;
  height: 100%;
}
.message_right {
  display: flex;
  height: 100%;
  margin-left: 0.15rem;
  flex-direction: column;
  padding: 0.2rem 0;
  box-sizing: border-box;
  overflow: hidden;
}
.message_name {
  font-size: 0.18rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
  line-height: 0.25rem;
}

.message_time {
  font-size: 0.18rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 0.25rem;
}
.message_msg {
  font-size: 0.2rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 0.28rem;
}
.message_sum {
  position: absolute;
  right: 1.23rem;
  top: 0.63rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 0.84rem;
}
.message_num {
  font-size: 0.6rem;
}
@keyframes addMessage {
  from {
    transform: translate(100vw);
  }
  to {
    transform: translate(0);
  }
}
</style>
