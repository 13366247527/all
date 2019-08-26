<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="common-line-two-panel">
            <p>
                <span>客户数：</span>
                <span class="red">300</span>
                <span>家</span>
            </p>
            <p>
                <span>车数：</span>
                <span class="red">300</span>
                <span>车</span>
            </p>
        </div>
        <div class="common-line-two-panel">
            <p>
                <span>重量：</span>
                <span class="red">300</span>
                <span>吨</span>
            </p>
            <p>
                <span>数量：</span>
                <span class="red">300</span>
                <span>箱</span>
            </p>
        </div>
        <ul class="common-content-box">
            <li class="common-content-title bgGray">
                <div>装运单号</div>
                <div>车号</div>
                <div>重量</div>
                <div>数量</div>
                <div>托数</div>
            </li>
            <li v-for="(item, index) in tempData" :key="index">
                <div>
                    <span class="redPanel">11167</span>
                </div>
                <div></div>
                <div>{{item.bottlePrice}}</div>
                <div></div>
                <div>{{item.boxPrice}}</div>
            </li>
        </ul>
        <div class="common-bottom-button bottom-button-fixed" @click="toLoadGuide">装卸作业</div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"

export default {
    components: {HeaderDefault},
    data() {
        return {
            title: '装卸任务',
            cpycod: '',
            tranum: '',
            tranumsuf: '',
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
        showPopup(){
            this.popupVisible = !this.popupVisible
        },
        toLoadGuide(){
            this.$router.push({
                path: '/loader/loadGuide'
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
        width: 20%;
    }
}

.redPanel{
    @include redPanel(.83rem)
}

</style>
