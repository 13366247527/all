<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="common-line-one-panel">
          <p>
              <span>收货仓库：</span>
              <select-box class="wid156"></select-box>
          </p>
          <span class="peddingBtn">确认</span>
        </div>
        <div class="common-line-one-panel">
          <p>
              <span>收货人：</span>
              <select-box class="wid156"></select-box>
          </p>
          <span class="peddingBtn">确认</span>
        </div>
        <ul class="common-content-box">
            <li class="common-content-title bgGray">
                <div>材质</div>
                <div>实收数量</div>
                <div>状态</div>
            </li>
            <li v-for="(item, index) in tempData" :key="index">
                <div>{{item.artName}}</div>
                <div>
                    <input type="text" class="wid62">
                </div>
                <div>{{item.bottlePrice}}</div>
            </li>
        </ul>
      <div class="common-bottom-button">收托盘确认</div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
import SelectBox from "@/components/common/SelectBox"
import { setCache, getCache } from "@/config/utils";

export default {
  components: { HeaderDefault, SelectBox },
  data() {
    return {
      title: '还回托盘'
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
      getData() {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      //console.log(data);
      this.$loading.open();
      let params = {
        docId: data,
        fileName:"WhDeliveryDoc"
      };
      this.$http
        .post("/getPalletReturn", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          console.log(result);
          if (result.ret_code == 0) {
            this.dataObj = result.data.data;
          }
        })
        .catch(res => {
          //this.$toast("数据获取错误！");
        });
    },
    toChangeTirePosition(){
      this.$router.push({
        path: '/bigTruckDriver/changeTirePosition',
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.common-page-flex{
    height: 100vh;
}

.common-content-box li div{
    width: 33.3%;
}

.common-line-one-panel{
    position: relative;
    p{
        span:first-of-type{
            min-width: .75rem;
        }
    }
    .peddingBtn{
        @include peddingBtn(.62rem);
        position: absolute;
        right: .27rem;
        top: 0;
        bottom: 0;
        margin: auto 0;
    }
}

.wid156{
  width: 1.56rem;
}

.wid62{
    width: .62rem;
}

</style>
