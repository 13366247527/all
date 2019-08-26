<template>
  <div>
    <!-- <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
      
      <el-menu class="el-menu-vertical-demo" v-show="!collapsed">
        <el-row class="line">
          <el-col :span="12" class="line-con">
            <el-col :span="7">
              <div class="line-statu line-org"></div>
            </el-col>
            <el-col :span="7">
              <div class="line-font">所有</div>
            </el-col>
            <el-col :span="10">
              <div class="line-num">{{dataList.vehicleAll}}</div>
            </el-col>
          </el-col>
          <el-col :span="12" class="line-con">
            <el-col :span="7">
              <div class="line-statu line-gre"></div>
            </el-col>
            <el-col :span="7">
              <div class="line-font">在线</div>
            </el-col>
            <el-col :span="10">
              <div class="line-num">{{dataList.vehiclesOnline}}</div>
            </el-col>
          </el-col>
        </el-row>
        <template v-for="(item,index) in dataList.retList">
          <el-submenu :index="index+''" :key="index" v-if="item.vehicles.length!=0">
            <template slot="title">
              <img :src="tubiao">
              {{item.vehiclegroups}}
            </template>
            <el-row class="select">
              <el-col :span="12" class="select-con">
                <div @click="handleCheckAllChange(index)">全选</div>
              </el-col>
              <el-col :span="12" class="select-con">
                <div @click="handleCheckAlledChange(index)">反选</div>
              </el-col>
            </el-row>
            <el-checkbox-group v-model="checkList" @change="chekBoxs(index)">
              <el-checkbox
                v-for="(child,index) in item.vehicles"
                :key="index"
                :label="child.vehlicnum"
              >{{child.vehlicnum}}</el-checkbox>
            </el-checkbox-group>
          </el-submenu>
        </template>
      </el-menu>
    </aside> -->

    <section class="content-container">
      <div class="grid-content bg-purple-light">
        <!-- <el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
        </el-col>-->
        <el-table
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          height="175"
          :data="tableData"
          border
          stripe
          style="width: 100%;  position: absolute; bottom: 0; z-index: 999;"
        >
          <el-table-column align="center" prop="number" label="序号" width="70"></el-table-column>
          <el-table-column align="center" prop="vno" label="车牌号" width="90"></el-table-column>
          <el-table-column align="center" prop="spd" label="速度" width="80"></el-table-column>
          <el-table-column align="center" prop="truckNumStatus" label="状态" width="101"></el-table-column>
          <el-table-column align="center" prop="appearancetime" label="出厂时间" width="160"></el-table-column>
          <el-table-column align="center" prop="utc" label="定位时间" width="160"></el-table-column>
          <el-table-column align="center" prop="tradocnum" label="运货单号" width="190"></el-table-column>
          <el-table-column align="center" prop="outman" label="客户" width="250"></el-table-column>
          <el-table-column align="center" prop="123" label="预计到达时间" width="160"></el-table-column>
          <el-table-column align="center" prop="adr" label="当前位置" width="300"></el-table-column>
        </el-table>
        <el-col :span="24" class="content-wrapper">
          <div id="quanping">
            <div id="container"></div>
          </div>
          <!-- <transition name="fade" mode="out-in">
              <router-view></router-view>
          </transition>-->
        </el-col>
      </div>
    </section>
  </div>
</template>

