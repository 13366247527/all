<template>
  <div class="common-page-flex">
    <ul class="common-content-box">
      <li class="common-content-title">
        <div>单号</div>
        <div>车号</div>
        <div>客户</div>
        <div>状态</div>
      </li>

      <li v-for="(item, index) in tempData" :key="index">
        <div>
          <span>{{item.tradocnum}}</span>
        </div>
        <div>{{item.vehnum}}</div>
        <div>
          <span>{{item.outnam}}</span>
        </div>

        <div>
          <span v-if="item.mneprcsta == '1700'||item.mneprcsta == '1750'" @click="UnloadingPhotos(item.id)" :class="item.mneprcsta==1700?'red':'greenBtn'">{{item.buttonName}}</span>
          <span v-else-if="item.mneprcsta == '1800'||item.mneprcsta == '1850'||item.mneprcsta == '1900'" @click="UnloadingPhotos(item.id)" :class="item.mneprcsta==1800?'orange':'greenBtn'">{{item.buttonName}}</span>
          <span v-else-if="item.mneprcsta == '1600'" @click="DetailedMap(item.id)" class="redBtn">{{item.buttonName}}</span>
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
    this.getData();
  },
  methods: {
    DetailedMap(id) {
      this.$router.push({
        path: "/common/CarPosition",
        query:{
          id:id
        }
      });
    },
    UnloadingPhotos(id) {
      this.$router.push({
        path: "/vehicleDispatcher/deliveryManagement/UnloadingPhotos",
        query:{
          id:id
        }
      });
    },
    getData(flag) {
      this.$http.get("/shipment/vehicleStatus", {}).then(res => {
        let result = res.data;
        if (result.ret_code == 0) {
          console.log(result);
         this.tempData = result.data;
          if (flag == 1) {
            this.$toast("刷新成功");
            this.$refs.loadmore.onTopLoaded();
          }
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
  //margin-bottom: 0.5rem;
}
.common-content-box li div {
  width: 25%;
}
.common-content-box li div:nth-child(1) {
  width: 30%;
}
.common-content-box li div:nth-child(2) {
  width: 25%;
}
.common-content-box li div:nth-child(3) {
  width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  line-height: 0.48rem;
}
.common-content-box li div:nth-child(4) {
  width: 15%;
}

.common-content-box li div span {
  display: inline-block;
}
</style>
