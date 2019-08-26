<template>
  <div class="common-page-flex">
    <div class="commonTabDiv pd48">
      <ul class="commonTab">
        <li>
          <span>批次号：</span>
            <input class="red wid150" type="text">
           <span class="redBtn offset">查询</span>
        </li>
         <li>
          <span>日期：</span>
            <input class="red wid150" type="text"  v-model="dateDay">
        </li>
        <li>
          <span>装运单号：</span>
            <input class="red wid150" type="text"  v-model="dateDay">
        </li>
        <li>
          <span>客户：</span>
            <input class="red wid100" type="text"  v-model="dateDay">
             <span>车号：</span>
            <input class="red wid100" type="text"  v-model="dateDay">
        </li>
         <li>
          <span>送达时间：</span>
            <input class="red wid150" type="text"  v-model="dateDay">
        </li>
         <li>
          <span>收货人：</span>
            <input class="red wid150" type="text"  v-model="dateDay">
        </li>
      </ul>
    </div>

    <ul class="common-content-box">
      <li class="common-content-title">
        <div>品名规格</div>
        <div>数量</div>
        <div>批次</div>
      </li>

      <li v-for="(item, index) in tempData" :key="index">
       
        <div>{{item.artName}}</div>
        <div>{{item.artName}}</div>
        
        <div>
          <span class="redBtn">{{item.number}} </span>
        </div>
     
      </li>
       
    </ul>
   
    <div class="common-bottom-button">
      <span class="redBtner">卸车照片</span>
    </div>
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
          path: '/dispatchStatistician/billManagement/ShippingOrder',
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
.redBtn{
  width:.4rem;
}
.wid60{
  width:.6rem;
}
.common-content-box li div{
  width: 33.3%;
}
.common-bottom-button span{
  width:100%;
}
.greenBtner{
  background: #00B42A;
}
.wid150{
  border:0;
}
.offset{
  margin-left:.3rem;
}
.wid100{
  width:1rem;
  border:0;
}
</style>
