<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <!-- <div class="signBtn">
      <span>催签单</span>
    </div>-->
    <!-- <take-photo  :title="photoTitle" :poto1="0" :imagePath="dataList.damagePath" :status="dataList.status?dataList.status:'1'" :lists="lists" class="signPhoto"></take-photo>
    <take-photo :title="photoTitle" :status = "1" class="signPhoto"></take-photo>-->
    <div class="tabTitle black">付款方式及金额</div>
    <ul class="common-content-box">
      <li class="common-content-title bgGray">
        <div>转账</div>
        <div>油卡</div>
        <div>押金</div>
        <div>小计</div>
      </li>
      <li>
        <div>{{dataObj.zhuanzhang}}</div>
        <div>{{dataObj.youka}}</div>
        <div>{{dataObj.yajin}}</div>
        <div>{{dataObj.xiaoji}}</div>
      </li>
    </ul>
    <div class="common-bottom-button bottom-button-fixed">
      <span class="orangeBtn" @click="stopReady">
        <img src="@/assets/images/common/takePhoto.png" alt>
        <b>签单拍照</b>
      </span>
      <span v-if="dataO.docStatus==0" @click="toTrayIntoFac">带托盘回厂</span>
      <span v-else @click="toTrayIntoFac">工作结束</span>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import TakePhoto from "@/components/common/TakePhoto";
import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";

export default {
  components: { HeaderDefault, TakePhoto },
  data() {
    return {
      title: "签单结算",
      photoTitle: "签单照片",
      dataObj: {},
      tempData: [],
      nextPageStatus: "",
      dataO:''
    };
  },
  // created () {
  //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
  // },
  mounted() {
    this.getData();
  },
  methods: {
    stopReady() {
      this.$router.replace({
        path: "/vehicleDispatcher/loadingManagement/Photograph"
      });
    },
    toTrayIntoFac() {
      if (this.dataObj.imagePaths.length!=0) {
        if(this.dataO.docStatus==0){
          let pageStatuList = getCache("PageStatus");
        for (let k in pageStatuList) {
          if (this.nextPageStatus == k) {
            console.log(pageStatuList[k]);
            this.$router.replace({
              path: `/bigTruckDriver/${pageStatuList[k]}`
            });
          }
        }
        }else{
           native.callhandler("showVoice", "工作结束,将返回首页！");
          window.instance ? window.instance.close() : "";
            window.instance = this.$toast("工作结束,将返回首页！");

             setTimeout(() => {
              this.$router.replace({
                path: "/home"
              });
            }, 1500);
        }

        
      } else {
      native.callhandler("showVoice", "请先签单拍照！", data => {});

       window.instance ? window.instance.close() : "";
            window.instance = this.$toast("请先签单拍照！");
      }

      // this.$router.replace({
      //   path: "/bigTruckDriver/trayIntoFac"
      // });
    },
    getData() {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http
        .post("/getSigningBalance", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          console.log(result);
          if (result.ret_code == 0) {

            this.dataObj = result.data.data;
            this.dataO = result.data;

            this.nextPageStatus = result.data.nextPageStatus;
            setCache("pageIndex",this.nextPageStatus)
          }
        })
        .catch(res => {
      native.callhandler("showVoice", "数据获取错误！", data => {});

         window.instance ? window.instance.close() : "";
            window.instance = this.$toast("数据获取错误！");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.common-content-box li div {
  width: 25%;
}

.signBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.68rem;
  span {
    @include peddingBtn(2.08rem);
    height: 0.37rem;
    line-height: 0.37rem;
    background: $orange;
  }
}

.signPhoto {
  width: 3.12rem;
  height: 2.08rem;
  margin: 0 auto;
}

.tabTitle {
  height: 0.46rem;
  line-height: 0.46rem;
  text-align: center;
  font-size: 0.15rem;
  margin: 0.1rem 0.16rem 0;
  border-top: 1px solid rgba(236, 236, 236, 1);
}

.common-content-box {
  padding-bottom: 0.5rem;
}
.common-bottom-button {
  .orangeBtn {
    img {
      width: 0.26rem;
      height: 0.21rem;
      margin-right: 0.05rem;
    }
    b {
      font-size: 0.15rem;
    }
  }
  span {
    width: 50%;
  }
}
</style>
