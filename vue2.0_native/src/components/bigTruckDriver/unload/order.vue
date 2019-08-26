<template>
  <div class="common-page-flex" @click="currentIndex=null">
    <div class="header">
      <div>
        <span class="wid100">单号：</span>
        <span class="red">{{dataList.refdeldocnum}}</span>
      </div>
      <!-- <div class="last">
        <span class="wid100">重量:</span>
        <span class="red">123</span>吨
      </div>-->
    </div>
    <ul class="common-content-box">
      <li
        v-for="(item, index) in tempData"
        :key="index"
        class="content"
        @click.stop.prevent="info(item,index)"
      >
        <div class="common-content-head">
          <div class="common-title">{{item.articleName}}</div>
          <div>
            <span v-if="item.status==0" class="green button">已卸</span>
            <span v-else class="red button buttons" @click.stop="querys(index)">确认</span>
          </div>
        </div>
        <div class="common-content-body">
          <div class="common-img">
            <img :src="item.totalPrice?item.totalPrice:totalPrice" class="img">
          </div>
          <div class="common-right">
            <div>
              <span class="wid71">订货数量</span>
              <b class="red">{{item.articleNumber}}</b> &nbsp;箱
            </div>
            <div>
              <span>交货</span>
              <input
                v-if="item.status==0"
                class="readonly"
                type="text"
                :value="item.rcvBoxNumber"
                readonly
              >
              <input
                v-else
                type="text"
                @click.stop
                oninput.stop="value=value.replace(/[^\d]/g,'')"
                v-model="item.rcvBoxNumber"
              > &nbsp;箱
            </div>
            <div>
              <span>瓶数</span>
              <input
                v-if="item.status==0"
                type="text"
                class="readonly"
                :value="item.rcvBottleNumber"
                readonly
              >
              <input
                v-else
                type="text"
                @click.stop
                oninput.stop="value=value.replace(/[^\d]/g,'')"
                v-model="item.rcvBottleNumber"
              > &nbsp;瓶
            </div>
          </div>
        </div>
        <div class="common-content-bottom">
          <div @click.stop="takePhoto(item.status,index,item.id)" class="org">
            <img src="@/assets/images/common/photo.png" alt>破损拍照
          </div>
          <div class="money">
            货品金额：
            <b class="red">￥{{item.price}}</b>
          </div>
        </div>
        <!-- <div @click.stop="handleClick(index)">{{item.articleName}}</div>
        <div>{{item.articleNumber}}</div>
        <div>
          <input v-if="item.status==0" type="text" :value="item.rcvBoxNumber" readonly>
          <input
            v-else
            type="text"
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="item.rcvBoxNumber"
          >
        </div>
        <div>
          <input v-if="item.status==0" type="text" :value="item.rcvBottleNumber" readonly>
          <input
            v-else
            type="text"
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="item.rcvBottleNumber"
          >
        </div>
        <div>
          <span v-if="item.status==0" class="green">已卸</span>
          <span v-else class="peddingBtn" @click="querys(index)">确认</span>
        </div>-->
        <!-- <span v-show="currentIndex === index" class="articleName">{{item.articleName}} </span> -->
      </li>
    </ul>
    <div class="bottom-box">
      <div>
        <span class="wid100">破损数量:</span>
        <span class="red">{{dataList.todamboxnum}}</span> 箱
        <span class="red">{{dataList.todambottlenum}}</span> 瓶
      </div>
      <div>
        <span class="wid100">收货数量:</span>
        <span class="red">{{dataList.totalrcvuni}}</span> 箱
        <span class="red">{{dataList.totalrcvbot}}</span> 瓶
      </div>
    </div>
    <!-- <div class="common-bottom-button bottom-button-fixed">
        <span @click="true" class="bgred">交货确认</span>
    </div>-->
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
      tempData: [
        1,2,3,4
      ],
      evaluation: "",
      delivery: "",
      BottleNumber: "",
      dataList: "",
      currentIndex: null // 默认index
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleClick(index) {
      console.log(index);
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
      this.$http.post("/getDeliveryArticle", params).then(res => {
        this.$loading.close();
        let result = res.data;
        console.log(result);
        if (result.ret_code == 0) {
          let datas = getCache("BoxNumber");
          if (flag == 1) {
            this.dataList = result.data;
          } else {
            this.tempData = result.data.ArtckeList;
            this.dataList = result.data;
            this.tempData.forEach((item, index) => {
              if (item.status != 0) {
                if (item.rcvBottleNumber == 0) {
                  this.tempData[index].rcvBottleNumber = "";
                }
                if (item.rcvBoxNumber == 0) {
                  //this.tempData[index].rcvBoxNumber = "";
                  this.tempData[index].rcvBoxNumber = this.tempData[
                    index
                  ].articleNumber;
                }
              }
            });
            this.tempData[datas.index].rcvBoxNumber = datas.rcvBoxNumber;
            this.tempData[datas.index].rcvBottleNumber = datas.rcvBottleNumber;
          }
        }
      });
    },
    querys(index) {
      if (
        this.tempData[index].rcvBoxNumber <
          this.tempData[index].articleNumber &&
        this.tempData[index].picPath == ""
      ) {
        native.callhandler("showVoice", "请拍破损照片！");
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请拍破损照片！");
        return;
      }
      if (this.tempData[index].rcvBoxNumber == 0) {
        native.callhandler("showVoice", "交货数量不能为零！");

        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("交货数量不能为零！");
        return;
      }
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.$loading.open();
      let params = {
        docId: data,
        id: this.tempData[index].id,
        artnum: this.tempData[index].artnum,
        shpartuni: this.tempData[index].articleNumber,
        rcvartnui: this.tempData[index].rcvBoxNumber,
        rcvartsuu: this.tempData[index].rcvBottleNumber
      };

      this.$http.post("/actualAccept", params).then(res => {
        this.$loading.close();
        let result = res.data;
        console.log(result);
        if (result.ret_code == 0) {
          // this.tempData = result.data.ArtckeList;
          console.log(result);
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
          this.getData(1);
          this.tempData[index].status = 0;
        } else {
          native.callhandler("showVoice", result.msg, data => {});
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
        }
      });
    },
    takePhoto(statu, index, id) {
      if (statu == 0) {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("已经确认，不可拍照！");
        native.callhandler("showVoice", "已经确认，不可拍照！");
      } else {
        if (
          this.tempData[index].rcvBoxNumber >=
          this.tempData[index].articleNumber
        ) {
          native.callhandler("showVoice", "没有破损，不可拍照！", data => {});
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast("没有破损，不可拍照！");
          return;
        }
        native.callhandler("takePhot", "", data => {
          if (eval("(" + data + ")").ret_code == "0") {
            let dataUrl = eval("(" + data + ")").data.url;
            this.$loading.open();
            let params;

            params = {
              imgUploadInput: dataUrl,
              picturecls: "Pszt",
              picturetyp: "Pszt",
              docId: id
            };

            console.log(params);
            this.$http.post("/uploadPicture", params).then(res => {
              this.$loading.close();
              let result = res.data;
              console.log(result);
              if (result.ret_code == "0") {
                window.instance ? window.instance.close() : "";
                window.instance = this.$toast(result.msg);
                this.tempData[index].picPath = 1;
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
    info(data, index) {
      let datas = {
        index,
        index,
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
  background: #f1f1f0;
  .common-content-body {
    height: 1.1rem;
    border-bottom: 1px solid #ccc;
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
    padding: 0 0.2rem;
    margin-top: 0.15rem;
    height: 100%;
    div {
      height: 0.3rem;
      span {
        width: 0.6rem;
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
    min-height: 1.8rem;
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
  border-bottom: 1px solid #ccc;
  //height: 0.4rem;
  min-height: 0.4rem;
  .common-title {
    width: 100%;
    min-height: 0.46rem;
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
// .common-content-box li div:nth-child(1) {
//   width: 30%;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   display: inline-block;
//   line-height: 0.48rem;
// }
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
// .common-content-box li div:nth-child(2) {
//   width: 15%;
// }
// .common-content-box li div:nth-child(3) {
//   width: 20%;
// }
// .common-content-box li div:nth-child(4) {
//   width: 20%;
// }
// .common-content-box li div:nth-child(5) {
//   width: 15%;
// }
</style>
