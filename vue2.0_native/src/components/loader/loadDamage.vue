<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <ul class="common-content-box">
            <li class="common-content-title">
                <div @click="allSelected">
                    <template v-if="isCheckedAll">
                        <img src="@/assets/images/common/checked.png" alt="">
                    </template>
                    <template v-else>
                        <img src="@/assets/images/common/check.png" alt="">
                    </template>
                </div>
                <div>品名</div>
                <div>瓶数</div>
                <div>包装</div>
                <div>拍照</div>
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
                <div>111</div>
                <div>
                    <input type="text" class="red">
                </div>
                <div>
                    <input type="text" class="red">
                </div>
                <div>
                    <span class="take-photo"></span>
                </div>
            </li>
        </ul>
        <div class="common-bottom-button bottom-button-fixed">
            <span class="orangeBtn">筛选</span>
            <span>提交</span>
        </div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"

export default {
    components: {HeaderDefault},
    data() {
        return {
            title: '装卸破损',
            cpycod: '',
            tranum: '',
            tranumsuf: '',
            orderListsStatus: [],
            isCheckedAll: false,
            tempData: [1,2,3,4,5,1,2,3,4,5]
        }
    },
    // created () {
    //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
    // },
    mounted() {
        this.getData();
    },
    methods: {
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
        toRest(){
            this.$router.push({
                path: '/loader/rest'
            })
        },
        getData(){
            this.$loading.open();
            let params = {
                "cpycod": this.$route.query.cpycod,
                "tranum": this.$route.query.tranum,
                "tranumsuf": this.$route.query.tranumsuf,
            }
            this.$http.post( '/getAgencyDamageInfo', params).then(res => {
                this.$loading.close();
                console.log(res)
                let result = res.data;
                if (result.ret_code == 0) {
                    this.damageDetails = res.data.damageDetails;
                    this.tempData = res.data.damageDetails;
                    this.damagePay = res.data.damagePay;
                    this.reason = res.data.reason;
                    this.reasonList = res.data.reasonList;
                }
            })
        }
    }
};
</script>

<style lang="scss" scoped>

.common-content-box{
    padding-bottom: .5rem;
    div{
        width: 22%;
        input{
            width: .52rem;
        }
        .take-photo{
            display: inline-block;
            width: .52rem;
            height: .32rem;
            background: rgba(249,249,249,1) url(../../assets/images/common/takePhoto.png) no-repeat center;
            background-size: .24rem .2rem;
            border:1px solid rgba(192, 192, 192, 1);
            border-radius: .05rem;
        }
    }
    div:first-of-type{
        width: 12%;
    }
}

</style>
