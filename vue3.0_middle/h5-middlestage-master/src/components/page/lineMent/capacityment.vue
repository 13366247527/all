<template>
    <div>
          <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-operation"></i>生产线管理 </el-breadcrumb-item>
                <el-breadcrumb-item>产能管理</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
         <!--产能管理 -->
         <div class="container">
             <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item >
                    <el-select v-model="formInline.line" placeholder="请选择生产线">
                         <el-option
                            v-for="item in options"
                            :key="item.prdlinnum"
                            :label="item.prdlindscr"
                            :value="item.prdlinnum">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-input v-model="formInline.name" placeholder="请输入物品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-button type="success" @click="add">添加产能</el-button>
            <el-table
            :data="tableData"
            :header-cell-style="rowClass"
            style="width: 100%; margin-top: 20px;"
            >
          <el-table-column prop="prdlinnum" label="生产线编号" align="center" width="150"></el-table-column>
          <el-table-column  label="班次" align="center" width="180">
               <template slot-scope="scope">
                    <span v-if="scope.row.classtype == 2">两班倒</span>
                    <span v-if="scope.row.classtype == 3">三班倒</span>
               </template>
          </el-table-column>
          <el-table-column prop="artnam" label="物品名称" align="center" width="250"></el-table-column>
          <el-table-column  label="标准产能（每班次）" align="center" width="160">
               <template slot-scope="scope">
                    <span>{{scope.row.capacity}}箱</span>
               </template>
          </el-table-column>
          <el-table-column  label="最大产能（每班次）" align="center" width="160">
               <template slot-scope="scope">
                    <span>{{scope.row.maxcapacity}}箱</span>
               </template>
          </el-table-column>
          <el-table-column  label="换产时间" align="center" width="160">
               <template slot-scope="scope">
                    <span>{{scope.row.changeproduction}}分钟</span>
               </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      <!-- 添加生产线产能  弹框 -->
            <el-dialog title="添加生产线产能" :visible.sync="lineVisible" class="lineVisible" :before-close="handleDialogClose">
             <el-form :inline="true" :model="addform" class="demo-form-inline">
                <el-form-item label="生产线:" >
                    <el-select v-model="addform.line" placeholder="请选择生产线">
                         <el-option
                            v-for="item in addoptions"
                            :key="item.prdlinnum"
                            :label="item.prdlindscr"
                            :value="item.prdlinnum">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-radio v-model="addform.shifts" label="2">两班倒</el-radio>
                    <el-radio v-model="addform.shifts" label="3">三班倒</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addSubmit">搜索</el-button>
                </el-form-item>
            </el-form>
            <!-- 物品品名 -->
            <div v-if="tableData1.length > 0" class="tab">
                <p>物品品名</p>
                <el-table
                :data="tableData1"
                 max-height="250"
                :header-cell-style="rowClass"
                style="width: 100%; margin-top: 20px;"
                >
                    <el-table-column prop="artnam" label="物品品名" align="center" width="150"></el-table-column>
                    <el-table-column label="标准产能（箱/每班次）" align="center" width="150">
                         <template slot-scope="scope">
                           <el-input v-model="scope.row.capacity" placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column  label="最大产能（箱/每班次）" align="center" width="150">
                         <template slot-scope="scope">
                           <el-input v-model="scope.row.maxcapacity" placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column  label="换产时间（小时）" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.changeproduction" placeholder="请输入"></el-input>
                     </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="addline(scope.$index, scope.row)">加入到产能</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 物品产能 -->
             <div v-if="tableData2.length > 0" class="tab">
                <p>物品产能</p>
               <el-table
                :data="tableData2"
                :header-cell-style="rowClass"
                max-height="250"
                style="width: 100%; margin-top: 20px;"
                >
                    <el-table-column prop="artnam" label="物品品名" align="center" width="150"></el-table-column>
                    <el-table-column prop="capacity" label="标准产能（箱/每班次）" align="center" width="150">
                        <template slot-scope="scope">
                            <span>{{scope.row.capacity}}箱</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxcapacity" label="最大产能（箱/每班次）" align="center" width="150">
                        <template slot-scope="scope">                   
                             <span>{{scope.row.maxcapacity}}箱</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="changeproduction" label="换产时间（小时）" align="center" width="150">
                            <template slot-scope="scope">
                             <span>{{scope.row.changeproduction}}小时</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="define">确 定</el-button>
            </div>
            </el-dialog>


            <!--  编辑生产线物品产能  弹框 -->
             <el-dialog title="编辑生产线物品产能" :visible.sync="editVisible" class="editVisible" :before-close="handleDialogClose">
                <div class="tops">
                    <span><a class="publicolor">生产线: </a>{{productionline}}</span>
                    <span><a class="publicolor">班次：</a>{{shifts}}</span>
                </div>
                <div class="form">
                    <h4>{{artnam}}</h4>
                    <el-form  :model="editform" label-width="80px" :label-position="labelPosition">
                        <el-form-item label="标准产能" required>
                            <el-input v-model="editform.capacity"></el-input>
                        </el-form-item>
                         <el-form-item label="最大产能" required>
                            <el-input v-model="editform.maxcapacity"></el-input>
                        </el-form-item>
                         <el-form-item label="换产时间" required>
                            <el-input v-model="editform.changeproduction"></el-input>
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
export default {
    data(){
        return{
            formInline:{
                name:'',//物品名称
                line:''//请选择生产线
            },
            options: [],//请选择生产线
            tableData:[],//产能管理表格数据
            currentPage:1,//当前第几页
            totalSize:0,//总条数
            pageSize:20,//一页多少条


            lineVisible:false,//添加 默认为不显示
            addform:{
                line:'',//生产线
                shifts:'2'//班次
            },
            addoptions:[],//添加 生产线集合
            tableData1:[],//物品品名表格数据
            tableData2:[],//物品产能表格数据

            editVisible:false,//编辑 默认为不显示
            labelPosition:'top',
            productionline:'',//生产线
            shifts:'',//班次
            artnam:'',//物品品名
            id:'',//生产线id
            editform:{
                capacity:'',
                maxcapacity:'',
                changeproduction:''
            }
        }
    },
    mounted(){
        this.getData()
        this.getselectData()
        var arr = []
        var obj1={
            name:'aa'
        }
        var obj2 = {
            name:'bb'
        }
        var obj3= {
            name:'cc'
        }
        arr.push(obj1,obj2,obj3)
        console.log(arr)
        const data = new URLSearchParams();
        data.append('test',JSON.stringify(arr))
        this.$http.get('/api/arrangement/order/test',{params:data}).then(res => {
                console.log(res)
                if(res.data.ret_code == 0){
                   
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
    methods:{
        //获取所有生产线
        getselectData(){
        this.$http.get('/api/capacity/manage/line/list',{}).then(res => {
                console.log(res)
                if(res.data.ret_code == 0){
                    this.options = res.data.data
                    this.addoptions = res.data.data
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
        //获取表格数据
        getData(){
            const data = new URLSearchParams();
            data.append('page',this.currentPage)
            data.append('pagesize',this.pageSize)
            data.append('prdlinnum',this.formInline.line)
            data.append('artnam',this.formInline.name)
            this.$http.get('/api/capacity/manage/list',{ params: data }).then(res => {
                console.log(res)
                if(res.data.ret_code == 0){
                    this.tableData = res.data.data.list
                    this.totalSize = res.data.data.total
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
        //添加产能
        add(){
            this.lineVisible = true
        },
        //编辑
        handleEdit(index,row){
            this.editVisible = true
            this.productionline = row.prdlindscr
            this.shifts = row.classtype == '2' ? '两班倒':'三班倒'
            this.artnam = row.artnam
            this.id = row.id
        },
        //产能管理 ----  物品产能   共用一个删除
        handleDelete(index,row){
            const data = new URLSearchParams();
            data.append('id',row.id)
            this.$http.post('/api/capacity/manage/delete',data).then(res => {
                console.log(res)
                if(res.data.ret_code == 0){
                   this.$message({
                        type: 'success',
                        message: res.data.data
                    })
                     this.getData()
                     this.addSubmit()
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
            this.pageSize = val
            this.getData()
        },
        // 当前页
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },
        //弹框 关闭 x
        handleDialogClose(){
             this.lineVisible = false
             this.addform = {
                line:'',//生产线
                shifts:'2'//班次
            }
            this.tableData1 = []
            this.tableData2 = []
            this.editVisible = false
            this.productionline = ''
            this.shifts = ''
            this.artnam = ''
            this.editform = {
                capacity:'',
                maxcapacity:'',
                changeproduction:''
            }
            this.getData()
        },
        //添加---编辑  取消
        cancel(){
             this.lineVisible = false
             this.addform = {
                line:'',//生产线
                shifts:'2'//班次
            }
            this.tableData1 = []
            this.tableData2 = []
            this.editVisible = false
            this.productionline = ''
            this.shifts = ''
            this.artnam = ''
            this.editform = {
                capacity:'',
                maxcapacity:'',
                changeproduction:''
            }
            this.getData()
        },
        //添加  确定
        define(){
             this.lineVisible = false
             this.addform = {
                line:'',//生产线
                shifts:'2'//班次
            }
            this.tableData1 = []
            this.tableData2 = []
            this.getData()
        },
        //编辑 确定
        editdefine(){
            if(this.editform.capacity&&this.editform.maxcapacity&&this.editform.changeproduction){
                    const data = new URLSearchParams();
                    data.append('id',this.id)
                    data.append('capacity',this.editform.capacity)
                    data.append('maxcapacity',this.editform.maxcapacity)
                    data.append('changeproduction',this.editform.changeproduction)
                    this.$http.get('/api/capacity/manage/update',{params:data}).then(res => {
                        console.log(res)
                        if(res.data.ret_code == 0){
                            this.$message({
                                type: 'success',
                                message: res.data.data
                            })
                            this.editVisible = false
                            this.productionline = ''
                            this.shifts = ''
                            this.artnam = ''
                            this.editform = {
                                capacity:'',
                                maxcapacity:'',
                                changeproduction:''
                            }
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
            }else{
                this.$message({
                            type: 'error',
                            message:'输入框不能为空！'
                 })
            }   
        },
        //生产线弹框搜索
        addSubmit(){
            const data = new URLSearchParams();
            data.append('prdlinnum',this.addform.line)
            data.append('classtype',this.addform.shifts)
            this.$http.get('/api/capacity/manage/add/list',{params:data}).then(res => {
                console.log(res)
                if(res.data.ret_code == 0){
                    this.tableData1 = res.data.data.notList
                    this.tableData2 = res.data.data.list
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
        //生产线加入产能
        addline(index,row){
            if( row.maxcapacity && row.capacity && row.changeproduction){
                console.log(index,row)
                const data = new URLSearchParams();
                data.append('prdlinnum',this.addform.line)
                data.append('classtype',this.addform.shifts)
                data.append('artnum',row.artnum)
                data.append('capacity',row.capacity)
                data.append('maxcapacity',row.maxcapacity)
                data.append('changeproduction',row.changeproduction)
                this.$http.get('/api/capacity/manage/add',{params:data}).then(res => {
                    console.log(res)
                    if(res.data.ret_code == 0){
                        this.$message({
                            type: 'success',
                            message: res.data.data
                        })
                        this.addSubmit()
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
                            message:'输入框不能为空！'
                        })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.container{
    .el-form{
    overflow: hidden;
    .el-input{
        width: 200px !important;
    }
 }
}
.lineVisible {
  /deep/ .el-dialog__body {
    border-bottom: solid 1px #ebebeb !important;
    border-top: solid 1px #ebebeb !important;
    padding: 0px 0px !important;
    .el-form {
        width: 100%;
        padding-top:18px;
        .el-form-item {
           margin-left: 30px;
        }
    }
    .tab{
        border-top:solid 1px #797979;
        padding:18px 30px;
    }
  }  
}
.editVisible {
  /deep/ .el-dialog__body {
    border-bottom: solid 1px #ebebeb !important;
    border-top: solid 1px #ebebeb !important;
    padding: 0px 0px !important;
    .tops{
        padding: 10px 30px;
        width: 100%;
        display: flex;
        span{
            display: block;
            width: 30%;
        }
    }
    .form{
         border-top:solid 1px #797979;
         padding:18px 30px;
         h4{
             padding:5px 0px 10px 0px;
         }
         .el-form{
             display: flex;
             justify-content: space-between;
             flex-wrap: wrap;
             .el-form-item{
                 width: 40%;
             }
         }
    }
  }
}
</style>
