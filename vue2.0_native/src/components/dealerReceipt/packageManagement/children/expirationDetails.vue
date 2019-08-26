<template>
    <div>
        <header-default :title="title"></header-default>
        <ul class="common-content-box">
            <li class="common-content-title">
                <div>收托</div>
                <div>到期</div>
                <div>数量</div>
                <div>日租</div>
                <div>租金</div>
            </li>
            <li v-for="(item, index) in tempData" :key="index">
                <div>{{item.artName}}</div>
                <div></div>
                <div>{{item.bottlePrice}}</div>
                <div></div>
                <div>{{item.boxPrice}}</div>
            </li>
        </ul>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"

export default {
    components: {HeaderDefault},
    data() {
        return {
            title: '到期明细',
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

.red{
    margin-right: .05rem;
}

</style>
