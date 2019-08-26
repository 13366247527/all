<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <mt-loadmore :top-method="loadTop" ref="loadmore" :autoFill="false" class="loadmoreCss">
      <div class="common-line-one-panel">
        <p>
          <span>装运单号：</span>
          <span class="red">{{dataObj.traId}}</span>
        </p>
      </div>

      <ul class="common-content-box">
        <li
          v-for="(item, index) in tempData"
          :key="index"
          class="content"
          @click.stop.prevent="info(item,index)"
        >
          <div class="common-content-body">
            <div class="common-img">
              <img :src="item.palletImg?item.palletImg:palletImg" class="img">
            </div>
            <div class="common-right">
              <div>
                <div>{{item.palletName}}</div>
              </div>
              <div>
                <span>
                  数量：
                  <span>{{item.quantity}}</span> 块
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </mt-loadmore>

    <div class="common-line-two-panel total">
      <p>
        <span>托盘数量：</span>
        <span class="red">{{dataObj.quantity}}</span>
        <span class="black">块</span>
      </p>
    </div>

    <div class="common-bottom-button bottom-button-fixed">
      <span @click="stopReady">确认托盘</span>
    </div>
  </div>
</template>

 <script>
import HeaderDefault from "@/components/common/HeaderDefault";
import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";

