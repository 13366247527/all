<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <mt-loadmore :top-method="loadTop" ref="loadmore" :autoFill="false" class="loadmoreCss">
      <div class="common-line-one-panel">
        <p>
          <span>装运单号：</span>
          <span class="red">{{dataObj.refdocnum}}</span>
          <!-- <b class="serviceCom" @click="toServiceComment">服务评价</b> -->
        </p>
      </div>
      <ul class="common-content-box">
        <li class="common-content-title bgGray">
          <div>品名规格</div>
          <div>托</div>
          <div>层</div>
          <div>箱</div>
          <div>确认</div>
        </li>
        <li v-for="(item, index) in tempData" :key="index">
          <div>{{item.articleName}}</div>
          <div>{{item.palletNumber}}</div>
          <div>{{item.floorNumber}}</div>
          <div>{{item.unitNumber}}</div>
          <div v-if="item.status == '1'" @click="actualAccept(item.id,index)">
            <span class="redsBtn">待收</span>
          </div>
          <div v-else class="green">已收</div>
        </li>
      </ul>
    </mt-loadmore>

    <div class="common-line-two-panel total">
      <p>
        <span>数量：</span>
        <span class="red">{{dataObj.totalshpartuni}}</span>
        <span class="black">箱</span>
      </p>
      <p>
        <span>重量：</span>
        <span class="red">{{dataObj.totalartwgt}}</span>
        <span class="black">吨</span>
      </p>
    </div>

    <div class="common-bottom-button bottom-button-fixed">
      
     <span v-if="docStatus==0" @click="arrivalCarPosition">开始装车</span>
      <span v-else class="greenBtner" @click="toContract">装车完成</span>
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
      title: "装货验收",
      cpycod: "",
      tranum: "",
      tranumsuf: "",
      dataObj: {},
      docStatus: "",
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
      statuFlag: ""
    };
  },
  // created () {
  //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
  // },
  mounted() {
    this.getData();
  },
  methods: {
    loadTop() {
      //传1说明是下拉刷新
      this.getData(1);
    },
    toServiceComment() {
      this.$router.replace({
        path: "/bigTruckDriver/serviceComment"
      });
    },
     actualAccept(id, index) {
      this.$loading.open();
      let params = {
        docId: id
      };
      this.$http.post("/loadActual", params).then(res => {
        this.$loading.close();
        let result = res.data;
        console.log(result.data);
        if (result.ret_code == 0) {
          this.tempData[index].status = 0;
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
        } else {
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.returnInfo);
        }
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
          console.log(this.nextPageStatus)
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
          }else{

          }
        });
     
    },
   arrivalCarPosition() {
      // this.$say("请在5分钟内完成所有装车前工作");
      // let time = setTimeout(() => {
      //   clearTimeout(time);
      //   this.overtime();
      // }, 5 * 60 * 1000);
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
    },
    getData(flag) {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http
        .post("/getLoadArticle", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          this.$refs.loadmore.onTopLoaded();
          if (result.ret_code == 0) {
            if (flag == 1) {
              window.instance ? window.instance.close() : "";
              window.instance = this.$toast("刷新成功");
            }
            this.nextPageStatus = result.data.nextPageStatus;
            setCache("pageIndex",this.nextPageStatus)
            this.dataObj = result.data;
            this.docStatus = result.data.deldocStatus;
            this.tempData = result.data.ArtckeList;
          }
        })
        .catch(res => {
          //this.$toast("数据获取错误！")
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
}
.common-bottom-button span {
  width: 100%;
}
.common-content-box li div {
  width: 25%;
}
.common-content-box li div:nth-child(1) {
  width: 25%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  line-height: 0.48rem;
}
.common-line-one-panel {
  p {
    padding: 0;
    height: 0.46rem;
    border-bottom: 0 none;
    position: relative;
    .serviceCom {
      @include redPanel(0.73rem);
      position: absolute;
      right: 0.1rem;
    }
  }
}

// .common-content-box {
//   padding-bottom: 1rem;
// }
.redsBtn {
  display: inline-block;
  width: 0.5rem;
  height: 0.31rem;
  line-height: 0.31rem;
  text-align: center;
  background: #e31d2b;
  border-radius: 0.05rem;
  color: #fff;
}
.total {
  width: 100%;
  position: fixed;
  bottom: 0.5rem;
  background: #fff;
}
.common-content-box li div:nth-child(1) {
  width: 30%;
}
.common-content-box li div:nth-child(2) {
  width: 15%;
}
.common-content-box li div:nth-child(3) {
  width: 15%;
}
.common-content-box li div:nth-child(4) {
  width: 15%;
}
.common-content-box li div:nth-child(5) {
  width: 25%;
}
.common-content-box {
  padding-bottom: 0.5rem;
}
.common-bottom-button {
  .orangeBtn {
    img {
      width: 0.26rem;
      height: 0.21rem;
      margin-right: 0.05rem;
    }
    // b {
    //   //font-size: 0.15rem;
    // }
  }
  span {
    width: 100%;
  }
}
</style>
