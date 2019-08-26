<template>
    <div>
         <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-operation"></i>生产线管理 </el-breadcrumb-item>
                <el-breadcrumb-item>添加排产计划</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
         <!--添加生产线 -->
         <div class="container">
            <span class="title">选择待排产订单</span>
            <el-divider></el-divider>
            <el-button type="success" @click="add">添加新订单</el-button>
            <el-table
                        :data="tableData"
                        :header-cell-style="rowClass"
                        style="width: 100%; margin-top: 20px;"
                        >
                    <el-table-column prop="prdlinnum" label="订单编号" align="center" width="120"></el-table-column>
                    <el-table-column prop="prdlinnum" label="生产物品" align="center" width="150"></el-table-column>
                    <el-table-column prop="artnam" label="交货日期" align="center" width="180"></el-table-column>
                    <el-table-column prop="artnam" label="订单数量" align="center" width="150">
                         <template slot-scope="scope">
                            <span class="blue">{{scope.row}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="artnam" label="已排产数量" align="center" width="150">
                         <template slot-scope="scope">
                            <span class="green">{{scope.row}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="artnam" label="未排产数量" align="center" width="150">
                         <template slot-scope="scope">
                            <span class="red">{{scope.row}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="排产数量" align="center" width="130">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row" placeholder="请输入排产数量"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">选择</el-button>
                        </template>
                    </el-table-column>
            </el-table>
             <div class="btngrp">
                 <el-button type="primary" @click="$router.push({path:'/orderscheduling'})">返回</el-button>
             </div>
         </div>
         <!--添加新订单 弹框 -->
         <el-dialog title="编辑生产线物品产能" :visible.sync="newVisible" class="newVisible" :before-close="handleDialogClose">
                <div class="form">
                    <el-form  :model="newform" label-width="80px" :label-position="labelPosition">
                        <el-form-item label="商品名称和规格" required>
                            <el-select v-model="newform.name" placeholder="请选择商品名称和规格">
                                <el-option
                                    v-for="item in nameoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                             </el-select>
                        </el-form-item>
                         <el-form-item label="订单数量" required>
                            <el-input v-model="newform.number"  placeholder="请输入订单数量"></el-input><span class="red">箱</span>
                        </el-form-item>
                         <el-form-item label="交货时间" required>
                           <el-date-picker
                            v-model="newform.data"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
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
           tableData:[1],//表格数据
           newVisible:false,//添加新订单 弹框 默认不显示
           labelPosition:'top',
           newform:{//添加新订单信息
                name:'',
                number:'',
                data:''
           },
           nameoptions:[],//商品名称和规格
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
        //添加新订单
        add(){
            this.newVisible = true
        },
        // 选择
        handleEdit(index,row){
            this.$router.push({
                path:'/selectline'
            })
        },
        //弹框 x
        handleDialogClose(){
             this.clear()
        },
        //弹框 取 消
        cancel(){
             this.clear()
        },
        //弹框 确 定
        editdefine(){
             this.clear()
        },
        //弹框 数据清除
        clear(){
            this.newVisible = false 
            this.newform = {//添加新订单信息
                name:'',
                number:'',
                data:''
           }
        }
    }
}
</script>
<style lang="less" scoped>
.container{
      .title{
          color: #0069DD;
      }
      .el-divider{
          margin: 16px 0;
      }
      .el-table{
         /deep/  .el-input__inner {
            height: 32px;
            line-height: 32px;
            text-align: center;
         }
      }
      .blue{
          color: #279AFE;
      }
      .green{
          color: #00CC8F;
      }
      .red{
          color: #FF0000;
      }
      .btngrp {
        margin-top: 30px;
        .el-button {
            width: 100px;
            height: 38px;
        }
    }
}
.newVisible {
  /deep/ .el-dialog__body {
    border-bottom: solid 1px #ebebeb !important;
    border-top: solid 1px #ebebeb !important;
    padding: 0px 0px !important;
    .form{
         padding:18px 30px;
         .el-form{
             display: flex;
             justify-content: space-between;
             flex-wrap: wrap;
             .el-form-item{
                 width: 40%;
                 .el-input{
                     width: 200px;
                 }
                 .el-select{
                     width: 200px;
                 }
                 .red{
                     color: #333333;
                     margin: 0 23px 0 10px;
                 }
             }
         }
    }
  }
}
</style>