export default {
  components: { HeaderDefault },
  data() {
    return {
      title: "归还托盘",
      cpycod: "",
      tranum: "",
      tranumsuf: "",
      dataObj: {},
      docStatus: "",
      tempData: [
        {
          articleName: "果粒橙/1.25L*12",
          articleNumber: 132,
          articleWeight: 2112,
          artnum: "1102165102",
          floorNumber: 0,
          id: "201953492303738103",
          palletNumber: 0,
          status: "1",
          unitNumber: 132
        },
        {
          articleName: "果粒橙/1.25L*12",
          articleNumber: 132,
          articleWeight: 2112,
          artnum: "1102165102",
          floorNumber: 0,
          id: "201953492303738103",
          palletNumber: 0,
          status: "1",
          unitNumber: 132
        },
        {
          articleName: "果粒橙/1.25L*12",
          articleNumber: 132,
          articleWeight: 2112,
          artnum: "1102165102",
          floorNumber: 0,
          id: "201953492303738103",
          palletNumber: 0,
          status: "1",
          unitNumber: 132
        },
        {
          articleName: "果粒橙/1.25L*12",
          articleNumber: 132,
          articleWeight: 2112,
          artnum: "1102165102",
          floorNumber: 0,
          id: "201953492303738103",
          palletNumber: 0,
          status: "1",
          unitNumber: 132
        },
        {
          articleName: "果粒橙/1.25L*12",
          articleNumber: 132,
          articleWeight: 2112,
          artnum: "1102165102",
          floorNumber: 0,
          id: "201953492303738103",
          palletNumber: 0,
          status: "1",
          unitNumber: 132
        },
        {
          articleName: "果粒橙/1.25L*12",
          articleNumber: 132,
          articleWeight: 2112,
          artnum: "1102165102",
          floorNumber: 0,
          id: "201953492303738103",
          palletNumber: 0,
          status: "1",
          unitNumber: 132
        },
        {
          articleName: "果粒橙/1.25L*12",
          articleNumber: 132,
          articleWeight: 2112,
          artnum: "1102165102",
          floorNumber: 0,
          id: "201953492303738103",
          palletNumber: 0,
          status: "1",
          unitNumber: 132
        }
      ],
      palletImg:
        "http://img.logwsd.com/group1/M00/01/39/rBUAEF1Tbe6AM6QkAAEsRXxwhWM982.png",
      nextPageStatus: "",
      statuFlag: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.index == 1) {
        vm.title = "归还托盘";
      } else {
        vm.title = "完成装车";
      }
    });
  },
  mounted() {
    this.getData();
  },
  methods: {
    loadTop() {
      //传1说明是下拉刷新
      this.getData(1);
    },
    toServiceComment() {
      this.$router.replace({
        path: "/bigTruckDriver/serviceComment"
      });
    },
    toContract() {
      if (this.docStatus == 2) {
        let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
        this.$loading.open();
        let params = {
          docId: data,
          statecls: "Zcwc",
          statetyp: "Zhys",
          tableName: "WhDeliveryDoc",
          artnum: ""
        };
        this.$http.post("/setTransState", params).then(res => {
          this.$loading.close();
          let result = res.data;
          console.log(result.data);
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
          native.callhandler("showVoice", result.msg);
          if (result.ret_code == 0) {
            let pageStatuList = getCache("PageStatus");
            for (let k in pageStatuList) {
              if (this.nextPageStatus == k) {
                console.log(pageStatuList[k]);
                this.$router.replace({
                  path: `/bigTruckDriver/${pageStatuList[k]}`
                });
              }
            }
          }
        });
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
      //   path: "/bigTruckDriver/contract"
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
        statecls: "Kszc",
        statetyp: "Zhys",
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
    actualAccept(id, index) {
      this.$loading.open();
      let params = {
        docId: id
      };
      this.$http.post("/loadActual", params).then(res => {
        this.$loading.close();
        let result = res.data;
        console.log(result.data);
        if (result.ret_code == 0) {
          this.tempData[index].status = 0;
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
        } else {
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.returnInfo);
        }
      });
    },
    stopReady() {
      let index = this.$route.query.index;
      if (index == 1) {
        let data = getCache("bigTruckDriverList").vehlicnum;
        this.$loading.open();
        let params = {
          vehlicnum: data
        };
        this.$http.post("/palletReclaim/confirmVehPallet", params).then(res => {
          this.$loading.close();
          let result = res.data;
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
          native.callhandler("showVoice", result.msg);
          if (result.ret_code == 0) {
            this.$router.replace({
              path: "/bigTruckDriver/loadWork"
            });
          }
        });
      } else {
        this.$router.replace({
          path: "/bigTruckDriver/contract"
        });
      }
    },
    getData(flag) {
      let index = this.$route.query.index;
      if (index == 1) {
        let data = getCache("bigTruckDriverList").vehlicnum;
        this.$loading.open();
        let params = {
          vehlicnum: data
        };
        this.$http.get("/palletReclaim/getVehPallet", params).then(res => {
          this.$loading.close();
          let result = res.data;
          console.log(result);
          this.$refs.loadmore.onTopLoaded();
          if (result.ret_code == 0) {
            if (flag == 1) {
              window.instance ? window.instance.close() : "";
              window.instance = this.$toast("刷新成功");
            }
            // this.nextPageStatus = result.data.nextPageStatus;
            // setCache("pageIndex", this.nextPageStatus);
            this.dataObj = result.data;
            this.tempData = result.data.list;
          }
        });
      } else {
        let data = getCache("bigTruckDriverList").docId;
        this.$loading.open();
        let params = {
          traId: data
          //  traId: '201965944125187189'
        };
        this.$http.get("/palletReclaim/getTraPallet", params).then(res => {
          this.$loading.close();
          let result = res.data;
          console.log(result);
          this.$refs.loadmore.onTopLoaded();
          if (result.ret_code == 0) {
            if (flag == 1) {
              window.instance ? window.instance.close() : "";
              window.instance = this.$toast("刷新成功");
            }
            // this.nextPageStatus = result.data.nextPageStatus;
            // setCache("pageIndex", this.nextPageStatus);
            this.dataObj = result.data;
            this.tempData = result.data.list;
          }
        });
      }
    }
  }
};
</script>

 <style lang="scss" scoped>
// .loadmoreCss {
//   position: absolute;
//   top: 0.5rem;
//   bottom: 0.5rem;
//   right: 0;
//   left: 0;
// }

// .common-line-one-panel {
//   p {
//     padding: 0;
//     height: 0.46rem;
//     border-bottom: 0 none;
//     position: relative;
//     .serviceCom {
//       @include redPanel(0.73rem);
//       position: absolute;
//       right: 0.1rem;
//     }
//   }
// }

.redsBtn {
  display: inline-block;
  width: 0.5rem;
  height: 0.31rem;
  line-height: 0.31rem;
  text-align: center;
  background: #e31d2b;
  border-radius: 0.05rem;
  color: #fff;
}
.orangeBtnY {
  background: rgba(255, 186, 0, 1);
}
.total {
  width: 100%;
  position: fixed;
  bottom: 0.5rem;
  background: #fff;
}

