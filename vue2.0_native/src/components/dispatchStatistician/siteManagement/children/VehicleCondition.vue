<template>
  <div class="common-page-flex">
    <ul class="common-content-box">
      <li class="common-content-title">
        <div>排队</div>
        <div>车号</div>
        <div>约到</div>
        <div>签到</div>
        <div>入场</div>
      </li>

      <li v-for="(item, index) in tempData" :key="index">
        <div>
          <span>{{index+1}}</span>
        </div>
    <div>
            <span v-if="item.code == 0" @click="UnloadingPhotos(index)" class="greenBtn wid80">{{item.artName}}</span>
            <span v-else-if="item.code == 1" @click="UnloadingPhotos(index)" class="greenBtn wid80">{{item.artName}}</span>
            <span v-else-if="item.code == 2" @click="UnloadingPhotos(index)" class="redBtn wid80">{{item.artName}}</span>
            <span v-else-if="item.code == 3" @click="UnloadingPhotos(index)" class="redBtn wid80">{{item.artName}}</span>
            <span v-else >{{item.artName}}</span>
        </div> <div>
          <span>{{item.artName}}</span>
        </div><div>
            <span v-if="item.code == 0" @click="StandardTest(index)" class="greenBtn wid60">{{item.number}}</span>
            <span v-else-if="item.code == 1" @click="StandardTest(index)" class="greenBtn wid60">{{item.number}}</span>
            <span v-else-if="item.code == 2" @click="StandardTest(index)" class="redBtn wid60">{{item.number}}</span>
            <span v-else-if="item.code == 3" @click="StandardTest(index)" class="redBtn wid60">{{item.number}}</span>
            <span v-else >{{item.number}}</span>
        </div><div>
            <span v-if="item.code == 0" @click="UnloadingPhotos(index)" class="greenBtn wid60">{{item.number}}</span>
            <span v-else-if="item.code == 1" @click="UnloadingPhotos(index)" class="greenBtn wid60">{{item.number}}</span>
            <span v-else-if="item.code == 2" @click="UnloadingPhotos(index)" class="redBtn wid60">{{item.number}}</span>
            <span v-else-if="item.code == 3" @click="UnloadingPhotos(index)" class="redBtn wid60">{{item.number}}</span>
            <span v-else >{{item.number}}</span>
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
    DetailedMap() {
      this.$router.push({
        path: "/common/CarPosition",
      });
    },
    StandardTest(){
      this.$router.push({
        path: "/dispatchStatistician/sendCarWithTime/StandardTest",
      });
    },
   UnloadingPhotos() {
      this.$router.push({
        path: "/dispatchStatistician/siteManagement/UnloadingPhotos",
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
  width: 22.5%;
}
.common-content-box li div:nth-child(1) {
  width: 10%;
}
.common-content-box li div:nth-child(2) {
  width: 25%;
}
.common-content-box li div:nth-child(3) {
  width: 20%;
}
.common-content-box li div span {
  display: inline-block;
}
.wid80{
  width:.8rem;
}
.wid60{
  width:.6rem;
}
</style>
