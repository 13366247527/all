<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="common-line-one-panel">
            <p>
                <span>收货客户名称：</span>
                <span></span>
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span>详细地址：</span>
                <span></span>
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span>公里数：</span>
                <span></span>
            </p>
        </div>
        <div class="common-line-two-panel">
            <p>
                <span>油耗：</span>
                <span></span>
                <span class="black">升</span>
            </p>
            <p>
                <span>金额：</span>
                <span></span>
                <span class="black">元</span>
            </p>
        </div>
        <div class="common-line-two-panel">
            <p>
                <span>路桥费：</span>
                <span></span>
                <span class="black">元</span>
            </p>
            <p>
                <span>罚款：</span>
                <span></span>
                <span class="black">元</span>
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span>生活费支出：</span>
                <span></span>
                <span class="black">元</span>
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span class="red">合计：</span>
                <span></span>
                <span class="black">元</span>
            </p>
        </div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"

export default {
    components: { HeaderDefault },
    data() {
        return {
            title: '费用明细'
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

</style>
