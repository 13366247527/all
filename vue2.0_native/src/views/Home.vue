<template>
  <div>
    <header-default :title="title"></header-default>
    <div class="pt15">
      <div
        class="tabs"
        @click="toDetailPage(item.status, index)"
        v-for="(item, index) in itemLists"
        :key="index"
      >
        <img :src="item.imgPath">
        <span>{{item.content}}</span>
      </div>
      <div class="itemempty"></div>
      <div class="itemempty"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";
import HeaderDefault from "@/components/common/HeaderDefault";
export default {
  name: "home",
  data() {
    return {
      pageStatus: "",
      itemLists: [],
      itemListsG:[],
      title: "",
      rootPath: "",
      indexPage: "",
      bigTruckDriverList: "",
      docId: ""
    };
  },
  components: { HeaderDefault },
  mounted() {
    this.getData();
  },
  methods: {
    // getLocation() {
    //   let docId = getCache("bigTruckDriverList").docId;
    //   this.docId = docId;

    //   if (docId) {
    //     var map = new AMap.Map("", {
    //       resizeEnable: true
    //     });
    //     AMap.plugin("AMap.Geolocation", function() {
    //       var geolocation = new AMap.Geolocation({
    //         enableHighAccuracy: false, //是否使用高精度定位，默认:true
    //         timeout: 10000, //超过10秒后停止定位，默认：5s
    //         buttonPosition: "RB", //定位按钮的停靠位置
    //         buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    //         zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
    //       });
    //       map.addControl(geolocation);
    //       geolocation.getCurrentPosition(function(status, result) {
    //         if (status == "complete") {
    //           onComplete(result);
    //         } else {
    //           onError(result);
    //         }
    //       });
    //     });
    //     //解析定位结果
    //     let that = this;
    //     function onComplete(data) {
    //       setCache("position", {
    //         lng: data.position.lng,
    //         lat: data.position.lat
    //       });
    //     }
    //     //解析定位错误信息
    //     function onError(data) {
    //       console.log(data);
    //       that.$http.post("/condition/now", {}).then(result => {
    //         let res = result.data;
    //         if (res.ret_code == 0) {
    //           setCache("position", {
    //             lng: res.data.lng,
    //             lat: res.data.lat
    //           });
    //         } else {
    //           setCache("position", {
    //             lng: 121.59996,
    //             lat: 31.197646
    //           });
    //         }
    //       });
    //     }
    //   }
    // },
    toDetailPage(status, index) {
      if (status) {
        let data = this.bigTruckDriverList;
        if (!data) {
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast("数据获取错误，请重新登陆！");
          native.callhandler(
            "showVoice",
            "数据获取错误，请重新登陆！",
            data => {}
          );
          return false;
        }
        if (this.itemLists[index].pagnum == "onlineOperate") {
          if (data.cfmOrderStatus == 1) {
            let pageStatuList = getCache("PageStatus");
            let pageStatu = false;
            // console.log(this.pageStatus);
            for (let k in pageStatuList) {
              if (this.pageStatus == k) {
                pageStatu = true;
                this.$router.push({
                  path: `/${this.rootPath}/${pageStatuList[k]}`
                });
              }
            }
            if (!pageStatu) {
              pageStatu = false;
              window.instance ? window.instance.close() : "";
              window.instance = this.$toast("数据获取异常!");
              native.callhandler("showVoice", "数据获取异常！", data => {});
            }
          } else {
            window.instance ? window.instance.close() : "";
            native.callhandler("showVoice", "请先接单确认！", data => {});
            window.instance = this.$toast({
              message: "请先接单确认！",
              duration: 1500
            });
          }
        } else if (this.itemLists[index].pagnum == "onlineOrder") {
          if (data.docId) {
            this.$router.push({
              path: `/${this.rootPath}/onlineOrder`
              // query:{
              //   index:data.docId
              // }
            });
          } else {
            native.callhandler(
              "showVoice",
              "当前没有需要处理的单据！",
              data => {}
            );
            window.instance ? window.instance.close() : "";
            window.instance = this.$toast({
              message: "当前没有需要处理的单据！",
              duration: 1500
            });
          }
        } else {
          this.$router.push({
            path: `/${this.rootPath}/${this.itemLists[index].pagnum}`
          });
        }
      } else {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("功能正在开发中...");
      }
    },

    getData() {
       native.callhandler("Location", {}, data => {
        let lng = eval("(" + data + ")").longitude;
        let lat = eval("(" + data + ")").latitude;
        setCache("position", {
          lng: lng,
          lat: lat
        });
      });
      this.$loading.open();
      let jobpost = getCache("jobpost");
      let params = {
        jobpost: jobpost
      };
      this.$http.post("/app/navi", params).then(result => {
        this.$loading.close();
        let res = result.data;
        if (res.ret_code == 0) {
          setCache("cpycode", res.cpycod);

          this.itemListsG = res.data.routers;
          // console.log(this.itemLists);
          switch (jobpost) {
            //车辆调度员
            // case "22":
            //   this.rootPath = "vehicleDispatcher";
            //   this.title = "车辆调度员";
            //   break;
            //装卸员
              case "15" :
               this.rootPath = "loadMent";
               this.title = "装卸员";
              //九宫格跳转判断时使用
              this.bigTruckDriverList = true
              break;
              //生产员
              case "07" :
               this.rootPath = "manufacturingWorker";
               this.title = "生产员";
              this.bigTruckDriverList = true
              break;
               //品控员
              case "08" :
               this.rootPath = "pingkunMent";
               this.title = "品控员";
              this.bigTruckDriverList = true
              break;
            //大货车司机
            case "14":
              this.rootPath = "bigTruckDriver";
              this.title = "大货车司机";
              let PageStatus = {
                1500: "onlineOperate",//作业明细 
                1600: "loadNav", //装货导航
                1700: "cabinHygiene",//车厢卫生
                1900: "signIn",//安全签到
                2000: "instruction",//入厂需知
                2200: "queue",//排队入厂
                2400: "intoFacNav",//入厂导航
                2401: "intoFacNav1",//入厂导航
                2600: "loadWork",//装货工作
                2601: "loadWork1",//装货工作
                2900: "serviceComment",//服务评价
                3000: "contract",//合同
                3200: "outFacMng",//出厂管理
                3600: "loadNav",//装货导航
                3650: "process", //客户交货流程说明
                3700: "unload/discharge",//卸货拍照
                3701: "order1",//卸货拍照
                3900: "unloadConfirm",//卸货确认
                4200: "Palletbacktofactory", //带托盘回厂
                4300: "loadNav",//装货导航
                4400: "palletReturn" //托盘交回
              };
              setCache("PageStatus", PageStatus);
              break;
          }
          //this.itemLists = res.data;
         
          // console.log(this.rootPath == "bigTruckDriver");
          if (this.rootPath == "bigTruckDriver") {
            this.$http.post("/getNewOrder", {}).then(res => {
              this.bigTruckDriverList = res.data.data;
               if(res.data.data.trpkind==6 || res.data.data.trpkind==7){
                this.itemListsG.shift()
              
          }
                  this.itemLists = this.itemListsG
                     for (let i = 0; i < this.itemLists.length; i++) {
            this.itemLists[i].imgPath = require(`../assets/images/${
              this.rootPath
            }/${this.itemLists[i].pagnum}.png`);
          }
                  
             
              this.pageStatus = this.bigTruckDriverList.pageStatus;
              setCache("bigTruckDriverList", res.data.data);
              let docId = res.data.data.docId;
              let token = getCache("token");
              // console.log(docId);
              // if (docId) {
              //   let params = {
              //     docId: docId,
              //     token: token,
              //     time: 30,
              //     statu: 0
              //   };
              //   //  console.log(params);
              //   native.callhandler("startLocation", params, data => {
              //     //   console.log(data);
              //   });
              // }

              //this.getLocation();
              //console.log(this.bigTruckDriverList);
            });
          }
        } else {
          this.$loading.close();
          this.$toast(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.pt15 {
      padding: 0.15rem ;
      text-align: center;
      display: flex;
      justify-content: space-around;
      align-self:flex-start;
      flex-wrap: wrap;
    }
    .tabs {
      width: 1rem;
      height: 1rem;
      margin: 0  0.07rem 0.15rem 0.07rem  ;
      position: relative;
    }
    .itemempty{
      height: 0rem;
      width: 1rem;
      margin: 0  0.07rem 0.15rem 0.07rem  ;
      position: relative;
    }

.tabs img {
  width: 100%;
  height: 100%;
  display: block;
}

.tabs span {
  font-size: 0.13rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 0.1rem;
  left: 0;
  right: 0;
  text-align: center;
}
html,
body,
#container {
  height: 100%;
}
.info {
  width: 26rem;
}
</style>

