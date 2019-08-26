<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 单据管理</el-breadcrumb-item>
        <el-breadcrumb-item>采购单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form :model="form" class="formseo">
        <el-form-item>
          <el-select v-model="form.supplyName" clearable placeholder="全部供应商">
            <el-option v-for="item in supply" :key="item.supnum" :label="item.supnam" :value="item.supnum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.oderStatus" clearable placeholder="订单状态">
            <el-option v-for="item in oderList" :key="item.selval" :label="item.valdescl" :value="item.selval"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.payment" clearable placeholder="付款条件">
            <el-option v-for="item in paymentList" :key="item.selval" :label="item.valdescl" :value="item.selval"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.oderNameNum" clearable placeholder="请输入订单编号/客户名称"></el-input>
        </el-form-item>
        <el-button type="primary" @click="searchList()">搜索</el-button>
      </el-form>
      <div class="magSend">
        <el-button type="success" @click="addBill">录入</el-button>
      </div>
      <div id="tableId">
        <el-table v-loading="tabLoad" :data="tableData" :header-cell-style="rowClass" style="width: 100%; margin-top: 20px;">
          <el-table-column align="center" prop="purplndocnum" label="订单编号" width="170">
            <template slot-scope="scope">
              <a style="color: #409EFF;">{{ scope.row.purplndocnum }}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="supplierName" label="供应商" width="190"></el-table-column>
          <el-table-column align="center" prop="totalCost" label="订单金额" width="120">
            <template slot-scope="scope">
              {{ scope.row.totalCost }} ¥
            </template>
          </el-table-column>
          <el-table-column align="center" prop="totalCount" label="总数量" width="120">
            <template slot-scope="scope">
              {{ scope.row.totalCount }} 箱
            </template>
          </el-table-column>
          <el-table-column align="center" prop="totalWeight" label="总重量" width="120">
            <template slot-scope="scope">
              {{ scope.row.totalWeight }} 吨
            </template>
          </el-table-column>
          <el-table-column align="center" prop="payCondition" label="付款条件" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.payCondition === '0'">预付款</span>
              <span v-if="scope.row.payCondition === '1'">货到已付款</span>
              <span v-if="scope.row.payCondition === '2'">货到未付款</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="mneprcsta" label="状态" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.mneprcsta === '1'">未完成</span>
              <span v-if="scope.row.mneprcsta === '2'">已完成</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="getDetail(scope.row.id)">详情</el-button>
              <el-button type="text" size="small" @click="delMsg(scope.row.id)">删除</el-button>
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
          :total="totalSize">
      </el-pagination>
      <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="24%">
          <span>确认删除本条数据？</span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
        data: function(){
            return {
                form: {
                    supplyName: '', // 默认供应商
                    oderStatus: '', // 订单状态默认
                    payment: '', // 付款条件默认
                    oderNameNum: '' // 订单编好/客户名称
                },
                supply: [], // 供应商数据
                oderList: [], // 订单状态数据
                paymentList: [], // 付款条件数据
                tableData: [], // 表格数据
                currentPage: 1, // 当前页
                pageSize: 20, // 每页条数
                totalSize: 0, // 总条数
                tabLoad: false, // 表格loading
                dialogVisible: false, // 删除提示
                delId: '' // 删除行id
            }
        },
        mounted() {
            this.selectBar() // 下拉列表
            this.getDataList() // 表格数据
            this.merchantList() // 承运商下拉列表
        },
        methods: {
            // 表头样式
            rowClass() {
                return 'background:rgba(248,248,248,1); height: 45px;font-weight: normal;'
            },
            // 订单状态 && 付款条件下拉列表
            selectBar: function() {
                this.$http.post('/api/outlet/initDict').then(res => {
                    if (res.data.ret_code === '0') {
                        this.oderList = res.data.data.mneprcsta
                        this.paymentList = res.data.data.payTerm
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            // 承运商下拉列表
            merchantList: function() {
                this.$http.get('/api/purchaseOrder/supplier').then(res => {
                    if (res.data.ret_code === '0') {
                        this.supply = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            // 表格数据
            getDataList: function() {
                this.tabLoad = true
                const data = {
                    page: {
                        current: this.currentPage,
                        size: this.pageSize,
                    },
                    keyword: this.form.oderNameNum,
                    payCondition: this.form.payment,
                    supplierNum: this.form.supplyName,
                    mneprcsta: this.form.oderStatus
                }
                this.$http.post('/api/purchaseOrder/list', data).then(res => {
                    this.tabLoad = false
                    if (res.data.ret_code === '0') {
                        this.totalSize = Number(res.data.data.total)
                        this.tableData = res.data.data.records
                    }
                })
            },
            // 列表搜索
            searchList: function () {
                this.getDataList()
            },
            // 录入
            addBill: function () {
                this.$router.push('/addbill')
            },
            // 每页条数
            handleSizeChange(val) {
                this.pageSize = val
                this.getDataList()
            },
            // 当前页
            handleCurrentChange(val) {
                this.currentPage = val
                this.getDataList()
            },
            // 详情
            getDetail: function (val) {
                this.$router.push({ path: '/billDetail', query: { id: val } })
            },
            delMsg: function(val) {
              this.dialogVisible = true
                this.delId = val
            },
            // 删除行
            deleteRow: function () {
                this.$http.delete('/api/purchaseOrder/' + this.delId).then(res => {
                    this.dialogVisible = false
                    if (res.data.ret_code === '0') {
                        this.getDataList()
                        this.$message.success('删除成功')
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
  .formseo {
    height: 34px;
    .el-form-item {
      display: inline-block;
      float: left;
      margin-left: 20px;
    }
    .el-form-item:first-child {
      margin-left: 0;
    }
    .el-select, .el-input {
      width: 200px;
      /*float: left;*/
    }
    .el-button {
      float: left;
      margin-left: 20px;
    }
  }
  .magSend {
    clear: both;
    .el-button {
      width: 80px;
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
</style>