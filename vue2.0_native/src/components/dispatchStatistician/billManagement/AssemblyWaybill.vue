<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tab pageFlex">
      <div class="commonTabDiv pd48">
        <ul class="commonTab common-content-box">
          <li>
            <span>装运单号：</span>
            <span class="red">{{vehlicnum}}</span>
          </li>
           <li>
            <span>重量：</span>
            <span class="red">{{vehlicnum}}</span>
          </li>
        </ul>
      </div>

      <ul class="common-content-box">
        <li class="common-content-title">
          <div>送货顺序</div>
          <div>送货单号</div>
          <div>客户名称</div>
          <div>重量</div>
          <div>数量</div>
        </li>

        <li v-for="(item, index) in tempData" :key="index">
            <div>
            <p class="selectBox wid60">
              <input class="red" type="text" :value="index+1">
              <img src="@/assets/images/common/selectIcon.png" alt>
            </p>
          </div>
          <div>
            <span>{{item.number}}</span>
          </div>
          <div>
            <span>{{item.number}}</span>
          </div>
           <div>
            <span>{{item.number}}</span>
          </div>
          <div>
            <span>{{item.number}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="common-bottom-button bottom-button-fixed">
        <span class="redBtner">确定</span>
    </div>
  </div>
</template>

<script>
//import native from '@/native/bridge.js'
import HeaderDefault from "@/components/common/HeaderDefault";

export default {
  components: { HeaderDefault },
  name: "TimeReselect",
  data() {
    return {
      tempData: [
        
      ],
      vehlicnum: "123123",
      timeStatus: null,
      title: "组成装运单"
    };
  },
  mounted() {},
  methods: {
    changeTimeSelectStatus(index) {
      this.timeStatus = index;
    },
    toInstruction() {
      this.$router.push({
        path: "/dispatchStatistician/loadingManagement/aboutCar"
        // query:{
        //     index:this.$route.query.index,
        //     timeStatus: this.dataList[this.timeStatus].selval
        //     }
      });
    },
    standardBig() {
      this.isBig = !this.isBig;
      this.standardFlag = false;
      this.bigImgUrl = require("@/assets/images/common/standard.jpg");
    }
  }
};
</script>

<style lang="scss" scoped>
.pageFlex{
    margin-bottom: 0.5rem;
}
.common-content-box {
  //margin-bottom: 0.5rem;
  display: flex;
  flex-flow: row wrap;
  font-size: 0.16rem;
}
.common-content-box .common-content-title {
  background: #eee;
}
.common-content-box li div {
  width: 23.3%;
}
.common-content-box li div:nth-child(4) {
  width: 15%;
}
.common-content-box li div:nth-child(5) {
  width: 15%;
}
.common-content-box li .checked {
  width: 5%;
}
.common-bottom-button span {
  width: 100%;
}
.commonTab li {
  padding: 0.15rem 0;
  width:50%;
}
.commonTab li span:nth-child(1){
  margin-left:.1rem;
}
.wid60{
    width:.5rem;
}
.common-content-box .selectBox img{
    position: absolute;
    top: 0;
    bottom: 0;
    right: .07rem;
    margin: auto;
    width: .11rem!important;
    height: .06rem!important;
}

</style>
