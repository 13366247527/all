<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="oprateBox">
            <p>
                <img src="@/assets/images/bigTruckDriver/rainSnow.png" alt="">
                <span class="red">雨雪</span>
            </p>
            <p>
                <img src="@/assets/images/bigTruckDriver/trafficJam.png" alt="">
                <span class="orange">堵车</span>
            </p>
            <p>
                <img src="@/assets/images/bigTruckDriver/breakdown.png" alt="">
                <span class="red">故障</span>
            </p>
        </div>
        <div id="container" class="container"></div>
        <div class="common-bottom-button">
            <span class="orangeBtn">导航</span>
            <span>到达</span>
        </div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"

export default {
    components: { HeaderDefault },
    data(){
        return{
            title: '送货导航'
        }
    }
}
</script>

<style lang="scss" scoped>
.common-page-flex{
    height: 100vh;
}
.oprateBox{
    @include flex(row);
    justify-content: space-around;
    align-items: center;
    height: .54rem;
    p{
        @include flex(column);
        justify-content: space-around;
        align-items: center;
        img{
            width: .26rem;
            height: .26rem;
        }
        span{
            font-size: .13rem;
        }
    }
}
.container{
    flex-grow: 1;
}
</style>

