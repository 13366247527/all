<template>
  <div class="container messageboard">
    <!-- 查询区----start -->

    <el-form
      :label-position="labelPosition"
      :inline="true"
      ref="formSearch"
      :model="formSearch"
      class="demo-form-inline"
    >
      <el-form-item label="选择年份：" prop="createtime" class="el-form-item-date">
        <el-date-picker v-model="year" type="year" placeholder="选择年"></el-date-picker>
      </el-form-item>
      <el-form-item label="选择月份：" prop="type" class="el-form-item-date">
        <el-select v-model="formSearch1.type" placeholder="请选择">
          <el-option label="全部" value="all"></el-option>
          <el-option label="1月" value="01"></el-option>
          <el-option label="2月" value="02"></el-option>
          <el-option label="3月" value="03"></el-option>
          <el-option label="4月" value="04"></el-option>
          <el-option label="5月" value="05"></el-option>
          <el-option label="6月" value="06"></el-option>
          <el-option label="7月" value="07"></el-option>
          <el-option label="8月" value="08"></el-option>
          <el-option label="9月" value="09"></el-option>
          <el-option label="10月" value="10"></el-option>
          <el-option label="11月" value="11"></el-option>
          <el-option label="12月" value="12"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物流商名称：" prop="type" class="el-form-item">
        <el-select v-model="formSearch.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.vehgrpnam"
            :value="item.vehgrpnum"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" " class="Search-button">
        <el-button type="primary" @click="onSearch(1)" class="onSearch">搜索</el-button>
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
    </el-form>-->

    <div class="con-box">
      <!-- <div class="con-tab">
        <div @click="tabChange(0)" :class="tabIndex==0?'tabActive':''">
          <span>约车装货</span>
        </div>
        <div @click="tabChange(1)" :class="tabIndex==1?'tabActive':''">
          <span>现场违规</span>
        </div>
      </div>-->
      <div class="con-excel">
        <div>
          <span class="con-excel-item" @click="outExcel(0)">导出excel</span>
          <span class="con-searchList">
            共搜索到
            <b>{{pageInfo.pageTotal}}</b> 条数据
          </span>
        </div>
      </div>
      <div id="table_top"></div>
      <div class="table_box1" id="table_box1">
        <el-table
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
          <!-- <el-table-column type="selection" width="60"></el-table-column> -->
          <el-table-column prop="sortNum" label="排名" min-width="5%" align="center"></el-table-column>
          <el-table-column prop="grade" label="评级" align="center" min-width="5%"></el-table-column>
          <el-table-column prop="vehgrpnam" label="承运商" min-width="20%" align="center">
            <template slot-scope="scope">
              <a
                href="javacript:;"
                style="color: #E31D2B"
                @click="handleDetail(scope.$index,scope.row)"
              >{{ scope.row.vehgrpnam}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="nextDayCount" label="隔日发货车数" align="center" min-width="10%"></el-table-column>
          <el-table-column prop="timeoutCount" label="超时派车车数" align="center" min-width="10%"></el-table-column>
          <el-table-column prop="overtimeCount" label="超时到车车数" align="center" min-width="10%"></el-table-column>
          <el-table-column prop="appointAmount" label="约车罚款" align="center" min-width="10%"></el-table-column>
          <el-table-column prop="violationsCount" label="现场违规（次）" align="center" min-width="10%"></el-table-column>
          <el-table-column prop="violationsAmount" label="违规罚款（元）" align="center" min-width="10%"></el-table-column>

          <el-table-column label="操作"  align="center" min-width="10%">
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

    <!-- 编辑弹框---start  :title="formEditTitle"-->
    <el-dialog :visible.sync="dialogEdittVisible" class="closeL" @close="closeDialog('formEdit')">
      <div class="con-box">
        <el-form
          :label-position="labelPosition"
          :label-width="labelWidth"
          :inline="true"
          ref="formSearch"
          :model="formSearch"
          class="demo-form-inline demo-form-inline1"
        >
          <el-form-item label="选择日期：" prop="createtime" class="demo-form-date">
            <el-date-picker
              v-model="formSearch.createtime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="车牌号：" prop="type" class="el-form-item-wu">
            <el-input v-model="vehlicnum"></el-input>
          </el-form-item>
          <el-form-item label=" " class="Search-button">
            <el-button type="primary" @click="onSearchInfo(1)" class="onSearch">搜索</el-button>
            <el-button type="warning" plain @click="onResetInfo" class="onReset">清空</el-button>
          </el-form-item>
        </el-form>
        <!-- <div class="con-tab">
          <div @click="tabChange(0)" :class="tabIndex==0?'tabActive':''">
            <span>约车装货</span>
          </div>
          <div @click="tabChange(1)" :class="tabIndex==1?'tabActive':''">
            <span>现场违规</span>
          </div>
        </div>-->
        <div class="con-excel">
          <div>
            <span class="con-excel-item" @click="outExcelInfo(0)">导出excel</span>
            <span class="con-searchList">
              共搜索到
              <b>{{pageInfo1.pageTotal}}</b> 条数据
            </span>
          </div>
        </div>
        <el-table
          v-show="tabIndex==0"
          :data="tableDataInfo"
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
          <el-table-column prop="date" label="日期" min-width="15%" align="center"></el-table-column>
          <el-table-column prop="sortNum" label="序号" align="center" min-width="15%"></el-table-column>
          <el-table-column prop="vehlicnum" label="车号" align="center" min-width="15%"></el-table-column>
          <el-table-column prop="reason" label="原因" align="center" min-width="25%"></el-table-column>
          <el-table-column prop="points" label="扣分" align="center" min-width="15%"></el-table-column>
          <el-table-column prop="amount" label="罚款金额(元)" align="center" min-width="15%"></el-table-column>
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
            </template>-->
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
          </el-table-column>-->
        </el-table>
        <!-- <el-pagination
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
        ></el-pagination>-->
        <el-pagination
          background
          v-show="tabIndex==0"
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
      </div>-->
    </el-dialog>

    <!-- 编辑弹框---end -->
  </div>
</template>

<style lang="scss">
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
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__close {
    font-size: 40px;
  }
  .closeL {
    .el-dialog {
      width: 1500px;
    }
  }
  // 设置输入框的宽度
  .el-form-item__content {
    // width: 220px;
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
    }
    .el-form-item-wu {
      // display: block;
      input {
        width: 200px;
        // height: 44px;
        border: 1px solid rgba(204, 204, 204, 1);
      }
    }

    .el-form-item-date {
      i {
        line-height: 1;
      }
      // .el-date-editor .el-range-separator {
      //   line-height: 35px;
      // }
      .el-input {
        width: 200px;
      }

      .el-input__inner {
        // height: 44px;
        width: 200px;
        // margin-top: 6px;
      }
      //         input{
      // border:1px solid rgba(204,204,204,1);
      // border-radius:4px;
      // }
    }
    .el-form-item__label {
      // width: 100px;
      width: auto !important;
      padding-right: 0px;
    }
  }
  .demo-form-inline1 {
    margin-right: 100px;

    .el-form-item__content {
      width: auto !important;
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
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 20px 30px 30px 30px;
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
  getList,
  getVehgrpnam,
  outExport,
  getViolationsList,
  outExportInfo
} from "../../apis/apis";

export default {
  name: "messageboard",
  data() {
    return {
      tableHeight:null,
      listLoading: false, //
      year: "",
      month: "",
      options: [],
      pageInfo: {
        //分页
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0
      },
      pageInfo1: {
        //分页
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0
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
      tableData: [],
      tableDataInfo: [],
      labelPosition: "left", //lable对齐方式
      labelWidth: "100px", //lable宽度
      formLabelWidth: "120px",
      multipleSelection: [],
      tabIndex: 0,
      vehgrpnum: "",
      vehlicnum: ""
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
    getVehgrpnam().then(data => {
      this.options = data.data.data;
    });

    var top = document.getElementById("table_top");
    var topH = top.offsetTop + "px"; //高度
    document.getElementById("table_box1").style.top = topH;
    document.getElementById("table_box1").style.bottom = 70 + "px";
    var o = document.getElementById("table_box1");
    var h = o.offsetHeight + "px"; //高度
    this.tableHeight = h;
  },
  methods: {
    /**
     * 查询列表
     */
    onSearch(val) {
      if (val == 1) {
        this.pageInfo.currentPage = 1;
      }
      this.listLoading = true;
      let dateTime = "";
      if (this.year) {
        let dates = new Date(this.year);
        dateTime = dates.getFullYear();
      } else {
        if (this.formSearch1.type) {
          let dates = new Date();
          dateTime = dates.getFullYear();
        }
      }

      const data = new URLSearchParams();
      let month = this.formSearch1.type;

      if (this.formSearch1.type == "all") {
        month = "";
      }
      data.append("year", dateTime ? dateTime : "");
      data.append("month", month ? month : "");
      data.append("pageIndex", this.pageInfo.currentPage);
      data.append("pageSize", this.pageInfo.pageSize);
      data.append(
        "vehgrpnum",
        this.formSearch.type ? this.formSearch.type : ""
      );
      getList(data)
        .then(data => {
          this.listLoading = false;

          if (data && data.data) {
            let json = data.data;

            if (json.ret_code == "0") {
              // console.log(json.data);
              this.pageInfo.pageTotal = json.data.total;
              this.tableData = json.data.list;
            }
            // else {
            //   this.$message({ message: json.message, type: "error" });
            // }
          }
        })
        .catch(err => {
          this.listLoading = false;
          // this.$message({ message: "查询异常，请重试", type: "error" });
        });
    },
    dateTime(time) {
      let dates = new Date(time);
      return (
        dates.getFullYear() +
        "/" +
        (dates.getMonth() + 1 < 10
          ? "0" + (dates.getMonth() + 1)
          : dates.getMonth() + 1) +
        "/" +
        (dates.getDate() < 10 ? "0" + dates.getDate() : dates.getDate())
      );
    },
    onSearchInfo(val) {
      if (val == 1) {
        this.pageInfo1.currentPage = 1;
      }
      this.listLoading = true;
      let dateTimeStar = "";
      let dateTimeEnd = "";
      if (this.formSearch.createtime) {
        dateTimeStar = this.dateTime(this.formSearch.createtime[0]);
        dateTimeEnd = this.dateTime(this.formSearch.createtime[1]);
      }
      const data = new URLSearchParams();
      data.append("startTime", dateTimeStar ? dateTimeStar : "");
      data.append("endTime", dateTimeEnd ? dateTimeEnd : "");
      data.append("vehlicnum", this.vehlicnum ? this.vehlicnum : "");
      data.append("pageIndex", this.pageInfo1.currentPage);
      data.append("pageSize", this.pageInfo1.pageSize);
      data.append("vehgrpnum", this.vehgrpnum);

      getViolationsList(data)
        .then(data => {
          this.listLoading = false;

          if (data && data.data) {
            let json = data.data;
            if (json.ret_code == "0") {
              this.pageInfo1.pageTotal = json.data.total;
              this.tableDataInfo = json.data.list;
            }
            //  else {
            //   this.$message({ message: json.message, type: "error" });
            // }
          }
        })
        .catch(err => {
          this.listLoading = false;
          //this.$message({ message: "查询异常，请重试", type: "error" });
        });
    },
    tabChange(i) {
      this.tabIndex = i;
    },
    tableSty({ row, rowIndex }) {
      return "background:#F3F4F7;color:#555";
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
    outExcelInfo(val) {
      if (this.pageInfo1.pageTotal == 0) {
        this.$message({ message: "没有数据可以导出！", type: "error" });
        return false;
      }
      this.listLoading = true;
      let dateTimeStar = "";
      let dateTimeEnd = "";
      if (this.formSearch.createtime) {
        dateTimeStar = this.dateTime(this.formSearch.createtime[0]);
        dateTimeEnd = this.dateTime(this.formSearch.createtime[1]);
      }
      const data = new URLSearchParams();
      data.append("startTime", dateTimeStar ? dateTimeStar : "");
      data.append("endTime", dateTimeEnd ? dateTimeEnd : "");
      data.append("vehlicnum", this.vehlicnum ? this.vehlicnum : "");
      data.append("vehgrpnum", this.vehgrpnum);

      outExportInfo(data).then(res => {
        this.listLoading = false;
        let token = this.$common.getSessionStorage("token");
        location.href = `${res.request.responseURL}&token=${token}`;
      });
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
      this.formSearch.type = "";
      this.formSearch1.type = "";
      this.year = "";
    },
    onResetInfo() {
      this.formSearch.createtime = "";
      this.vehlicnum = "";
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
      this.vehgrpnum = rowData.vehgrpnum;
      this.onSearchInfo();
      // this.$nextTick(() => {
      //   this.dialogType = "show";
      //   this.formEditTitle = "详情";
      //   this.formEditDisabled = true;
      //   this.formEdit = Object.assign({}, rowData);
      //   this.formEdit.gender += "";
      // });
    },
    /**
     * 关闭弹框，数据重置
     */
    closeDialog(formName) {
      // this.$refs[formName].resetFields();
      this.formSearch.createtime = "";
      this.vehlicnum = "";
      this.pageInfo1.currentPage = 1;
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
      this.onSearchInfo();
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
      this.onSearchInfo();
    },
    /**
     * 点击选择
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
