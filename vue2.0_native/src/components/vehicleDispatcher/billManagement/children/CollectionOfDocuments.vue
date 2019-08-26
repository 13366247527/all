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
        <div>{{item.deldocnum}}</div>

        <div>
          <span>{{item.deloutnam}}</span>
        </div>
        <div>
          <span>{{item.totartwgt}}</span>
        </div>

        <div v-if="item.code == 1" @click="overweight(item)">
          <span class="orgBtn">超重</span>
        </div>
        <div v-if="item.code == 2" @click="Shortage(item)">
          <span class="orgBtn">补重</span>
        </div>
        <div v-if="item.code == 4" @click="SlowDelivery(item)">
          <span class="greenBtn">缓送</span>
        </div>
        <div v-if="item.code == 3" @click="Supplement(item)">
          <span class="redBtn">补录</span>
        </div>
        <!-- <div v-if="item.code == 4" @click="SupplementWeight(item)">
            <span class="redBtn">缺货</span>
        </div>-->
      </li>
    </ul>
    <div class="common-bottom-button">
      <span class="orangeBtn" @click="CustomerInformation">客户信息</span>
      <span class="redBtner" @click="MobileTyping">移单拼车</span>
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
      tempData: []
    };
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    overweight(item) {
      this.$router.push({
        path: "/vehicleDispatcher/billManagement/overweight",
        query: { item: item }
      });
    },
    Shortage(item) {
      this.$router.push({
        path: "/vehicleDispatcher/billManagement/Shortage",
        query: { item: item }
      });
    },
    SlowDelivery(item) {
      this.$router.push({
        path: "/vehicleDispatcher/billManagement/SlowDelivery",
        query: { item: item }
      });
    },
    Supplement(item) {
      this.$router.push({
        path: "/vehicleDispatcher/billManagement/Supplement",
        query: { item: item }
      });
    },
    SupplementWeight(item) {
      this.$router.push({
        path: "/vehicleDispatcher/billManagement/SupplementWeight",
        query: { item: item }
      });
    },
    getDatas() {
      this.$loading.open();
      //let data = this.$route.query;
      // data.timeStatus?this.tempData[data.index].number = data.timeStatus:''
      this.$http
        .get("/dispatcherStatist/badDelivery", {})
        .then(res => {
          this.$loading.close();

          console.log(res);
          this.tempData = res.data.data;
          if (this.tempData.length == 0) {
            this.$toast("暂无数据！");
          }
        })
        .catch(res => {
          console.log(res);
        });
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

        this.tempData.forEach((item, index) => {
          this.orderStatusLists.push(index);
        });
      } else {
        this.orderStatusLists = [];
      }
    },
    CustomerInformation() {
      if (this.orderStatusLists.length == 1) {
        let item = this.tempData[this.orderStatusLists[0]];
        this.$router.push({
          path: "/vehicleDispatcher/billManagement/Supplement",
          query: { item: item, info: 1 }
        });
      } else {
        this.$toast("请选择一条数据！");
      }
    },
    MobileTyping() {
      let statu = true;
      if (this.orderStatusLists.length == 0) {
        this.$toast("请先选择数据！");
      } else {
        let ids = [];
        try {
          this.orderStatusLists.forEach((item, index) => {
            if (this.tempData[item].code == 3) {
              this.$toast("状态为补录不可移单拼车！");
              statu = false;
              throw this.tempData[item].code;
            }
            ids.push(this.tempData[item].id);
          });
        } catch (e) {
         // console.log(e);
        }
        //console.log(ids)
        if (statu) {
          let params = {
            ids: ids.join(",")
          }
          this.$http
            .post("/dispatcherStatist/moveDelivery", params)
            .then(res => {
              let result = res.data;
              if (result.ret_code == 0) {
                this.$toast(result.msg);
                this.getDatas();
                this.orderStatusLists=[]
              }
            });
        }
      }
    },
    getData(flag) {
      // this.$http.post("/dispatcherStatist/moveDelivery", {}).then(res => {
      //   let result = res.data;
      //   if (result.ret_code == 0) {
      //     if (flag == 1) {
      //       this.$toast("刷新成功");
      //       this.$refs.loadmore.onTopLoaded();
      //     }
      //     this.$root.eventHub.$emit(
      //       "updateArrivalData",
      //       result.data.delAcceptList
      //     );
      //   }
      // });
    },
    toVehicleFilter() {
      this.$router.push({
        path: "/common/FleetSelection"
      });
    },

    PaidPriceAdjustment() {
      this.$router.push({
        path: "/vehicleDispatcher/loadingManagement/PaidPriceAdjustment"
      });
    },

    toDeliveryService() {
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
// .common-content-box {
//   // margin-bottom: 0.5rem;
// }
.common-content-box li div:nth-child(1) {
  width: 10%;
}
.common-content-box li div:nth-child(2) {
  width: 30%;
}
.common-content-box li div:nth-child(3) {
  width: 25%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  line-height: 0.48rem;
}
.common-content-box li div:nth-child(4) {
  width: 10%;
}
.common-content-box li div:nth-child(4) {
  width: 25%;
}

.common-content-box li .checked {
  width: 5%;
}
.common-bottom-button span {
  width: 50%;
}
</style>
