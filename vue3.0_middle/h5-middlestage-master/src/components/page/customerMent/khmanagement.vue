<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i>客户管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="form.username" placeholder="请输入客户编号\客户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.type" placeholder="配送类型">
              <el-option
                v-for="item in deliveryType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.status" placeholder="装卸方式">
              <el-option
                v-for="item in loadType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
        <el-button type="success" @click="add">添加客户</el-button>
        <!-- <el-button  @click="imports">客户导入</el-button> -->
         <div id="tableId">
        <el-table
          :data="tableData"
          :header-cell-style="rowClass"
          style="width: 100%; margin-top: 20px;"
           v-loading="loading"
        >
          <el-table-column prop="outnum" label="客户编号" align="center" width="120"></el-table-column>
          <el-table-column label="客户名称" align="center" width="160">
               <template slot-scope="scope">
                  <span class="blue" @click="detailFn(scope.row.outnum)">{{scope.row.outnam}}</span>
               </template>
          </el-table-column>
          <el-table-column   label="客户渠道" align="center" width="100">
                 <template slot-scope="scope">
                  <span v-if="scope.row.trdchn == 0">学校</span>
                  <span v-if="scope.row.trdchn == 1">工厂</span>
                  <span v-if="scope.row.trdchn == 2">网吧</span>
                  <span v-if="scope.row.trdchn == 3">超市</span>
               </template>
          </el-table-column>
          <el-table-column  label="客户级别" align="center" width="100">
               <template slot-scope="scope">
                  <span v-show="scope.row.glocuscls">{{scope.row.glocuscls}}级</span>
               </template>
          </el-table-column>
          <el-table-column prop="conprntel2" label="电话" align="center" width="140"></el-table-column>
          <el-table-column label="配送类型" align="center" width="140">
             <template slot-scope="scope">
                  <span v-if="scope.row.outdeltyp == 1">拼车直送</span>
                  <span v-if="scope.row.outdeltyp == 2">直送</span>
                  <span v-if="scope.row.outdeltyp == 3">配送</span>
               </template>
          </el-table-column>
          <el-table-column label="装卸方式" align="center" width="140">
            <template slot-scope="scope">
                  <span v-if="scope.row.lodtack == 1">托盘</span>
                  <span v-if="scope.row.lodtack == 2">人工</span>
               </template>
          </el-table-column>
          <el-table-column  label="付款模式" align="center" width="140">
               <template slot-scope="scope">
                  <span v-if="scope.row.payterm == 0">预付</span>
                  <span v-if="scope.row.payterm == 1">货到已付</span>
                  <span v-if="scope.row.payterm == 2">货到未付</span>
               </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      form: {
        username: "", //客户编号\客户名称
        type: "", //配送类型
        status: "" //装卸方式
      },
      deliveryType:[],//配送类型
      loadType:[],//装卸方式
      tableData: [], //表格数据
      loading:true,
      currentPage: 1, // 当前页
      pageSize: 20, // 每页条数
      totalSize: 0,// 总条数
      editform:{ //编辑资料
          outnum:'',//客户编号
          outnam:'',//客户名称
          glocuscls:'',//客户级别
          conprntel2:'',//电话
          deliveryType:'',//配送类型
          loadType:'',//装卸方式
          paymeth:''//付款模式
      }
    };
  },
  mounted() {
    this.getData();
    this.getSelect()
  },
  methods: {
    //获取下拉框的值
    getSelect(){
        this.$http.post('/api/outlet/initDict',{}).then(res => {
            //  console.log(res)
              if(res.data.ret_code == 0){
                  for (let i = 0; i < res.data.data.delrtetyp.length; i++) {
                     var obj = {}
                     obj.label = res.data.data.delrtetyp[i].valdescm
                     obj.value = res.data.data.delrtetyp[i].selval
                     this.deliveryType.push(obj)
                  }
                  for (let i = 0; i < res.data.data.lodtyp.length; i++) {
                     var obj = {}
                     obj.label = res.data.data.lodtyp[i].valdescm
                     obj.value = res.data.data.lodtyp[i].selval
                     this.loadType.push(obj)
                  }
              }else{
                   this.$message({
                      type: 'error',
                      message: res.data.msg
                  })
              }
          }).catch(err=>{
               console.log(err)
          })
    },
    //获取后台数据
    getData() {
      var params = {
          keyword:this.form.username,
          deliveryType:this.form.type,
          loadType:this.form.status,
          page:{
              size:this.pageSize,
              current:this.currentPage
          }
      }
      this.$http.post('/api/outlet/list', params).then(res => {
            // console.log(res)
              this.loading = false
              if(res.data.ret_code == 0){
                this.tableData = res.data.data.records
                this.totalSize = parseInt( res.data.data.total)
              }else{
                   this.$message({
                      type: 'error',
                      message: res.data.msg
                  })
              }
      }).catch(err=>{
       console.log(err)
      })
    },
    //表头样式
    rowClass() {
      return "background:rgba(248,248,248,1); height: 45px;font-weight: normal;";
    },
    //搜索
    onSubmit() {
       this.getData();
    },
    //添加客户
    add() {
      this.$router.push({
        path: "/addcustomer"
      });
    },
    //导入客户
    imports() {
      this.$router.push({
        path: "/importcustomer"
      });
    },
    //编辑
    handleEdit(index, row) {
     // console.log(index, row);
      this.$router.push({
         path:'/updatecustomer',
         query:{outnum:row.outnum}
      })
      
    },
    //删除
    handleDelete(index, row) {
     // console.log(index, row);
      this.$http.delete('/api/outlet/delete/'+row.outnum).then(res => {
              //console.log(res)
              if(res.data.ret_code == 0){
                    this.$message({
                    type: "success",
                    message: res.data.data
                  });
                   this.getData();  
              }else{
                   this.$message({
                      type: 'error',
                      message: res.data.msg
                  })
              }
      }).catch(err=>{
       console.log(err)
      })
    },
    // 每页条数
    handleSizeChange(val) {
     // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getData();
    },
    // 当前页
    handleCurrentChange(val) {
     // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getData();
    },
    //跳转详情页
    detailFn(outnum){
      this.$router.push({
         path:'/customerdetails',
         query:{outnum:outnum}
      })
    }
  }
};
</script>
<style scoped lang="less">
.el-form {
  .el-form-item {
    margin-right: 20px !important;
  }
}
.blue{
    color: blue;
    cursor: pointer;
}
#tableId {
  width: 100%;
}
@media screen and (min-width: 1400px) {
  #tableId{
    width: 1160px;
  }
}
</style>
