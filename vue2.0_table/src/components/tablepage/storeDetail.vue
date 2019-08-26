<template>
  <!--  出库数据-->
  <div class="wrap">
    <div class="title">
      <span>当前位置：</span>
      <span style="color: #E31D2B;">出库数据</span>
      <span>> 详情</span>
    </div>
    <div class="topTime">
      <span class="tle">选择日期</span>
      <el-date-picker v-model="dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      <el-button type="danger" class="searchbtn">搜索</el-button>
      <el-button type="info" class="removebtn">清空</el-button>
    </div>
    <div class="contMsg">
      <div class="downdiv">
        <span class="getExcel">导出excel</span>
        <!--          <div class="tableHead">-->
        <!--            <span>期初数据</span>-->
        <!--            <span>入库数据</span>-->
        <!--            <span>出库数据</span>-->
        <!--            <span>库存数据</span>-->
        <!--            <span>差异数据</span>-->
        <!--            <span>破损数据</span>-->
        <!--          </div>-->
      </div>
      <el-table id="tablesId" border :header-cell-style="tableStyle" :data="tableData" style="width: 1432px; margin-left: 35px; margin-top: 20px;">
        <el-table-column align="center" prop="date" label="品名规格" width="286"></el-table-column>
        <el-table-column align="center" prop="date" label="数量（箱）" width="286"></el-table-column>
        <el-table-column align="center" prop="date" label="托数（托）" width="286"></el-table-column>
        <el-table-column align="center" prop="date" label="重量（吨）" width="286"></el-table-column>
        <el-table-column align="center" prop="date" label="生产日期" width="286"></el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 30px; margin-left: 32px;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        personInfo:this.$route.query,
        dateTime: '',
        tableData: [{},{},{},{},{},{}],
        currentPage: 1,
        pageSize: 20,
        totalSize: 30
      }
    },
    mounted(){

    },
    methods: {
      // 表头样式
      tableStyle({row, column, rowIndex, columnIndex}) {
        return "background:#F2F5F8;color:#333333;font-size:14px;border: none";
      },
      // 每页条数
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      // 当前页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped lang="scss">
  .active {
    background:linear-gradient(90deg,rgba(244,18,34,1),rgba(237,63,62,1),rgba(255,94,96,1));
    color: #fff!important;
  }
  .wrap {
    width: 100%;
    height: 100%;
    margin-top: 20px;
    padding: 0 8px 0 10px;
    box-sizing: border-box;
    .title {
      font-size:12px;
      font-weight:400;
      color:rgba(102,102,102,1);
    }
    .topTime {
      width: 100%;
      height: 88px;
      margin-top: 14px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(242,245,248,1);
      box-shadow:0 1px 7px 0 rgba(114,186,255,0.2);
      border-radius:10px;
      .tle {
        display: inline-block;
        float: left;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        margin: 32px 0 0 33px;
      }
      .el-range-editor.el-input__inner {
        float: left;
        margin: 24px 0 0 40px;
      }
      .searchbtn {
        width:102px;
        height:34px;
        line-height: 0;
        background:linear-gradient(90deg,rgba(244,18,34,1),rgba(237,63,62,1),rgba(255,94,96,1));
        border-radius:4px 4px 4px 4px;
        margin: 27px 0 0 46px;
      }
      .removebtn {
        width:102px;
        height:34px;
        line-height: 0;
        background:rgba(153,153,153,1);
        border-radius:4px 4px 4px 4px;
      }
    }
    .contMsg {
      width: 100%;
      height:660px;
      margin-top: 10px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(242,245,248,1);
      box-shadow:0 1px 7px 0 rgba(114,186,255,0.2);
      border-radius:10px;
      .downdiv {
        padding: 26px 0 0 32px;
        .getExcel {
          display: inline-block;
          width:102px;
          height:34px;
          line-height: 34px;
          cursor: pointer;
          text-align: center;
          border:1px solid rgba(103, 193, 134, 1);
          border-radius:4px 4px 4px 4px;
          font-size:14px;
          color:rgba(103,193,134,1);
        }
        .tableHead {
          width:1575px;
          height:66px;
          line-height: 66px;
          margin-top: 18px;
          font-size:14px;
          font-weight:bold;
          color:rgba(51,51,51,1);
          background:rgba(248,248,248,1);
          border:1px solid rgba(223, 227, 233, 1);
          border-radius:10px;
          display: flex;
          span {
            display: inline-block;
            text-align: center;
            flex: 1;
            border-right: 1px solid #E6EAEE;
          }
          span:last-child {
            border-right: none;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  #tablesId {
    tbody {
      td {
        border-bottom: none;
      }
    }
  }
</style>
