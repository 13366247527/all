<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-school"></i>仓库管理 </el-breadcrumb-item>
                <el-breadcrumb-item>仓库详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container head">
            <div class="d_head">
                 <div> <span>仓库编号</span><span >{{whsNum}}</span> </div>
                 <el-button type="primary" @click="edit">编辑</el-button>
            </div>
            <el-divider></el-divider>
            <div class="tops">
                <span><a class="publicolor">仓库名称: </a>{{whsName}}</span>
                <span><a class="publicolor">仓库地址：</a>{{whsAddress}}</span>
            </div>
            <div class="contents">
                <span><a class="publicolor">库房数量: </a>{{whStoreNumber}}</span>
                <span><a class="publicolor">库区数量: </a>{{whRegionNumber}}</span>
                <span><a class="publicolor">库位数量：</a>{{whBinNumber}}</span>
            </div>
         </div>
         <!-- 编辑仓库 弹框 -->
         <el-dialog title="编辑仓库" :visible.sync="editVisible" class="editVisible" :before-close="handleDialogClose" width="40%">
                <div class="form">
                    <el-form  :model="editform" label-width="80px" :label-position="labelPosition">
                        <el-form-item label="仓库类型" required>
                             <el-radio v-model="editform.radio" label="CENTER">中央仓</el-radio>
                             <el-radio v-model="editform.radio" label="DC">DC仓</el-radio>
                        </el-form-item>
                        <el-form-item label="所属中央仓" required v-if="editform.radio == 'DC'">
                           <el-select v-model="editform.subname" placeholder="请选择所属中央仓">
                                <el-option
                                  v-for="item in subTerm"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"
                                  >
                            </el-option>
                           </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="仓库编号" required >
                            <el-input v-model="editform.id" placeholder="请输入仓库编号" maxlength="10"></el-input>
                        </el-form-item> -->
                         <el-form-item label="仓库全称" required >
                            <el-input v-model="editform.fullname" placeholder="请输入仓库全称" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item label="仓库简称" required>
                            <el-input v-model="editform.shortname" placeholder="请输入仓库简称" maxlength="15"></el-input>
                        </el-form-item>
                         <el-form-item label="仓库标识" required>
                            <el-input v-model="editform.markname" placeholder="请输入仓库标识" maxlength="15"></el-input>
                        </el-form-item>
                         <el-form-item label="所在省市" required>
                           <vaddress :caddress="editform.zhongdian" @change="zchanges"></vaddress>
                        </el-form-item>
                         <el-form-item label="街道地址" required>
                            <el-input v-model="editform.address" placeholder="请输入街道地址" maxlength="40"></el-input>
                        </el-form-item>
                         <el-form-item label="经度纬度" required>
                            <el-input v-model="editform.longitude" placeholder="请输入经度" maxlength="15"></el-input>
                            <el-input v-model="editform.latitude" placeholder="请输入纬度" maxlength="15"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="editdefine">确 定</el-button>
                </div>
            </el-dialog>
        <div class="containers">
                <div class="title">
                    <span>库房列表</span>
                    <el-button type="success" @click="add" >添加库房</el-button>
                </div>
                <div id="tableId">
                    <el-table :data="tableData" :header-cell-style="rowClass" style="width: 100%; margin-top: 20px;"  >
                    <el-table-column  prop="storeNum"  label="库房编号" align="center"  width="225"></el-table-column>
                    <el-table-column  prop="storeName"  label="库房名称" align="center"  width="300"></el-table-column>
                    <el-table-column  prop="regionNumber"  label="库区数量" align="center"  width="230"></el-table-column>
                    <el-table-column  prop="binNumber"  label="库位数量" align="center"  width="230"></el-table-column>
                    <el-table-column   label="操作"     align="center"  >
                        <template slot-scope="scope">
                            <el-button type="text" size="small"  @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                            <el-button type="text" size="small"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                </div>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalSize">
                    </el-pagination>
            </div>
            <!-- 新建库房  弹框 -->
            <el-dialog title="新建库房" :visible.sync="addVisible" class="addVisible" :before-close="handleDialogClose" width="35%">
                <div class="form">
                    <el-form  :model="addform" label-width="80px" :label-position="labelPosition">
                        <el-form-item label="所属仓库" required>
                           <el-select v-model="addform.store" placeholder="请选择所属仓库">
                                <el-option
                                  v-for="item in storeTerm"
                                  :key="item.whsNum"
                                  :label="item.whsNam"
                                  :value="item.whsNum"
                                  >
                            </el-option>
                           </el-select>
                        </el-form-item>
                        <el-form-item label="库房编号" required >
                            <el-input v-model="addform.id" placeholder="请输入库房编号" maxlength="10"></el-input>
                        </el-form-item>
                         <el-form-item label="库房名称" required >
                            <el-input v-model="addform.name" placeholder="请输入库房名称" maxlength="20"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="adddefine">确 定</el-button>
                </div>
            </el-dialog>
    </div>
