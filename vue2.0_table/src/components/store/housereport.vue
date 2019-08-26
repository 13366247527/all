<template>
  <div class="container messageboard">
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidth"
      :inline="true"
      :model="formSearch"
      class="demo-form-inline"
    >
       <!-- <el-form-item>
        <el-select v-model="formSearch.room" placeholder="请选择库房">
            <el-option
              v-for="item in Roomoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-date-picker
          v-model="formSearch.createtime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
           value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="Search-button">
        <el-button type="primary" @click="onSearch" class="onSearch">搜索</el-button>
        <el-button type="warning" plain @click="onReset" class="onReset">清空</el-button>
      </el-form-item>
    </el-form>

    <div class="con-box">
      <div class="con-excel">
        <div>
          <span class="con-excel-item" @click="outExcel(0)">导出excel</span>
          <span class="con-searchList">
            共搜索到
            <b>{{pageInfo.pageTotal}}</b> 条数据
          </span>
        </div>
      </div>
      <!-- 表格 开始 -->
      <div id="table_top"></div>
      <div class="table_box1" id="table_box1">
        <!-- <el-table
          :data="tableData"
          v-loading="listLoading"
          :header-cell-style="tableSty"
          border
          stripe
          size="small"
          style="width: 100%"
          :height="tableHeight"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="sortNum" label="品名规格"  align="center"></el-table-column>
          <el-table-column prop="grade" label="数量（箱）" align="center" ></el-table-column>
          <el-table-column prop="nextDayCount" label="单价（元）" align="center"></el-table-column>
          <el-table-column prop="timeoutCount" label="金额（元）" align="center" ></el-table-column>
           <el-table-column prop="grade" label="作业人" align="center" ></el-table-column>
          <el-table-column prop="nextDayCount" label="照片" align="center" ></el-table-column>
          <el-table-column prop="timeoutCount" label="处理意见" align="center" ></el-table-column>
        </el-table> -->
         <el-table 
         :data="tableData"
          v-loading="listLoading"
          :header-cell-style="tableSty"
          border
          stripe
          style="width: 100%"
          @header-click="headerclick"
          :height="tableHeight"
          @selection-change="handleSelectionChange">
            <el-table-column
              prop="Time"
              label="日期"
              align="center"
              width="180">
            </el-table-column>
             <el-table-column label="期初"   align="center">
                <el-table-column
                  prop="initBoxNumber"
                  label="箱数"
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="initWeight"
                  label="重量(吨)"
                    align="center"
                  width="120">
                </el-table-column>
             </el-table-column>
              <el-table-column label="入库"   align="center">
                <el-table-column
                  prop="inBoxNumber"
                  label="箱数"
                    align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="inWeight"
                  label="重量(吨)"
                    align="center"
                  width="120">
                </el-table-column>
             </el-table-column>
              <el-table-column label="出库"   align="center">
                <el-table-column
                  prop="outBoxNumber"
                  label="箱数"
                    align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="outWeight"
                  label="重量(吨)"
                    align="center"
                  width="120">
                </el-table-column>
             </el-table-column>
              <el-table-column label="库存"   align="center">
                <el-table-column
                  prop="inventoryBoxNumber"
                  label="箱数"
                    align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="inventoryWeight"
                  label="重量(吨)"
                    align="center"
                  width="120">
                </el-table-column>
             </el-table-column>
              <el-table-column label="待检放行"   align="center">
                <el-table-column
                  prop="nocheckBoxNumber"
                  label="箱数"
                    align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="nocheckWeight"
                  label="重量(吨)"
                    align="center"
                  width="120">
                </el-table-column>
             </el-table-column>
             <el-table-column label="差异"   align="center">
                <el-table-column
                  prop="diffBoxNumber"
                  label="箱数"
                    align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="diffWeight"
                  label="重量(吨)"
                    align="center"
                  width="120">
                </el-table-column>
             </el-table-column>
             <el-table-column label="破损"   align="center">
                <el-table-column
                  prop="badBoxNumber"
                  label="箱数"
                    align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="badWeight"
                  label="重量(吨)"
                    align="center"
                  width="120">
                </el-table-column>
             </el-table-column>
         </el-table>
      </div>
      <el-pagination
        background
        layout="total,sizes,prev, pager, next,jumper"
        :current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.pageTotal"
        :page-sizes="[5, 10, 20, 50]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="pagination paginationG"
      ></el-pagination>
    </div>
    <!-- 表格---end -->
  </div>
</template>

<style lang="scss" scoped>
.table_box1 {
  position: absolute;
  bottom: 160px;
  top: 0;
  right: 0;
  left: 0;
  padding: 0 30px;
}

