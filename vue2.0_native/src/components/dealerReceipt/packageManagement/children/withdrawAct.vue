<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="common-line-one-panel">
            <p>
                <span>日期：</span>
                <span class="red">300</span>
            </p>
        </div>
        <div class="common-line-two-panel">
            <p>
                <span>材质：</span>
                <span class="fontMed">块</span>
            </p>
            <p>
                <span>数量：</span>
                <input type="text" class="wid78 red">
                <span class="fontMed">块</span>
            </p>
        </div>
        <div class="common-bottom-button bottom-button-fixed">提交</div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"

export default {
    components: {HeaderDefault},
    data() {
        return {
            title: '退托申请',
            tempData: []
        }
    },
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
        },
    }
};
</script>

<style lang="scss" scoped>

.common-content-box li div{
    width: 20%;
}


.wid78{
    margin-right: .05rem;
    @include input-panel(.78rem);
}

.fontMed{
    @include normal-font()
}
</style>
