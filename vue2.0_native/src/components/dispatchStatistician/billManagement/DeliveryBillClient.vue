<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tab pageFlex">
      <ul class="common-content-box">
        <li class="common-content-title">
          <div>送货单号</div>
          <div>客户</div>
          <div>重量</div>
          <div>数量</div>
        </li>

        <li v-for="(item, index) in tempData" :key="index">
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
            <p class="selectBox wid90" @click="DeliveryBillGoods">
              <span class="redBtn">{{item.number}}</span>
            </p>
          </div>
        </li>
        <li class="red">
          <div>合计</div>
          <div></div>
          <div>30</div>
          <div>5000</div>
        </li>
      </ul>
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
      title: "送货单客户明细"
    };
  },
  mounted() {},
  methods: {
    changeTimeSelectStatus(index) {
      this.timeStatus = index;
    }, 
    DeliveryBillGoods(){
        this.$router.push({
          path: '/dispatchStatistician/billManagement/DeliveryBillGoods',
         // query:{index: index}
        })
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
  background: #fff;
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
  width:50%;
}
.commonTab li span:nth-child(1){
  margin-left:.1rem;
}

</style>
