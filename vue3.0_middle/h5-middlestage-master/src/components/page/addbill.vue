<template>
    <div>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 单据管理</el-breadcrumb-item>
          <el-breadcrumb-item>采购单</el-breadcrumb-item>
          <el-breadcrumb-item>新增采购单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
          <!-- 采购单添加入场车辆类型 2019/8/1 lvxile -->
         <p class="tops" style="margin-bottom: 20px;">车辆信息</p>
         <el-form :model="vform" class="formseo1" id="vform"  >
             <el-form-item label="车辆是否已入场" class="type" required>
                 <el-radio v-model="vform.carState" label="0">否</el-radio>
                 <el-radio v-model="vform.carState" label="1">是</el-radio>
             </el-form-item>
             <el-form-item  label="司机姓名：" required  v-if="vform.carState == '1'">
                 <el-input placeholder="最多10个字符" v-model="vform.carPerson" maxlength="20"></el-input>
             </el-form-item>
             <el-form-item label="司机电话："  required v-if="vform.carState == '1'">
                 <el-input placeholder="最多11个字符" v-model="vform.carPersonPhone" maxlength="11"></el-input>
             </el-form-item>
             <el-form-item label="车牌："  required  v-if="vform.carState == '1'">
                 <el-input placeholder="最多10个字符" v-model="vform.carNumber" maxlength="10"></el-input>
             </el-form-item>
         </el-form>
         <!-- 采购单添加入场车辆类型end -->
        <p class="tops">供应商信息</p>
        <el-form :model="form" ref="form"  :rules="rules" class="formseo" id="formGroup">
          <el-form-item label="采购供应商：" prop="supplyName" id="caiError">
            <el-select v-model="form.supplyName" placeholder="请选择供应商" @change="selGoods">
              <el-option v-for="item in supply" :key="item.supnum" :label="item.supnam" :value="item.supnum"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="送货日期：" prop="seldate">
            <el-date-picker value-format="yyyy-MM-dd" v-model="form.seldate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="付款条件：" prop="payment">
            <el-select v-model="form.payment" placeholder="请选择付款条件">
              <el-option v-for="item in paymentList" :key="item.selval" :label="item.valdescm" :value="item.selval"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="装卸方式：" id="zhuangStatus">
            <el-radio-group v-model="form.getMode" size="small" @change="trayTab($event, 'addforms')">
              <el-radio-button label="0">托盘</el-radio-button>
              <el-radio-button label="1">散码</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="收货仓库：" prop="collectAdress">
            <el-select v-model="form.collectAdress" placeholder="请选择收货仓库">
              <el-option v-for="item in collectData" :key="item.whsnum" :label="item.whsadr" :value="item.whsnum"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人：" prop="phoneName" id="lianName">
            <el-select v-model="form.phoneName" placeholder="请选择联系人" >
              <el-option v-for="item in phoneData" :key="item.personNum" :label="item.personNam" :value="item.personNum"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <p class="storeMsg">商品信息</p>
        <div class="goodsMsg" ref="goodsStatus" v-for="(item, index) in addforms.storeNum" :key="item.key">
          <el-form ref="addforms" :model="addforms" class="nextForm" id="addForms">
              <div>
            <el-form-item label="送货商品：" :prop="'storeNum.' + index + '.artNum'" :rules="[
                {  required: true, message: '请选择送货商品', trigger: 'change' }]" >


              <!-- <el-select v-model="item.artNum" placeholder="请选择送货商品" @change="sendStore" >
                <el-option v-for="item in deliveryList" :key="item.artnum" :label="item.artnam" :value="item.artnum"></el-option>
              </el-select> -->

            <el-select v-model="item.artNum" placeholder="请选择送货商品" 
                filterable
                :remote-method="remoteMethod"
                @focus="getlist"
                @change="sendStore"
                remote
                reserve-keyword>
                <el-option v-for="item in deliveryList" :key="item.artnum" :label="item.artnam" :value="item.artnum"></el-option>
            </el-select>

<!--              <el-autocomplete style="width: 215px;" class="inline-input" v-model="item.artNum" :fetch-suggestions="querySearch" placeholder="请输入商品名称" @select="handleSelect"></el-autocomplete>-->
            </el-form-item>