.common-bottom-button {
  .orangeBtn {
    img {
      width: 0.26rem;
      height: 0.21rem;
      margin-right: 0.05rem;
    }
  }
  span {
    width: 33.3%;
  }
}

.loadmoreCss {
  position: absolute;
  top: 0.5rem;
  bottom: 0rem;
  right: 0;
  left: 0;
}
.bottom-box {
  position: absolute;
  // bottom: 0.6rem;
  width: 100%;
  background: #fff;
  font-size: 0.16rem;
  padding: 0 0.1rem;
  div {
    min-height: 0.3rem;
    line-height: 0.3rem;
  }
}
.redsBtn {
  display: inline-block;
  width: 0.5rem;
  height: 0.31rem;
  line-height: 0.31rem;
  text-align: center;
  background: #e31d2b;
  border-radius: 0.05rem;
  color: #fff;
}
.total {
  width: 100%;
  position: fixed;
  bottom: 0.5rem;
  background: #fff;
}

.common-content-box {
  margin-bottom: 1.1rem;
}
.common-bottom-button {
  .orangeBtn {
    img {
      width: 0.26rem;
      height: 0.21rem;
      margin-right: 0.05rem;
    }
  }
}
.common-content-box {
  background: #f1f1f0;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  .common-content-body {
    height: 1rem;
  }

  .common-content-bottom {
    div {
      width: 100%;
    }
    .org {
      color: #ff7f00;
      img {
        width: 0.15rem;
        height: 0.13rem;
        margin: 0 0.05rem;
      }
    }
  }

  .common-img {
    width: 0.85rem;
    height: 0.87rem;
    background: #eee;
    display: -webkit-inline-box;
    //margin-top: -10px;
    .img {
      width: 0.85rem;
      height: 0.87rem;
    }
  }
  .common-right {
    display: block;
    padding: 0 0 0 0.2rem;
    margin-top: 0.3rem;
    height: 100%;

    div {
      height: 0.3rem;
      span {
        // display: inline-block;
        // width: 0.6rem;
        .c {
          display: inline-block;
          width: 0.3rem;
        }
      }
      .wid71 {
        width: 0.7rem;
      }
      input {
        border: 0.01rem solid #ccc;
        height: 0.26rem;
        border-radius: 0;
      }
      .readonly {
        border: 0;
        // text-align: center;
      }
    }
  }
  li {
    min-height: 1rem;
    background: #fff;
    padding: 0 0.1rem;
    width: auto;
    margin: 0.05rem 0;
    border-radius: 0.03rem;
    align-items: baseline;
    display: block;
    div {
      // width: 25%;
      text-align: left;
      input {
        width: 0.62rem;
      }
      .peddingBtn {
        @include peddingBtn(0.52rem);
      }
    }
  }
}
.header {
  font-size: 0.18rem;
  padding: 0 0.1rem;
  div {
    height: 0.5rem;
    line-height: 0.5rem;
    width: 50%;
    display: inline-block;
  }
  .wid100 {
    //width: 0.65rem;
    display: inline-block;
  }
  .last {
    border: 0;
  }
}
.common-content-head {
  width: 100%;
  //border-bottom: 1px solid #ccc;
  //height: 0.4rem;
  min-height: 0.4rem;
  .common-title {
    width: 100%;
    min-height: 0.4rem;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    //display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    -webkit-box-align: initial;
  }
  .button {
    width: 0.6rem;
    text-align: center;
    font-size: 0.17rem;
  }
  .buttons {
    background: linear-gradient(
      90deg,
      rgba(244, 18, 34, 1),
      rgba(237, 63, 62, 1),
      rgba(255, 94, 96, 1)
    );
    border-radius: 25px;
    color: #fff;
    padding: 0.03rem;
  }
}
.bgred {
  background: #e31d2b;
  width: 100%;
}

.common-content-box li div {
  justify-content: flex-start;
  //height: 0.4rem;
}
.bottom-box {
  font-size: 0.18rem;
  padding: 0 0.1rem;
  // padding-bottom: .5rem;
  div {
    min-height: 0.33rem;
    line-height: 0.33rem;
  }
}

.content {
  position: relative;
}
.articleName {
  position: absolute;
  font-size: 0.16rem;
  padding: 0.1rem;
  border-radius: 0.05rem;
  font-size: 0.16rem;
  background: #eee;
}
</style>
