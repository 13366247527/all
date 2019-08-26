<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-school"></i>仓库管理 </el-breadcrumb-item>
                <el-breadcrumb-item>仓库详情</el-breadcrumb-item>
                <el-breadcrumb-item>库房详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container head">
            <div class="d_head">
                 <div> <span>库房编号</span><span >{{storeNum}}</span> </div>
                 <el-button type="primary" @click="edit">编辑</el-button>
            </div>
            <el-divider></el-divider>
            <div class="tops">
                <span><a class="publicolor">库房名称: </a>{{storeName}}</span>
                <span><a class="publicolor">所属仓库：</a>{{warthouseName}}</span>
                <span><a class="publicolor">库区数量: </a>{{regionNumber}}</span>
            </div>
            <div class="contents">
                <span><a class="publicolor">库位数量: </a>{{binNumber}}</span>
                <span></span>
                <span></span>
            </div>
         </div>
         <!-- 编辑库房 弹框 -->
        <el-dialog title="编辑库房" :visible.sync="editVisible" class="editVisible" :before-close="handleDialogClose" width="35%">
                <div class="form">
                    <el-form  :model="editform" label-width="80px" :label-position="labelPosition">
                     <el-form-item label="所属仓库" required >
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
                            <el-input v-model="editform.id" placeholder="请输入库房编号" maxlength="10"></el-input>
                        </el-form-item>
                         <el-form-item label="库房名称" required >
                            <el-input v-model="editform.name" placeholder="请输入库房名称" maxlength="20"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="editdefine">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 库区列表 -->
        <div class="containers">
                <div class="title">
                    <span>库区列表</span>
                    <el-button type="success" @click="add" >添加库区</el-button>
                </div>
                <div id="tableId">
                    <el-table :data="tableData" :header-cell-style="rowClass" style="width: 100%; margin-top: 20px;"  >
                    <el-table-column  prop="regionNum"  label="库区编号" align="center"  width="225"></el-table-column>
                    <el-table-column  prop="regionName"  label="库区名称" align="center"  width="300"></el-table-column>
                    <el-table-column  prop="wareHoseNum"  label="仓库编号" align="center"  width="230"></el-table-column>
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
            <!-- 新建库区  弹框 -->
            <el-dialog title="新建库区" :visible.sync="addVisible" class="addVisible" :before-close="handleDialogClose" width="35%">
                <div class="form">
                    <el-form  :model="addform" label-width="80px" :label-position="labelPosition">
                        <el-form-item label="所属库房" required>
                           <el-select v-model="addform.room" placeholder="请选择所属库房">
                                <el-option
                                  v-for="item in roomTerm"
                                  :key="item.num"
                                  :label="item.name"
                                  :value="item.num"
                                  >
                            </el-option>
                           </el-select>
                        </el-form-item>
                        <el-form-item label="库区编号" required >
                            <el-input v-model="addform.id" placeholder="请输入库区编号" maxlength="10"></el-input>
                        </el-form-item>
                         <el-form-item label="库区名称" required >
                            <el-input v-model="addform.name" placeholder="请输入库区名称" maxlength="20"></el-input>
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
            storeNum:"", //类型：String  必有字段  备注：库房编号
            storeName:"", //类型：String  必有字段  备注：库房名称
            regionNumber:0, //类型：Number  必有字段  备注：库区数量
            binNumber:0, //类型：Number  必有字段  备注：库位数量
            warthouseName:'',//所属仓库
            editVisible:false,
            editform:{//编辑库房数据
                store:'',
                id:'',
                name:''
            },
            storeTerm:[],


            tableData:[],//库区表格数据
            currentPage: 1, // 当前页
            pageSize: 10, // 每页条数
            totalSize: 0 ,// 总条数

            
            roomTerm:[],//库房下拉数据
            addVisible:false,
            labelPosition:'top',
            addform:{//添加库区数据
                room:'',
                id:'',
                name:''
            }
        }
    },
    mounted(){
         this.getData()
    },
    components:{
       vaddress
    },
    methods:{
        //获取库房详情信息
        getData(){
            const data = new URLSearchParams();
            //库房id
            var id = this.$route.query.id
            data.append('storeId',id)
            this.$http.get('/api/warehouse/getStoreDetail',{params:data}).then(res => {
                 //  console.log(res)
                    if(res.data.ret_code == 0){
                         this.storeNum = res.data.data.storeNum
                         this.storeName = res.data.data.storeName
                         this.regionNumber =res.data.data.regionNumber 
                         this.binNumber = res.data.data.binNumber
                         this.warthouseName = res.data.data.warthouseName
                         this.getroomList()
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
        //查询库房下 库区列表
        getroomList(){
            const data = new URLSearchParams();
            //库房编号
            data.append('storeNum',this.storeNum)
            data.append('currentPage',this.currentPage)
            data.append('pageSize',this.pageSize)
            this.$http.get('/api/warehouse/getRegions',{params:data}).then(res => {
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
        //获取所有库房
        getallroom(){
            const data = new URLSearchParams();
            //仓库编号
            var whsNum = this.$route.query.whsNum
            data.append('whsNum',whsNum)
            this.$http.get('/api/warehouse/getAllStores',{params:data}).then(res => {
                 // console.log(res)
                    if(res.data.ret_code == 0){
                        this.roomTerm = res.data.data
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
        //编辑获取库房详情信息
        edit(){
            this.editVisible = true
            const data = new URLSearchParams();
            //库房id 
            var id = this.$route.query.id
            data.append('storeId',id)
            this.$http.get('/api/warehouse/getStoreForUpdate',{params:data}).then(res => {
                 // console.log(res)
                    if(res.data.ret_code == 0){
                            this.editform.store = res.data.data.wareHouseNum
                            this.editform.id = res.data.data.storeNum
                            this.editform.name = res.data.data.storeName
                            this.getallstore()
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
        //弹框 编辑库房  确定
        editdefine(){
            if(this.editform.store&&this.editform.id&&this.editform.name){
                      var  data = new URLSearchParams();
                      data.append('wareHouseNum',this.editform.store)
                      data.append('storeNum',this.editform.id)
                      data.append('storeName',this.editform.name)
                      //库房id 
                      var id = this.$route.query.id
                      data.append('storeId',id)
                      this.$http.post('/api/warehouse/saveOrUpdateStore',data).then(res => {
                         // console.log(res)
                              if(res.data.ret_code == 0){
                                this.$message({
                                      type: 'success',
                                      message: '更新库房成功!'
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
                        message: '更新库房信息不全！'
                  })
               }
        },
        //表头样式
        rowClass(){
              return 'background:rgba(248,248,248,1); height: 45px;font-weight: normal;'
        },
        // 每页条数
        handleSizeChange(val) {
             this.pageSize = val
             this.getroomList()
        },
        // 当前页
        handleCurrentChange(val) {
             this.pageSize = val
             this.getroomList()
        },
        //添加库区
        add(){
            this.addVisible = true
            this.getallroom()
        },
        //库区详情
        handleEdit(index,row){
            //传 库区id  库房编号  库区编号
            this.$router.push({
                path:'/areadetail',
                query:{id:row.regionID,storeNum:this.storeNum,regionNum:row.regionNum}
            })
        },
        //库区删除
        handleDelete(index,row){
            const data = new URLSearchParams();
            //库区id
            data.append('regionId',row.regionID)
            this.$http.post('/api/warehouse/delRegion',data).then(res => {
                 // console.log(res)
                    if(res.data.ret_code == 0){
                       this.$message({
                            type: 'success',
                            message: '删除库区成功!'
                    })
                      this.getroomList()
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
        //弹框 库区添加 确定
        adddefine(){
               if(this.addform.room&&this.addform.id&&this.addform.name){
                      var  data = new URLSearchParams();
                      data.append('storeNum',this.addform.room)
                      data.append('regionNum',this.addform.id)
                      data.append('regionName',this.addform.name)
                      this.$http.post('/api/warehouse/saveOrUpdateStoreRegion',data).then(res => {
                       //  console.log(res)
                              if(res.data.ret_code == 0){
                                this.$message({
                                      type: 'success',
                                      message: '添加库区成功!'
                                  })
                                   //重新获取库区列表
                                   this.getroomList()
                                    //重新获取库房详情
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
                         message: '添加库区信息不全！'
                  })
               }
        },
        //弹框 数据清零
        clear(){
           this.addVisible = false
           this.editVisible = false
           this.editform = {
               store:'',
               id:'',
               name:'' 
           }
           this.addform = {//添加库房数据
                room:'',
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
           flex: 1;
        display: inline-block;
        float: left;
        margin-left: 10px;
      }
      span:first-child {
        margin-left: 0;
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
 .addVisible,.editVisible{
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

</style>
