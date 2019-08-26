<template>
   <div>
       <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-truck"></i>承运管理 </el-breadcrumb-item>
                <el-breadcrumb-item>车队详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
          <div class="container head">
                <span class="text">车队信息</span>
                <el-divider></el-divider>
                <div class="tops">
                    <span><a class="publicolor">车队编号: </a>{{fleetD.vehgrpnum}}</span>
                    <span><a class="publicolor">车队名称：</a>{{fleetD.vehgrpnam}}</span>
                    <span><a class="publicolor">车队车数：</a>{{fleetD.numofveh}}</span>
                </div>
                 <div class="contents ones">
                    <span><a class="publicolor">联系人: </a>{{fleetD.personName}}</span>
                    <span><a class="publicolor">电话: </a>{{fleetD.personMobile}}</span>
                    <span></span>
                </div> 
                <div class="contents ones">
                    <span><a class="publicolor">备注: </a>{{fleetD.vehgrpdrc}}</span>
                </div> 
              <div class="btngrp">
                      <el-button type="primary" @click="submitMoveForm">返回</el-button>
              </div>
         </div>
        
   </div> 
</template>
<script>
export default {
   data(){
       return{
          fleetD:{},//详情数据
          vehgrpnum:'',//接收的车队编号
       }
   },
   created(){
        this.vehgrpnum = this.$route.query.vehgrpnum
   },
   mounted(){
     this.getData()
   },
   methods:{
     getData(){
     //  console.log(this.vehgrpnum)
       this.$http.get("/api/carrier/detail/"+this.vehgrpnum).then(res => {
         //console.log(res.data);
          if (res.data.ret_code == 0) {
             this.fleetD = res.data.data
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        }).catch(err => {
          console.log(err);
        });
     },
     submitMoveForm(){
        this.$router.push({
          path:'/fleetement'
        })
     }
   }
}
</script>
<style lang="less" scoped>
.head{
  position: relative;
    margin-bottom: 20px;
    height: 500px;
    .text{
       color: #0069dd;
    }
    .publicolor {
        color: rgb(148, 144, 144);
        font-weight: normal
    }
    a{
      margin-right:5px;
    }
    .tops {
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
    .ones {
      margin-bottom: 25px!important;
    }
    .contents {
          margin-top: 40px;
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
    .btngrp {
        position: absolute;
        bottom: 50px;
        padding: 0 20px;
          .el-button {
                width: 100px;
                height: 38px;
          }
    }
 }
 
</style>
