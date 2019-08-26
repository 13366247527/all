<template>
  <div  class="container messageboard">
      <div class="head">
         <div class="go" @click="$router.push('/housereport')"><i class="el-icon-d-arrow-left"></i><span>返回仓储报表</span></div>
         <ul class="tab">
             <li v-for="(v,i) in listtab" :key="i" :class="tabindex == i ? 'active':''" @click="tabchange(i)">{{v}}</li>
         </ul>
      </div>
      <div class="con-box">
       <el-form
      :inline="true"
      :model="formSearch"
      class="demo-form-inline"
    >
      <el-form-item >
        <el-date-picker
          v-model="formSearch.createtime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
           value-format="yyyy-MM-dd"
          v-if="tabindex != 2"
        ></el-date-picker>
         <el-date-picker
            v-model="formSearch.createtime"
            type="date"
            v-if="tabindex == 2"
             value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item class="Search-button">
        <el-button type="primary" @click="onSearch" class="onSearch">搜索</el-button>
        <el-button type="warning" plain @click="onReset" class="onReset">清空</el-button>
      </el-form-item>
    </el-form>  
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
       
      <div class="table_box1" id="table_box1" >
         <!--  入库表格数据-->
         <el-table
          :data="tableData"
          v-loading="listLoading"
          :header-cell-style="tableSty"
          border
          :key="0"
          stripe
          style="width: 100%;"
          :height="tableHeight"
          @selection-change="handleSelectionChange"
          v-if="this.tabindex == 0"
        >
          <el-table-column prop="day" label="日期"  align="center" width="200">
            <template slot-scope="scope">
                <span>{{scope.row.day |formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" align="center" width="110">
             <template slot-scope="scope">
                <span v-if="scope.row.type == 1">生产入库</span>
                <span v-if="scope.row.type == 2">车辆入库</span>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="线号/车号" align="center" width="140"></el-table-column>
          <el-table-column prop="docNum" label="单号" align="center" width="140"></el-table-column>
          <el-table-column prop="box" label="数量(箱)" align="center" width="140"></el-table-column>
          <el-table-column prop="tray" label="托数" align="center" width="140" ></el-table-column>
          <el-table-column prop="weight" label="重量(吨)" align="center" width="140"></el-table-column>
          <el-table-column prop="workerName" label="作业人" align="center" width="140"></el-table-column>
          <el-table-column  label="操作" align="center" >
            <template slot-scope="scope">
            <el-button
              @click.native.prevent="detailRow(scope.$index, scope.row)"
              type="text"
              size="small">
              详情
            </el-button>
          </template>
          </el-table-column>
        </el-table>
         <!-- 出库表格数据 -->
        <el-table
          :data="tableData1"
          v-loading="listLoading"
          :header-cell-style="tableSty"
          border
          :key="1"
          stripe
          style="width: 100%;"
          :height="tableHeight"
          @selection-change="handleSelectionChange"
          v-if="this.tabindex == 1"
        >
          <el-table-column prop="EndTime" label="日期"  align="center" width="180"></el-table-column>
          <el-table-column prop="CarNume" label="车号" align="center" width="150"></el-table-column>
          <el-table-column prop="DocNum" label="装运单号" align="center" width="140"></el-table-column>
          <el-table-column prop="BoxNumber" label="数量(箱)" align="center" width="140"></el-table-column>
          <el-table-column prop="PalletNumber" label="托数" align="center" width="140"></el-table-column>
          <el-table-column prop="Weight" label="重量(吨)" align="center" width="140" ></el-table-column>
          <el-table-column prop="PersonName" label="作业人" align="center" width="140"></el-table-column>
          <el-table-column  label="操作" align="center" >
            <template slot-scope="scope">
            <el-button
              @click.native.prevent="detailRow1(scope.$index, scope.row)"
              type="text"
              size="small">
              详情
            </el-button>
          </template>
          </el-table-column>
        </el-table>
         <!-- 库存表格数据 -->
        <el-table
          :data="tableData2"
          v-loading="listLoading"
          :header-cell-style="tableSty"
          border
          :key="2"
          stripe
          style="width: 100%;"
          :height="tableHeight"
          @selection-change="handleSelectionChange"
          v-if="this.tabindex == 2"
        >
          <el-table-column prop="artnam" label="品名规格"  align="center" width="250"></el-table-column>
          <el-table-column prop="avlstkartuni" label="数量(箱)" align="center" width="110"></el-table-column>
          <el-table-column prop="palleNumber" label="托数" align="center" width="140"></el-table-column>
          <el-table-column prop="weight" label="重量(吨)" align="center" width="110"></el-table-column>
          <el-table-column prop="reclcktim" label="生产日期" align="center" width="180"></el-table-column>
          <el-table-column prop="quarantine" label="隔离数量" align="center" width="140" ></el-table-column>
          <el-table-column prop="diffCount" label="差异数量" align="center" width="140"></el-table-column>
          <el-table-column  label="操作" align="center" >
            <template slot-scope="scope">
            <el-button
              @click.native.prevent="detailRow2(scope.$index, scope.row)"
              type="text"
              size="small">
              详情
            </el-button>
          </template>
          </el-table-column>
        </el-table>
        <!-- 待检表格数据 -->
        <el-table
          :data="tableData3"
          v-loading="listLoading"
          :header-cell-style="tableSty"
          border
           :key="3"
          stripe
          style="width: 100%;"
          :height="tableHeight"
          @selection-change="handleSelectionChange"
          v-if="this.tabindex == 3"
        >
          <el-table-column prop="prdlindscr" label="生产线"  align="center"  width="200"></el-table-column>
          <el-table-column prop="artnam" label="品名规格" align="center"  width="250" ></el-table-column>
          <el-table-column prop="avlstkartuni" label="数量(箱)" align="center"  width="150"></el-table-column>
          <el-table-column prop="palleNumber" label="托数" align="center" width="150"></el-table-column>
          <el-table-column prop="weight" label="重量(吨)" align="center" width="150"></el-table-column>
          <el-table-column prop="reclcktim" label="生产日期" align="center" width="200"></el-table-column>
          <el-table-column  label="操作" align="center" >
            <template slot-scope="scope">
            <el-button
              @click.native.prevent="detailRow3(scope.$index, scope.row)"
              type="text"
              size="small">
              详情
            </el-button>
          </template>
          </el-table-column>
        </el-table>
         <!-- 差异表格数据 -->
        <el-table
          :data="tableData4"
          v-loading="listLoading"
          :header-cell-style="tableSty"
          border
           :key="4"
          stripe
          style="width: 100%;"
          :height="tableHeight"
          @selection-change="handleSelectionChange"
          v-if="this.tabindex == 4"
        >
          <el-table-column prop="prdlindscr" label="生产线"  align="center"  width="200"></el-table-column>
          <el-table-column prop="artnam" label="品名规格" align="center"  width="250" ></el-table-column>
          <el-table-column prop="avlstkartuni" label="数量(箱)" align="center"  width="150"></el-table-column>
          <el-table-column prop="palleNumber" label="托数" align="center" width="150"></el-table-column>
          <el-table-column prop="weight" label="重量(吨)" align="center" width="150"></el-table-column>
          <el-table-column prop="reclcktim" label="生产日期" align="center" width="200"></el-table-column>
          <el-table-column  label="操作" align="center" >
            <template slot-scope="scope">
            <el-button
              @click.native.prevent="detailRow4(scope.$index, scope.row)"
              type="text"
              size="small">
              详情
            </el-button>
          </template>
          </el-table-column>
        </el-table>
         <!-- 破损表格数据 -->
        <el-table
          :data="tableData5"
          v-loading="listLoading"
          :header-cell-style="tableSty"
          border
           :key="5"
          stripe
          style="width: 100%;"
          :height="tableHeight"
          @selection-change="handleSelectionChange"
          v-if="this.tabindex == 5"
        >
          <el-table-column prop="prdlindscr" label="生产线"  align="center"  width="200"></el-table-column>
          <el-table-column prop="artnam" label="品名规格" align="center"  width="250" ></el-table-column>
          <el-table-column prop="avlstkartuni" label="数量(箱)" align="center"  width="150"></el-table-column>
          <el-table-column prop="palleNumber" label="托数" align="center" width="150"></el-table-column>
          <el-table-column prop="weight" label="重量(吨)" align="center" width="150"></el-table-column>
          <el-table-column prop="reclcktim" label="生产日期" align="center" width="200"></el-table-column>
          <el-table-column  label="操作" align="center" >
            <template slot-scope="scope">
            <el-button
              @click.native.prevent="detailRow5(scope.$index, scope.row)"
              type="text"
              size="small">
              详情
            </el-button>
          </template>
          </el-table-column>
        </el-table>
        </div>
      <el-pagination
        background
        layout="total,sizes,prev, pager, next,jumper"
        :current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.pageTotal"
        :page-sizes="[1, 2, 3, 4]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="pagination paginationG"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import apis from "../../apis/apis";
import {
  outExport,
  outExportInfo,
  intlist,
  intdetaillist,
  outlist,
  outdetaillist,
  stocklist,
  stockdetaillist,
  pendlist,
  penddetaillist
} from "../../apis/apis";
import { scrypt } from 'crypto';

export default {
  name: "messageboard",
  data() {
    return {
      tableHeight: null,
      listLoading: false, //
      listtab:['入库报表','出库报表','库存报表','待检报表','差异报表','破损报表'],//tab数据
      tabindex:0,// tab下标
      tid:0,//传过来的tab下标
      formSearch:{
        createtime:'',
      },
      pageInfo: {
        //分页
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0
      },
      tableData:[],//入库报表
      tableData1:[],//出库报表
      tableData2:[],//库存报表
      tableData4:[],//待检报表
      tableData5:[],//差异报表
      tableData6:[],//破损报表
    };
  },
  computed: {},
  filters:{
			//时间戳转换年月日时分
			formatDate: function (value) {
				if(value){
					let a =  parseInt(value)
					let date = new Date(a);
                    let n = date.getFullYear();
                    let y = date.getMonth()+1 ;
                    y = y < 10 ? ('0' + y) : y;
                    let r = date.getDate() ;
                    r = r < 10 ? ('0' + r) : r;
				      	return n+"-"+y+"-"+r		
				}
      },
      //时间戳转换年月日时分秒
			formatDates: function (value) {
				if(value){
					let a =  parseInt(value)
					let date = new Date(a);
                    let n = date.getFullYear();
                    let y = date.getMonth()+1 ;
                    y = y < 10 ? ('0' + y) : y;
                    let r = date.getDate() ;
                    r = r < 10 ? ('0' + r) : r;
                    let h = date.getHours();
                    h = h < 10 ? ('0' + h) : h;
                    let f = date.getMinutes();
                    f = f < 10 ? ('0' + f) : f;
                    let m = date.getSeconds();
                    m = m < 10 ? ('0' + m) : m;
					return n+"-"+y+"-"+r+' '+h+':'+f+':'+m		
				}
            },
            //秒转时分秒
            secondToDate:function(result) {
                var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
                var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
                var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
                return result = h + ":" + m + ":" + s;
            },
            //时间戳秒转时分秒
            secondToDates:function(result) {
                var result = result/1000
                var h = Math.floor(result / 3600 ) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600 );
                var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
                var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
                return result = h + ":" + m + ":" + s;
            }

	},
  mounted(){
      this.tabindex = this.$route.query.tid
      var top = document.getElementById("table_top");
      var topH = top.offsetTop + "px"; //高度
      document.getElementById("table_box1").style.top = topH;
      document.getElementById("table_box1").style.bottom = 70 + "px";
      var o = document.getElementById("table_box1");
      var h = o.offsetHeight; //高度
      console.log(h)
      this.tableHeight = parseInt(h);
      this.getData()
  },
  methods:{
    getData(){
      if(this.$route.query.tid == '0'){
        //入库报表
         this.getinitData()
      }else if(this.$route.query.tid == '1'){
        //出库报表
         this.getoutData()
      }else if(this.$route.query.tid == '2'){
        //库存报表
         this.getstockData()
      }else if(this.$route.query.tid == '3'){
        //待检报表
         this.getpendtData()
      }else if(this.$route.query.tid == '4'){
        //差异报表
        //  this.getstockData()
      }else if(this.$route.query.tid == '5') {
        //破损报表
        //  this.getpendtData()
      }else{

      }
    },
    //获取入库数据
    getinitData(){
        const data = new URLSearchParams();
        data.append("page", this.pageInfo.currentPage);
        data.append("pageSize", this.pageInfo.pageSize);
        data.append("beginTime",'');
        data.append("endTime", '');   
       intlist(data).then(res => {
          console.log(res)
             if(res.data.ret_code == '0'){
              this.pageInfo.pageTotal = 100
              this.tableData= res.data.data
          }else{
             this.$message({
                        type: 'error',
                        message: res.data.msg
               })
             } 
        });
    },
     //入库数据 详情
    detailRow(index,row){
          const data = new URLSearchParams();
          data.append("docNum", row.docNum);
          data.append("type", row.type);
          data.append("page", this.pageInfo.currentPage);
          data.append("pageSize", this.pageInfo.pageSize);
          intdetaillist(data).then(res => {
          console.log(res)
          if(res.data.ret_code == '0'){


          }else{
             this.$message({
                        type: 'error',
                        message: res.data.msg
                     })
             }     
          }); 
    },
     //获取出库数据
    getoutData(){
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
       const data = new URLSearchParams();
        data.append("currentPage", this.pageInfo.currentPage);
        data.append("pageSize", this.pageInfo.pageSize);
        data.append("startDate",startDate );
        data.append("endDate",endDate );
        outlist(data).then(res => {
          console.log(res)
            if(res.data.ret_code == '0'){
               this.pageInfo.pageTotal = res.data.data.count
               this.tableData1= res.data.data.data
          }else{
             this.$message({
                        type: 'error',
                        message: res.data.msg
            })
          } 
        }); 
    },
    //出库详情数据
    detailRow1(index,row){
          const data = new URLSearchParams();
          data.append("inOutId", row.id);
          data.append("currentPage", this.pageInfo.currentPage);
          data.append("pageSize", this.pageInfo.pageSize);
          outdetaillist(data).then(res => {
          console.log(res)
          if(res.data.ret_code == '0'){


          }else{
             this.$message({
                        type: 'error',
                        message: res.data.msg
                     })
             }     
          }); 
    },
     //获取库存数据
    getstockData(){
       const data = new URLSearchParams();
        data.append("page", this.pageInfo.currentPage);
        data.append("pagesize", this.pageInfo.pageSize);
        data.append("date", '2019-08-04');
        stocklist(data).then(res => {
          console.log(res)
          if(res.data.ret_code == '0'){
              this.pageInfo.pageTotal = res.data.data.total
              this.tableData2= res.data.data.list
          }else{
             this.$message({
                        type: 'error',
                        message: res.data.msg
                     })
             }     
      }); 
    },
    //库存详情数据
    detailRow2(index,row){
          const data = new URLSearchParams();
          data.append("artnum", row.artnum);
          data.append("page", this.pageInfo.currentPage);
          data.append("pagesize", this.pageInfo.pageSize);
          stockdetaillist(data).then(res => {
          console.log(res)
          if(res.data.ret_code == '0'){


          }else{
             this.$message({
                        type: 'error',
                        message: res.data.msg
                     })
             }     
          }); 
    },
     //获取待检数据
    getpendtData(){
       const data = new URLSearchParams();
        data.append("page", this.pageInfo.currentPage);
        data.append("pagesize", this.pageInfo.pageSize);
        data.append("startTime", '');
        data.append("endTime", '');
        pendlist(data).then(res => {
          console.log(res)
          if(res.data.ret_code == '0'){
              this.pageInfo.pageTotal = res.data.data.total
              this.tableData3= res.data.data.list
          }else{
              this.$message({
                        type: 'error',
                        message: res.data.msg
                     })
             } 
        }); 
    },
    //待检详情
     detailRow3(index,row){
          const data = new URLSearchParams();
          data.append("artnum", row.artnum);
          data.append("prdlinnum", row.prdlinnum);
          data.append("page", this.pageInfo.currentPage);
          data.append("pagesize", this.pageInfo.pageSize);
          penddetaillist(data).then(res => {
          console.log(res)
          if(res.data.ret_code == '0'){


          }else{
             this.$message({
                        type: 'error',
                        message: res.data.msg
                     })
             }     
          }); 
    },
     //获取差异数据
    getdiffData(){
       const data = new URLSearchParams();
        data.append("page", this.pageInfo.currentPage);
        data.append("pagesize", this.pageInfo.pageSize);
        data.append("date", '2019-08-04');
        stocklist(data).then(res => {
          console.log(res)
        }); 
    },
    //获取差异详情
     detailRow4(index,row){
          
    },
     //获取破损数据
    getdamagtData(){
       const data = new URLSearchParams();
        data.append("page", this.pageInfo.currentPage);
        data.append("pagesize", this.pageInfo.pageSize);
        data.append("date", '2019-08-04');
        stocklist(data).then(res => {
          console.log(res)
        }); 
    },
    //获取差异详情
    detailRow5(index,row){
          
    },
    //tab切换
    tabchange(i){
        this.tabindex = i
         this.pageShow = false
            if (i == 0) {
                    this.totalSize = 0
                    this.currentPage = 1
                    this.$nextTick(() => {
                        this.getinitData()
                    })
                } else if(i == 1) {
                    this.currentPage = 1
                    this.totalSize = 0
                    this.$nextTick(() => {
                        this.getoutData()
                    })
                }else if(i == 2) {
                    this.$nextTick(() => {
                        this.totalSize = 0
                        this.currentPage = 1
                         this.getstockData()
                    })
                }else if(i == 3) {
                    this.$nextTick(() => {
                        this.totalSize = 0
                        this.currentPage = 1
                        this.getpendtData()
                    })
                }else if(i == 4) {
                    this.currentPage = 1
                    this.totalSize = 0
                    this.$nextTick(() => {
                        this.getdiffData()
                    })
                }else if(i == 5) {
                    this.currentPage = 1
                    this.totalSize = 0
                    this.$nextTick(() => {
                        this.getdamagtData()
                    })
                }else{
                    return
                }
    },
    outExcel(val){

    },
    onSearch(){

    },
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
             params:{tid:0}
           })
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
<style lang="scss" scoped>
.table_box1 {
  position: absolute;
  bottom: 125px;
  top:130px;
  right: 0;
  left: 0;
  padding: 0 30px;
}

.messageboard {
  height: calc(100% - 8vw);
  .head{
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(242, 245, 248, 1);
    box-shadow: 0px 1px 7px 0px rgba(114, 186, 255, 0.2);
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 20px 30px 20px 30px;
    .go{
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: 600;
      cursor: pointer;
       i{
         display: inline-block;
         font-size: 20px;
         margin-right: 15px;
       }
    }
    .tab{
      display: flex;
      list-style: none;
      li{
        width: 200px;
        text-align: center;
        padding: 10px 0;
        margin-right: 20px;
        cursor: pointer;
        background: #CCCCCC;
      }
      .active{
        background: #e31d2b;
        color: white;
      }
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
    .el-form{
      .el-form-item{
        margin-bottom: 10px;
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
    }
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
