<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-operation"></i>生产线管理 </el-breadcrumb-item>
                <el-breadcrumb-item>预览计划</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
         <!--添加生产线 -->
         <div class="container">
            <span class="title">预览计划</span>
            <el-divider></el-divider>
            <ul class="info">
                <li><span>订单编号</span><span>{{1111}}</span></li>
                <li><span>生产物品</span><span>{{11111}}</span></li>
                <li><span>交货日期</span><span>{{1111}}</span></li>
                <li><span>排产数量</span><span>{{1111}}</span></li>
                <li><span>生产线编号</span><span>{{11111}}</span></li>
                <li><span>生产线班次</span><span>{{11111}}</span></li>
                <li><span>生产线产能</span><span>{{11111}}</span></li>
            </ul>
                <el-table :data="tableData" :header-cell-style="rowClass" :span-method="objectSpanMethod" style="width: 100%; margin-top: 20px;" border>
                    <el-table-column prop="prdlinnum" label="日期" align="center" width="150"></el-table-column>
                    <el-table-column prop="prdlinnum" label="班次" align="center" width="150"></el-table-column>
                    <el-table-column prop="artnam" label="生产物品" align="center" width="180"></el-table-column>
                    <el-table-column prop="artnam" label="生产数量" align="center" width="180"></el-table-column>
                    <el-table-column prop="artnam" label="托盘类型" align="center" width="180"></el-table-column>
                    <el-table-column prop="artnam" label="托盘数量" align="center" width="180"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handledelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
            </el-table>
             <div class="btngrp">
                <el-button type="primary" @click="$router.push({path:'/orderscheduling'})">确定排产</el-button>
                <el-button  @click="$router.push({path:'/selectline'})">取消</el-button>
             </div>
         </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            plabinfo:{},//计划信息
            tableData:[1,2,3],//表格数据
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
        //删除
        handledelete(){
           
        },
        //合并列 方法的参数是一个对象，里面包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性。
        //该函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 3 === 0) {
            return {
              rowspan: 3,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
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
.info{
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding: 0px 100px 10px 0px;
    border-bottom: solid 1px #CCCCCC;
    li{
        span{
            display: block;
            line-height: 1.5;
        }
        span:first-child{
             color:#909399;
             font-weight: bold;
        }
        span:last-child{
             color:#909399;
        }
    }
}
.btngrp {
        margin-top: 30px;
        .el-button {
            width: 100px;
            height: 38px;
        }
    }
</style>
