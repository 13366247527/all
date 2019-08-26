<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tab pageFlex">
      <div class="commonTabDiv pd48">
        <ul class="commonTab common-content-box">
          <li>
            <span>车号：</span>
            <span class="red">1234123456</span>
          </li>
          <li>
            <span>原因：</span>
            <span class="red">1234123456</span>
          </li>
          <li>
            <span>扣分：</span>
            <span class="red">1234123456</span>
          </li>
          <li>
            <span>罚款：</span>
            <span class="red">1234123456</span>
          </li>
        </ul>
        <div class="imgBox">
        <div class="imgBox-content">
          <div class="imgBox-content-block">
            <p  class="imgPanel" @click="imgBig(index)">
              <img  :src='require("@/assets/images/common/standard.jpg")' alt>
            </p>
            <p class="title">违规照</p>
          </div>
        </div>
      </div>
      </div>
    <div class="erweima">
        <div>
            <img :src='require("@/assets/images/common/erweimaW.png")' alt="">
        </div>
        <div>
            <img :src='require("@/assets/images/common/erweimaZ.png")' alt="">
        </div>
    </div>
      
    </div>
    <div class="common-bottom-button bottom-button-fixed">交款确认</div>
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
      title: "违规记录"
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
.imgBox {
  display: flex;
  flex-wrap: wrap;
  justify-content:space-around;
  text-align: center;
  align-content: flex-start;
  font-size: .16rem;
}
.imgBox-content {
  width: 100%;
  margin: 0.2rem 0;
  .imgBox-content-block {
    width: 3rem;
    margin: 0 auto;
    border-radius: 0.05rem;
    border: 1px solid #ccc;
  }
  .imgPanel {
    background: #ccc;
  }
  img {
    width: 3rem;
    height: 1.74rem;
    border-top-left-radius: 0.05rem;
    border-top-right-radius: 0.05rem;
  }
}
.title {
  border-top: 1px solid #ccc;
}
.erweima{
    display: flex;
    padding:0 .1rem;
    div{
        width:50%;
        text-align: center;
        img{
            width:1.5rem;
            height:1.5rem;
        }
    }
}
</style>
