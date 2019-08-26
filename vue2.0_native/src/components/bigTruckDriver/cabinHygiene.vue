<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <mt-loadmore :top-method="loadTop" :auto-fill="false" ref="loadmore" class="loadmoreCss">
      <div class="oprateBox">
        <template v-for="(item, index) in dataList">
          <take-photo
            :key="index"
            :title="item.imageDesc"
            :poto1="0"
            :imagePath="item.imagePath"
            :status="item.status"
            :list="item.picturetyp"
            :lists="lists"
            :Whether="item.imagePath?item.status:false"
            class="photo"
          ></take-photo>
        </template>
      </div>
    </mt-loadmore>
    <div class="common-bottom-button bottom-button-fixed" @click="toSignIn">安全签到</div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import TakePhoto from "@/components/common/TakePhoto";
import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";

export default {
  components: { HeaderDefault, TakePhoto },
  data() {
    return {
      title: "车辆卫生",
      nextPageStatus: "",
      Whether: false,
      dataList: [],
      lists: {
        docId: "",
        picturecls: "Rczb"
      },
      status: "",
      allHeight: "",
      imagePathStatu: true
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
    handleTopChange(status) {
      this.topStatus = status;
    },
    getData(flag) {
      let data = getCache("bigTruckDriverList").docId;
      this.lists.docId = data;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http
        .post("/getReadyInFactory", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          if (result.ret_code == "0") {
            if (flag == 1) {
              window.instance ? window.instance.close() : "";
              window.instance =  this.$toast("刷新成功");
              this.$refs.loadmore.onTopLoaded();
            }
            this.dataList = result.data.imageDescs;
            this.status = result.data.docStatus;
            this.nextPageStatus = result.data.nextPageStatus;
            setCache("pageIndex",this.nextPageStatus)
          } else {
            window.instance ? window.instance.close() : "";
            window.instance =  this.$toast(result.msg);
          }
        })
        
    },
    toSignIn() {
      const url =
        "http://img.logwsd.com/group1/M00/01/39/rBUAEF1TbnmAF7pnAAAEXyS_a5I347.png";
      let currentUrl;
      try {
        for (let i in this.dataList) {
          currentUrl = document.getElementsByClassName("imgUrl")[i].src;
            this.imagePathStatu = true
          if (url === currentUrl) {
            this.imagePathStatu = false
            throw this.dataList;
          }
        }
      } catch (error) {}

     

      if (this.imagePathStatu) {
        if (this.status == 0) {
          let pageStatuList = getCache("PageStatus");
          for (let k in pageStatuList) {
            if (this.nextPageStatus == k) {
              console.log(pageStatuList[k]);
              this.$router.replace({
                path: `/bigTruckDriver/${pageStatuList[k]}`
              });
            }
         }
        }else if(this.status == 1){
      native.callhandler("showVoice", "审核不合格请重新提交！", data => {});

          window.instance ? window.instance.close() : "";
        window.instance =  this.$toast("审核不合格请重新提交！");
        } else {
      native.callhandler("showVoice", "请等待审核！", data => {});

          window.instance ? window.instance.close() : "";
        window.instance =  this.$toast("请等待审核！");
        }
      } else {
      native.callhandler("showVoice", "请先拍照！", data => {});

       window.instance ? window.instance.close() : "";
        window.instance =  this.$toast("请先拍照！");
      }

      // this.$router.replace({
      //   path: "/bigTruckDriver/signIn"
      // });
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
.oprateBox {
  @include flex(row);
  flex-wrap: wrap;

  padding-bottom: 0.15rem;
  // position: absolute;
  //   top: .5rem;
  //   bottom: .48rem;
  //   right: 0;
  //   left: 0;
  //   height: auto;
  .photo {
    width: 1.63rem;
    height: 1.56rem;
    margin-left: 0.15rem;
    margin-top: 0.15rem;
  }
}
.stateBox {
  height: 0.45rem;
  border-top: 1px solid rgba(236, 236, 236, 1);
  @include flex(row);
  justify-content: space-around;
  align-items: center;
  font-size: 0.15rem;
  margin-bottom: 0.5rem;
  .oprBtn {
    width: 0.62rem;
    height: 0.32rem;
    line-height: 0.32rem;
    text-align: center;
    background: rgba(0, 180, 42, 1);
    border-radius: 0.05rem;
    color: rgba(255, 255, 255, 1);
    @include normal-font();
  }
}
</style>