</template>
<script>
import vaddress from "../../../components/common/address1";
export default {
    data(){
        return{
            whsNum:"",//类型：String  必有字段  备注：仓库编号
            whsName:"",//类型：String  必有字段  备注：仓库名称
            whsAddress:"",//类型：String  必有字段  备注：仓库地址
            whStoreNumber:0,  //类型：Number  必有字段  备注：库房数量
            whRegionNumber:0,  //类型：Number  必有字段  备注：库区数量
            whBinNumber:0,//类型：Number  必有字段  备注：库位数量
            editVisible:false,
            editform:{//编辑仓库数据
                radio:'CENTER',
                // id:'',
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

            tableData:[],//库房表格数据
            currentPage: 1, // 当前页
            pageSize: 10, // 每页条数
            totalSize: 0 ,// 总条数
            storeTerm:[],//仓库数据
            addVisible:false,
            labelPosition:'top',
            addform:{//添加库房数据
                store:'',
                id:'',
                name:''
            }
        }
    },
    mounted(){
         this.getData()
         this.getsubData()
    },
    components:{
       vaddress
    },
    methods:{
        //获取详情信息
        getData(){
            const data = new URLSearchParams();
            //仓库id
            var id = this.$route.query.id
            data.append('whsId',id)
            this.$http.get('/api/warehouse/warehouseDetail',{params:data}).then(res => {
                 //  console.log(res)
                    if(res.data.ret_code == 0){
                         this.whsNum = res.data.data.whsNum
                         this.whsName = res.data.data.whsName
                         this.whsAddress =res.data.data.whsAddress 
                         this.whStoreNumber = res.data.data.whStoreNumber
                         this.whRegionNumber = res.data.data.whRegionNumber
                         this.whBinNumber = res.data.data.whBinNumber
                          this.getstoreHouseList()
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
        //查询仓库下 库房列表
        getstoreHouseList(){
            const data = new URLSearchParams();
            //仓库编号
            data.append('whsNum',this.whsNum)
            data.append('currentPage',this.currentPage)
            data.append('pageSize',this.pageSize)
            this.$http.get('/api/warehouse/storeHouseList',{params:data}).then(res => {
                 //  console.log(res)
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
        //获取所有仓库
        getallstore(){
            this.$http.get('/api/warehouse/getAllWhareHouse',{}).then(res => {
                  // console.log(res)
                    if(res.data.ret_code == 0){
                        this.storeTerm = res.data.data
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
        //编辑获取详情信息
        edit(){
            this.editVisible = true
            const data = new URLSearchParams();
            //仓库id
            var id = this.$route.query.id
            data.append('whsId',id)
            this.$http.get('/api/warehouse/getWareHouseForUpdate',{params:data}).then(res => {
                  console.log(res)
                    if(res.data.ret_code == 0){
                            this.editform.radio = res.data.data.wareType
                            this.editform.id = res.data.data.whsnum
                            this.editform.subname = res.data.data.parentId
                            this.editform.fullname = res.data.data.whsdcr
                            this.editform.shortname = res.data.data.whshondcr
                            this.editform.markname = res.data.data.whsmindcr
                            this.editform.zhongdian.sheng = res.data.data.provinceCode
                            this.editform.zhongdian.shi = res.data.data.cityCode
                            this.editform.address = res.data.data.strreetAddress
                            this.editform.longitude = res.data.data.lngtud
                            this.editform.latitude = res.data.data.lattud
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
        //弹框 编辑仓库  确定
        editdefine(){
            if(this.editform.radio == 'DC'&&this.editform.subname&&this.editform.fullname&&this.editform.shortname
               &&this.editform.markname&&this.editform.zhongdian.sheng&&this.editform.zhongdian.shi&&this.editform.address
               &&this.editform.longitude&&this.editform.latitude){//为DC仓
                    var datas = {
                      id:this.$route.query.id,
                      wareType:this.editform.radio,
                      parentId:this.editform.subname,
                      whsdcr:this.editform.fullname,
                      whshondcr:this.editform.shortname,
                      whsmindcr:this.editform.markname,
                      provinceCode:this.editform.zhongdian.sheng,
                      cityCode:this.editform.zhongdian.shi,
                      strreetAddress:this.editform.address,
                      lngtud:this.editform.longitude,
                      lattud:this.editform.latitude
                    }
                      var  data = new URLSearchParams();
                      data.append('dataStr',JSON.stringify(datas))
                      this.$http.post('/api/warehouse/saveOrUpdateWarehouse',data).then(res => {
                         // console.log(res)
                              if(res.data.ret_code == 0){
                                this.$message({
                                      type: 'success',
                                      message: '更新仓库成功!'
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

               }else if (this.editform.radio == 'CENTER'&&this.editform.fullname&&this.editform.shortname
               &&this.editform.markname&&this.editform.zhongdian.sheng&&this.editform.zhongdian.shi&&this.editform.address
               &&this.editform.longitude&&this.editform.latitude){//为中央仓
                    var datas = {
                      id:this.$route.query.id,
                      wareType:this.editform.radio,
                      whsdcr:this.editform.fullname,
                      whshondcr:this.editform.shortname,
                      whsmindcr:this.editform.markname,
                      provinceCode:this.editform.zhongdian.sheng,
                      cityCode:this.editform.zhongdian.shi,
                      strreetAddress:this.editform.address,
                      lngtud:this.editform.longitude,
                      lattud:this.editform.latitude
                    }
                      var data = new URLSearchParams();
                      data.append('dataStr',JSON.stringify(datas))
                      this.$http.post('/api/warehouse/saveOrUpdateWarehouse',data).then(res => {
                           // console.log(res)
                                if(res.data.ret_code == 0){
                                   this.$message({
                                      type: 'success',
                                      message: '更新仓库成功!'
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
                                message: '更新仓库信息不全！'
                  })
               }
        },
         //所在省市
        zchanges(obj){
          this.editform.zhongdian = obj
          // console.log(this.addform.zhongdian) 
        },
        //表头样式
        rowClass(){
              return 'background:rgba(248,248,248,1); height: 45px;font-weight: normal;'
        },
        // 每页条数
        handleSizeChange(val) {
             this.pageSize = val
             this.getstoreHouseList()
        },
        // 当前页
        handleCurrentChange(val) {
             this.pageSize = val
             this.getstoreHouseList()
        },
        //添加库房
        add(){
            this.addVisible = true
            this.getallstore()
        },
        //库房详情
        handleEdit(index,row){
            //传 库房id  仓库编号
            this.$router.push({
                path:"/roomdetail",
                query:{id:row.storeID,whsNum:this.whsNum}
            })
        },
        //库房删除
        handleDelete(index,row){
            const data = new URLSearchParams();
            //库房id
            data.append('storeId',row.storeID)
            this.$http.post('/api/warehouse/delStore',data).then(res => {
                  console.log(res)
                    if(res.data.ret_code == 0){
                       this.$message({
                            type: 'success',
                            message: '删除库房成功!'
                    })
                      this.getstoreHouseList()
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
        //弹框 x
        handleDialogClose(){
           this.clear()
        },
        //弹框 取消
        cancel(){
           this.clear()
        },
        //弹框 库房添加 确定
        adddefine(){
               if(this.addform.store&&this.addform.id&&this.addform.name){
                      var  data = new URLSearchParams();
                      data.append('wareHouseNum',this.addform.store)
                      data.append('storeName',this.addform.name)
                      data.append('storeNum',this.addform.id)
                      this.$http.post('/api/warehouse/saveOrUpdateStore',data).then(res => {
                       //  console.log(res)
                              if(res.data.ret_code == 0){
                                this.$message({
                                      type: 'success',
                                      message: '添加库房成功!'
                                  })
                                  //获取库房列表
                                   this.getstoreHouseList()
                                  // 获取库房列表
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
                         message: '添加库房信息不全！'
                  })
               }
        },
        //弹框 数据清零
        clear(){
           this.addVisible = false
           this.editVisible = false
           this.editform = {
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
           this.addform = {//添加库房数据
                store:'',
                id:'',
                name:''
            }
        }
    }
}
</script>
<style scoped  lang="less">
 .head{
    margin-bottom: 20px;
    .publicolor {
        color: rgb(148, 144, 144);
        font-weight: normal
    }
    .d_head{
        display: flex;
        justify-content: space-between;
        width: 100%;
        div{
            display: flex;
            align-items: center;
            span{
                font-size: 18px;
                margin-right: 40px;
            }
        }
    }
    .tops {
      height: 36px;
      width: 960px;
      display: flex;
      span {
        display: inline-block;
        float: left;
        margin-left: 10px;
      }
      span:first-child {
        width: 33%;
        margin-left: 0;
      }
      span:last-child {
        width: 67%;
      }
    }
    .contents {
      margin-top:15px;
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
 .containers{
     background: white;
     border: 1px solid #ddd;
     border-radius: 5px;
     #tableId {
        width: 100%;
        padding: 0 30px;
    }
    @media screen and (min-width: 1400px) {
        #tableId {
            width: 1189px;
        }
        .title{
            padding: 15px 35px;
            border-bottom: solid 1px #DCDFE6;
            font-size: 18px;
            display: flex;
            justify-content:space-between;
            align-items: center;
        }
        .el-pagination{
            padding: 30px;
        }
    } 
 }
 .addVisible {
  /deep/ .el-dialog__body {
    border-bottom: solid 1px #ebebeb !important;
    border-top: solid 1px #ebebeb !important;
    padding: 0px 0px !important;
    .form{
         padding:18px 30px;
         .el-select{
             width: 100%;
         }
    }
  }
}
.editVisible{
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
