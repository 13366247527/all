<template>
    <div>
        <header-default :title="title"></header-default>
        <div class="common-page-flex">
            <ul class="common-content-box">
                <li class="common-content-title">
                    <div>品名规格</div>
                    <div>数量</div>
                    <div>货龄</div>
                </li>
                <li v-for="(item, index) in dataList" :key="index">
                    <div>{{item.artName}}</div>
                    <div>{{item.artQuantity}}</div>
                    <div>{{item.date}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import HeaderDefault from '@/components/common/HeaderDefault'

export default {
    data() {
        return {
            title: '送货单明细',
            dataList: [],
        }
    },
    components: { HeaderDefault },
    mounted() {
        this.getData();
    },
    methods: {
        getData(){
            this.dataList = this.$route.query.dataList;
        }
    }
};
</script>

<style lang="scss" scoped>

.common-content-box{
    padding-top: 0;
    div{
        width: 33.3%;
    }
}

.weight{
  @include redPanel(.62rem)
}

</style>
