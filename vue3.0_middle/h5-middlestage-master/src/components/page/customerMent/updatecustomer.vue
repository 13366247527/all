<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>客户管理 </el-breadcrumb-item>
                <el-breadcrumb-item>编辑客户</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
        <div class="container">
            <span class="title">编辑客户</span>
            <el-divider></el-divider>
            <p>客户信息</p>
            <el-form :label-position="labelPosition" label-width="80px" :model="form" class="forms" >
                <el-form-item label="客户编号" required>
                    <el-input v-model="form.id" placeholder="请输入客户编号" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="客户名称" class="kuname" required>
                    <el-input v-model="form.name" placeholder="请输入客户名称"></el-input>
                </el-form-item>
                <el-form-item label="付款条件" required>
                   <el-select v-model="form.condition" placeholder="请选择付款条件">
                        <el-option
                        v-for="item in payTerm"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户渠道" required>
                   <el-select v-model="form.channel" placeholder="请选择客户渠道">
                            <el-option
                        v-for="item in outchannel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option> 
                    </el-select>
                </el-form-item>
                <el-form-item label="客户级别" required>
                    <el-select v-model="form.level" placeholder="请选择客户级别">
                        <el-option
                        v-for="item in outlevel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户重量" class="weight" required>
                    <el-input v-model="form.max"  placeholder="上限"></el-input> <span class="red">吨</span>
                    <el-input v-model="form.min"  placeholder="下限"></el-input> <span class="red">吨</span>
                </el-form-item>
                <el-form-item label="联系人" required>
                    <el-input v-model="form.link"  placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="固定电话" required>
                    <el-input v-model="form.phone"  placeholder="请输入固定电话"></el-input>
                </el-form-item>
                <el-form-item label="移动电话" required>
                    <el-input v-model="form.mobilephone"  placeholder="请输入移动电话"></el-input>
                </el-form-item>
                 <el-form-item label="注册地址" required>
                    <el-input v-model="form.address"  placeholder="请输入注册地址"></el-input>
                </el-form-item>
                 <el-form-item label="保质期要求" required>
                    <el-input v-model="form.period"  placeholder="请输入保质期要求"></el-input>
                </el-form-item>
            </el-form>
            <p>托盘信息</p>
            <el-form :label-position="labelPosition" label-width="80px" :model="form1" class="forms">
                <el-form-item label="装卸方式" class="type" required>
                   <el-radio v-model="form1.radio1" label="1">散码</el-radio>
                   <el-radio v-model="form1.radio1" label="2">托盘</el-radio>
                </el-form-item>
                <el-form-item label="配送类型" required>
                    <el-select v-model="form1.type" placeholder="请选择配送类型">
                        <el-option
                        v-for="item in deliveryType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="托盘交易" required>
                   <el-select v-model="form1.Pallet " placeholder="请选择托盘交易">
                          <el-option label="是"  value="1"> </el-option>
                          <el-option label="否"  value="0"> </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
              <p>送货区域</p>
              <el-form  :model="form2" :label-position="DeliveryPosition" label-width="100px" class="formx">
                <el-form-item label="线路名称" class="weight" required>
                    <!-- filterable 是否可搜索 remote 是否为远程搜索 remote-method 远程搜索方法 -->
                   <el-select
                        v-model="form2.routevalue"
                        filterable
                        remote
                        placeholder="请输入线路名称"
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option
                        v-for="item in routeoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="不在已规划路线范围内">
                     <el-button type="info" @click="routeVisible=true">添加线路</el-button>
                </el-form-item>
               </el-form>  
                <routedialog :routeVisible="routeVisible" @changes="changeFn"></routedialog>
            <p>地址信息</p>
            <div class="goodsMsg" ref="goodsStatus" v-for="(item, index) in form3.storeNum" :key="item.key">
                <el-form :label-position="labelPosition" label-width="80px" :model="form3" >
                    <el-form-item label="街道地址" required>
                           <el-input v-model="item.streetaddress"  placeholder="西湖区工专路 77 号"></el-input>
                    </el-form-item>
                </el-form>
                <span class="chahao" v-if="form3.storeNum.length - 1 !== index"><img src="../../../assets/img/chahao.png" alt="" @click="delStore(item)"></span>
                <span class="jiahao" v-if="form3.storeNum.length - 1 === index"><img src="../../../assets/img/jiahao.png" alt="" @click="addStore()"></span>
             </div>
             <div class="btngrp">
                <el-button type="primary" @click="submitMoveForm">提交</el-button>
                <el-button @click="$router.push({path:'/khmanagement'})">取消</el-button>
             </div>
        </div>
    </div>
