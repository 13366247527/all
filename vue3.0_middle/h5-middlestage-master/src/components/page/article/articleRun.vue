<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-s-cooperation"></i> 物品管理</el-breadcrumb-item>
        <el-breadcrumb-item>物品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form :model="form" class="formseo">
        <el-form-item>
          <el-select v-model="form.classification" placeholder="选择类别">
            <el-option v-for="item in classificationList" :key="item.selval" :label="item.valdescm" :value="item.selval"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.artcls" placeholder="选择等级">
            <el-option v-for="item in artclsList" :key="item.selval" :label="item.valdescm" :value="item.selval"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.commodityStatus" placeholder="选择状态">
            <el-option v-for="item in commodityStatusList" :key="item.selval" :label="item.valdescm" :value="item.selval"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.oderName" clearable placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-button type="primary" @click="searchList()">搜索</el-button>
      </el-form>
      <div class="magSend">
        <el-button type="success" @click="addBill">添加物品</el-button>
<!--        <el-button type="warning" plain @click="importMsg">导入物品</el-button>-->
      </div>
      <div id="tableId">
        <el-table v-loading="tabLoading" :data="tableData" :header-cell-style="rowClass" style="width: 100%; margin-top: 20px;">
          <el-table-column align="center" prop="artnum" label="编号" width="160"></el-table-column>
          <el-table-column align="center" prop="artnam" label="名称" width="160">
            <template slot-scope="scope">
              <a style="color: #409eff;">{{ scope.row.artnam }}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="artClass" label="等级（发货量）" width="120"></el-table-column>
          <el-table-column align="center" prop="artclsName" label="类别" width="100"></el-table-column>
          <el-table-column align="center" prop="supnum" label="供应商" width="140"></el-table-column>
          <el-table-column align="center" prop="price2" label="销售价（元）" width="120">
            <template slot-scope="scope">
              <a>{{ scope.row.price2 }}元</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date" label="托箱/层" width="120">
            <template slot-scope="scope">
              <a>{{ scope.row.casoflay }}箱 / {{ scope.row.layofpalt }}层</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date" label="状态" width="100">
            <template slot-scope="scope">
              <a v-if="scope.row.prdbatflg === '1'">已上架</a>
              <a v-else style="color: #FF0000;">已下架</a>
            </template>
          </el-table-column>
<!--          <el-table-column align="center" prop="stockNum" label="库存量" width="140"></el-table-column>-->
          <el-table-column align="center" prop="date" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="getUpdate()">编辑</el-button>
              <el-button v-if="scope.row.prdbatflg === '1'" type="text" size="small" @click="lowerShelf(scope.row.artnum)">下架</el-button>
              <el-button v-if="scope.row.prdbatflg === '0'" type="text" size="small" @click="upShelf(scope.row.artnum)">上架</el-button>
              <el-button type="text" size="small" @click="getDelete(scope.row.artnum)">删除</el-button>
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
        data(){
            return {
                form: {
                    classification: '', // 类别
                    commodityStatus: '', // 状态
                    artcls: '', // 等级
                    oderName: '' // 商品名称
                },
                artclsList: [], // 等级列表
                classificationList: [], // 商品分类列表
                commodityStatusList: [
                    { selval: '0', valdescm: '已下架' },
                    { selval: '1', valdescm: '已上架' }
                ], // 商品状态列表
                tableData: [], // 表格数据
                currentPage: 1, // 当前页
                pageSize: 20, // 每页条数
                totalSize: 0, // 总条数
                tabLoading: false // 表格loading
            }
        },
        mounted() {
            this.selectOwn() // 下拉列表
        },
        methods: {
            // 表头样式
            rowClass() {
                return 'background:rgba(248,248,248,1); height: 45px;font-weight: normal;'
            },
            // 列表搜索
            searchList: function () {
                this.getDataList()
            },
            // 下拉列表
            selectOwn: function() {
                this.$http.post('/api/outlet/initDict').then(res => {
                    this.classificationList = res.data.data.artcls // 类别
                    this.artclsList = res.data.data.artgrd // 等级
                    this.getDataList() // 表格列表
                })
            },
            // 表格列表数据
            getDataList: function() {
                this.tabLoading = true
                const data = {
                    artcls: this.form.classification,
                    artgrd: this.form.artcls,
                    prdbatflg: this.form.commodityStatus,
                    keyword: this.form.oderName,
                    page: {
                        current: this.currentPage,
                        pages: this.pageSize
                    }
                }
                this.$http.post('/api/article/list', data).then(res => {
                    this.tabLoading = false
                    if (res.data.ret_code === '0') {
                        this.tableData = res.data.data.records
                        this.totalSize = Number(res.data.data.total)
                        for (let i = 0; i < this.tableData.length; i++) {
                            for (let k = 0; k < this.classificationList.length; k++) {
                                if (this.tableData[i].artcls === this.classificationList[k].selval) {
                                    this.tableData[i].artclsName = this.classificationList[k].valdescm
                                    this.tableData[i].artClass = this.artclsList[k].valdescm
                                }
                            }
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            // 编辑
            getUpdate: function() {
                // this.$router.push('/deliveryNote')
            },
            // 下架
            lowerShelf: function(val) {
                this.$confirm('确认下架此商品吗？').then(()=> {
                    this.getframe(false, val)
                }).catch(() => {

                })
            },
            // 上架
            upShelf: function(val) {
                this.$confirm('确认上架此商品吗？').then(()=> {
                    this.getframe(true, val)
                }).catch(() => {

                })
            },
            // 上架/下架
            getframe: function(isTrue, artNum) {
                this.$http.put('/api/article/groundOrNot?isGround=' + isTrue + '&artnum=' +  artNum).then(res => {
                    if (res.data.ret_code === '0') {
                        this.$message.success('操作成功')
                        this.getDataList()
                    } else {
                        this.$message.error('操作失败')
                    }
                })
            },
            // 删除
            getDelete: function(val) {
                this.$confirm('确定删除此数据吗？').then(()=> {
                    this.$http.delete('/api/article/' + val).then(del => {
                        if (del.data.ret_code === '0') {
                            this.getDataList()
                            this.$message({
                                type: 'success',
                                message: del.data.data
                            })
                        } else {
                            this.$message({
                                type: 'error',
                                message: del.data.data
                            })
                        }
                    })
                }).catch(() => {
                })
            },
            // 添加物品
            addBill: function () {
                this.$router.push('/addarticel')
            },
            // 导入物品
            importMsg: function() {

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
      width: 1200px;
    }
  }
</style>