<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="common-line-one-panel">
      <p>
        <span>装运单号：</span>
        <span class="red">{{dataObj.refdocnum}}</span>
      </p>
    </div>
    <div class="common-line-one-panel">
      <p>
        <span class="minwid">装货公司：</span>
        <span class="black address">{{dataObj.delwhsnum}}</span>
      </p>
      <a class="phone" v-if="dataObj.delpersonltel" :href="'tel:'+dataObj.delpersonltel">电话沟通</a>
      <a class="phone" v-else @click="telclick">电话沟通</a>
    </div>
    <div class="common-line-one-panel">
      <p>
        <span class="minwid">装货地点：</span>
        <span class="black">{{dataObj.delwhsadr}}</span>
      </p>
    </div>
    <div class="common-line-one-panel">
      <p>
        <span class="minwid">通行要求：</span>
        <span class="black">{{dataObj.delRequest}}</span>
      </p>
    </div>
    <div class="common-line-one-panel">
      <p>
        <span class="minwid">车型要求：</span>
        <span class="black">{{dataObj.deltxyq4}}</span>
      </p>
    </div>
    <blank-space></blank-space>
    <div class="common-line-two-panel">
      <p>
        <span>重量：</span>
        <span class="green">{{dataObj.totartwgt}}</span>
        <span class="black">吨</span>
      </p>
      <p>
        <span>里程数：</span>
        <span class="green">{{dataObj.trpkm}}</span>
        <span class="black">公里</span>
      </p>
    </div>
    <div class="common-line-one-panel">
      <p>
        <span>要求到车时间：</span>
        <span class="red">{{dataObj.planArvDatetime}}</span>
      </p>
    </div>
    <div class="common-line-one-panel">
      <p class="selectBox">
        <span>选择到车时间：</span>
        <input class="red wid100" type="text" readonly @click="ArrivalTime" :value="timeStatus">
        <img src="@/assets/images/common/selectIcon.png" alt>
        <!-- <select-box :selectDataList="selectDataList" class="arrivalTime" ></select-box> -->
      </p>
    </div>
    <div class="common-line-one-panel">
      <p>
        <span>安排装车时间：</span>
        <span class="green">{{dataObj.planLoadDatetime}}</span>
      </p>
    </div>
    <blank-space></blank-space>
    <div class="common-line-one-panel">
      <p>
        <span class="minwid">卸货公司：</span>
        <span class="black address">{{dataObj.rcvwhsnum}}</span>
      </p>
      <a class="phone" v-if="dataObj.rcvpersonltel" :href="'tel:'+dataObj.rcvpersonltel">电话沟通</a>
      <a class="phone" v-else @click="telclick">电话沟通</a>

    </div>
    <div class="common-line-one-panel">
      <p>
        <span class="minwid">卸货地点：</span>
        <span class="black">{{dataObj.rcvwhsadr}}</span>
      </p>
    </div>
    <div class="common-line-one-panel">
      <p>
        <span class="minwid">通行要求：</span>
        <span class="black">{{dataObj.rcvRequest}}</span>
      </p>
    </div>
    <div class="common-line-one-panel">
      <p>
        <span class="minwid">车型要求：</span>
        <span class="black">{{dataObj.rcvtxyq4}}</span>
      </p>
    </div>

    <div class="common-bottom-button bottom-button-fixed">
      <span :class="active?'greenBtner':'redBtner'" @click="Confirmreceipt">确定接单</span>
      <span class="orangeBtn" @click="toFreight">运价查询</span>
      <span class="yellBtn" @click="Refuse">拒绝接单</span>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import BlankSpace from "@/components/common/BlankSpace";
import SelectBox from "@/components/common/SelectBox";
import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";

export default {
  components: { HeaderDefault, BlankSpace, SelectBox },
  data() {
    return {
      title: "接单确认",
      dataObj: {},
      timeStatus: "",
      active: false,
      docId: "",
      selectDataList: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "right"
        },
        {
          divider: true,
          content: ":",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "left"
        }
      ]
    };
  },
  // created () {
  //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
  // },
  beforeMount() {
    let hour = [];
    let min = [];
    for (let i = 0; i < 24; i++) {
      if (String(i).length == 1) {
        hour.push("0" + i);
      } else {
        hour.push(String(i));
      }
    }
    for (let i = 0; i < 60; i++) {
      if (String(i).length == 1) {
        min.push("0" + i);
      } else {
        min.push(String(i));
      }
    }
    this.$set(this.selectDataList[0], "values", hour);
    this.$set(this.selectDataList[2], "values", min);
  },
  mounted() {
    this.getData();
  },
  methods: {
    toFreight() {
       window.instance ? window.instance.close() : "";
          window.instance =  this.$toast("开发中！");
      // this.$router.push({
      //     path: '/bigTruckDriver/freight'
      // })
    },
    Refuse() {
       window.instance ? window.instance.close() : "";
          window.instance = this.$toast("开发中！");
    },
    ArrivalTime() {
      if (this.dataObj.states == 0) {
         native.callhandler("showVoice", "已确认接单，时间不可更改！", data => {});
         window.instance ? window.instance.close() : "";
          window.instance = this.$toast("已确认接单，时间不可更改！");
      } else {
        this.$router.replace({
          path: "/bigTruckDriver/ArrivalTime",
          query: {
            data: this.dataObj.timeList
          }
        });
      }
    },
    telclick(){
      native.callhandler("showVoice", "没有查询到电话！", data => {});
       window.instance ? window.instance.close() : "";
          window.instance = this.$toast("没有查询到电话！")
    },
    Confirmreceipt() {
      if (this.dataObj.states == 1) {
        this.$loading.open();
        let params = {
          docId: this.docId,
          settim: this.timeStatus
        };
        this.$http.post("/commitLoadTime", params).then(res => {
          this.$loading.close();
          let result = res.data;
          if (result.ret_code == 0) {
            this.active = true;
             window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
            this.getData();
          } else {
             window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
          }
        });
      } else {
         window.instance ? window.instance.close() : "";
          window.instance = this.$toast("已确认接单！");
        this.dataObj.states = 0;
      }
    },
    getData() {
      let data = getCache("bigTruckDriverList").docId;
      this.docId = data;
      let index = this.$route.query.index;
      if (index) {
        this.timeStatus = index;
      }
       
      

      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http
        .post("/getShipmentByOrder", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          if (result.ret_code == 0) {
            this.dataObj = result.data.data;
            if(!index){
               this.timeStatus=this.dataObj.plndellintim
            }
            this.dataObj.states == 0 ? (this.active = true) : "";
          }
        })
        .catch(res => {
          //  window.instance ? window.instance.close() : "";
          window.instance = this.$toast("数据获取错误！")
        });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.common-bottom-button span {
  width: 33.3%;
}
.common-page-flex {
  padding-bottom: 0.5rem;
}

.common-line-one-panel {
  p {
    height: inherit;
    padding-top: 0.13rem;
    padding-bottom: 0.13rem;
  }
}
.greenBtner {
  background: #00b42a;
}
.yellBtn {
  background: #ffba00;
}
.phone {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0.27rem;
  margin: auto 0;
  @include redPanel(0.73rem);
}

.minwid {
  min-width: 0.75rem;
}

.address {
  width: 1.6rem;
}

.arrivalTime {
  width: 1.82rem;
}

.black {
  line-height: 0.2rem;
  word-break: break-all;
}
.selectBox .wid100 {
  width: 1.5rem;
}
.selectBox img {
  right: 0.9rem;
}
</style>
