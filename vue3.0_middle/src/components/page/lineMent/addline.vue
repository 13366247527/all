<template>
    <div>
         <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-operation"></i>生产线管理 </el-breadcrumb-item>
                <el-breadcrumb-item>添加生产线</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
         <!--添加生产线 -->
         <div class="container">
            <span class="title">新建生产线</span>
            <el-divider></el-divider>
                       <p>生产线信息</p>
            <el-form :label-position="labelPosition" label-width="80px" :model="form" class="forms" >
                <el-form-item label="库房编号" required>
                    <el-select v-model="form.storhousnum" placeholder="请选择库房编号">
                            <el-option
                                v-for="item in roomoptions"
                                :key="item.storhousnum"
                                :label="item.storhousnum"
                                :value="item.storhousnum"
                            >
                        </el-option> 
                    </el-select>
                </el-form-item>
                <el-form-item label="生产厂编号" required>
                    <el-input v-model="form.manufctnum" placeholder="请输入生产厂编号"></el-input>
                </el-form-item>
                <el-form-item label="生产线编号"  required>
                    <el-input v-model="form.prdlinnum" placeholder="请输入生产线编号"></el-input>
                </el-form-item>
                 <el-form-item label="生产线名称"  required>
                    <el-input v-model="form.prdlindscr" placeholder="请输入生产线名称"></el-input>
                </el-form-item>
                <el-form-item label="班次" required>
                   <el-select v-model="form.classtype" placeholder="请选择班次">
                            <el-option
                            v-for="item in shifts"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                        </el-option> 
                    </el-select>
                </el-form-item>
                <el-form-item label="可放托数量" required class="weight">
                    <el-input v-model="form.palletnumber"  placeholder="请输入可放托数量"></el-input><span class="red">托</span>
                </el-form-item>
                <el-form-item label="状态" required>
                   <el-select v-model="form.recsta" placeholder="请选择状态">
                            <el-option
                        v-for="item in state"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option> 
                    </el-select>
                </el-form-item>
            </el-form>
             <el-form class="add">
                 <div class="title"><el-form-item label="下线点编号" required ></el-form-item>
                 <span @click="addlodloc">添加下线点</span></div>
                 <div v-for="(v,i) in lodlocarr" :key="v.key" class="addnum">
                      <el-input v-model="v.value"  placeholder="请输入要添加的下线点编号"></el-input>
                      <span class="red" @click="deleteFn(i)">删除</span>
                 </div>
            </el-form>
             <div class="btngrp">
                <el-button type="primary" @click="submitMoveForm">提交</el-button>
                <el-button @click="$router.push({path:'/linement'})">取消</el-button>
             </div>
         </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           labelPosition:'top',
            form:{
                storhousnum:'',//库房编号
                manufctnum:'' ,//生产厂编号
                prdlinnum:'',//生产线编号
                prdlindscr:'',//生产线名称
                palletnumber:'',//可放托盘数量
                classtype:'',//班次 
                recsta:'',//状态
            },
            roomoptions:[],//库房编号
            state:[
                {
                    value:'Y',
                    label:'启用'
                },
                {
                    value:'N',
                    label:'停用'
                }
            ],//状态
            shifts:[
                {
                    value:'2',
                    label:'两班倒' 
               },
               {
                    value:'3',
                    label:'三班倒' 
               }
            ],//班次
            prdlinnum:'',//生产线编号
            lodlocarr:[
                {
                    value:'',
                }
            ],//下线点集合
            addform: {//添加下线点id
                id:''
            }
        }
    },
    mounted(){
       this.getSelect() 
    },
    methods:{
        //获取库房
        getSelect(){
            this.$http.post('/api/productLine/manage/storhousnum/list').then(res => {
                 //  console.log(res)
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
        //提交
        submitMoveForm(){
            var number = ''
            for (let i = 0; i < this.lodlocarr.length; i++) {
               if(this.lodlocarr[i].value && i == this.lodlocarr.length -1){
                   number += this.lodlocarr[i].value
               }
               if(this.lodlocarr[i].value && i != this.lodlocarr.length -1){
                    number += this.lodlocarr[i].value+','
               } 
            }
            console.log(number)
            if(this.form.storhousnum&&this.form.manufctnum&&this.form.prdlinnum&&this.form.prdlindscr&&
            this.form.classtype&&this.form.palletnumber&&this.form.recsta&&number){
                const data = new URLSearchParams();
                data.append('storhousnum',this.form.storhousnum)
                data.append('manufctnum',this.form.manufctnum)
                data.append('prdlinnum',this.form.prdlinnum)
                data.append('prdlindscr',this.form.prdlindscr)
                data.append('classtype',this.form.classtype)
                data.append('palletnumber',this.form.palletnumber)
                data.append('recsta',this.form.recsta)
                data.append('number',number)
                this.$http.post('/api/productLine/manage/productLine/add',data).then(res => {
                    //console.log(res)
                        if(res.data.ret_code == 0){
                        this.$message({
                                type: 'success',
                                message: res.data.data
                        })
                        this.$router.push({path:'/linement'})
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
                                message: '添加生产线信息不全！'
                            })
            }
            
        },
        //添加下线点
        addlodloc(){
            var obj = {value:'', key: Date.now()}
            this.lodlocarr.push(obj)
        },
        //删除下线点
        deleteFn(i){
           if(this.lodlocarr.length != 1){
               this.lodlocarr.splice(i,1)
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
      p{
         margin-bottom: 15px;
      }
      .forms{
            margin-top: 20px;
            margin-bottom: 10px;
            margin-left: -40px;
            overflow: hidden;
            .el-form-item {
                display: inline-block;
                float: left;
                margin-left: 40px;
                .el-input{
                    width: 200px;
                }
                .el-select{
                    width: 200px;
                }
            }
            .weight{
              .red{
                  color: #333333;
                  margin: 0 23px 0 10px;
              }
          }
      }
      .add{
           margin-bottom: 50px; 
          .title{
              width: 350px;
              display: flex;
              justify-content: space-between;
              align-items: center;
               .el-form-item {
                margin-bottom:10px;
               }
               span{
                    color: #169BD5;
                    font-size: 12px;
                    cursor: pointer;
                    margin-right: 70px;
               }
          }
          .addnum{
              margin-top: 15px;
              width: 350px;
              display: flex;
              justify-content: space-between;
              align-items: center;
                .el-input{
                width: 280px;  
                }
                .red{
                    color: #169BD5;
                    font-size: 12px;
                    cursor: pointer;
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
}
</style>
