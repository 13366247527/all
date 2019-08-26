<template>
    <div>
        <header-default :title="title"></header-default>
        <div class="common-page-flex">
            <div class="common-line-one-panel">
                <p>
                    <span>赔偿原因：</span>
                    <select-box class="wid198" ref="reason" :selectDataList='dataList'></select-box>
                </p>
            </div>
            <ul class="common-content-box">
                <li class="common-content-title bgGray">
                    <div @click="allSelected">
                        <template v-if="isCheckedAll">
                            <img src="@/assets/images/common/checked.png" alt="">
                        </template>
                        <template v-else>
                            <img src="@/assets/images/common/check.png" alt="">
                        </template>
                    </div>
                    <div>品名规格</div>
                    <div>瓶数</div>
                    <div>纸箱</div>
                </li>
                <li v-for="(item, index) in tempData" :key="index">
                    <div @click="changeOrderSelectStatus(index)">
                        <template v-if="orderListsStatus.indexOf(index)>=0">
                            <img src="@/assets/images/common/checked.png" alt="">
                        </template>
                        <template v-else>
                            <img src="@/assets/images/common/check.png" alt="">
                        </template>
                    </div>
                    <div>{{item.artName}}</div>
                    <div><input type="text" class="black"></div>
                    <div><input type="text" class="black"></div>
                </li>
            </ul>
            <div class="photoArea">
                <take-photo ref="takephoto" :title="title" class="take-photo"></take-photo>
            </div>
        </div>
        <div class="common-bottom-button bottom-button-fixed">
            <span @click="filter" class="orangeBtn">筛选</span>
            <span @click="commitBtn">提交</span>
        </div>
    </div>
</template>

<script>

import HeaderDefault from '@/components/common/HeaderDefault'
import SelectBox from '@/components/common/SelectBox'
import TakePhoto from '@/components/common/TakePhoto'

