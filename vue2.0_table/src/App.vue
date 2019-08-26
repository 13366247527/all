<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "../static/css/main.css";
    @import "../static/css/theme-green/color-green.css";
    /* @import '../static/css/theme-green/index.css'; */
    body .el-table th.gutter{
    display: table-cell!important;
}

body .el-table colgroup.gutter{
    display: table-cell!important;
}
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 26px;
}
</style>
