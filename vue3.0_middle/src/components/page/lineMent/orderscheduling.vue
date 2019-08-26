<template>
    <div>
         <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-operation"></i>生产线管理 </el-breadcrumb-item>
                <el-breadcrumb-item>订单排产</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
         <!--生产线管理 -->
         <div class="container">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item >
                                 <el-input v-model="formInline.id" placeholder="请输入计划编号"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <el-select v-model="formInline.line" placeholder="请选择生产线">
                                    <el-option
                                        v-for="item in lineoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                               <el-date-picker
                                v-model="formInline.data"
                                type="daterange"
                                 value-format="yyyy-MM-dd"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                               <el-input v-model="formInline.name" placeholder="请输入排产物品"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">搜索</el-button>
                            </el-form-item>
                        </el-form>
                         <el-button type="success" @click="add">添加排产计划</el-button>
                         <el-table
                        :data="tableData"
                        :header-cell-style="rowClass"
                        style="width: 100%; margin-top: 20px;"
                        >
                    <el-table-column prop="prdlinnum" label="计划编号" align="center" width="150"></el-table-column>
                    <el-table-column prop="prdlinnum" label="生产线编号" align="center" width="150"></el-table-column>
                    <el-table-column prop="artnam" label="计划生成时间" align="center" width="180"></el-table-column>
                    <el-table-column prop="artnam" label="计划开始时间" align="center" width="180"></el-table-column>
                    <el-table-column prop="artnam" label="计划结束时间" align="center" width="180"></el-table-column>
                    <el-table-column prop="artnam" label="生产物品" align="center" width="200"></el-table-column>
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
                id:'',
                line:'',
                name:'',
                data:[]
            },
            lineoptions:[],//请选择生产线
            tableData:[1],//表格数据
            currentPage:1,//当前第几页
            totalSize:0,//总条数
            pageSize:20,//一页多少条
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        //获取后台数据
        getData(){

        },
        //表格表头样式
        rowClass(){
             return "background:rgba(248,248,248,1); height: 45px;font-weight: normal;";
        },
        //搜索
        onSubmit(){
             this.getData()
        },
        //添加排产计划
        add(){
            this.$router.push({
                path:'/addorder'
            })
        },
        //编辑
        handleEdit(index,row){
           
        },
        //删除
        handleDelete(index,row){
            this.$confirm('当前计划已经开始执行，删除会导致生产线无任务是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
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
    }
}
</script>
<style lang="sass" scoped>

</style>