</template>
<script>
import routedialog from "../carriageMent/routedialog";
export default {
    data(){
        return{
            labelPosition:'top',
            form:{//客户信息
                id:'',//客户编号
                name:'',//客户名称
                condition:'',//付款条件
                channel:'',//客户渠道
                level:'',//客户级别
                max:'',//客户重量 上限
                min:'',//客户重量 上限
                link:'',//联系人
                phone:'',//固定电话
                mobilephone:'',//mobilephone
                address:'',//注册地址
                 period:'',//保质期要求
            },
            payTerm:[],//付款条件
            outchannel:[],//客户渠道
            outlevel:[],//客户级别
            deliveryType:[],//配送类型
            form1:{//托盘信息
                    radio1:'1',//装卸方式
                    type:'',//配送类型
                    Pallet:'',//托盘交易
            },
            DeliveryPosition:'top',//送货区域
            routeoptions: [],//线路名称筛选数组
            routealloptions: [],//线路名称数组
            loading: false,
            form2:{//送货区域
                routevalue:'',//线路名称
            },
            delrteid:'',//线路id
            routeVisible: false, //新建路线 弹框开关
            form3:{//地址信息
                storeNum:[{
                    streetaddress:'西湖区工专路 77 号',//街道地址
                    key: Date.now()
                  }
                ]
            },
        }
    },
    components:{
       routedialog
    },
    mounted(){
        this.getdata()
        this.getSelect()
    },
    methods:{
        //获取下拉框的值
        getSelect(){
            const data = new URLSearchParams();
            this.$http.post('/api/outlet/initDict',{}).then(res => {
                //console.log(res)
                if(res.data.ret_code == 0){
                    for (let i = 0; i < res.data.data.payTerm.length; i++) {
                        var obj = {}
                        obj.label = res.data.data.payTerm[i].valdescm
                        obj.value = res.data.data.payTerm[i].selval
                        this.payTerm.push(obj)
                    }
                    for (let i = 0; i < res.data.data.outchannel.length; i++) {
                        var obj = {}
                        obj.label = res.data.data.outchannel[i].valdescm
                        obj.value = res.data.data.outchannel[i].selval
                        this.outchannel.push(obj)
                    }
                    for (let i = 0; i < res.data.data.outLevel.length; i++) {
                        var obj = {}
                        obj.label = res.data.data.outLevel[i].valdescm
                        obj.value = res.data.data.outLevel[i].valdescm
                        this.outlevel.push(obj)
                    }
                    for (let i = 0; i < res.data.data.delrtetyp.length; i++) {
                        var obj = {}
                        obj.label = res.data.data.delrtetyp[i].valdescm
                        obj.value = res.data.data.delrtetyp[i].selval
                        this.deliveryType.push(obj)
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
        //获取后台数据
        getdata(){
            var outnum  = this.$route.query.outnum
            this.$http.get('/api/outlet/get/'+outnum).then(res => {
                   // console.log(res)
                    if(res.data.ret_code == 0){
                        this.form.id = res.data.data.outnum
                        this.form.name = res.data.data.outnam
                        this.form.condition = res.data.data.payterm
                        this.form.channel = res.data.data.trdchn
                        this.form.level = res.data.data.glocuscls
                        this.form.max = res.data.data.whlwgtmax
                        this.form.min = res.data.data.whlwgtmin
                        this.form.period = res.data.data.expiryDate
                        this.form.link = res.data.data.conprntit
                        this.form.phone = res.data.data.conprntel1
                        this.form.mobilephone = res.data.data.conprntel2
                        this.form.address = res.data.data.outadr1
                        this.form1.radio1 =  res.data.data.lodtack
                        this.form1.type =  res.data.data.outdeltyp//配送类型
                        this.form1.Pallet =  res.data.data.outletAttach.palletTrade//托盘交易
                        this.form2.routevalue = res.data.data.outletAttach.roadLineName//线路名称
                        this.delrteid = res.data.data.delrte//线路id
                        let urlarr = res.data.data.outletAttach.streetAddress.split(',')
                        this.form3.storeNum = []
                        for (let i = 0; i < urlarr.length; i++) {
                            this.form3.storeNum.push({
                                streetaddress:urlarr[i],
                                key: i
                            })   
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
        //删除
        delStore(item){
            var index =  this.form3.storeNum.indexOf(item)
            if (index !== -1) {
             this.form3.storeNum.splice(index, 1)
            }
        },
        //追加
        addStore(){
            this.form3.storeNum.push({
                    streetaddress:'',//街道地址
                    key: Date.now()
                })
        },
        //提交
        submitMoveForm(){
            //获取线路名称所在数组
             var  routeItem = []
             if(this.routealloptions.length <= 0){//线路没有进行修改直接提交
                var obj = {}
                obj.trprte = this.delrteid
                obj.endloc = this.form2.routevalue
                routeItem.push(obj)
             }else{//线路进行修改直接提交
              //  console.log('1111')
                routeItem = this.routealloptions.filter(item =>{
                      return item.trprte == this.form2.routevalue
                })
             }
             // console.log(routeItem)
            //地址拼接
            var str = ''
            for (let i = 0; i < this.form3.storeNum.length; i++) {
                if(i == this.form3.storeNum.length-1){
                    str += this.form3.storeNum[i].streetaddress;  
                }else{
                     str += this.form3.storeNum[i].streetaddress+',';  
                }
            }
            if(this.form.period){
                if(Number.isInteger(this.form.period) && parseInt(this.form.period) > 0){  
                        var  params = {
                            outnum: this.form.id,
                            outnam: this.form.name,
                            payterm: this.form.condition,
                            trdchn: this.form.channel,
                            glocuscls: this.form.level,
                            whlwgtmax: this.form.max,
                            whlwgtmin:  this.form.min,
                            expiryDate: this.form.period,
                            conprntit: this.form.link,
                            conprntel1: this.form.phone,
                            conprntel2: this.form.mobilephone,
                            outadr1:this.form.address,
                            lodtack:this.form1.radio1,
                            outdeltyp: this.form1.type,
                            delrte:routeItem[0].trprte,//线路id
                            outletAttach:{
                                palletTrade:this.form1.Pallet,
                                roadLineName:routeItem[0].endloc,
                                streetAddress:str
                            }
                        }
                    // console.log(params)
                        this.$http.put('/api/outlet/update',params).then(res => {
                            // console.log(res)
                                if(res.data.ret_code == 0){
                                    this.$message({
                                        type: 'success',
                                        message: res.data.data
                                    })
                                    this.$router.push({
                                        path:'/khmanagement'
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
                            message: '保质期要求必须为整数'
                    })
                }
            }else{
                var  params = {
                            outnum: this.form.id,
                            outnam: this.form.name,
                            payterm: this.form.condition,
                            trdchn: this.form.channel,
                            glocuscls: this.form.level,
                            whlwgtmax: this.form.max,
                            whlwgtmin:  this.form.min,
                            expiryDate: this.form.period,
                            conprntit: this.form.link,
                            conprntel1: this.form.phone,
                            conprntel2: this.form.mobilephone,
                            outadr1:this.form.address,
                            lodtack:this.form1.radio1,
                            outdeltyp: this.form1.type,
                            delrte:routeItem[0].trprte,//线路id
                            outletAttach:{
                                palletTrade:this.form1.Pallet,
                                roadLineName:routeItem[0].endloc,
                                streetAddress:str
                            }
                        }
                    // console.log(params)
                        this.$http.put('/api/outlet/update',params).then(res => {
                            // console.log(res)
                                if(res.data.ret_code == 0){
                                    this.$message({
                                        type: 'success',
                                        message: res.data.data
                                    })
                                    this.$router.push({
                                        path:'/khmanagement'
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
            }
        },
        //弹框关闭
        changeFn(val){
             this.routeVisible = false
        },
        //路线名称 远程搜索
        remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
           const data = new URLSearchParams();
            data.append("keyword",query);
            this.$http.get('/api/whtransportroute/query?keyword='+query).then(res => {
                    //console.log(res)
                    if(res.data.ret_code == 0){
                         this.loading = false;
                         this.routealloptions = []
                         this.routeoptions = []
                         this.routealloptions = res.data.data
                       for (let i = 0; i < res.data.data.length; i++) {
                            var obj = {}
                            obj.label = res.data.data[i].endloc
                            obj.value = res.data.data[i].trprte
                            this.routeoptions.push(obj)
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
        } else {
          this.routeoptions = [];
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
            .el-input {
            width: 200px;
            }
            .kuname{
                .el-input{
                  width:300px;
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
          .type{
              width: 200px;
          }
      }
      .formx{
            margin-top: 20px;
            margin-bottom: 50px;
            margin-left: -40px;
            overflow: hidden;
            .el-form-item {
            display: inline-block;
            float: left;
            margin-left: 40px;
            }
             .el-form-item:last-child{
                 .el-button{
                     background: #0069DD;
                     width: 140px;
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
    //       .weight{
    //           .el-input{
    //               width: 30%;
    //           } 
    //           .red{
    //               color: #F5222D;
    //               margin: 0 50px 0 10px;
    //           }
    //       }
    //   }
    //   .formX{
    //       display: flex;
    //       padding: 0 10px;
    //       flex-wrap: wrap;
    //       justify-content: space-between;
    //       margin-bottom: 50px;
    //      .weight{
    //          width: 100%;
    //          .el-select{
    //              width: 45%;
    //          }
    //      }
    //      .qidians{
    //           width:45%;
    //      }
    //       .zhongdians{
    //           width: 45%;
    //      }
    //   }
      .goodsMsg{
          display: flex;
          .el-form{
              width:45% ;
          }
          span{
              margin-top:45px;
              margin-left: 20px;
              cursor: pointer;
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
