<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tab pageFlex">
      <div class="commonTabDiv pd48">
        <ul class="commonTab common-content-box">
          <li>
            <span>城市选择：</span>
            <input type="text" class="wid275" v-model="vehlicnum">
          </li>
          <li>
            <span>增加客户：</span>
            <input type="text" class="wid275" v-model="vehlicnum">
          </li>
          <li>
            <span>增加车型：</span>
            <input type="text" class="wid275" v-model="vehlicnum">
          </li>
        </ul>
      </div>

      <ul class="common-content-box">
        <li class="common-content-title">
          <div>客户名称</div>
          <div>车型</div>
          <div>最重</div>
          <div>最轻</div>
        </li>

        <li v-for="(item, index) in tempData" :key="index">
          <div>
            <span class="redBtn">{{item.number}}</span>
          </div>

          <div>
            <p class="selectBox wid90">
              <input class="red" type="text" :value="item.bottlePrice">
              <img src="@/assets/images/common/selectIcon.png" alt>
            </p>
          </div>
          <div>
            <span class="redBtn">{{item.number}}</span>
          </div>
          <div>
            <span class="redBtn">{{item.number}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="common-bottom-button bottom-button-fixed" @click="toInstruction">确定</div>
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
      title: "载重设定"
    };
  },
  mounted() {},
  methods: {
    changeTimeSelectStatus(index) {
      this.timeStatus = index;
    },
    toInstruction() {
      this.$router.push({
        path: "/vehicleDispatcher/loadingManagement/aboutCar"
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
  width: 33.3%;
}
.commonTab li {
  padding: 0.1rem;
}
</style>
