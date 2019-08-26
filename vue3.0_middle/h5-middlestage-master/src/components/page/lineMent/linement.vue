<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-operation"></i>生产线管理 </el-breadcrumb-item>
                <el-breadcrumb-item>生产线管理</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
         <!--生产线管理 -->
         <div class="container">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item >
                                <el-select v-model="formInline.storageroom" placeholder="请选择库房">
                                    <el-option
                                        v-for="item in roomoptions"
                                        :key="item.storhousnum"
                                        :label="item.stordcr"
                                        :value="item.storhousnum">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item >
                                <!-- <el-input v-model="formInline.name" placeholder="请输入物品名称"></el-input> -->
                                <el-select v-model="formInline.state" placeholder="请选择状态">
                                    <el-option
                                        v-for="item in stateoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">搜索</el-button>
                            </el-form-item>
                        </el-form>
                        <el-button type="success" @click="add">添加生产线</el-button>
                        <el-table
                        :data="tableData"
                        :header-cell-style="rowClass"
                        style="width: 100%; margin-top: 20px;"
                        >
                    <el-table-column prop="manufctnum" label="生产厂编号" align="center" width="150"></el-table-column>
                    <el-table-column prop="stordcr" label="库房名称" align="center" width="180"></el-table-column>
                    <el-table-column prop="prdlinnum" label="生产线编号" align="center" width="150"></el-table-column>
                    <el-table-column prop="prdlindscr" label="生产线名称" align="center" width="180"></el-table-column>
                    <el-table-column prop="palletnumber" label="可放托盘数量" align="center" width="120"></el-table-column>
                    <el-table-column  label="班次" align="center" width="120">
                         <template slot-scope="scope">
                        <span v-if="scope.row.classtype == '2'" >两班倒</span>
                        <span v-if="scope.row.classtype == '3'">三班倒</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="状态" align="center" width="120">
                        <template slot-scope="scope">
                        <span v-if="scope.row.recsta == 'Y'" class="state"><span class="green"></span>启用</span>
                        <span v-else class="state"><span class="red"></span>停用</span>
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
    </div> 
</template>
<script>
export default {
    data(){
        return{
            formInline:{
                storageroom:'',//请选择库房
                state:'',//状态，
            },
            roomoptions:[],//库房数据
            stateoptions:[
                {
                    value:'Y',
                    label:'启用'
                },
                {
                    value:'N',
                    label:'停用'
                }
            ],//状态数据
            tableData:[],//表格数据
            currentPage:1,//当前第几页
            totalSize:0,//总条数
            pageSize:20,//一页多少条
        }
    },
    mounted(){
         this.getData()
         this.getSelect()   
    },
    methods:{
        //获取库房
        getSelect(){
            this.$http.post('/api/productLine/manage/storhousnum/list').then(res => {
                   console.log(res)
                    if(res.data.ret_code == 0){
                       this.roomoptions = res.data.data
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
        getData(){
                const data = new URLSearchParams();
                data.append('page',this.currentPage)
                data.append('pagesize',this.pageSize)
                data.append('storhousnum',this.formInline.storageroom)
                data.append('recsta',this.formInline.state)
                this.$http.post('/api/productLine/manage/productLine/list',data).then(res => {
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
        //添加生产线
        add(){
            this.$router.push({
                path:'/addline'
            })
        },
        //编辑
        handleEdit(index,row){
             this.$router.push({
                path:'/editline',
                query:{id:row.id}
            })
        },
        //删除
        handleDelete(index,row){
            const data = new URLSearchParams();
            data.append('lineId',row.id)
            this.$http.post('/api/productLine/manage/productLine/delete',data).then(res => {
                   console.log(res)
                    if(res.data.ret_code == 0){
                       this.$message({
                            type: 'success',
                            message: res.data.data
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
    }
}
</script>
<style lang="less" scoped>
.state{
    display: flex;
    justify-content: center;
    align-items: center;
    span{
            display: inline-block;
            width:6px;
            height:6px;
            margin-right: 5px;
            border-radius: 50%;
    }
    .green{
         background: green;
   }
   .red{
       background: red;
   }
}

</style>
