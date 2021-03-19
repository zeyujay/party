<template>
  <div class="main">
    <div @click="addMessage">微信上墙</div>
    <div class="message_list" ref="messageList">
      <div
        ref="messageItem"
        :class="['message_item', item.name ? 'message_item_add' : '']"
        :key="index"
        v-for="(item, index) in messageList"
      >
        <div class="message_avatar">
          <img :src="item.avatar" alt="" />
        </div>

        <div class="message_right">
          <p class="message_name">{{ item.name }}</p>
          <p class="message_msg">{{ item.msg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "OneTheWall",
  data() {
    return {
      messageList: [
        {
          name: "qwqw",
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg:
            "“qwqwqwqwqwqwqwqwqw未入围IE殴辱我问IU惹我姨荣IE我认为任务任务惹我人无哦我如未入围哦一荣IE无人噢诶吴荣我侮辱额外”",
        },
        {
          name: "qwqw",
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: "“qwqwqwqwqwqwqwqwqw”",
        },
      ],
    };
  },
  methods: {
    addMessage() {
      console.log(this.$refs.messageList.clientHeight);

      if (this.$refs.messageList.children.length >= 3) {
        this.$refs.messageList.removeChild(this.$refs.messageList.children[0]);
      }
      console.log(this.$refs.messageList.clientHeight);
      this.messageList.push({
        name: "qwqw",
        avatar:
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
        msg:
          "“qwqwqwqwqwqwqwqwqw未入围IE殴辱我问IU惹我姨荣IE我认为任务任务惹我人无哦我如未入围哦一荣IE无人噢诶吴荣我侮辱额外”",
      });
    },
  },
};
</script>
<style lang="css">
.main {
  width: 100%;
  height: 100%;
}
.message_list {
  width: 80%;
  padding-left: 0.1rem;
  height: 100%;
  overflow-y: auto;
}
.message_list::-webkit-scrollbar {
  width: 0 !important;
}
.message_item {
  width: 80%;
  height: 1.2rem;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  background: #ccc;
  box-sizing: border-box;
}
.message_item_add {
  animation: addMessage 1000ms;
}
.message_avatar {
  width: 1rem;
  height: 1rem;
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
  font-size: 0.16rem;
}
.message_msg {
  color: tomato;
  font-size: 0.22rem;
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
