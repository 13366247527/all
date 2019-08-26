<template>
    <div class="common-page-flex">
        <mt-loadmore :top-method="loadTop" ref="loadmore">
            <div class="common-line-two-panel pdTop115">
                <p>
                    <span>免押数量：</span>
                    <span class="red">300</span>
                    <span>块</span>
                </p>
                <p>
                    <span>到期数量：</span>
                    <span class="red">300</span>
                    <span>块</span>
                </p>
            </div>
            <div class="common-line-two-panel">
                <p>
                    <span>押托数量：</span>
                    <span class="red">300</span>
                    <span>块</span>
                </p>
                <p>
                    <span>押托金额：</span>
                    <span class="red">300</span>
                    <span>块</span>
                </p>
            </div>
            <div class="common-line-two-panel">
                <p>
                    <span>交租块数：</span>
                    <span class="red">300</span>
                    <span>块</span>
                </p>
                <p>
                    <span>应交租金：</span>
                    <span class="red">300</span>
                    <span>块</span>
                </p>
            </div>
            <ul class="common-content-box">
                <li class="common-content-title bgGray">
                    <div>日期</div>
                    <div>材质</div>
                    <div>数量</div>
                    <div>押金</div>
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
        </mt-loadmore>
        <div class="common-bottom-button">
            <span>退托盘</span>
            <span class="orangeBtn">到期查询</span>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            title: '破损处理',
            cpycod: '',
            tranum: '',
            tranumsuf: '',
            tempData: []
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
        loadTop(){
            //传1说明是下拉刷新
            this.getData(1);
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
