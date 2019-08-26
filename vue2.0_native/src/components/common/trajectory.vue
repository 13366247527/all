<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>

    <el-amap
      vid="amap"
      :plugin="plugin"
      class="amap-container"
      :amap-manager="amapManager"
      :zoom="zoom"
      :center="center"
    ></el-amap>
    <el-amap-marker vid="marker" :position="center" :label="label"></el-amap-marker>

    <mt-popup
      v-model="popupVisible"
      :modal="modalFlag"
      :class="heighter?'heighter':'panel'"
      id="panel"
      ref="panel"
      @click.native="showDetails"
      position="right"
    ></mt-popup>
    <ul class="content">
      <li>
        <span>出发时间：</span>
        <span class="red">2019/09/09</span>
      </li>
      <li>
        <span>出发地点：</span>
        <span class="red">2019/09/09</span>
      </li>
      <li>
        <span>到达时间：</span>
        <span class="red">2019/09/09</span>
      </li>
      <li>
        <span>到达地点：</span>
        <span class="red">2019/09/09</span>
      </li>
    </ul>
  </div>
</template>

<script>
// eslint-disable-next-line
import { Popup } from "mint-ui";
import HeaderDefault from "@/components/common/HeaderDefault";
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager();

export default {
  components: { HeaderDefault },
  data() {
    let self = this;
    return {
      title: "行车轨迹",
      popupVisible: false,
      modalFlag: false,
      heighter: true,
      popupCon: "",
      amapManager,
      label: {
        content: "银网中心",
        offset: [10, 12]
      },
      center: [116.320757, 39.976709],
      lng: 116.320757,
      lat: 39.976709,
      zoom: 12,
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

  mounted() {
    this.$nextTick(function() {
      this.nav();
    });
  },
  methods: {
    nav() {
      //this.popupVisible = true;
      let _this = this;
      let o = amapManager.getMap();
      const truckOptions = {
        map: o,
        policy: 0,
        size: 1,
        panel: "panel"
      };

      // eslint-disable-next-line
      let driving = new AMap.TruckDriving(truckOptions);
      var path = [];
      path.push({ lnglat: [116.303843, 39.983412] }); //起点
      path.push({ lnglat: [116.321354, 39.896436] }); //途径
      path.push({ lnglat: [116.407012, 39.992093] }); //终点
      driving.search(path, function(status, result) {
        if (status === "complete") {
          console.log("绘制货车路线完成");
        } else {
          _this.$toast("获取货车规划数据失败：" + result);
        }
      });
    },

    showDetails() {
      this.heighter = !this.heighter;
    }
  }
};
</script>

<style lang="scss" scoped>
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
.content .inline-statu {
  display: inline-block;
  width: 50%;
  line-height: 0.54rem;
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
  height: 5.47rem;
  width: 100vw;
  position: absolute;
  right: 0;
  top: 3.77rem;
  overflow-y: scroll;
}
.mapContainer {
  width: 100%;
  height: 3.3rem;
}
.content {
  padding: 0 0.16rem;
}
.content li {
  // padding-left: 0.2rem;
  height: 0.44rem;
  display: flex;
  align-items: center;
  font-size: 0.15rem;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  border-bottom: 1px solid rgba(236, 236, 236, 1);
}
.red {
  color: rgba(227, 29, 43, 1);
}
.green {
  color: #00b42a;
}
</style>

