<template>
  <div>
    <div class="common-page-flex">
      <header-default :title="title"></header-default>
      <mt-loadmore :top-method="loadTop" ref="loadmore" :autoFill="false" class="loadmoreCss">
        <div class="common-line-two-panel">
          <p>
            <span>车位：</span>
            <span class="red">{{dataObj.lodlocNumber}}</span>
          </p>
          <p>
            <span>收发货员：</span>
            <span class="red">{{dataObj.sfhyName}}</span>
          </p>
        </div>
        <blank-space></blank-space>
        <div class="content">
          <img :src="imgPath" alt>
          <!-- <vue-speech @onTranscriptionEnd="onEnd"/> -->
        </div>

        <!-- <div @touchmove.prevent @click="normalImg" v-if="isBig">
      <div class="mask"></div>
      <img :src="bigImgUrl" class="active">
      <div
        v-show="standardFlag"
        class="common-bottom-button bottom-button-fixed retake"
        @click.stop="takePhoto(1)"
      >重拍</div>
    </div>
    <div class="driverPhoto">
      <p class="stand" @click="standardBig">
        <img src="@/assets/images/common/standard.jpg">
      </p>
      <p class="stand takephoto" @click="takePhoto">
        <img :src="imgPath">
      </p>
        </div>-->
      </mt-loadmore>
      <div class="common-bottom-button bottom-button-fixed">
        <span class="orangeBtn" @click="stopReady">
          <img src="@/assets/images/common/takePhoto.png" alt>
          <b>阻车器拍照</b>
        </span>
        <span @click="arrivalCarPosition" v-if="docStatus==0">到达车位</span>
        <span v-else class="greenBtner" @click="toLoadWork">准备完成</span>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import BlankSpace from "@/components/common/BlankSpace";
import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";

export default {
  components: { HeaderDefault, BlankSpace },
  data() {
    return {
      title: "入厂导航",
      dataObj: {},
      docStatus: "",
      imgPath:
        "http://img.logwsd.com/group1/M00/01/39/rBUAEF1Tb1OAKtdBAABHWjkcL5s657.png",
      nextPageStatus: ""
    };
  },
  // created () {
  //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
  // },
  mounted() {
    this.getData();
  },
  methods: {
    loadTop() {
      //传1说明是下拉刷新
      this.getData(1);
    },
    toLoadWork() {
      if (this.docStatus == 2) {
        let pageStatuList = getCache("PageStatus");
        for (let k in pageStatuList) {
          if (this.nextPageStatus == k) {
            console.log(pageStatuList[k]);
            this.$router.replace({
              path: `/bigTruckDriver/${pageStatuList[k]}`
            });
          }
        }
      } else if (this.docStatus == 1) {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请先拍照！");
        native.callhandler("showVoice", "请先拍照！", data => {});
      } else if (this.docStatus == 3) {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("审核不合格，请重新拍照！");
        native.callhandler("showVoice", "审核不合格，请重新拍照！", data => {});
      } else if (this.docStatus == 4) {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请等待审核！");
        native.callhandler("showVoice", "请等待审核！", data => {});
      }

      // this.$router.replace({
      //   path: "/bigTruckDriver/loadWork"
      // });
    },
    arrivalCarPosition() {
      // this.$say("请在5分钟内完成所有装车前工作");
      // let time = setTimeout(() => {
      //   clearTimeout(time);
      //   this.overtime();
      // }, 5 * 60 * 1000);
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.$loading.open();
      let params = {
        docId: data,
        statecls: "Ddcw",
        statetyp: "Rcdh",
        tableName: "WhDeliveryDoc",
        artnum: ""
      };
      this.$http.post("/setTransState", params).then(res => {
        this.$loading.close();
        let result = res.data;
        console.log(result.data);
        if (result.ret_code == 0) {
          this.docStatus = 1;
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
        } else {
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.returnInfo);
        }
      });
    },
    overtime() {
      let i = 0;
      let overtime = setInterval(() => {
        if (i < 5) {
          i++;
          this.$say("您已超时，请尽快完成所有装车前工作");
        } else {
          clearInterval(overtime);
        }
      }, 60 * 1000);
    },
    stopReady() {
      if (this.docStatus == 0) {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请先点击到达车位！");
        native.callhandler("showVoice", "请先点击到达车位！");
      } else {
        if (this.docStatus == 1 || this.docStatus == 3) {
           native.callhandler(
          "showVoice",
          "请将阻车器放在前轮，距离轮胎5厘米存放，放好后请拍照上传"
        );
          }
        
        this.$router.replace({
          path: "/bigTruckDriver/BlockerPhotograph",
          query: {
            zcqUrl: this.dataObj.zcqUrl,
            statu: this.docStatus
          }
        });
      }
    },

    getData(flag) {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
     // console.log(data);
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http
        .post("/inFacNavigation", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          this.$refs.loadmore.onTopLoaded();
          if (result.ret_code == 0) {
            if (flag == 1) {
              window.instance ? window.instance.close() : "";
              window.instance = this.$toast("刷新成功");
            }
            // this.imgPath=result.data.picUrl
            this.docStatus = result.data.docStatus;
            this.nextPageStatus = result.data.nextPageStatus;
            setCache("pageIndex",this.nextPageStatus)
            this.dataObj = result.data;
          }
        })
       
    }
  }
};
</script>

<style lang="scss" scoped>
.loadmoreCss {
  position: absolute;
  top: 0.5rem;
  bottom: 0.5rem;
  right: 0;
  left: 0;
}
.common-page-flex {
  height: 100vh;
  display: block;
}
.common-bottom-button span {
  width: 50%;
}
.greenBtner {
  background: #00b42a;
}
.red {
  font-size: 0.19rem;
}

.common-line-two-panel {
  p {
    border-bottom: 0 none;
  }
}

.content {
  flex-grow: 1;
  img {
    width: 100%;
    height: 100%;
  }
}

.common-bottom-button {
  .orangeBtn {
    img {
      width: 0.26rem;
      height: 0.21rem;
      margin-right: 0.05rem;
    }
    // b {
    //   //  font-size: 0.15rem;
    // }
  }
  span {
    width: 50%;
  }
}
</style>
