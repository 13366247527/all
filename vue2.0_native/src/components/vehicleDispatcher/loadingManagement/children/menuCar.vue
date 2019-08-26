<template>
  <div class="common-page-flex">
<mt-loadmore :top-method="loadTop"  @top-status-change="handleTopChange" ref="loadmore">

    <ul class="common-content-box">
      <li class="common-content-title">
        <div @click.stop="allSelected" class="checked">
          <img v-if="isCheckedAll" src="@/assets/images/common/checked.png">
          <img v-else src="@/assets/images/common/check.png">
        </div>
        <div>装运单号</div>
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
        <div>
          <span class="redBtn wid90" @click="CarPosition(item.id)">{{item.refdocnum}}</span>
        </div>
        <div @click.stop="toVehicleFilter(item.id)">
          <p class="selectBox wid95">
            <input class="red" type="text" readonly :value="item.vehlicnum">
            <img src="@/assets/images/common/selectIcon.png" alt>
          </p>
        </div>
        <div @click="toTimeReselect(item.id,index)">
          <p class="selectBox wid70">
            <input class="red" type="text" readonly :value="item.plndellintim">
            <img src="@/assets/images/common/selectIcon.png" alt>
          </p>
        </div>
        <div @click="Detailed(item.id)">
          <span class="redBtn wid50">{{item.totartwgt}}</span>
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
    </mt-loadmore>
    <div class="common-bottom-button">
      <span class="orangeBtn" @click="LoadSettingRouter">退单</span>
    </div>
  </div>
</template>

<script>
import { setCache, getCache } from "@/config/utils";

export default {
  name: "aboutCar",
  inject:['reload'],
  data() {
    return {
      isCheckedAll: false,
      orderStatusLists: [],
      tempData: []
    };
  },
  mounted() {
    this.getData1();
    this.contractedCar();
  },
  methods: {
    toTimeReselect(id, index) {
      
      this.$router.push({
        path: "/vehicleDispatcher/loadingManagement/timeReselect",
        query: { id: id, index: index }
      });
    },
    LoadSettingRouter() {
      if(this.orderStatusLists.length==0){
         this.$toast("请先选择数据！");
      }else{
      let ids = [];
      this.orderStatusLists.forEach((item, index) => {
        ids.push(this.tempData[item].id + "");
      });
      let params = {
        ids: ids.join(","),
        mneprcstaType: 2
      };
      //console.log(params);
      this.$http
        .post("/dispatcherStatist/updateMneprcsta", params)
        .then(res => {
         // console.log(res);
          this.$toast(res.data.msg);
          this.contractedCar();
          this.reload();
          
        })
        .catch(res => {
          console.log(res);
        });
 }
      //  this.$router.push({
      //       path:"/vehicleDispatcher/loadingManagement/LoadSetting",
      //   })
    },
    Detailed(id) {
      this.$router.push({
        path: "/vehicleDispatcher/loadingManagement/Detailed",
        query: { id: id }
      });
    },
    CarPosition(id) {
      let params = {
        id: id
      };
      this.$http
        .get("/dispatcherStatist/vehicleLocation", params)
        .then(res => {
          console.log(res.data.data);
          let pos = res.data.data;
          this.$router.push({
            path: "/common/CarPosition",
            query: { data: pos }
          });
        })
        .catch(res => {
          console.log(res);
        });
    },
    getData1() {
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

        this.tempData.forEach((item, index) => {
          this.orderStatusLists.push(index);
        });
      } else {
        this.orderStatusLists = [];
      }
    },
    getData(flag) {
      this.$http.post("/dispatcherStatist/getAgencyDeliveryDoc", {}).then(res => {
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
    toVehicleFilter(id) {
      setCache("CarId",id)
      this.$router.push({
        path: "/common/FleetSelection/VehicleSelection",
        query: {
          id: id
        }
      });
    },

    PaidPriceAdjustment() {
      this.$router.push({
        path: "/vehicleDispatcher/loadingManagement/PaidPriceAdjustment"
      });
    },
    contractedCar(flag) {
      this.$http
        .get("/dispatcherStatist/contractedCar", {})
        .then(res => {
           if (flag == 1) {
              this.$toast("刷新成功");
              this.$refs.loadmore.onTopLoaded();
            }
          this.tempData = res.data.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    loadTop() {
      //传1说明是下拉刷新
       this.contractedCar(1);
    }
  }
};
</script>

<style lang="scss" scoped>
// .common-content-box {
//   // margin-bottom: 0.5rem;
// }
.common-content-box li div {
  width: 25%;
  font-size: 0.15rem;
}
.common-content-box li .checked {
  width: 5%;
}

.common-content-box li div:nth-child(2) {
  width: 30%;
}
.common-content-box li div:nth-child(3) {
  width: 30%;
}
.common-content-box li div:nth-child(4) {
  width: 25%;
}
.common-content-box li div:nth-child(5) {
  width: 15%;
}
.common-bottom-button span {
  width: 100%;
}

.wid40 {
  width: 0.4rem;
}
</style>
