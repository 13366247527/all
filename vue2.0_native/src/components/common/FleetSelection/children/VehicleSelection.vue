<template>
  <div class="common-page-flex">
    <ul class="common-content-box">
      <li class="common-content-title">
        <div class="spacer">车号</div>
        <div>载重</div>
        <div></div>
        <div>车号</div>
        <div>载重</div>
      </li>

      <li
        v-for="(item, index) in tempData"
        :key="index"
        class="common-content-content"
        :class="index%2==0?'':'bgShu'"
      >
        <span @click.stop="changeStatus(index)" class="checked">
          <img v-if="timeStatus == index" src="@/assets/images/common/checked.png">
          <img v-else src="@/assets/images/common/check.png">
        </span>
        <div class="chehao">{{item.vehlicnum}}</div>
        <div v-if="item.wgtlim">{{item.wgtlim}}</div>
        <div v-else>0</div>

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
    <div class="common-bottom-button">
      <span class="redBtner" @click="DistributeLeaflets">派车</span>
    </div>
  </div>
</template>

<script>
import { setCache, getCache } from "@/config/utils";
export default {
  name: "carManage",
  data() {
    return {
      isCheckedAll: false,
      timeStatus: null,
      orderStatusLists: [],
      tempData: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let user = getCache("user");
      let params = {
        vehgrpnum: user.vehgrpnum
      };
      this.$http
        .get("/dispatcherStatist/contractVehicle", params)
        .then(res => {
          // console.log(res);
          this.tempData = res.data.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    back() {
      this.$router.go(-1);
    },
    changeStatus: function(index) {
      this.timeStatus = index;
      // let idIndex = this.orderStatusLists.indexOf(index);

      // if (idIndex >= 0) {
      //   this.orderStatusLists.splice(idIndex, 1);
      // } else {
      //   this.orderStatusLists.push(index);
      // }
    },
    DistributeLeaflets() {
      let id = this.$route.query.id;
      let vehnum = this.tempData[this.timeStatus].vehnum;
      let user = getCache("user");
      let params = {
        vehgrpnum: user.vehgrpnum,
        vehnum: vehnum,
        ids: id
      };
      this.$http
        .post("/dispatcherStatist/updateVehicle", params)
        .then(res => {
          this.$toast(res.data.msg);
          this.back();
        })
        .catch(res => {
         // this.$toast("数据获取错误！");
        });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
// .common-content-box {
//   margin-bottom: 0.5rem;
// }
.common-content-box .common-content-title div {
  width: 30%;
}
.common-content-box .checked {
  width: 10%;
  margin-left: 0.1rem;
}
.spacer {
  margin-left: 0.5rem;
}

.common-content-box .common-content-content {
  display: inline-block;
  width: 50%;
  height: 0.46rem;
  border-bottom: 1px solid #ececec;
}
// .common-content-box .common-content-content span {
//   display: inline-block;
//   height: .46rem;
//   text-align: center;
//   font-size: .16rem;
// }
.common-content-box .common-content-content div {
  display: inline-block;
  height: 0.46rem;
  text-align: center;
  font-size: 0.16rem;
  line-height: 0.46rem;
}
.common-content-box .common-content-content .chehao {
  display: inline-block;
  height: 0.46rem;
  width: 1rem;
  text-align: center;
  font-size: 0.16rem;
}
.bgShu {
  background: url(~@/assets/images/common/shu.png) no-repeat left;
  background-size: 1px 0.25rem;
}

.common-content-box .common-content-content span img {
  width: 0.15rem;
  height: 0.15rem;
  // margin: 0 .1rem 0 .1rem;
}

.commonTab li:first-of-type {
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
// .selectList{
//     width:50%;
// }
</style>
