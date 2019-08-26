<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tab pageFlex">
      <div class="commonTabDiv pd48">
        <ul class="commonTab common-content-box">
          <li
            class="selectList"
            v-for="(item, index) in dataList"
            @click.stop="changeTimeSelectStatus(index)"
            :key="item.id"
            :class="index%3==0?'':'bgShu'"
          >
            <template v-if="timeStatus == index">
              <img src="@/assets/images/common/checked.png" alt>
            </template>
            <template v-else>
              <img src="@/assets/images/common/check.png" alt>
            </template>
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="common-bottom-button bottom-button-fixed" @click="toInstruction">确定</div>
  </div>
</template>

<script>
//import native from '@/native/bridge.js'
import HeaderDefault from "@/components/common/HeaderDefault";

export default {
  components: { HeaderDefault },
  name: "TimeReselect",
  data() {
    return {
      dataList: "",
      timeStatus: null,
      title: "选择到车时间"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.dataList = this.$route.query.data.split(",");
      this.dataList[this.dataList.length - 1] = this.dataList[
        this.dataList.length - 1
      ].split("]")[0];
      this.dataList[0] = this.dataList[0].split("[")[1];
    },
    changeTimeSelectStatus(index) {
      this.timeStatus = index;
    },
    toInstruction() {

      this.$router.replace({
        path: "/bigTruckDriver/onlineOrder",
        query: {
          index: this.dataList[this.timeStatus]
        }
      });
    },
    standardBig() {
      this.isBig = !this.isBig;
      this.standardFlag = false;
      this.bigImgUrl = require("@/assets/images/common/standard.jpg");
    }
  }
};
</script>

<style lang="scss" scoped>
.common-content-box {
  margin-bottom: 0.5rem;
  display: flex;
  flex-flow: row wrap;
  font-size: 0.16rem;
}
.common-content-box li {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 33.3%;
  border-bottom: 1px solid #ececec;
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
.commonTab .bgShu {
  background: url(~@/assets/images/common/shu.png) no-repeat left;
  background-size: 1px 0.25rem;
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
.selectList {
  width: 33.3%;
}
</style>
