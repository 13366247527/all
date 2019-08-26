<template>
    <div>
        <header-default :title="title"></header-default>
        <div class="common-page-flex">
            <div class="common-line-two-panel">
                <p>
                    <span>姓名：</span>
                    <span class="red">张三</span>
                </p>
                <p>
                    <span>职位：</span>
                    <span class="red">运输主管</span>
                </p>
            </div>
            <div class="common-line-one-panel">
                <p>
                    <span>审批描述：</span>
                    <span class="red">张三</span>
                </p>
            </div>
            <div class="common-line-one-panel">
                <p>
                    <span>时间：</span>
                    <span class="red">2018-12-22  10:00</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>

import HeaderDefault from '@/components/common/HeaderDefault'

export default {
    data() {
        return {
            title: '审批日志',
            dataList: [],
        }
    },
    components: { HeaderDefault },
    mounted() {
        //this.getData();
    },
    methods: {
        getData(){
            this.$loading.open();
            this.$http.post('/getAgencyDeliveryDoc',{}).then(res => {
                this.$loading.close();
                let result = res.data;
                if(result.ret_code == 0){
                    let index = this.$route.query.index;
                    let data = result.data.delCheckList[index];
                    this.dataList = data.artDetails;
                    this.cpycod = data.cpycod;
                    this.tranum = data.tranum;
                    this.tranumsuf = data.tranumsuf;
                }
            })
        },
    }
};
</script>

<style lang="scss" scoped>

.common-content-box{
    padding-top: 0;
    div{
        width: 20%;
    }
}

</style>
