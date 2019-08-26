<template>
   <div>
        <header-default :title="title"></header-default>
        <ul class="common-content-box">
            <li v-for="(item, index) in tempData" :key="index" class="common-content-item">
                <div class="common-content-num">
                	<div @click="changeOrderSelectStatus(index)">
                   <template v-if="orderListsStatus==index">
                        <img src="@/assets/images/common/checked.png" alt="">
                    </template>
                    <template v-else>
                        <img src="@/assets/images/common/check.png" alt="">
                    </template>
                   </div>
                    <div><span>{{item}}</span>块</div>
                </div>  
            </li>
         </ul>
         <div class="foot" @click="brokenNumber">
         	确定
         </div>
   </div>
</template>

<script>
	import HeaderDefault from "@/components/common/HeaderDefault" 
	export default{
		name:"brokenNumber",
		data(){
			return {
				title:"破损数量",
				tempData:[1,2,3,4,5,6,7,8],
				orderListsStatus:null
			}
		},
		methods:{
			//单选
			changeOrderSelectStatus(index){
				this.orderListsStatus = index
			},
			brokenNumber(){
				this.$router.replace({
        		 path: "/loadMent/onlineJob/trayDamage",
        		 query:{brokenNumber:this.orderListsStatus+1}
        	   })
			}
		},
		components:{
			HeaderDefault
		}
	}
</script>

<style lang="scss" scoped>
   .common-content-box{
   	display: flex;
   	flex-wrap: wrap;
   }
	.common-content-box .common-content-item  {
		width: 50%;
	    display: flex;
		justify-content: center;
		font-weight: 500;
		padding: 0.3rem 0rem;
	}
	.common-content-item span{
		margin-left: 0.1rem;
	}
	.foot{
		text-align: center;
		height: 0.48rem;
		line-height: 0.48rem;
		width: 100%;
		background:#E31D2B ;
		color: white;
		font-size: 0.16rem;
		position: fixed;
		bottom: 0rem;
		left: 0rem;
	}
</style>