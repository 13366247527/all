<template>
  <div>
    <header-default :title="title"></header-default>
    <mt-loadmore
      :top-method="loadTop"
      @top-status-change="handleTopChange"
      ref="loadmore"
      class="loadmoreCss"
    >
      <div class="shopTest">
        <ul>
          <li class="common-content-title">
            <div>车号</div>
            <div>单号</div>
            <div>数量(箱)</div>
            <div></div>
          </li>
          <li v-for="(item, index) in tempData" :key="index" class="tempData">
            <div>{{item.carNum}}</div>

            <div>
              <span>{{item.docNum}}</span>
            </div>
            <div>
              <span>{{item.box}}</span>
            </div>
            <div @click="changeNext(index)">
              <span>
                <img src="@/assets/images/common/next.png" class="leftimg">
              </span>
            </div>
          </li>
        </ul>
      </div>
      </mt-loadmore>
    <div class="total">
      <span>合计:</span>
      <span>{{spnum}}</span>
      <span>箱</span>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import native from "@/native/bridge.js";
export default {
  name: "intgoodTest",
  data() {
    return {
      title: "来货检验",
      tempData: [],
      spnum: 0 ,//合计
    };
  },
  components: {
    HeaderDefault
  },
  mounted() {
    this.getData();
    document.getElementsByClassName("mint-loadmore-content")[0].style.position='relative'
      document.getElementsByClassName("mint-loadmore-content")[0].style.top='0'
  },
  methods: {
    //跳转到详情页面
    changeNext(index) {
      let ids = this.tempData[index].ids;
      this.$router.push({
        path: "/pingkunMent/intgoodTestShow",
        query: {
          ids: ids,
        }
      });
    },
    //获取后台数据
    getData() {
      this.$loading.open();
      this.$http
        .post("wms/product/control/vehicle/list", {})
        .then(res => {
          console.log(res);
          this.$loading.close();
          if (res.data.ret_code == "0") {
            this.spnum = res.data.data.totalBox;
            this.tempData = res.data.data.list;
          }
        });
    },
     handleTopChange(status) {
      this.topStatus = status;
    },
    dispatchList(flag) {
       this.$http
        .post("wms/product/control/vehicle/list", {})
        .then(res => {
          console.log(res);
          this.$loading.close();
          if (res.data.ret_code == "0") {
            this.spnum = res.data.data.totalBox;
            this.tempData = res.data.data.list;
             if (flag == 1) {
              this.$toast("刷新成功");
              this.$refs.loadmore.onTopLoaded();
            }
          }
        });
       
    },
    loadTop() {
      //传1说明是下拉刷新
      this.dispatchList(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.loadmoreCss {
      position: absolute;
      top: 0rem;
      bottom: 0.05rem;
      right: 0;
      left: 0;
    }
.tabbarContainer {
  @include tabbar(3.43rem, 1.15rem);
}
.shopTest {
  padding: 10px 0.16rem;
  position: relative;
  height: 100%;
}
.shopTest ul {
  padding: 0.2rem 0rem;
  margin-bottom: 0.5rem;
  height: 100%;
}
.shopTest ul li {
  display: flex;
  align-items: center;
  font-size: 15px;
  padding: 0.15rem 0.09rem;
  border-bottom: solid 1px #d9d9d9;
}
.shopTest ul li img {
  width: 0.15rem;
  height: 0.15rem;
}
.shopTest li div {
  width: 30%;
  text-align: center;
}
.shopTest li div:last-child {
  width: 10%;
}
.shopTest ul .common-content-title {
  padding: 0.15rem 0.02rem;
  justify-content: space-between;
  color: #000000;
  font-weight: 600;
  border: none;
  background: #f1f1f0;
}

.shopTest .tempData {
  padding: 0.15rem 0.02rem;
  justify-content: space-between;
  align-items: center;
}
.tempData .leftimg {
  width: 0.12rem;
  height: 0.2rem;
}
.total {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
  color: #e31d2b;
  width: 100%;
  position: fixed;
  bottom: 0rem;
  left: 0rem;
  font-size: 15px;
  font-weight: 600;
  background: #ffffff;
  padding: 0.15rem 0.09rem 0.15rem 0.3rem;
}
.total span {
  display: block;
}
.total span:nth-of-type(2) {
  margin: 0 0.1rem;
}
</style>
<style>
 .mint-loadmore .mint-loadmore-top {
  position: static;
} 
</style>


