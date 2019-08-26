<template>
  <div class="common-page-flex">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <ul class="common-content-box pdTop115">
        <li class="common-content-title">
          <div>送货单号</div>
          <div>车号</div>
          <div>数量</div>
          <div>重量</div>
          <div>状态</div>
        </li>
        <li v-for="(item, index) in acceptData" :key="index" @click="toReceipt(index)">
          <div>{{item.reftradocnum}}</div>
          <div>{{item.vehlicnum}}</div>
          <div>{{item.totqty}}</div>
          <div>{{item.totwgt}}</div>
          <div v-if="item.delCode == '0'">
            <span class="peddingBtn">收货</span>
          </div>
          <div v-else>
            <span class="peddingBtn green">收货中</span>
          </div>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>

//import { Loadmore } from 'mint-ui';

export default {
  data() {
    return {};
  },
  props: ["acceptData"],
  mounted() {},
  methods: {
    loadTop(){
      this.$http.post('/getAgencyDeliveryDoc',{}).then(res => {
        this.$toast('刷新成功')
        this.$refs.loadmore.onTopLoaded();
        let result = res.data;
        if(result.ret_code == 0){
          //this.acceptData = result.data.delCheckList;
          //把更新后的数据发送给父组件
          this.$root.eventHub.$emit('updateAcceptData', result.data.delCheckList)
        }
      })
    },
    toReceipt(index){
      this.$router.push({
        path: '/dealerReceipt/ReceiptConfirm',
        query: {
          dataList: this.acceptData[index].artDetails,
          cpycod: this.acceptData[index].cpycod,
          tranum: this.acceptData[index].tranum,
          tranumsuf: this.acceptData[index].tranumsuf,
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>

.common-content-box li div {
    width: 20%
}

.peddingBtn{
  @include peddingBtn(.52rem)
}
.green{
  background: $green;
}
</style>
