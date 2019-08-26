<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-school"></i>仓库管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--仓库管理 -->
    <div class="container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.name" placeholder="请输入仓库名称/编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-button type="success" @click="add">添加仓库</el-button>
      <el-table
        :data="tableData"
        :header-cell-style="rowClass"
        style="width: 100%; margin-top: 20px;"
      >
        <el-table-column prop="whsNum" label="仓库编号" align="center" width="150"></el-table-column>
        <el-table-column prop="whsName" label="仓库名称" align="center" width="230"></el-table-column>
        <el-table-column prop="whsAddress" label="仓库地址" align="center" width="230"></el-table-column>
        <el-table-column prop="whStoreNumber" label="库房数量" align="center" width="140"></el-table-column>
        <el-table-column prop="whRegionNumber" label="库区数量" align="center" width="140"></el-table-column>
        <el-table-column prop="whBinNumber" label="库位数量" align="center" width="140"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <!-- 新建仓库  弹框 -->
    <el-dialog title="新建仓库" :visible.sync="addVisible" class="addVisible" :before-close="handleDialogClose" width="40%">
                <div class="form">
                    <el-form  :model="addform" label-width="80px" :label-position="labelPosition">
                        <el-form-item label="仓库类型" required>
                             <el-radio v-model="addform.radio" label="CENTER">中央仓</el-radio>
                             <el-radio v-model="addform.radio" label="DC">DC仓</el-radio>
                        </el-form-item>
                        <el-form-item label="所属中央仓" required v-if="addform.radio == 'DC'">
                           <el-select v-model="addform.subname" placeholder="请选择所属中央仓">
                                <el-option
                                  v-for="item in subTerm"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"
                                  >
                            </el-option>
                           </el-select>
                        </el-form-item>
                        <el-form-item label="仓库编号" required >
                            <el-input v-model="addform.id" placeholder="请输入仓库编号" maxlength="10"></el-input>
                        </el-form-item>
                         <el-form-item label="仓库全称" required >
                            <el-input v-model="addform.fullname" placeholder="请输入仓库全称" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item label="仓库简称" required>
                            <el-input v-model="addform.shortname" placeholder="请输入仓库简称" maxlength="15"></el-input>
                        </el-form-item>
                         <el-form-item label="仓库标识" required>
                            <el-input v-model="addform.markname" placeholder="请输入仓库标识" maxlength="15"></el-input>
                        </el-form-item>
                         <el-form-item label="所在省市" required>
                           <vaddress :caddress="addform.zhongdian" @change="zchanges"></vaddress>
                        </el-form-item>
                         <el-form-item label="街道地址" required>
                            <el-input v-model="addform.address" placeholder="请输入街道地址" maxlength="40"></el-input>
                        </el-form-item>
                         <el-form-item label="经度纬度" required>
                            <el-input v-model="addform.longitude" placeholder="请输入经度" maxlength="15"></el-input>
                            <el-input v-model="addform.latitude" placeholder="请输入纬度" maxlength="15"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="editdefine">确 定</el-button>
                </div>
            </el-dialog>
  </div>
