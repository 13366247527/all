<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="common-line-one-panel">
            <p v-for="(item, index) in dataList" :key="index">
                <span>{{index + 1}}、</span>
                <span class="name">{{item.content}}</span>
            </p>
        </div>
        <div class="common-line-one-panel pdBot50">
            <p @click="read">
                <img v-if="!readFlag" src="@/assets/images/common/check.png" class="check-img">
                <img v-else src="@/assets/images/common/checked.png" class="check-img">
                <span class="red">我已认真阅读，并严格执行。请勾选同意。</span>
            </p>
        </div>
        <div class="common-bottom-button bottom-button-fixed">
            <span class="orangeBtn" @click="sign">签名</span>
            <span @click="toQueue">排队状态</span>
        </div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"

export default {
    components: { HeaderDefault },
    data() {
        return {
            title: '入场需知',
            readFlag: false,
            dataList: [
               
            ]
        }
    },
    // created () {
    //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
    // },
    mounted() {
        //this.getData();
    },
    methods: {
        getData(){
            this.$loading.open();
            let params = {
                "cpycod": '0006',
                "tranum": '27480',
                "tranumsuf": '0',
            }
            this.$http.post( '/getShipMentByOrderId', params).then(res => {
                this.$loading.close();
                let result = res.data;
                if (result.ret_code == 0) {
                    this.damageDetails = res.data.damageDetails;
                    this.tempData = res.data.damageDetails;
                    this.damagePay = res.data.damagePay;
                    this.reason = res.data.reason;
                    this.reasonList = res.data.reasonList;
                }
            })
        },
        read(){
            this.readFlag = !this.readFlag;
        },
        sign(){
            this.$toast('请直接点击排队状态')
        },
        toQueue(){
            if(this.readFlag){
                this.$router.replace({
                    path: '/bigTruckDriver/queue'
                })
            }else{
                this.$toast('请确认你已经阅读过上列入厂需知，并勾选同意')
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.pdBot50{
    padding-bottom: .5rem;
    .check-img{
        width: .15rem;
        height: .15rem;
        margin-left: .1rem;
    }
}

.common-line-one-panel{
    p{
        height: inherit;
        padding-top: .13rem;
        padding-bottom: .13rem;
    }
}
</style>
