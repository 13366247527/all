<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="common-content">
      <div class="common-line-one-panel contract">
        <p>运单信息</p>
        <div>
          <span class="leftFloat">送货单号</span>
          <div class="rightFloat">
            <span>{{dataList.docnum}}</span>
          </div>
        </div>
        <div>
          <span class="leftFloat">订单号</span>
          <div class="rightFloat">
            <span>{{dataList.deldocnum}}</span>
          </div>
          <div>
            <span class="leftFloat">装运单号</span>
            <div class="rightFloat">
              <span>{{dataList.tradocnum}}</span>
            </div>
          </div>
          <div>
            <span class="leftFloat">承运商</span>
            <div class="rightFloat">
              <span>{{dataList.vehgrpnam}}</span>
            </div>
          </div>
        </div>
        <div>
          <span class="leftFloat">送货日期</span>
          <div class="rightFloat">
            <span>{{dataList.deldat}}</span>
          </div>
        </div>
      </div>

      <!-- <div class="common-line-one-panel">
      <p @click="readO">
        <img v-if="!readFlagO" src="@/assets/images/common/check.png" class="check-img">
        <img v-else src="@/assets/images/common/checked.png" class="check-img">
        <span class="red">我已认真阅读，并严格执行。请勾选同意。</span>
      </p>
    </div>
    <div class="common-line-one-panel insurance">
      <span></span>
      <p>保险协议</p>
      <span></span>
      </div>-->
      <div class="common-line-one-panel contract">
        <p>客户信息</p>
        <div>
          <span class="leftFloat">客户名称</span>
          <div class="rightFloat">
            <span>{{dataList.outnam}}</span>
          </div>
        </div>
        <div>
          <span class="leftFloat">客户电话</span>
          <div class="rightFloat">
            <span>{{dataList.contel}}</span>
          </div>
        </div>
        <div>
          <span class="leftFloat">客户地址</span>
          <div class="rightFloat">
            <span>{{dataList.outadr}}</span>
          </div>
        </div>
      </div>

      <div class="common-line-one-panel contract">
        <p>货品信息</p>
        <div>
          <span class="leftFloat">货品名称</span>
          <div class="rightFloat">
            <span>{{dataList.artnam}}</span>
          </div>
          <div>
            <span class="leftFloat">货品数量(箱)</span>
            <div class="rightFloat">
              <span>{{dataList.shpartuni}}</span>
            </div>
          </div>
          <div>
            <span class="leftFloat">破损数量</span>
            <div class="rightFloat">
              <span>
                <b class="red">{{dataList.damnum}}</b>箱
                <b class="red">{{dataList. dambotnum}}</b> 件
              </span>
            </div>
          </div>
        </div>
        <div>
          <span class="leftFloat">货品总金额</span>
          <div class="rightFloat">
            <span>{{dataList.totalprice}}</span>
          </div>
        </div>
        <div>
          <span class="leftFloat">赔付金额</span>
          <div class="rightFloat">
            <span>
              <b class="red">￥{{dataList.damprice}}</b>
            </span>
          </div>
        </div>
        <div>
          <span class="leftFloat">货品状态</span>
          <div class="rightFloat">
            <span>{{dataList.artsta}}</span>
          </div>
        </div>
        <div>
          <span class="leftFloat">确认时间</span>
          <div class="rightFloat">
            <span>{{dataList.rcvshpdattim}}</span>
          </div>
        </div>
        <div class="bottom-h">
          <span class="leftFloat">破损照片</span>
          <div class="rightFloat">
            <span v-if="dataList.dampath" class="photo" @click="imgBig(totalPrice)">
              <img  :src="dataList.dampath">
            </span>
            <span v-else>无</span>
          </div>
        </div>
      </div>
      <!-- <div class="common-line-one-panel">
      <p @click="readT">
        <img v-if="!readFlagT" src="@/assets/images/common/check.png" class="check-img">
        <img v-else src="@/assets/images/common/checked.png" class="check-img">
        <span class="red">我已认真阅读，并严格执行。请勾选同意。</span>
      </p>
      </div>-->
      <!-- <div class="common-bottom-button bottom-button-fixed">
        <span @click="commit">确认</span>
      </div>-->
      <div class="mask" v-show="status==0" @click="imgHide">
        <img :src="dataList.dampath?dataList.dampath:totalPrice" alt>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";

export default {
  components: { HeaderDefault },
  data() {
    return {
      dataList: "",
      title: "货品详情",
      status: 1,
      readFlagO: false,
      readFlagT: false,
      content: "",
      contents: "",
      nextPageStatus: "",
      totalPrice:
        "http://img.logwsd.com/group1/M00/01/39/rBUAEF1Tbe6AM6QkAAEsRXxwhWM982.png"
    };
  },
  // created () {
  //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
  // },
  mounted() {
    this.getData();
  },
  methods: {
    commit() {
      this.$router.replace({
        path: "/bigTruckDriver/unload/order"
      });
    },
    imgBig(imgPath) {
      this.totalPrice = imgPath;
      this.status = 0;
    },
    imgHide() {
      this.status = 1;
    },
    getData() {
      //let data = getCache("bigTruckDriverList").docId;
      let id = this.$route.query.id;
      this.$loading.open();
      let params = {
        //   docId: data,
        id: id
      };
      this.$http.post("/getArticleDetail", params).then(res => {
        this.$loading.close();
        let result = res.data;
        if (result.ret_code == 0) {
          this.dataList = result.data;
          //this.$toast(result.msg)
        } else {
          //this.$toast(result.msg);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.common-content {
  background: #f1f1f0;
  padding: 0.1rem;
}
.common-line-one-panel {
  background: #fff;
  border-radius: 0.05rem;
  margin-bottom: 0.1rem;
  p {
    font-weight: 900;
    color: #333;
    font-size: 0.15rem;
  }
  .leftFloat {
    display: inline-block;
    width: 30%;
  }
  .rightFloat {
    // float: right;
    display: inline-block;
    width: 70%;
    text-align: right;
    vertical-align: middle;
    span {
      text-align: left;
      display: inline-block;
      line-height: 0.4rem;
    }
  }
  .bottom-h {
    padding-bottom: 0.1rem;
  }
  div {
    min-height: 0.4rem;
  }
}
.contract {
  // text-indent: 2em;
  line-height: 2;
  @include normal-font();
}
.check-img {
  width: 0.15rem;
  height: 0.15rem;
  margin-left: 0.1rem;
}
.insurance {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  span {
    position: absolute;
    width: 0.5rem;
    border-top: 1px solid #ececec;
  }
  span:first-of-type {
    left: 0.8rem;
  }
  span:last-of-type {
    left: 2.4rem;
  }
  p {
    font-size: 0.2rem;
    @include normal-font();
    justify-content: center;
  }
}
.photo {
  width: 0.85rem;
  height: 0.87rem;
  background: #e0e0e0;
  img {
    width: 100%;
    height: 100%;
    margin: 0;
  }
}
.mask {
  background: #f1f1f0;
  position: fixed;
  top: 0.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  img {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
