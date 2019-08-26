<template>
    <div>
        <div class="crumbs">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-school"></i>仓库管理 </el-breadcrumb-item>
                <el-breadcrumb-item>仓库详情</el-breadcrumb-item>
                <el-breadcrumb-item>库房详情</el-breadcrumb-item>
                <el-breadcrumb-item>库区详情</el-breadcrumb-item>
                <el-breadcrumb-item>批量添加库位</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
        <div class="container">
            <span class="title">批量添加库位</span>
            <el-divider></el-divider>
            <p>库位信息</p>
            <el-form :label-position="labelPosition" label-width="80px" :model="form" class="forms" >
                <el-form-item label="库房编号" class="kuname" required >
                    <el-input v-model="form.roomid" placeholder="请输入库房编号" disabled></el-input>
                </el-form-item>
                <el-form-item label="仓库编号" class="kuname" required>
                    <el-input v-model="form.storeid" placeholder="请输入仓库编号" disabled></el-input>
                </el-form-item>
                <el-form-item label="库位面积" required class="add">
                   <el-select v-model="form.binarea" placeholder="请选择库位面积">
                        <el-option
                        v-for="item in binArea"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                    </el-select>
                    <span class="blue" @click="addarea">新增</span>
                </el-form-item>
                 <el-form-item label="库位类型" required>
                    <el-select v-model="form.bintype" placeholder="请选择库位类型">
                        <el-option
                        v-for="item in binType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="码放模式" required>
                    <!-- <el-select v-model="form.type" placeholder="请选择码放模式">
                        <el-option
                        v-for="item in codePlay"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                    </el-select> -->
                      <el-input v-model="form.type" placeholder="请输入码放模式" ></el-input>
                </el-form-item>
                <el-form-item label="可放托数" class="weight" required> 
                    <el-input v-model="form.num"  placeholder="请输入可放托数"></el-input> <span class="red">托</span>
                </el-form-item>
                 <el-form-item label="可放垛数" class="weight" required> 
                    <el-input v-model="form.dnum"  placeholder="请输入可放垛数"></el-input> <span class="red">垛</span>
                </el-form-item>
                 <el-form-item label="批量添加数量" required> 
                    <el-input v-model="form.addnum"  placeholder="请输入批量添加数量"></el-input>
                </el-form-item>
            </el-form>
            <div class="btngrp">
                <el-button type="primary" @click="submitMoveForm">提交</el-button>
                <el-button @click="cancel">取消</el-button>
             </div>
        </div>
         <!-- 库位面积新增  弹框 -->
        <el-dialog title="新增库位面积" :visible.sync="addVisible" class="addVisible" :before-close="handleDialogClose" width="35%">
                <div class="form">
                    <el-form  :model="addform"  label-width="60px" :label-position="labelPosition1">
                         <el-form-item label="长:" required class="weight" >
                              <el-input v-model="addform.long"  placeholder="请输入长"></el-input> <span class="red">cm</span>
                         </el-form-item>
                            <el-form-item label="宽:" required class="weight" >
                                <el-input v-model="addform.wide"  placeholder="请输入宽"></el-input> <span class="red">cm</span>
                            </el-form-item>
                            <el-form-item label="高:" required class="weight" >
                                <el-input v-model="addform.height"  placeholder="请输入高"></el-input> <span class="red">cm</span>
                            </el-form-item>
                            <el-form-item label="面积:" required class="weight" >
                                <el-input v-model="addform.area"  placeholder="请输入面积"></el-input> <span class="red">㎡</span>
                            </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel1">取 消</el-button>
                    <el-button type="primary" @click="adddefine">确 定</el-button>
                </div>
            </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            labelPosition:'top',
            form:{//库位信息
                roomid:'',
                storeid:'',
                binarea:'',
                type:'',//码货模式
                num:'',//托盘数量
                dnum:'',//可放垛数
                bintype:'',//库位类型
                addnum:''//添加数量
            },
            codePlay:[],//码放模式
            binArea:[],//库位面积数据
            binType:[
                {
                    value:'p',
                    label:'托盘库位'
                },
                {
                    value:'a',
                     label:'物品库位'
                },
                {
                    value:'i',
                     label:'隔离库位'
                }
            ],//库位类型
            labelPosition1:'right',
            addVisible:false,//新增库位面积开关
            addform:{
                long:'',
                wide:'',
                height:'',
                area:'',
            }
        }
    },
    mounted(){
        //获取库房编号
        this.form.roomid = this.$route.query.storeNum
        //获取仓库编号
        this.form.storeid = this.$route.query.wareHouseNum
        this.getcodePlay()
        this.getbinArea()
    },
    methods:{
        //获取库位面积
        getbinArea(){
            this.$http.get('/api/warehouse/getBinStyles',{}).then(res => {
                 //console.log(res)
                    if(res.data.ret_code == 0){
                        var arr = res.data.data
                        for (let i = 0; i < arr.length; i++) {
                            var height = arr[i].height == null ? 0 : arr[i].height
                           var str = '长:'+arr[i].length+'宽:'+arr[i].width+'高:'+height+'面积:'+arr[i].area
                           var obj = {}
                           obj.label = str
                           obj.value = arr[i].id
                           this.binArea.push(obj) 
                        }
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
        //获取码放模式数据
        getcodePlay(){
            const data = new URLSearchParams();
            //仓库编号
            data.append('wareHouseNum',this.$route.query.wareHouseNum)
            this.$http.get('/api/warehouse/getBinStyleModel',{params:data}).then(res => {
                // console.log(res)
                    if(res.data.ret_code == 0){
                        
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
        //新增库房面积
       addarea(){
          this.addVisible = true 
       },
       //提交
       submitMoveForm(){
           this.form.type = '1513'
           if(this.form.binarea&&this.form.num&&this.form.dnum&&this.form.addnum&&this.form.bintype&&this.form.type){
           const data = new URLSearchParams();
           data.append('wareHouseNum',this.form.storeid)
           data.append('storeNum',this.form.roomid)
           data.append('regionNum',this.$route.query.regionNum)
           data.append('binTypeId',this.form.binarea)
           data.append('selectionId',this.form.type)
           data.append('palletNumber',this.form.num)
           data.append('stackNumber',this.form.dnum)
           data.append('binType',this.form.bintype)
           data.append('batchCount',this.form.addnum)
           this.$http.post('/api/warehouse/batchInsertBin',data).then(res => {
               console.log(res)
                    if(res.data.ret_code == 0){
                         this.$message({
                            type: 'success',
                            message: '批量添加库位成功!'
                         })
                          this.$router.push({
                               path:'/areadetail?id='+this.$route.query.id+'&storeNum='+this.$route.query.storeNum+'&regionNum='+this.$route.query.regionNum
                          })
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
                            message: '批量添加库位信息不全!'
                })
           }
       },
       //取消
       cancel(){
            this.$router.push({
                path:'/areadetail?id='+this.$route.query.id+'&storeNum='+this.$route.query.storeNum+'&regionNum='+this.$route.query.regionNum
           })
       },
        //弹框 x
        handleDialogClose(){
           this.clear()
        },
        //新增库位面积 确定
        adddefine(){
             const data = new URLSearchParams();
             data.append('length',this.addform.long)
             data.append('width',this.addform.wide)
             data.append('height',this.addform.height)
             data.append('area',this.addform.area)
            this.$http.post('/api/warehouse/saveBinStyle',data).then(res => {
               //  console.log(res)
                    if(res.data.ret_code == 0){
                         this.getbinArea()
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
        //弹框 取消
        cancel1(){
           this.clear()
        },
        //弹框 数据清零
        clear(){
           this.addVisible = false
           this.addform = {//库位信息
                long:'',
                wide:'',
                height:'',
                area:''
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
            margin-bottom: 50px;
            margin-left: -40px;
            overflow: hidden;
            .el-form-item {
            display: inline-block;
            float: left;
            margin-left: 40px;
            }
            .el-form-item:nth-of-type(3){
                width: 100%;
                .el-select{
                    width: 250px;
                }
            }
             .el-form-item:last-child{
                width: 100%;
            }
            .el-input,.el-select{
            width: 200px;
            }
            .add{
                position: relative;
                .blue{
                    position: absolute;
                    top:-35px;
                    left:210px;
                    color: blue;
                    cursor: pointer;
                }
            }
            .weight{
              .red{
                  color: #666666;
                  margin: 0 23px 0 10px;
              }
          }
          .type{
              width: 200px;
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
  .addVisible{
  /deep/ .el-dialog__body {
    border-bottom: solid 1px #ebebeb !important;
    border-top: solid 1px #ebebeb !important;
    padding: 0px 0px !important;
    .form{
         padding:18px 30px;
         .el-input{
            width: 80%;
         }
         .red{
                  color: #666666;
                  margin: 0 23px 0 20px;
        }
    }
  }
}
</style>
