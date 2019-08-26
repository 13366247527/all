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
    >
      <el-amap-marker vid="marker" :position="center" :label="label"></el-amap-marker>
    </el-amap>
    <!-- <mt-popup
        v-model="popupVisible"
        :modal="modalFlag"
        :class="heighter?'heighter':'panel'"
        id="panel"
        ref="panel"
        @click.native="showDetails"
        position="right">
    </mt-popup>-->
    <ul class="content">
      <li class="inline-statu">
        <span>车号：</span>
        <span class="red">{{carNumber}}</span>
      </li>
      <li class="inline-statu">
        <span>状态：</span>
        <span class="red" v-if="true">{{state}}</span>
        <span class="green" v-else>{{state}}</span>
      </li>
      <li>
        <span>位置：</span>
        <span>{{position}}</span>
      </li>
      <li class="inline-statu">
        <span>预到时间：</span>
        <span class="red">{{time}}</span>
      </li>
      <li class="inline-statu">
        <span>电话：</span>
        <span class="red">{{tel}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
// eslint-disable-next-line
//import { Popup } from 'mint-ui';
import HeaderDefault from "@/components/common/HeaderDefault";
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager();

export default {
  components: { HeaderDefault },
  data() {
    let self = this;
    return {
      title: "",
      popupVisible: false,
      modalFlag: false,
      heighter: true,
      popupCon: "",
      amapManager,
      label: {
        content: "",
        offset: [10, 12]
      },
      carNumber: "",
      state: "",
      position: "",
      time: "",
      tel: "",

      center: [116.320757, 39.976709],
      lng: 116.320757,
      lat: 39.976709,
      zoom: 15,
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
                } else {
                  self.lng = self.lng;
                  self.lat = self.lat;
                }
                self.center = [self.lng, self.lat];
                self.loaded = true;
                self.$nextTick();
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
      // console.log(from.name)
      vm.title = "车辆位置";
      // if(from.name == 'outFacMng'){
      //     vm.title = '送货导航'
      // }else if(from.name == 'trayIntoFac'){
      //     vm.title = '回厂导航'
      // }else{
      //     vm.title = '装货导航'
      // }
    });
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.query.id;
      if (id) {
        let params = {
          id: id
        };
        this.$http
          .get("/dispatcherStatist/vehicleLocation", params)
          .then(res => {
            let result = res.data;
            if (result.ret_code == 0) {
              this.lng = result.data.lngtud;
              this.lat = result.data.lattud;
              this.center = [this.lng, this.lat];

              this.label.content = result.data.vehlicnum;
              this.carNumber = result.data.vehlicnum;
              this.state = result.data.type;
              this.position = result.data.vehadr;
              this.time = result.data.plndellintim;
              this.tel = result.data.mobilenum;
            }
          });
      } else {
        let data = this.$route.query.data;
        this.lat = data.lattud;
        this.lng = data.lngtud;
        this.center = [this.lng, this.lat];
        this.label.content = data.vehlicnum;
        (this.carNumber = data.vehlicnum),
          (this.state = data.type),
          (this.position = data.vehadr),
          (this.time = data.plndellintim),
          (this.tel = data.mobilenum);
      }
    },
    nav() {
      this.popupVisible = true;
      let _this = this;
      let o = amapManager.getMap();
      const truckOptions = {
        map: o,
        policy: 0,
        size: 1,
        panel: "panel"
      };

      // eslint-disable-next-line
      // let driving = new AMap.TruckDriving(truckOptions);
      // let path = [
      //     {keyword:'北京站',city:'010'},//起点
      //     {keyword:'北京大学',city:'010'}//终点
      // ];
      // driving.search(path, function(status, result) {
      //     if (status === 'complete') {
      //         console.log('绘制货车路线完成')
      //     } else {
      //         _this.$toast('获取货车规划数据失败：' + result)
      //     }
      // })
    },
    // arrival(){
    //     if(this.title == '送货导航'){
    //         this.$router.push({
    //             path: '/bigTruckDriver/process'
    //         })
    //     }else if(this.title == '回厂导航'){
    //         this.$router.push({
    //             path: '/bigTruckDriver/palletReturn'
    //         })
    //     }else{
    //         this.$router.push({
    //             path: '/bigTruckDriver/cabinHygiene'
    //         })
    //     }
    // },
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

