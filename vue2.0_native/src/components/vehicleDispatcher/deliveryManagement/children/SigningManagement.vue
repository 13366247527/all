<template>
  <div class="common-page-flex">
    <ul class="common-content-box">
      <li class="common-content-title">
        <div>装运单号</div>
        <div>车号</div>
        <div>客户</div>
        <div>状态</div>
      </li>

      <li v-for="(item, index) in tempData" :key="index">
        <div>
          <span>{{item.tradocnum}}</span>
        </div>
        <div>{{item.vehnum}}</div>
        <div>
          <span>{{item.outnam}}</span>
        </div>
    
        <div>
            <span v-if="item.mneprcsta == '2000'||item.mneprcsta == '2010'" :class="item.mneprcsta=='2000'?'red':'green'">{{item.buttonName}}</span>
            <span v-else-if="item.mneprcsta == '2100'" @click="BeDamaged(index)" class="red">{{item.buttonName}}</span>
            <span v-else-if="item.mneprcsta == '2200'" class="green">{{item.buttonName}}</span>
            <span v-else-if="item.mneprcsta == '2300'||item.mneprcsta == '2400'||item.mneprcsta == '2500'" class="red">{{item.buttonName}}</span>
            <span v-else-if="item.mneprcsta == '2600'" class="green">{{item.buttonName}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "aboutCar",
  data() {
    return {
      isCheckedAll: false,
      orderStatusLists: [],
      tempData: [
        
      ]
    };
  },
  mounted() {
   this.getData()
  },
  methods: {
    // BeDamaged(index) {
    //   this.$router.push({
    //     path: "/vehicleDispatcher/deliveryManagement/BeDamaged",
    //   });
    // },
   BeDamaged(index) {
      this.$router.push({
        path: "/vehicleDispatcher/deliveryManagement/BeDamaged",
      });
    },
    getData(flag) {
      this.$http.get("/shipment/deliveryDamageHandle", {}).then(res => {
        let result = res.data;
        console.log(result)
        if (result.ret_code == 0) {
          this.tempData = result.data
          if (flag == 1) {
            this.$toast("刷新成功");
            this.$refs.loadmore.onTopLoaded();
          }
         
        }
      });
    },
    loadTop() {
      //传1说明是下拉刷新
      this.getData(1);
    }
  }
};
</script>

<style lang="scss" scoped>
// .common-content-box {
//  // margin-bottom: 0.5rem;
// }
.common-content-box li div {
  width: 25%;
}
.common-content-box li div:nth-child(1) {
  width: 30%;
}
.common-content-box li div:nth-child(2) {
  width: 25%;
}
.common-content-box li div:nth-child(3) {
  width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  line-height: 0.48rem;
}
.common-content-box li div:nth-child(4) {
  width: 15%;
}
.common-content-box li div span {
  display: inline-block;
}
</style>
