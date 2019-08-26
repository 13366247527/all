<template>
  <div>
    <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
      <!--导航菜单-->
      <el-menu class="el-menu-vertical-demo" v-show="!collapsed">
        <el-row class="line">
          <el-col :span="24" class="line-con">
            <el-col :span="8" class="carNum">车牌号:</el-col>
            <el-col :span="10" class="car_Num">{{truckNum}}</el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8" class="carNum">装运单号:</el-col>
            <el-col :span="12" class="car_Num">
              <el-select v-model="value" placeholder="请选择" @change="playbacks" style="color:#ccc;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.orderId"
                  :value="item.orderId"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="status-con">
          <el-col :span="12" class="line-con">{{avgSpeed}}</el-col>
          <el-col :span="12" class="line-con">{{totalMlg}}</el-col>
        </el-row>
        <el-row class="status-cons">
          <el-col :span="12" class="line-con">平均速度 (km/h)</el-col>
          <el-col :span="12" class="line-con">总里程(km)</el-col>
        </el-row>
        <el-row class="status-head">
          <el-col :span="8" class="line-con">时间</el-col>
          <el-col :span="8" class="line-con">当前时速</el-col>
          <el-col :span="8" class="line-con">已行驶</el-col>
        </el-row>
        <div class="out-box">
          <el-row class="table-box">
            <el-row class="status-tab" v-for="(item,index) in tableData" :key="index">
              <el-col :span="8" class="line-con-tan">
                <span>{{item.gtm}}</span>
              </el-col>
              <el-col :span="8" class="line-con-tan">
                <span>{{item.spd}}</span>
              </el-col>
              <el-col :span="8" class="line-con-tan">
                <span>{{item.mlg}}</span>
              </el-col>
            </el-row>
          </el-row>
        </div>
      </el-menu>
    </aside>

    <section class="content-container">
      <div class="grid-content bg-purple-light">
        <el-col :span="24" class="content-wrapper" id="quanping">
          <div>
            <div id="container"></div>
            <el-row class="speed-box">
              <el-col :span="3" class="line-con3">
                <el-col :span="12" class="line-conBtn line-con">
                  <span class="point" :class="active==0?'actives':''" @click="stopNote(0)">时间节点</span>
                </el-col>
                <el-col :span="12" class="line-conBtn line-con">
                  <span class="point" :class="active==1?'actives':''" @click="stopNote(1)">停车记录</span>
                </el-col>
              </el-col>

              <el-col :span="3" class="line-con line-con2">
                <el-col :span="8" class="line-con">
                  <span
                    class="iconfont icon-bofang"
                    v-if="iconShow"
                    @click="speed = totalMlg*1000 ,iconShow = false,startAnimation()"
                  ></span>
                  <span
                    class="iconfont icon-zanting"
                    v-else
                    @click="iconShow = true,pauseAnimation()"
                  ></span>
                </el-col>
                <el-col :span="8" class="line-con">
                  <span class="iconfont icon-huanyuan" @click="stopAnimation(),iconShow = true"></span>
                </el-col>
              </el-col>
              <el-col :span="4" class="line-con3">
                <el-col :span="8" class="line-con">
                  <span class="point"
                    @click="speed = totalMlg*1000/2,dataNew(),actives=1,iconShow = false"
                    :class="this.actives==1?'actives':''"
                  >慢速</span>
                </el-col>
                <el-col :span="8" class="line-con">
                  <span class="point"
                    @click="speed = totalMlg*1000 ,dataNew(),actives=2,iconShow = false"
                    :class="this.actives==2?'actives':''"
                  >中速</span>
                </el-col>
                <el-col :span="8" class="line-con">
                  <span class="point"
                    @click="speed = totalMlg*1000*2,dataNew(),actives=3,iconShow = false"
                    :class="this.actives==3?'actives':''"
                  >快速</span>
                </el-col>
              </el-col>
              <el-col :span="6" class="line-con4">
                <!-- <el-col :span="8" class="line-con">
               
                <span>存储路线</span>
               
                </el-col>-->
              </el-col>
            </el-row>
          </div>

          <el-table v-show="active=='0'"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            height="150"
            :data="tableDataList"
            border
            stripe
            style="position: absolute; bottom: 0; z-index: 999;"
          >
            <el-table-column align="center" prop="receipttime" label="接单时间"></el-table-column>
            <el-table-column align="center" prop="plndeldat" label="约到时间"></el-table-column>
            <el-table-column align="center" prop="arrivecustomertime" label="到达时间"></el-table-column>
            <el-table-column align="center" prop="admissiontime" label="入场时间"></el-table-column>
            <el-table-column align="center" prop="arrivespacetime" label="到达车位"></el-table-column>
            <el-table-column align="center" prop="rdytime" label="准备完成"></el-table-column>
            <el-table-column align="center" prop="startloadtime" label="开始装车"></el-table-column>
            <el-table-column align="center" prop="loadcompletedtime" label="装车完成"></el-table-column>
            <el-table-column align="center" prop="appearancetime" label="出场时间"></el-table-column>
            <el-table-column align="center" prop="arrivecustomertime" label="到达客户"></el-table-column>
            <el-table-column align="center" prop="startunloadtime" label="开始卸货"></el-table-column>
            <el-table-column align="center" prop="completunloadtime" label="卸货完成"></el-table-column>
            <el-table-column align="center" prop="signaturetime" label="签收完成"></el-table-column>
          </el-table>

          <el-table v-show="active==1"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            height="150"
            :data="parkInfo"
            border
            stripe
            style="position: absolute; bottom: 0; z-index: 999;"
          >
             <el-table-column align="center" prop="number" label="停车次数" width="100"></el-table-column>
            <el-table-column align="center" prop="bte" label="开始时间" width="200"></el-table-column>
            <el-table-column align="center" prop="ete" label="结束时间" width="200"></el-table-column>
            <el-table-column align="center" prop="timeUsed" label="停车时长" width="120"></el-table-column>
            <el-table-column align="center" prop="lon" label="经度" width="80"></el-table-column>
            <el-table-column align="center" prop="lat" label="纬度" width="80"></el-table-column>
            <el-table-column align="center" prop="adr" label="停车位置"></el-table-column>
          </el-table>
        </el-col>
      </div>
    </section>
  </div>
