<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="common-line-one-panel">
            <p class="compony">长沙德昭物流有限公司香河分公司</p>
        </div>
        <div class="common-line-one-panel wid203">
            <p>
                <span>姓名：</span>
                <span class="name">杨一</span>
            </p>
        </div>
        <div class="common-line-one-panel wid203">
            <p>
                <span>岗位：</span>
                <span class="black">杨一</span>
            </p>
        </div>
        <div class="common-line-one-panel wid203">
            <p>
                <span>上班时间：</span>
                <span class="red">杨一</span>
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span>车号：</span>
                <span class="black">杨一</span>
            </p>
        </div>
        <div class="date">
            <p class="month">{{year}}-{{month}}</p>
            <p class="day">
                <span>星期<b>{{week}}</b></span>
                <span class="num">{{date}}</span>
            </p>
        </div>
        <div class="center">
            <div>
                <span class="orange">60</span>
                <span>低血压值</span>
            </div>
            <div>
                <span class="orange">110</span>
                <span>高血压值</span>
            </div>
            <div>
                <span class="green">80</span>
                <span>酒精值</span>
            </div>
        </div>
        <div @touchmove.prevent @click="normalImg" v-if="isBig">
            <div class="mask"></div>
            <img :src="bigImgUrl" class="active">
            <div v-show="standardFlag" class="common-bottom-button bottom-button-fixed retake" @click.stop="takePhoto(1)">重拍</div>
        </div>
        <div class="driverPhoto">
            <p class="stand" @click="standardBig">
                <img src="@/assets/images/common/standard.jpg">
            </p>
            <p class="stand takephoto" @click="takePhoto">
                <img :src="imgPath">
            </p>
        </div>
        <div class="stateBox">
            <span>状态：</span>
            <span class="orange">审核中</span>
        </div>
        <div class="common-bottom-button bottom-button-fixed" @click="toInstruction">签到</div>
    </div>
</template>

<script>

import native from '@/native/bridge.js'
import HeaderDefault from "@/components/common/HeaderDefault"

export default {
    components: { HeaderDefault },
    data() {
        return {
            title: '安全签到',
            imgPath: require('@/assets/images/bigTruckDriver/takephoto.png'),
            isBig: false,
            standardFlag: false,
            takePhotoFlag: true,
            bigImgUrl: '',
            year: '',
            month: '',
            week: '',
            date: ''
        }
    },
    mounted() {
        this.getData();
        this.mountDate();
    },
    methods: {
        toInstruction(){
            this.$router.push({
                path: '/structioner'
            })
        },
        takePhoto(type=0){
            if(type==1){
                this.takePhotoFlag = true;
            }
            if(this.takePhotoFlag){
                native.callhandler('takePhoto', '', data => {
                    this.isBig = false;
                    this.takePhotoFlag = false
                    this.imgPath = `data:image/png;base64,${data}`
                })
            }else{
                this.isBig = !this.isBig;
                this.standardFlag = true;
                this.bigImgUrl = this.imgPath;
            }
        },
        standardBig(){
            this.isBig = !this.isBig;
            this.standardFlag = false;
            this.bigImgUrl = require('@/assets/images/common/standard.jpg')
        },
        normalImg(){
            this.isBig = !this.isBig;
        },
        mountDate(){
            let weeks = ['日','一','二','三','四','五','六']
            this.year = new Date().getFullYear();
            this.month = new Date().getMonth()+1;
            this.week = weeks[new Date().getDay()];
            this.date = new Date().getDate();
        },
        getData(){
            this.$loading.open();
            let params = {
                "cpycod": '0006',
                "tranum": '27480',
                "tranumsuf": '0',
            }
            this.$http.post( '/getShipMentByOrderId', params).then(res => {
                this.$loading.close();
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

.mask {
    width: 100vw;
    height: 100vh;
    background: #333;
    opacity: 0.7;
    display: block;
    margin: 0 auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
}
.active {
    width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    z-index: 1000;
}

.compony{
    padding-left: .1rem;
    font-size: .15rem;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color:rgba(102,102,102,1);
}

.name{
    font-size: .19rem;
    color:rgba(51,51,51,1);
    @include normal-font();
}

.wid203{
    width: 2.03rem;
}
.date{
    position: absolute;
    top: 1.3rem;
    right: .2rem;
    width: 1.05rem;
    .month{
        font-size: .25rem;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color:rgba(102,102,102,1);
        margin-bottom: .1rem;
    }
    .day{
        font-size: .15rem;
        @include slim-font();
        color:rgba(255,255,255,1);
        display: flex;
        justify-content: space-between;
        span{
            display: inline-block;
            width: .47rem;
            height: .47rem;
            background:rgba(227,29,43,1);
            border-radius: .05rem;
            text-align: center;
            b{
                font-size: .21rem;
                @include normal-font();
            }
        }
        .num{
            line-height: .47rem;
            font-size: .31rem;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color:rgba(255,255,255,1);
        }
    }
}
.center {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    background: #fff;
    margin: 0 .16rem;
    height: .72rem;
    font-size: .15rem;
    @include normal-font();
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid rgba(236, 236, 236, 1);
    div{
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        span:first-of-type{
            margin-bottom: .1rem;
        }
        .orange{
            font-size: .19rem;
        }
        .green{
            font-size: .19rem;
        }
    }
}

.driverPhoto{
    @include flex(row);
    justify-content: space-around;
    margin: .11rem .16rem .1rem;
    .stand{
        width: 1.4rem;
        height: 1.56rem;
        background:rgba(255,255,255,1);
        border: 1px solid rgba(192, 192, 192, 1);
        border-radius: .05rem;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .takephoto{
        border: 0 none;
    }
}

.stateBox{
    height: .45rem;
    border-top: 1px solid rgba(236,236,236,1);
    @include flex(row);
    align-items: center;
    font-size: .15rem;
    margin: 0 .16rem .5rem;
    span:first-of-type{
        padding-left: .1rem;
    }
}

.retake{
    z-index: 999;
}

</style>
