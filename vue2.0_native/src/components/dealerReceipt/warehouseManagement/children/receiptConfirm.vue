<template>
    <div>
        <header-default :title="title"></header-default>
        <div class="common-page-flex">
            <ul class="common-content-box">
                <li class="common-content-title">
                    <div>品名</div>
                    <div>数量</div>
                    <div>瓶数</div>
                    <div>状态</div>
                </li>
                <li v-for="(item, index) in dataList" :key="index">
                    <div>{{item.artName}}</div>
                    <div>
                        <input type="text" class="red" v-model="item.artQuantity">
                    </div>
                    <div>
                        <input type="text" class="red" v-model="item.artQuantity">
                    </div>
                    <div v-if="item.unLoadCode == '0'" @click="actualAccept(item)">
                        <span class="peddingBtn">{{item.unLoadStatus}}</span>
                    </div>
                    <div v-else class="green">{{item.unLoadStatus}}</div>
                </li>
            </ul>
            <div class="common-bottom-button bottom-button-fixed" @click="toBrokenClaim">破损处理</div>
        </div>
    </div>
</template>

<script>

import HeaderDefault from '@/components/common/HeaderDefault'

export default {
    data() {
        return {
            title: '收货确认',
            dataList: [],
            cpycod: '',
            tranum: '',
            tranumsuf: ''
        }
    },
    components: { HeaderDefault },
    mounted() {
        this.getData();
    },
    methods: {
        getData(){
            let data = this.$route.query;
            this.dataList = data.dataList;
            this.cpycod = data.cpycod;
            this.tranum = data.tranum;
            this.tranumsuf = data.tranumsuf;
        },
        actualAccept(item){
            let params = {
                'cpycod': this.cpycod,
                'tranum': this.tranum,
                'tranumsuf': this.tranumsuf,
                'artnum': item.artNumber,
                'shpartuni': item.artQuantity
            }
            this.$http.post('/actualAccept', params).then(res => {
                if(res.data.ret_code == 0){
                    this.$toast("收货成功");
                }
            })
        },
        toBrokenClaim(){
            this.$router.push({
                path: '/dealerReceipt/brokenClaim',
                query: {
                    cpycod: this.cpycod,
                    tranum: this.tranum,
                    tranumsuf: this.tranumsuf,
                }
            })
        },
        toReceiptComplete(){
            this.$router.push({
                path: '/dealerReceipt/receiptComplete'
            })
        },
    }
};
</script>

<style lang="scss" scoped>

.common-content-box{
    padding-top: 0;
    div{
        width: 50%;
    }
}

.red{
    width: .62rem;
}

.peddingBtn{
    @include peddingBtn(.62rem)
}

</style>
