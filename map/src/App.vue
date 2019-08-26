<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;

  /*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
  // background: #1F2D3D;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
// .el-table th>.cell {
//      line-height:25px!important;

// }
.amap-pancontrol{
  display: none!important;
}
.amap-toolbar{
  left: auto!important;
    top: auto!important;
  right: 0px!important;
  bottom: 100px!important;
}
.amap-zoom-labels{
  margin-left:100px;
}
.serchList {
  .el-input__inner {
    height: 40px;
  }
  .picker{
    .el-input__inner {
    cursor: pointer;
  }
  }
   .CarInput{
            .el-input__inner{
              height:99%;
              border: 0;
            }
          }
}
// .el-input__inner {
//     background: rgba(35,47,63,1)!important;
//     border:1px solid rgba(71, 83, 99, 1)!important;
//     color: #fff!important;
// }
// .el-input-group__append {

// 	border:1px solid rgba(71, 83, 99, 1)!important;
// 	border-left: 0!important;
// 	background: rgba(35,47,63,1)!important;
//     color: #fff!important;
// }
#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
// @media screen and (max-width:1300px){
//  #app {
//   position: absolute;
//   top: 0px;
//   bottom: 0px;
//   width: 1300px;
//   left: 50%;
//   transform: translateX(-50%); /* 移动元素本身50% */
//   overflow-x: auto;
//  }
// }
// @media only screen and(max-width:1300px){
//  #app {
//   position: absolute;
//   top: 0px;
//   bottom: 0px;
//   width: 1300px;
//   overflow-x: auto;
//  }
// }


// .el-submenu [class^=fa] {
// 	vertical-align: baseline;
// 	margin-right: 10px;
// }

// .el-menu-item [class^=fa] {
// 	vertical-align: baseline;
// 	margin-right: 10px;
// }

// .el-menu-item, .el-submenu__title {
// 	color: #fff!important
// }

.toolbar {
  background: #f2f2f2;
  padding: 10px;
  //border:1px solid #dfe6ec;
  margin: 10px 0px;
  .el-form-item {
    margin-bottom: 10px;
  }
}
// .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper {
//     height: 50px;
// }

// .el-table .cell, .el-table th>div {
//      padding-left: 0px!important;
//      padding-right: 0px!important;

// }
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.el-checkbox {
  display: block !important;
  height: 50px;
  line-height: 50px;
  /* text-align: center; */
  padding-left: 60px;
  background: rgba(71, 83, 99, 1);
  opacity: 0.8;
  color: #fff !important;
}
.el-checkbox {
  margin-left: 0px !important;
}
.el-checkbox__label {
  font-size: 14px;
  padding-left: 15px !important;
}
.show {
  //   position: fixed;
  //   top: 200px;
  //   left: 500px;
  width: 290px;
  //height: 210px;
  // background: rgba(249, 249, 249, 1);
  // border: 1px solid rgba(192, 192, 192, 1);
  border-radius: 2px;

  ul {
    padding: 0;
    margin: 0;
    padding: 10px;
    list-style: none;
    li {
      padding: 3px 0;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      .left-name {
         width:60px;
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-weight: 600;
        color: rgba(102, 102, 102, 1);
      }
      .left-names {
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .show-bottom {
    width: 290px;
    height: 40px;
    border-top: 1px solid rgba(192, 192, 192, 1);
    text-align: center;
    line-height: 40px;
    font-weight: 600;
    color: rgba(102, 102, 102, 1);
    .left-bottom {
      float: left;
      width: 49%;
      border-right: 1px solid rgba(192, 192, 192, 1);
    }
    .right-bottom {
      float: right;
      width: 50%;
    }
  }
}
.show1{
  ul{
    li{
       .left-name {
         width:auto;
       }
    }
  }
}
.amap-overlays {
    z-index: 0!important;
}
</style>