<script>
var map, lnglats, positions;
var markers = [];
import { selectData, lastLocation } from "../../api/api";
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
      tubiao: require("@/assets/tubiao.png"),
      checkAll: false,
      isIndeterminate: true,
      dataList: "",
      checkList: [],
      collapsed: false,
      name: "changsha",
      tableData: [],
      positionList: ""
    };
  },
  watch: {
    checkList: {
      handler(a, b) {
        b = this.unique4(b);
        a = a.join(",");
        positions = "";
        if (this.checkList.length != 0) {
          this.lastLocations(a);
        } else {
          map.remove(markers);
          map.setZoom(5);
        }
      },
      deep: true
    }
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    getData: function() {
      selectData().then(res => {
        if (res.data.ret_code === "0") {
          this.dataList = res.data.data;
        } else if (res.data.ret_code === "2") {
          this.$message({
            type: "error",
            message: res.data.msg
          });
          this.$router.replace({ path: "/login" });
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    },
    lastLocations(a) {
      const data = new URLSearchParams();
      data.append("truckNum", a);
      lastLocation(data).then(res => {
        if (res.ret_code === "0") {
          this.positionList = res;
          this.tableData = res.data;
          lnglats = [];
          res.data.forEach((item, index) => {
            lnglats.push([item.lon, item.lat]);
            item.number = index + 1;
            if (item.truckNumStatus === "0") {
              item.truckNumStatus = "不在线";
            } else {
              item.truckNumStatus = "在线";
            }
          });
          this.tableData = res.data;
          var infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -30)
          });

          //  lnglats = [
          //   [116.368904, 39.923423],
          //   [116.382122, 39.921176],
          //   [116.387271, 39.922501],
          //   [116.398258, 39.9146]
          // ];

          map.remove(markers);
          var backColor;
          for (var i = 0, marker; i < lnglats.length; i++) {
            if (this.positionList.data[i].truckNumStatus === "不在线") {
              backColor = "#999";
            } else {
              backColor = "#E31D2B";
            }
            //map.remove(marker);
            var markerContent = `<div class="custom-content-marker"><img src="http://gl-images.logwsd.com/group1/M00/00/1D/rBAADFzw9lWAXmJ4AAADLaBVvpI525.png" style="transform: rotate(${
              this.positionList.data[i].drc
            }deg);"><div class="close-btn" style="background:${backColor};color:#fff;opacity: .7;padding: 5px;width:70px;margin-left: 30px;margin-top: -40px;">
          ${this.positionList.data[i].vno}
          </div><img class="shows"  style="display:none;margin-top:-30px;margin-left:-8px;width: 30px;"  src="http://gl-images.logwsd.com/group1/M00/00/1D/rBAADFz2QkWARCOEAAAPOYKylIc523.gif"></div>`;
            var marker = new AMap.Marker({
              position: lnglats[i],
              content: markerContent,
              extData: i,
              map: map
            });
            markers.push(marker);

            // marker.content = `<div class="show">
            //     <ul>
            //       <li>
            //         <span class="left-name">车队:</span>
            //         <span>${this.positionList.data[i].vehgrpnam}</span>
            //       </li>
            //       <li>
            //         <span class="left-name">车号:</span>
            //         <span>${this.positionList.data[i].vno}</span>
            //       </li>
            //       <li>
            //         <span class="left-name">运单号:</span>
            //         <span>${this.positionList.data[i].tradocnum}</span>
            //       </li>
            //       <li>
            //         <span class="left-name">客户:</span>
            //         <span>${this.positionList.data[i].outman}</span>
            //       </li>
            //       <li>
            //         <span class="left-name">位置:</span>
            //         <span>${this.positionList.data[i].adr}</span>
            //       </li>
            //       <li>
            //         <span class="left-names" >预计到达时间:</span>
            //         <span>${this.positionList.data[i].arrivalTime}</span>
            //       </li>
            //     </ul>
            //     <div class="show-bottom">
            //      <div class="left-bottom" onclick="trajectory(${
            //        this.positionList.data[i].vno
            //      })">行车轨迹</div>
            //      <div class="right-bottom" onclick="playback(${
            //        this.positionList.data[i].vno
            //      })">行车路线回放</div>
            //     </div>
            //   </div>`;

            marker.on("click", markerClick);
            // marker.emit("click", { target: marker });
          }
          let _this = this;
          function markerClick(e) {
            let index = e.target.getExtData();
            // document.getElementsByClassName("shows")[index].style.display =
            //   "none";
            var truckOptions = {
              size: 1
            };
            positions = [
              _this.positionList.data[index].lon,
              _this.positionList.data[index].lat
            ];
            if (
              _this.positionList.data[index].endLon &&
              _this.positionList.data[index].endLat
            ) {
           
            // 货车路径规划
            var driving = new AMap.TruckDriving(truckOptions);
            var path = [];

            // var distance = AMap.GeometryUtil.distance(
            //   [_this.positionList.data[index].lon,
            //     _this.positionList.data[index].lat],
            //   [ _this.positionList.data[index].endLon,
            //     _this.positionList.data[index].endLat]
            // );

            path.push({
              lnglat: [
                _this.positionList.data[index].lon,
                _this.positionList.data[index].lat
              ]
            }); //起点
            // path.push({ lnglat: [116.321354, 39.896436] }); //途径
            path.push({
              lnglat: [
                _this.positionList.data[index].endLon,
                _this.positionList.data[index].endLat
              ]
            }); //终点

            driving.search(path, (status, result) => {
              // document.getElementsByClassName("shows")[index].style.display =
              //   "none";
              var x = _this.positionList.data[index].utc;
              var time = new Date(x.replace("-", "/"));
              console.log(result)
              var b = result.routes[0].time / 60; //分钟数
              time.setMinutes(time.getMinutes() + b, time.getSeconds(), 0);
              var d = new Date(time);
              var dateY =
                d.getFullYear() +
                "-" +
                (d.getMonth() + 1) +
                "-" +
                d.getDate() +
                " " +
                d.getHours() +
                ":" +
                d.getMinutes() +
                ":" +
                d.getSeconds();
              _this.positionList.data[index].arrivalTime = dateY;
 
              e.target.content = `<div class="show">
            <ul>
              <li>
                <span class="left-name">车队:</span>
                <span>${_this.positionList.data[index].vehgrpnam}</span>
              </li>
              <li>
                <span class="left-name">车号:</span>
                <span>${_this.positionList.data[index].vno}</span>
              </li>
              <li>
                <span class="left-name">运单号:</span>
                <span>${_this.positionList.data[index].tradocnum}</span>
              </li>
              <li>
                <span class="left-name">客户:</span>
                <span>${_this.positionList.data[index].outman}</span>
              </li>
              <li>
                <span class="left-name">位置:</span>
                <span>${_this.positionList.data[index].adr}</span>
              </li>
              <li>
                <span class="left-names" >预计到达时间:</span>
                <span>${_this.positionList.data[index].arrivalTime}</span>
              </li>
            </ul>
            <div class="show-bottom">
             <div class="left-bottom" style="cursor: pointer;" onclick="trajectory(\'${
               _this.positionList.data[index].vno
             }\',\'${_this.positionList.data[index].orderId}\',\'${
                _this.positionList.data[index].tradocnum
              }\')"><div style="display: inline-block;vertical-align: -webkit-baseline-middle;font-size:16px;"><img src="http://gl-images.logwsd.com/group1/M00/00/1E/rBAADFz99FCAPPorAAABL8WWQi0203.png" style="margin-right:5px"></div>行车轨迹</div>
             <div class="right-bottom" style="cursor: pointer;" onclick="playback(\'${
               _this.positionList.data[index].vno
             }\',\'${
                _this.positionList.data[index].orderId
              }\')"><div style="display: inline-block;vertical-align: -webkit-baseline-middle;font-size:16px;cursor: pointer;"><img src="http://gl-images.logwsd.com/group1/M00/00/1E/rBAADFz9-T2AahSAAAABgS4kbwY057.png" style="margin-right:5px"></div>行车路线回放</div>
            </div>
          </div>`;
              infoWindow.setContent(e.target.content);
              infoWindow.open(map, e.target.getPosition());
              // setTimeout(() => {
              //   infoWindow.close();
              // }, 5000);
            });
            }else{

              _this.positionList.data[index].arrivalTime = "无";
              
             
                e.target.content = `<div class="show">
            <ul>
              <li>
                <span class="left-name">车队:</span>
                <span>${_this.positionList.data[index].vehgrpnam}</span>
              </li>
              <li>
                <span class="left-name">车号:</span>
                <span>${_this.positionList.data[index].vno}</span>
              </li>
              <li>
                <span class="left-name">运单号:</span>
                <span>${_this.positionList.data[index].tradocnum}</span>
              </li>
              <li>
                <span class="left-name">客户:</span>
                <span>${_this.positionList.data[index].outman}</span>
              </li>
              <li>
                <span class="left-name">位置:</span>
                <span>${_this.positionList.data[index].adr}</span>
              </li>
              <li>
                <span class="left-names" >预计到达时间:</span>
                <span>${_this.positionList.data[index].arrivalTime}</span>
              </li>
            </ul>
            <div class="show-bottom">
             <div class="left-bottom" style="cursor: pointer;" onclick="trajectory(\'${
               _this.positionList.data[index].vno
             }\',\'${_this.positionList.data[index].orderId}\',\'${
                _this.positionList.data[index].tradocnum
              }\')"><div style="display: inline-block;vertical-align: -webkit-baseline-middle;font-size:16px;"><img src="http://gl-images.logwsd.com/group1/M00/00/1E/rBAADFz99FCAPPorAAABL8WWQi0203.png" style="margin-right:5px"></div>行车轨迹</div>
             <div class="right-bottom" style="cursor: pointer;" onclick="playback(\'${
               _this.positionList.data[index].vno
             }\',\'${
                _this.positionList.data[index].orderId
              }\')"><div style="display: inline-block;vertical-align: -webkit-baseline-middle;font-size:16px;cursor: pointer;"><img src="http://gl-images.logwsd.com/group1/M00/00/1E/rBAADFz9-T2AahSAAAABgS4kbwY057.png" style="margin-right:5px"></div>行车路线回放</div>
            </div>
          </div>`;
              infoWindow.setContent(e.target.content);
              infoWindow.open(map, e.target.getPosition());
              //  setTimeout(() => {
              //   infoWindow.close();
              // }, 5000);
            }
          }
          var currentZoom = map.getZoom();
          if (positions) {
            map.setZoomAndCenter(currentZoom, positions);
          } else {
            map.setFitView();
          }

          // map.setZoom(currentZoom)
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    chekBoxs: function(val) {
      let checked = [];
      let all = [];
      this.dataList.retList[val].vehicles.forEach(element => {
        all.push(element.vehlicnum);
        this.checkList.forEach((item, index) => {
          if (element.vehlicnum == item) {
            checked.push(item);
          }
        });
      });
      if (checked.length == all.length) {
        this.dataList.retList[val].vehicles.statu = true;
      } else {
        this.dataList.retList[val].vehicles.statu = false;
      }
    },
    handleCheckAllChange(val) {
      if (!this.dataList.retList[val].vehicles.statu) {
        this.dataList.retList[val].vehicles.forEach(element => {
          this.checkList.push(element.vehlicnum);
        });
        this.checkList = this.unique4(this.checkList);
      } else {
        this.dataList.retList[val].vehicles.forEach(element => {
          this.checkList.forEach((item, index) => {
            if (element.vehlicnum == item) {
              this.checkList.splice(index, 1);
            }
          });
        });
      }

      this.dataList.retList[val].vehicles.statu = !this.dataList.retList[val]
        .vehicles.statu;
    },
    handleCheckAlledChange(val) {
      let checked = [];
      let all = [];
      this.dataList.retList[val].vehicles.forEach(element => {
        all.push(element.vehlicnum);
        this.checkList.forEach((item, index) => {
          if (element.vehlicnum == item) {
            checked.push(item);
            this.checkList.splice(index, 1);
          }
        });
      });

      checked.forEach(cont => {
        all.forEach((item, index) => {
          if (cont === item) {
            all.splice(index, 1);
          }
        });
      });
      this.checkList.push(...all);
    },
    unique4(arr) {
      var hash = [];
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] === arr[j]) {
            ++i;
          }
        }
        hash.push(arr[i]);
      }
      return hash;
    }
  },
  mounted() {
    // setInterval(() => {
    //   var aa = "";
    //   if (this.checkList.length != 0) {
    //     aa = this.checkList;
    //     aa.join(",");
    //     this.lastLocations(aa);
    //   }
    // }, 5000);
    map = new AMap.Map("container", { resizeEnable: true });
    window.trajectory = (index, id, num) => {
      window.open(
        "#/Table?index=" + index + "&id=" + id + "&num=" + num,
        "_blank"
      );
    };
    window.playback = (index, id) => {
      window.open("#/user?index=" + index + "&id=" + id, "_blank");

      // this.$router.replace({
      //   path: "/user",
      //   query: {
      //     index: index,
      //     item: item
      //   }
      // });
    };
    this.getData();

    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
      this.sysUserAvatar = user.avatar || "";
    }
  }
};
</script>

