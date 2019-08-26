<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-truck"></i>承运管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="formInline.all" placeholder="全部车队">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.state" placeholder="车辆状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.type" placeholder="车辆类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item>
        <el-input placeholder="请输入车辆编号\司机姓名"  v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="inp">
        <!-- <el-input placeholder="请输入车辆编号\司机姓名" suffix-icon="el-icon-search" v-model="username" @change="UserChange"></el-input> -->
        <el-button type="success" @click="$router.push({path:'/addvehicle'})">添加车辆</el-button>
      </div>
      <div id="tableId">
        <el-table
          :data="tableData"
          :header-cell-style="rowClass"
          style="width: 100%; margin-top: 20px;"
        >
          <el-table-column prop="date" label="车辆编号" align="center" width="140"></el-table-column>
          <el-table-column prop="date1" label="车型" align="center" width="140"></el-table-column>
          <el-table-column prop="date2" label="载重" align="center" width="100"></el-table-column>
          <el-table-column prop="date3" label="车队名称" align="center" width="140"></el-table-column>
          <el-table-column prop="date4" label="车辆牌号" align="center" width="140"></el-table-column>
          <el-table-column prop="date5" label="司机" align="center" width="120"></el-table-column>
          <el-table-column prop="date6" label="电话" align="center" width="120"></el-table-column>
          <el-table-column prop="date7" label="状态" align="center" width="140"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        all: "", //全部车队
        state: "", //车辆状态
        type: "" ,//车辆类型
        username: "", //车辆编号\司机姓名
      },
      
      tableData: [], //表格数据
      currentPage: 1, // 当前页
      pageSize: 20, // 每页条数
      totalSize: 0 // 总条数
    };
  },
  mounted(){
      // this.getData()
  },
  methods: {
    //获取后台数据
    getData(){
      const data = new URLSearchParams();
      data.append("vehgrpnam",this.formInline.all);
      this.$http.get("/api/carrier/getMotorcade", {params: data}).then(res => {
          console.log(res.data);
          if (res.data.ret_code == 0) {
            this.tableData = res.data.data;
            this.totalSize = res.data.data.length;
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
    //搜索
    onSubmit() {
        this.getData()
    },
    //车辆编号\司机姓名搜索
    // UserChange(){
    //      this.getData()
    // },
    //表头样式
    rowClass() {
      return "background:rgba(248,248,248,1); height: 45px;font-weight: normal;";
    },
    //详情
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row)
      const data = new URLSearchParams();
      data.append("vehgrpnam", row.vehgrpnum);
      this.$http.get("/api/carrier/delVehicleGroup", {params: data}).then(res => {
          console.log(res.data);
          if (res.data.ret_code == 0) {
            this.getData();
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
    }
  }
};
</script>
<style lang="less" scoped>
.el-form {
  .el-form-item {
    margin-right: 20px !important;
  }
}
.inp {
  .el-button {
    width: 100px;
    height: 32px;
  }
}

#tableId {
  width: 100%;
}
@media screen and (min-width: 1400px) {
  #tableId,
  .inp {
    width: 1160px;
  }
}
</style>
