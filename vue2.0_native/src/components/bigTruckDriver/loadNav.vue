<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="common-page-content">
      <div class="oprateBox">
        <p>
          <img src="@/assets/images/bigTruckDriver/rainSnow.png" alt>
          <span class="red">雨雪</span>
        </p>
        <p>
          <img src="@/assets/images/bigTruckDriver/trafficJam.png" alt>
          <span class="orange">堵车</span>
        </p>
        <p>
          <img src="@/assets/images/bigTruckDriver/breakdown.png" alt>
          <span class="red">故障</span>
        </p>
      </div>
      <el-amap
        vid="amap"
        :plugin="plugin"
        class="amap-container"
        id="container"
        :amap-manager="amapManager"
        :zoom="zoom"
        :center="center"
      >
        <!-- <el-amap-marker vid="marker" :position="center" :label="label"></el-amap-marker> -->
      </el-amap>
      <mt-popup
        v-model="popupVisible"
        :modal="modalFlag"
        :class="heighter?'heighter':'panel'"
        id="panel"
        ref="panel"
        @click.native="showDetails"
        position="right"
      ></mt-popup>
    </div>
    <div class="CustomerInfo" v-if="CustomerInfo">
      <div>
        <div class="CustomerNum">
          客户数量：
          <b>{{1}}</b>/<span>{{3}}</span>
          <span class="Btn Btn1" :class="situation==0?'active':''" @click="Situation(0)">
            <button>车辆故障</button>
          </span>
          <span class="Btn" :class="situation==1?'active':''" @click="Situation(1)">
            <button>堵车超时</button>
          </span>
        </div>
        <div class="addrss">
          地址：
          <b>北北京市北京市北京市北京市北京市北京市北京市京市</b>
        </div>
        <div class="Customer">
          客户：
          <b>北北京市北</b>
        </div>

      <div class="table_info">
        <div>{{888}} 托</div>
        <div>{{88}} 公里</div>
      </div>

      <div class="table_info">
        <div>数量</div>
        <div>往返里程</div>
      </div>

      </div>
    </div>
    <div class="common-bottom-button bottom-button-fixed">
      <span class="orangeBtn" @click="nav">导航</span>
      <span @click="arrival">到达</span>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import { Popup } from "mint-ui";
import HeaderDefault from "@/components/common/HeaderDefault";
import { AMapManager } from "vue-amap";
import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";

let amapManager = new AMapManager();

export default {
  components: { HeaderDefault },
  data() {
    let self = this;
    return {
      title: "",
      type: null,
      situation:0,
      CustomerInfo:false,//客户信息显示隐藏
      popupVisible: false,
      modalFlag: false,
      heighter: true,
      flag: true,
      popupCon: "",
      data: "",
      enclosure: -1, //围栏
      distanceLimit: "", //围栏范围
      amapManager,
      nextPageStatus: "",
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      zoom: 10,
      label: {
        content: "",
        offset: [10, 12]
      },
      driving: "",
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              //o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        },
        { pName: "ToolBar" }
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let pageIndex = getCache("pageIndex");
      if (pageIndex == "3600") {
        vm.title = "送货导航";
        vm.type = 1;
      } else if (pageIndex == "4300") {
        vm.title = "回厂导航";
        vm.type = 2;
      } else {
        vm.title = "装货导航";
        vm.type = 3;
      }
    });
  },
  mounted() {
    this.getData();
  },
  methods: {
    nav() {
      let position = getCache("position");
      if (!position) {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("网络不给力，请稍后再试！");
        return false;
      }
      let pos = this.data;

      let datas = "";
      if (this.type == 1) {
        datas = {
          startPre: position.lng, //开始精度
          startLat: position.lat, //开始纬度
          endPre: pos.rcvlngtud,
          endLat: pos.rcvlattud
        };
      } else {
        datas = {
          startPre: position.lng, //开始精度
          startLat: position.lat, //开始纬度
          endPre: pos.dellngtud,
          endLat: pos.dellattud
        };
      }
      console.log(JSON.stringify(datas));
      if (datas.startPre && datas.startLat && datas.endPre && datas.endLat) {
        native.callhandler("navigation", datas, data => {
          console.log(data);
        });
      } else {
        this.$toast("位置信息不完整！");
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
      let data = getCache("bigTruckDriverList").docId;
      this.$loading.open();
      setTimeout(() => {
        if (this.flag) {
          // window.instance ? window.instance.close() : "";
          // window.instance = this.$toast("网络不给力，请稍后再试！");
          this.$loading.close();
          return;
        }
      }, 30000);
      let params = {
        docId: data
      };
      this.$http.post("/getDeliveryListByOrder", params).then(res => {
        let result = res.data;

        if (result.ret_code == 0) {
          this.nextPageStatus = result.data.nextPageStatus;
          let data = result.data.data[0];
          this.distanceLimit = result.data.distanceLimit;
          this.data = data;

          var map = new AMap.Map("container", {});
          var truckOptions = {
            map: map,
            policy: 0,
            size: 1,
            // city:'beijing',
            panel: "panel"
          };
          var driving = new AMap.TruckDriving(truckOptions);
          var infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -30)
          });
          let that = this;
          var path = [];
          let position = getCache("position");

          path.push({
            lnglat: [position.lng, position.lat]
          }); //起点
          if (that.type == 1) {
            path.push({ lnglat: [data.rcvlngtud, data.rcvlattud] }); //终点
            var marker = new AMap.Marker({
              position: [data.rcvlngtud, data.rcvlattud],
              map: map
            });
            marker.content = data.rcvwhsads;
            marker.on("click", markerClick);
            marker.emit("click", { target: marker });
          } else {
            path.push({ lnglat: [data.dellngtud, data.dellattud] }); //终点

            var marker = new AMap.Marker({
              position: [data.dellngtud, data.dellattud],
              map: map
            });
            marker.content = data.delwhsnum;

            // marker.setLabel({
            //   offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
            //   content: "<div class=''>"+data.delwhsnum+"</div>", //设置文本标注内容
            //   direction: "right" //设置文本标注方位
            // });
            marker.on("click", markerClick);
            marker.emit("click", { target: marker });
          }

          function markerClick(e) {
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
          }
          map.setFitView();

          driving.search(path, function(status, result) {
            that.flag = false;
            that.$loading.close();
            console.log(path);
            // result即是对应的货车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === "complete") {
              window.instance ? window.instance.close() : "";
              window.instance = that.$toast("绘制货车路线完成");
              console.log(result);
              console.log("绘制货车路线完成");
              that.enclosure = result.routes[0].distance;
              console.log(result);
            } else {
              window.instance ? window.instance.close() : "";
              window.instance = that.$toast("获取货车规划数据失败：" + result);
              console.log("获取货车规划数据失败：" + result);
            }
          });
        }
      });
    },
    arrival() {
      if (this.enclosure / 1 == -1) {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("围栏获取失败！");
        //  return false;
      }
      console.log(this.distanceLimit, this.enclosure, this.nextPageStatus);
      if (this.distanceLimit / 1 >= this.enclosure / 1) {
        let pageStatuList = getCache("PageStatus");
        //console.log(this.nextPageStatus);
        for (let k in pageStatuList) {
          if (this.nextPageStatus == k) {
            // console.log(pageStatuList[k]);
            this.$router.replace({
              path: `/bigTruckDriver/${pageStatuList[k]}`
            });
          }
        }
      } else {
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast(
          "距离目的地还有" +
            this.enclosure +
            "米，小于" +
            this.distanceLimit +
            "米，才能点击到达！"
        );
      }

      // if (this.type == 1) {
      //   this.$router.replace({
      //     path: "/bigTruckDriver/process"
      //   });
      // } else if (this.type == 2) {
      //   this.$router.replace({
      //     path: "/bigTruckDriver/palletReturn"
      //   });
      // } else {
      //   this.$router.replace({
      //     path: "/bigTruckDriver/cabinHygiene"
      //   });
      // }
    },
    showDetails() {
      this.heighter = !this.heighter;
    },
    Situation(ind){
      this.situation = ind
    }
  }
};
</script>

