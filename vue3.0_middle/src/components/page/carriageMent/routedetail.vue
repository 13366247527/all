<template>
   <div>
       <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-truck"></i>承运管理 </el-breadcrumb-item>
                <el-breadcrumb-item>路线详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
          <div class="container head">
                <span class="text">路线信息</span>
                <el-divider></el-divider>
                <div class="tops">
                    <span><a class="publicolor">路线名称: </a>{{routeD.endloc}}</span>
                    <span><a class="publicolor">承运商名称：</a>{{routeD.vehgrpName}}</span>
                    <span><a class="publicolor">路线客户：</a>{{routeD.outletCount}}个</span>
                </div>
                 <div class="contents ones">
                    <span><a class="publicolor">起始地点: </a>{{routeD.strloc}}</span>
                    <span><a class="publicolor">目的地: </a>{{routeD.destination}}</span>
                </div> 
                <div class="contents ones">
                    <span><a class="publicolor">状态: </a>{{routeD.recsta == 'N' ?'废弃':'正常'}}</span>
                    <span><a class="publicolor">备注: </a>{{routeD.trprteesc}}</span>
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
          routeD:{},//详情数据
          trprte:'',//接收的路线编号
       }
   },
   created(){
        this.trprte = this.$route.query.trprte
   },
   mounted(){
     this.getData()
   },
   methods:{
     getData(){
       this.$http.get("/api/whtransportroute/"+this.trprte).then(res => {
         console.log(res.data);
          if (res.data.ret_code == 0) {
             this.routeD = res.data.data
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
          path:'/routement'
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
            display: inline-block;
            float: left;
            margin-left: 10px;
          }
          span:first-child {
            margin-left: 0;
            width: 311px;
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
