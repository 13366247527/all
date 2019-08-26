<template>
  <div class="common-page-flex" @click="currentIndex=null">
    <div class="header">
      <div>
        <span class="wid100">客户数：</span>
        <span class="red">{{dataList.outletCount}}</span>
      </div>
      <div class="last">
        <span class="wid100">重量:</span>
        <span class="red">{{(dataList.totalartwgt)}}</span> 吨
      </div>
    </div>

    <ul class="common-content-box">
      <li
        v-for="(item, index) in tempData"
        :key="index"
        class="content"
        @click.stop.prevent="info(item,index)"
        :class="index==0?'active':''"
      >
        <div class="common-content-head">
          <div class="common-title">{{item.articleName}}</div>
          <!-- <div>
            <span v-if="item.status==0" class="green button">已卸</span>
            <span v-else class="red button buttons" @click.stop="querys(index)">确认</span>
          </div>-->
        </div>
        <div class="common-content-body">
          <div class="common-img">
            <img :src="item.totalPrice?item.totalPrice:totalPrice" class="img">
          </div>
          <div class="common-right">
            <div>
              <span>订单数量</span>
              <span class="fl">
                <b class="red">{{item.articleNumber}}</b> &nbsp;箱
              </span>
            </div>
            <div>
              <span>交货</span>
              <span>
                <input
                  v-if="dataList.status==0"
                  class="readonly"
                  type="text"
                  :value="item.rcvBoxNumber"
                  readonly
                >
                <input
                  v-else
                  type="text"
                  @click.stop
                  oninput="value=value.replace(/[^\d]/g,'')"
                  v-model="item.rcvBoxNumber"
                >箱&nbsp;
                <input
                  v-if="dataList.status==0"
                  type="text"
                  class="readonly"
                  :value="item.rcvBottleNumber"
                  readonly
                >
                <input
                  v-else
                  type="text"
                  @click.stop
                  oninput="value=value.replace(/[^\d]/g,'')"
                  v-model="item.rcvBottleNumber"
                >瓶
              </span>
            </div>
          </div>
        </div>
      </li>
      <div class="totalList">
        <div>
          货品金额：
          <b>￥{{'无'}}</b>
          <span>
            <button class="button" @click="querys()">确认</button>
          </span>
          <span>
            <button @click.stop="takePhoto(dataList.picFlag)">拍照</button>
          </span>
        </div>
      </div>

      <ul class="trayNume" v-if="palletList.length!=0">
        <div class="trayTip">
          <span>交货托盘</span>
          <span class="fl fl1">还托盘数</span>
          <span class="fl">送托盘数</span>
        </div>
        <li v-for="(item, index) in palletList" :key="index">
          <span class="trayColor">{{item.palletName}}</span>
          <span class="fl fl1">
            <input type="text" oninput="value=value.replace(/[^\d]/g,'')" v-model="item.inQuantity">块&nbsp;
          </span>
          <span class="fl">
            <input
              type="text"
              oninput="value=value.replace(/[^\d]/g,'')"
              v-model="item.outQuantity"
            >块&nbsp;&nbsp;&nbsp;
          </span>
        </li>
      </ul>

      <div class="numList">
        <div>
          破损数量：
          <b>{{dataList.todamboxnum}}</b> 箱
          <b>{{dataList.todambottlenum}}</b> 瓶
        </div>
        <div>
          收货数量：
          <b>{{dataList.totalrcvuni}}</b> 箱
          <b>{{dataList.totalrcvbot}}</b> 瓶
        </div>
      </div>
    </ul>

    <div class="common-bottom-button bottom-button-fixed">
      <span @click="Determine">交货确定</span>
    </div>
  </div>
</template>

<script>
import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";

