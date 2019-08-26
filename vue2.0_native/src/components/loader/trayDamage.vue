<template>
    <div>
        <header-default :title="title"></header-default>
        <div class="common-page-flex">
            <div class="common-line-one-panel">
                <p>
                    <span>名称：</span>
                    <select-box class="wid110" :selectDataList='dataList'></select-box>
                </p>
            </div>
            <div class="common-line-one-panel">
                <p>
                    <span>数量：</span>
                    <input type="text" class="wid110 red">
                    <span class="black">块</span>b 
                </p>
            </div>
            <div class="common-line-one-panel">
                <p>
                    <span>原因：</span>
                    <select-box class="wid110" :selectDataList='dataList'></select-box>
                </p>
            </div>
            <take-photo ref="takephoto" :title="photoTitle" class="take-photo"></take-photo>
        </div>
        <div class="common-bottom-button bottom-button-fixed">提交</div>
    </div>
</template>

<script>

import HeaderDefault from '@/components/common/HeaderDefault'
import SelectBox from '@/components/common/SelectBox'
import TakePhoto from '@/components/common/TakePhoto'

export default {
    data() {
        return {
            title: '托盘破损',
            photoTitle: '拍照',
            dataList: [
                {
                    flex: 1,
                    values: [1,2,3,4,5],
                    textAlign: 'center'
                }
            ],
        }
    },
    components: { HeaderDefault, SelectBox, TakePhoto },
    mounted() {
        //this.getData();
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

.wid110{
    width: 1.1rem;
}

.take-photo{
    width: 3.12rem;
    height: 2.08rem;
    margin: .14rem auto;
}

</style>
