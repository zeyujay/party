<template>
  <div class="main">
    <div v-if="!isbeginVote"
         class="title_box">
      <div class="title_item_box title_item_add"
           v-for="(item,index) in titleComplateList"
           :key='index'>
        <div class="title_item_complate_top">
          <div v-if="!item.isEdit">
            <img class="title_item_icon"
                 src="../assets/image/editTitle.png"
                 alt=""
                 @click="editTitle(item.id,index)">
            <img class="title_item_icon"
                 src="../assets/image/delTitle.png"
                 alt=""
                 @click="delTitleRequest(item.id)">
          </div>
          <div v-else><img v-if="!item.id"
                 class="title_item_icon"
                 src="../assets/image/appendTitle.png"
                 alt=""
                 @click="addTitleRequest()">
            <img v-else
                 class="title_item_icon"
                 src="../assets/image/appendTitle.png"
                 alt=""
                 @click="editTitleRequest(item.id)">
          </div>

        </div>
        <div v-if="!item.isEdit"
             class="title_item_bottom title_item_complate_bottom">
          <div>主题{{index+1}}：{{item.name}}{{item.single==1?'（单选）':'（多选）'}}</div>
          <div v-for="(item,index) in item.opt&&JSON.parse(item.opt)"
               :key="index">选项{{index+1}}：{{item}}</div>
        </div>
        <div v-else
             class="title_item_bottom title_item_complate_bottom">
          <div>
            <span> 主题{{titleComplateList.length}}:</span>
            <input type="text"
                   placeholder="请输入主题"
                   v-model='currentTitle.title'>
          </div>
          <div>
            <label><input type="radio"
                     name="chose"
                     checked='checked'
                     value="1"
                     v-model="currentTitle.isSingle" />单选</label>
            <label><input type="radio"
                     name="chose"
                     value='0'
                     v-model="currentTitle.isSingle" />多选</label>
          </div>
          <div class="add_option">
            <div class="add_option_item"
                 v-for="(item,index) in currentTitle.option"
                 :key="index">
              <span>选项{{index+1}}:</span>
              <input v-model="item.name"
                     placeholder="请输入选项内容"
                     type="text"
                     class="add_option_item_input" />
            </div>

          </div>
          <div v-show="isAddOption"
               @click="addOption"
               class="add_option_btn">添加选项</div>
        </div>
      </div>
      <div class="vote_add_button title_item_box"
           @click="showAddTitle(titleComplateList.length)">
        <img src="../assets/image/addTitle.png"
             alt="">
        <div>添加投票主题</div>
      </div>
    </div>
    <div v-else
         class="vote_detail_box">
      <div v-for='(item,index) in voteEndList'
           :key='index'
           class="vote_echarts_panel">
        <div class="vote_echarts"
             :id='"vote"+index'
             style=" "></div>
        <div class="vote_echarts_lendge">
          <div class="vote_echarts_icon"></div>
          <div>主题{{index+1}}:{{item.name}}</div>
        </div>
      </div>
      <div class="vote_detail_num"><span>{{voteNum}}</span>已投票</div>
    </div>
    <div v-if="!isbeginVote"
         @click="beginVoteRequest"
         class="vote_btn">开始投票</div>
    <div v-else-if="isEndVote"
         @click="endVoteRequest"
         class="vote_btn">结束投票</div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
