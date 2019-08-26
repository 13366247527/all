<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 单据管理</el-breadcrumb-item>
        <el-breadcrumb-item>送货单</el-breadcrumb-item>
        <el-breadcrumb-item>送货单详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container head">
      <div class="tops">
        <span style="font-weight: bold; color: #333;"><a class="publicolor">送货单号：</a><a class="fl">{{ detailist.deldocnum }}</a></span>
        <span><a class="publicolor">计划送货日期：</a><a class="fl">{{ detailist.plndeldat }}</a></span>
        <span><a class="publicolor">实际送货日期：</a><a class="fl">{{ detailist.deldat }}</a></span>
<!--        <el-button size="small" class="danju">预览单据</el-button>-->
      </div>
      <div class="contents ones">
        <span><a class="publicolor">客户编号：</a><a class="fl">{{ detailist.deloutnum }}</a></span>
        <span><a class="publicolor" style="float:left;">客户名称：</a><a class="fl">{{ detailist.deloutnam }}</a></span>
        <span><a class="publicolor">订单号：</a><a class="fl">{{ detailist.orddocnum }}</a></span>
      </div>
      <div class="contents">
        <span><a class="publicolor">装运单号：</a><a class="fl">{{ detailist.tradocnum }}</a></span>
        <span><a class="publicolor">承运商：</a><a class="fl">{{ detailist.vehgrpnam }}</a></span>
        <span><a class="publicolor">送货地址：</a><a class="fl">{{ detailist.outadr }}</a></span>
      </div>
      <div class="contents">
        <span><a class="publicolor">业代名称：</a><a class="fl">{{ detailist.repnam }}</a></span>
        <span><a class="publicolor">业代电话：</a><a class="fl">{{ detailist.repmobilenum }}</a></span>
        <span><a class="publicolor">客户联系人：</a><a class="fl">{{ detailist.contractnam }}</a></span>
      </div>
      <div class="contents">
        <!--        <span><a class="publicolor">销售部门：</a>{{ detailist.cpycod }}</span>-->
        <!--        <span><a class="publicolor">关联单据号：</a>{{ detailist.cpycod }}</span>-->
        <span><a class="publicolor">客户联系电话：</a><a class="fl">{{ detailist.contracttel }}</a></span>
        <span><a class="publicolor">司机联系电话：</a><a class="fl">{{ detailist.mobilenum }}</a></span>
<!--        <span><a class="publicolor">订单状态：</a><a class="fl">{{ detailist.cpycod }}</a></span>-->
        <span></span>
      </div>
      <div class="contents teshu">
<!--        <span><a class="publicolor">付款条件：</a>{{ detailist.cpycod }}</span>-->
<!--        <span><a class="publicolor">订单信息：</a>{{ detailist.cpycod }}</span>-->
      </div>
    </div>
    <div class="container tableLi" style="margin-top: 20px;">
      <p class="storDetail">
        <span>送货单明细</span>
<!--        <a>送货详情</a>-->
      </p>
      <div class="tableList">
        <el-table v-loading="loadTable" :data="tableData" :header-cell-style="rowClass" style="margin-top: 20px;">
          <el-table-column align="center" prop="artnum" label="货品编号" width="180"></el-table-column>
          <el-table-column align="center" prop="artnam" label="货品名称" width="240">
            <template slot-scope="scope">
              <a style="color: #0079FE;">{{ scope.row.artnam }}</a>
            </template>
          </el-table-column>
<!--          <el-table-column align="center" prop="date" label="规格" width="140"></el-table-column>-->
<!--          <el-table-column align="center" prop="date" label="单位" width="140"></el-table-column>-->
          <el-table-column align="center" prop="shpartqty" label="数量" width="140">
            <template slot-scope="scope">
              <a>{{ scope.row.shpartqty }} 箱</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="totartwgt" label="总重量" width="140">
            <template slot-scope="scope">
              <a>{{ (scope.row.totartwgt / 1000).toFixed(2) }} 吨</a>
            </template>
          </el-table-column>
<!--          <el-table-column align="center" prop="date" label="单价" width="140"></el-table-column>-->
<!--          <el-table-column align="center" prop="date" label="金额" width="140"></el-table-column>-->
          <el-table-column align="center" prop="shpartsuu" label="折合瓶数" width="140">
            <template slot-scope="scope">
              <a>{{ scope.row.shpartsuu }} 瓶</a>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                detailist: {},
                loadTable: false
            }
        },
        mounted() {
            this.getDetail()
        },
        methods: {
            // 表头样式
            rowClass() {
                return 'background:rgba(248,248,248,1); height: 45px;font-weight: normal;'
            },
            // 详情数据
            getDetail: function () {
                this.loadTable = true
                const data = {
                    deldocnum: this.$route.query.id
                }
                this.$http.post('/api/deldocs/detail', data).then(res => {
                    if (res.data.ret_code === '0') {
                        this.detailist = res.data.data.deliveryDoc
                        this.detailist.plndeldat = this.getTime(this.detailist.plndeldat)
                        this.detailist.deldat = this.getTime(this.detailist.deldat)
                        this.tableData = res.data.data.deliveryDoc2s
                        this.loadTable = false
                    }
                })
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
                return Y+M+D+h+m+s;
            },
            // 表格删除行
            handleDelete: function(val) {
                this.$confirm('确认删除此数据吗？').then(() => {
                    const data = {
                        id: val
                    }
                    this.$http.post('/api/deldocs/deldoc2/delete', data).then(res => {
                        if (res.data.ret_code === '0') {
                            this.$message.success('删除成功')
                            this.getDetail()
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                }).catch(() => {

                })
            }
        }
    }
</script>

<style scoped lang="less">
  .publicolor {
    float: left;
    color: rgb(148, 144, 144);
    font-weight: normal;
    width: 112px;
    margin-top: -3px;
  }
  .fl {
    float:left;
    width: 200px;
  }
  .head {
    .tops {
      height: 40px;
      width: 1000px;
      display: flex;
      position: relative;
      span {
        flex: 1;
        display: inline-block;
        float: left;
        margin-left: 10px;
      }
      span:first-child {
        margin-left: 0;
      }
      .danju {
        position: absolute;
        top: -4px;
        right: 60px;
      }
    }
    .ones {
      margin-top: 20px!important;
    }
    .contents {
      margin-top: 40px;
      height: 20px;
      width: 1000px;
      display: flex;
      span {
        flex: 1;
        display: inline-block;
        float: left;
        margin-left: 10px;
      }
      span:first-child {
        margin-left: 0;
      }
    }
    .teshu {
      width: 640px;
    }
  }
  .tableList {
    width: 100%;
  }
  @media screen and (min-width: 1400px) {
    .tableList {
      width: 1022px;
    }
  }
  .tableLi {
    .storDetail {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #ccc;
      span {
        float: left;
      }
      a {
        float: right;
        color: #408bfc;
        cursor: pointer;
      }
    }
  }
</style>
