<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div @touchmove.prevent.stop @click="normalImg" v-if="isBig">
      <div class="mask"></div>
      <img :src="bigImgUrl" class="active">
      <div
        v-show="standardFlag"
        class="common-bottom-button bottom-button-fixed retake"
        @click.stop="takePhoto(1)"
      >重拍</div>
    </div>
    <div class="driverPhoto">
      <!-- <p class="stand" @click="standardBig">
        <img src="@/assets/images/common/standard.jpg">
      </p>-->
      <p class="stand takephoto">
        <img :src="outImg" class="out" v-show="status=='3'">
        <img :src="imgPath" class="imgPatUrl">
      </p>
    </div>
    <div class="common-bottom-button bottom-button-fixed">
      <span class="orangeBtn" @click="takePhoto">
        <img src="@/assets/images/common/takePhoto.png" alt>
        <b>阻车器拍照</b>
      </span>
      <span class="greenBtner" @click="Jump">确定</span>
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
      title: "阻车器标准照",
      dataObj: {},
      isBig: false,
      status: "",
      type: "",
      router: "",
      takePhotoFlag: true,
      outImg: require("@/assets/images/common/outs.png"),
      imgPath:"http://img.logwsd.com/group1/M00/01/39/rBUAEF1TbVqASlB1AACiueVcVcQ102.jpg",
      nextPageStatus: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.router = from.name;
      console.log(from.name);
      if (from.name == "intoFacNav") {
        vm.type = 1;
      } else if (from.name == "loadWork") {
        vm.type = 2;
      }
    });
  },
  mounted() {
    this.getData();
  },
  methods: {
    takePhoto(type = 0) {
      if (this.status == 2) {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("审核已经合格，不可拍照！");
        native.callhandler("showVoice", "审核已经合格，不可拍照！");
      } else if (this.status == 4) {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("审核中，不可拍照！");
        native.callhandler("showVoice", "审核中，不可拍照！");
      } else {
        native.callhandler("takePhot", "", data => {
          if (eval("(" + data + ")").ret_code == "0") {
            let dataUrl = eval("(" + data + ")").data.url;
            this.imgPath = dataUrl;
            this.$loading.open();
            let docId = getCache("bigTruckDriverList").smallOrder[0].deldocId;
            let params;
            if (this.type == 1) {
              params = {
                imgUploadInput: dataUrl,
                picturecls: "Rcdh",
                picturetyp: "Zcqpz",
                docId: docId
              };
            } else if (this.type == 2) {
              params = {
                imgUploadInput: dataUrl,
                picturecls: "Zhgz",
                picturetyp: "Zcqgw",
                docId: docId
              };
            }
            console.log(params);
            this.$http.post("/uploadPicture", params).then(res => {
              this.$loading.close();
              let result = res.data;
              console.log(result);
              if (result.ret_code == "0") {
                this.status = 4;
                window.instance ? window.instance.close() : "";
                window.instance = this.$toast(result.msg);
              }
            });
          } else {
            console.log(eval("(" + data + ")"));
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast(eval("(" + data + ")").msg);
          }
        });
      }
    },
    standardBig() {
      this.isBig = !this.isBig;
      this.standardFlag = false;
      this.bigImgUrl = require("@/assets/images/common/standard.jpg");
    },
    normalImg() {
      this.isBig = !this.isBig;
    },

    getData() {
      let statu = this.$route.query;
      //console.log(statu);
      this.imgPath = statu.zcqUrl;
      this.status = statu.statu;

      // let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      // console.log(data);
      // this.$loading.open();
      // let params = {
      //   docId: data
      // };
      // this.$http.post("/inFacNavigation", params).then(res => {
      //   this.$loading.close();
      //   let result = res.data;
      //   console.log(result);
      //   if (result.ret_code == 0) {
      //     this.nextPageStatus = result.data.nextPageStatus;
      //     setCache("pageIndex",this.nextPageStatus)
      //     this.dataObj = result.data;
      //   }
      // });
    },
    Jump() {
      this.$router.replace({
        path: "/bigTruckDriver/" + this.router + ""
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// .common-page-flex {
//   // height: 100vh;
// }
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
  background: #00b42a;
  img {
    width: 100%;
    height: 100%;
  }
}
.imgPatUrl {
  width: 100%;
  height:-webkit-fill-available;
}
.common-bottom-button {
  .orangeBtn {
    img {
      width: 0.26rem;
      height: 0.21rem;
      margin-right: 0.05rem;
    }
    // b {
    //   // font-size: 0.15rem;
    // }
  }
  span {
    width: 50%;
  }
}
.out {
  position: absolute;
  bottom: .5rem;
  left: .5rem;
}
.driverPhoto {
  position: absolute;
  top: 0.5rem;
  background: #eee;
  bottom: 0.5rem;
  left:0;
  right:0;
}
</style>
