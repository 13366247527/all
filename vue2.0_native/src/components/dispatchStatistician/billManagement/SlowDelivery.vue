<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tab pageFlex">
      <div class="commonTabDiv pd48">
        <ul class="commonTab common-content-box">
          <li>
            <span>送货单号：</span>
            <span class="red">{{vehlicnum}}</span>
          </li>
          <li>
            <span>重量：</span>
            <span class="green">{{vehlicnum}}</span>
          </li>
          <li>
            <span>客户：</span>
            <span>{{vehlicnum}}</span>
          </li>
          <li>
            <span>电话：</span>
            <span class="red">{{vehlicnum}}</span>
          </li>
          <li>
            <span>业代：</span>
            <span>{{vehlicnum}}</span>
          </li>
          <li>
            <span>电话：</span>
            <span class="red">{{vehlicnum}}</span>
          </li>

          <li class="wid275">
            <span>申请送货日期：</span>
            <span class="red">{{vehlicnum}}</span>
          </li><li class="wid275">
            <span>业务审批意见：</span>
            <span class="red">{{vehlicnum}}</span>
          </li><li class="wid275">
            <span>经理审批意见：</span>
            <span class="red">{{vehlicnum}}</span>
          </li><li class="wid275">
            <span>总监审批意见：</span>
            <span class="red">{{vehlicnum}}</span>
          </li>
        </ul>
      </div>

     
    </div>
    <div class="common-bottom-button bottom-button-fixed">
        <span class="redBtner">送货确定</span>
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
      title: "缓送"
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
  width: 25%;
}
.common-content-box li .checked {
  width: 5%;
}
.common-bottom-button span {
  width: 100%;
}
.commonTab li {
  padding: 0.1rem 0;
  width:50%;
}
.commonTab li span:nth-child(1){
  margin-left:.1rem;
}
.commonTab .wid275 {
 
  width:100%;
}


</style>