<style lang="scss" scoped>
.common-page-content {
  overflow-y: scroll;
  padding-bottom: 0.5rem;
}
.common-page-flex {
  height: 100vh;
}
.oprateBox {
  @include flex(row);
  justify-content: space-around;
  align-items: center;
  height: 0.54rem;
  p {
    @include flex(column);
    justify-content: space-around;
    align-items: center;
    img {
      width: 0.26rem;
      height: 0.26rem;
    }
    span {
      font-size: 0.13rem;
    }
  }
}
.amap-container {
  height: 5rem;
}

.panel {
  height: 0.66rem;
  width: 100vw;
  position: absolute;
  right: 0;
  top: 1.36rem;
  overflow-y: scroll;
}
.heighter {
  display: none;
  height: 5.47rem;
  width: 100vw;
  position: absolute;
  right: 0;
  top: 3.77rem;
  overflow-y: scroll;
}
.CustomerInfo {
  // height: 2rem;
  position: fixed;
  bottom: 0.7rem;
  left: 0.1rem;
  right: 0.1rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.05rem;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
  font-size: 0.16rem;
  padding: 0.05rem 0.15rem 0.15rem 0.15rem;
  font-family: PingFangSC-Medium;
  font-weight: 400;
  color: #333;

  .CustomerNum {
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    line-height: 0.4rem;
    border-bottom: 1px solid #e6e6e6;
    b {
      color: #f42d3b;
    }
    span {
      color: #333;
    }
    .Btn {
      float: right;

      button {
        border-radius: 0.2rem;
  background: rgba(255, 244, 244, 1);
        border: 1px solid rgba(227, 29, 43, 1);
        padding: 0.04rem 0.12rem;
        font-size: 0.14rem;
        color: rgba(227, 29, 43, 1);
      }
    }
    .Btn1 {
      button {
        margin-left: 0.1rem;
      }
    }
    
    .active{
      button{
 background: rgba(244, 45, 59, 1);
        border: 1px solid rgba(227, 29, 43, 1);
        color: #fff;
      }
      
    }
  }
  .addrss{
    font-size:.14rem;
    color:#666;
    margin: .05rem 0;
    b{
      width:85%;
      display: inline-block;
      vertical-align: top;
    color:#333;

    }
  }
  .Customer{
    font-size:.14rem;
    color:#666;
    margin-bottom: .15rem;
    b{
      width:80%;
      display: inline-block;
      vertical-align: top;
    color:#333;

    }
  }
  .table_info{
    width:100%;
    div{
      width:50%;
      text-align: center;
      display: inline-block;
    }
  }
}
</style>