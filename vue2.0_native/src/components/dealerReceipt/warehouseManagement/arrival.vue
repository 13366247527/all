<template>
  <div class="common-page-flex">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <ul class="common-content-box pdTop115">
        <li class="common-content-title">
          <div @click="allSelected" v-if="isCheckedAll">
            <img src="@/assets/images/common/checked.png">
          </div>
          <div @click="allSelected" v-else>
            <img src="@/assets/images/common/check.png">
          </div>
          <div>送货单号</div>
          <div>数量</div>
          <div>重量</div>
          <div>状态</div>
        </li>
        <li v-for="(item, index) in arrivalData" :key="index" @click="toDeliveryDetails(index)">
          <div @click.stop="changeStatus(index)">
              <img v-if="orderStatusLists.indexOf(index)>=0" src="@/assets/images/common/checked.png">
              <img v-else src="@/assets/images/common/check.png">
          </div>
          <div>{{item.reftradocnum}}</div>
          <div>
            <span class="weight">{{item.totqty}}</span>
          </div>
          <div>{{item.totwgt}}</div>
          <div class="green" v-if="item.delCode == '0'">来货</div>
          <div class="red" v-else-if="item.delCode == '1'">缓送</div>
          <div class="orange" v-else>到货</div>
        </li>
      </ul>
      <img :src="imgPath" class="imgs">
    </mt-loadmore>
    <div class="common-bottom-button">
        <span @click="delay('1')">缓送</span>
        <span @click="delay('0')" class="greenBtn">来货</span>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      orderStatusLists: [],
      isCheckedAll: false,
      imgPath: ''
    };
  },

  props: ["arrivalData"],

  mounted() {},
  watch: {
    orderStatusLists(val){
      if(val.length == this.arrivalData.length){
        this.isCheckedAll = true
      }else{
        this.isCheckedAll = false
      }
    }
  },
  methods: {
    changeStatus: function(index) {
      let idIndex = this.orderStatusLists.indexOf(index);

      if (idIndex >= 0) {
        this.orderStatusLists.splice(idIndex, 1);
      } else {
        this.orderStatusLists.push(index);
      }
    },

    allSelected: function() {
      this.isCheckedAll = !this.isCheckedAll;

      if (this.isCheckedAll) {
        this.orderStatusLists = [];

        this.arrivalData.forEach((item, index) => {
          this.orderStatusLists.push(index);
        });
      } else {
        this.orderStatusLists = [];
      }
    },
    getData(flag){
      this.$http.post('/getAgencyDeliveryDoc',{}).then(res => {
        let result = res.data;
        if(result.ret_code == 0){
          if(flag == 1){
            this.$toast('刷新成功')
            this.$refs.loadmore.onTopLoaded();
          }
          this.$root.eventHub.$emit('updateArrivalData', result.data.delAcceptList)
        }
      })
    },
    loadTop(){
        //传1说明是下拉刷新
        this.getData(1);
    },
    delay(index){
      let dataLength = this.orderStatusLists.length
      if (dataLength > 0) {
          let postArr = [];
          for (let i = 0; i < dataLength; i++) {
              postArr.push({
                  "cpycod": this.arrivalData[this.orderStatusLists[i]].cpycod,
                  "tranum": this.arrivalData[this.orderStatusLists[i]].tranum,
                  "tranumsuf": this.arrivalData[this.orderStatusLists[i]].tranumsuf
              })
          }
          let params = {
              delCode: index,
              deliveryList: postArr
          }
          this.$http.post('/setAgencyDelStatus', params).then(res => {
              if (res.data.ret_code == 0) {
                  this.$toast("修改成功");
                  this.getData();
              }else{
                  this.$toast(res.data.returnInfo);
              }
          })
      }
    },
    toDeliveryDetails(index){
      this.$router.push({
        path: '/dealerReceipt/deliveryDetails',
        query: {
          dataList: this.arrivalData[index].artDetails
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>

.common-content-box li div {
    width: 22%
}

.common-content-box li div:first-of-type {
    width: 12%
}

.weight{
  @include redPanel(.62rem)
}

</style>