.messageboard {
  height: calc(100% - 6vw);
  .el-table {
    box-shadow: 0px 1px 7px 0px rgba(114, 186, 255, 0.2);
    border-radius: 10px;
  }
  // 设置输入框的宽度
  .el-form-item__content {
    vertical-align: unset !important;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .demo-form-inline {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(242, 245, 248, 1);
    box-shadow: 0px 1px 7px 0px rgba(114, 186, 255, 0.2);
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 20px 30px 20px 30px;
    padding-bottom: 0;
    .el-form-item {
      vertical-align: unset !important;
      .el-form-item__content{
          margin-left: 40px !important;
      }
    }
    .el-form-item__label {
      // width: 100px;
      width: auto !important;
      padding-right: 0px;
    }
  }
  .Search-button {
    margin-left: 50px;
    button {
      height: 35px;
      // width: 100px;
      line-height: 0;
      border-radius: 4px 4px 4px 4px;
      border: 0;
      color: #fff;
    }
    .onSearch {
      background: linear-gradient(
        90deg,
        rgba(244, 18, 34, 1),
        rgba(237, 63, 62, 1),
        rgba(255, 94, 96, 1)
      );
    }
    .onReset {
      background: rgba(153, 153, 153, 1);
    }
  }

  .con-box {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 20px 30px 30px 30px;
    box-sizing: border-box;
    border: 1px solid rgba(242, 245, 248, 1);
    box-shadow: 0px 1px 7px 0px rgba(114, 186, 255, 0.2);
    border-radius: 10px;
    .con-excel {
      margin-bottom: 15px;
      .con-excel-item {
        display: inline-block;
        text-align: center;
        line-height: 34px;
        width: 110px;
        height: 34px;
        border: 1px solid rgba(103, 193, 134, 1);
        border-radius: 4px 4px 4px 4px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: bold;
        color: rgba(103, 193, 134, 1);
        margin-right: 10px;
        cursor: pointer;
      }
      .con-searchList {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        b {
          color: #e31d2b;
        }
      }
    }
    .table_box1{
      position: absolute;
      top: 70px;
    }
    .table_box1  .el-table__row  /deep/  td{
             border-bottom: none;
    }
    .pagination {
      text-align: center;
    }
    .paginationG {
      position: absolute;
      bottom: 0px;
      right:0;
      left:0;
    }
  }
}
</style>


<script>
import apis from "../../apis/apis";
import {
  storelist
} from "../../apis/apis";
import { scrypt } from 'crypto';

export default {
  name: "messageboard",
  data() {
    return {
      tableHeight: null,
      listLoading: false, //
      formSearch:{//表单内容
          room:'',
          createtime:'',
      },
      Roomoptions:[{
        value: '选项4',
          label: '龙须面'
      }],//库房数据
      pageInfo: {
        //分页
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0
      },
      tableData: [],
      labelPosition: "left", //lable对齐方式
      labelWidth: "100px", //lable宽度
      formLabelWidth: "120px",    
    };
  },
  computed: {},
  mounted(){
      var top = document.getElementById("table_top");
      var topH = top.offsetTop + "px"; //高度
      document.getElementById("table_box1").style.top = topH;
      document.getElementById("table_box1").style.bottom = 70 + "px";
      var o = document.getElementById("table_box1");
      var h = o.offsetHeight; //高度
      this.tableHeight = h;
      this.getoutreport()
  },
  methods:{
    //获取仓库报表
    getoutreport(val){

          if(val){
              var data = new URLSearchParams();
              data.append("startDate", val[0]);
              data.append("endDate",  val[1]);
              data.append("currentPage", this.pageInfo.currentPage);
              data.append("pageSize", this.pageInfo.pageSize);
          }else{
					          var date = new Date();
                    var n = date.getFullYear();
                    var y = date.getMonth()+1;
                    y = y < 10 ? ('0' + y) : y;
                    var r = date.getDate() ;
                    r = r < 10 ? ('0' + r) : r;
                    var mr = date.getDate()+1;
                    mr = mr < 10 ? ('0' + mr) : mr;
                    var startDate = n+'-'+y+'-'+r
                    var endDate = n+'-'+y+'-'+mr
                    var data = new URLSearchParams();
                    data.append("startDate", startDate);
                    data.append("endDate", endDate);
                    data.append("currentPage", this.pageInfo.currentPage);
                    data.append("pageSize", this.pageInfo.pageSize);
                  }
          storelist(data).then(res => {
              console.log(res)
              if(res.data.ret_code == '0'){
                this.tableData = res.data.data.data
                this.pageInfo.pageTotal = res.data.data.count
              }else{
                this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                }     
          }); 
    },
    //搜索
    onSearch(){
      console.log(this.formSearch.createtime)
        if(this.formSearch.createtime[0] && this.formSearch.createtime[1]){
           this.getoutreport(this.formSearch.createtime)
        }else{
           this.$message({ message: "日期不能为空！", type: "error" });
        }
    },
    //重置
    onReset(){

    },
    outExcel(val) {
      if (this.pageInfo.pageTotal == 0) {
        this.$message({ message: "没有数据可以导出！", type: "error" });
        return false;
      }
      this.listLoading = true;
      let dateTime = "";
      if (this.year) {
        let dates = new Date(this.year);
        dateTime = dates.getFullYear();
      }
      const data = new URLSearchParams();
      let month = this.formSearch1.type;
      if (this.formSearch1.type == "all") {
        month = "";
      }
      data.append("year", dateTime ? dateTime : "");
      data.append("month", month ? month : "");
      data.append(
        "vehgrpnum",
        this.formSearch.type ? this.formSearch.type : ""
      );
      outExport(data).then(res => {
        this.listLoading = false;
        let token = this.$common.getSessionStorage("token");
        location.href = `${res.request.responseURL}&token=${token}`;
      });
    },
    tableSty({ row, rowIndex }) {
      return "background:#F3F4F7;color:#555";
    },
    headerclick(column, event){
        console.log(column,event)
        if(column.label == "入库"){
           this.$router.push({
             path:'/housedetail',
             query:{tid:0}
           })
        }else if(column.label == "出库"){
          this.$router.push({
             path:'/housedetail',
             query:{tid:1}
           })
        }else if(column.label == "库存"){
          this.$router.push({
             path:'/housedetail',
             query:{tid:2}
           })
        }else if(column.label == "待检放行"){
          this.$router.push({
             path:'/housedetail',
             query:{tid:3}
           })
        }else if(column.label == "差异"){
          this.$router.push({
             path:'/housedetail',
             query:{tid:4}
           })
        }else if(column.label == "破损"){
            this.$router.push({
             path:'/housedetail',
             query:{tid:5}
           })
        }else{
           return
        }
    },
    handleSelectionChange(){

    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    }
  }
}
</script>