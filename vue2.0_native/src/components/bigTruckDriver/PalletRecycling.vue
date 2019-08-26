<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>

    <mt-loadmore :top-method="loadTop" ref="loadmore" :autoFill="false" class="loadmoreCss">
      <div class="taskTop">
        <div class="name">
          客户名称：
          <b>{{"北京物美超市"}}</b>
          <span>
            客户数量：
            <b>{{1}}/</b>
            <span>{{3}}</span>
          </span>
        </div>
        <div class="addr">
          客户地址：
          <b class="address">{{"北京北京北京北京北京北京北京京北北京北京北京北京北京"}}</b>
        </div>
      </div>

      <ul class="common-content-boxs" v-if="tabInd==0">
        <li>
          <div>
            托盘名称：
            <b class="name">{{"天津集保木"}}</b>
          </div>
          <div class="bor_bottom">
            应收数量：
            <b class="num">{{99}}</b>
            <b>块</b>
            <span>
              实收数量:
              <input type="text" class="inpit_num" oninput="value=value.replace(/[^\d]/g,'')">
              <b>块</b>
            </span>
          </div>
          <div class="butt">
            <button class="photoBtn">
              <img :src="photo" class="photo">
              拍照上传
            </button>
            <button v-if="true">确定</button>
            <button v-else>装货导航</button>
          </div>
        </li>
        <li>
          <div>
            托盘名称：
            <b class="name">{{"天津集保木"}}</b>
          </div>
          <div class="bor_bottom">
            应收数量：
            <b class="num">{{99}}</b>
            <b>块</b>
            <span>
              实收数量:
              <input type="text" class="inpit_num" oninput="value=value.replace(/[^\d]/g,'')">
              <b>块</b>
            </span>
          </div>
          <div class="butt">
            <button class="photoBtn">
              <img :src="photo" class="photo">
              拍照上传
            </button>
            <button v-if="true">确定</button>
            <button v-else>装货导航</button>
          </div>
        </li>
        <li>
          <div>
            托盘名称：
            <b class="name">{{"天津集保木"}}</b>
          </div>
          <div class="bor_bottom">
            应收数量：
            <b class="num">{{99}}</b>
            <b>块</b>
            <span>
              实收数量:
              <input type="text" class="inpit_num" oninput="value=value.replace(/[^\d]/g,'')">
              <b>块</b>
            </span>
          </div>
          <div class="butt">
            <button class="photoBtn">
              <img :src="photo" class="photo">
              拍照上传
            </button>
            <button v-if="true">确定</button>
            <button v-else>装货导航</button>
          </div>
        </li>
        <li>
          <div>
            托盘名称：
            <b class="name">{{"天津集保木"}}</b>
          </div>
          <div class="bor_bottom">
            应收数量：
            <b class="num">{{99}}</b>
            <b>块</b>
            <span>
              实收数量:
              <input type="text" class="inpit_num" oninput="value=value.replace(/[^\d]/g,'')">
              <b>块</b>
            </span>
          </div>
          <div class="butt">
            <button class="photoBtn">
              <img :src="photo" class="photo">
              拍照上传
            </button>
            <button v-if="true">确定</button>
            <button v-else>装货导航</button>
          </div>
        </li>
      </ul>
    </mt-loadmore>

    <div class="common-bottom-button bottom-button-fixed">
      <div v-if="stopFlag">选择客户</div>
      <div v-else>暂停作业</div>
      <div v-if="stopFlag">继续作业</div>
      <div v-else>
        <img :src="daohangImg" class="img_HF">
        回厂卸货导航
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
      title: "托盘回收",
      tabInd: 0,
      stopFlag: false,
      tempData: [
        // {
        //   articleName: "果粒橙/1.25L*12",
        //   articleNumber: 132,
        //   articleWeight: 2112,
        //   artnum: "1102165102",
        //   floorNumber: 0,
        //   id: "201953492303738103",
        //   palletNumber: 0,
        //   status: "1",
        //   unitNumber: 132
        // },{
        //   articleName: "果粒橙/1.25L*12",
        //   articleNumber: 132,
        //   articleWeight: 2112,
        //   artnum: "1102165102",
        //   floorNumber: 0,
        //   id: "201953492303738103",
        //   palletNumber: 0,
        //   status: "1",
        //   unitNumber: 132
        // },{
        //   articleName: "果粒橙/1.25L*12",
        //   articleNumber: 132,
        //   articleWeight: 2112,
        //   artnum: "1102165102",
        //   floorNumber: 0,
        //   id: "201953492303738103",
        //   palletNumber: 0,
        //   status: "1",
        //   unitNumber: 132
        // }
      ],
      nextPageStatus: "",
      daohangImg: require("@/assets/images/common/daohang大.png"),
      photo: require("@/assets/images/common/photo.png")
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    loadTop() {
      //传1说明是下拉刷新
      this.getData(1);
    },

    tabTop(ind) {
      this.tabInd = ind;
    },

    getData(flag) {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http.post("/getLoadArticle", params).then(res => {
        this.$loading.close();
        let result = res.data;
        this.$refs.loadmore.onTopLoaded();
        if (result.ret_code == 0) {
          if (flag == 1) {
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast("刷新成功");
          }
          this.nextPageStatus = result.data.nextPageStatus;
          setCache("pageIndex", this.nextPageStatus);
          this.dataObj = result.data;
          this.docStatus = result.data.deldocStatus;
          this.tempData = result.data.ArtckeList;
        }
      });
    },

    toServiceComment() {
      this.$router.replace({
        path: "/bigTruckDriver/serviceComment"
      });
    },

    toContract() {
      native.callhandler("showVoice", "请将阻车器收好");
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.$loading.open();
      let params = {
        docId: data,
        statecls: "Zcwc",
        statetyp: "Zhys",
        tableName: "WhDeliveryDoc",
        artnum: ""
      };
      this.$http.post("/setTransState", params).then(res => {
        this.$loading.close();
        let result = res.data;
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast(result.msg);
        console.log(this.nextPageStatus);
        if (result.ret_code == 0) {
          let pageStatuList = getCache("PageStatus");
          for (let k in pageStatuList) {
            if (this.nextPageStatus == k) {
              console.log(pageStatuList[k]);
              this.$router.replace({
                path: `/bigTruckDriver/${pageStatuList[k]}`
              });
            }
          }
        } else {
        }
      });
    },

    arrivalCarPosition() {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.$loading.open();
      let params = {
        docId: data,
        statecls: "Kszc",
        statetyp: "Zhys",
        tableName: "WhDeliveryDoc",
        artnum: ""
      };
      this.$http.post("/setTransState", params).then(res => {
        this.$loading.close();
        let result = res.data;
        console.log(result.data);
        if (result.ret_code == 0) {
          this.docStatus = 1;
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
        } else {
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.returnInfo);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.loadmoreCss {
  position: absolute;
  top: 0.5rem;
  bottom: 0.6rem;
  right: 0;
  left: 0;
  background: #f6f7fc;
}
.taskTop {
  font-size: 0.16rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 0.3rem;
  padding: 0.06rem 0.3rem 0.03rem 0.1rem;
  background: #fff;
  .name {
    span {
      float: right;
      b {
        color: #f42d3b;
      }
    }
    b {
      color: #333;
    }
  }
  .addr {
    .address {
      display: inline-block;
      width: 72%;
      vertical-align: top;
      color: #333;
    }
  }
}
.common-content-top {
  background: #fff;
  margin-top: 0.05rem;
  padding: 0 0.1rem;
  font-size: 0.15rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333;
  line-height: 0.4rem;
  .reding {
    float: right;
    color: #f42d3b;
  }
}
.common-content-boxs {
  padding: 0.05rem 0.1rem 0.1rem 0.1rem;
  font-size: 0.15rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 0.3rem;
  li {
    background: #fff;
    padding: 0.1rem 0.15rem 0.1rem 0.15rem;
    border-radius: 0.05rem;
    margin-bottom: 0.05rem;
    .yel_tray {
      color: rgba(255, 127, 0, 1);
    }
    .address {
      display: inline-block;
      width: 75%;
      vertical-align: top;
      color: #333;
    }
    b {
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .hold {
      font-size: 0.15rem;
      font-weight: 550;
      color: rgba(51, 51, 51, 1);
    }
    .placeholder {
      height: 0.3rem;
    }

    .num {
      display: inline-block;
      width: 0.35rem;
    }
    .numing {
      b {
        color: #333;
      }
    }
    .numed {
      b {
        color: #f42d3b;
      }
    }
    .name {
      color: #1d88e3;
    }
    .info {
      color: #f42d3b;
    }
    .img_HF {
      width: 0.16rem;
      height: 0.14rem;
    }

    .reding {
      color: #f42d3b;
    }
    .inpit_num {
      width: 0.6rem;
      display: inline-block;
      margin-right: 0.05rem;
      color:#f42d3b;
    }
    .bor_bottom {
      margin: 0.1rem 0;
    }
    .border_bottom {
      border-bottom: 0.01rem solid rgba(230, 230, 230, 1);
      margin-bottom: 0.05rem;
    }
    span {
      float: right;
      span {
        color: rgba(29, 136, 227, 1);
      }
    }
    .gre {
      color: rgba(0, 180, 42, 1);
    }
    .tray {
      background: #fff5ec;
      border: 0.01rem solid #ff7f00;
      border-radius: 0.03rem;
      padding: 0.01rem 0.07rem 0.02rem 0.07rem;

      font-weight: 500;
      color: rgba(255, 127, 0, 1);
    }
    .tips {
      color: #f42d3b;
      font-weight: 500;
      button {
        float: right;
        background: rgba(244, 45, 59, 1);
        border: 0.01rem solid rgba(244, 45, 59, 1);

        border-radius: 0.2rem;
        padding: 0.04rem 0.18rem;
        color: #fff;
      }
    }
    .butt {
      text-align: right;
      padding: 0.08rem 0 0 0;
      button {
        background: rgba(244, 45, 59, 1);
        border: 0.01rem solid rgba(244, 45, 59, 1);

        border-radius: 0.2rem;
        padding: 0.04rem 0.18rem;
        color: #fff;
      }
      .refuse {
        background: rgba(255, 245, 236, 1);
        border: 0.01rem solid #ff7f00;
        font-weight: 500;
        color: rgba(255, 127, 0, 1);
        margin-right: 0.1rem;
      }
      .photoBtn {
        background: rgba(255, 245, 236, 1);
        border: 0.01rem solid #ff7f00;
        font-weight: 500;
        color: rgba(255, 127, 0, 1);
        float: left;
        padding: 0.04rem 0.1rem;
      }
      .photo {
        width: 0.16rem;
        height: 0.14rem;
        font-weight: 500;
        color: rgba(255, 127, 0, 1);
        //margin-top: -2px;
      }
    }
  }
}

.bottom-button-fixed {
  background: #f6f7fc;
  height: 0.6rem;
  border: 0;
  div {
    margin: auto;
    margin-top: 0.1rem;
    background: rgba(243, 31, 46, 1);
    border-radius: 42px;
    bottom: 0.05rem;
    line-height: 0.35rem;
    height: 0.35rem;
    border: 1px solid rgba(243, 31, 46, 1);
    display: inline-block;
    .img_HF {
      width: 0.2rem;
      height: 0.16rem;
      margin-top: -2px;
    }
  }
  div:nth-child(1) {
    width: 35%;
    border: 1px solid #ff7f00;
    background: rgba(255, 245, 236, 1);

    font-weight: 500;
    color: rgba(255, 127, 0, 1);
  }
  div:nth-child(2) {
    width: 50%;
    margin-left: 0.15rem;
  }
}
</style>
