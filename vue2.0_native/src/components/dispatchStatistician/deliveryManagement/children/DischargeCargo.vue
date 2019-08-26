<template>
  <div class="common-page-flex">
    <ul class="common-content-box">
      <li class="common-content-title">
        <div @click.stop="allSelected" class="checked">
          <img v-if="isCheckedAll" src="@/assets/images/common/checked.png">
          <img v-else src="@/assets/images/common/check.png">
        </div>
        <div>车号</div>
        <div>单号</div>
        <div>客户</div>
        <div>超时</div>
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
        <div>{{item.number}}</div>
        <div>{{item.artName}}</div>
        <div>{{item.number}}</div>
        <div v-if="item.code == 0">
            <span class="green">完成</span>
        </div>
        <div v-if="item.code == 1" @click="UnloadingPhotoss(item)">
            <span class="orgBtn">卸货</span>
        </div>
        <div v-if="item.code == 2" @click="toCarPosition(item)">
            <span class="redBtn">在途</span>
        </div>
        <div v-if="item.code == 3">
            <span class="yellow">到达</span>
        </div>
      </li>
       
    </ul>
   
    <div class="common-bottom-button">
      <span class="redBtner">卸货设定</span>
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
   
    toCarPosition(index){
        this.$router.push({
         path: '/common/CarPosition',
        query:{index: index}
        })
    },
    UnloadingPhotoss(){
this.$router.push({
          path: '/dispatchStatistician/deliveryManagement/UnloadingPhotoss',
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
      console.log(this.orderStatusLists)
    },

    allSelected: function() {
      this.isCheckedAll = !this.isCheckedAll;

      if (this.isCheckedAll) {
        this.orderStatusLists = [];
        this.tempData.forEach((item, index) => {
          this.orderStatusLists.push(index);
        });
      } else {
        this.orderStatusLists = [];
      }
      console.log(this.orderStatusLists)
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
     OwnedVehicle(){
       this.$router.push({
            path:"/dispatchStatistician/sendCarWithTime/OwnedVehicle",
        })
    },
    
    PaidPriceAdjustment(){
       this.$router.push({
            path:"/dispatchStatistician/sendCarWithTime/PaidPriceAdjustment",
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
  margin-bottom: 0rem;
}
.common-content-box .common-content-title {
    background: #fff;
}
.wid60{
  width:.6rem;
}
.common-content-box li div:nth-child(1) {
  width: 5%;
}
.common-content-box li div:nth-child(2) {
  width: 25%;
}.common-content-box li div:nth-child(3) {
  width: 10%;
}.common-content-box li div:nth-child(4) {
  width: 25%;
}.common-content-box li div:nth-child(5) {
  width: 15%;
}.common-content-box li div:nth-child(6) {
  width: 15%;
}
.common-bottom-button span{
  width:50%;
}
.greenBtner{
  background: #00B42A;
}
</style>
