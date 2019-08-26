<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-truck"></i>承运管理 </el-breadcrumb-item>
                <el-breadcrumb-item>添加车辆</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
         <div class="container">
               <div class="title">新建车辆</div>
               <el-divider></el-divider>
               <p>车辆信息</p>
            <el-form :label-position="labelPosition" label-width="80px" :model="form" class="forms" >
                <el-form-item label="所属车队">
                    <el-select v-model="form.all" placeholder="请选择所属车队">
                        
                    </el-select>
                </el-form-item>
                <el-form-item label="车型">
                    <el-select v-model="form.name" placeholder="请选择车型">
                        
                    </el-select>
                </el-form-item>
                <el-form-item label="车辆牌号">
                      <el-input v-model="form.num"  placeholder="请选择车辆牌号"></el-input>
                </el-form-item>
                <el-form-item label="车辆载重">
                    <el-input v-model="form.weight"  placeholder="请输入车辆载重"></el-input>
                </el-form-item>
                <el-form-item label="车辆简介">
                     <el-input
                        type="textarea"
                        class="textareas"
                        placeholder="请输入这个车辆的简介吧！！！"
                        v-model="form.textarea">
                        </el-input>
                </el-form-item>
            </el-form>
            <p>司机信息</p>
            <el-form :label-position="labelPosition" label-width="80px" :model="form1" class="forms" >
                <el-form-item label="司机姓名">
                     <el-input v-model="form1.info"  placeholder="请输入司机姓名"></el-input>
                </el-form-item>
                <el-form-item label="司机电话">
                     <el-input v-model="form1.phone"  placeholder="请输入司机电话"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker
                    v-model="form1.birthday"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="所在省市" class="weight">
                   <vaddress :caddress="form1.address"  @change="changes"></vaddress>
                </el-form-item>
                <el-form-item label="街道地址" class="address">
                    <el-input v-model="form1.streetaddress"  placeholder="西湖区工专路 77 号"></el-input>
                </el-form-item>
                <el-form-item label="司机简介">
                     <el-input
                        type="textarea"
                        placeholder="请输入这个司机的简介吧！！！"
                        v-model="form1.textarea">
                        </el-input>
                </el-form-item>
            </el-form>
             <div class="btngrp">
                <el-button type="primary" @click="submitMoveForm">提交</el-button>
                <el-button @click="$router.push({path:'/vehiclement'})">取消</el-button>
             </div>
         </div>
    </div>
</template>
<script>
import vaddress from "../../../components/common/address1";
export default {
    data(){
        return{
            labelPosition:'top',
            form:{
                all:'',//所属车队
                name:'',//车型
                num:'',//车辆牌号
                weight:'',//车辆载重
                textarea:''//车辆简介
            },
            form1:{
                info:'',//司机信息
                phone:'',//司机电话
                birthday:'',//出生日期
                address:{
                     sheng:'',//所在省
                       shi:'',//所在市
                },
                streetaddress:'',//街道地址
                textarea:'',//司机简介
            }
        }
    },
    components:{
        vaddress
    },
    methods:{
        //提交
        submitMoveForm(){

        },
        changes(obj){
            this.form1.address = obj
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
      p{
         margin-bottom: 15px;
      }
      .forms{
            margin-top: 20px;
            margin-bottom: 50px;
            margin-left: -40px;
            overflow: hidden;
            .el-form-item {
            display: inline-block;
            float: left;
            margin-left: 40px;
            }
            .el-input {
            width: 200px;
            }
            .el-form-item:last-child{
               width: 100%;
              .el-textarea {
                 width:40%;
              }
          }
            .weight{
              .el-input{
                  width: 65px;
              } 
              .red{
                  color: #F5222D;
                  margin: 0 23px 0 10px;
              }
              .red:last-child{
                   margin: 0 0px 0 10px;
              }
          }
      }
    //   .forms{
    //       display: flex;
    //       padding: 0 10px;
    //       flex-wrap: wrap;
    //       justify-content: space-between;
    //       margin-bottom: 50px;
    //       .el-form-item{
    //           width: 28%;
    //           .el-input{
    //               width: 100%;
    //           }
    //           .el-select{
    //               width: 100%;
    //           }
    //       }
    //       .el-form-item:last-child{
    //           width: 60%;
    //       }
    //       .weight{
    //           width:40%;
    //               .el-select{
    //                   width: 40%;
    //                   margin-right: 10px;
    //               }
    //         }
    //         .address{
    //             width: 50%;
    //               .el-input{
    //                   width: 100%;
    //               }
    //         }
    //   }
      .btngrp {
        margin-top: 30px;
        .el-button {
            width: 100px;
            height: 38px;
        }
    }
}
</style>
