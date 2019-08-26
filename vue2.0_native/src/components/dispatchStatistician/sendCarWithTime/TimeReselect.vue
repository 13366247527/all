<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
                    <div class="tab pageFlex">
                        <div class="commonTabDiv pd48">
                            <ul class="commonTab common-content-box">
                                <li class="selectList" v-for="(item, index) in dataList" @click.stop="changeTimeSelectStatus(index)"
                                    :key="item.id" :class="index%2==0?'':'bgShu'">
                                    <template v-if="timeStatus == index">
                                        <img src="@/assets/images/common/checked.png" alt="">
                                    </template>
                                    <template v-else>
                                        <img src="@/assets/images/common/check.png" alt="">
                                    </template>
                                    <span>{{item.selval}}</span>
                                </li>
                            </ul>
                        </div>
        </div>
        <div class="common-bottom-button bottom-button-fixed" @click="toInstruction">确定</div>
    </div>
</template>

<script>

//import native from '@/native/bridge.js'
import HeaderDefault from "@/components/common/HeaderDefault"

export default {
    components: { HeaderDefault },
    name: "TimeReselect",
    data() {
        return {
            dataList:[],
            timeStatus:null,
            title: '时间重选',
           
        }
    },
    mounted() {
       
    },
    methods: {
       
        changeTimeSelectStatus(index){
            this.timeStatus = index
            
        },
        toInstruction(){
            
            this.$router.push({
                path: '/vehicleDispatcher/loadingManagement/aboutCar',
                // query:{
                //     index:this.$route.query.index,
                //     timeStatus: this.dataList[this.timeStatus].selval
                //     }
             })
        },
        standardBig(){
            this.isBig = !this.isBig;
            this.standardFlag = false;
            this.bigImgUrl = require('@/assets/images/common/standard.jpg')
        },
    }
};
</script>

<style lang="scss" scoped>
.common-content-box {
  margin-bottom: 0.5rem;
  display: flex;
  flex-flow: row wrap;
  font-size: .16rem;
}
.common-content-box li {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 50%;
  border-bottom: 1px solid #ececec;
}

.common-content-box li span {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: .46rem;
  text-align: center;
  font-size: .16rem;
  word-break: break-all;
}
.commonTab .bgShu {
    background: url(~@/assets/images/common/shu.png) no-repeat left;
    background-size: 1px .25rem;
}

.commonTab img {
    width: .15rem;
    height: .15rem;
    margin: 0 .1rem 0 .1rem;
}

.commonTab li:first-of-type{
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}
.selectList{
    width:50%;
}
</style>
