<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>客户管理 </el-breadcrumb-item>
                <el-breadcrumb-item>客户详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container head">
            <div class="d_head">
                 <div> <span>{{outnam}}</span><span >{{outnum}}</span> </div>
                 <!-- <el-button type="primary" >编辑</el-button> -->
            </div>
            <el-divider></el-divider>
            <div class="tops">
                <span><a class="publicolor">联系人: </a>{{conprntit}}</span>
                <span><a class="publicolor">联系电话：</a>{{conprntel2}}</span>
                <span><a class="publicolor">付款方式：</a>{{payterm}}</span>
            </div>
            <div class="contents ones">
                <span><a class="publicolor">装卸方式: </a>{{lodtack}}</span>
                <span><a class="publicolor">配送类型: </a>{{outdeltyp}}</span>
                <span><a class="publicolor">托盘交易：</a>{{palletTrade}}</span>
            </div>
            <div class="contents">
                <span><a class="publicolor">客户重量：</a><a class="max">上限{{max}}吨</a><a>下限{{min}}吨</a></span>
                <span></span>
                <span></span>
            </div>
         </div>
        <div class="container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="送货记录" name="record">
                <div>
                    <div class="record_head" v-if="ouytotal">
                        <div>
                             <span class="color">总订单量</span><span>200单</span>
                             <span class="color">订单总金额</span><span>200000元</span>
                        </div>
                         <el-input
                            placeholder="请输入内容"
                            suffix-icon="el-icon-search"
                            v-model="text">
                        </el-input>
                    </div>
                     <div id="tableId">
                    <el-table :data="tableData" :header-cell-style="rowClass" style="width: 100%; margin-top: 20px;" >
                    <el-table-column  prop="date"  label="送货单号" align="center"  width="140"></el-table-column>
                    <el-table-column  prop="date"  label="商品数量" align="center"  width="140"></el-table-column>
                    <el-table-column  prop="date"  label="商品重量" align="center"  width="100"></el-table-column>
                    <el-table-column  prop="date"  label="送货车队" align="center"  width="140"></el-table-column>
                    <el-table-column  prop="date"  label="送货车辆"     align="center"  width="140"></el-table-column>
                    <el-table-column  prop="date"  label="送达时间" align="center"  width="140"></el-table-column>
                    <el-table-column  prop="date"  label="耗时" align="center"  width="100"></el-table-column>
                    <el-table-column  prop="date"  label="订单状态" align="center"  width="140"></el-table-column>
                    <el-table-column   label="操作"     align="center"  >
                        <template slot-scope="scope">
                            <el-button type="text" size="small"  @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                            <el-button type="text" size="small"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                     </div>
                    <el-pagination
                        style="margin-top: 20px;"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalSize">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="托盘往来" name="Palletx">
                     <div>
                            <div class="record_head" v-if="Traytotal">
                                <div>
                                    <span class="color">总托盘量</span><span>{{TraySum.sumPalletNumber}}块</span>
                                    <span class="color">已还</span><span class="green">{{TraySum.sumRepaidPalletNumber}}块</span>
                                    <span class="color">未还</span><span class="red">{{TraySum.sumNoRepaidPalletNumber}}块</span>
                                    <span class="color">托盘金额</span><span class="red">&yen;{{TraySum.sumAmount}}</span>
                                </div>  
                            </div>
                            <div id="tableId">
                            <el-table :data="tableData1" :header-cell-style="rowClass" style="width: 100%; margin-top: 20px;" >
                            <el-table-column  prop="id"  label="送货单号" align="center"  width="180"></el-table-column>
                            <el-table-column  prop="shpartqty"  label="商品数量" align="center"  width="140"></el-table-column>
                            <el-table-column   label="托盘数量" align="center"  width="140">
                                <template slot-scope="scope">
                                    <span>{{scope.row.palletNumber}}块</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="已还托盘" align="center"  width="140">
                                <template slot-scope="scope">
                                    <span class="green">{{scope.row.repaidPalletNumber}}块</span>
                                </template>
                            </el-table-column>
                            <el-table-column    label="未还托盘"     align="center"  width="140">
                                 <template slot-scope="scope">
                                    <span v-if="scope.row.state == '未还清'" class="red">{{scope.row.noRepaidPalletNumber}}块</span>
                                    <span v-else>{{scope.row.noRepaidPalletNumber}}块</span>
                                </template>
                            </el-table-column>
                            <el-table-column   label="金额"     align="center"  width="140">
                                <template slot-scope="scope">
                                   <span v-if="scope.row.state == '未还清'" class="red">&yen;{{scope.row.amount}}</span>
                                    <span v-else>&yen;{{scope.row.amount}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="state"  label="托盘状态" align="center"  width="140">
                                 <template slot-scope="scope">
                                   <span :class="scope.row.state == '未还清'?'redb':'greenb'"></span><span v-if="scope.row.state == '未还清'" >{{scope.row.state}}</span>
                                   <span v-else >{{scope.row.state}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column   label="操作"     align="center"  >
                                <template slot-scope="scope">
                                    <el-button type="text" size="small"  @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                         </div>
                        <el-pagination
                            v-if="pageShow"
                            style="margin-top: 20px;"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalSize">
                        </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="地址管理" name="Address">
                  <div class="address">
                        <div class="tops">
                        <span><a class="publicolor">送货区域: </a><a class="block">河北省——邯郸市A</a></span>
                        <span>
                            <a class="publicolor">送货地址:</a>
                            <a class="blank">河北省</a><a class="blank">石家庄市</a><a class="blank">邯郸县</a><a class="blank">西湖路77号</a>
                            <a class="img"><img src="../../../assets/img/u950.png" alt=""><img src="../../../assets/img/chahao.png" alt=""></a>
                        </span>
                    </div>
                    <div class="goodsMsg" ref="goodsStatus" v-for="(item,index) in form.storeNum" :key="item.key">
                       <el-form :label-position="labelPosition" label-width="80px" :model="form" >
                            <span class="chahao" v-if="form.storeNum.length - 1 !== index"><img src="../../../assets/img/chahao.png" alt="" @click="delStore(item)"></span>
                            <span class="jiahao" v-if="form.storeNum.length - 1 === index"><img src="../../../assets/img/jiahao.png" alt="" @click="addStore"></span>
                            <el-form-item label="街道地址">
                                <el-input v-model="item.streetaddress"  placeholder="西湖区工专路 77 号"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="btngrp">
                        <el-button type="primary" @click="submitMoveForm">提交</el-button>
                        <el-button @click="$router.push({path:'/khmanagement'})">取消</el-button>
                     </div>
                  </div>
            </el-tab-pane>
        </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            Outnum:'',//接收的客户编号
            outnam:'',//客户名称
            outnum:'',//后台返回的客户编号
            conprntit:'',//联系人
            conprntel2:'',//联系电话
            payterm:'',//付款方式
            lodtack:'',//装卸方式
            outdeltyp:'',//配送类型
            palletTrade:'',//托盘交易
            max:'',//上限
            min:'',//下限
            activeName:'record',//默认为送货记录 
            tabindex:'',//tab下标
            tableData:[],//送货记录表格数据
            outSum:{},//托盘往来数字数据
            ouytotal: null,//判断提示是否显示
            tableData1:[],//托盘往来表格数据
            TraySum:{},//托盘往来数字数据
            Traytotal: null,//判断提示是否显示
            pageShow: true,//第二个分页是否显示
            text:'',//搜索框内容
            currentPage: 1, // 当前页
            pageSize: 20, // 每页条数
            totalSize: 0 ,// 总条数
            labelPosition:'top',
            form:{
               storeNum:[
                   {
                        streetaddress:'西湖区工专路 77 号',//街道地址
                        key: Date.now()
                   }
               ]
            }
        }
    },
    created(){
         this.Outnum = this.$route.query.outnum
    },
    mounted(){
         
         this.getDeliveryData()
         this.getTrayData()
         this.getData()
    },
    methods:{
        getData(){
            this.$http.get('/api/outlet/get/'+ this.Outnum).then(res => {
                   // console.log(res)
                    if(res.data.ret_code == 0){
                         this.outnam = res.data.data.outnam
                         this.outnum = res.data.data.outnum
                         this.payterm =res.data.data.payterm == '0' ? '预付':res.data.data.payterm == 1?'货到已付':res.data.data.payterm == 2?'货到未付':''//付款方式
                         this.max = res.data.data.whlwgtmax
                         this.min = res.data.data.whlwgtmin
                         this.conprntit = res.data.data.conprntit//联系人
                         this.conprntel2 = res.data.data.conprntel2
                         this.lodtack =  res.data.data.lodtack==1?'散码':'托盘'//装卸方式
                         this.outdeltyp =  res.data.data.outdeltyp == '1' ? '拼车直送':res.data.data.outdeltyp == 2?'直送':res.data.data.outdeltyp == 3?'配送':''//配送类型
                         this.palletTrade =  res.data.data.outletAttach.palletTrade == '1'?'是':'否'//托盘交易
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
        //送货记录
        getDeliveryData(){

        },
         //托盘往来
        getTrayData(){
            var token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjI3NTU5MzksInVzZXJJZCI6Ims4OCIsImlhdCI6MTU2MjcyNzEzOSwiY3B5Y29kIjoiMDAxMCJ9.oJA8XWSp-MjfaBgkUux4zHvu3nG2oVtShW-IrJhZY9A'
            const data = new URLSearchParams();
            data.append("outnum",this.Outnum);
            data.append("page", this.currentPage);
            data.append("pagesize", this.pageSize);
            this.$http.get('/api/pallet/dealings/list?'+data).then(res => {
                   // console.log(res)
                    if(res.data.ret_code == 0){
                        this.Traytotal = res.data.data.sum
                        this.tableData1 = res.data.data.list
                        this.TraySum = res.data.data.sum
                        this.totalSize = parseInt(res.data.data.sum.total)
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
        //表头样式
        rowClass(){
              return 'background:rgba(248,248,248,1); height: 45px;font-weight: normal;'
        },
        //tab切换
        handleClick(tab){
            this.tabindex = tab.index
             this.pageShow = false
            if (tab.index === '0') {
                    this.totalSize = 0
                    this.currentPage = 1
                    this.$nextTick(() => {
                        this.pageShow = true
                    })
                    this.getDeliveryData()
                } else if(tab.index === '1') {
                    this.currentPage = 1
                    this.totalSize = 0
                    this.$nextTick(() => {
                        this.pageShow = true
                    })
                    this.getTrayData()
                }else{
                    return
                }
        },
        // 每页条数
        handleSizeChange(val) {
           // console.log(`每页 ${val} 条`);
             this.pageSize = val
            if (this.tabindex === '0') {
                    this.getDeliveryData()
            }else if(this.tabindex === '1') {
                    this.getTrayData()
            }else{
                return
            }
        },
        // 当前页
        handleCurrentChange(val) {
          //  console.log(`当前页: ${val}`);
             this.pageSize = val
             if (this.tabindex === '0') {
                    this.getDeliveryData()
            }else if(this.tabindex === '1') {
                    this.getTrayData()
            }else{
                return
            }
        },
        //追加
        delStore(item){
            var index =  this.form.storeNum.indexOf(item)
            if (index !== -1) {
             this.form.storeNum.splice(index, 1)
            }
        },
        //删除
        addStore(){
            this.form.storeNum.push({
                    streetaddress:'',//街道地址
                    key: Date.now()
                })
        },
        //提交
        submitMoveForm(){

        },
        //详情
        handleEdit(index,row){

        }

    },
}
</script>
<style scoped  lang="less">
 .head{
    margin-bottom: 20px;
    .publicolor {
        color: rgb(148, 144, 144);
        font-weight: normal
    }
    .d_head{
        display: flex;
        justify-content: space-between;
        width: 100%;
        div{
            display: flex;
            align-items: center;
            span{
                font-size: 18px;
                margin-right: 40px;
            }
        }
    }
    .tops {
      height: 36px;
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
      margin-top: 20px!important;
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
      .max{
          margin-right: 30px;
      }
    }
 }
 .container{
     #tableId {
        width: 100%;
            .greenb{
                background:#5DCC33;
                 display: inline-block;
                 width: 6px;
                 height: 6px;
                 border-radius: 50%;
                 vertical-align: middle;
                 margin-right: 8px;
            }
           .redb{
                background:#FF0057;
                display: inline-block;
                width: 6px;
                height:6px;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 8px;
            }
    }
    @media screen and (min-width: 1400px) {
        #tableId {
            width: 1160px;
        }
    }
    .green{
             color:#5DCC33;
    }
    .red{
              color:#FF0057;
    }
     .record_head{
         padding: 10px 0;
         display: flex;
         justify-content: space-between;
         align-items: center;
         height: 40px;
         .color{
             color:#BCBCBC;
             margin-right: 50px; 
         }
         span{
             margin-right: 50px;
         }
         .el-input{
             width: 200px;
         }
     }
     .address{
         .tops{
             padding: 20px;
             span{
                 display: block;
                 line-height: 3;
                 .publicolor{
                     margin-right: 50px;
                 }
                 .block{
                     font-size: 18px;
                 }
                 .blank{
                     margin-right: 10px;
                 }
                 .img{
                     margin-left: 50px;
                 }
                 img{
                     vertical-align: middle;
                     margin-right: 20px;
                     cursor: pointer;
                 }
             }
         }
         .goodsMsg{

             .el-form{
                 width: 50%;
                 margin-left: 145px;
                 display: flex;
                 align-items: center;
                 span{
                     margin-right: 20px;
                     cursor: pointer;
                 }
                 .el-form-item{
                     width: 80%;
                 }
             }
         }
         .btngrp {
            margin-top: 30px;
            padding: 0 20px;
            .el-button {
                width: 70px;
                height: 38px;
            }
        }
     }
 }
</style>
