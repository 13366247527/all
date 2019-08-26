<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="common-line-one-panel">
            <p>
                <span>请假类别：</span>
                <span v-for="(item, index) in catlog" :key="index" class="peddingBtn" :class="catlogIndex == index ? 'active' : ''" @click="selectCat(index)">
                    {{item}}
                </span>
            </p>
        </div>
        <textarea name="driverEvalute" class="driverEvalute" v-model="evaluation" placeholder="请假说明:"></textarea>
        <div class="common-line-one-panel">
            <p>
                <span>开始时间：</span>
                <select-box class="wid156" :selectDataList="beginDataList"></select-box>
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span>结束时间：</span>
                <select-box class="wid156"></select-box>
            </p>
        </div>
        <div class="common-bottom-button bottom-button-fixed">申请/交岗</div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
import SelectBox from "@/components/common/SelectBox"

export default {
    components: { HeaderDefault, SelectBox },
    data() {
        return {
            title: '请假',
            catlog: ['事假', '病假'],
            catlogIndex: 0,
            evaluation: '',
            beginDataList: [
                {
                    flex: 1,
                    values: [1,2,3,4,5],
                    textAlign: 'center'
                }
            ],

        }
    },
    // created () {
    //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
    // },
    mounted() {
        //this.getData();
    },
    methods: {
        selectCat(index){
            this.catlogIndex = index;
        },
        getData(){

            let obj = {
                "utype":"1",
                "cpycod":"0006",
                "username":"hbtest_user1",
                "jobpost":"02",
                "roles":[
                "02",
                "06"
                ],
                "personnam":"",
                "mobile1":"",
                "whsnum":"ea01",
                "vehgrpnum":""
                }
                let  aa = JSON.parse(obj)
                console.log(aa)
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

.wid156{
    width: 1.56rem;
}

.common-line-one-panel{
    .peddingBtn{
        @include peddingBtn(.67rem);
        background:rgba(249,249,249,1);
        border:1px solid rgba(192, 192, 192, 1);
        color:rgba(51,51,51,1);
        margin-right: .16rem;
    }
    .active{
        @include peddingBtn(.67rem);
    }
}

.driverLine {
    display: flex;
    align-items: center;
    padding: 0 .26rem;
    height: .53rem;
    font-size: .15rem;
    @include slim-font();
    color: rgba(51, 51, 51, 1);
}

.driverEvalute {
    box-sizing: border-box;
    display: block;
    width: 3.41rem;
    height: 2.34rem;
    padding: .05rem;
    margin: .05rem auto;
    background: rgba(240, 240, 240, 1);
    border: 1px solid rgba(192, 192, 192, 1);
    border-radius: .05rem;
    font-size: .15rem;
    @include slim-font();
    color: rgba(51,51,51,1);
}

</style>
