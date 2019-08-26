<template>
  <div class="common-page-flex">
    <div class="commonTabDiv pd48">
      <ul class="commonTab">
        <li>
          <span>日期查询：</span>
          <p class="selectBox">
            <input class="red wid150" type="text" readonly v-model="dateDay" @click="openPicker">
            <img src="@/assets/images/common/selectIcon.png" alt>
          </p>
          
          <mt-datetime-picker
          ref="picker"
            v-model="pickerVisible"
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleConfirm"
          ></mt-datetime-picker>
        </li>
      </ul>
    </div>
    <ul class="common-content-box">
      <li class="common-content-title">
        <div>车号</div>
        <div>路线</div>
        <div>里程</div>
        <div>轨迹</div>
      </li>

      <li v-for="(item, index) in tempData" :key="index">
       
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
          <span class="redBtn" @click="trajectory(index)">查看</span>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "aboutCar",
  data() {
    return {
      vehlicnum: 123,
      isCheckedAll: false,
      orderStatusLists: [],
      pickerVisible:'',
      dateDay:'',
      tempData: [
        
      ]
    };
  },
  mounted() {
    this.getData1();
  },
  methods: {
    toTimeReselect() {
      this.$router.push({
        path: "/dispatchStatistician/sendCarWithTime/timeReselect"
        // query:{index: index}
      });
    },
    LoadSettingRouter() {
      this.$router.push({
        path: "/dispatchStatistician/sendCarWithTime/LoadSetting"
      });
    },
    Detailed() {
      this.$router.push({
        path: "/dispatchStatistician/sendCarWithTime/Detailed"
        // query:{index: index}
      });
    },
    openPicker() {
        this.$refs.picker.open();

      },
    Unissued() {
      this.$router.push({
        path: "/dispatchStatistician/sendCarWithTime/Unissued"
        // query:{index: index}
      });
    },
    CarShortage() {
      this.$router.push({
        path: "/dispatchStatistician/sendCarWithTime/CarShortage"
        // query:{index: index}
      });
    },
    handleConfirm(value){
       var date = new Date(value);  
        this.dateDay=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() 
    },
    trajectory(index) {
      this.$router.push({
        path: "/common/trajectory",
        query: { index: index }
      });
    },
    getData1() {
      var date = new Date();  
      this.dateDay=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() 
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
    toVehicleFilter() {
      this.$router.push({
        path: "/common/FleetSelection",
        query: {
          index: 1
        }
      });
    },

    PaidPriceAdjustment() {
      this.$router.push({
        path: "/dispatchStatistician/sendCarWithTime/PaidPriceAdjustment"
      });
    },
    loadTop() {
      //传1说明是下拉刷新
      this.getData(1);
    }
  }
};
</script>

<style lang="scss">
.common-content-box {
  margin-bottom: 0.5rem;
}
.common-content-box li div {
  width: 25%;
}
.common-content-box li div:nth-child(1) {
  width: 28%;
  .redBtn {
    width: 1rem;
  }
}
.common-content-box .common-content-title {
  background: #eee;
}
.common-content-box li .checked {
  width: 5%;
}
.common-bottom-button span {
  width: 100%;
}
.wid150{
  width: 1.5rem;
}
.commonTabDiv {
  font-size: 0.16rem;
  padding: 0 0.3rem;
  .border {
    border: 0;
  }
  .commonTab li {
    width: 100%;
    display: inline-block;
    padding: .1rem 0 0.06rem 0;
    border-bottom: 1px solid #eee;
    p {
      display: inline-block;
    }
  }
}

.mint-datetime-confirm {
    right: 0;
}
</style>
