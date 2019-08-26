<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-operation"></i>生产线管理 </el-breadcrumb-item>
                <el-breadcrumb-item>编辑生产线</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
         <!--编辑生产线 -->
         <div class="container">
            <span class="title">编辑生产线</span>
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
                 <el-form-item label="下线点编号" required  ></el-form-item>
                  <div v-for="(v,i) in lodlocarr" :key="i" class="nums">
                     <span>{{v.lodlocName}}</span>
                     <span class="delete"  @click="deleteFN(v.lodlocId)">删除</span>
                 </div>
                 <div class="addnum"> <el-input v-model="addform.id"  placeholder="请输入要添加的下线点编号"></el-input>
                 <span class="red" @click="defind">确定</span>
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
            lodlocarr:[],//下线点集合
            addform: {//添加下线点id
                id:''
            }
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
        getData(){
            const data = new URLSearchParams();
            var id = this.$route.query.id
            data.append('id',id)
            this.$http.post('/api/productLine/manage/productLine/query',data).then(res => {
                  // console.log(res)
                    if(res.data.ret_code == 0){
                      this.form.manufctnum = res.data.data.manufctnum
                      this.form.storhousnum = res.data.data.storhousnum
                      this.form.prdlinnum = res.data.data.prdlinnum
                      this.form.prdlindscr = res.data.data.prdlindscr
                      this.form.palletnumber = res.data.data.palletnumber
                      this.form.classtype = res.data.data.classtype
                      this.form.recsta = res.data.data.recsta
                      this.prdlinnum = res.data.data.prdlinnum
                       this.getlodloc()
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
        //获取下线点编号
        getlodloc(){
            const data = new URLSearchParams();
             var id = this.$route.query.id
            data.append('prdlinnum',this.prdlinnum)
            this.$http.post('/api/productLine/manage/lodloc/list',data).then(res => {
                  // console.log(res)
                    if(res.data.ret_code == 0){
                      this.lodlocarr = res.data.data
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
        //下线点确定
        defind(){
            if(this.addform.id){
                 const data = new URLSearchParams();
                var id = this.$route.query.id
                data.append('lineId',id)
                data.append('lodlocName',this.addform.id)
                this.$http.post('/api/productLine/manage/lodloc/add',data).then(res => {
                    // console.log(res)
                        if(res.data.ret_code == 0){
                        this.$message({
                                type: 'success',
                                message: res.data.data
                            })
                            this.addform.id = ''
                            this.getlodloc()
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
                    message: '添加的下线点编号不能为空！'
                })
            }  
        },
        //下线点删除
        deleteFN(lodlocId){
            const data = new URLSearchParams();
            data.append('lodlocId',lodlocId)
            this.$http.post('/api/productLine/manage/lodloc/delete',data).then(res => {
                  // console.log(res)
                    if(res.data.ret_code == 0){
                      this.$message({
                            type: 'success',
                            message: res.data.data
                        })
                        this.addform.id = ''
                        this.getlodloc()
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
            if(this.form.storhousnum&&this.form.manufctnum&&this.form.prdlinnum&&this.form.prdlindscr&&
                this.form.classtype&&this.form.palletnumber&&this.form.recsta){
                const data = new URLSearchParams();
                var id = this.$route.query.id
                data.append('id',id)
                data.append('storhousnum',this.form.storhousnum)
                data.append('manufctnum',this.form.manufctnum)
                data.append('prdlinnum',this.form.prdlinnum)
                data.append('prdlindscr',this.form.prdlindscr)
                data.append('classtype',this.form.classtype)
                data.append('palletnumber',this.form.palletnumber)
                data.append('recsta',this.form.recsta)
                this.$http.post('/api/productLine/manage/productLine/update',data).then(res => {
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
                                message: '编辑生产线信息不全！'
                            })
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
          .el-form-item {
              margin-bottom:10px;
          }
          .nums{
              width: 350px;
              display: flex;
              justify-content: space-between;
              span{
                  line-height: 2;
                  margin-left: 5px;
              }
              .delete{
                  color: #169BD5;
                  font-size: 12px;
                  cursor: pointer;
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
