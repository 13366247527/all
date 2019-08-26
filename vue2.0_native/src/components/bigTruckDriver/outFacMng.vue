<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <mt-loadmore
      :top-method="loadTop"
      @top-status-change="handleTopChange"
      ref="loadmore"
      class="loadmoreCss"
    >
      <div class="common-line-two-panel">
        <p class="highWork" @click="highWork">
          <span :class="active?'bacRed':'bacGre'">登高作业</span>
        </p>
        <p>
          <span>状态：</span>
          <span v-if="dataList.highWorkConfirm==0" class="green">同意作业</span>
          <span v-if="dataList.highWorkConfirm==1" class="red">不合格</span>
          <span v-if="dataList.highWorkConfirm==2" class="green">审核中</span>
          <span v-if="dataList.highWorkConfirm==3" class="red">未提交</span>
        </p>
      </div>
      <blank-space></blank-space>
      <div class="photoBox">
        <template v-for="(item, index) in dataLists">
          <take-photo
            :key="index"
            :title="item.imageDesc"
            :poto1="0"
            :imagePath="item.imagePath"
            :status="item.status"
            :list="item.picturetyp"
            :lists="lists"
            :Whether="item.imagePath?item.status:false"
            :AscendHeight="active"
            class="photo"
          ></take-photo>
        </template>
      </div>
      <!-- <p class="peddingBtn">
      <span>提交</span>
      </p>-->
      <div class="common-line-one-panel">
        <p>
          <span>防护状态：</span>
          <span v-if="dataList.docStatus==0" class="green">合格</span>
          <span v-if="dataList.docStatus==1" class="red">不合格</span>
          <span v-if="dataList.docStatus==2" class="green">审核中</span>
          <span v-if="dataList.docStatus==3" class="red">未提交</span>
        </p>
      </div>
      <textarea name="violate" class="violate" readonly v-model="dataList.reasonText"></textarea>
      <div class="common-line-one-panel">
        <p>
          <span>违规状态：</span>
          <span v-if="dataList.weiGuiStatus==true" class="green">已处理</span>
          <span v-if="dataList.weiGuiStatus==false" class="red">未处理</span>
        </p>
      </div>
    </mt-loadmore>

    <div class="common-bottom-button bottom-button-fixed">
      <!-- <span class="greenBtner">已签名</span> -->
      <span @click="toFacNav">申请出厂</span>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import BlankSpace from "@/components/common/BlankSpace";
import TakePhoto from "@/components/common/TakePhoto";
import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";

