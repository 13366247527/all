<template>
  <div class="common-page-flex">
    <ul class="common-content-box">
      <li class="common-content-title">
        <div class="number-on">排队</div>
        <div class="carNumber">车号</div>
        <div>约到</div>
        <div>签到</div>
        <div>入场</div>
      </li>

      <li v-for="(item, index) in tempData" :key="index">
        <div class="number-on">{{index+1}}</div>
        <div class="carNumber">
          <span
            v-if="item.picstate == '0'"
            @click="CompartmentPhotos(item.id,item.mobilenum)"
            class="greenBtn wid10"
          >{{item.vehlicnum}}</span>
          <span
            v-else-if="item.picstate == 1"
            @click="CompartmentPhotos(item.id,item.mobilenum)"
            class="redBtn wid10"
          >{{item.vehlicnum}}</span>
          <span
            v-else-if="item.picstate == 2"
            @click="CompartmentPhotos(item.id,item.mobilenum)"
            class="orgBtn wid10"
          >{{item.vehlicnum}}</span>
          <span v-else class="wid10">{{item.vehlicnum}}</span>
        </div>
        <div>{{item.plndellintim}}</div>
        <div>
          <span
            v-if="item.piccode == '0'"
            @click="StandardTest(item.id,item.mobilenum)"
            class="greenBtn"
          >{{item.signtim}}</span>
          <span
            v-else-if="item.piccode == 1"
            @click="StandardTest(item.id,item.mobilenum)"
            class="redBtn"
          >{{item.signtim}}</span>
          <span
            v-else-if="item.piccode == 2"
            @click="StandardTest(item.id,item.mobilenum)"
            class="orgBtn"
          >{{item.signtim}}</span>
          <span v-else>{{item.signtim}}</span>
        </div>
        <div>{{item.arvdeltim}}</div>
        <!-- <div>
            <span v-if="item.picstate == 0" @click="DetailedW(index)" class="greenBtn">完成</span>
            <span v-else-if="item.code == 1" @click="DetailedX(index)" class="orgBtn">卸货</span>
            <span v-else-if="item.code == 2" @click="DetailedZ(index)" class="redBtn">在途</span>
            <span v-else-if="item.code == 3" @click="DetailedD(index)" class="yellowBtn">到达</span>
            <span v-else >未知</span>
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
      isCheckedAll: false,
      orderStatusLists: [],
      tempData: [
       
      ]
    };
  },
  mounted() {
    this.vehicleManagementChe();
  },
  methods: {
    CompartmentPhotos(id,tel) {
      this.$router.push({
        path: "/vehicleDispatcher/loadingManagement/CompartmentPhotos",
        query:{
          id:id,
          tel:tel
        }
      });
    },
    StandardTest(id,tel) {
      this.$router.push({
        path: "/vehicleDispatcher/loadingManagement/StandardTest",
        query:{
          id:id,
          tel:tel
        }
      });
    },
    getData(flag) {
      this.$http
        .post("/dispatcherStatist/getAgencyDeliveryDoc", {})
        .then(res => {
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
    vehicleManagementChe() {
      this.$http
        .get("/dispatcherStatist/vehicleManagement_che", {})
        .then(res => {
          console.log(res);
          this.tempData = res.data.data;
          
        })
        .catch(res => {
          console.log(res);
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
.common-content-box {
  margin-bottom: 0.5rem;
}
.common-content-box li div {
  width: 20%;
}
.common-content-box li div span {
  display: inline-block;
}
.common-bottom-button span {
  width: 33.3%;
}
.wid10 {
  width: 1.2rem;
  display: inline-block;
}
.common-content-box li .carNumber {
  width: 25%;
}
.common-content-box li .number-on {
  width: 15%;
}
</style>
