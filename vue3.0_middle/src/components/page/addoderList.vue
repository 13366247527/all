<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 单据管理</el-breadcrumb-item>
        <el-breadcrumb-item>送货单</el-breadcrumb-item>
        <el-breadcrumb-item>新建送货单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <p>客户信息</p>
      <el-form :model="userForm" class="formStyle">
        <el-form-item label="送货单号：">
          <el-input v-model="userForm.sendartNum" maxlength="11" clearable placeholder="请输入送货单号"></el-input>
        </el-form-item>
        <el-form-item label="装运单号：">
          <el-input v-model="userForm.transportNum" maxlength="11" clearable placeholder="请输入装运单号"></el-input>
        </el-form-item>
        <el-form-item label="客户名称：">
          <!--          <el-select v-model="userForm.userName" placeholder="请选择客户名称">-->
          <!--            <el-option v-for="item in userNameList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
          <!--          </el-select>-->
          <el-autocomplete class="inline-input autocompletes" v-model="userForm.userName" :fetch-suggestions="querySearch" placeholder="请输入内容"  @select="seluserName"></el-autocomplete>
        </el-form-item>
        <el-form-item label="客户编号：">
          <el-input v-model="userForm.userNum" maxlength="11" clearable placeholder="请输入客户编号"></el-input>
        </el-form-item>
        <el-form-item label="送货地址：">
          <el-input v-model="userForm.goodsAddress" clearable placeholder="请选择送货地址"></el-input>
          <!--          <el-select v-model="userForm.goodsAddress" placeholder="请选择送货地址">-->
          <!--            <el-option v-for="item in goodsAddressList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
          <!--          </el-select>-->
        </el-form-item>
        <el-form-item label="送货日期：">
          <el-date-picker value-format="yyyy-MM-dd" v-model="userForm.sendTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

<!--        <el-form-item label="订单号：">-->
<!--          <el-input v-model="userForm.oderNum" clearable placeholder="请输入订单号"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="司机：">-->
<!--          <el-select v-model="userForm.driver" placeholder="请选择司机">-->
<!--            <el-option v-for="item in driverList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->

        <el-form-item label="承运商：">
<!--          <el-select v-model="userForm.supply" placeholder="请选择承运商">-->
<!--            <el-option v-for="item in supplyName" :key="item.supnum" :label="item.supnam" :value="item.supnum"></el-option>-->
<!--          </el-select>-->
          <el-autocomplete class="inline-input autocompletes" v-model="userForm.supply" :fetch-suggestions="querySearch3" placeholder="请选择承运商" @select="seldcrName"></el-autocomplete>
        </el-form-item>
<!--        <el-form-item label="关联装运单号：">-->
<!--          <el-input v-model="userForm.relationNum" clearable placeholder="请输入关联装运单号"></el-input>-->
<!--        </el-form-item>-->
       <!-- <el-form-item label="订单信息：">
          <el-input v-model="userForm.oderMsg" clearable placeholder="请输入订单信息"></el-input>
        </el-form-item>-->

        <el-form-item label="客户联系人：">
          <el-input v-model="userForm.userDcr" clearable placeholder="请输入客户联系人"></el-input>
        </el-form-item>
        <el-form-item label="客户联系电话：">
          <el-input v-model="userForm.userTel" clearable placeholder="请输入客户联系电话"></el-input>
        </el-form-item>
        <el-form-item label="司机姓名：">
          <el-input v-model="userForm.contacts" clearable placeholder="请输入司机姓名"></el-input>
        </el-form-item>
<!--        <el-form-item label="销售部门：">-->
<!--          <el-select v-model="userForm.sale" placeholder="请选择销售部门">-->
<!--            <el-option v-for="item in saleList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="司机联系电话：">
          <el-input v-model="userForm.userPhone" clearable placeholder="请输入司机联系电话"></el-input>
        </el-form-item>
        <el-form-item label="车牌号：">
          <el-input v-model="userForm.carNum" clearable placeholder="请输入车号"></el-input>
        </el-form-item>
        <el-form-item label="配送方式：">
          <el-select v-model="userForm.delivery" placeholder="请选择配送方式">
            <el-option v-for="item in deliveryList" :key="item.value" :label="item.lable" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业代信息：">
          <el-input v-model="userForm.tradeMsg" clearable placeholder="请输入业代信息"></el-input>
        </el-form-item>
