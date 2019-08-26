<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-truck"></i>承运管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>车队管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
              <el-input v-model="formInline.all" placeholder="请输入车队编号\车队名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="inp">
        <el-button type="success" @click="addFleete">添加车队</el-button>
      </div>
      <div id="tableId">
        <el-table
          :data="tableData"
          :header-cell-style="rowClass"
          style="width: 100%; margin-top: 20px;"
        >
          <el-table-column prop="vehgrpnum" label="车队编号" align="center" width="200"></el-table-column>
          <el-table-column prop="vehgrpnam" label="车队名称" align="center" width="200"></el-table-column>
          <el-table-column prop="numofveh" label="车队车数" align="center" width="200"></el-table-column>
          <el-table-column prop="personName" label="联系人" align="center" width="200"></el-table-column>
          <el-table-column prop="personMobile" label="电话" align="center" width="200"></el-table-column>
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
    <!-- 添加车队  弹框 -->
    <el-dialog title="新建车队" :visible.sync="fleeteVisible" class="fleeteVisible" :before-close="handleDialogClose">
      <el-form :model="addform" class="demo-form-inline" label-width="100px">
        <el-form-item label="车队编号：" >
          <el-input v-model="addform.carNum" placeholder="请输入车队编号" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="车队名称：">
          <el-input v-model="addform.name" placeholder="请输入车队名称" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="addform.user" placeholder="请输入联系人" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="addform.phone" placeholder="请输入联系电话" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="车队简介：">
          <el-input type="textarea" v-model="addform.info" placeholder="请输入至少五个字符"  maxlength="100" minlength="5"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="define">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        all: "" //全部车队
      },
      tableData: [], //表格数据
      currentPage: 1, // 当前页
      pageSize: 20, // 每页条数
      totalSize: 0, // 总条数
      fleeteVisible: false, //新建车队 弹框开关
      addform: {
        //弹框数据
        name: "", //车队名称
        carNum: "", //车队编号
        user: "", //联系人
        phone: "", //联系电话
        info: "" //车队简介
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取表格数据
    getData() {
     var params = {
          keyword:this.formInline.all,
          page:{
              size:this.pageSize,
              current:this.currentPage
          }
      }
      this.$http.post("/api/carrier/list", params).then(res => {
          if (res.data.ret_code == 0) {
            this.tableData = res.data.data.records
            this.totalSize = parseInt(res.data.data.total)
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        }).catch(err => {
        });
    },
    //搜索
    onSubmit() {
        this.getData()
    },
    //表头样式
    rowClass() {
      return "background:rgba(248,248,248,1); height: 45px;font-weight: normal;";
    },
    //详情
    handleEdit(index, row) {
       this.$router.push({
        path:'/fleetdetail',
        query:{vehgrpnum:row.vehgrpnum}  
      })
    },
    //删除
    handleDelete(index, row) {

      this.$confirm('此操作将永久删除该车队, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.delete('/api/carrier/delVehicleGroup?vehgrpnum='+row.vehgrpnum,{}).then(res => {
          // console.log(res.data);
            if (res.data.ret_code == 0) {
              this.$message({
                type: 'success',
                message: '车队删除成功'
              });
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 每页条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    //添加车队 遮罩层
    addFleete() {
      this.fleeteVisible = true;
    },
    //遮罩 确定
    define() {
        var params = {
            personMobile: this.addform.phone,//联系电话
            vehgrpnum: this.addform.carNum,//车队编号
            personName: this.addform.user,//联系人
            vehgrpdrc: this.addform.info,//描述信息
            vehgrpnam: this.addform.name,//车队名称
        }
        this.$http.post("/api/carrier/save", params).then(res => {
            if (res.data.ret_code == 0) {
                this.$message({
                        type: "success",
                        message: res.data.data
                });
                this.addform = {
                  //弹框数据
                  name: "", //车队名称
                  user: "", //联系人
                  phone: "", //联系电话
                  info: "" //车队简介
                }
                this.getData();//获取表格数据
              this.fleeteVisible = false;
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
        }).catch(err => {
        });
    },
    //遮罩 取消
    cancel(){
      this.addform = {
                  //弹框数据
                  name: "", //车队名称
                  user: "", //联系人
                  phone: "", //联系电话
                  info: "" //车队简介
                }
      this.fleeteVisible = false;
    },
    //遮罩 x
    handleDialogClose(){
      this.addform = {
                  //弹框数据
                  name: "", //车队名称
                  user: "", //联系人
                  phone: "", //联系电话
                  info: "" //车队简介
                }
      this.fleeteVisible = false;
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
  overflow: hidden;
  .el-button {
    float: left;
    width: 100px;
    height: 32px;
  }
}
#tableId {
  width: 100%;
}
@media screen and (min-width: 1400px) {
  #tableId {
    width: 1160px;
  }
}
.fleeteVisible {
  /deep/ .el-dialog__body {
    border-bottom: solid 1px #ebebeb !important;
    border-top: solid 1px #ebebeb !important;
  }
  .el-form {
    width: 70%;
    margin: 0 auto;
    .el-form-item {
      margin-bottom: 50px;
    }
    .el-form-item:last-child {
      margin-bottom: 0px;
    }
  }
}
</style>
