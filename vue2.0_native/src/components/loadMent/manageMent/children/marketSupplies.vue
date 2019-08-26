<template>
		<!--市场物资-->
      <div class="common-page-flex">
          <ul class="common-bottom-box" v-for="(item,index) in tempData" :key="index">
               <li class="common-bottom-title"><span>单号：</span>{{item.shopid}}</li>
               <li class="common-bottom-title"><span>车号：</span>{{item.carid}}</li>
               <li class="common-bottom-title">
               	<span>名称：</span>{{item.shopname}}
               	<span class="spnum">数量：</span>{{item.shopnum}}包
               </li>
               <li class="common-bottom-title"><span>存放位置：</span>{{item.locations}}</li>
               <li class="common-bottom-title">
               	<span>签收状态：</span>
               	<span v-if="item.state==0" class="ren">未签</span>
               	<span v-if="item.state==1" class="green">以签</span>
              </li>
          </ul>
          <div class="foot">
          	<div class="out" @click="outStock">出库管理</div>
          	<div class="into" @click="inStock">入库管理</div>
          </div>
     </div>
</template>
<script>
	export default{
		name:"marketSupplies",
		data(){
			return {
				tempData:[
				   {
				   	 shopid:"0830424868",
				   	 carid:"冀A11222888",
				   	 shopname:"清风促销纸抽",
				   	 shopnum:10,
				   	 locations:"H1-2-8",
				   	 state:0//0为未签，1为已签
				   }
				]
			}
		},
		methods:{
			//出库管理
			outStock(){

			},
			//入库管理
			inStock(){
				this.$router.push({
			        path: '/loadMent/manageMent/inStock',
			    })
			}
		},
	}
</script>

<style lang="scss" scoped>
    .common-bottom-box{
     	padding: 0rem 0.16rem;
     }
     .common-bottom-box  li{
     	font-size: 0.14rem;
     	padding: 0.15rem 0.09rem;
     	border-bottom: solid 1px #D9D9D9;
     } 
     .common-bottom-box .spnum{
     	margin-left: 0.7rem;
     }
     .ren{
     	color:#E31D2B
     }
     .green{
     	color:#14BA3B
     }
    .common-page-flex .foot{
     	display: flex;
     }
     .common-page-flex .foot div{
     	width: 50%;
     	text-align: center;
     	font-size: 0.17rem;
     	padding: 0.13rem 0rem;
     	color: #FFFFFF;
     	font-weight: 500;
     }
     .out{
     	background: #FF7F00;
     }
     .into{
     	background: #E31D2B;
     }
</style>