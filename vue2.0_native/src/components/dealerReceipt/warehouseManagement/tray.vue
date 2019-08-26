<template>
    <div class="common-page-flex">
        <div class="pdTop115">
            <p class="codeTitle black">当车托盘交回</p>
            <ul class="common-content-box return">
                <li class="common-content-title bgGray">
                    <div>车号</div>
                    <div>材质</div>
                    <div>应还</div>
                    <div>数量</div>
                    <div>差异</div>
                </li>
                <li v-for="(item, index) in tempData" :key="index">
                    <div>{{item.artName}}</div>
                    <div></div>
                    <div>{{item.bottlePrice}}</div>
                    <div>
                        <input type="text" class="wid52">
                    </div>
                    <div>差异</div>
                </li>
            </ul>
            <p class="codeTitle black">还欠托盘</p>
            <ul class="common-content-box owe">
                <li class="common-content-title bgGray">
                    <div>材质</div>
                    <div>数量</div>
                    <div>实收</div>
                </li>
                <li v-for="(item, index) in tempData" :key="index">
                    <div>{{item.bottlePrice}}</div>
                    <div>
                        <input type="text" class="wid52">
                    </div>
                    <div>差异</div>
                </li>
            </ul>
            <div class="common-line-one-panel">
                <p>
                    <span>司机确认状态：</span>
                    <span class="red">兽兽</span>
                </p>
            </div>
        </div>
        <div class="common-bottom-button">
          <span class="redBtn">还托盘确认</span>
          <span class="orangeBtn">欠托盘确认</span>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            tempData: [1,2,3,4,5],
            evaluation: ''
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
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
    height: 1.7rem;
    overflow-y: scroll;
}

.return li div {
    width: 20%
}

.owe li div {
    width: 33.3%
}

.wid52{
    width: .52rem;
}

.common-bottom-button{
    background: $green;
}
</style>
