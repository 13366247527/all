<template>
  <div class="common-page-flex">
    <ul class="common-content-box">
      <li class="common-content-title">
        <div>车号</div>
        <div>原因</div>
        <div>扣分</div>
        <div>罚金</div>
      </li>

      <li v-for="(item, index) in tempData" :key="index">
        <div>
          <span>{{item.artName}}</span>
        </div>
        <div>{{item.number}}</div>
        <div>
          <span class="red">{{item.number}}</span>
        </div>
    
        <div>
            <span v-if="item.code == 0" class="redBtn" @click="ViolationRecord(index)">罚款</span>
            <span v-else  class="grayBtn">罚款</span>
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
    
   ViolationRecord(index) {
      this.$router.push({
        path: "/dispatchStatistician/sendCarWithTime/ViolationRecord",
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
