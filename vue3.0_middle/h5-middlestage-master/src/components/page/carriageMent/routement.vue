<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-truck"></i>承运管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>路线管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="title">
        <div>路线管理</div>
        <div @click.once="hideFn"><i class="el-icon-remove"></i>隐藏已废弃的路线</div>
      </div>
      <el-divider></el-divider>
      <el-button type="success" @click="addRoute" class="btn">添加路线</el-button>
      <div id="tableId">
        <el-table
          :data="tableData"
          :header-cell-style="rowClass"
          v-loading="loading"
          style="width: 100%; margin-top: 20px;"
        >
          <el-table-column prop="endloc" label="路线名称" align="center" width="200"></el-table-column>
          <el-table-column prop="vehgrpName" label="承运商名称" align="center" width="200"></el-table-column>
          <el-table-column  label="路线客户" align="center" width="150">
             <template slot-scope="scope">
               <span v-if="parseInt(scope.row.outletCount) >= 0">{{scope.row.outletCount}}个</span>
            </template>
          </el-table-column>
          <el-table-column  label="状态" align="center" width="150">
             <template slot-scope="scope">
               <span v-if="scope.row.recsta == 'Y'">正常</span>
               <span v-if="scope.row.recsta == 'N'">废弃</span>
            </template>
          </el-table-column>
          <el-table-column prop="trprteesc" label="备注" align="center" width="300"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.recsta == 'Y'">废弃</el-button>
              <el-button type="text" size="small" @click="handleRecovery(scope.$index, scope.row)" v-if="scope.row.recsta == 'N'">恢复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        style="margin-top: 20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize"
      ></el-pagination>
    </div>
    <routedialog :routeVisible="routeVisible" @changes="changeFn"></routedialog>
  </div>
</template>
<script>
import routedialog from "../carriageMent/routedialog";
export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, // 当前页
      pageSize: 20, // 每页条数
      totalSize: 0, // 总条数
      routeVisible: false, //新建路线 弹框开关
      loading:false,
    };
  },
  components: {
    routedialog
  },
  mounted(){
      this.getData()
  },
  methods: {
    //获取表格数据
    getData(){
       this.loading = true
        var params = {
          page:{
              size:this.pageSize,
              current:this.currentPage
          }
        } 
        this.$http.post("/api/whtransportroute/list",params).then(res => {
        //  console.log(res.data);
          if (res.data.ret_code == 0) {
                this.loading = false
                this.tableData = res.data.data.records
                this.totalSize = parseInt( res.data.data.total)
               
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        }).catch(err => {
          console.log(err);
        });
    },
    //表头样式
    rowClass() {
      return "background:rgba(248,248,248,1); height: 45px;font-weight: normal;";
    },
    //隐藏已废弃的线路
    hideFn(){
       this.loading = true
        var params = {
          recsta:"Y",//显示正常的线路。隐藏费弃的线路
          page:{
              size:this.pageSize,
              current:this.currentPage,
          }
        } 
        this.$http.post("/api/whtransportroute/list",params).then(res => {
         console.log(res.data);
          if (res.data.ret_code == 0) {
             this.loading = false
                this.tableData = res.data.data.records
                this.totalSize = parseInt( res.data.data.total)
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        }).catch(err => {
          console.log(err);
        });
    },
    //详情
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({
        path:'/routedetail',
        query:{trprte:row.trprte}  
      })
    },
    //废弃
    handleDelete(index, row) {
       this.$http.delete("/api/whtransportroute/"+row.trprte).then(res => {
         // console.log(res.data);
          if (res.data.ret_code == 0) {
              this.$message({
                type: "success",
                message: res.data.data
              });
              this.getData()
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        }).catch(err => {
          console.log(err);
        });
      
    },
    //恢复
    handleRecovery(index, row){
      let params = new URLSearchParams();
      params.append("trprte",row.trprte);
      this.$http.post("/api/whtransportroute/resume",params).then(res => {
         // console.log(res.data);
          if (res.data.ret_code == 0) {
              this.$message({
                type: "success",
                message: res.data.data
              });
              this.getData()
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        }).catch(err => {
          console.log(err);
        });
    },
    // 每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getData()
    },
    // 当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getData()
    },
    //添加车队 打开遮罩层
    addRoute() {
      this.routeVisible = true;
    },
    //添加车队 关闭遮罩层
    changeFn(val){
        this.routeVisible = false
         this.getData()
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  .title {
    overflow: hidden;
    div:first-child{
      float: left;
       color: #0069dd;
    }
     div:last-child{
      float: right;
      font-size: 14px;
      cursor: pointer;
      i{
        margin-right: 10px;
      }
    }
  }
  .el-divider {
    margin: 16px 0;
  }
  .btn {
    width: 100px;
    height: 32px;
  }
}
#tableId {
  width: 100%;
}
@media screen and (min-width: 1400px) {
  #tableId,
  .title,
  .el-divider {
    width: 1160px;
  }
}

</style>
