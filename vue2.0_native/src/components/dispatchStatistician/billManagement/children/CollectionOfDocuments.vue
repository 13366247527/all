<template>
  <div class="common-page-flex">
    <ul class="common-content-box">
      <li class="common-content-title">
        <div @click.stop="allSelected" class="checked">
          <img v-if="isCheckedAll" src="@/assets/images/common/checked.png">
          <img v-else src="@/assets/images/common/check.png">
        </div>
        <div>送货单号</div>
        <div>客户</div>
        <div>重量</div>
        <div>状态</div>
      </li>

      <li v-for="(item, index) in tempData" :key="index">
        <div @click.stop="changeStatus(index)" class="checked">
          <img
            v-if="orderStatusLists.indexOf(index)>=0||isCheckedAll"
            src="@/assets/images/common/checked.png"
          >
          <img v-else src="@/assets/images/common/check.png">
        </div>
        <div>{{item.artName}}</div>
        
        <div @click.stop="toVehicleFilter(item.id)">
          <span >{{item.number}}</span>
        </div>
        <div @click="toTimeReselect(index,item.cpycod, item.delwhsnum, item.id)">
          <span >{{item.number}}</span>
        </div>
        
       
        <div v-if="item.code == 0" @click="overweight(index)">
            <span class="orgBtn">超重</span>
        </div>
        <div v-if="item.code == 1" @click="Shortage(index)">
            <span class="orgBtn">补重</span>
        </div>
        <div v-if="item.code == 2" @click="SlowDelivery(index)">
            <span class="greenBtn">缓送</span>
        </div>
        <div v-if="item.code == 3" @click="Supplement(index)">
            <span class="redBtn">补录</span>
        </div>
         <div v-if="item.code == 4" @click="SupplementWeight(index)">
            <span class="redBtn">缺货</span>
        </div>
      </li>
       
    </ul>
    <div class="common-bottom-button">
      <span class="orangeBtn" >客户信息</span>
        <span class="redBtner" >移单拼车</span>
        <span class="greenBtner" >来货信息</span>
    </div>
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
        this.getData1();
    },
  methods: {
    overweight(){
        this.$router.push({
          path: '/dispatchStatistician/billManagement/overweight',
         // query:{index: index}
        })
    },
    Shortage(){
       this.$router.push({
            path:"/dispatchStatistician/billManagement/Shortage",
        })
    },
    SlowDelivery(){
        this.$router.push({
          path: '/dispatchStatistician/billManagement/SlowDelivery',
         // query:{index: index}
        })
    },
    Supplement(){
        this.$router.push({
          path: '/dispatchStatistician/billManagement/Supplement',
         // query:{index: index}
        })
    },
    SupplementWeight(){
        this.$router.push({
          path: '/dispatchStatistician/billManagement/SupplementWeight',
         // query:{index: index}
        })
    },
    getData1(){
      //let data = this.$route.query;
     // data.timeStatus?this.tempData[data.index].number = data.timeStatus:''
    },
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

        // this.arrivalData.forEach((item, index) => {
        //   this.orderStatusLists.push(index);
        // });
      } else {
        this.orderStatusLists = [];
      }
    },
    getData(flag) {
      this.$http.post("/getAgencyDeliveryDoc", {}).then(res => {
        let result = res.data;
        if (result.ret_code == 0) {
          if (flag == 1) {
            this.$toast("刷新成功");
            this.$refs.loadmore.onTopLoaded();
          }
          this.$root.eventHub.$emit(
            "updateArrivalData",
            result.data.delAcceptList
          );
        }
      });
    },
    toVehicleFilter(){
       this.$router.push({
            path:"/common/FleetSelection",
        })
    },
    
    PaidPriceAdjustment(){
       this.$router.push({
            path:"/dispatchStatistician/loadingManagement/PaidPriceAdjustment",
        })

    },
    
    toDeliveryService(){
       this.$toast("派车装货");
    },
    loadTop() {
      //传1说明是下拉刷新
      this.getData(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.common-content-box {
  margin-bottom: 0.5rem;
}
.common-content-box li div {
  width: 25%;
}
.common-content-box li .checked {
  width: 5%;
}
.common-bottom-button span{
  width:33.3%;
}

</style>
