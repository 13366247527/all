<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tabTitle black">当车托盘交回</div>
    <ul class="common-content-box common-content-boxs">
      <li class="common-content-title bgGray">
        <div>车号</div>
        <div>材质</div>
        <div>应还</div>
        <div>数量</div>
        <div>差异</div>
      </li>
      <li v-for="(item, index) in tempData" :key="index">
        <div>{{item.vehlicnum}}</div>
        <div>{{item.palnam}}</div>
        <div>{{item.borqty}}</div>
        <div>
          <input
            type="text"
            class="true"
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="item.rcvqty"
          >
        </div>
        <div>{{item.quantity}}</div>
      </li>
    </ul>
    <div class="tabTitle black">还欠托盘</div>
    <ul class="common-content-box tray-content-box">
      <li class="common-content-title bgGray">
        <div>材质</div>
        <div>数量</div>
        <div>实收</div>
      </li>
      <li v-for="(item, index) in tempDatas" :key="index">
        <div>{{item.palName}}</div>
        <div>
          <input
            type="text"
            class="true red"
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="item.rcvqty"
          >
        </div>
        <div>{{item.unReturnQty}}</div>
      </li>
    </ul>
    <div class="common-line-one-panel padbot">
      <p>
        <span>收发货员确认状态：</span>
        <span class="red">未收</span>
      </p>
    </div>
    <div class="common-bottom-button bottom-button-fixed" @click="commit">交托盘确认</div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import { setCache, getCache } from "@/config/utils";
import qs from "qs";
import native from "@/native/bridge.js";

export default {
  components: { HeaderDefault },
  data() {
    return {
      title: "托盘交回",
      tempData: [],
      tempDatas: []
    };
  },
  // created () {
  //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
  // },
  mounted() {
    this.getData();
  },
  methods: {
    commit() {
      let data = getCache("bigTruckDriverList").docId;
      console.log(data);
      let unReturnList = [];
      let curReturnList = [];
      this.tempData.forEach((item, index) => {
        unReturnList.push({
          palNumber: item.palNumber,
          returnQty: item.returnQty,
          artnum: item.artnum
        });
      });
      this.tempDatas.forEach((item, index) => {
        curReturnList.push({
          palNumber: item.palNumber,
          returnQty: item.returnQty,
          artnum: item.artnum
        });
      });
      this.$loading.open();
      let params = {
        docId: data,
        fileName: "WhShipmentDoc",
        unReturnList: JSON.stringify(unReturnList),
        curReturnList: JSON.stringify(curReturnList)
      };
      this.$http
        .post("/setPalletReturn", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          console.log(result);
          if (result.ret_code == 0) {
            native.callhandler("showVoice", "送货已完成！");

            this.$toast("送货已完成！");
            setTimeout(() => {
              this.$router.replace({
                path: "/home"
              });
            }, 1500);
          }
        })
    },
    getData() {
      let data = getCache("bigTruckDriverList").docId;
      console.log(data);
      this.$loading.open();
      let params = {
        docId: data,
        fileName: "WhShipmentDoc"
      };
      this.$http
        .post("/getPalletReturn", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          console.log(result);
          if (result.ret_code == 0) {
            this.tempData = result.data.data.curPallts;
            this.tempDatas = result.data.data.unReturnPals;
            this.warehouseName = result.data.data.warehouseName;
          }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.common-content-box li div {
  width: 19%;
}
.common-content-boxs li div:nth-child(1) {
  width: 24%;
}

.tray-content-box li div {
  width: 33.3%;
}

.true {
  width: 0.62rem;
}

.tabTitle {
  height: 0.46rem;
  line-height: 0.46rem;
  text-align: center;
  font-size: 0.15rem;
}

.tray {
  width: 1.35rem;
}

.padbot {
  padding-bottom: 0.5rem;
}
</style>
