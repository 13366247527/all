<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="common-line-two-panel">
         <p class="one panel">
                <span>车数：</span>
                <span class="red red1">{{cars}}</span>
                <span>车</span>
        </p>
        </div>
        <div class="common-line-two-panel">
            <p class="one">
                <span>重量：</span>
                <span class="red">{{weight}}</span>
                <span>吨</span>
            </p>
            <p class="tow">
                <span>数量：</span>
                <span class="red">{{boxNums}}</span>
                <span>箱</span>
            </p>
        </div>
        <ul class="common-content-box">
            <li class="common-content-title bgGray">
                <div>装运单号</div>
                <div>车号</div>
                <div>重量</div>
                <div>数量</div>
                <div>托数</div>
            </li>
            <li v-for="(item, index) in tempData" :key="index" v-show="tempData.length > 0">
                <div>
                    <span class="redPanel">{{item.shipmentNum}}</span>
                </div>
                <div>{{item.carNum}}</div>
                <div>{{item.weight}}</div>
                <div>{{item.num}}</div>
                <div>{{item.trayNum}}</div>
            </li>
        </ul>
        <!-- <div class="common-bottom-button bottom-button-fixed" @click="toLoadGuide">装卸作业</div> -->
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"

export default {
    components: {HeaderDefault},
    data() {
        return {
            title: '装卸任务',
            tempData:[],
            cars:0,
            boxNums:0,
            weight:0
        }
    },
    // created () {
    //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
    // },
    mounted() {
        this.getData();
    },
    methods: {
        // //装卸作业  	
    	// toLoadGuide(){
    	// 	this.$router.replace({
		// 	        path: "/loadMent/onlineJob"
		// 	 });
    	// },
        getData(){
            this.$loading.open();
            this.$http.post( 'wms/stevedore/task/list', {}).then(res => {
                this.$loading.close();
               console.log(res.data.data)
                this.tempData = res.data.data.list
                this.cars = res.data.data.cars
                this.boxNums = res.data.data.boxNums
                this.weight = res.data.data.weight
            })
        }
    }
};
</script>

<style lang="scss" scoped>
	 .common-line-two-panel .tow{
		padding-left: 0.9rem;	
	 }
     .common-line-two-panel .tow .red1{
     	margin-left:0.20rem ;
     }
     .common-line-two-panel .one .red{
     	margin-left:0.13rem ;
     }
     .common-line-two-panel .panel{
     	width: 100%;
     }
     .red{
     	margin-right: 0.04rem;
     }
	.common-content-box{
	    padding-bottom: .5rem;   
	}
	.common-content-box li{
		display: flex;
		justify-content: space-between;
	}
	.common-content-box li div{
		width: 12%;
	    text-align: center;
	}
	.common-content-box li div:nth-of-type(1){
		width: 30%;
	    text-align: center;
	}
	.common-content-box li div:nth-of-type(2){
		width: 30%;
	    text-align: center;
	}
	.bgGray{
		font-weight: 600;
		font-size: 0.15rem;
	}
	.redPanel{
	    @include redPanel(1rem)
	}

</style>
