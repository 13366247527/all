<template>
  <div class="common-page-flex">
    <ul class="common-content-box">
      <li class="common-content-title">
        <div @click.stop="allSelected" class="checked">
          <img v-if="isCheckedAll" src="@/assets/images/common/checked.png">
          <img v-else src="@/assets/images/common/check.png">
        </div>
        <div>单号</div>
        <div>车号</div>
        <div>到车</div>
        <div>重量</div>
      </li>

      <li v-for="(item, index) in tempData" :key="index">
        <div @click.stop="changeStatus(index)" class="checked">
          <img
            v-if="orderStatusLists.indexOf(index)>=0||isCheckedAll"
            src="@/assets/images/common/checked.png"
          >
          <img v-else src="@/assets/images/common/check.png">
        </div>
        <div >
          <span class="redBtn" @click="DetailedMap(index)">{{item.number}} </span>
        </div>
        
        <div @click.stop="toVehicleFilter(item.id)">
          <p class="selectBox wid90">
            <input class="red" type="text" readonly :value="item.bottlePrice" >
            <img src="@/assets/images/common/selectIcon.png" alt>
          </p>
        </div>
        <div @click="toTimeReselect(index,item.cpycod, item.delwhsnum, item.id)">
          <p class="selectBox wid60">
            <input class="red" type="text" readonly :value="item.number">
            <img src="@/assets/images/common/selectIcon.png" alt>
          </p>
        </div>
        <div @click="Detailed(index)">
          <span class="redBtn">{{item.number}} </span>
        </div>
       
        <!-- <div v-if="item.code == 0">
            <span class="green">完成</span>
        </div>
        <div v-if="item.code == 1" @click="toUploadPhoto(item)">
            <span class="orgBtn">卸货</span>
        </div>
        <div v-if="item.code == 2" @click="toCarPosition(item)">
            <span class="redBtn">在途</span>
        </div>
        <div v-if="item.code == 3">
            <span class="yellow">到达</span>
        </div>-->
      </li>
       
    </ul>
   
    <div class="common-bottom-button">
      <span class="redBtner" @click="toDeliveryService">退单</span>

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
    DetailedMap(index) {
      this.$router.push({
        path: "/common/CarPosition",
        query:{
          index:1
        }
      });
    },
    toTimeReselect(){
        this.$router.push({
          path: '/dispatchStatistician/sendCarWithTime/timeReselect',
         // query:{index: index}
        })
    },
    LoadSettingRouter(){
       this.$router.push({
            path:"/dispatchStatistician/sendCarWithTime/LoadSetting",
        })
    },
    Detailed(){
        this.$router.push({
          path: '/dispatchStatistician/sendCarWithTime/Detailed',
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
    toVehicleFilter(index){
       this.$router.push({
            path:"/common/FleetSelection",
            query:{
              index:1
            }
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
  margin-bottom: 0.5rem;
}
.common-content-box li div {
  width: 25%;
}
.common-content-box li .checked {
  width: 10%;
}
.common-bottom-button span{
  width:100%;
}

</style>
