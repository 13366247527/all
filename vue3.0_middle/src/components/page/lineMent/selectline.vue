<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-operation"></i>生产线管理 </el-breadcrumb-item>
                <el-breadcrumb-item>选择生产线</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
         <!--添加生产线 -->
         <div class="container">
            <span class="title">选择生产线</span>
            <el-divider></el-divider>
                <el-table :data="tableData" :header-cell-style="rowClass"  style="width: 100%; margin-top: 20px;" >
                    <el-table-column  label="生产厂编号" align="center" width="120">
                        <template slot-scope="scope">
                            <span class="blue">{{scope.row}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prdlinnum" label="库房名称" align="center" width="120"></el-table-column>
                    <el-table-column prop="artnam" label="生产线编号" align="center" width="120"></el-table-column>
                    <el-table-column prop="artnam" label="物品组" align="center" width="80"></el-table-column>
                    <el-table-column prop="artnam" label="托盘类型" align="center" width="80"></el-table-column>
                    <el-table-column  label="标准产能" align="center" width="100">
                         <template slot-scope="scope">
                            <span>{{scope.row}}箱</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="最大产能" align="center" width="100">
                         <template slot-scope="scope">
                            <span>{{scope.row}}箱</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="下线速度" align="center" width="120">
                         <template slot-scope="scope">
                            <span>{{scope.row}}分钟/箱</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="artnam" label="下线点编号" align="center" width="120"></el-table-column>
                    <el-table-column prop="artnam" label="班次" align="center" width="120"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">选择</el-button>
                        </template>
                    </el-table-column>
            </el-table>
             <div class="btngrp">
                <el-button type="primary" @click="$router.push({path:'/addorder'})">返回</el-button>
             </div>
         </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData:[1],//表格数据
        }
    },
    mounted(){

    },
    methods:{
         //获取后台数据
        getData(){

        },
        //表格表头样式
        rowClass(){
             return "background:rgba(248,248,248,1); height: 45px;font-weight: normal;";
        },
        handleEdit(){
            this.$router.push({
                path:'/seeplan'
            })
        }
    }
}
</script>
<style lang="less" scoped>
.title{
          color: #0069DD;
      }
.el-divider{
          margin: 16px 0;
}
.blue{
    color: #0079FE;
}
.btngrp {
        margin-top: 30px;
        .el-button {
            width: 100px;
            height: 38px;
        }
    }
</style>
