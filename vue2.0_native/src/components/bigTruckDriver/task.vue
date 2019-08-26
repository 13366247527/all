<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <ul class="taskTop">
      <li @click="tabTop(0)" :class="tabInd==0?'active':''">待确认 ({{12}})</li>
      <li @click="tabTop(1)" :class="tabInd==1?'active':''">进行中 ({{2}})</li>
      <li @click="tabTop(2)" :class="tabInd==2?'active':''">已完成 ({{1}})</li>
    </ul>
    <mt-loadmore :top-method="loadTop" ref="loadmore" :autoFill="false" class="loadmoreCss">
      <ul class="common-content-boxs" v-if="tabInd==0">
        <li>
          <div class="border_bottom">
            装运单号：
            <b>{{67887878787}}</b>
            <span>{{12}}分钟前</span>
          </div>
          <div>
            客户数量：
            <b>{{3}}</b>
            <span class="info">查看详情></span>
          </div>
          <div>
            托盘数量：
            <b>{{5000}} 块</b>
            <span>
              里程数：
              <span>{{78}} km</span>
            </span>
          </div>
          <div class="yel_tray">
            <img :src="jinggaoImg" class="img_H">
            特殊指派任务：
            <button class="tray">取回托盘</button>
          </div>
          <div class="tips">
            提示：{{12}} 次
            <button>确认</button>
          </div>
        </li>

        <li>
          <div class="border_bottom">
            装运单号：
            <b>{{67887878787}}</b>
            <span>{{12}}分钟前</span>
          </div>
          <div>
            <b class="hold">{{"华北厂仓库 - 邯郸"}}</b>
            <span class="gre">{{"送货"}}</span>
          </div>
          <div>
            重量：
            <b>{{10.01}} 吨</b>
            <span>
              里程数：
              <span>{{78}} km</span>
            </span>
          </div>
          <div>
            到厂时间：
            <b>{{"2019-08-08 10:00"}}</b>
            <span class="info">查看详情></span>
          </div>
          <div class="butt">
            <button class="refuse">拒绝</button>
            <button>接单</button>
          </div>
        </li>

        <li>
          <div class="border_bottom">
            装运单号：
            <b>{{67887878787}}</b>
            <span>{{12}}分钟前</span>
          </div>
          <div>
            供应商：
            <b>{{"北京市燕京啤酒厂"}}</b>
            <span class="info">查看详情></span>
          </div>
          <div>
            重量：
            <b>{{10.01}} 吨</b>
            <span>
              里程数：
              <span>{{78}} km</span>
            </span>
          </div>
          <div class="yel_tray">
            <img :src="jinggaoImg" class="img_H">
            特殊指派任务：
            <button class="tray">采购拉货</button>
          </div>
          <div class="butt">
            <button>确认</button>
          </div>
        </li>

        <li>
          <div class="border_bottom">
            装运单号：
            <b>{{67887878787}}</b>
            <span>{{12}}分钟前</span>
          </div>
          <div>
            供应商：
            <b>{{"北京市燕京啤酒厂"}}</b>
            <span class="info">查看详情></span>
          </div>
          <div>
            重量：
            <b>{{10.01}} 吨</b>
            <span>
              里程数：
              <span>{{78}} km</span>
            </span>
          </div>
          <div class="yel_tray">
            <img :src="jinggaoImg" class="img_H">
            特殊指派任务：
            <button class="tray">采购拉货</button>
          </div>
          <div class="butt">
            <button>确认</button>
          </div>
        </li>
      </ul>

      <ul class="common-content-boxs" v-if="tabInd==1">
        <li>
          <div class="border_bottom">
            装运单号：
            <b>{{67887878787}}</b>
            <span class="yel_tray">{{'回厂'}}</span>
          </div>
          <div>
            客户名称：
            <b>{{"北京物美超市"}}</b>
            <span class="info">查看详情></span>
          </div>
          <div>
            托盘数量：
            <b>{{5000}} 块</b>
            <span>
              里程数：
              <span>{{78}} km</span>
            </span>
          </div>
          <div class="yel_tray">
            <img :src="jinggaoImg" class="img_H">
            特殊指派任务：
            <button class="tray">取回托盘</button>
          </div>
          <div class="butt">
            <button><img :src="daohangImg" class="img_HF">
            装货导航</button>
          </div>
        </li>
        <li>
          <div class="border_bottom">
            装运单号：
            <b>{{67887878787}}</b>
            <span class="reding">{{'执行中'}}</span>
          </div>
          <div>
            客户数量：
            <b>{{3}}</b>
            <span class="info">查看详情></span>
          </div>
          <div>
            托盘数量：
            <b>{{5000}} 块</b>
            <span>
              里程数：
              <span>{{78}} km</span>
            </span>
          </div>
          <div class="yel_tray">
            <img :src="jinggaoImg" class="img_H">
            特殊指派任务：
            <button class="tray">
                 取回托盘</button>
          </div>
          <div class="butt">
            <button><img :src="daohangImg" class="img_HF">
             回厂卸货导航
             </button>
          </div>
        </li>
      </ul>

      <ul class="common-content-boxs" v-if="tabInd==2">
        <li>
          <div class="border_bottom">
            装运单号：
            <b>{{67887878787}}</b>
          </div>
          <div>
            客户名称：
            <b>{{"北京物美超市"}}</b>
            <span class="info">查看详情></span>
          </div>
          <div>
            托盘数量：
            <b>{{5000}} 块</b>
            <span>
              里程数：
              <span>{{78}} km</span>
            </span>
          </div>
          <div>
            到厂时间：
            <b>{{"2019-08-08 10:00"}}</b>
          </div>
        </li>
      </ul>
    </mt-loadmore>
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
      title: "任务",
      tabInd: 1,
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
      jinggaoImg: require("@/assets/images/common/jinggao-5.png"),
      daohangImg: require("@/assets/images/common/daohang大.png"),

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
  top: 0.95rem;
  bottom: 0rem;
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
    b {
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .hold {
      font-size: 0.15rem;
      font-weight: 550;
      color: rgba(51, 51, 51, 1);
    }
    .info {
      color: #f42d3b;
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
    .img_H {
      width: 0.16rem;
      height: 0.16rem;
      margin-top: -2px;
    }
    .img_HF{
        width: 0.16rem;
      height: 0.14rem;
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
    }
  }
}
</style>