</template>

<script>
var marker, lineArr, map, polyline, passedPolyline, geocoder, lnglats;
import { selectData, historyTruckTrack, orderList } from "../../api/api";
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      truckNum: "",
      totalMlg: "",
      avgSpeed: "",
      orderId: "",
      input: "123",
      speed: 200,
      active:0,
      actives: 2,
      lineArrNew: [],
      checkAll: false,
      isIndeterminate: true,
      dataList: "",
      checkList: [],
      parkInfo:[],
      collapsed: false,
      name: "changsha",
      iconShow: true,
      tableData: [],
      tableDataList: [],
      options: [],
      value: ""
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    startAnimation() {
      this.dataNew();
    },
    pauseAnimation() {
      marker.pauseMove();
    },
    playbacks() {
      let id = this.$route.query.id;
      let index = this.$route.query.index;
      const data = new URLSearchParams();
      data.append("truckNum", index);
      data.append("orderId", this.value);
     // data.append("orderId", "201957814295202101");

      historyTruckTrack(data).then(res => {
        if (res.ret_code === "0") {
          if(res.data.parkInfo.length==0){
            this.parkInfo =[]
          }else{
 this.parkInfo = res.data.parkInfo
          }
         
         
          this.totalMlg = res.data.totalMlg;
          this.avgSpeed = res.data.avgSpeed;
          this.tableDataList = []
          this.tableDataList.push(res.data);
          lnglats = [];
          res.data.gps.forEach((item, index) => {
            lnglats.push([item.lon, item.lat]);
          });
          this.lineArr = lnglats;
          this.tableData = res.data.gps;

          this.lineArr.length == 0
            ? (this.lineArr = [[116.478935, 39.997761]])
            : "";
          map = new AMap.Map("container", {
            resizeEnable: true,
            center: [this.lineArr[0][0], this.lineArr[0][1]],
            zoom: 17
          });

          marker = new AMap.Marker({
            map: map,
            position: [this.lineArr[0][0], this.lineArr[0][1]],
            icon:
              "http://gl-images.logwsd.com/group1/M00/00/1D/rBAADFzx6e-Aen55AAAChJvDfC0403.png",
            offset: new AMap.Pixel(-20, -8),
            autoRotation: true,
            angle: -90
          });

          // 绘制轨迹
          polyline = new AMap.Polyline({
            map: map,
            path: this.lineArr,
            showDir: true,
            strokeColor: "#28F", //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 6 //线宽
            // strokeStyle: "solid"  //线样式
          });

          passedPolyline = new AMap.Polyline({
            map: map,
            // path: lineArr,
            strokeColor: "#AF5", //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 6 //线宽
            // strokeStyle: "solid"  //线样式
          });
          
var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30)
        });
        for (var i = 0; i < this.parkInfo.length; i++) {
          var markerContent = `<div class="custom-content-marker"><img src="http://gl-images.logwsd.com/group1/M00/00/1E/rBAADFz8usKAYy7BAAAFvD_1lbI998.png"></div>`;
          var markers = new AMap.Marker({
            position: [this.parkInfo[i].lon, this.parkInfo[i].lat],
            content: markerContent,
            map: map
          });
          markers.content = `<div class="show">
                <ul>
                  <li>
                    <span class="left-name">序号:</span>
                    <span>${i + 1}</span>
                  </li>
                  <li>
                    <span class="left-name">开始时间:</span>
                    <span>${this.parkInfo[i].bte}</span>
                  </li>
                  <li>
                    <span class="left-name">结束时间:</span>
                    <span>${this.parkInfo[i].ete}</span>
                  </li>
                  <li>
                    <span class="left-name">经度:</span>
                    <span>${this.parkInfo[i].lon}</span>
                  </li>
                  <li>
                    <span class="left-name">纬度:</span>
                    <span>${this.parkInfo[i].lat}</span>
                  </li>
                  <li>
                    <span class="left-name" >时长:</span>
                    <span>${this.parkInfo[i].timeUsed}</span>
                  </li>
                  <li>
                    <span class="left-name" >位置:</span>
                    <span>${this.parkInfo[i].adr}</span>
                  </li>
                </ul>
              </div>`;
          markers.on("click", markerClick);
          //  marker.emit('click', {target: marker});
        }
        function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(map, e.target.getPosition());
        }

          map.setFitView();
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    dataNew() {
      var Position = marker.getPosition();
      var p1 = [Position.lng, Position.lat];
      var distanceList = [];
      var dis, zong, indexs, diss, distance;
      this.lineArr.forEach(element => {
        var p2 = [element.lng, element.lat];
        dis = AMap.GeometryUtil.distance(p1, p2);
        distanceList.push(dis);
      });
      indexs = distanceList.findIndex((value, index, arr) => {
        return value == Math.min(...distanceList);
      });

      this.lineArrNew = [];
      var lineArrOld = [];
      this.lineArr.forEach((item, index) => {
        if (index >= indexs) {
          this.lineArrNew.push([item.lng, item.lat]);
        }
        if (index <= indexs) {
          lineArrOld.push([item.lng, item.lat]);
        }
      });
      if (this.lineArrNew[1]) {
        zong = AMap.GeometryUtil.distance(
          this.lineArrNew[0],
          this.lineArrNew[1]
        );
        distance = AMap.GeometryUtil.distance(p1, this.lineArrNew[1]);
        diss = AMap.GeometryUtil.distance(p1, this.lineArrNew[0]);

        if (distance + diss - 0.1 >= zong) {
          this.lineArrNew.unshift(p1);
          lineArrOld.pop();
          lineArrOld.push(p1);
        } else {
          this.lineArrNew.splice(0, 1, p1);

          lineArrOld.push(p1);
        }
      }

      // console.log(this.lineArrNew)

      var polyline = new AMap.Polyline({
        map: map,
        path: this.lineArrNew,
        showDir: true,
        strokeColor: "#28F", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });
      new AMap.Polyline({
        map: map,
        path: lineArrOld,
        showDir: true,
        strokeColor: "#AF5", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });

      var passedPolyline = new AMap.Polyline({
        map: map,
        // path: lineArr,
        strokeColor: "#AF5", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });
      marker.moveAlong(this.lineArrNew, this.speed);
      marker.on("moving", function(e) {
        passedPolyline.setPath(e.passedPath);
      });
    },
    stopNote(x){
      this.active = x;

    },
    stopAnimation() {
      marker.moveAlong(this.lineArr, this.speed);
      this.dataNew();
      marker.stopMove();
    },
    getData: function() {
      selectData().then(res => {
        if (res.data.ret_code === "0") {
          this.dataList = res.data.data;
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    }
  },
  mounted() {
    this.getData();

    let id = this.$route.query.id;
    let index = this.$route.query.index;
    this.truckNum = index;
    this.orderId = id;
    const datas = new URLSearchParams();
    datas.append("truckNum", index);
    orderList(datas).then(res => {
      console.log(res);
      this.options = res.data;
    });

    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
      this.sysUserAvatar = user.avatar || "";
    }

    // lineArr = [
    //   [116.478935, 39.997761],
    //   [116.478939, 39.997825],
    //   [116.478912, 39.998549],
    //   [116.478998, 39.998555],
    //   [116.479282, 39.99856],
    //   [116.479658, 39.998528],
    //   [116.480151, 39.998453],
    //   [116.480784, 39.998302],
    //   [116.481149, 39.998184],
    //   [116.481573, 39.997997],
    //   [116.481863, 39.997846],
    //   [116.482072, 39.997718],
    //   [116.482362, 39.997718],
    //   [116.483633, 39.998935],
    //   [116.48367, 39.998968],
    //   [116.484648, 39.999861]
    // ];

    map = new AMap.Map("container", {
      resizeEnable: true,
      center: [116.397428, 39.90923],
      zoom: 17
    });

    // var markerContent =
    //           "" +
    //           '<div class="custom-content-marker">' +
    //           '   <img src="https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png">' +
    //           '   <div class="close-btn" style="background:rgba(249,249,249,1);border:1px solid rgba(192, 192, 192, 1);border-radius:2px;padding: 5px;max-width:100px;margin-left: 10px;margin-top: -5px;">' +
    //     "1234565678900 987654323 4567890 71234"  +
    //           "</div>" +
    //           "</div>";
    //          marker = new AMap.Marker({
    //           position: [116.478935, 39.997761],
    //           content: markerContent,
    //           map: map,

    //         });

    //         var markerContent =
    //           "" +
    //           '<div class="custom-content-marker">' +
    //           '   <img src="https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png">' +
    //           '   <div class="close-btn" style="background:rgba(249,249,249,1);border:1px solid rgba(192, 192, 192, 1);border-radius:2px;padding: 5px;max-width:100px;margin-left: 10px;margin-top: -5px;">' +
    //           1234567 +
    //           "</div>" +
    //           "</div>";
    //          marker = new AMap.Marker({
    //           position: [116.484648, 39.999861],
    //           content: markerContent,
    //           map: map,

    //         });

    // marker = new AMap.Marker({
    //   map: map,
    //   position: [116.478935, 39.997761],
    //   icon:
    //     "http://gl-images.logwsd.com/group1/M00/00/1D/rBAADFzx6e-Aen55AAAChJvDfC0403.png",
    //   offset: new AMap.Pixel(-20, -8),
    //   autoRotation: true,
    //   angle: -90
    // });

    // // 绘制轨迹
    // polyline = new AMap.Polyline({
    //   map: map,
    //   path: lineArr,
    //   showDir: true,
    //   strokeColor: "#28F", //线颜色
    //   // strokeOpacity: 1,     //线透明度
    //   strokeWeight: 6 //线宽
    //   // strokeStyle: "solid"  //线样式
    // });

    // passedPolyline = new AMap.Polyline({
    //   map: map,
    //   // path: lineArr,
    //   strokeColor: "#AF5", //线颜色
    //   // strokeOpacity: 1,     //线透明度
    //   strokeWeight: 6 //线宽
    //   // strokeStyle: "solid"  //线样式
    // });

    // map.setFitView();
  }
};
</script>

