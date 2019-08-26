<template>
  <div class="common-page-flex">
    <div class="common-page-content">
      <mt-loadmore
        :top-method="loadTop"
        @top-status-change="handleTopChange"
        ref="loadmore"
        class="loadmoreCss"
      >
        <div class="oprateBox">
          <template v-for="(item, index) in dataList">
            <take-photo
              :key="index"
              :title="item.imageDesc"
              :poto1="0"
              :imagePath="item.imagePath"
              :status="1"
              :list="item.picturetyp"
              :lists="lists"
              :Whether="item.imagePath"
              :flags="index>1?flags:false"
              class="photo"
            ></take-photo>
          </template>
        </div>
      </mt-loadmore>

      <div class="common-bottom-button bottom-button-fixed">
        <span class="orangeBtn" @click="hurryup" v-if="!countdownFlag">催卸货</span>
        <span class="orangeBtn" v-else>{{minutes}}:{{seconds}}</span>
        <span v-if="docstatus=='1'" @click="beginUnload">开始卸货</span>
        <span v-else @click="toUnloadCon">卸货完成</span>
      </div>
    </div>
  </div>
</template>

<script>
import native from "@/native/bridge.js";
import TakePhoto from "@/components/common/TakePhoto.vue";
import { setCache, getCache } from "@/config/utils";

export default {
  components: { TakePhoto },
  data() {
    return {
      dataList: [],
      lists: {
        docId: "",
        picturecls: "Xhzt"
      },
      imgPath: [],
      countdownFlag: false,
      minutes: 10,
      seconds: 0,
      nextPageStatus: "",
      active: true,
      docstatus: "",
      flags: true,
      imagePathStatu: true,
      imagePathStatus: true
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    loadTop() {
      //传1说明是下拉刷新
      this.getData(1);
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    getData(flag) {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.lists.docId = data;
      this.$loading.open();
      let params = {
        docId: data,
        picturecls: "Xhzt",
        picturetyp: ""
      };
      this.$http.post("/getUploadPicture", params).then(res => {
        this.$loading.close();
        let result = res.data;
        if (result.ret_code == 0) {
          if (flag == 1) {
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast("刷新成功");
            this.$refs.loadmore.onTopLoaded();
          }
          this.docstatus = result.data.docStatus;
          console.log(this.docstatus);
          if (this.docstatus == 0) {
            this.flags = false;
            this.imagePathStatus = true;
          }
          this.dataList = result.data.imageDescs;
          // this.dataList.forEach((item, index) => {
          //     this.imagePathStatu = true
          //     if (!item.imagePath) {
          //       this.imagePathStatu = false;
          //     }
          //   });
          console.log(this.dataList);
          this.nextPageStatus = result.data.nextPageStatus;
          setCache("pageIndex",this.nextPageStatus)
        }
      });
    },
    beginUnload() {
      const url =
        "http://img.logwsd.com/group1/M00/01/39/rBUAEF1TcFqAPnUPAAAEXyS_a5I826.png";
      let currentUrl;
      try {
        for (let i = 0; i < 2; i++) {
          currentUrl = document.getElementsByClassName("imgUrl")[i].src;
          this.imagePathStatus = true;
          if (url === currentUrl) {
            this.imagePathStatus = false;
            throw i;
          }
        }
      } catch (error) {
        console.log(error);
      }

      if (this.imagePathStatus) {
        if (this.active) {
          let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
          this.$loading.open();
          let params = {
            docId: data,
            picturetyp: "Cpck",
            picturecls: "Xhzt",
            imgUploadInput: "",
            pictureseq: ""
          };
          this.$http.post("/uploadPicture", params).then(res => {
            this.$loading.close();
            let result = res.data;
            console.log(result.data);
            if (result.ret_code == 0) {
              this.active = false;
              this.flags = false;
              window.instance ? window.instance.close() : "";
              window.instance = this.$toast(result.msg);
              this.getData();
            }
          });
        } else {
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast("已提交！");
        }
      } else {
        native.callhandler(
          "showVoice",
          "请先拍车牌仓库照和车牌仓管照！",
          data => {}
        );

        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请先拍车牌仓库照和车牌仓管照！");
      }

      //todo
    },
    toUnloadCon() {
      const url =
        "http://img.logwsd.com/group1/M00/01/39/rBUAEF1TcFqAPnUPAAAEXyS_a5I826.png";
      let currentUrl;
      try {
        for (let i = 2; i < 8; i++) {
          currentUrl = document.getElementsByClassName("imgUrl")[i].src;
          this.imagePathStatu = true;
          if (url === currentUrl) {
            this.imagePathStatu = false;
            throw i;
          }
        }
      } catch (error) {
        console.log(error);
      }

      if (this.imagePathStatu) {
        let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
        this.$loading.open();
        let params = {
          docId: data,
          picturetyp: "Kmxw",
          picturecls: "Xhzt",
          imgUploadInput: "",
          pictureseq: ""
        };
        this.$http.post("/uploadPicture", params).then(res => {
          this.$loading.close();
          let result = res.data;
          console.log(result.data);
          if (result.ret_code == 0) {
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast(result.msg);
            let pageStatuList = getCache("PageStatus");
            for (let k in pageStatuList) {
              if (this.nextPageStatus == k) {
                console.log(pageStatuList[k]);
                this.$router.replace({
                  path: `/bigTruckDriver/${pageStatuList[k]}`
                });
              }
            }
          } else {
            native.callhandler("showVoice", "请先去送货单确认！", data => {});

            window.instance ? window.instance.close() : "";
            window.instance = this.$toast("请先去送货单确认！");
          }
        });
      } else {
        native.callhandler("showVoice", "请先拍照！", data => {});

        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请先拍照！");
      }
      // this.$router.replace({
      //   path: '/bigTruckDriver/unloadConfirm'
      // })
    },
    hurryup() {
      let id = getCache("bigTruckDriverList").docId;
      this.$loading.open();
      let params = {
        id: id,
        type:2
      };
      this.$http
        .get("/dispatcherStatist/pushSigningAndUnloading", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          native.callhandler("showVoice", result.msg, data => {});
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
        });

      // this.countdownFlag = true;
      // if (this.countdownFlag) {
      //   this.timer();
      // }
    },
    timer() {
      let _this = this;
      let _minutes = this.minutes;
      let _seconds = this.seconds;
      let time = window.setInterval(function() {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.countdownFlag = false;
          _this.minutes = _minutes;
          _this.seconds = _seconds;
          window.clearInterval(time);
        } else {
          _this.seconds -= 1;
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.loadmoreCss {
  position: absolute;
  top: 0rem;
  bottom: 0.5rem;
  right: 0;
  left: 0;
}
.common-page-content {
  padding-bottom: 0.5rem;
  overflow-y: scroll;
}
.oprateBox {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  overflow-y: scroll;
  padding-bottom: 0.1rem;
  .photo {
    width: 1.63rem;
    height: 1.56rem;
    margin-left: 0.16rem;
    margin-top: 0.15rem;
  }
}
.common-bottom-button {
  span {
    width: 50%;
  }
}
</style>
