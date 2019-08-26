<template>
  <div class="common-page-flex">
    <div class="commonTabDiv pd48">
        <ul class="commonTab">
          <li>
            <span>今天应发：</span>
            <input type="text" class="wid60 border red" readonly v-model="vehlicnum">
          </li>
          <li>
            <span>昨天未发：</span>
            <input type="text" class="redBtn" @click="Unissued"  readonly v-model="vehlicnum">
          </li>
          <li>
            <span>缺车数量：</span>
           
            <input  type="text" class="redBtn" @click="CarShortage"  readonly v-model="vehlicnum" >
            
          </li>
          <li>
            <span>采购来车：</span>
           
            <input  type="text" class="wid60 red border"  readonly v-model="vehlicnum" >
            
          </li>
        </ul>
      </div>
    <ul class="common-content-box">
      <li class="common-content-title">
        <div>车队</div>
        <div>车数</div>
        <div>已约</div>
        <div>未约</div>
        <div>占比</div>
      </li>

      <li v-for="(item, index) in tempData" :key="index">
        
        <div>
          <span class="redBtn" @click="CarPosition(index)">{{item.number}}</span>
        </div>
       <div>
          <span>{{item.number}}</span>
        </div>
       <div>
          <span>{{item.number}}</span>
        </div>
       <div>
          <span>{{item.number}}</span>
        </div>
       <div>
          <span>{{item.number}}</span>
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
      vehlicnum:123,
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
    Unissued(){
      this.$router.push({
          path: '/dispatchStatistician/sendCarWithTime/Unissued',
         // query:{index: index}
        })
    },
    CarShortage(){
      this.$router.push({
          path: '/dispatchStatistician/sendCarWithTime/CarShortage',
         // query:{index: index}
        })
    },
    CarPosition(index){
        this.$router.push({
         path: '/common/CarPosition',
        query:{index: index}
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
  width: 18%;
}
.common-content-box li div:nth-child(1) {
  width: 28%;
  .redBtn{
    width:1rem;
  }
}
.common-content-box .common-content-title {
  background: #eee;
}
.common-content-box li .checked {
  width: 5%;
}
.common-bottom-button span{
  width:100%;
}
.commonTabDiv{
  font-size: .16rem;
  padding: 0 .3rem;
  .border{
    border:0;
  }
  .commonTab li{
    width:50%;
    display: inline-block;
    padding:.06rem 0;
    border-bottom:1px solid #eee;
    p{
      display: inline-block;
    }
  }
}
</style>