export default {
  data() {
    return {
      cur: -1,
      totalPrice:
        "http://img.logwsd.com/group1/M00/01/39/rBUAEF1Tbe6AM6QkAAEsRXxwhWM982.png",
      tempData: [],
      palletList: [],
      evaluation: "",
      delivery: "",
      BottleNumber: "",
      dataList: "",
      outnum: "",
      currentIndex: null // 默认index
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleClick(index) {
      this.currentIndex = index;
    },
    getData(flag) {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      if (flag != 1) {
        this.$loading.open();
      }
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http.post("/getDeliveryArticleV2", params).then(res => {
        this.$loading.close();
        let result = res.data;
        if (result.ret_code == 0) {
          let datas = getCache("BoxNumber");
          if (!flag == 1) {
            this.palletList = result.data.palletList;
          }
          this.dataList = result.data;
          this.tempData = result.data.ArtckeList;
          this.outnum = this.dataList.outnum;
          this.tempData.forEach((item, index) => {
            if (this.dataList.status != 0) {
              if (!item.rcvBottleNumber) {
                item.rcvBottleNumber = "";
              }
              if (!item.rcvBoxNumber) {
                item.rcvBoxNumber = item.articleNumber;
              }
            }
          });

          // this.tempData[datas.index].rcvBoxNumber = datas.rcvBoxNumber;
          // this.tempData[datas.index].rcvBottleNumber = datas.rcvBottleNumber;
        }
      });
    },
    querys() {
      let flag = false;
      let flags = false;
      let numNo = false;

      this.tempData.forEach(item => {
        if (item.rcvBoxNumber < item.articleNumber) {
          flag = true;
        } else if (item.rcvBoxNumber > item.articleNumber) {
          flags = true;
        }
        if (item.rcvBoxNumber == 0) {
          numNo = true;
        }
      });
      if (flags) {
        native.callhandler("showVoice", "交货数量不能大于订单数量！");
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("交货数量不能大于订单数量！");
        return;
      }
      if (numNo) {
        native.callhandler("showVoice", "交货数量不能为零！");
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("交货数量不能为零！");
        return;
      }
      if (flag && !this.tempData.picPath) {
        native.callhandler("showVoice", "请拍破损照片！");
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请拍破损照片！");
        return;
      }

      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.$loading.open();
      this.tempData.forEach(item => {
        item.docId = data;
        item.shpartuni = item.articleNumber;
        item.rcvartnui = item.rcvBoxNumber;
        item.rcvartsuu = item.rcvBottleNumber;
      });
      let params = {
        data: JSON.stringify(this.tempData)
      };

      this.$http.post("/actualAcceptV2", params).then(res => {
        this.$loading.close();
        let result = res.data;
        console.log(result);
        if (result.ret_code == 0) {
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
          this.getData(1);
          this.dataList.status = 0;
        } else {
          native.callhandler("showVoice", result.msg);
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
        }
      });
    },
    takePhoto(statu) {
      if (statu == 1) {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("已经确认，不可拍照！");
        native.callhandler("showVoice", "已经确认，不可拍照！");
      } else {
        let flag = false;
        this.tempData.forEach(item => {
          if (item.rcvBoxNumber < item.articleNumber) {
            flag = true;
          }
        });

        if (!flag) {
          native.callhandler("showVoice", "没有破损，不可拍照！", data => {});
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast("没有破损，不可拍照！");
          return;
        }
        native.callhandler("takePhot", "", data => {
          if (eval("(" + data + ")").ret_code == "0") {
            let dataUrl = eval("(" + data + ")").data.url;
            this.$loading.open();
            let traId = getCache("bigTruckDriverList").docId;
             let params = {
              picture: dataUrl,
              traId: traId
            };

            this.$http.post("/palletReclaim/uploadDelImg", params).then(res => {
              this.$loading.close();
              let result = res.data;
              console.log(result);
              if (result.ret_code == "0") {
                window.instance ? window.instance.close() : "";
                window.instance = this.$toast(result.msg);
                this.tempData.picPath = 1;
              } else {
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
    Determine() {
      console.log(this.palletList);
      if (this.dataList.status == 1) {
        native.callhandler("showVoice", "请先确认破损情况！");
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请先确认破损情况！");
        return;
      }
      let data = getCache("bigTruckDriverList");
      this.$loading.open();
      let params = {
        data: JSON.stringify({
          traId: data.docId,
          outnum: this.outnum,
          delId: data.smallOrder[0].deldocId,
          vehlicnum: data.vehlicnum,
          details: this.palletList
        })
      };

      this.$http.post("/palletReclaim/submit", params).then(res => {
        this.$loading.close();
        let result = res.data;

        if (result.ret_code == 0) {
          // this.tempData = result.data.ArtckeList;
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);

          this.$root.eventHub.$emit("UNchangeTab", 0);
        } else {
          native.callhandler("showVoice", result.msg, data => {});
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
        }
      });
    },

    info(data, index) {
      let datas = {
        index: index,
        rcvBoxNumber: data.rcvBoxNumber,
        rcvBottleNumber: data.rcvBottleNumber
      };
      setCache("BoxNumber", datas);
      this.$router.push({
        path: "/bigTruckDriver/DetailsOfGoodss",
        query: { id: data.id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.common-content-box {
  margin-bottom: 0.5rem;
  background: #f1f1f0;
  padding: 0 0.1rem 0.05rem 0.1rem;
  .common-content-body {
    height: 0.7rem;
    //  border-bottom: 1px solid #ccc;
  }
  .active {
    border-radius: 0.05rem 0.05rem 0 0;
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
    // .money{
    //   float: right;
    // }
  }

  .common-img {
    width: 0.85rem;
    height: 0.87rem;
    background: #eee;
    display: -webkit-inline-box;
    // margin-top: .7rem;
    .img {
      width: 0.85rem;
      height: 0.87rem;
    }
  }
  .common-right {
    display: block;
    padding: 0 0.02rem 0 0.2rem;
    // margin-top: 0.15rem;
    height: 100%;
    width: 70%;
    div {
      height: 0.35rem;
      justify-content: space-between;
      //   span {
      //     width: 0.6rem;
      //   }
      .fl {
        float: right;
      }
      .wid71 {
        width: 0.7rem;
      }
      input {
        border: 0.01rem solid #ccc;
        height: 0.26rem;
        border-radius: 0.05rem;
        width: 0.5rem;
        margin-right: 0.03rem;
        color: #e31d2b;
        vertical-align: baseline;
      }
      .readonly {
        border: 0;
        text-align: right;
      }
    }
  }
  li {
    min-height: 1.3rem;
    background: #fff;
    padding: 0 0.1rem;
    width: auto;
    //margin: 0.05rem 0;
    // border-radius: 0.03rem;
    align-items: baseline;
    display: block;
    border: 0;
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
  // border-bottom: 1px solid #ccc;
  //height: 0.4rem;
  line-height: 0.3rem;
  .common-title {
    width: 100%;
    // min-height: 0.46rem;
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
    width: 0.4rem;
    text-align: center;
    font-size: 0.17rem;
  }
  .buttons {
    background: #e31d2b;
    color: #fff;
    padding: 0.03rem;
    border-radius: 0.03rem;
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
    min-height: 0.4rem;
    line-height: 0.4rem;
  }
}
.content {
  position: relative;
  top: 0.05rem;
  border-radius: 0.03rem;
  background: #fff;
}
.articleName {
  position: absolute;
  font-size: 0.16rem;
  padding: 0.1rem;
  border-radius: 0.05rem;
  font-size: 0.16rem;
  background: #eee;
}
.totalList {
  background: #fff;
  font-size: 0.14rem;
  color: #666;
  padding: 0.2rem 0.1rem 0.12rem 0.1rem;
  border-radius: 0 0 0.05rem 0.05rem;
  b {
    color: #f42d3b;
  }
  span {
    float: right;
    button {
      padding: 0.03rem 0.15rem;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(227, 29, 43, 1);
      border-radius: 0.2rem;
      color: rgba(227, 29, 43, 1);
      margin-top: -0.04rem;
    }
    .button {
      background: rgba(227, 29, 43, 1);
      border: 1px solid rgba(227, 29, 43, 1);
      border-radius: 0.2rem;
      color: #fff;
      margin-left: 0.1rem;
    }
  }
}
.trayNume {
  background: #fff;
  margin-top: 0.05rem;
  padding: 0.1rem;
  border-radius: 0.05rem;
  .trayTip {
    font-size: 0.14rem;
    .fl {
      float: right;
      width: 23.5%;
    }
    .fl1 {
      float: right;
      width: 21.5%;
    }
  }
  li {
    font-size: 0.14rem;
    padding: 0;
    height: auto;
    min-height: auto;
    overflow: hidden;
    margin-top: 0.1rem;
    .fl {
      float: right;
    }
    .fl1 {
      float: right;
    }
    .trayColor {
      font-size: 0.14rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(29, 136, 227, 1);
    }
    input {
      border: 0.01rem solid #ccc;
      height: 0.26rem;
      border-radius: 0.05rem;
      width: 0.5rem;
      margin-right: 0.03rem;
      color: #e31d2b;
      vertical-align: baseline;
    }
  }
}
.numList {
  margin-top: 0.05rem;
  background: #fff;
  padding: 0.05rem 0.1rem 0.04rem 0.1rem;
  font-size: 0.14rem;
  border-radius: 0.05rem;
  div {
    line-height: 0.25rem;
  }
  b {
    color: #e31d2b;
  }
}
</style>
