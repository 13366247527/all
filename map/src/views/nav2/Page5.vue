<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="carSummary">
          <div class="timeSection">
            <span v-for="(item, index) in list" :class="{ active : index === ind }" :key="index" @click="changeTime(index)">
              <span><img :src="item.img" alt=""></span>
              <span>{{item.date}}</span>
            </span>
          </div>
          <div v-show="ind === 0">0</div>
          <div v-show="ind === 1">1</div>
          <div v-show="ind === 2">2</div>
          <div v-show="ind === 3">3</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              list: [{
                img: '../assets/yonghu.png',
                date: '日'
              },{
                img: '../assets/yonghu.png',
                date: '周'
              },{
                img: '../assets/yonghu.png',
                date: '月'
              },{
                img: '../assets/yonghu.png',
                date: '年'
              }],
                ind: 0, // 默认时间下标
            }
        },
        methods: {
            // 承运商发货量时间选择
            changeTime: function (index) {
                this.ind = index
            }
        }
    }
</script>

<style scoped lang="less">
  .title {
    width: 100%;
    height: 20px;
    border-left: 4px solid #E31D2B;
    line-height: 20px;
    padding-left: 10px;
    margin-top: 20px;
    font-size:18px;
    font-weight:bold;
    color:rgba(51,51,51,1);
  }
  .publicTime {
    width:200px;
    height:32px;
    background:rgba(238,238,238,1);
    border-radius:13px;
    margin: 17px 0 0 14px;
    line-height: 32px;
    font-size:14px;
    font-weight:500;
    color:rgba(86,95,109,1);
    span {
      display: inline-block;
      width: 25%;
      text-align: center;
      cursor: pointer;
    }
  }
  .active {
    font-weight:bold;
    color:rgba(227,29,43,1);
  }
  .carSummary {
    width: 100%;
    height: 500px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(230,234,238,1);
    box-shadow:0px 1px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius:4px;
    margin-top: 24px;
    .timeSection {
      .publicTime()
    }
  }
  .moveTitle {
    .title();
    margin-top: 35px;
  }
  .moveContent {
    width: 100%;
    height:446px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(230,234,238,1);
    box-shadow:0px 1px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius:4px;
    margin-top: 28px;
    .changeTime {
      .publicTime()
    }
  }
</style>
  