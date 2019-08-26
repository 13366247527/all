<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 单据管理</el-breadcrumb-item>
        <el-breadcrumb-item>采购单</el-breadcrumb-item>
        <el-breadcrumb-item>采购单详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container head">
      <div class="tops">
        <span style="font-weight: bold; color: #333;">采购单号：{{ putDetail.purplndocnum }}</span>
        <span><a class="publicolor">时间：</a>{{ putDetail.createDate }}</span>
        <span>
          <a class="publicolor">状态：</a>
          <a v-if="putDetail.mneprcsta === '1'">未完成</a>
          <a v-if="putDetail.mneprcsta === '2'">已完成</a>
        </span>
      </div>
      <div class="contents ones">
        <span><a class="publicolor">供应商：</a>{{ putDetail.supplierName }}</span>
        <span><a class="publicolor">送货地址：</a>{{ putDetail.postAddress }}</span>
        <span>
          <a class="publicolor">付款方式：</a>
          <a v-if="putDetail.payCondition === '0'">预付款</a>
          <a v-if="putDetail.payCondition === '1'">货到已付款</a>
          <a v-if="putDetail.payCondition === '2'">货到未付款</a>
        </span>
      </div>
      <div class="contents">
        <span>
          <a class="publicolor">装备方式：</a>
          <a v-if="putDetail.loadType === '1'">托盘</a>
          <a v-if="putDetail.loadType === '2'">人工</a>
          <a></a>
        </span>
        <span><a class="publicolor">木质托盘：</a>{{ putDetail.totalWoodCount }}块</span>
        <span><a class="publicolor">塑质托盘：</a>{{ putDetail.totalPlasticCount }}块</span>
      </div>
      <div class="contents">
        <span><a class="publicolor">货品重量：</a>{{ putDetail.totalWeight }}吨</span>
        <span><a class="publicolor">货品数量：</a>{{ putDetail.totalCount }}箱</span>
        <span><a class="publicolor">货品价格：</a>{{ putDetail.totalCost }}￥</span>
      </div>
    </div>
    <div class="container tableLi" style="margin-top: 20px;">
      <p class="storDetail">商品详情</p>
      <div style="width: 780px;">
        <el-table :data="tableData" :header-cell-style="rowClass" style="width: 100%; margin-top: 20px;">
          <el-table-column align="center" prop="artName" label="货品名称" width="180">
            <template slot-scope="scope">
              <a>{{ scope.row.artName }}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="artSpec" label="规格" width="180"></el-table-column>
          <el-table-column align="center" prop="productCount" label="数量" width="140">
            <template slot-scope="scope">
              <a>{{ scope.row.productCount }} 箱</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="artPrice" label="单价" width="140">
            <template slot-scope="scope">
              <a>{{ scope.row.artPrice }} ￥</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="sumCost" label="合计" width="140">
            <template slot-scope="scope">
              <a>{{ scope.row.sumCost }} ￥</a>
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
                currentId: '',
                putDetail: {}
            }
        },
        mounted() {
            this.currentId = this.$route.query.id
            if (this.currentId) {
                this.getDetail() // 详情总数据
            }
        },
        methods: {
            // 表头样式
            rowClass() {
                return 'background:rgba(248,248,248,1); height: 45px;font-weight: normal;'
            },
            // 详情总数据
            getDetail: function () {
                this.$http.get('/api/purchaseOrder/' + this.currentId).then(res => {
                    if (res.data.ret_code === '0') {
                        this.putDetail = res.data.data
                        this.tableData = res.data.data.details
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
  .publicolor {
    color: rgb(148, 144, 144);
    font-weight: normal
  }
  .head {
    .tops {
      height: 40px;
      width: 960px;
      display: flex;
      border-bottom: 1px solid #ccc;
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
    .ones {
      margin-top: 20px!important;
    }
    .contents {
      margin-top: 40px;
      height: 20px;
      width: 960px;
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
  }
  .tableLi {
    .storDetail {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #ccc;
    }
  }
</style>