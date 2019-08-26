<template>
  <div>
    <header-default :title="title"></header-default>
    <div class="common-page-flex">
      <ul class="common-content-box">
        <li class="common-content-title">
          <div>排队</div>
          <div>车号</div>
          <div>约到</div>
          <div>签到</div>
          <div>入厂</div>
        </li>
        <li class="red">
          <div>{{dataLists.thiscount}}</div>
          <div>{{dataLists.this}}</div>
          <div>{{dataLists.thistime}}</div>
          <div>{{dataLists.signtim}}</div>
          <div>{{dataLists.arvtim}}</div>
        </li>
        <li v-for="(item, index) in dataList" :key="index">
          <div>{{item.count}}</div>
          <div>{{item.vehlicnum}}</div>
          <div>{{item.allotim}}</div>
          <div>{{item.signtim}}</div>
          <div>{{item.arvtim}}</div>
        </li>
      </ul>
      <div class="common-bottom-button bottom-button-fixed" @click="toFacNav">进入入厂导航</div>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";

export default {
  data() {
    return {
      title: "排队入厂",
      dataLists: {},
      dataList: [],
      nextPageStatus: "",
      thiscount: ""
    };
  },
  components: { HeaderDefault },
  mounted() {
    this.getData();
  },
  methods: {
    getData(flag) {
      let data = getCache("bigTruckDriverList").docId;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http.post("/getLineUpInfo", params).then(res => {
        this.$loading.close();
        let result = res.data;

        if (result.ret_code == 0) {
          this.nextPageStatus = result.data.nextPageStatus;
          setCache("pageIndex",this.nextPageStatus)
          this.dataLists = result.data.data;
          this.dataList = result.data.data.LineUpList;
        }
       
      });
    },
    toFacNav() {
      let data = getCache("bigTruckDriverList").docId;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http.post("/getLineUpInfo", params).then(res => {
        this.$loading.close();
        let result = res.data;

        if (result.ret_code == 0) {
          if (result.data.data.status === "0") {
            let pageStatuList = getCache("PageStatus");
            console.log(pageStatuList)
            console.log(this.nextPageStatus)

            for (let k in pageStatuList) {
              if (this.nextPageStatus == k) {
                this.$router.replace({
                  path: `/bigTruckDriver/${pageStatuList[k]}`
                });
              }
            }
          } else {
            native.callhandler(
              "showVoice",
              "暂无车位，请等待指派！"
            );
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast("暂无车位，请等待指派！");
          }
        }
      });

      // this.$router.replace({
      //   path: "/bigTruckDriver/intoFacNav"
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.common-content-box {
  padding-top: 0;
   margin-bottom: 50px;
  div {
    width: 50%;
  }
}
.common-content-box li div:nth-child(1) {
  width: 10%;
}
.common-content-box li div:nth-child(2) {
  width: 30%;
}
.common-content-box li div:nth-child(3) {
  width: 20%;
}
.common-content-box li div:nth-child(4) {
  width: 20%;
}
.common-content-box li div:nth-child(5) {
  width: 20%;
}
.peddingBtn {
  @include peddingBtn(0.62rem);
}
</style>
