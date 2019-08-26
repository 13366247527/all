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
          <span>{{item.artName}}</span>
        </div>
        <div>{{item.number}}</div>
        <div>
          <span>{{item.number}}</span>
        </div>
    
        <div>
            <span v-if="item.code == 0" class="greenBtn" @click="ProtectionSafety(index)">完成</span>
            <span v-else-if="item.code == 1" @click="CarArrester()" class="redBtn">到位</span>
            <span v-else-if="item.code == 2" class="orgBtn">出厂</span>
            <span v-else-if="item.code == 3" class="orgBtn">装车</span>
            <span v-else >未知</span>
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
   
  },
  methods: {
   CarArrester() {
      this.$router.push({
        path: "/dispatchStatistician/sendCarWithTime/CarArrester",
      });
    },
    ProtectionSafety(){
this.$router.push({
        path: "/dispatchStatistician/sendCarWithTime/ProtectionSafety",
      });
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
