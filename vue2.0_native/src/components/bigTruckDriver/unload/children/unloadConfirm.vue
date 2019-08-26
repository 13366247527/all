<template>
  <div>
    <div class="common-page-flex">
      <header-default :title="title"></header-default>
      <!-- <div class="common-line-one-panel">
        <p>
          <span>破损数量：</span>
          <span class="red">{{dataList.totalBoxNumber}}</span>
          <span class="black">箱</span>
          <span class="red">{{dataList.totalButtleNumber}}</span>
          <span class="black">瓶</span>

          <span class="left20">金额：</span>
          <span class="red">{{dataList.totalPrice}}</span>
          <span class="black">元</span>
        </p>
      </div>-->

      <!-- <div class="common-line-one-panel wid203">
      <p>
        <span>金额：</span>
        <span class="red">{{dataList.totalPrice}}</span>
        <span class="black">元</span>
      </p>
      </div>-->
      <div class="common-line-one-panel">
        <p>
          <span>处理方法：</span>
          <input
            type="text"
            class="red"
            v-if="dataList.reasonChoosed"
            readonly
            v-model="dataList.reasonChoosed"
          >
          <select-box
            v-else
            class="wid140"
            id="select1"
            ref="reason"
            :selectDataList="dataLists"
            @vehtypnams="shows"
          ></select-box>
        </p>
      </div>
      <div class="common-line-one-panel">
        <p class="nobor">
          <span>原因反馈：</span>
          <input
            type="text"
            class="red"
            v-if="dataList.methodChoosed"
            readonly
            v-model="dataList.methodChoosed"
          >
          <select-box
            v-else
            class="wid140"
            id="select2"
            ref="reason"
            :selectDataList="dataListss"
            @vehtypnams="shows"
          ></select-box>
        </p>

        <!-- <take-photo
          :title="photoTitle"
          :poto1="0"
          :imagePath="dataList.damagePath"
          :status="dataList.status?dataList.status:'1'"
          :list="picturetyp"
          :lists="lists"
          :Damaged="Damaged"
          class="takePhoto"
        ></take-photo>
        <p class="peddingBtn">
          <span v-if="dataList.damagehandlestate==0" style="background:#ccc;">提交</span>
          <span v-else @click="Submission">提交</span>
        </p>-->
      </div>
      <ul class="common-content-box">
        <li class="common-content-title bgGray">
          <div>品名规格</div>
          <div>破损数量</div>
          <div>赔付金额(元)</div>
          <div>破损照片</div>
        </li>
        <li class="common-content-content" v-for="(item, index) in tempData" :key="index">
          <div>
            <span class="photo">
              <img :src="item.picPath?item.picPath:totalPrice">
            </span>
            <span class="th-name">{{item.articleName}}</span>
          </div>
          <div>
            <b class="red">{{item.articleBoxNumber}}</b> 箱
            <b class="red">{{item.articleBottleNumber}}</b>件
          </div>
          <div>{{item.uniPrice}}</div>
          <div>
            <span class="photo">
              <img :src="item.damPath?item.damPath:totalPrice">
            </span>
          </div>
          <!-- <p>赔付金额赔付金额</p> -->
        </li>
      </ul>
      <div class="driverLine">
        <span>收货员对司机评价：</span>
        <rating v-if="dataList.score" :cur="dataList.score" :types="'readonly'"></rating>
      </div>
      <textarea name="driverEvalute" class="driverEvalute" readonly v-model="dataList.evaluation"></textarea>
      <div class="common-line-one-panel end">
        <p class="nobor1">
          <span>合计赔付：</span>
          <span class="red">{{dataList.totalPrice}}</span>
          <span>元</span>
        </p>
        <p class="peddingBtn1">
          <span class="orangeBtn red" @click="hurryup">催签单</span>
        </p>

        <!-- <p class="peddingBtn">
        <span class="orangeBtn">催签单</span>
        </p>-->
      </div>
      <!-- <div class="common-line-one-panel">
        
        <p class="nobor">
           <span>指纹确认状态：</span>
          <span class="green">已确认</span>
         <p class="peddingBtn">
        <span class="orangeBtn">催签单</span>
        </p>
      </div>-->
      <div class="common-bottom-button bottom-button-fixed">
        <span class="orangeBtn" @click="sign">人工签单</span>
        <span @click="toDeliveryService">交货确认</span>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import TakePhoto from "@/components/common/TakePhoto";
