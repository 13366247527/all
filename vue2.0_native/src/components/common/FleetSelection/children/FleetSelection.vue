<template>
  <div class="common-page-flex">
    <div class="tab pageFlex">
      <div class="commonTabDiv pd48">
         <div class="text">暂无二级车队</div>
        <ul class="commonTab common-content-box">
         
          <div v-show="showCar==1">
            <li>
              <span>失约车队：
                <b>数据的农家阿瑟东</b>
              </span>
            </li>
            <li>
              <span>联系人：延安按</span>
              <span class="tel">电话：12345678902</span>
            </li>
          </div>

          <li
            class="selectList"
            v-for="(item, index) in dataList"
            @click.stop="changeTimeSelectStatus(index)"
            :key="item.id"
          >
            <template v-if="timeStatus == index">
              <img src="@/assets/images/common/checked.png" alt>
            </template>
            <template v-else>
              <img src="@/assets/images/common/check.png" alt>
            </template>
            <span>{{item.vehgrpnam}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="common-bottom-button bottom-button-fixed">派单</div>
  </div>
</template>

<script>
export default {
  name: "carManage",
  data() {
    return {
      showCar: "",
      dataList: [],
      timeStatus: null
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    changeTimeSelectStatus(index) {
      this.timeStatus = index;
    },
    getData() {
      this.$http
        .get("/dispatcherStatist/vehicleGroupsQuery", {})
        .then(res => {
          // console.log(res);
         // this.dataList = res.data.data;
        })
        .catch(res => {
          //this.$toast("数据获取错误！");
        });
      let data = this.$route.query.index;
      this.showCar = data;
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.common-content-box {
  padding-bottom: 0.5rem;
  overflow-y: scroll;
  display: flex;
  flex-flow: row wrap;
  font-size: 0.16rem;
  height: -webkit-fill-available;
  max-height: fit-content;
}
.common-content-box li {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  //justify-content:center;
  //padding-left:1rem;
  border-bottom: 1px solid #ececec;
}
.selectList {
  padding-left: 0.3rem;
}
b {
  color: red;
}
.tel {
  margin-left: 0.6rem;
}
.common-content-box li span {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 0.46rem;
  text-align: center;
  font-size: 0.16rem;
  word-break: break-all;
}

.commonTab img {
  width: 0.15rem;
  height: 0.15rem;
  margin: 0 0.1rem 0 0.1rem;
}

.commonTab li:first-of-type {
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.text{
  //color: #e31d2b;;
  text-align: center;
  position: absolute;
  top:40%;
  right:0;
  bottom:0;
  left:0;
  margin:auto;
  font-size: .2rem;
}
</style>
