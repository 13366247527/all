<template>
  <div class="container messageboard">
    <!-- 查询区----start -->
    <div class="con-box">
      <el-form
        :label-position="labelPosition"
        :inline="true"
        ref="formSearch"
        :model="formSearch"
        class="demo-form-inline demo-form-inline1"
      >
        <el-form-item label="选择日期：" prop="createtime" class="demo-form-date el-form-item-date">
          <el-date-picker
            v-model="formSearch.createtime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="物流商：" prop="type" class="el-form-item">
          <el-select v-model="vehgrpnum" placeholder="请选择">
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
<div class="table_box" id="table_box">
      <el-table
        :data="tableData"
        v-loading="listLoading"
        border
        stripe
        size="small"
        style="width: 100%"
       :height="tableHeight"
        :header-cell-style="tableSty"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="60"></el-table-column> -->
        <el-table-column
      type="index"
      :index="indexMethod" label="序号" align="center">
    </el-table-column>
        <el-table-column prop="crdat" label="出单日期" min-width="15%" align="center" sortable></el-table-column>
        <el-table-column prop="tradocnum" label="装运单号" align="center" min-width="15%" sortable></el-table-column>
        <el-table-column prop="deldocnum" label="送货单号" align="center" min-width="15%" sortable></el-table-column>
        <el-table-column prop="outnam" label="客户" align="center" min-width="25%" sortable></el-table-column>
        <!-- <el-table-column prop="vehlicnum" label="车号" align="center" min-width="100"></el-table-column> -->
        <el-table-column prop="shpartqty" label="数量(箱)" align="center" min-width="15%" sortable></el-table-column>
        <el-table-column prop="totartwgt" label="重量(吨)" align="center" min-width="15%" sortable></el-table-column>
      </el-table>
      </div>
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
    </div>
  </div>
</template>

<style lang="scss" scoped>

.messageboard {
  height:100%;
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

  // 设置输入框的宽度
  .el-form-item__content {
    // width: 220px;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .table_box {
    position: absolute;
    bottom: 100px;
    top: 9.375vw;
    right:0;
    left:0;
    padding:0 30px;
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
    }
    .el-form-item-wu {
      // display: block;
      input {
        width: 200px;
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
        // line-height: 35px;
      }
      .el-input {
        width: auto;
      }
      .el-input__inner {
        //height: 44px;
        width: 400px;

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
    //  margin-right:100px;

    .el-form-item__content {
      width: auto !important;
    }
  }
  .Search-button {
   // margin-left: 150px;
    button {
      height: 35px;
      //width: 100px;
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
      position: absolute;
      text-align: center;
      bottom: 0px;
     right:0;
    left:0;
    }
  }
}
</style>

<script>
import apis from "../../apis/apis";
import { getVehgrpnam, carDetaileds, DetailedExport } from "../../apis/apis";

export default {
  name: "messageboard",
  data() {
    return {
       tableHeight:null,
      listLoading: false,
      options: [],
      pageInfo: {
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
  filters: {},
  mounted() {
    this.onSearch();
    getVehgrpnam().then(data => {
      this.options = data.data.data;
    });
    var top = document.getElementById("table_top");
    var topH = top.offsetTop + "px"; //高度
    document.getElementById("table_box").style.top = topH;
    document.getElementById("table_box").style.bottom = 70 + "px";
      var o = document.getElementById("table_box");
    var h = o.offsetHeight+'px'; //高度
    this.tableHeight = h
    },
  methods: {
    /**
     * 查询列表
     */
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
     indexMethod(index) {
        return index + 1;
      },
    onSearch(val) {
       if(val == 1){
        this.pageInfo.currentPage=1
      }
      this.listLoading = true;
      let dateTimeStar = "";
      let dateTimeEnd = "";
      if (this.formSearch.createtime) {
        dateTimeStar = this.dateTime(this.formSearch.createtime[0]);
        dateTimeEnd = this.dateTime(this.formSearch.createtime[1]);
      }
      const data = new URLSearchParams();

      data.append("carType", 1);
      data.append("startTime", dateTimeStar ? dateTimeStar : "");
      data.append("endTime", dateTimeEnd ? dateTimeEnd : "");
      data.append("pageNum", this.pageInfo.currentPage);
      data.append("pageSize", this.pageInfo.pageSize);
      data.append("vehgrpnum", this.vehgrpnum);

      carDetaileds(data).then(data => {
        this.listLoading = false;
        if (data && data.data) {
          let json = data.data;
          if (json.ret_code == "0") {
            this.pageInfo.pageTotal = json.data.total;
            this.tableData = json.data.list;
          } else {
            this.$message({ message: json.msg, type: "error" });
          }
        }
      });
    },
    tabChange(i) {
      this.tabIndex = i;
    },
    tableSty({ row, rowIndex }) {
      return "background:#F3F4F7;color:#555";
    },

    outExcel(val) {
      if(this.pageInfo.pageTotal==0){
        this.$message({ message: "没有数据可以导出！", type: "error" });
        return false
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
      data.append("carType", 1);
      data.append("vehgrpnum", this.vehgrpnum);

      DetailedExport(data).then(res => {
        this.listLoading = false;
        let token = this.$common.getSessionStorage("token");
        location.href = `${res.request.responseURL}&token=${token}`;
      });
    },

    onReset() {
      this.formSearch.createtime = "";
      this.vehgrpnum = "";
    },

    /**
     * 分页大小切换
     */
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.onSearch();
    },

    /**
     * 分页切换
     */
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
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
    }
    /**
     * 打开详情页
     */
  }
};
</script>
