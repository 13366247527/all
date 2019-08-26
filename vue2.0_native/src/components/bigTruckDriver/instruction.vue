<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    
    <div class="common-line-one-panel">
      <p v-for="(item, index) in dataList" :key="index">
        <span>{{index + 1}}、</span>
        <span class="name">{{item}}</span>
      </p>
    </div>
    <div class="common-line-one-panel pdBot50">
      <p @click="read">
        <img v-if="!readFlag" src="@/assets/images/common/check.png" class="check-img">
        <img v-else src="@/assets/images/common/checked.png" class="check-img">
        <span class="red">我已认真阅读，并严格执行。请勾选同意。</span>
      </p>
    </div>
    <div class="common-bottom-button bottom-button-fixed">
      <!-- <span class="orangeBtn" @click="sign">签名</span> -->
      <span @click="toQueue">排队状态</span>
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
      title: "入场需知",
      readFlag: false,
      dataList: [],
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
    getData() {
      let data = getCache("bigTruckDriverList").docId;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http
        .post("/instructions", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;

          if (result.ret_code == 0) {
            this.nextPageStatus = result.data.nextPageStatus;
            setCache("pageIndex",this.nextPageStatus)
            this.dataList = result.data.dataMap;
            //   console.log(result.data.dataMap);
          }
        })
        .catch(res => {
          //this.$toast("数据获取错误！");
        });
    },
    read() {
      this.readFlag = !this.readFlag;
    },
    sign() {
      this.$toast("请直接点击排队状态");
    },
    toQueue() {
      if (this.readFlag) {
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
        //   path: "/bigTruckDriver/queue"
        // });
      } else {
         window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请确认你已经阅读过上列入厂需知，并勾选同意！");
        native.callhandler("showVoice", "请确认你已经阅读过上列入厂需知，并勾选同意！", data => {});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pdBot50 {
  padding-bottom: 0.5rem;
  .check-img {
    width: 0.15rem;
    height: 0.15rem;
    margin-left: 0.1rem;
  }
}

.common-line-one-panel {
  p {
    height: inherit;
    padding-top: 0.13rem;
    padding-bottom: 0.13rem;
  }
}
</style>
