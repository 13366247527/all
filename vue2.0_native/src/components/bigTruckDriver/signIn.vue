<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <mt-loadmore :top-method="loadTop" ref="loadmore" :autoFill="false" class="loadmoreCss">
      <div class="common-line-one-panel">
        <p class="compony">{{objData.cpynam}}</p>
      </div>
      <div class="common-line-one-panel wid203">
        <p>
          <span>姓名：</span>
          <span class="name">{{objData.personnam}}</span>
        </p>
      </div>
      <div class="common-line-one-panel wid203">
        <p>
          <span>岗位：</span>
          <span class="black">{{objData.postName}}</span>
        </p>
      </div>
      <div class="common-line-one-panel wid203">
        <p>
          <span>到达时间：</span>
          <span class="red">{{objData.arvtim}}</span>
        </p>
      </div>
      <div class="common-line-one-panel">
        <p>
          <span>车号：</span>
          <span class="black">{{objData.vehlicnum}}</span>
        </p>
      </div>
      <div class="date">
        <p class="month">{{year}}-{{month}}</p>
        <p class="day">
          <span>
            星期
            <b>{{week}}</b>
          </span>
          <span class="num">{{date}}</span>
        </p>
      </div>
      <div class="center">
        <div>
          <span class="orange">{{objData.LowBloodPre}}</span>
          <span>低血压值</span>
        </div>
        <div>
          <span class="orange">{{objData.HighBloodPre}}</span>
          <span>高血压值</span>
        </div>
        <div>
          <span class="green">{{objData.alcPre}}</span>
          <span>酒精值</span>
        </div>
      </div>
      <div @touchmove.prevent @click="normalImg" v-if="isBig">
        <div class="mask"></div>
        <img :src="bigImgUrl" class="active">
        <div
          v-show="standardFlag"
          class="common-bottom-button bottom-button-fixed retake"
          @click.stop="takePhoto(1)"
        >重拍</div>
      </div>

      <div class="driverPhoto" @click="takePhoto">
        <p class="stand" @click="standardBig">
          <img src="@/assets/images/common/standard.jpg">
        </p>
        <p class="stand takephoto">
          <img :src="outImg" class="out" v-show="objData.status=='1'">
          <img :src="imgPath" class="imgPatUrl">
        </p>
      </div>

      <div class="stateBox">
        <span>状态：</span>
        <span
          :class="objData.status=='2'?'orange':objData.status=='1'?'red':'green'"
        >{{objData.statusDesc}}</span>
      </div>
    </mt-loadmore>

    <div class="common-bottom-button bottom-button-fixed" @click="toInstruction">签到</div>
  </div>
</template>

<script>
import native from "@/native/bridge.js";
import HeaderDefault from "@/components/common/HeaderDefault";
import { setCache, getCache } from "@/config/utils";

