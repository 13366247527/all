<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="common-line-two-panel">
            <p>
                <span>重量：</span>
                <span class="red">{{dataObj.weight}}</span>
                <span class="black">吨</span>
            </p>
            <p>
                <span>数量：</span>
                <span class="red">{{dataObj.amount}}</span>
                <span class="black">箱</span>
            </p>
        </div>
        <div class="common-line-two-panel">
            <p>
                <span>运价：</span>
                <span class="green">{{dataObj.price}}</span>
                <span class="black">元/吨</span>
            </p>
            <p>
                <span>运费：</span>
                <span class="green">{{dataObj.expense}}</span>
                <span class="black">元</span>
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span>付款方式：</span>
                <span class="red">{{dataObj.paytyp}}</span>
            </p>
        </div>
        <div class="common-line-two-panel">
            <p>
                <span>现金：</span>
                <span class="red">{{dataObj.weight}}</span>
                <span class="black">元</span>
            </p>
            <p>
                <span>油卡：</span>
                <span class="red">{{dataObj.paybycard}}</span>
                <span class="black">元</span>
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span class="minWid">开户行</span>
                <input type="text" class="wid235">
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span class="minWid">户名：</span>
                <input type="text" class="wid235">
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span class="minWid">账号：</span>
                <input type="text" class="wid235">
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span class="minWid">油卡公司：</span>
                <input type="text" class="wid235">
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span class="minWid">卡号：</span>
                <input type="text" class="wid235">
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span class="minWid">电话：</span>
                <input type="text" class="wid235">
            </p>
        </div>
        <div class="common-bottom-button bottom-button-fixed" @click="commit">提交</div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"

export default {
    components: {HeaderDefault},
    data() {
        return {
            title: '运费信息',
            dataObj: {},
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        commit(){
            //todo
        },
        getData(){
            this.$loading.open();
            let params = {
                "cpycod": '0006',
                "tranum": '27480',
                "tranumsuf": '0',
            }
            this.$http.post( '/TransportPriceQuery', params).then(res => {
                this.$loading.close();
                let result = res.data;
                if (result.ret_code == 0) {
                    this.dataObj = result.data;
                }
            })
        }
    }
};
</script>

<style lang="scss" scoped>

.common-page-flex{
    padding-bottom: .5rem;
}

.wid235{
    width: 2.35rem;
}

.minWid{
    min-width: .75rem;
}

.province{
    width: 2.19rem;
}

</style>