<style scoped lang="scss">
.main {
  display: flex;
  // background: #324057;
  position: absolute;
  top: 80px;
  bottom: 0px;
  overflow: hidden;
  aside {
    flex: 0 0 290px;
    width: 290px;
    // position: absolute;
    // top: 0px;
    // bottom: 0px;
    height: 100%;
    color: #fff !important;
    background: rgba(35, 47, 63, 1);
    .status-con {
      margin-top: 20px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(35, 47, 63, 1);
      opacity: 0.7;
      font-size: 26px;
      font-family: PingFangSC-Regular;
    }
    .status-cons {
      margin-bottom: 20px;
      text-align: center;
      background: rgba(35, 47, 63, 1);
      opacity: 0.7;
      font-size: 16px;
      font-family: PingFangSC-Regular;
    }

    .out-box {
      width: 100%;
      position: absolute;
      top: 220px;
      bottom: 0px;
      left: 0;
      right: 0;
    }
    .table-box {
      height: 100%;
      overflow-y: auto;
    }
    .table-box::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .table-box::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(35, 47, 63, 1);
      background: rgba(35, 47, 63, 1);
    }
    .table-box::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(35, 47, 63, 1);
      border-radius: 10px;
      background: rgba(35, 47, 63, 1);
    }
    .status-head {
      height: 50px;
      line-height: 50px;
      text-align: center;
      opacity: 0.7;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      background: rgba(46, 61, 80, 1);
    }
    .status-tab:nth-child(2n-1) {
      min-height: 50px;
      text-align: center;
      opacity: 0.7;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      background: rgba(46, 61, 80, 1);
    }
    .status-tab:nth-child(2n) {
      min-height: 50px;
      text-align: center;
      opacity: 0.7;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      background: rgba(35, 47, 63, 1);
    }
    .line-con-tan {
      display: table;
      border-left: 1px solid #76808e;
      height: 50px;
      //border-right: 1px solid #76808e;
      span {
        display: table-cell;
        vertical-align: middle;
      }
    }
    .line {
      .el-input {
        top: 10px;
        left: 20px;
      }
    }
    .select {
      height: 50px;
      line-height: 50px;
      background: rgba(46, 61, 80, 1);
      opacity: 0.8;
      text-align: center;
      .select-con:hover {
        color: #ccc;
      }
    }
    .el-menu {
      height: 100%;
      background: rgba(35, 47, 63, 1);
    }
    .el-date-editor--daterange.el-input {
      width: 240px;
      margin-top: 10px;
      background: rgba(35, 47, 63, 1);
    }
    .el-table tr {
      background: #000 !important;
    }
    .collapsed {
      width: 60px;
      .item {
        position: relative;
      }
      .submenu {
        position: absolute;
        top: 0px;
        left: 60px;
        z-index: 999;
        height: auto;
        display: none;
      }
    }
  }
  .carNum {
    text-align: right;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
  }
  .car_Num {
    margin-left: 10px;
    height: 40px;
    font-size: 18px;
    line-height: 40px;
    color: rgba(255, 255, 255, 0.7);
  }
  .menu-collapsed {
    flex: 0 0 60px;
    width: 60px;
  }
  .menu-expanded {
    flex: 0 0 290px;
    width: 290px;
  }
  .speed-box {
    position: fixed;
    bottom: 150px;
    height: 60px;
    width: 100%;
    text-align: center;
    background: rgba(217, 217, 217, 1);
    line-height: 60px;
    z-index: 999;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
  .line-conBtn {
    //background: lime;
  }
  .line-con2 {
    margin-left: 300px;
  }
  .line-con3 {
    margin-left: 0px;
    span {
      padding: 5px 10px;
      background: linear-gradient(
        0deg,
        rgba(241, 243, 247, 1),
        rgba(255, 255, 255, 1)
      );
      border: 1px solid rgba(206, 208, 218, 1);
      border-radius: 2px;
    }
  }
  .line-con4 {
    margin-left: 50px;
    span {
      padding: 5px 10px;
      background: linear-gradient(
        0deg,
        rgba(241, 243, 247, 1),
        rgba(255, 255, 255, 1)
      );
      border: 1px solid rgba(206, 208, 218, 1);
      border-radius: 2px;
    }
  }
  .content-container {
    // background: #f1f2f7;
    //flex: 1;
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    left: 290px;
    //overflow-y: scroll;
    // padding: 20px;
    .breadcrumb-container {
      //margin-bottom: 15px;
      .title {
        width: 200px;
        float: left;
        color: #475669;
      }
      .breadcrumb-inner {
        float: right;
      }
    }
    .content-wrapper {
      background-color: #fff;
      box-sizing: border-box;
    }
  }
}
.actives {
  background: #e31d2b !important;
  color: #fff !important;
}
.iconfont {
  font-size: 26px;
  font-weight: 900;
  cursor: pointer;
}
.point {
  cursor: pointer;
}
</style>