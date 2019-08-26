<template>
  <div class="common-page-flex">
    <ul class="common-content-box">
      <li class="common-content-title">
        <div @click.stop="allSelected" class="checked">
          <img v-if="isCheckedAll" src="@/assets/images/common/checked.png">
          <img v-else src="@/assets/images/common/check.png">
        </div>
        <div>装运单号</div>
        <div>车队</div>
        <div>客户数</div>
        <div>重量</div>
        <div>数量</div>
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
        
        <div>
          {{item.artName}}
        </div>
        <div @click="DeliveryBillClient(index)">
          <span class="redBtn">{{item.number}}</span>
        </div>
        <div >
           {{item.artName}}
        </div>
       <div @click="ShippingOrder(index)">
          <span class="redBtn">{{item.number}}</span>
        </div>
      </li>
       
    </ul>
    <div class="common-bottom-button">
      <span class="greenBtner">派单</span>
      <span class="orangeBtn" @click="DocumentSort">人工拼车</span>
       <span class="redBtner" >撤单</span>
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
    ShippingOrder(){
        this.$router.push({
          path: '/dispatchStatistician/billManagement/ShippingOrder',
         // query:{index: index}
        })
    },
    DeliveryBillClient(){
       this.$router.push({
            path:"/dispatchStatistician/billManagement/DeliveryBillClient",
        })
    },
    DocumentSort(){
      console.log(1234)
        this.$router.push({
          path: '/dispatchStatistician/billManagement/DocumentSort',
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
  width: 20%;
}
.common-content-box li .checked {
  width: 5%;
}
.common-bottom-button span{
  width:33.3%;
}
.greenBtner{
  background: #00B42A;
}
</style>