export default {
  components: { HeaderDefault, BlankSpace, TakePhoto },
  data() {
    return {
      title: "出厂管理",
      evaluation: "",
      active: true,
      actives: true,
      dataLists: [],
      lists: {
        docId: "",
        picturecls: "Ccgl"
      },
      nextPageStatus: "",
      dataList: "",
      actice: true,
      status: ""
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
    toFacNav() {
      const url =
        "http://img.logwsd.com/group1/M00/01/39/rBUAEF1Tb9-AHDiKAAAEXyS_a5I559.png";
      let currentUrl;
      try {
        for (let i in this.dataLists) {
          currentUrl = document.getElementsByClassName("imgUrl")[i].src;
          this.imagePathStatu = true;
          if (url === currentUrl) {
            this.imagePathStatu = false;
            throw this.dataLists;
          }
        }
      } catch (error) {
        console.log(error);
      }

      if (this.imagePathStatu) {
        if (this.dataList.highWorkConfirm == 3) {
          native.callhandler("showVoice", "请点击登高作业！", data => {});
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast("请点击登高作业！");
          return;
        }
        if (this.status == 0) {
          if (this.nextPageStatus == -1) {
              native.callhandler("showVoice", "流程已完成,将返回首页！");
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast("流程已完成,将返回首页！");
            setTimeout(() => {
              this.$router.replace({
                path: "/home"
              });
            }, 1500);
          } else {
            let pageStatuList = getCache("PageStatus");
            for (let k in pageStatuList) {
              if (this.nextPageStatus == k) {
                console.log(pageStatuList[k]);
                this.$router.replace({
                  path: `/bigTruckDriver/${pageStatuList[k]}`
                });
              }
            }
          }
        } else if (this.status == 1) {
          native.callhandler("showVoice", "审核不合格请重新提交！", data => {});

          window.instance ? window.instance.close() : "";
          window.instance = this.$toast("审核不合格请重新提交！");
        } else {
          native.callhandler("showVoice", "请等待审核！", data => {});
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast("请等待审核！");
        }
      } else {
        native.callhandler("showVoice", "请先拍照！", data => {});

        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请先拍照！");
      }
      // this.$router.replace({
      //     path: '/bigTruckDriver/loadNav'
      // })
    },
    highWork() {
      if (this.actives) {
        let data = getCache("bigTruckDriverList").docId;
        // this.$loading.open();
        let params = {
          docId: data,
          statecls: "Dgzy",
          statetyp: "Ccgl",
          tableName: "WhShipmentDoc",
          artnum: "",
          imagePathStatu: true
        };
        this.$http.post("/setTransState", params).then(res => {
          this.$loading.close();
          let result = res.data;
          console.log(result.data);
          if (result.ret_code == 0) {
            this.dataList.highWorkConfirm = 2;
            this.actives = false;
            this.active = false;
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast(result.msg);
          } else {
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast(result.returnInfo);
          }
        });
      } else {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("已提交！");
      }
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    getData(flag) {
      let data = getCache("bigTruckDriverList").docId;
      this.lists.docId = data;
      // this.$loading.open();
      let params = {
        docId: data
      };
      this.$http.post("/getReadyOutFactory", params).then(res => {
        this.$loading.close();
        let result = res.data.data;
        if (result.ret_code == 0) {
          this.status = result.data.docStatus;
          console.log(this.status);
          this.dataList = result.data;

          this.dataLists = result.data.imageDescs;
          this.dataLists.forEach((item, index) => {
            this.imagePathStatu = true;
            if (!item.imagePath) {
              this.imagePathStatu = false;
            }
          });
          if (
            this.dataList.highWorkConfirm == 0 ||
            this.dataList.highWorkConfirm == 2
          ) {
            this.active = false;
            this.actives = false;
          } else {
            this.active = true;
            this.actives = true;
          }
          if (flag == 1) {
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast("刷新成功");
            this.actice = false;
            this.$refs.loadmore.onTopLoaded();
          }
          this.nextPageStatus = result.nextPageStatus;
          setCache("pageIndex", this.nextPageStatus);
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
}
.common-bottom-button span {
  width: 100%;
}
.common-page-flex {
  padding-bottom: 0.5rem;
}

.common-line-two-panel {
  p {
    border-bottom: 0 none;
  }
  .highWork {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    height: 0.54rem;

    span {
      @include peddingBtn(1.15rem);
      height: 0.41rem;
      line-height: 0.41rem;
      background: #e31d2b;
      background-image: url(../../assets/images/bigTruckDriver/highWork.png);
      background-repeat: no-repeat;
      background-size: 0.28rem 0.37rem;
      background-position: 0.08rem 0;
    }
    .bacRed {
      @include peddingBtn(1.15rem);
      height: 0.41rem;
      line-height: 0.41rem;
      background: #e31d2b;
      background-image: url(../../assets/images/bigTruckDriver/highWork.png);
      background-repeat: no-repeat;
      background-size: 0.28rem 0.37rem;
      background-position: 0.08rem 0;
    }
    .bacGre {
      @include peddingBtn(1.15rem);
      height: 0.41rem;
      line-height: 0.41rem;
      background: #00b42a;
      background-image: url(../../assets/images/bigTruckDriver/highWork.png);
      background-repeat: no-repeat;
      background-size: 0.28rem 0.37rem;
      background-position: 0.08rem 0;
    }
  }
}

.common-line-one-panel {
  p {
    border-top: 1px solid #ececec;
    border-bottom: 0 none;
  }
}
.peddingBtn {
  padding-top: 0;
  justify-content: center;
  margin: auto;
  margin-bottom: 0.1rem;
  span {
    @include peddingBtn(2.08rem);
    height: 0.37rem;
    line-height: 0.37rem;
  }
}
.photoBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 0.1rem 0.1rem;
  .photo {
    margin-top: 0.1rem;
    width: 1.57rem;
    height: 1.5rem;
  }
}
.violate {
  box-sizing: border-box;
  display: block;
  width: 3.41rem;
  height: 0.99rem;
  padding: 0.05rem;
  margin: 0 auto;
  background: rgba(240, 240, 240, 1);
  border: 1px solid rgba(192, 192, 192, 1);
  border-radius: 0.05rem;
  font-size: 0.15rem;
  @include slim-font();
  color: rgba(153, 153, 153, 1);
}
</style>