<style scoped lang="scss">
@import "~scss_vars";

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 80px;
    line-height: 80px;
    background: $color-primary;
    background: #fff;
    color: #666666;
    font-size: 24px;
    .list-ls {
      text-align: center;
      font-family: PingFangSC-Regular;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
    }
    .active {
      color: #e31d2b;
    }
    .logos {
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      margin-top: 20px;
      .img {
        width: 209px;
        height: 44px;
      }
    }
    .user-name {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      padding-right: 30px;
    }
    .last-right {
      margin-right: 30px;
    }
    .userinfo {
      text-align: center;
      float: right;

      p {
        font-size: 14px;
        margin-top: -24px;
        line-height: 20px;
        text-align: center；;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        .logo-right {
          width: 30px;
          height: 30px;
          border-radius: 2px;
          margin: 0;
          float: none;
        }

        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 20px 0px 20px 0px;
          float: right;
        }
      }
    }
    .close-btn {
      background: lime;
    }
    .logo {
      //width:230px;
      height: 80px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      // img {
      // 	width: 40px;
      // 	float: left;
      // 	margin: 10px 10px 10px 18px;
      // }
      // .txt {
      // 	color:#fff;
      // }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 0px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 240px;
      width: 240px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      height: 100%;
      color: #fff !important;
      background: rgba(35, 47, 63, 1);
      .line {
        height: 50px;
        // background: lime;
        .line-con {
          line-height: 50px;
          //text-align: center;
          .line-statu {
            width: 12px;
            height: 12px;
            margin-top: 19px;
            margin-left: 10px;
            border-radius: 50%;
          }
          .line-org {
            background: rgba(255, 127, 0, 1);
          }
          .line-gre {
            background: rgba(0, 180, 42, 1);
          }
          .line-num {
            margin-left: 5px;
          }
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
        overflow-y: scroll;
      }
      .el-menu::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      .el-menu::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(35, 47, 63, 1);
        background: rgba(35, 47, 63, 1);
      }
      .el-menu::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(35, 47, 63, 1);
        border-radius: 10px;
        background: rgba(35, 47, 63, 1);
      }
      .el-submenu .el-menu-item {
        background: rgba(71, 83, 99, 1);
        opacity: 0.8;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
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
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }

    .content-container {
      // background: #f1f2f7;
      //flex: 1;
      position: absolute;
      right: 0px;
      top: 0px;
      bottom: 0px;
      left: 230px;
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
}
</style>