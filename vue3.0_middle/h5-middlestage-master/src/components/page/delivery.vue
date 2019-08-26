<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 单据管理</el-breadcrumb-item>
        <el-breadcrumb-item>送货单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form :model="form" class="formseo">
        <!--        <el-form-item>-->
        <!--          <el-select v-model="form.oderStatus" placeholder="订单状态">-->
        <!--            <el-option v-for="item in oderStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item>
          <el-select v-model="form.fleet" placeholder="选择车队">
            <el-option v-for="item in fleetList" :key="item.vehgrnum" :label="item.vehgrnam"
                       :value="item.vehgrnum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.driver" placeholder="选择车号">
            <el-option v-for="item in driverList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.sendNum" clearable placeholder="请输入送货单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.getNum" clearable placeholder="请输入装运单号"></el-input>
        </el-form-item>
        <!--        <el-form-item>-->
        <!--          <el-input v-model="form.oderName" clearable placeholder="请输入客户名称"></el-input>-->
        <!--        </el-form-item>-->
        <el-button type="primary" @click="searchList()">搜索</el-button>
      </el-form>
      <div class="magSend">
        <el-button type="success" @click="addBill">添加送货单</el-button>
        <el-radio-group v-model="radioStatus" size="small" style="margin-left: 30px;" @change="selstate">
          <el-radio-button label="0">未完成</el-radio-button>
          <el-radio-button label="1">已完成</el-radio-button>
        </el-radio-group>
      </div>
      <div id="tableId">
        <el-table v-loading="tabLoading" :data="tableData" :header-cell-style="rowClass"
                  style="width: 100%; margin-top: 20px;">
          <el-table-column align="center" prop="deldocnum" label="送货单号" width="140"></el-table-column>
          <el-table-column align="center" prop="tradocnum" label="装运单号" width="140"></el-table-column>
          <el-table-column align="center" prop="times" label="计划送货时间" width="140"></el-table-column>
          <el-table-column align="center" prop="deloutnam" label="客户" width="200"></el-table-column>
          <!--          <el-table-column align="center" prop="date" label="订单金额" width="100"></el-table-column>-->
          <el-table-column align="center" prop="shpartqty" label="总数量" width="100">
            <template slot-scope="scope">
              <a v-if="scope.row.shpartqty">{{ scope.row.shpartqty }} 箱</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="totartwgt" label="总重量" width="100">
            <template slot-scope="scope">
              <a v-if="scope.row.totartwgt">{{ (scope.row.totartwgt / 1000).toFixed(2) }} 吨</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="vehgrpnam" label="车队名称" width="160"></el-table-column>
          <el-table-column align="center" prop="vehlicnum" label="车辆牌号" width="120"></el-table-column>
          <el-table-column align="center" prop="drinam" label="司机" width="100"></el-table-column>
          <el-table-column align="center" prop="mobilenum" label="司机电话" width="120"></el-table-column>
          <!--          <el-table-column align="center" prop="date" label="付款条件" width="100"></el-table-column>-->
          <!--          <el-table-column align="center" prop="date" label="状态" width="120"></el-table-column>-->
          <el-table-column align="center" prop="date" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="getDetail(scope.row.deldocnum)">详情</el-button>
              <el-button type="text" size="small" @click="delRow(scope.row.deldocnum)">删除</el-button>
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
    </div>
  </div>
</template>

<script>
    export default {
        data: function () {
            return {
                form: {
                    oderStatus: '', // 订单状态默认
                    fleet: null, // 车队默认
                    driver: null, // 车号默认
                    oderName: '', // 客户名称
                    getNum: null, // 装运单号
                    sendNum: null // 送货单号
                },
                oderStatusList: [], // 订单状态列表
                fleetList: [], // 车队列表
                driverList: [], // 司机列表
                tableData: [], // 表格数据
                currentPage: 1, // 当前页
                pageSize: 20, // 每页条数
                totalSize: 0, // 总条数
                radioStatus: '0', // 完成状态
                tabLoading: false
            }
        },
        mounted() {
            this.carGroupList() // 车队列表
            this.getTableList() // 表格列表
        },
        methods: {
            // 表头样式
            rowClass() {
                return 'background:rgba(248,248,248,1); height: 45px;font-weight: normal;'
            },
            // 列表搜索
            searchList: function () {
                this.getTableList()
            },
            // 表格列表
            getTableList: function () {
                this.tabLoading = true
                if (this.form.fleet === '') {
                    this.form.fleet = null
                }
                if (this.form.driver === '') {
                    this.form.driver = null
                }
                if (this.form.getNum === '') {
                    this.form.getNum = null
                }
                if (this.form.sendNum === '') {
                    this.form.sendNum = null
                }
                const data = {
                    trigger: this.radioStatus,
                    page: this.currentPage,
                    size: this.pageSize,
                    vehgrpnum: this.form.fleet,
                    vehicleNum: this.form.driver,
                    tradocnum: this.form.getNum,
                    deldocnum: this.form.sendNum
                }
                this.$http.post('/api/deldocs/display', data).then(res => {
                    this.tabLoading = false
                    if (res.data.ret_code === '0') {
                        this.tableData = res.data.data.deliveryDocs
                        this.totalSize = res.data.data.nums
                        for (let i = 0; i < this.tableData.length; i++) {
                            this.tableData[i].times = this.getTime(this.tableData[i].plndeldat)
                            // console.log(this.tableData[i])
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            // 车队列表/车牌号
            carGroupList: function () {
                this.$http.post('/api/deldocs/display/init').then(res => {
                    this.fleetList = res.data.data.vehgrps
                    this.driverList = res.data.data.vehnums
                })
            },
            // 详情
            getDetail: function (val) {
                this.$router.push({ path: '/deliveryNote', query: { id: val } })
            },
            // 删除
            delRow: function(val) {
                this.$confirm('确认删除此数据吗？').then(() => {
                    const data = {
                        deldocnum: val
                    }
                      this.$http.post('/api/deldocs/delete', data).then(res => {
                          if (res.data.ret_code === '0') {
                              this.$message.success('删除成功')
                              this.getTableList()
                          } else {
                              this.$message({
                                  type: 'error',
                                  message: res.data.msg
                              })
                          }
                      })
                }).catch(() => {

                })
            },
            // 已完成/未完成切换
            selstate: function () {
                this.getTableList()
            },
            // 录入
            addBill: function () {
                this.$router.push('/addoderList')
            },
            // 每页条数
            handleSizeChange(val) {
                this.pageSize = val
                this.getTableList()
            },
            // 当前页
            handleCurrentChange(val) {
                this.currentPage = val
                this.getTableList()
            },
            // 时间戳转时间
            getTime: function (timestamp) {
                let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
                let h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
                let m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
                let s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
                // return Y+M+D+h+m+s;
                return Y+M+D;
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
  }

  #tableId {
    width: 100%;
  }

  @media screen and (min-width: 1400px) {
    #tableId {
      width: 1500px;
    }
  }
</style>