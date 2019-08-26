<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-custom"></i>人员管理 </el-breadcrumb-item>
                <el-breadcrumb-item>人员管理</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
         <div class="container">
             <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item >
                    <el-input v-model="formInline.user" placeholder="姓名、人员编号、部门、电话"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-select v-model="formInline.region" placeholder="请选择员工">
                         <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <div @click.once="hideFn"><i class="el-icon-remove"></i>隐藏已离职的员工</div>
                </el-form-item>
            </el-form>
            <el-button type="success">新增员工</el-button>
            <el-table
            :data="tableData"
            :header-cell-style="rowClass"
            style="width: 100%; margin-top: 20px;"
            >
          <el-table-column prop="vehgrpnum" label="人员编号" align="center" width="100"></el-table-column>
          <el-table-column prop="vehgrpnam" label="姓名" align="center" width="100"></el-table-column>
          <el-table-column prop="numofveh" label="所属部门" align="center" width="100"></el-table-column>
          <el-table-column prop="personName" label="岗位" align="center" width="150"></el-table-column>
          <el-table-column prop="personMobile" label="级别" align="center" width="100"></el-table-column>
          <el-table-column prop="personMobile" label="联系电话" align="center" width="200"></el-table-column>
          <el-table-column prop="personMobile" label="邮箱" align="center" width="200"></el-table-column>
           <el-table-column prop="personMobile" label="状态" align="center" width="100"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">离职</el-button>
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
                user:'',//姓名、人员编号、部门、电话
                region:''//请选择员工
            },
            options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }],//人员数据
            tableData:[],//表格数据
            currentPage:1,//当前第几页
            totalSize:0,//总条数
            pageSize:20,//一页多少条
        }
    },
    methods:{
        //表格表头样式
        rowClass(){
             return "background:rgba(248,248,248,1); height: 45px;font-weight: normal;";
        },
        //搜索
        onSubmit(){

        },
        //隐藏已离职的员工
        hideFn(){

        },
        //编辑
        handleEdit(index,row){

        },
        //离职
        handleDelete(index,row){

        },
        // 每页条数
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
            this.pageSize = val
            this.getData()
        },
        // 当前页
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.currentPage = val
            this.getData()
        },

    }
}
</script>
<style lang="less" scoped>
.el-form{
    overflow: hidden;
    .el-input{
            width: 200px !important;
    }
    .el-form-item:last-child{
        float: right;
        cursor: pointer;
        i{
            margin-right: 10px;
        }
    }
}
</style>
