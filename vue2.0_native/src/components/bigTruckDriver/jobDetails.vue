<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="common-line-one-panel">
      <p>
        <span>装货公司：</span>
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
        <span>安排装车时间：</span>
        <span class="red">{{dataObj.planLoadDatetime}}</span>
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
        <span class="red">{{dataObj.rcvRequest}}</span>
      </p>
    </div>
    <div class="common-line-one-panel">
      <p>
        <span class="minwid">车型要求：</span>
        <span class="black">{{dataObj.rcvtxyq4}}</span>
      </p>
    </div>

    <div class="common-bottom-button bottom-button-fixed" @click="toLoadNav">装货导航</div>
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
      title: "作业明细",
      docId: "",
      cpycod: "",
      tranum: "",
      tranumsuf: "",
      dataObj: {},
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
    showPopup() {
      this.popupVisible = !this.popupVisible;
    },
    toLoadNav() {
      let pageStatuList = getCache("PageStatus");
      for (let k in pageStatuList) {
        if (this.nextPageStatus == k) {
            console.log(pageStatuList[k])
          this.$router.replace({
            path: `/bigTruckDriver/${pageStatuList[k]}`
          });
        }
      }
    //   this.$router.replace({
    //     path: "/bigTruckDriver/loadNav"
    //   });
    }, telclick(){
      native.callhandler("showVoice", "没有查询到电话！", data => {});
      window.instance ? window.instance.close() : "";
            window.instance =  this.$toast("没有查询到电话！")
    },
    getData() {
      let data = getCache("bigTruckDriverList").docId;
      this.docId = data;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http
        .post("/getShipmentByOrder", params)
        .then(res => {
          this.$loading.close();
          console.log(res);
          let result = res.data;
          if (result.ret_code == 0) {
            this.nextPageStatus = result.data.nextPageStatus;
            setCache("pageIndex",this.nextPageStatus)
            this.dataObj = result.data.data;
          }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