export default {
    data() {
        return {
            title: '破损处理',
            cpycod: '',
            tranum: '',
            tranumsuf: '',
            damageDetails: [],
            orderListsStatus: [],
            isCheckedAll: false,
            damagePay: '', //赔偿金
            reason: '', //原因（默认“无”）
            reasonList: [],
            filterStatus: false, //筛选状态
            filterDamageDetails: [], //筛选后的数据
            tempData: [], //暂存的数据
            tempStatus: [],
            bottleNum: '', //破损瓶数
            boxNum: '', //破损箱数
            bottlePrice: 0, //破损瓶数总价
            boxPrice: 0, //破损箱数总价
            totalPrice: 0, //破损瓶数总价 + 破损箱数总价
            tempBottleVal: [], //暂存的数据
            tempBottleInpVal: [],
            tempBoxVal: [],
            tempBoxInpVal: [],
            dataList: [
                {
                    flex: 1,
                    values: [],
                    textAlign: 'center'
                }
            ],
        }
    },
    components: { HeaderDefault, SelectBox, TakePhoto },
    mounted() {
        this.getData();
    },
    methods: {
        getData(){
            this.$loading.open();
            let params = {
                "cpycod": this.$route.query.cpycod,
                "tranum": this.$route.query.tranum,
                "tranumsuf": this.$route.query.tranumsuf,
            }
            this.$http.post( '/getAgencyDamageInfo', params).then(res => {
                this.$loading.close();
                let result = res.data;
                if (result.ret_code == 0) {
                    this.damageDetails = result.data.damageDetails;
                    this.tempData = result.data.damageDetails;
                    this.damagePay = result.data.damagePay;
                    this.dataList[0].values = result.data.reasonList;
                }
            })
        },
        changeOrderSelectStatus: function (index) {
            let idIndex = this.orderListsStatus.indexOf(index)
            if (idIndex >= 0) {
                this.orderListsStatus.splice(idIndex, 1)
                this.isCheckedAll = false
            } else {
                this.orderListsStatus.push(index);
            }
        },
        allSelected: function () {
            this.isCheckedAll = !this.isCheckedAll;
            this.orderListsStatus = []
            if (this.isCheckedAll) {
                this.tempData.forEach((item, index) => {
                    this.orderListsStatus.push(index)
                })
            }
        },
        filter: function () {
            //非要做筛选按钮，也没啥卵用，就是boss嫌数据多，做就做呗，可能我都不知道怎么实现的  ╮（﹀_﹀）╭
            if (this.orderListsStatus.length > 0) {
                //首先改变筛选状态
                this.filterStatus = !this.filterStatus;
                //如果点击筛选按钮，filterStatus为true
                if (this.filterStatus) {
                    //先清空上次筛选的数据
                    this.filterDamageDetails = [];
                    //暂存选中状态
                    this.tempStatus = this.orderListsStatus;
                    //对选中的数据进行排序，这样晒选后数据的顺序才不会混乱
                    let sortStatus = this.orderListsStatus.sort(this.sortArr);
                    //清空选中状态
                    this.orderListsStatus = [];
                    //筛选出数据，让所有的数据都为选中状态
                    for (let i = 0; i < this.tempStatus.length; i++) {
                        this.filterDamageDetails.push(this.damageDetails[sortStatus[i]])
                        this.orderListsStatus.push(i)
                    }
                    //让筛选出的数据赋值页面展示的数据
                    this.tempData = this.filterDamageDetails;
                    //全选按钮为true
                    this.isCheckedAll = true;
                } else {
                    //点击重置按钮，恢复全部数据
                    this.tempData = this.damageDetails
                    //全选按钮为false
                    this.isCheckedAll = false;
                    //恢复选中状态
                    this.orderListsStatus = this.tempStatus
                }
            } else {
                //如果点击筛选后不选择任何一条数据，恢复全部数据
                this.tempData = this.damageDetails
                if (this.filterStatus) {
                    this.filterStatus = false
                }
            }
        },
        sortArr: function (a, b) {
            return a - b
        },
        commitBtn: function () {
            let reason = this.$refs.reason.currentTags
            if (reason) {
                let artDetails = [];
                //取最长的数据循环
                let data = '';
                this.tempBottleInpVal.length > this.tempBoxInpVal.length ? data = this.tempBottleInpVal : data = this.tempBoxInpVal
                for (let i = 0; i < data.length; i++) {
                    artDetails.push({
                        "artnum": this.damageDetails[i].artName,
                        "bottleNumber": this.tempBottleInpVal[i] ? this.tempBottleInpVal[i] : 0,
                        "boxNumber": this.tempBoxInpVal[i] ? this.tempBoxInpVal[i] : 0,
                    })
                }
                let params = {
                    "cpycod": this.cpycod,
                    "tranum": this.tranum,
                    "tranumsuf": this.tranumsuf,
                    "artDetails": artDetails,
                    "damreason": reason,
                    "totalMoney": this.totalPrice,
                    "imgUploadInput": this.$refs.takePhoto.imgPath,
                    "videoUploadInput": '',
                }
                this.$http.post('/setDelDamageInfo', params).then(result => {
                    let res = result.data;
                    if (res.ret_code == 0) {
                        this.$toast('提交成功')
                        let t = setTimeout(() => {
                            clearTimeout(t)
                            this.$router.push({
                                path: '/dealerReceipt/receiveComplete',
                                query: {
                                    cpycod: this.cpycod,
                                    tranum: this.tranum,
                                    tranumsuf: this.tranumsuf
                                }
                            })
                        }, 1000);
                    } else {
                        this.$toast(res.returnInfo)
                    }
                })
            } else {
                this.$toast('请选择原因')
            }
        }
    }
};
</script>

<style lang="scss" scoped>

.common-content-box li div{
    width: 30%;
}
.common-content-box li div:first-of-type{
    width: 10%;
}

.black{
    width: .62rem
}

.weight{
  @include redPanel(.62rem)
}

.sure{
    color: #ffffff;
}

.wid198{
    width: 1.98rem;
}

.photoArea{
    padding: 0 .16rem;
    margin-top: .06rem;
    .take-photo{
        width: 1.63rem;
        height: 1.56rem;
    }
}

</style>