export default {
  components: { HeaderDefault },
  data() {
    return {
      title: "上班签到",
      imgPath: "http://img.logwsd.com/group1/M00/01/39/rBUAEF1TcBSACa0HAAAYc33OJyQ512.png",
      isBig: false,
      outImg: require("@/assets/images/common/outs.png"),
      standardFlag: false,
      takePhotoFlag: true,
      bigImgUrl: "",
      objData: {},
      actice: true,
      year: "",
      month: "",
      week: "",
      date: "",
      nextPageStatus: "",
      allHeight: "",
      imagePathStatu: true,
      Whether: false
    };
  },

  mounted() {
    this.getData();
    this.mountDate();
  },
  methods: {
    loadTop() {
      //传1说明是下拉刷新
      this.getData(1);
    },
    toInstruction() {
     // this.getData();
      const url = "http://img.logwsd.com/group1/M00/01/39/rBUAEF1TcBSACa0HAAAYc33OJyQ512.png";
      let currentUrl = document.getElementsByClassName("imgPatUrl")[0].src;

      this.imagePathStatu = true;
      if (url == currentUrl) {
        this.imagePathStatu = false;
      }

      if (this.imagePathStatu) {
        if (this.objData.status == 0) {
          let pageStatuList = getCache("PageStatus");
          for (let k in pageStatuList) {
            if (this.nextPageStatus == k) {
              console.log(pageStatuList[k]);
              this.$router.replace({
                path: `/bigTruckDriver/${pageStatuList[k]}`
              });
            }
          }
        } else if (this.objData.status == 1) {
          native.callhandler("showVoice", "审核不合格请重新提交！", data => {});

          window.instance ? window.instance.close() : "";
          window.instance = this.$toast("审核不合格请重新提交！");
        } else {
          native.callhandler("showVoice", "请等待审核！", data => {});

          window.instance ? window.instance.close() : "";
          window.instance = this.$toast("请等待审核！");
        }
      } else {
        native.callhandler("showVoice", "请先拍照！", data => {});

        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请先拍照！");
      }
      // this.$router.replace({
      //   path: "/bigTruckDriver/instruction"
      // });
    },
    takePhoto(type = 0) {
      if (this.Whether) {
        native.callhandler(
          "showVoice",
          "审核状态中和审核通过不可拍照！",
          data => {}
        );

        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("审核状态中和审核通过不可拍照！");
        return false;
      }
      this.objData.status=2
      if (type == 1) {
        this.takePhotoFlag = true;
        this.getData();
        this.mountDate();
      }
      if (this.takePhotoFlag) {
        native.callhandler("takePhot", "", data => {
          let dataUrl = eval("(" + data + ")").data.url;
          this.isBig = false;
         // this.takePhotoFlag = false;
          this.imgPath = dataUrl;
          let datas = getCache("bigTruckDriverList").docId;

          let params = {
            imgUploadInput: dataUrl,
            picturecls: "Qd",
            picturetyp: "Zrz",
            docId: datas
          };
          console.log(params);
          this.$http
            .post("/uploadPicture", params)
            .then(res => {
              this.$loading.close();
              let result = res.data;
              console.log(result);
              if (result.ret_code == "0") {
                window.instance ? window.instance.close() : "";
                window.instance = this.$toast(result.msg);
                this.objData.statusDesc = "审核中";
              }
            })
        });
      } else {
       // this.isBig = !this.isBig;
       // this.standardFlag = true;
        this.bigImgUrl = this.imgPath;
      }
    },
    standardBig() {
     // this.isBig = !this.isBig;
      this.standardFlag = false;
      this.bigImgUrl = require("@/assets/images/common/standard.jpg");
    },
    normalImg() {
     // this.isBig = !this.isBig;
    },
    mountDate() {
      let weeks = ["日", "一", "二", "三", "四", "五", "六"];
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth() + 1;
      this.week = weeks[new Date().getDay()];
      this.date = new Date().getDate();
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    getData(flag) {
      this.handleTopChange("loading");
      let data = getCache("bigTruckDriverList").docId;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http.post("/signDriver", params).then(res => {
        this.$loading.close();
        let result = res.data;

        if (result.ret_code == 0) {
          if (flag == 1) {
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast("刷新成功");
            this.$refs.loadmore.onTopLoaded();
          }
          this.nextPageStatus = result.data.nextPageStatus;
          setCache("pageIndex",this.nextPageStatus)
          this.objData = result.data;
          if (result.data.imagePath) {
            this.imgPath = result.data.imagePath;
            this.Whether = true;
            if (result.data.status == 1) {
              this.Whether = false;
            }
            this.imagePathStatu = true;
          } else {
            this.imagePathStatu = false;
          }
          console.log(result);
        } else {
          console.log(result);
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
        }
      });
    }
    // getData(){
    //     this.$loading.open();
    //     let params = {
    //         "cpycod": '0006',
    //         "tranum": '27480',
    //         "tranumsuf": '0',
    //     }
    //     this.$http.post( '/getShipMentByOrderId', params).then(res => {
    //         this.$loading.close();
    //         let result = res.data;
    //         if (result.ret_code == 0) {
    //             this.damageDetails = res.data.damageDetails;
    //             this.tempData = res.data.damageDetails;
    //             this.damagePay = res.data.damagePay;
    //             this.reason = res.data.reason;
    //             this.reasonList = res.data.reasonList;
    //         }
    //     })
    // }
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
.mask {
  width: 100%;
  height: 100%;
  background: #333;
  opacity: 0.7;
  display: block;
  margin: 0 auto;
  position: fixed;
  top: -0.5rem;
  bottom: -0.5rem;
  left: 0;
  right: 0;
  z-index: 999;
}
.active {
  width: 100%;
  height: 100%;
  display: block;
  margin: 0 auto;
  position: fixed;
  top: -0.5rem;
  bottom: -0.5rem;
  left: 0;
  right: 0;
  z-index: 10000;
}

.compony {
  padding-left: 0.1rem;
  font-size: 0.15rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(102, 102, 102, 1);
}

.name {
  font-size: 0.19rem;
  color: rgba(51, 51, 51, 1);
  @include normal-font();
}

.wid203 {
  width: 2.03rem;
}
.date {
  position: absolute;
  top: 1.3rem;
  right: 0.2rem;
  width: 1.05rem;
  .month {
    font-size: 0.25rem;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(102, 102, 102, 1);
    margin-bottom: 0.1rem;
  }
  .day {
    font-size: 0.15rem;
    @include slim-font();
    color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      width: 0.47rem;
      height: 0.47rem;
      background: rgba(227, 29, 43, 1);
      border-radius: 0.05rem;
      text-align: center;
      b {
        font-size: 0.21rem;
        @include normal-font();
      }
    }
    .num {
      line-height: 0.47rem;
      font-size: 0.31rem;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.center {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  background: #fff;
  margin: 0 0.16rem;
  height: 0.72rem;
  font-size: 0.15rem;
  @include normal-font();
  color: rgba(51, 51, 51, 1);
  border-bottom: 1px solid rgba(236, 236, 236, 1);
  div {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    span:first-of-type {
      margin-bottom: 0.1rem;
    }
    .orange {
      font-size: 0.19rem;
    }
    .green {
      font-size: 0.19rem;
    }
  }
}

.driverPhoto {
  @include flex(row);
  justify-content: space-around;
  margin: 0.11rem 0.16rem 0.1rem;
  .stand {
    width: 1.4rem;
    height: 1.56rem;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(192, 192, 192, 1);
    border-radius: 0.05rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .takephoto {
    position: relative;
    border: 0 none;
    .out {
    position: absolute;
    top: .8rem;
    left: 0.1rem;
    width:.8rem;
    height:.7rem;
  }
  }
}

.stateBox {
  height: 0.45rem;
  border-top: 1px solid rgba(236, 236, 236, 1);
  @include flex(row);
  align-items: center;
  font-size: 0.15rem;
  margin: 0 0.16rem 0.5rem;
  span:first-of-type {
    padding-left: 0.1rem;
  }
}

.retake {
  z-index: 999;
}
</style>
