<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <!-- <mt-loadmore :top-method="loadTop" ref="loadmore" :autoFill="false" class="loadmoreCss"> -->
      <ul class="common-content-boxs" v-for="(item) in dataObjList" :key="item.id">
        <li v-if="item.tra">
          <div>
            装运单号：
            <b>{{item.traId}}</b>
            <!-- <span class="gre">{{"送货"}}</span> -->
          </div>
          <div>
            客户地址：
            <b class="address">{{item.outadr}}</b>
          </div>
          <div v-for="(item, index) in item.details" :key="index">
            <div>
              托盘名称：
              <b>{{item.palletName}}</b>
            </div>
            <div>
              应收数量：
              <b class="num">{{item.outQuantity}}</b>
              <b>块</b>
              <span class="numed">
                实收数量：
                <b class="num">{{item.inQuantity}}</b>
                <b>块</b>
              </span>
            </div>
          </div>
          <div>
            交回库房：
            <b>
              <select-box
                class="selectSty"
                ref="reason"
                :selectDataList="dataList"
                @click="openPicker"
                @vehtypnams="shows"
              ></select-box>
            </b>
          </div>
        </li>
        <li v-else>
          <div>
            送货单号：
            <b>{{item.delId}}</b>
            <!-- <span v-if="true" class="red">{{"未确认"}}</span>
            <span v-else class="gre">{{"已确认"}}</span>-->
          </div>
          <div>
            客户地址：
            <b class="address">{{item.outadr}}</b>
          </div>
          <div v-for="(item, index) in item.details" :key="index">
            <div>
              托盘名称：
              <b>{{item.palletName}}</b>
            </div>
            <div>
              应收数量：
              <input
                type="text"
                class="inpit_num"
                v-model="item.outQuantity"
                oninput="value=value.replace(/[^\d]/g,'')"
              >
              <b>块</b>
              <span class="numed">
                实收数量：
                <input
                  type="text"
                  class="inpit_num"
                  v-model="item.inQuantity"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                <b>块</b>
              </span>
            </div>
          </div>
          <!-- <div class="butt">
              <button>确定</button>
          </div>-->
        </li>
      </ul>
    <!-- </mt-loadmore> -->
    <div class="common-bottom-button bottom-button-fixed">
      <div @click="confirm">确认交货</div>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import { setCache, getCache } from "@/config/utils";
import SelectBox from "@/components/common/SelectBox";

import native from "@/native/bridge.js";

export default {
  components: { HeaderDefault, SelectBox },
  data() {
    return {
      title: "带托盘回厂",
      tabInd: 0,
      tempData: [1, 2, 3, 4, 5],
      nextPageStatus: "",
      beststrtim: "",
      daohangImg: require("@/assets/images/common/daohang大.png"),
      dataObj: "",
      dataObjList: [],
      dataObjListD: [],
      whsnum: "",
      dataList: [
        {
          flex: 1,
          values: [1, 2, 3],
          textAlign: "center"
        }
      ]
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
      let data = getCache("bigTruckDriverList").docId;
      this.$loading.open();
      let params = {
        traId: data
        //  traId: "201965944125187189"
      };
      this.$http.get("/palletReclaim/getConfirmPallet", params).then(res => {
        this.$loading.close();
        let result = res.data;
        console.log(result);
        this.$refs.loadmore.onTopLoaded();
        if (result.ret_code == 0) {
          if (flag == 1) {
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast("刷新成功");
          }
          this.dataObj = result.data;

          let dataList = [];
          console.log(result);
          result.data.warehouseList.forEach(element => {
            dataList.push(element.whshondcr);
          });
          this.dataList[0].values = dataList;

          this.nextPageStatus = result.data.nextPageStatus;
          setCache("pageIndex", this.nextPageStatus);
          this.dataObj = result.data;
          this.dataObjList = result.data.list;
          if (result.data.list) {
            result.data.list.forEach(item => {
              if (!item.tra) {
                this.dataObjListD.push(item);
              }
            });
          }

          this.docStatus = result.data.deldocStatus;
          this.tempData = result.data.ArtckeList;
        }
      });
    },

    openPicker() {
      this.$refs.picker.open();
    },
    shows(id) {
      this.dataObj.warehouseList.forEach(item => {
        if (item.whshondcr == id) {
          this.whsnum = item.whsnum;
        }
      });
    },
    confirm() {
      if (!this.whsnum) {
        native.callhandler("showVoice", "请选择归还的仓库!");
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请选择归还的仓库!");
      } else {
        let data = getCache("bigTruckDriverList");
        this.$loading.open();
        let params = {
          data: JSON.stringify({
            traId: data.docId,
            whsnum: this.whsnum,
            vehlicnum: data.vehlicnum,
            details: this.dataObjListD
          })
        };

        this.$http.post("/palletReclaim/update", params).then(res => {
          this.$loading.close();
          let result = res.data;

          if (result.ret_code == 0) {
            native.callhandler("showVoice", "流程已完成,将返回首页！");
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast("流程已完成,将返回首页！");

            setTimeout(() => {
              this.$router.replace({
                path: "/home"
              });
            }, 1500);
          } else {
            native.callhandler("showVoice", result.msg, data => {});
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast(result.msg);
          }
        });
      }
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
  bottom: 0.5rem;
  right: 0;
  left: 0;
  background: #f6f7fc;
}
.taskTop {
  display: flex;
  justify-content: space-around;
  height: 0.45rem;
  li {
    font-size: 0.16rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 0.45rem;
    border-bottom: 2px solid transparent;
  }
  .active {
    border-bottom: 2px solid #fe2938;
    color: rgba(244, 45, 59, 1);
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
    .inpit_num {
      width: 0.5rem;
      display: inline-block;
      margin-right: 0.05rem;
      color: #f42d3b;
      height: 0.25rem;
      vertical-align: inherit;
    }
    .reding {
      color: #f42d3b;
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
    .name_r {
      b {
        display: inline-block;
        width: 0.5rem;
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
    }
  }
}
.bottom-button-fixed {
  background: #f6f7fc;
  height: 0.5rem;
  div {
    margin: auto;
    // margin-top: 0.1rem;
    background: rgba(243, 31, 46, 1);
    //border-radius: 42px;
    // width: 90%;
    // bottom: 0.1rem;
    line-height: 0.5rem;
    height: 0.5rem;
    .img_HF {
      width: 0.2rem;
      height: 0.16rem;
      margin-top: -2px;
    }
  }
}
.selectSty {
  display: inline-block;
  width: 2rem;
  vertical-align: middle;
}
.selectBox {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 0.32rem;
  border: 1px solid #fff !important;
  border-radius: 0.05rem;
  padding-left: 0.05rem;
}
</style>
