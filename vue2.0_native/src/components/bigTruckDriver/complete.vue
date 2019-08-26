<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>

    <div class="loadmoreCss">
      <div class="imgBox">
        <img :src="complete" class="img">
      </div>
      <p>托盘交货完成</p>
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
      title: "完成",
      nextPageStatus: "",
      complete: require("@/assets/images/common/duihao-2.png")
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    loadTop() {
      //传1说明是下拉刷新
      this.getData(1);
    },

    tabTop(ind) {
      this.tabInd = ind;
    },

    getData(flag) {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http.post("/getLoadArticle", params).then(res => {
        this.$loading.close();
        let result = res.data;
        this.$refs.loadmore.onTopLoaded();
        if (result.ret_code == 0) {
          if (flag == 1) {
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast("刷新成功");
          }
          this.nextPageStatus = result.data.nextPageStatus;
          setCache("pageIndex", this.nextPageStatus);
          this.dataObj = result.data;
          this.docStatus = result.data.deldocStatus;
          this.tempData = result.data.ArtckeList;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.loadmoreCss {
  position: absolute;
  top: 0.5rem;
  bottom: 0rem;
  right: 0;
  left: 0;
  background: #f6f7fc;
  .imgBox{
      width:1rem;
      height:.7rem;
      margin: 1.5rem auto .3rem auto;
      .img{
          width:100%;
          height:100%;
      }
  }
  p{
      font-size:.2rem;
font-family:PingFangSC-Medium;
font-weight:600;
color:rgba(244,45,59,1);
text-align: center;
  }
}
</style>