</template>
<script>
import vaddress from "../../../components/common/address1";
export default {
  data() {
    return {
        formInline: {
           name:''
        },
        tableData:[1],//表格数据
        currentPage:1,//当前第几页
        totalSize:0,//总条数
        pageSize:20,//一页多少条
        addVisible:false,//新建仓库弹框 默认不显示
        labelPosition:'top',
        addform:{
          radio:'CENTER',
          id:'',
          subname:'',
          fullname:'',
          shortname:'',
          markname:'',
          zhongdian:{
            sheng: "",
            shi: "",
          },
          address:'',
          longitude:'',//经度
          latitude:''//纬度
        },
        subTerm:[],//中央仓数据
    };
  },
  components:{
    vaddress
  },
  mounted(){
       this.getData()
       this.getsubData()
  },
  methods: {
       //获取后台数据
        getData(){
                const data = new URLSearchParams();
                //仓库编号
                data.append('whsNameOrNum',this.formInline.name)
                data.append('currentPage',this.currentPage)
                data.append('pageSize',this.pageSize)
                this.$http.get('/api/warehouse/wareHouseList',{params:data}).then(res => {
                   // console.log(res)
                        if(res.data.ret_code == 0){
                          this.tableData = res.data.data.datas
                          this.totalSize = res.data.data.dataCount
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
        //查询所有可选中央仓
        getsubData(){
                this.$http.get('/api/warehouse/getCenterWareHouseS',{}).then(res => {
                   // console.log(res)
                        if(res.data.ret_code == 0){
                          this.subTerm = res.data.data
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
        //表格表头样式
        rowClass(){
             return "background:rgba(248,248,248,1); height: 45px;font-weight: normal;";
        },
        //搜索
        onSubmit(){
             this.getData()
        },
        //添加仓库
        add(){
           this.addVisible = true 
        },
        //详情
        handleDetail(index,row){
           this.$router.push({
             path:'/housedetail',
             query:{id:row.whId}
           })
        },
        //删除仓库
        handleDelete(index,row){
             this.$confirm('此操作将永久删除该仓库, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                      const data = new URLSearchParams();
                      data.append('whsId',row.whId)
                        this.$http.post('/api/warehouse/delWareHouse',data).then(res => {
                              //  console.log(res)
                                    if(res.data.ret_code == 0){
                                        this.$message({
                                                  type: 'success',
                                                  message: '删除仓库成功!'
                                        })
                                      this.getData()
                                    }else{
                                        this.$message({
                                            type: 'error',
                                            message: res.data.msg
                                        })
                                    }
                            }).catch(err=>{
                                console.log(err)
                            })
                }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      })        
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
        //所在省市
        zchanges(obj){
          this.addform.zhongdian = obj
          // console.log(this.addform.zhongdian) 
        },
        //弹框 x
        handleDialogClose(){
           this.clear()
        },
        //弹框 取消
        cancel(){
           this.clear()
        },
        //弹框 确定
        editdefine(){
               if(this.addform.radio == 'DC'&&this.addform.subname&&this.addform.fullname&&this.addform.shortname
               &&this.addform.markname&&this.addform.zhongdian.sheng&&this.addform.zhongdian.shi&&this.addform.address
               &&this.addform.longitude&&this.addform.latitude&&this.addform.id){//为DC仓
                    var datas = {
                      wareType:this.addform.radio,
                      whsnum:this.addform.id,
                      parentId:this.addform.subname,
                      whsdcr:this.addform.fullname,
                      whshondcr:this.addform.shortname,
                      whsmindcr:this.addform.markname,
                      provinceCode:this.addform.zhongdian.sheng,
                      cityCode:this.addform.zhongdian.shi,
                      strreetAddress:this.addform.address,
                      lngtud:this.addform.longitude,
                      lattud:this.addform.latitude
                    }
                      var  data = new URLSearchParams();
                      data.append('dataStr',JSON.stringify(datas))
                      this.$http.post('/api/warehouse/saveOrUpdateWarehouse',data).then(res => {
                         // console.log(res)
                              if(res.data.ret_code == 0){
                                this.$message({
                                      type: 'success',
                                      message: '添加仓库成功!'
                                  })
                                   this.getData()
                                   this.clear()
                              }else{
                                  this.$message({
                                      type: 'error',
                                      message: res.data.msg
                                  })
                              }
                      }).catch(err=>{
                          console.log(err)
                      })

               }else if (this.addform.radio == 'CENTER'&&this.addform.fullname&&this.addform.shortname
               &&this.addform.markname&&this.addform.zhongdian.sheng&&this.addform.zhongdian.shi&&this.addform.address
               &&this.addform.longitude&&this.addform.latitude&&this.addform.id){//为中央仓
                    var datas = {
                      wareType:this.addform.radio,
                      whsnum:this.addform.id,
                      whsdcr:this.addform.fullname,
                      whshondcr:this.addform.shortname,
                      whsmindcr:this.addform.markname,
                      provinceCode:this.addform.zhongdian.sheng,
                      cityCode:this.addform.zhongdian.shi,
                      strreetAddress:this.addform.address,
                      lngtud:this.addform.longitude,
                      lattud:this.addform.latitude
                    }
                      var data = new URLSearchParams();
                      data.append('dataStr',JSON.stringify(datas))
                      this.$http.post('/api/warehouse/saveOrUpdateWarehouse',data).then(res => {
                           // console.log(res)
                                if(res.data.ret_code == 0){
                                   this.$message({
                                      type: 'success',
                                      message: '添加仓库成功!'
                                  })
                                     this.getData()
                                     this.clear()
                                }else{
                                    this.$message({
                                        type: 'error',
                                        message: res.data.msg
                                    })
                                }
                      }).catch(err=>{
                          console.log(err)
                      })
               }else{
                  this.$message({
                                type: 'error',
                                message: '添加仓库信息不全！'
                  })
               }
        },
        //弹框 数据清零
        clear(){
           this.addVisible = false
           this.addform = {
            radio:'CENTER',
            subname:'',
            fullname:'',
            shortname:'',
            markname:'',
            zhongdian:{
              sheng: "",
              shi: "",
            },
            address:'',
            longitude:'',//经度
            latitude:''//纬度
          }
        }

  }
};
</script>
<style lang="less" scoped>
.addVisible {
  /deep/ .el-dialog__body {
    border-bottom: solid 1px #ebebeb !important;
    border-top: solid 1px #ebebeb !important;
    padding: 0px 0px !important;
    .form{
         padding:18px 30px;
         .el-form{
           .el-form-item:last-child{
               .el-input{
                 width: 46%;
               }  
               .el-input:first-child{
                   margin-right: 8%;
               }
           }
         }
    }
  }
}
</style>
