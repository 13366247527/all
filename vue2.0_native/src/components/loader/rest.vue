<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="restBox">
            <template v-for="(item, index) in boxData">
                <div @click="gorest(index)" :key="index" :class="nowIndex == index && nowIndex == 0 ? 'activegreen' : nowIndex == index && nowIndex == 1 ? 'activeorange' : nowIndex == index && nowIndex == 2 ? 'activeblue' : nowIndex == index && nowIndex == 3 ? 'activered' : nowIndex == index && nowIndex == 4 ? 'activepurple' : nowIndex == index && nowIndex == 5 ? 'activesky' : ''">
                    <p :class="index == 0 ? 'green' : index == 1 ? 'orange' : index == 2 ? 'blue' : index == 3 ? 'red' : index == 4 ? 'purple' : index == 5 ? 'sky' : ''">
                        <img :src="item.imgPath" alt="">
                        <span>{{item.title}}</span>
                    </p>
                </div>
            </template>
        </div>
        <timer ref="timer" class="timer"></timer>
        <div class="common-line-one-panel">
            <p class="red">当天休息记录</p>
        </div>
        <ul class="common-content-box">
            <li class="common-content-title bgGray">
                <div>类别</div>
                <div>开始时间</div>
                <div>结束时间</div>
                <div>用时</div>
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
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
import Timer from "@/components/common/Timer"

import canjubai from "@/assets/images/loader/canjubai.png"
import canju from "@/assets/images/loader/canjulv.png"
import wancanbai from "@/assets/images/loader/wancanbai.png"
import wancan from "@/assets/images/loader/wancan.png"
import yexiaobai from "@/assets/images/loader/yexiaobai.png"
import yexiao from "@/assets/images/loader/yexiao.png"
import cesuobai from "@/assets/images/loader/cesuobai.png"
import cesuo from "@/assets/images/loader/cesuo.png"
import xiuxibai from "@/assets/images/loader/xiuxibai.png"
import xiuxi from "@/assets/images/loader/xiuxi.png"
import qingjiabai from "@/assets/images/loader/qingjiabai.png"
import qingjia from "@/assets/images/loader/qingjia.png"

export default {
    components: {HeaderDefault, Timer},
    data() {
        return {
            title: '用餐休息',
            boxData: [
                {title: '午餐', imgPath: canju},
                {title: '晚餐', imgPath: wancan},
                {title: '夜宵', imgPath: yexiao},
                {title: '卫生间', imgPath: cesuo},
                {title: '休息', imgPath: xiuxi},
                {title: '请假', imgPath: qingjia},
            ],
            nowIndex: -1,
            cpycod: '',
            tranum: '',
            tranumsuf: '',
            tempData: [1,2,3]
        }
    },
    // created () {
    //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
    // },
    mounted() {
        this.getData();
    },
    methods: {
        gorest(index){
            this.nowIndex = index;
            switch(index){
                case 0:
                    this.boxData = [
                        {title: '午餐', imgPath: canjubai},
                        {title: '晚餐', imgPath: wancan},
                        {title: '夜宵', imgPath: yexiao},
                        {title: '卫生间', imgPath: cesuo},
                        {title: '休息', imgPath: xiuxi},
                        {title: '请假', imgPath: qingjia},
                    ]
                    break
                case 1:
                    this.boxData = [
                        {title: '午餐', imgPath: canju},
                        {title: '晚餐', imgPath: wancanbai},
                        {title: '夜宵', imgPath: yexiao},
                        {title: '卫生间', imgPath: cesuo},
                        {title: '休息', imgPath: xiuxi},
                        {title: '请假', imgPath: qingjia},
                    ]
                    break
                case 2:
                    this.boxData = [
                        {title: '午餐', imgPath: canju},
                        {title: '晚餐', imgPath: wancan},
                        {title: '夜宵', imgPath: yexiaobai},
                        {title: '卫生间', imgPath: cesuo},
                        {title: '休息', imgPath: xiuxi},
                        {title: '请假', imgPath: qingjia},
                    ]
                    break
                case 3:
                    this.boxData = [
                        {title: '午餐', imgPath: canju},
                        {title: '晚餐', imgPath: wancan},
                        {title: '夜宵', imgPath: yexiao},
                        {title: '卫生间', imgPath: cesuobai},
                        {title: '休息', imgPath: xiuxi},
                        {title: '请假', imgPath: qingjia},
                    ]
                    break
                case 4:
                    this.boxData = [
                        {title: '午餐', imgPath: canju},
                        {title: '晚餐', imgPath: wancan},
                        {title: '夜宵', imgPath: yexiao},
                        {title: '卫生间', imgPath: cesuo},
                        {title: '休息', imgPath: xiuxibai},
                        {title: '请假', imgPath: qingjia},
                    ]
                    break
                case 5:
                    this.boxData = [
                        {title: '午餐', imgPath: canju},
                        {title: '晚餐', imgPath: wancan},
                        {title: '夜宵', imgPath: yexiao},
                        {title: '卫生间', imgPath: cesuo},
                        {title: '休息', imgPath: xiuxi},
                        {title: '请假', imgPath: qingjiabai},
                    ]
                    break
                default:
                    this.boxData = [
                        {title: '午餐', imgPath: canju},
                        {title: '晚餐', imgPath: wancan},
                        {title: '夜宵', imgPath: yexiao},
                        {title: '卫生间', imgPath: cesuo},
                        {title: '休息', imgPath: xiuxi},
                        {title: '请假', imgPath: qingjia},
                    ]
                    break
            }
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
        }
    }
};
</script>

<style lang="scss" scoped>

.common-content-box{
    div{
        width: 25%;
    }
}

.red{
    justify-content: center;
}

.restBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    height: 1.98rem;
    padding: 0 .3rem;
    div{
        border-radius: .05rem;
        p{
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-items: center;
            width: .78rem;
            height: .78rem;
            border-radius: .05rem;
            img{
                width: .36rem;
                height: .36rem;
            }
            span{
                font-size: .15rem;
            }
        }
        .green{
            border: 1px solid $green;
        }
        .orange{
            border: 1px solid $orange;
        }
        .blue{
            border: 1px solid $blue;
        }
        .red{
            border: 1px solid $red;
        }
        .purple{
            border: 1px solid $purple;
        }
        .sky{
            border: 1px solid $sky;
        }
    }
}

.activegreen{
    background: $green;
    span{
        color: rgba(255,255,255,1);
    }
}

.activeorange{
    background: $orange;
    span{
        color: rgba(255,255,255,1);
    }
}

.activeblue{
    background: $blue;
    span{
        color: rgba(255,255,255,1);
    }
}

.activered{
    background: $red;
    span{
        color: rgba(255,255,255,1);
    }
}

.activepurple{
    background: $purple;
    span{
        color: rgba(255,255,255,1);
    }
}

.activesky{
    background: $sky;
    span{
        color: rgba(255,255,255,1);
    }
}

</style>
