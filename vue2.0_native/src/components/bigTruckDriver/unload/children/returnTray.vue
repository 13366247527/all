<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <ul class="common-content-box">
      <li class="common-content-title">
        <div>单号</div>
        <div>材质</div>
        <div>应收</div>
        <div>数量</div>
        <div>实收</div>
      </li>
      <li v-for="(item, index) in tempData" :key="index">
        <div>{{item.refdocnum}}</div>
        <div>{{item.palnam}}</div>
        <div>{{item.borqty}}</div>
        <div>{{item.borqty}}</div>
        <div>
          <input
            type="text"
            class="true"
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="item.rcvqty"
          >
        </div>
      </li>
    </ul>
    <div class="tabTitle black">还托盘数量</div>
    <ul class="common-content-box tray-content-box">
      <li class="common-content-title bgGray">
        <div>材质</div>
        <div>数量</div>
        <div>实收</div>
      </li>
      <li v-for="(item, index) in tempDatas" :key="index">
        <div>{{item.palName}}</div>
        <div>{{item.unReturnQty}}</div>
        <div>
          <input
            type="text"
            class="true"
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="item.rcvqty"
          >
        </div>
      </li>
    </ul>
    <div class="common-line-one-panel">
      <p>
        <span>托盘交回仓库：</span>
        <span class="red">{{warehouseName}}</span>
      </p>
    </div>
    <div class="common-line-one-panel padbot">
      <p>
        <span>收发货员：</span>
        <span class="red">{{personName}}</span>
      </p>
    </div>
    <div class="common-bottom-button bottom-button-fixed" @click="toLoadNav">收托盘确认</div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import SelectBox from "@/components/common/SelectBox";
import { setCache, getCache } from "@/config/utils";
import qs from "qs";
export default {
  components: { HeaderDefault, SelectBox },
  data() {
    return {
      title: "带托盘回厂",
      tempData: [],
      tempDatas: [],
      warehouseName: "",
      personName: "",
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
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      console.log(data);
      this.$loading.open();
      let params = {
        docId: data,
        fileName: "WhDeliveryDoc"
      };
      this.$http
        .post("/getPalletReturn", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          console.log(result.ret_code);
          if (result.ret_code == 0) {
            this.nextPageStatus = result.data.nextPageStatus;
            setCache("pageIndex",this.nextPageStatus)
            this.tempData = result.data.data.curPallts;
            this.tempDatas = result.data.data.unReturnPals;
            (this.warehouseName = result.data.data.warehouseName),
              (this.personName = result.data.data.personName);
          }
        })
        .catch(res => {
          // this.$toast("数据获取错误！");
        });
    },
    toLoadNav() {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      console.log(this.tempData);

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
        fileName: "WhDeliveryDoc",
        unReturnList: JSON.stringify(unReturnList),
        curReturnList: JSON.stringify(curReturnList)
      };
      this.$http
        .post("/setPalletReturn", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          console.log(result.ret_code);
          if (result.ret_code == 0) {
            let pageStatuList = getCache("PageStatus");
            console.log(this.nextPageStatus);
            for (let k in pageStatuList) {
              if (this.nextPageStatus == k) {
                console.log(pageStatuList[k]);
                // this.$router.replace({
                //   path: `/bigTruckDriver/${pageStatuList[k]}`
                // });
              }
            }
            this.$router.push({
              path: "/bigTruckDriver/loadNav"
            });
          }
        })
        .catch(res => {
          // this.$toast("数据获取错误！");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.common-content-box li div {
  width: 20%;
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
  margin: 0.1rem 0.16rem 0;
}

.tray {
  width: 1.35rem;
}

.padbot {
  padding-bottom: 0.5rem;
}
</style>
