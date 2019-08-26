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
            <span class="red">{{vehlicnum}}</span>
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
        </ul>
      </div>

      <ul class="common-content-box">
        <li class="common-content-title">
          <div>品名规格</div>
          <div>数量</div>
          <div>减量</div>
          <div>重量</div>
        </li>

        <li v-for="(item, index) in tempData" :key="index">
          <div>
            <span>{{item.number}}</span>
          </div>
          <div>
            <span>{{item.number}}</span>
          </div>
          <div>
            <p class="selectBox wid90">
              <input class="red" type="text" :value="item.bottlePrice">
            </p>
          </div>
          <div>
            <span>{{item.number}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="common-bottom-button bottom-button-fixed">
      <span class="orangeBtn" @click="text">计算</span>
      <span class="redBtner">退单</span>
    </div>
  </div>
</template>

<script>
//import native from '@/native/bridge.js'
import axios from "axios";
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
      title: "超重处理"
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
    },
    text() {
      this.$http.get("/dispatcherStatist/dispatchersVehicle", {}).then(res => {
        console.log(res)

      }).catch(res=>{
         console.log(res)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pageFlex {
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
  width: 50%;
}
.commonTab li {
  padding: 0.1rem 0;
  width: 50%;
}
.commonTab li span:nth-child(1) {
  margin-left: 0.1rem;
}
</style>