import SelectBox from "@/components/common/SelectBox";
import Rating from "@/components/common/Rating";
import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";

export default {
  components: { HeaderDefault, TakePhoto, SelectBox, Rating },
  data() {
    return {
      title: "卸货确认",
      photoTitle: "破损拍照",
      evaluation: "",
      picturetyp: "Pszt",
      totalPrice:
        "http://img.logwsd.com/group1/M00/01/39/rBUAEF1Tbe6AM6QkAAEsRXxwhWM982.png",
      tempData: [],
      dataList: {},
      Damaged: "",
      lists: {
        docId: "",
        picturecls: "Pszt"
      },
      method: "",
      reason: "",
      nextPageStatus: "",
      dataLists: [
        {
          flex: 1,
          values: [],
          textAlign: "center"
        }
      ],
      dataListss: [
        {
          flex: 1,
          values: [],
          textAlign: "center"
        }
      ]
    };
  },
  // created () {
  //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
  // },
  mounted() {
    this.getData();
    this.$root.eventHub.$on("vehtypnams", this.shows);
  },
  methods: {
    getData() {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.lists.docId = data;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http.post("/getDamageInfo", params).then(res => {
        this.$loading.close();
        let result = res.data;
          console.log(result.data.data.damageArtList);
        if (result.ret_code == 0) {
          this.tempData = result.data.data.damageArtList;
          this.dataList = result.data.data;
          if (
            result.data.data.totalBoxNumber == 0 &&
            result.data.data.totalButtleNumber == 0
          ) {
            this.Damaged = true;
          } else {
            this.Damaged = false;
          }
          this.nextPageStatus = result.data.nextPageStatus;
          setCache("pageIndex",this.nextPageStatus)

          let data = [];
          let datas = [];

          result.data.data.methodList.forEach((item, index) => {
            data.push(item.valdescl);
          });
          result.data.data.reasonList.forEach((item, index) => {
            datas.push(item.valdescl);
          });
          this.$set(this.dataLists[0], "values", data);
          this.$set(this.dataListss[0], "values", datas);
        }
      });
    },
    shows(id) {
      //console.log(id)
    },
    hurryup() {
      let id = getCache("bigTruckDriverList").docId;
      this.$loading.open();
      let params = {
        id: id,
        type:1
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
    Submission() {
      let dammethod = document.getElementsByClassName("currentTag")[0]
        .innerText;
      let damreason = document.getElementsByClassName("currentTag")[1]
        .innerText;
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      if (dammethod == "请选择！" || damreason == "请选择！") {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请选择处理方法和原因！");
        return false;
      }
      this.$loading.open();
      let params = {
        docId: data,
        dammethod: dammethod,
        damreason: damreason
      };
      this.$http.post("/saveDamageSelect", params).then(res => {
        this.$loading.close();
        let result = res.data;
        console.log(result);
        if (result.ret_code == 0) {
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
          // this.getData();
          // //this.dataList.damagehandlestate = 0;
          native.callhandler("showVoice", result.msg, data => {});
        } else {
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
        }
      });
    },
    sign() {
      if(this.dataList.damagehandlestate == 0){
        this.$router.replace({
        path: "/bigTruckDriver/sign"
      });
      }else{
         window.instance ? window.instance.close() : "";
          window.instance = this.$toast("请点击交货确认！");
          native.callhandler("showVoice", "请点击交货确认！");
      }
      
    },
    toDeliveryService() {
      if (this.dataList.damagehandlestate == 0) {
        this.$router.replace({
          path: "/bigTruckDriver/deliveryService"
        });
      } else {
        let dammethod = document.getElementsByClassName("currentTag")[0]
          .innerText;
        let damreason = document.getElementsByClassName("currentTag")[1]
          .innerText;
        let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
        if (dammethod == "请选择！" || damreason == "请选择！") {
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast("请选择处理方法和原因！");
          return false;
        }
        this.$loading.open();
        let params = {
          docId: data,
          dammethod: dammethod,
          damreason: damreason
        };
        this.$http.post("/saveDamageSelect", params).then(res => {
          this.$loading.close();
          let result = res.data;
          console.log(result);
          if (result.ret_code == 0) {
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast({
        message: result.msg,
        position: "bottom",
        duration: 1000
      });
            // this.getData();
            //this.dataList.damagehandlestate = 0;
            native.callhandler("showVoice", result.msg, data => {});
            setTimeout(() => {
                 this.$router.replace({
              path: "/bigTruckDriver/deliveryService"
            });
              }, 1000);
            
          } else {
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast(result.msg);
          }
        });
      }
      // let pageStatuList = getCache("PageStatus");
      // for (let k in pageStatuList) {
      //   if (this.nextPageStatus == k) {
      //     console.log(pageStatuList[k]);
      //     this.$router.push({
      //       path: `/bigTruckDriver/${pageStatuList[k]}`
      //     });
      //   }
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.common-page-flex {
  margin-bottom: 0.5rem;
}
.wid203 {
  width: 2.03rem;
}
.wid140 {
  width: 1.4rem;
}
.reasonFeedback {
  width: 1.15rem;
}
.common-content-box {
  padding-top: 0.15rem;
}
.common-content-content {
  height: 1.1rem;
  position: relative;
}
.th-name {
  position: absolute;
  left: 0.05rem;
  bottom: 0.02rem;
  font-size: 0.15rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  width: 100%;
  font-weight: 600;
  text-align: left;
}
.common-content-box li div:nth-child(1) {
  width: 25%;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  // display: inline-block;
  // line-height: 0.48rem;
}
.common-content-box li div:nth-child(2) {
  width: 25%;
}
.common-content-box li div:nth-child(3) {
  width: 25%;
}
.common-content-box li div:nth-child(4) {
  width: 25%;
}
.common-content-box .common-content-title div {
  font-size: 0.14rem;
  font-weight: 600;
}
.common-content-box li {
  border: 0;
}
.common-line-one-panel {
  padding-top: 0.1rem;
  .nobor1 {
    width: 50%;
    float: left;
    border-bottom: 0 none;
  }
  .peddingBtn1 {
    border-bottom: 0 none;
    width: 50%;
    float: right;
  }
  p {
    border: 0;
  }
  .peddingBtn1 {
    // padding-top: .1rem;
    padding-bottom: 0;

    justify-content: center;
    span {
      @include peddingBtn(1.08rem);
      height: 0.37rem;
      line-height: 0.37rem;
    }
    .orangeBtn {
      background: #fff;
      color: #e31d2b;
      border: 0.01rem solid #e31d2b;
    }
  }
}
.left20 {
  margin-left: 0.2rem;
}
.end {
  padding-bottom: 0.1rem;
}
.takePhoto {
  display: block;
  width: 1.57rem;
  height: 1.5rem;
  text-align: center;
  margin: 0.1rem auto;
  // position: absolute;
  // top: 0.7rem;
  // right: 0.2rem;
  // width: 1.1rem;
  // height: 1.04rem;
}
.driverLine {
  display: flex;
  align-items: center;
  padding: 0.2rem 0.26rem 0 0.26rem;
  height: 0.53rem;
  font-size: 0.16rem;
  font-size: 0.15rem;
  @include slim-font();
  color: rgba(51, 51, 51, 1);
}

.driverEvalute {
  box-sizing: border-box;
  display: block;
  width: 3.41rem;
  height: 0.99rem;
  padding: 0.05rem;
  margin: 0 auto;
  background: rgba(240, 240, 240, 1);
  border: 1px solid rgba(192, 192, 192, 1);
  // border-radius: 0.05rem;
  font-size: 0.15rem;
  @include slim-font();
  color: rgba(153, 153, 153, 1);
}
.common-content-box .common-content-content div .photo {
  width: 0.8rem;
  height: 0.65rem;
  background: #e0e0e0;
  img {
    width: 100%;
    height: 100%;
    // width: 0.53rem;
    // height: 0.37rem;
    // margin: auto;
    // margin-top: 0.14rem;
  }
}

</style>