var requestVoteDetails
var mychart = []
export default {
  name: "Vote",
  data () {
    return {
      titleIndex: 0,
      optionIndex: 1,
      isAddOption: true,
      isAddTitle: false,
      isShowAddTitle: false,
      titleList: [],
      currentTitle: {
        title: '',
        option: [],
        isSingle: '1'

      },
      voteEndList: [],
      titleComplateList: [],
      voteNum: 0

    };
  },
  watch: {},
  computed: {
    ...mapGetters(['deviceMac', 'isEndVote', 'isbeginVote'])
  },
  mounted () {
    this.allTitleRequest()
  },
  destroyed () {
    clearInterval(requestVoteDetails)
  },
  methods: {
    editTitle (id, i) {
      this.titleComplateList.map((item, index) => {
        if (i == index) {
          this.titleComplateList[index].isEdit = true

        } else {
          this.titleComplateList[index].isEdit = false

        }
      })
      this.currentTitle.title = this.titleComplateList[i].name
      this.currentTitle.isSingle = this.titleComplateList[i].single
      this.currentTitle.option = []
      JSON.parse(this.titleComplateList[i].opt).map((item, index) => {
        this.currentTitle.option.push({ name: item })
      })
      console.log(this.currentTitle)
    },
    showAddTitle (index) {
      let a = this.titleComplateList.filter(item => {
        return item.isEdit
      })
      if (a.length == 0 && this.titleComplateList.length < 5)
        this.titleComplateList.push({
          isEdit: true
        })

    },
    addOption () {
      if (this.currentTitle.option.length < 5)
        this.currentTitle.option.push({
          name: ''
        })
      else this.isAddOption = false
    },
    async addTitleRequest () {
      let data = {
        deviceMac: this.deviceMac,
        name: this.currentTitle.title,
        single: this.currentTitle.isSingle,
        opt: JSON.stringify(this.currentTitle.option.map((item) => {
          return item.name
        }))


      }
      let result = await this.$store.dispatch('addTitle', data)
      if (result.status == 200) {
        this.isShowAddTitle = false
        this.currentTitle = this.$options.data().currentTitle
        this.allTitleRequest()
      }
      console.log(result)
    },
    async editTitleRequest (id) {
      let data = {
        id,
        deviceMac: this.deviceMac,
        name: this.currentTitle.title,
        single: this.currentTitle.isSingle,
        opt: JSON.stringify(this.currentTitle.option.map((item) => {
          return item.name
        }))


      }
      let result = await this.$store.dispatch('editTitle', data)
      if (result.status == 200) {
        this.isShowAddTitle = false
        this.currentTitle = this.$options.data().currentTitle
        this.allTitleRequest()
      }
    },
    async delTitleRequest (id) {
      let data = {
        deviceMac: this.deviceMac,
        ids: id
      }
      let result = await this.$store.dispatch('delTitle', data)
      if (result.status == 200) {
        this.allTitleRequest()
      }
    },
    async allTitleRequest () {
      let data = {
        deviceMac: this.deviceMac
      }
      let result = await this.$store.dispatch('allTitle', data)
      if (result.status == 200) {
        this.titleComplateList = result.data.map(item => {
          item.isEdit = false
          return item
        })
      }
    },
    async beginVoteRequest () {
      //alert('kaishitoupiao ')
      //console.log('kaishitoupiao ')
      let data = {
        deviceMac: this.deviceMac
      }
      let result = await this.$store.dispatch('beginVote', data)
      if (result.status == 200) {
        this.$store.commit('SET_BEGIN_VOTE', true)
        requestVoteDetails = setInterval(() => {
          this.voteDetailsRequest()
        }, 3000);

      }
    },
    async voteDetailsRequest () {

      let data = {
        deviceMac: this.deviceMac
      }
      let result = await this.$store.dispatch('voteDetails', data)
      if (result.status == 200) {
        this.voteEndList = result.data.list
        this.voteNum = result.data.num
        for (let i = 0; i < this.voteEndList.length; i++) {
          this.setVoteEchartsOption(this.voteEndList[i], i)

        }
        console.log(result)
      }
    },
    async endVoteRequest () {

      let data = {
        deviceMac: this.deviceMac
      }
      let result = await this.$store.dispatch('endVote', data)
      if (result.status == 200) {
        this.$store.commit('SET_END_VOTE', false)
        clearInterval(requestVoteDetails)
      }
    },
    reVote () {
      this.$store.commit('SET_BEGIN_VOTE', false)
      this.$store.commit('SET_END_VOTE', true)
      this.voteEndList.map((item, index) => {
        mychart[index].dispose()
      })
    },
    setVoteEchartsOption (data, index) {
      console.log(data)

      let x = JSON.parse(data.opt).map((item, index) => {
        return '选项' + (index + 1)
      })
      let y = []
      for (let u = 0; u < JSON.parse(data.opt).length; u++) {
        data.ticket.split(',').map(item => {
          if (item.split(':')[0] == u) {
            y[u] = item.split(':')[1] * 1
          }
        })

      }
      console.log(y)

      let option = {
        grid: {
          top: '3%',
          bottom: '12%',
          right: '5%',
          left: '15%',
        },
        tooltip: {},
        xAxis: {
          type: 'value',


        },
        yAxis: {
          type: 'category',
          data: x,
          axisTick: {
            show: false
          }

        },
        series: [{
          name: '票数',
          type: 'bar',
          label: {
            show: true,
            position: 'insideRight',
            color: '#AA6F02'
          },
          data: y,
          color: '#ffcb6c',
          itemStyle: {
            borderRadius: [0, 30, 30, 0]
          }
        }]
      }
      this.setVoteEcharts(option, index)
    },
    setVoteEcharts (option, index) {
      console.log(option, index, 'vote' + index)
      console.log(this.$echarts)
      this.$nextTick(() => {
        mychart[index] = this.$echarts.init(document.getElementById('vote' + index))
        // 绘制图表
        mychart[index].setOption(option);
      })

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
.title_item_box {
  width: 4.16rem;
  height: 3.1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.15rem;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
  border: 0.02rem solid #ffd054;
}
.title_box {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 3rem 0 3rem;
  margin-bottom: 0.35rem;
  box-sizing: border-box;
}
.title_item_complate {
  display: flex;
  flex-direction: column;
}
.title_item_complate_top {
  height: 0.4rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 0.2rem;
  box-sizing: border-box;
}
.title_item_complate_top > div {
  display: flex;
  align-items: center;
}
.title_item_icon {
  width: 0.34rem;
  height: 0.34rem;
  margin-right: 0.1rem;
}
.title_item_bottom {
  width: 100%;
  padding: 0.3rem 0.2rem;
  flex-grow: 1;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  font-size: 0.14rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 0.14rem;
  overflow-y: auto;
}
.title_item_bottom > div {
  margin-bottom: 0.2rem;
}
.title_item_complate_bottom {
  display: flex;
  flex-direction: column;
  /* overflow-y: auto; */
}
.title_item_complate_bottom > div:first-of-type {
  font-size: 0.16rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
  line-height: 0.16rem;
}

.title_item_add {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.add_option {
  width: 100%;
}
.add_option_item {
  width: 100%;
  margin: 0.1rem 0;
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
  align-items: center;
}
.add_option_item span {
  display: inline-block;
  width: 1rem;
  flex-shrink: 0;
}
.add_option_item_input {
  width: 2.8rem;
}
.vote_add_button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.26rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.37rem;
  background: rgba(255, 255, 255, 0.5);
}
.vote_add_button img {
  margin-bottom: 0.32rem;
  width: 0.9rem;
  height: 0.9rem;
}
.vote_btn {
  width: 2.55rem;
  height: 0.67rem;
  background: #ffcb6c;
  border-radius: 0.06rem;
  font-size: 0.26rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #332500;
  line-height: 0.67rem;
  text-align: center;
}
.vote_detail_box {
  width: 12.42rem;
  height: 6.46rem;
  background: #ffffff;
  border-radius: 0.15rem;
  margin-bottom: 0.48rem;
  padding: 0.3rem 0.2rem;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  position: relative;
}
.vote_detail_num {
  position: absolute;
  top: 0.5rem;
  right: -1.5rem;
  font-size: 0.24rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 0.84rem;
}
.vote_detail_num span {
  font-size: 0.6rem;
}
.vote_echarts {
  width: 3.5rem;
  height: 2.45rem;
  margin: 0.2rem 0.2rem;
}
.vote_echarts_lendge {
  width: 100%;
  height: 0.2rem;
  font-size: 0.14rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vote_echarts_icon {
  width: 0.14rem;
  height: 0.14rem;
  background: #ffcb6c;
  margin-right: 0.1rem;
}
.vote_echarts:last-of-type {
}
.add_option_btn {
  font-size: 0.16rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #24b5ff;
  line-height: 0.14rem;
}
</style>
