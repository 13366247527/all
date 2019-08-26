<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-school"></i>仓库管理 </el-breadcrumb-item>
                <el-breadcrumb-item>仓库详情</el-breadcrumb-item>
                <el-breadcrumb-item>库房详情</el-breadcrumb-item>
                <el-breadcrumb-item>库区详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container head">
            <div class="d_head">
                 <div> <span>库区编号</span><span >{{regionNum}}</span> </div>
                 <el-button type="primary" @click="edit">编辑</el-button>
            </div>
            <el-divider></el-divider>
            <div class="tops">
                <span><a class="publicolor">库区名称: </a>{{regionName}}</span>
                <span><a class="publicolor">所属库房：</a>{{storeName}}</span>
                <span><a class="publicolor">所属仓库: </a>{{wareName}}</span>
            </div>
            <div class="contents">
                <span><a class="publicolor">库位数量: </a>{{binNumber}}</span>
                <span></span>
                <span></span>
            </div>
         </div>
         <!-- 编辑库区 弹框 -->
        <el-dialog title="编辑库区" :visible.sync="editVisible" class="editVisible" :before-close="handleDialogClose" width="35%">
                <div class="form">
                    <el-form  :model="editform" label-width="80px" :label-position="labelPosition">
                        <el-form-item label="所属库房" required>
                           <el-select v-model="editform.room" placeholder="请选择所属库房">
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
                            <el-input v-model="editform.id" placeholder="请输入库区编号" maxlength="10"></el-input>
                        </el-form-item>
                         <el-form-item label="库区名称" required >
                            <el-input v-model="editform.name" placeholder="请输入库区名称" maxlength="20"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="editdefine">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 库位列表 -->
        <div class="containers">
                <div class="title">
                    <span>库位列表</span>
                    <div>
                        <el-button type="success" @click="batchadd" >批量添加库位</el-button>
                        <el-button type="success" @click="add" >添加库位</el-button>
                    </div>
                </div>
                <div id="tableId">
                    <el-table :data="tableData" :header-cell-style="rowClass" style="width: 100%; margin-top: 20px;"  >
                    <el-table-column  prop="binNum"  label="库位编号" align="center"  ></el-table-column>
                    <!-- <el-table-column  prop="binName"  label="库位名称" align="center"  width="340"></el-table-column> -->
                    <el-table-column    label="库位类型" align="center" >
                        <template slot-scope="scope">
                            <span v-if="scope.row.binType == 'p'">托盘库位</span>
                            <span v-if="scope.row.binType == 'a'">物品库位</span>
                            <span v-if="scope.row.binType == 'i'">隔离库位</span>
                        </template>
                    </el-table-column>
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
    </div>
</template>
<script>
export default {
    data(){
        return{
            labelPosition:'top',
            regionNum:"", //类型：String  必有字段  备注：库区编号
            regionName:"", //类型：String  必有字段  备注：库区名称
            storeName:'', //库房名称
            wareName:'', //仓库名称
            binNumber:'',//库位数量
            editVisible:false,
            editform:{//编辑库区数据
                room:'',
                id:'',
                name:''
            },
            roomTerm:[],//库房数据
            tableData:[],//库位表格数据
            currentPage: 1, // 当前页
            pageSize: 10, // 每页条数
            totalSize: 0 ,// 总条数   
        }
    },
    mounted(){
        
         this.getData()
         this.getbinList()
    },
    methods:{
        //获取库区详情信息
        getData(){
            const data = new URLSearchParams();
            //库区id
            var id = this.$route.query.id
            data.append('regionId',id)
            this.$http.get('/api/warehouse/getRegionDetail',{params:data}).then(res => {
                 //  console.log(res)
                    if(res.data.ret_code == 0){
                         this.regionNum = res.data.data.regionNum
                         this.regionName = res.data.data.regionName
                         this.storeName =res.data.data.storeName 
                         this.wareName =res.data.data.wareName 
                         this.wareHoseNum =res.data.data.wareHoseNum 
                         this.binNumber = res.data.data.binNumber
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
        //查询库区下 库位列表
        getbinList(){
            const data = new URLSearchParams();
            //库房编号
            var storeNum =  this.$route.query.storeNum
            data.append('storeNum',storeNum)
            //库区编号
            var regionNum = this.$route.query.regionNum
            data.append('regionNum',regionNum)
            data.append('currentPage',this.currentPage)
            data.append('pageSize',this.pageSize)
            this.$http.get('/api/warehouse/getBins',{params:data}).then(res => {
               //  console.log(res)
                    if(res.data.ret_code == 0){
                         this.tableData = res.data.data.datas
                        // this.tableData.push(1)
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
            data.append('whsNum',this.wareHoseNum)
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
        //编辑获取库区详情信息
        edit(){
            this.editVisible = true
            const data = new URLSearchParams();
            //库区编号
            var id = this.$route.query.id
            data.append('regionId',id)
            this.$http.get('/api/warehouse/getRegionForUpdate',{params:data}).then(res => {
                 // console.log(res)
                    if(res.data.ret_code == 0){
                            this.editform.room = res.data.data.storeNum
                            this.editform.id = res.data.data.regionNum
                            this.editform.name = res.data.data.regionName
                            this.getallroom()
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
        //弹框 编辑库区 确定
        editdefine(){
            if(this.editform.room&&this.editform.id&&this.editform.name){
                      var  data = new URLSearchParams();
                      data.append('regionName',this.editform.name)
                      data.append('regionNum',this.editform.id)
                      data.append('storeNum',this.editform.room)
                      //库区id
                      var id = this.$route.query.id
                      data.append('redionId',id)
                      this.$http.post('/api/warehouse/saveOrUpdateStoreRegion',data).then(res => {
                         // console.log(res)
                              if(res.data.ret_code == 0){
                                this.$message({
                                      type: 'success',
                                      message: '更新库区成功!'
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
                        message: '更新库区信息不全！'
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
             this.getbinList()
        },
        // 当前页
        handleCurrentChange(val) {
             this.pageSize = val
             this.getbinList()
        },
        //批量添加库位
        batchadd(){
            //传 库区编号  仓库编号 库房编号 库区id  用于返回页面
            this.$router.push({
                path:'/bathaddbin',
                query:{regionNum:this.regionNum,wareHouseNum:this.wareHoseNum,storeNum:this.$route.query.storeNum,id:this.$route.query.id}
            })
        },
        //添加库位
        add(){
            //传 库区编号  仓库编号 库房编号 库区id  用于返回页面
            this.$router.push({
                path:'/addbin',
                 query:{regionNum:this.regionNum,wareHouseNum:this.wareHoseNum,storeNum:this.$route.query.storeNum,id:this.$route.query.id}
            })
        },
        //库位详情
        handleEdit(index,row){
            this.$router.push({
                path:'/bindetail',
                query:{binId:row.id}
            })
        },
        //库位删除
        handleDelete(index,row){
            const data = new URLSearchParams();
            //库位id
            data.append('binId',row.id)
            this.$http.post('/api/warehouse/delWhBin',data).then(res => {
                 // console.log(res)
                    if(res.data.ret_code == 0){
                       this.$message({
                            type: 'success',
                            message: '删除库位成功!'
                    })
                      this.getbinList()
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
        //弹框 数据清零
        clear(){
           this.editVisible = false
           this.editform = {
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
.editVisible{
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
