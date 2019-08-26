<template>
  <div class="common-page-flex">
    <div class="commonTabDiv pd48">
      <ul class="commonTab">
        <li>
          <span>区域选择：</span>
          <p class="selectBox">
            <input class="red wid150" type="text" readonly v-model="dateDay">
            <img src="@/assets/images/common/selectIcon.png" alt>
          </p>
        </li>
         <li>
          <span>客户查询：</span>
          <p class="selectBox">
            <input class="red wid150" type="text" readonly v-model="dateDay">
            <img src="@/assets/images/common/selectIcon.png" alt>
          </p>
          
        </li>
      </ul>
    </div>
    <ul class="common-content-box">
      <li class="common-content-title">
        <div>客户</div>
        <div>评价</div>
        <div>赔偿</div>
        <div>卸货时效</div>
      </li>

      <li v-for="(item, index) in tempData" :key="index">
        <div >
          <span>{{item.number}} </span>
        </div>
        
        <div>
          <span class="orgBtn">评价</span>
        </div>
       <div>
          <span class="redBtn">赔偿</span>
        </div>
        <div>
          <span>{{item.number}} </span>
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
   
    
  </div>
</template>

<script>


export default {
  name: "aboutCar",
  data() {
    return {
      dateDay:"",
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
