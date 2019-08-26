<template>
  <div class="common-page-flex">
    <ul class="common-content-box">
      <li class="common-content-title">
        <div>装运单号</div>
        <div>车号</div>
        <div>客户</div>
        <div>状态</div>
      </li>

      <li v-for="(item, index) in tempData" :key="index">
        <div>
          <span>{{item.refdocnum}}</span>
        </div>
        <div>{{item.vehlicnum}}</div>
        <div>
          <span>{{item.deloutnam}}</span>
        </div>

        <div>
          <span
            v-if="item.mneprcstaName == '完成'"
            @click="DetailedD()"
            :class="item.picstate==0?'greenBtn':item.picstate==1?'redBtn':'orgBtn'"
          >完成</span>
          <span
            v-else-if="item.mneprcstaName == '装车'"
            @click="DetailedW(item.id,item.mobilenum)"
           :class="item.picstate==0?'greenBtn':item.picstate==1?'redBtn':'orgBtn'"
          >装车</span>
          <span
            v-else-if="item.mneprcstaName == '到位'"
            @click="DetailedD()"
           :class="item.picstate==0?'greenBtn':item.picstate==1?'redBtn':'orgBtn'"
          >到位</span>
          <span
            v-else-if="item.mneprcstaName == '出厂'"
            @click="DetailedC()"
            :class="item.picstate==0?'greenBtn':item.picstate==1?'redBtn':'orgBtn'"
          >出厂</span>
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
      isCheckedAll: false,
      orderStatusLists: [],
      tempData: [
        
      ]
    };
  },
  mounted() {
    this.siteManagementChe();
  },
  methods: {
    DetailedW(id, tel) {
      this.$router.push({
        path: "/vehicleDispatcher/loadingManagement/ProtectionSafety",
        query: {
          id: id,
          tel: tel
        }
      });
    },
    DetailedD() {
       this.$toast('开发中！')
      // this.$router.push({
      //   path: "/vehicleDispatcher/loadingManagement/CarArrester",
      //   query: {
      //     id: id,
      //     tel: tel
      //   }
      // });
    },
    DetailedC() {
      this.$toast('开发中！')
      // this.$router.push({
      //   path: "/vehicleDispatcher/loadingManagement/ViolationRecord",
      //   query: {
      //     id: id,
      //     tel: tel
      //   }
      // });
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
    siteManagementChe() {
      this.$http
        .get("/dispatcherStatist/siteManagement_che", {})
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
  width: 25%;
}
.common-content-box li div span {
  display: inline-block;
}
</style>