<!--        <el-form-item label="付款条件：">-->
<!--          <el-select v-model="userForm.condition" placeholder="请选择付款条件">-->
<!--            <el-option v-for="item in conditionList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="运输方式：">
          <el-radio v-model="userForm.radioStatus" label="Y">托盘</el-radio>
          <el-radio v-model="userForm.radioStatus" label="N">散码</el-radio>
        </el-form-item>
      </el-form>
      <p class="storeMsg">商品信息</p>
      <div class="goodsMsg" ref="goodsStatus" v-for="(item, index) in addforms.storeNum" :key="item.key">
        <el-form ref="addforms" :model="addforms" class="nextForm" id="addForms">
          <el-form-item label="货品编号：">
<!--            <el-select v-model="item.artnum" placeholder="请选择货品编号">-->
<!--              <el-option v-for="item in artNumList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--            </el-select>-->
            <el-autocomplete class="inline-input" v-model="item.artnum" :fetch-suggestions="querySearch1" placeholder="请输入货品编号"  @select="selartNum($event, index)"></el-autocomplete>
          </el-form-item>
          <el-form-item label="货品名称：">
<!--            <el-select v-model="item.artnam" placeholder="请选择货品名称">-->
<!--              <el-option v-for="item in artNameList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--            </el-select>-->
            <el-autocomplete class="inline-input" v-model="item.artnam" :fetch-suggestions="aa" placeholder="请输入内容"  @select="selartName($event, index)"></el-autocomplete>
          </el-form-item>
          <el-form-item label="商品数量（箱）：" id="warseNums">
            <el-input-number v-model="item.artqty" controls-position="right" @change="handleChange" :min="1"></el-input-number>
          </el-form-item>
