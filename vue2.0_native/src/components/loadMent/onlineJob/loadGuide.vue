<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="taskGuide">
            <p @click="toRest">
                <img src="@/assets/images/loader/rest.png" alt="">
                <span class="green">休息</span>
            </p>
            <p>
                <img src="@/assets/images/loader/breakdown.png" alt="">
                <span class="red">破损</span>
            </p>
            <p>
                <img src="@/assets/images/loader/tray.png" alt="">
                <span class="orange">托盘</span>
            </p>
        </div>
        <blank-space></blank-space>
        <ul class="common-content-box">
            <li class="common-content-title">
                <div>品名</div>
                <div>数量</div>
                <div>拍照</div>
                <div>状态</div>
            </li>
            <li v-for="(item, index) in tempData" :key="index">
                <div>111</div>
                <div></div>
                <div>
                    <span class="take-photo"></span>
                </div>
                <div>
                    <span class="peddingBtn">待收</span>
                </div>
            </li>
        </ul>
        <div class="common-bottom-button bottom-button-fixed">
            <span>开始</span>
            <span class="orangeBtn">码货标准</span>
            <span class="greenBtn">完成</span>
        </div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
import BlankSpace from "@/components/common/BlankSpace"

export default {
    components: {HeaderDefault,BlankSpace},
    data() {
        return {
            title: '装卸指引',
            cpycod: '',
            tranum: '',
            tranumsuf: '',
            tempData: [1,2,3,4,5,1,2,3,4,5]
        }
    },
    // created () {
    //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
    // },
    mounted() {
//      this.getData();
    },
    methods: {
        showPopup(){
            this.popupVisible = !this.popupVisible
        },
        toRest(){
            this.$router.push({
                path: '/loader/rest'
            })
        },
        getData(){
            this.$loading.open();
            let params = {
                "cpycod": this.$route.query.cpycod,
                "tranum": this.$route.query.tranum,
                "tranumsuf": this.$route.query.tranumsuf,
            }
            this.$http.post( 'getAgencyDamageInfo', params).then(res => {
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

/*.common-content-box{
    padding-bottom: .5rem;
    div{
        width: 25%;
        .take-photo{
            display: inline-block;
            width: .62rem;
            height: .32rem;
            background: rgba(249,249,249,1) url(../../../assets/images/common/takePhoto.png) no-repeat center;
            background-size: .24rem .2rem;
            border:1px solid rgba(192, 192, 192, 1);
            border-radius: .05rem;
        }

        .peddingBtn{
            @include peddingBtn(.62rem)
        }
    }
}

.taskGuide{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: .82rem;
    padding: 0 .3rem;
    p{
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        img{
            width: .41rem;
            height: .41rem;
        }
        span{
            font-size: .15rem;
        }
    }
}

.common-bottom-button{
    span{
        width: 33.3%;
    }
}*/

</style>
