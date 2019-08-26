<template>
  <div class="common-page-flex">
    <div class="commonTabDiv pd48">
        <ul class="commonTab">
          <li>
            <span>车数：</span>
            <input type="text" class="wid60 border red" v-model="vehlicnum">
          </li>
          <li>
            <span>重量：</span>
            <input type="text" class="wid60 border red" v-model="vehlicnum">
          </li>
          <li>
            <span>车号：</span>
            <p class="selectBox wid90">
            <input  type="text" class="wid90 red" @click="toVehicleFilter" readonly v-model="vehlicnum" >
            <img src="@/assets/images/common/selectIcon.png" alt>
            </p>
          </li>
          <li>
            <span>到车：</span>
            <p class="selectBox wid60">
            <input  type="text" class="wid90 red" @click="toTimeReselect" readonly v-model="vehlicnum" >
            <img src="@/assets/images/common/selectIcon.png" alt>
            </p>
          </li>
        </ul>
      </div>
    <ul class="common-content-box">
      <li class="common-content-title">
        <div @click.stop="allSelected" class="checked">
          <img v-if="isCheckedAll" src="@/assets/images/common/checked.png">
          <img v-else src="@/assets/images/common/check.png">
        </div>
        <div>装运单号</div>
        <div>客户</div>
        <div>重量</div>
        <div>客户数</div>
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
        
        <div>{{item.artName}}</div>
       <div>{{item.artName}}</div>
        <div>{{item.artName}}</div>
       
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
      <span class="redBtner" @click="toDeliveryService">派单</span>
      <span class="orangeBtn" @click="LoadSettingRouter">缓送</span>
      <span class="greenBtner" @click="AlreadySent">已派</span>
    </div>
  </div>
</template>

<script>


export default {
  name: "aboutCar",
  data() {
    return {
      vehlicnum:"30吨",
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
        this.$toast("未开发！");
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
    toVehicleFilter(){
       this.$router.push({
            path:"/common/FleetSelection",
            query:{
              index:1
            }
        })
    },
    
    AlreadySent(){
       this.$router.push({
            path:"/dispatchStatistician/sendCarWithTime/AlreadySent",
        })

    },
    
    toDeliveryService(){
       this.$toast("未开发！");
    },
    loadTop() {
      //传1说明是下拉刷新
      this.getData(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.commonTabDiv{
  font-size: .16rem;
  padding:0.05rem .3rem 0 .3rem;
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
.common-content-box {
  margin-bottom: 0.5rem;
}
.common-content-box li div {
  width: 22.5%;
}
.common-content-box li .checked {
  width: 10%;
}
.common-bottom-button span{
  width:33.3%;
}
.common-content-box .common-content-title {
  background: #eee;
}
.greenBtner{
  background: #FEBA02;
}
</style>
