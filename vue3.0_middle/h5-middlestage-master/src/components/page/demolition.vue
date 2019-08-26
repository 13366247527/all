<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 单据管理</el-breadcrumb-item>
        <el-breadcrumb-item>采购单拆单</el-breadcrumb-item>
        <el-breadcrumb-item>拆单详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container head">
      <div class="titles">
        采购单信息
      </div>
      <div class="tops">
        <span><a class="publicolor">采购单号：</a>S57833389</span>
        <span><a class="publicolor">供应商：</a>北京燕京啤酒厂</span>
        <span><a class="publicolor">付款方式：</a>预付款</span>
      </div>
      <div class="contents ones">
        <span><a class="publicolor">装备方式：</a>托盘</span>
        <span><a class="publicolor">木质托盘：</a>5块</span>
        <span><a class="publicolor">塑质托盘：</a>5块</span>
      </div>
      <div class="contents">
        <span><a class="publicolor">货品重量：</a>200吨</span>
        <span><a class="publicolor">货品数量：</a>5000</span>
        <span><a class="publicolor">货品价格：</a>500000</span>
      </div>
      <div class="contents">
        <span><a class="publicolor">送货地址：</a>北京市海淀区银网中心便利蜂</span>
      </div>
    </div>
    <div class="container tableLi" style="margin-top: 20px;">
      <p class="storDetail">订单拆分</p>
      <div class="subject" v-for="(item, index) in branchForm.divcontent">
<!--        @change="trayTab($event, 'addforms')"-->
        <el-form ref="branchForm" :model="branchForm">
          <el-form-item label="装卸方式：" id="zhuangStatus">
            <el-radio-group v-model="item.getMode" size="small">
              <el-radio-button label="0">托盘</el-radio-button>
              <el-radio-button label="1">散码</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="chedui" label="车队：" :prop="'divcontent.' + index + '.cargrp'":rules="[
                {  required: true, message: '车队不能为空', trigger: 'change' }]">
            <el-select v-model="item.cargrp" placeholder="请选择车队">
              <el-option v-for="item in cargrpList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="cheliang" label="车辆：" :prop="'divcontent.' + index + '.carnum'":rules="[
                {  required: true, message: '车辆不能为空', trigger: 'change' }]">
            <el-select v-model="item.carnum" placeholder="请选择车辆">
              <el-option v-for="item in carnumList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <div class="nestContent" v-for="(nest, index2) in item.nestForm.commodity" :key="index2">
            <el-form ref="nestForm" :model="item.nestForm">
              <el-form-item class="shangpin" label="送货商品：" :prop="'commodity.' + index2 + '.carnum'":rules="[
                {  required: true, message: '送货商品不能为空', trigger: 'change' }]">
                <el-select v-model="nest.sendgoods" placeholder="请选择商品名称">
                  <el-option v-for="item in sendgoodsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品数量：" style="margin-left: 20px; width: 222px;">
                <el-input class="disIpt" v-model="storenumber" disabled="disabled"></el-input>
              </el-form-item>
              <span style="cursor: pointer;color: #0079FE;">选择数量</span>
            </el-form>
            <span class="chahao" v-if="item.nestForm.commodity.length - 1 !== index2"><img src="../../assets/img/chahao.png" alt="" @click="delStore(nest)"></span>
            <span class="jiahao" v-if="item.nestForm.commodity.length - 1 === index2"><img src="../../assets/img/jiahao.png" alt="" @click="addStore()"></span>
          </div>
          <div class="weiNum">
            <span><a class="publicolor">总重量：</a>500000</span>
            <span><a class="publicolor">总数量：</a>500000</span>
          </div>
        </el-form>
        <el-button type="primary" v-if="branchForm.divcontent.length - 1 === index" class="addive" @click="addmodel">添加</el-button>
        <el-button type="danger" v-if="branchForm.divcontent.length - 1 !== index" class="deldiv" @click="delmodel(item)">删除</el-button>
      </div>
      <div class="btngrp">
        <el-button type="primary" @click="submmitNestForm()">提交</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                branchForm: {
                    divcontent: [{
                        getMode: '0', // 默认承运商
                        cargrp: '',
                        carnum: '',
                        weight: '',
                        numall: '',
                        nestForm: {
                            commodity: [{
                                sendgoods: ''
                            }]
                        }
                    }],
                },
                storenumber: '', // 商品数量
                cargrpList: [], // 车队列表
                carnumList: [], // 车辆列表
                sendgoodsList: [], // 送货商品列表
            }
        },
        mounted() {

        },
        methods: {
            // 添加订单
            addmodel: function () {
                this.branchForm.divcontent.push({
                    getMode: '0', // 默认承运商
                    cargrp: '',
                    carnum: '',
                    weight: '',
                    numall: '',
                    nestForm: {
                        commodity: [{
                            sendgoods: ''
                        }]
                    }
                })
            },
            // 删除订单
            delmodel: function (item) {
                let index = this.branchForm.divcontent.indexOf(item)
                if (index !== -1) {
                    this.branchForm.divcontent.splice(index, 1)
                }
            },
            // 增加商品信息
            addStore: function () {
                for (let i = 0; i < this.branchForm.divcontent.length; i++) {
                    this.branchForm.divcontent[i].nestForm.commodity.push({
                        sendgoods: ''
                    })
                }
            },
            // 删除商品信息
            delStore: function (nest) {
                for (let i = 0; i < this.branchForm.divcontent.length; i++) {
                    let index = this.branchForm.divcontent[i].nestForm.commodity.indexOf(nest)
                    if (index !== -1) {
                        this.branchForm.divcontent[i].nestForm.commodity.splice(index, 1)
                    }
                }

            },
            // 提交
            submmitNestForm: function () {
                console.log(this.branchForm)
            }
        }
    }
</script>

<style scoped lang="less">
  .titles {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #ccc;
  }
  .publicolor {
    color: rgb(148, 144, 144);
    font-weight: normal
  }
  .head {
    .tops {
      height: 36px;
      width: 960px;
      padding-top: 20px;
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
    }
  }
  .tableLi {
    .storDetail {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #ccc;
    }
    .subject {
      width: 80%;
      min-height: 320px;
      border: 1px solid #ccc;
      margin-top: 20px;
      padding-bottom: 50px;
      position: relative;
      .chedui {
        margin: 20px 0 0 50px;
      }
      .shangpin {
        margin: 10px 0 0 20px;
      }
      .cheliang {
        margin: 20px 0 0 20px;
      }
      .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        width: 274px;
        display: inline-block;
        /*float: left;*/
      }
      .el-input {
        width: 215px;
      }
      .addive, .deldiv {
        position: absolute;
        right: -80px;
        top: 50%;
        transform: translateY(-50%);
      }
      #zhuangStatus {
        display: block;
        margin: 10px 0 0 30px;
      }
    }
  }
  .nestContent {
    width: 626px;
    height: 100px;
    background: #f6f6f6;
    margin: 20px 0 0 28px;
    position: relative;
    .chahao, .jiahao {
      cursor: pointer;
      position: absolute;
      right: -44px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      width: 25px;
      height: 25px;
      float: right;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .weiNum {
    padding: 20px 0 0 50px;
    width: 626px;
    span {
      float: left;
    }
    span:last-child {
      float: right;
      margin-right: 216px;
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

<style lang="less">
  #zhuangStatus{
    .el-radio-button__inner {
      width: 110px!important;
    }
  }
  .disIpt {
    .el-input__inner {
      background-color: #fff!important;
    }
  }
</style>