<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="positionBox">
            <p v-for="(item,index) in position" :key="index" @click="selectPositon(index)">
                <span class="position" :class="nowSel==index?'active':''">{{item}}</span>
                <span class="photoPanel"></span>
            </p>
        </div>
        <div class="common-bottom-button">确定</div>
    </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault"
export default {
    components: {HeaderDefault},
    data() {
        return {
            title: '换轮胎位置',
            nowSel: -1,
            position: [
                '前左','前右','2左内', '2右内','2左外','2右外','3左内','3右内','3左外','3右外','4左内',
                '4右内','4左外','4右外','5左内','5右内','5左外','5右外','6左内','6右内','6左外','6右外',
            ]
        };
    },
    methods: {
        selectPositon(index){
            this.nowSel = index;
        }
    }
};
</script>

<style lang="scss" scoped>

.position{
    @include redPanel(.62rem);
    font-size: .15rem;
    color:rgba(51,51,51,1);
    background:rgba(249,249,249,1);
    border: 1px solid rgba(192, 192, 192, 1);
}

.active{
    color:rgba(255,255,255,1);
    background: $red;
    border: 1px solid $red;
}

.photoPanel{
    @include takePhotoPanel(.62rem);
    background-image: url(../../../../assets/images/common/takePhoto.png);
}

.positionBox{
    display: flex;
    flex-wrap: wrap;
    padding: 0 .16rem;
    p{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: .46rem;
        border-bottom: 1px solid rgba(236,236,236,1);
        span:first-of-type{
            padding-left: 0;
        }
    }
}


</style>