<!--          <el-form-item label="单位：">-->
<!--            <el-select v-model="item.company" placeholder="请选择单位">-->
<!--              <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="单价：">-->
<!--            <el-input v-model="item.unitPrice" clearable placeholder="请输入单价"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="金额：">-->
<!--            <el-input v-model="item.money" clearable placeholder="请输入金额"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="折合瓶数：" class="bollte">-->
<!--            <el-input v-model="item.bottleNum" :disabled="true"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="托盘类型：">-->
<!--            <el-select v-model="item.trayStatus" placeholder="请选择托盘类型">-->
<!--              <el-option v-for="item in trayStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="托盘数量：">-->
<!--            <el-input v-model="item.trayNum" clearable placeholder="请输入托盘数量"></el-input>-->
<!--          </el-form-item>-->
        </el-form>
        <span class="chahao" v-if="addforms.storeNum.length - 1 !== index"><img src="../../assets/img/chahao.png" alt="" @click="delStore(item)"></span>
        <span class="jiahao" v-if="addforms.storeNum.length - 1 === index"><img src="../../assets/img/jiahao.png" alt="" @click="addStore()"></span>
      </div>
      <div class="btngrp">
        <el-button type="primary" @click="submitMoveForm()">提交</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                userForm: {
                    userNum: '', // 客户编号
                    sendTime: '', // 送货日期
                    sendartNum: '', // 送货单号
                    oderNum: '', // 订单编号
                    userName: '', // 客户名称默认
                    driver: '', // 司机名称默认
                    transportNum: '', // 装运单号
                    goodsAddress: '', // 送货地址默认
                    tradeMsg: '', // 业代信息
                    oderMsg: '', // 订单信息
                    contacts: null, // 联系人
                    sale: '', // 销售部门默认
                    relationNum: '', // 关联单据号
                    userPhone: null, // 联系电话
                    condition: '', // 付款条件默认
                    supply: null, // 承运商
                    getSupplyNum: null, // 承运商编号
                    carNum: null, // 车号
                    userDcr: '', // 客户联系人
                    userTel: '', // 客户联系电话
                    delivery: '', // 配送方式
                    radioStatus: 'Y' // 装卸方式默认
                },
                userNameList: [], // 客户名称列表
                supplyName: [], // 承运商列表
                deliveryList: [
                    { value: '1', lable: '调拨' },
                    { value: '2', lable: '配送' },
                    { value: '3', lable: '直送' },
                    { value: '4', lable: '接力' }
                ], // 配送方式
                driverList: [], // 司机名称列表
                goodsAddressList: [], // 送货地址列表
                saleList: [], // 销售部门列表
                conditionList: [], // 付款条件列表
                addforms:{
                    storeNum: [{
                        artnum: null, // 货品编号
                        artnam: null, // 货品名称
                        // company: '', // 单位
                        // unitPrice: '', // 单价
                        // money: '', // 金额
                        artqty: '1', // 商品数量
                        // bottleNum: '', // 折合瓶数
                        // trayStatus: '', // 托盘类型
                        // trayNum: '' // 托盘数量
                    }],
                },
                artNumList: [], // 货品编号列表
                artNameList: [], // 货品名称列表
                companyList: [], // 单位列表
                trayStatusList: [], // 托盘类型列表
                trayShow: true // 木托数量塑托数量开关
            }
        },
        mounted() {
            this.getInitList() // 初始化
        },
        methods: {
            // 增加商品信息
            addStore: function () {
                this.addforms.storeNum.push({
                    artnum: null, // 货品编号
                    artnam: null, // 货品名称
                    // company: '', // 单位
                    // unitPrice: '', // 单价
                    // money: '', // 金额
                    artqty: '1', // 商品数量
                    // bottleNum: '', // 折合瓶数
                    // trayStatus: '', // 托盘类型
                    // trayNum: '', // 托盘数量
                    key: Date.now()
                })
            },
            // 删除商品信息
            delStore: function (item) {
                let index = this.addforms.storeNum.indexOf(item)
                if (index !== -1) {
                    this.addforms.storeNum.splice(index, 1)
                }
            },
            // 判断计数器是否符合格式
            handleChange: function (val) {
                if (val === null || val === undefined) {
                    for (let i = 0; i < this.addforms.storeNum.length; i++) {
                        this.addforms.storeNum[i].artqty = '1'
                    }
                }
            },
            querySearch(queryString, cb) {
                let restaurants = this.userNameList;
                let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            querySearch1(queryString, cb) {
                let restaurants = this.artNumList;
                let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            querySearch3(queryString, cb) {
                let restaurants = this.supplyName;
                let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            aa(queryString, cb) {
                let restaurants = this.artNameList;
                let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            // 选择承运商
            seldcrName(item) {
                this.userForm.getSupplyNum = item.vehgrnum
            },
            //
            seluserName(item) {
                this.userForm.userNum = item.outnum
                this.userForm.goodsAddress = item.outadr1
                this.userForm.userDcr = item.conprntit
                this.userForm.userTel = item.conprntel2
            },
            // 初始化
            getInitList: function() {
              this.$http.post('/api/deldocs/create/init').then(res => {
                  this.supplyName = res.data.data.vehgrps
                  this.userNameList = res.data.data.outlets
                  this.artNumList = res.data.data.articles
                  this.artNameList = res.data.data.articlesCpy
                  for (let i = 0; i < this.userNameList.length; i++) {
                      this.userNameList[i].value = this.userNameList[i].outnam
                  }
                  for (let i = 0; i < this.supplyName.length; i++) {
                      this.supplyName[i].value = this.supplyName[i].vehgrnam
                  }
                  for (let i = 0; i < this.artNumList.length; i++) {
                      this.artNumList[i].value = this.artNumList[i].artnum
                  }
                  for (let k = 0; k < this.artNameList.length; k++) {
                      this.artNameList[k].value = this.artNameList[k].artnam
                  }
              })
            },
            // 选择货品编号
            selartNum(val, key) {
                for (let k = 0; k < this.artNameList.length; k++) {
                    if (val.value === this.artNameList[k].artnum ) {
                          this.addforms.storeNum[key].artnam = this.artNameList[k].artnam
                    }
                }
            },
            // 选择货品名称
            selartName(val, key) {
                for (let k = 0; k < this.artNumList.length; k++) {
                    if (val.value === this.artNumList[k].artnam) {
                          this.addforms.storeNum[key].artnum = this.artNameList[k].artnum
                    }
                }
            },
            // 提交表单
            submitMoveForm: function () {
                // 送货单号
                if (this.userForm.sendartNum === '') {
                    this.userForm.sendartNum = null
                }
                // 客户编号
                if (this.userForm.userNum === '') {
                    this.userForm.userNum = null
                }
                // 客户名称
                if (this.userForm.userName === '') {
                    this.userForm.userName = null
                }
                // 送货地址
                if (this.userForm.goodsAddress === '') {
                    this.userForm.goodsAddress = null
                }
                // 司机姓名
                if (this.userForm.contacts === '') {
                    this.userForm.contacts = null
                }
                // 司机联系电话
                if (this.userForm.userPhone === '') {
                    this.userForm.userPhone = null
                }
                // 送货日期
                if (this.userForm.sendTime === '') {
                    this.userForm.sendTime = null
                }
                // 业代信息
                if (this.userForm.tradeMsg === '') {
                    this.userForm.tradeMsg = null
                }
                // 装运单号
                if (this.userForm.transportNum === '') {
                    this.userForm.transportNum = null
                }
                // 车牌号
                if (this.userForm.carNum === '') {
                    this.userForm.carNum = null
                }
                // 承运商
                if (this.userForm.getSupplyNum === '') {
                    this.userForm.getSupplyNum = null
                }
                // 客户联系人
                if (this.userForm.userDcr === '') {
                    this.userForm.userDcr = null
                }
                // 客户联系电话
                if (this.userForm.userTel === '') {
                    this.userForm.userTel = null
                }
                // 配送方式
                if (this.userForm.delivery === '') {
                    this.userForm.delivery = null
                }
                // 商品信息
                for (let i = 0; i < this.addforms.storeNum.length; i++) {
                    // 物品名称
                    if (this.addforms.storeNum[i].artnam === '') {
                        this.addforms.storeNum[i].artnam = null
                    }
                    // 物品编号
                    if (this.addforms.storeNum[i].artnum === '') {
                        this.addforms.storeNum[i].artnum = null
                    }
                }
                const data = {
                    deldocnum: this.userForm.sendartNum, // 送货单号
                    outnum: this.userForm.userNum, // 客户编号
                    outnam: this.userForm.userName, // 客户名称
                    outadr: this.userForm.goodsAddress, // 送货地址
                    driverName: this.userForm.contacts, // 联系人
                    driverPhone: this.userForm.userPhone, // 联系电话
                    plndeldat: this.userForm.sendTime, // 送货日期
                    servproxy: this.userForm.tradeMsg, // 业代信息
                    exgpalflg: this.userForm.radioStatus, // 装卸方式
                    tradocnum: this.userForm.transportNum, // 装运单号
                    vehicleNum: this.userForm.carNum, // 车号
                    vehgrpnum: this.userForm.getSupplyNum, // 承运商
                    contactPerson: this.userForm.userDcr, // 客户联系人
                    telnum: this.userForm.userTel, // 客户联系电话
                    trpkind: this.userForm.delivery, // 配送方式
                    deldoc2s: this.addforms.storeNum // 商品信息
                }
                this.$http.post('/api/deldocs/create', data).then(res => {
                    if (res.data.ret_code === '0') {
                        this.$message.success('新建成功')
                        this.$router.go(-1)
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
  .formStyle {
    margin-top: 20px;
    margin-left: -40px;
    .el-form-item {
      display: inline-block;
      float: left;
      margin-left: 40px;
    }
    .el-input {
      width: 200px;
    }
  }
  .storeMsg {
    clear: both;
    padding-top: 50px;
  }
  .goodsMsg {
    position: relative;
    width: 910px;
    height: 126px;
    background: #f6f6f6;
    border-radius: 4px;
    .nextForm {
      width: 100%;
      height: 100%;
      margin-top: 30px;
      padding: 18px 0 0 18px;
      margin-left: -100px;
      .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        width: 200px;
        display: inline-block;
        float: left;
        margin-left: 100px;
      }
      .el-input {
        width: 200px;
      }
    }
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
  .btngrp {
    margin-top: 30px;
    .el-button {
      width: 100px;
      height: 38px;
    }
  }
</style>

<style lang="less">
.formStyle {
  .el-select {
    width: 200px;
  }
}
#warseNums {
  .el-input-number--small {
    width: 200px;
  }
}
.bollte {
  .el-input.is-disabled .el-input__inner {
    background: #fff;
  }
}
</style>
<style>
  .el-autocomplete-suggestion {
    width: 380px!important;
  }
</style>