<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="common-line-one-panel">
            <p class="compony">{{company}}</p>
        </div>
        <div class="common-line-one-panel wid203">
            <p>
                <span>姓名：</span>
                <span class="name">{{userName}}</span>
            </p>
        </div>
        <div class="common-line-one-panel wid203">
            <p>
                <span>岗位：</span>
                <span class="black">{{personJob}}</span>
            </p>
        </div>
        <div class="common-line-one-panel wid203">
            <p class="box">
                <span>上班时间：</span>
                <span class="red">{{workTime | formatDate}}</span>
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
                <span class="orange">{{lowBloodPressure}}</span>
                <span>低血压值</span>
            </div>
            <div>
                <span class="orange">{{highBloodPressure}}</span>
                <span>高血压值</span>
            </div>
            <div>
                <span class="green">{{alcoholNum}}</span>
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
                <img :src="pictureList[0]">
            </p>
            <p class="stand takephoto" @click="takePhoto">
                 <img  v-if="pictureList[1]" :src="pictureList[1]" class="img">
                 <img   v-else :src="imgPath1">
            </p>
        </div>
        <div class="stateBox">
            <span>状态：</span>
            <span class="orange" v-if="auditStatus=='K'">待检测</span>
            <span class="red" v-else-if="auditStatus=='N'">审核拒绝</span>
            <span class="green" v-else-if="auditStatus=='Y'">体检通过</span>
            <span class="red" v-else-if="auditStatus=='A'">不合格，已通知主管</span>
            <span class="orange" v-else></span>
        </div>
        <div class="common-bottom-button bottom-button-fixed"  >
            <span class="orange1" @click="bodyment">身体检测</span>
            <span v-if="signStatus==1"  @click="toInstruction2">开始工作</span>
            <span v-if="signStatus==2"  @click="toInstruction1">签到</span>
        </div>
    </div>
</template>

<script>

import native from '@/native/bridge.js'
import HeaderDefault from "@/components/common/HeaderDefault"

export default {
    components: { HeaderDefault },
    data() {
        return {
            title: '上班签到',
            imgPath: require('@/assets/images/common/standard.jpg'),
            imgPath1: require('@/assets/images/common/defaultImg.png'),
            isBig: false,
            standardFlag: false,
            takePhotoFlag: true,
            company:'' ,//公司名称
            userName:'',//姓名
            workTime:'',//上班时间
            personJob:'',//岗位
            alcoholNum:0,//酒精值
            lowBloodPressure:0,//低血压值
            highBloodPressure:0,//高血压值
            signStatus:2,//签到状态。1:"已签到";2:"未签到"
            auditStatus:'',//审核状态。"K":"待检测";"N":"审核拒绝";"Y":"体检通过"；"A":"不合格，已通知主管"
            pictureList:'',//图片路径集合
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
        //签到
        toInstruction1(){
            this.$http.post( 'wms/sign/detection/sign',{}).then(res => {
                console.log(res)
                if(res.data.ret_code == "0"){
                    this.signStatus = 1
                }
            })
        },
        //开始工作
        toInstruction2(){  
            if(this.auditStatus == "Y"){
                this.$router.replace({
                path: '/home',
                })
            }else if(this.auditStatus == "K"){
                this.$toast("请先进行身体检测操作！")
                native.callhandler("showVoice", "请先进行身体检测操作！");
            }else{
                 this.$toast("审核不通过,请联系主管！")
                native.callhandler("showVoice", "审核不通过,请联系主管！");
            }       
              
        },
        //身体检测
        bodyment(){
             if(this.signStatus ==2){
                  this.$toast("请先签到！")
                  native.callhandler("showVoice", "请先签到！");
             }else{
                this.$router.push({
                 path: '/bodyment',
                })
             }
        },
        takePhoto(type=0){
            // if(type==1){
            //     this.takePhotoFlag = true;
            // }
            // if(this.takePhotoFlag){
            //     native.callhandler('takePhot', '', data => {
            //         this.isBig = false;
            //         this.takePhotoFlag = false
            //         this.imgPath = `data:image/png;base64,${data}`
            //     })
            // }else{
            //     this.isBig = !this.isBig;
            //     this.standardFlag = true;
            //     this.bigImgUrl = this.imgPath;
            // }
        },
        standardBig(){
            // this.isBig = !this.isBig;
            // this.standardFlag = false;
            // this.bigImgUrl = require('@/assets/images/common/standard.jpg')
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
            this.$http.post( 'wms/sign/detection/sign/detail', {}).then(res => {
                this.$loading.close();
                console.log(res)
                let result = res.data;
                if (result.ret_code == 0) {
                    this.company = res.data.data.company
                    this.userName = res.data.data.userName
                    this.workTime = res.data.data.workTime
                    this.personJob = res.data.data.personJob
                    this.alcoholNum= res.data.data.alcoholNum ? res.data.data.alcoholNum : 0
                    this.lowBloodPressure= res.data.data.lowBloodPressure ? res.data.data.lowBloodPressure:0
                    this.highBloodPressure= res.data.data.highBloodPressure ?res.data.data.highBloodPressure:0
                    this.signStatus= res.data.data.signStatus
                    this.auditStatus= res.data.data.auditStatus
                    this.pictureList = res.data.data.pictureList
                }
            })
        }
    },
    filters: {
    //转换时分
      formatDate: function (value) {
      	if(value){
      		let date = new Date(value);
      		let h = date.getHours();
      		h = h < 10 ? ('0' + h) : h;
      		let m = date.getMinutes();
      		m = m < 10 ? ('0' + m) : m;
      		return  h + ':' + m ;     		
      	}
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
    font-size: .16rem;
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
    border-top: 1px solid rgba(236, 236, 236, 1);
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
        background: #F0F0F0;
        text-align:center;
        line-height: 1.5rem;
        img{
            width:35%;
            height:35%; 
        }
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
.driverPhoto .takephoto .img{
     width:100%;
     height:100%; 
     border-radius: .05rem;
}
.retake{
    z-index: 999;
}
.common-line-one-panel .box{
    border-bottom: none
}
.orange1{
    background: #FF7F00;
}
</style>
