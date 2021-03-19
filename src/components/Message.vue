<template>
  <div class="main">
    <div class="barrages-drop">
      <vue-baberrage
        :isShow="barrageIsShow"
        :barrageList="barrageList"
        :loop="barrageLoop"
      >
      </vue-baberrage>
    </div>
    <button class="add" @click="addMessage">add</button>
  </div>
</template>
<script>
import Vue from "vue";
import { vueBaberrage, MESSAGE_TYPE } from "vue-baberrage";
Vue.use(vueBaberrage);
export default {
  name: "Message",
  data() {
    return {
      msg: "马优晨就是个辣鸡~",
      barrageIsShow: true,
      messageHeight: 3,
      boxHeight: 500,
      barrageLoop: true,
      maxWordCount: 3,
      throttleGap: 5000,
      lanesCount: 10,
      barrageList: [],
    };
  },
  watch: {},
  mounted() {
    this.addToList();
  },
  methods: {
    addMessage() {
      let v = {
        id: this.barrageList.length,
        avatar:
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
        msg: "111",
        time: 3,
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
    addToList() {
      let list = [
        {
          id: 1,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 3,
          barrageStyle: "red",
        },
        {
          id: 2,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 8,
          barrageStyle: "green",
        },
        {
          id: 3,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 10,
          barrageStyle: "normal",
        },
        {
          id: 4,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 5,
          barrageStyle: "blue",
        },
        {
          id: 5,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 6,
          barrageStyle: "red",
        },
        {
          id: 6,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 12,
          barrageStyle: "normal",
        },
        {
          id: 7,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 5,
          barrageStyle: "red",
        },
        {
          id: 8,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 5,
          barrageStyle: "normal",
        },
        {
          id: 9,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 8,
          barrageStyle: "red",
        },
        {
          id: 10,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 10,
          barrageStyle: "yellow",
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
  },
};
</script>
<style lang="css" scoped>
.main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>
