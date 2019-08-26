<template>
  <div>
      <header-default :title="title"></header-default>
    <div class="common-page-flex">
      <ul class="common-content-box">
        <li class="common-content-title">
          <div>车号</div>
          <div>客户</div>
          <div>赔偿金额</div>
          <div>状态</div>
        </li>

        <li v-for="(item, index) in dataList" :key="index">
          <div>
            <span>{{item}}</span>
          </div>
          <div>
            <span>{{index}}</span>
          </div>
          <div>
            <span>{{index}}</span>
          </div>
          <div>
            <span v-if="index==1" class="redBtn">待处理</span>
            <span v-else class="green">已处理</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="common-bottom-button bottom-button-fixed">确定</div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
export default {
  name: "carManage",
  components: { HeaderDefault },
  data() {
    return {
      active: 0,
      photoTitle: "添加",
      title: "破损记录",
      dataList: ["12412","12412","12412","12412","12412","12412","12412"]
    };
  },
  methods: {
    Detail(index) {
      this.active = index;
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.common-page-flex{
    padding-bottom: .5rem;
    overflow-y: scroll;
}
.common-content-box {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  text-align: center;
}
.common-content-box button {
  background: rgb(247, 244, 244);
  border: 1px solid #ccc;
  border-radius: 0.05rem;
  padding: 0.02rem;
  font-size: 0.16rem;
  width: 0.8rem;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.common-content-li {
  border: 0;
  margin-top:.1rem;
  width:25%;

}
#act {
  background: red;
}

// .commonTab {
//   display: flex;
//   flex-flow: row wrap;
//   justify-content: space-around;
//   overflow-y: scroll;
//   font-size: 0.16rem;
//   position: fixed;
//   top:0;
//   bottom: .5rem;
// }

.commonTabtitle {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}
.common-content-box .common-content-title {
//  background: #eee;
  height:.4rem;
  margin-top:.1rem;
  font-weight: 900;
}

.common-content-box .common-content-title div {
  width: 33.3%;
  
}

.common-content-box div {
  width: 33.3%;
  height:.4rem;
  line-height: .4rem;
}
.commonTab li {
  padding: 0.1rem;
}
.redBtn {
width:.6rem;
}
</style>
