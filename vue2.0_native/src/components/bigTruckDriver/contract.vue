<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
<div class="common-content">

    <div class="common-line-one-panel contract">
      <p>{{contents}}</p>
    </div>
    <div class="common-line-one-panel">
      <p @click="readO">
        <img v-if="!readFlagO" src="@/assets/images/common/check.png" class="check-img">
        <img v-else src="@/assets/images/common/checked.png" class="check-img">
        <span class="red">我已认真阅读，并严格执行。请勾选同意。</span>
      </p>
    </div>
    <div class="common-line-one-panel insurance">
      <span></span>
      <p>保险协议</p>
      <span></span>
    </div>
    <div class="common-line-one-panel contract">
      <p>{{content}}</p>
    </div>
    <div class="common-line-one-panel">
      <p @click="readT">
        <img v-if="!readFlagT" src="@/assets/images/common/check.png" class="check-img">
        <img v-else src="@/assets/images/common/checked.png" class="check-img">
        <span class="red">我已认真阅读，并严格执行。请勾选同意。</span>
      </p>
    </div>
    <div class="common-bottom-button bottom-button-fixed">
      <!-- <span class="orangeBtn" @click="sign">签名</span> -->
      <span @click="commit">确认</span>
    </div>
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
      title: "运输合同",
      readFlagO: false,
      readFlagT: false,
      content: "",
      contents: "",
      nextPageStatus:""
    };
  },
  // created () {
  //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
  // },
  mounted() {
    this.getData();
  },
  methods: {
    readO() {
      this.readFlagO = !this.readFlagO;
    },
    readT() {
      this.readFlagT = !this.readFlagT;
    },
    sign() {
      this.$toast("请直接点击确认按钮");
    },
    commit() {
      if (this.readFlagO && this.readFlagT) {
        let pageStatuList = getCache("PageStatus");
        for (let k in pageStatuList) {
          if (this.nextPageStatus == k) {
            console.log(pageStatuList[k]);
            this.$router.replace({
              path: `/bigTruckDriver/${pageStatuList[k]}`
            });
          }
        }


        // this.$router.replace({
        //   path: "/bigTruckDriver/outFacMng"
        // });
      } else {
         window.instance ? window.instance.close() : "";
         window.instance = this.$toast("请确认你已经阅读并勾选！");
         native.callhandler("showVoice", "请确认你已经阅读并勾选！", data => {});
      }
    },
    getData() {
      let data = getCache("bigTruckDriverList").docId;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http.post("/getDeliveryContract", params).then(res => {
        this.$loading.close();
        let result = res.data;
        if (result.ret_code == 0) {
          this.contents = result.data.dataMap.hetong;
          this.content = result.data.dataMap.baoxian;
          this.nextPageStatus = result.data.nextPageStatus;
          setCache("pageIndex",this.nextPageStatus)
          //this.$toast(result.msg)
        }else{
            this.$toast(result.msg)
        }
      }).catch(res=>{
         // this.$toast("数据获取错误！")
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.common-content{
margin-bottom: .5rem;
}
.common-line-one-panel {
  p {
    height: inherit;
    padding-top: 0.13rem;
    padding-bottom: 0.13rem;
  }
}
.contract {
  text-indent: 2em;
  line-height: 2;
  @include normal-font();
}
.check-img {
  width: 0.15rem;
  height: 0.15rem;
  margin-left: 0.1rem;
}
.insurance {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  span {
    position: absolute;
    width: 0.5rem;
    border-top: 1px solid #ececec;
  }
  span:first-of-type {
    left: 0.8rem;
  }
  span:last-of-type {
    left: 2.4rem;
  }
  p {
    font-size: 0.2rem;
    @include normal-font();
    justify-content: center;
  }
}
</style>
