<template>
    <div>
        <header-default :title="title"></header-default>
        <div class="codeBox">
            <img src="@/assets/images/common/half-star.png" alt="">
            <img src="@/assets/images/common/half-star.png" alt="">
        </div>
        <p class="codeTitle red">破损扫码赔偿</p>
        <div class="common-line-one-panel">
            <p>
                <span>赔偿金额：</span>
                <span></span>
                <span class="red">元</span>
            </p>
        </div>
        <ul class="common-content-box">
            <li class="common-content-title bgGray">
                <div>品名规格</div>
                <div>数量</div>
                <div>单价</div>
                <div>金额</div>
            </li>
            <li v-for="(item, index) in tempData" :key="index">
                <div>{{item.artName}}</div>
                <div></div>
                <div>{{item.bottlePrice}}</div>
                <div>{{item.boxPrice}}</div>
            </li>
        </ul>
        <div class="driverLine">
            <span>司机服务评价：</span>
            <rating></rating>
        </div>
        <textarea name="driverEvalute" class="driverEvalute" v-model="evaluation" placeholder="输入..."></textarea>
        <div class="common-bottom-button bottom-button-fixed" @click="receiveBtn">收货完成</div>
    </div>
</template>

<script>

import HeaderDefault from '@/components/common/HeaderDefault'
import Rating from '@/components/common/Rating'

export default {
    data() {
        return {
            title: '收货完成',
            tempData: [1,2,3,4,5],
            evaluation: ''
        }
    },
    components: { HeaderDefault, Rating },
    methods: {
        receiveBtn(){
            //todo
        }
    }
}
</script>

<style lang="scss" scoped>
.codeBox{
    display: flex;
    justify-content: space-around;
    img{
        width: 1.5rem;
        height: 1.5rem;
    }
}
.codeTitle{
    font-size: .15rem;
    height: .46rem;
    line-height: .46rem;
    text-align: center;
}

.common-line-one-panel p{
    border-top: 1px solid rgba(236,236,236,1);
}

.common-content-box{
    height: 2rem;
    overflow-y: scroll;
}

.common-content-box li div {
    width: 25%
}

.driverLine {
    display: flex;
    align-items: center;
    padding: 0 .26rem;
    height: .44rem;
    font-size: .15rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}

.driverEvalute {
    box-sizing: border-box;
    display: block;
    width: 3.28rem;
    height: .6rem;
    padding: .05rem;
    margin: 0 auto;
    background: rgba(240, 240, 240, 1);
    border: 1px solid rgba(192, 192, 192, 1);
    border-radius: .05rem;
    font-size: .15rem;
    @include slim-font();
    color: rgba(153, 153, 153, 1);
}

.common-bottom-button{
    background: $green;
}
</style>