<!--            <el-form-item label="商品规格：" :prop="'storeNum.' + index + '.specs'">-->
<!--&lt;!&ndash;                          :rules="[{  required: true, message: '商品规格不能为空', trigger: 'change' }]"&ndash;&gt;-->

<!--              <el-select v-model="item.specs" placeholder="请选择商品规格">-->
<!--                <el-option v-for="item in specsList" :key="item.selval" :label="item.valdescm" :value="item.selval"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
                <!-- <div v-if="trayShow">
                <el-form-item label="托盘组：" :prop="'storeNum.' + index + '.paltyp'" :rules="[
                    {  required: true, message: '请选择托盘组', trigger: 'change' }]">
                    <el-select v-model="item.paltyp" placeholder="请选择托盘组" @change="trayGrp">
                    <el-option v-for="item in traygrpList" :key="item.palttype" :label="item.artgrpnam" :value="item.palttype"></el-option>
                    </el-select> -->
                    <!--              <el-autocomplete style="width: 215px;" class="inline-input" v-model="item.artNum" :fetch-suggestions="querySearch" placeholder="请输入商品名称" @select="handleSelect"></el-autocomplete>-->
                <!-- </el-form-item>
                <el-form-item label="托盘数量：" :prop="'storeNum.' + index + '.palletCount'"
                                :rules="[
                    {  required: true, message: '请输入托盘数量', trigger: 'blur' },
                    { type: 'number', message: '托盘数量必须为数字'}
                ]">
                    <el-input @input="trayNym" v-model.number="item.palletCount" clearable placeholder="请输入托盘数量"></el-input>
                </el-form-item>
                </div> -->
                <el-form-item label="商品数量：" id="storeNums" required >
                    <el-input v-model="item.sumCount" :disabled="numAbled"></el-input>
                </el-form-item>
              </div>
               <div v-if="trayShow" >
                            <el-form-item label="托盘类型：" :prop="'storeNum.' + index + '.paltyp' " :rules="[
                            {  required: true, message: '托盘类型不能为空', trigger: 'change' },
                        ]">
                            <el-select v-model="item.paltyp" placeholder="请选择托盘类型" >
                                <el-option v-for="item in Pallettype" :key="item.selval" :label="item.valdescm" :value="item.selval"></el-option>
                            </el-select>
                        </el-form-item>

                            <el-form-item label="托盘数量：" :prop="'storeNum.' + index + '.palletCount'"
                                :rules="[
                    {  required: true, message: '请输入托盘数量', trigger: 'blur' },
                    { type: 'number', message: '托盘数量必须为数字'}
                ]">
                    <el-input @input="trayNym" v-model.number="item.palletCount" clearable placeholder="请输入托盘数量"></el-input>
                </el-form-item>

                        <el-form-item label="商品单价：" :prop="'storeNum.' + index + '.artPrice' " :rules="[
                            {  required: true, message: '请输入商品单价', trigger: 'blur' },
                            { type: 'number', message: '商品单价必须为数字'}
                        ]">
                            <el-input v-model.number="item.artPrice" clearable placeholder="请输入商品单价"></el-input>
                        </el-form-item>
                </div>
            
          </el-form>
          <span class="chahao" v-if="addforms.storeNum.length - 1 !== index"><img src="../../assets/img/chahao.png" alt="" @click="delStore(item)"></span>
          <span class="jiahao" v-if="addforms.storeNum.length - 1 === index"><img src="../../assets/img/jiahao.png" alt="" @click="addStore()"></span>
        </div>
        <div class="btngrp">
          <el-button type="primary" @click="submitMoveForm('form', 'addforms')">提交</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            // let checkPhone = (rule, value, callback) => {
            //     if (!value) {
            //         return callback(new Error('手机号不能为空'));
            //     } else {
            //         const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            //         console.log(reg.test(value));
            //         if (reg.test(value)) {
            //             callback();
            //         } else {
            //             return callback(new Error('请输入正确的手机号'));
            //         }
            //     }
            // };
            return {
                vform:{//车辆信息
                    carState:'0',//是否进场
                    carPerson:'',//司机姓名
                    carPersonPhone:'',//电话
                    carNumber:'',//车牌
                },
                form: {
                    supplyName: '', // 供应商默认
                    seldate: '', // 送货日期
                    payment: '', // 付款条件默认
                    collectAdress: '', // 收货地址默认
                    phoneName: '', // 默认联系人
                    getMode: '0' // 默认装卸方式
                },
                addforms:{
                    storeNum: [{
                        artNum: '', // 默认送货商品
                        // specs: '', // 默认商品规格
                        palletCount: '', // 托盘数量
                        artPrice: '', // 商品单价
                        sumCount: '0', // 数量
                        // paltyp: '' // 托盘组
                        paltyp:'',//托盘类型
                    }],
                },
                Pallettype:[],//托盘类型
                phoneData: [], // 联系人
                supply: [], // 供应商数据
                subnum:'',//供应商编号
                paymentList: [], // 付款条件数据
                collectData: [], // 收货地址数据
                // phoneData: '', // 联系人数据
                rules: {
                    supplyName: [{ required: true, message: '请选择供应商', trigger: 'change' }],
                    seldate: [{ required: true, message: '请选择送货日期', trigger: 'change' }],
                    payment: [{ required: true, message: '请选择付款条件', trigger: 'change' }],
                    collectAdress: [{ required: true, message: '请选择收货地址', trigger: 'change' }],
                    phoneName: [{ required: true, message: '请选择联系人', trigger: 'change' }],
                    // phoneName: [{validator: checkPhone, trigger: 'blur'}]
                },
                deliveryList: [], // 商品列表
                // specsList: [], // 商品规格列表
                trayShow: true, // 木托数量塑托数量开关
                traygrpList: [], // 托盘组数据
                trayNum: '', // 托盘组箱数
                bottleNum: '', // 每箱瓶数
                weightNum: '', // 每箱重量
                numAbled: true // 商品数量是否可编辑
            }
        },
        mounted() {
            // this.restaurants = this.loadAll()
            this.selectBar() // 下拉列表
            this.merchantList() // 承运商下拉列表
            this.persionList() // 联系人下拉列表
            this.storeList() // 收货仓库列表
            this.paltype() // 托盘类型
        },
        methods: {
            //托盘类型
            paltype(){
                 this.$http.post('/api/outlet/initDict').then(res => {
                    if (res.data.ret_code === '0') {
                        this.Pallettype = res.data.data.paltyp
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            //远程搜索送货商品
            remoteMethod(query){
                console.log(query)
                if(query !== ''){
                    const data = {
                             supNum: this.subnum,
                             artNam: query
                    }
                    this.$http.get('/api/purchaseOrder/queryArticle', { params: data }).then(res => {
                        if (res.data.ret_code === '0') {
                            this.deliveryList = res.data.data
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                }else{
                    this.deliveryList = []
                }
            },
            //获取焦点时获取数据
            getlist(){
                console.log("1111")
                this.wares(this.subnum) 
            },
            // 增加商品信息
            addStore: function () {
                this.addforms.storeNum.push({
                        artNum: '', // 默认送货商品
                        // specs: '', // 默认商品规格
                        palletCount: '', // 托盘数量
                        artPrice: '', // 商品单价
                        sumCount: '0', // 数量
                        // paltyp: '' // 托盘组
                        paltyp:'',//托盘类型
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
            // 提交表单
            submitMoveForm: function (form, addforms) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        for (let i = 0; i < this.$refs[addforms].length; i ++) {
                            this.$refs[addforms][i].validate((valid) => {
                                if (valid) {
                                    this.addsheet()
                                } else {
                                    console.log('error submit!!');
                                    return false;
                                }
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            // querySearch(queryString, cb) {
            //     let restaurants = this.restaurants;
            //     let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            //     // 调用 callback 返回建议列表的数据
            //     cb(results);
            // },
            // createFilter(queryString) {
            //     return (restaurant) => {
            //         return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            //     };
            // },
            // loadAll() {
            //     return [
            //         { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
            //        ]
            // },
            // handleSelect(item) {
            //     console.log(item);
            // },
            // 托盘散码切换
            trayTab: function (val, restForm) {
                for (let i = 0; i < this.$refs[restForm].length; i ++) {
                    this.$refs[restForm][i].resetFields();
                }
                for (let i = 0; i < this.addforms.storeNum.length; i++) {
                    this.addforms.storeNum[i].palletCount = ''
                    this.addforms.storeNum[i].artPrice = ''
                    this.addforms.storeNum[i].artNum = ''
                    // this.addforms.storeNum[i].specs = ''
                    this.addforms.storeNum[i].sumCount = '0'
                }
                if (val === '1') {
                    this.trayShow = false
                    this.numAbled = false
                } else {
                    this.trayShow = true
                    this.numAbled = true
                }
            },
            // 订单状态 && 付款条件下拉列表
            selectBar: function(val) {
                this.$http.post('/api/outlet/initDict').then(res => {
                    if (res.data.ret_code === '0') {
                        this.paymentList = res.data.data.payTerm
                        // if (val) {
                        //     this.specsList = res.data.data.articleSpec
                        // }
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            // 承运商下拉列表
            merchantList: function() {
                this.$http.get('/api/purchaseOrder/supplier').then(res => {
                    if (res.data.ret_code === '0') {
                        this.supply = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            // 选择供应商
            selGoods: function(val) {
                this.subnum = val
                 // this.wares(val)
            },
            // 联系人列表
            persionList: function () {
                this.$http.get('/api/purchaseOrder/queryPersons').then(res => {
                    if (res.data.ret_code === '0') {
                        this.phoneData = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            // 仓库列表
            storeList: function () {
                this.$http.get('/api/whtransportroute/wareHouse').then(res => {
                    if (res.data.ret_code === '0') {
                        this.collectData = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            // 送货商品
            wares: function(val) {
                const data = {
                    supNum: val
                }
                this.$http.get('/api/purchaseOrder/queryArticle', { params: data }).then(res => {
                    if (res.data.ret_code === '0') {
                        this.deliveryList = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            // 选择送货商品
            sendStore: function(val) {
                this.selectBar('val')
                this.trayList(val)
                const currentIndex = this.deliveryList.findIndex((value) => value.artnum === val)
                this.bottleNum = this.deliveryList[currentIndex].numsuu
                this.weightNum = this.deliveryList[currentIndex].artwgt
                console.log( this.bottleNum )
                console.log( this.weightNum )
            },
            // 托盘组数据
            trayList: function(val) {
                const data = {
                    articleNum: val
                }
              this.$http.get('/api/purchaseOrder/articlePallet', { params: data } ).then(res => {
                  if (res.data.ret_code === '0') {
                        this.traygrpList.push(res.data.data.uniofpal)
                        let arr = this.addforms.storeNum
                        for (let j = 0; j < this.traygrpList.length; j++) {
                                if (arr[j].palletCount !== '') {
                                    arr[j].sumCount = this.traygrpList[j] * arr[j].palletCount
                                    arr[j].productCount = this.bottleNum * arr[j].sumCount
                                    arr[j]. sumWeight = Number(this.weightNum * arr[j].sumCount) / 1000
                                }
                        }
                        this.addforms.storeNum = arr
                  } else {
                      this.$message({
                          type: 'error',
                          message: res.data.msg
                      })
                  }
              })
            },
            // 选择托盘组
            trayGrp: function(val) {              
                //多个托盘组时
                // const currentIndex = this.traygrpList.findIndex((value) => value.palttype === val)
                // console.log(this.traygrpList)
                // this.trayNum = this.traygrpList[currentIndex].uniofpal
                // let arr = this.addforms.storeNum
                // for(let i = 0; i < arr.length; i++) {
                //     if (arr[i].palletCount !== '') {
                //         arr[i].sumCount = this.trayNum * arr[i].palletCount
                //         arr[i].productCount = this.bottleNum * arr[i].sumCount
                //         arr[i]. sumWeight = Number(this.weightNum * arr[i].sumCount) / 1000
                //     }
                // }
            },
            // 托盘数量监听
            trayNym: function() {
                 //单个托盘组时
                let arr = this.addforms.storeNum
                for (let j = 0; j < this.traygrpList.length; j++) {
                        if (arr[j].palletCount !== '') {
                            arr[j].sumCount = this.traygrpList[j] * arr[j].palletCount
                            arr[j].productCount = this.bottleNum * arr[j].sumCount
                            arr[j]. sumWeight = Number(this.weightNum * arr[j].sumCount) / 1000
                        }
  
                }
                this.addforms.storeNum = arr
                // let arr = this.addforms.storeNum
                // for(let i = 0; i < arr.length; i++) {
                //     if (this.form.getMode === '0') {
                //         arr[i].sumCount = this.trayNum * arr[i].palletCount
                //     }
                //     arr[i].productCount = this.bottleNum * arr[i].sumCount
                //     arr[i].sumWeight = Number(this.weightNum * arr[i].sumCount) / 1000
                // }
            },
            // 保存
            addsheet: function () {
                let arr = this.addforms.storeNum
                for(let i = 0; i < arr.length; i++) {
                     delete arr[i].key
                    arr[i].sumCost = arr[i].sumCount * arr[i].artPrice
                    if (this.form.getMode === '1') {
                        arr[i].productCount = this.bottleNum * arr[i].sumCount
                        arr[i].sumWeight = Number(this.weightNum * arr[i].sumCount) / 1000
                        arr[i].palletCount = 0
                        arr[i].paltyp = ''
                    }
                }
                if(this.vform.carState == '1'){//车辆以入场
                     var data = {
                            carState:this.vform.carPerson,
                            carPerson:this.vform.carPerson,
                            carPersonPhone:this.vform.carPerson,
                            carNumber:this.vform.carPerson,
                            linkPerson: this.form.phoneName,
                            loadType: this.form.getMode,
                            payCondition: this.form.payment,
                            planArrivalDate: this.form.seldate,
                            supplierNum: this.form.supplyName,
                            whsnum: this.form.collectAdress,
                            details: arr
                    }
                }else{//车辆未入场
                    var data = {
                            carState:this.vform.carPerson,
                            linkPerson: this.form.phoneName,
                            loadType: this.form.getMode,
                            payCondition: this.form.payment,
                            planArrivalDate: this.form.seldate,
                            supplierNum: this.form.supplyName,
                            whsnum: this.form.collectAdress,
                            details: arr
                    }
                }
                
                this.$http.post('/api/purchaseOrder/save', data).then(res => {
                    if(res.data.ret_code === '0') {
                        this.$message({
                            type: 'success',
                            message: res.data.data
                        })
                        this.$router.push('/sendForm')
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.data
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
  .formseo1{
        display: inline-block;
        width: 1050px;
        .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        width: 350px;
        display: inline-block;
        float: left;
        }
        .el-form-item:first-child{
            width: 100%;
        }
        .el-input {
          width: 215px;
        }
   }
  .formseo {
    width: 1050px;
    height: 50px;
    margin-top: 30px;
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
      width: 350px;
      display: inline-block;
      float: left;
    }
    .el-input {
      width: 215px;
    }
    .el-form-item:nth-child(4),.el-form-item:nth-child(5),.el-form-item:nth-child(6) {
      margin-top: 20px;
    }
  }
  .storeMsg {
    clear: both;
    margin-top: 100px;
  }
.goodsMsg {
    position: relative;
    width: 1050px;
    height: 126px;
    background: #f6f6f6;
    border-radius: 4px;
    .nextForm {
      width: 100%;
      height: 100%;
      margin-top: 30px;
      padding: 18px 0 0 18px;
      div{
        display: flex;
        .el-form-item{
         width: 350px;
        }
        .el-input {
            width: 215px;
        }
      }
    }
//   .goodsMsg {
//     position: relative;
//     width: 1050px;
//     height: 126px;
//     background: #f6f6f6;
//     border-radius: 4px;
//     .nextForm {
//       width: 100%;
//       height: 100%;
//       margin-top: 30px;
//       padding: 18px 0 0 18px;
//       .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
//          width: 350px;
//          display: inline-block;
//          float: left;
//        }
//       .el-form-item:nth-of-type(3){
          
//       }
//       .el-input {
//         width: 215px;
//       }
//     }
    .chahao, .jiahao {
      cursor: pointer;
      position: absolute;
      right: -44px;
      top: 54px;
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
  #formGroup {
    .el-radio-button__inner {
      width: 110px!important;
    }
    .el-form-item__error {
      left: 92px;
    }
    #caiError {
      .el-form-item__error {
        left: 106px;
      }
    }
    #lianName {
      .el-form-item__label {
        margin-left: 15px;
      }
    }
  }
  #zhuangStatus {
    .el-form-item__label {
      margin-left: 18px;
    }
  }
  #addForms {
    .el-form-item--small .el-form-item__error {
      margin-left: 92px;
    }
  }
  #storeNums {
    .el-input.is-disabled .el-input__inner {
      background: #fff;
      color: #333;
      margin-left: -4px;
    }
  }
</style>