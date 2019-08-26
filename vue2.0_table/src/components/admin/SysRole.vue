<template>
  <div class="container messageboard">
    <!-- 查询区----start -->

    <el-form
      :label-position="labelPosition"
      :label-width="labelWidth"
      :inline="true"
      ref="formSearch"
      :model="formSearch"
      class="demo-form-inline"
    >

      <el-form-item label="选择年份：" prop="createtime" class="el-form-item-date">
       <el-date-picker
      v-model="year"
      type="year"
      placeholder="选择年">
    </el-date-picker>

      </el-form-item>
      <el-form-item label="选择月份：" prop="type" class="el-form-item-date">
        <el-select v-model="formSearch1.type" placeholder="请选择">
          <el-option label="全部" value="all"></el-option>
          <el-option label="一月" value="01"></el-option>
          <el-option label="二月" value="02"></el-option>
          <el-option label="三月" value="03"></el-option>
           <el-option label="四月" value="04"></el-option>
          <el-option label="五月" value="05"></el-option>
          <el-option label="六月" value="06"></el-option>
          <el-option label="七月" value="07"></el-option>
          <el-option label="八月" value="08"></el-option>
          <el-option label="九月" value="09"></el-option>
          <el-option label="十月" value="10"></el-option>
          <el-option label="十一月" value="11"></el-option>
          <el-option label="十二月" value="12"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物流商名称：" prop="type" class="el-form-item">
        <el-select v-model="formSearch.type" placeholder="请选择">
          <el-option label="留言" value="1"></el-option>
          <el-option label="建议" value="2"></el-option>
          <el-option label="BUG" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" " class="Search-button">
        <el-button type="primary" @click="onSearch" class="onSearch">搜索</el-button>
        <el-button type="warning" plain @click="onReset" class="onReset">清空</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-form
      :label-position="labelPosition"
      :label-width="labelWidth"
      :inline="true"
      ref="formSearch"
      :model="formSearch"
      class="demo-form-inline"
    >
      <el-form-item label="物流商名称" prop="type" class="el-form-item-wu">
        <el-select v-model="formSearch.type" placeholder="请选择">
          <el-option label="留言" value="1"></el-option>
          <el-option label="建议" value="2"></el-option>
          <el-option label="BUG" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择日期" prop="createtime" class="el-form-item-date">
        <el-date-picker
          v-model="formSearch.createtime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label=" " class="Search-button">
        <el-button type="primary" @click="onSearch" class="onSearch">搜索</el-button>
        <el-button type="warning" plain @click="onReset" class="onReset">清空</el-button>
      </el-form-item>
    </el-form> -->

    <div class="con-box">
      <!-- <div class="con-tab">
        <div @click="tabChange(0)" :class="tabIndex==0?'tabActive':''">
          <span>约车装货</span>
        </div>
        <div @click="tabChange(1)" :class="tabIndex==1?'tabActive':''">
          <span>现场违规</span>
        </div>
      </div> -->
      <div class="con-excel">
        <div>
          <span class="con-excel-item">导出excel</span>
          <span class="con-searchList">
            共搜索到
            <b>3</b> 条数据
          </span>
        </div>
      </div>
      <el-table
        :data="tableData"
        v-loading="listLoading"
        :header-cell-style="tableSty"
        border
        stripe
        size="small"
        height="341"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="60"></el-table-column> -->
        <el-table-column prop="age" label="排名" width="50" align="center"></el-table-column>
        <el-table-column prop="age" label="评级" align="center" width="50"></el-table-column>
        <el-table-column prop="name" label="承运商" align="center">
          <template slot-scope="scope">
            <a
              href="javacript:;"
              style="color: #E31D2B"
              @click="openDetail(scope.row)"
            >{{ scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="隔日发货车数" align="center" width="120"></el-table-column>
        <el-table-column prop="age" label="超时派车车数" align="center" width="120"></el-table-column>
        <el-table-column prop="age" label="超时到车车数" align="center" width="120"></el-table-column>
        <el-table-column prop="age" label="约车罚款" align="center" width="120"></el-table-column>
        <el-table-column prop="age" label="现场违规（次）" align="center" width="120"></el-table-column>
        <el-table-column prop="age" label="违规罚款金额（元）" align="center" width="150"></el-table-column>

        <el-table-column label="操作" fixed="right" align="center" min-width="50">
          <template slot-scope="scope">
            <el-button
              size="mini"
              plain
              type="primary"
              class="table-info"
              @click="handleDetail(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,sizes,prev, pager, next,jumper"
        :current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.pageTotal"
        :page-sizes="[5, 10, 20, 50]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="pagination"
      ></el-pagination>
    </div>
    <!-- 表格---end -->

    <!-- 编辑弹框---start  :title="formEditTitle"-->
    <el-dialog

      :visible.sync="dialogEdittVisible"
      width="1200px"
      @close="closeDialog('formEdit')"
    >
      <div class="con-box">
      <div class="con-tab">
        <div @click="tabChange(0)" :class="tabIndex==0?'tabActive':''">
          <span>约车装货</span>
        </div>
        <div @click="tabChange(1)" :class="tabIndex==1?'tabActive':''">
          <span>现场违规</span>
        </div>
      </div>
      <div class="con-excel">
        <div>
          <span class="con-excel-item">导出excel</span>
          <span class="con-searchList">
            共搜索到
            <b>3</b> 条数据
          </span>
        </div>
      </div>
      <el-table
      v-show="tabIndex==0"
        :data="tableData"
        v-loading="listLoading"
        :header-cell-style="tableSty"
        border
        stripe
        size="small"
        max-height="241"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="60"></el-table-column> -->
        <el-table-column prop="age" label="排名" width="50" align="center"></el-table-column>
        <el-table-column prop="age" label="评级" align="center" width="50"></el-table-column>
        <el-table-column prop="name" label="承运商" align="center">
          <template slot-scope="scope">
            <a
              href="javacript:;"
              style="color: #E31D2B"
              @click="openDetail(scope.row)"
            >{{ scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="隔日发货车数" align="center" width="120"></el-table-column>
        <el-table-column prop="age" label="超时派车车数" align="center" width="120"></el-table-column>
        <el-table-column prop="age" label="超时到车车数" align="center" width="120"></el-table-column>
        <el-table-column prop="age" label="约车罚款" align="center" width="120"></el-table-column>
        <el-table-column prop="age" label="现场违规（次）" align="center" width="120"></el-table-column>
        <el-table-column prop="age" label="违规罚款金额（元）" align="center" width="150"></el-table-column>

        <el-table-column label="操作" fixed="right" align="center" min-width="50">
          <template slot-scope="scope">
            <el-button
              size="mini"
              plain
              type="primary"
              class="table-info"
              @click="handleDetail(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
       <el-table
       v-show="tabIndex==1"
        :data="tableData"
        v-loading="listLoading"
        border
        stripe
        size="small"
        max-height="241"
        style="width: 100%"
        :header-cell-style="tableSty"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="60"></el-table-column> -->
        <el-table-column prop="age" label="日期" width="120" align="center"></el-table-column>
        <el-table-column prop="age" label="车号" align="center" width="100"></el-table-column>
        <el-table-column prop="name" label="原因" align="center">
          <!-- <template slot-scope="scope">
            <a
              href="javacript:;"
              style="color: #E31D2B"
              @click="openDetail(scope.row)"
            >{{ scope.row.name}}</a>
          </template> -->
        </el-table-column>
        <el-table-column prop="age" label="罚款" align="center" width="100"></el-table-column>
        <el-table-column prop="age" label="扣分" align="center" width="100"></el-table-column>
        <el-table-column prop="age" label="上报人" align="center" width="120"></el-table-column>

        <!-- <el-table-column label="操作" fixed="right" align="center" min-width="50">
          <template slot-scope="scope">
            <el-button
              size="mini"
              plain
              type="primary"
              class="table-info"
              @click="handleDetail(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
        background
        v-show="tabIndex==0"
        layout="total,sizes,prev, pager, next,jumper"
        :current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.pageTotal"
        :page-sizes="[5, 10, 20, 50]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="pagination"
      ></el-pagination>
       <el-pagination
        background
        v-show="tabIndex==1"
        layout="total,sizes,prev, pager, next,jumper"
        :current-page="pageInfo1.currentPage"
        :page-size="pageInfo1.pageSize"
        :total="pageInfo1.pageTotal"
        :page-sizes="[5, 10, 20, 50]"
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        class="pagination"
      ></el-pagination>
    </div>

      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdittVisible = false">取 消</el-button>
        <el-button v-if="!formEditDisabled" type="primary" @click="handleSave">确 定</el-button>
      </div> -->
    </el-dialog>

    <!-- 编辑弹框---end -->
  </div>
</template>

<style lang="scss" scoped>
.messageboard {
  // 设置输入框的宽度
  .el-table{
    box-shadow:0px 1px 7px 0px rgba(114,186,255,0.2);
border-radius:10px;
  }
  .el-dialog__body {
  padding: 0;

}
.el-dialog__header {
     padding: 0;
}
.el-dialog__close {
    font-size: 40px;
}
  .el-form-item__content {
    // width: 220px;
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
    padding:  20px 30px 20px 30px;
    padding-bottom: 0;
    .el-form-item{

    }
    .el-form-item-wu {
      // display: block;
      input {
        width: 300px;
        // height: 44px;
        border: 1px solid rgba(204, 204, 204, 1);
        // border-radius: 22px;
      }
    }
    .el-form-item-date {

      i {
        line-height: 1;
      }
      .el-date-editor .el-range-separator {
        line-height: 35px;
      }
.el-input{
width:auto;
}
      .el-input__inner {
        height: 44px;
        width:200px;
        margin-top: 6px;
      }
      //         input{
      // border:1px solid rgba(204,204,204,1);
      // border-radius:4px;
      // }
    }
    .el-form-item__label {
      // width: 100px;
      width: auto!important;
      padding-right: 0px;
    }
  }
  .Search-button {
    margin-left: 150px;
    button {
      height: 35px;
      width: 100px;
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
  .table-info {
    background: linear-gradient(
      90deg,
      rgba(244, 18, 34, 1),
      rgba(237, 63, 62, 1),
      rgba(255, 94, 96, 1)
    ) !important;
  padding: 6px 20px;
    color: #fff !important;
    border: 0;
  }
  .con-box {
    width: 100%;
    height: 100%;
    background: #fff;
   padding:  20px 30px 30px 30px;
    box-sizing: border-box;
    border: 1px solid rgba(242, 245, 248, 1);
    box-shadow: 0px 1px 7px 0px rgba(114, 186, 255, 0.2);
    border-radius: 10px;
    .con-tab {
      width: 240px;
      height: 38px;
      border: 1px solid rgba(227, 29, 43, 1);
      background: #fff;
      border-radius: 19px;
      margin-bottom: 20px;
      div {
        float: left;
        width: 50%;
        height: 38px;
        background: #fff;
        color: #e31d2b;
        border-radius: 19px;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: bold;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
      }
      .tabActive {
        background: linear-gradient(
          90deg,
          rgba(244, 18, 34, 1),
          rgba(237, 63, 62, 1),
          rgba(255, 94, 96, 1)
        );
        color: #fff;
      }
    }
    .con-excel {
      margin-bottom: 15px;
      .con-excel-item {
        display: inline-block;
        text-align: center;
        line-height: 34px;
        width: 102px;
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
    .pagination{
      text-align: center;
      margin-bottom: 0;

    }
  }
}
</style>

<script>
import apis from "../../apis/apis";
export default {
  name: "messageboard",
  data() {
    return {
      listLoading: false, //
      year:'',
      month:'',
      pageInfo: {
        //分页
        currentPage: 1,
        pageSize: 10,
        pageTotal: 80
      },
       pageInfo1: {
        //分页
        currentPage: 1,
        pageSize: 5,
        pageTotal: 60
      },
      formSearch: {
        //表单查询
        name: "",
        city: "",
        type: null,
        age: "",
        gender: null,
        qq: "",
        startdate: null,
        enddate: null
      },
       formSearch1: {
        //表单查询
        name: "",
        city: "",
        type: null,
        age: "",
        gender: null,
        qq: "",
        startdate: null,
        enddate: null
      },
      formEdit: {
        //表单编辑
        id: null,
        name: "",
        city: "",
        type: "",
        age: "",
        gender: null,
        qq: ""
      },
      rulesEdit: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
        type: [{ required: true, message: "请选择类别", trigger: "change" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }]
      },
      formEditTitle: "编辑", //新增，编辑和查看标题
      formEditDisabled: false, //编辑弹窗是否可编辑
      dialogEdittVisible: false, //编辑弹框显示
      dialogType: "", //弹框类型：add,edit,show
      tableData: [
        //表单列表
        {
          id: "1",
          createtime: "2016-05-02",
          name: "李紫婷",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: "2",
          createtime: "2016-05-04",
          name: "杨超越",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: "3",
          createtime: "2016-05-01",
          name: "赖小七",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "4",
          createtime: "2016-05-03",
          name: "张紫宁",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: "1",
          createtime: "2016-05-02",
          name: "李紫婷",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: "2",
          createtime: "2016-05-04",
          name: "杨超越",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: "3",
          createtime: "2016-05-01",
          name: "赖小七",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "4",
          createtime: "2016-05-03",
          name: "张紫宁",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      labelPosition: "left", //lable对齐方式
      labelWidth: "100px", //lable宽度
      formLabelWidth: "120px",
      multipleSelection: [],
      tabIndex: 0
    };
  },
  computed: {},
  filters: {
    convertType: function(type) {
      if (type == 1) {
        return "留言";
      } else if (type == 2) {
        return "建议";
      } else if (type == 3) {
        return "BUG";
      }
    }
  },
  mounted() {
    this.onSearch();
    var loginLog = {
      ip: returnCitySN["cip"],
      city: returnCitySN["cname"] + "-增删改查页"
    };

    apis.shiroApi.loginLog(loginLog);
  },
  methods: {
    /**
     * 查询列表
     */
    onSearch() {
      this.listLoading = true;

      if (this.formSearch.createtime) {
        this.formSearch.startdate = this.formSearch.createtime[0];
        this.formSearch.enddate = this.formSearch.createtime[1];
      }
      let param = Object.assign({}, this.formSearch, this.pageInfo);
      apis.msgApi
        .getList(param)
        .then(data => {
          this.listLoading = false;
          if (data && data.data) {
            var json = data.data;
            if (json.status == "SUCCESS") {
              this.pageInfo.pageTotal = json.count;
              this.tableData = json.data;
            } else if (json.message) {
              this.$message({ message: json.message, type: "error" });
            }
          }
        })
        .catch(err => {
          this.listLoading = false;
          this.$message({ message: "查询异常，请重试", type: "error" });
        });
    },
    tabChange(i) {
      this.tabIndex = i;
    },
    tableSty({row, rowIndex}){
      return 'background:#F3F4F7;color:#555'
    },
    handleSave() {
      if (this.dialogType == "add") {
        this.save();
      } else if (this.dialogType == "edit") {
        this.update();
      } else {
        this.$message({ message: "操作异常", type: "error" });
      }
    },
    /**
     * 保存
     */
    save() {
      this.$refs["formEdit"].validate(valid => {
        if (valid) {
          let param = Object.assign({}, this.formEdit);
          apis.msgApi
            .add(param)
            .then(data => {
              if (data && data.data) {
                var json = data.data;
                if (json && json.status == "SUCCESS") {
                  this.$message({ message: "执行成功", type: "success" });
                  this.dialogEdittVisible = false;
                  this.onSearch();
                  return;
                }
              }
              this.$message({ message: "执行失败，请重试", type: "error" });
            })
            .catch(err => {
              this.$message({ message: "执行失败，请重试", type: "error" });
            });
        }
      });
    },
    /**
     * 更新
     */
    update() {
      this.$refs["formEdit"].validate(valid => {
        if (valid) {
          let param = Object.assign({}, this.formEdit);
          apis.msgApi
            .update(param)
            .then(data => {
              if (data && data.data) {
                var json = data.data;
                if (json && json.status == "SUCCESS") {
                  this.$message({ message: "执行成功", type: "success" });
                  this.dialogEdittVisible = false;
                  this.onSearch();
                  return;
                }
              }
              this.$message({ message: "执行失败，请重试", type: "error" });
            })
            .catch(err => {
              this.$message({ message: "执行失败，请重试", type: "error" });
            });
        }
      });
    },
    /**
     * 删除
     */
    handleDelete(index, rowData) {
      if (rowData.name == "使用文档") {
        this.$message("使用文档不可删除");
        return;
      }
      var id = rowData.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apis.msgApi
            .delete({ id: id })
            .then(data => {
              this.$common.isSuccess(data, () => {
                debugger;
                this.onSearch();
              });
            })
            .catch(err => {
              debugger;
              this.$message({ message: "执行失败，请重试", type: "error" });
            });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    /**
     * 批量删除
     */
    deleteMany() {
      var ids = this.multipleSelection.map(item => item.id);
      if (ids.length == 0) {
        this.$message({ message: "请选择要删除的项", type: "warn" });
        return;
      }
      debugger;
      this.$confirm("此操作将批量永久删除文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apis.msgApi
            .deleteBatch({ ids: ids })
            .then(data => {
              this.$common.isSuccess(data, () => {
                debugger;
                this.onSearch();
              });
            })
            .catch(err => {
              debugger;
              this.$message({ message: "执行失败，请重试", type: "error" });
            });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    onReset() {
      this.$refs["formSearch"].resetFields();
    },
    /**
     * 打开编辑弹窗
     */
    handleAdd() {
      this.dialogEdittVisible = true;
      this.$nextTick(() => {
        this.dialogType = "add";
        this.formEditTitle = "新增";
        this.formEditDisabled = false;
      });
    },
    /**
     * 打开编辑弹窗
     */
    handleEdit(index, rowData) {
      //var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
      //this.$message({message: msg,type: "success"});
      this.dialogEdittVisible = true; //等dom渲染完，读取data中初始值，然后再复制，这样重置的是data中初始值
      this.$nextTick(() => {
        this.dialogType = "edit";
        this.formEditTitle = "编辑";
        this.formEditDisabled = false;
        this.formEdit = Object.assign({}, rowData);
        this.formEdit.gender += ""; //必须转换成字符串才能回显
      });
    },
    /**
     * 打开详情页
     */
    handleDetail(index, rowData) {
      this.dialogEdittVisible = true;
      this.$nextTick(() => {
        this.dialogType = "show";
        this.formEditTitle = "详情";
        this.formEditDisabled = true;
        this.formEdit = Object.assign({}, rowData);
        this.formEdit.gender += "";
      });
    },
    /**
     * 关闭弹框，数据重置
     */
    closeDialog(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 分页大小切换
     */
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.onSearch();
    },
    handleSizeChange1(val) {
      this.pageInfo1.pageSize = val;
      this.onSearch();
    },
    /**
     * 分页切换
     */
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.onSearch();
    },
     handleCurrentChange1(val) {
      this.pageInfo1.currentPage = val;
      this.onSearch();
    },
    /**
     * 点击选择
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      // this.$message({
      //     message: '选中的项是:' + JSON.stringify(this.multipleSelection),
      //     type: "success"
      // });
    },
    /**
     * 打开详情页
     */
    openDetail(row) {
      this.$common.OpenNewPage(this, "detail", row);
    }
  }
};
</script>
