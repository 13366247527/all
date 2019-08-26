<template>
  <div class="common-page-flex">
          <ul class="common-bottom-box" v-for="(item,index) in tempData" :key="index">
               <li class="common-bottom-title"><span>单号：</span>{{item.shopid}}</li>
               <li class="common-bottom-title"><span>车号：</span>{{item.carid}}</li>
               <li class="common-bottom-title"><span>型号：</span>{{item.typeid}}</li>
               <li class="common-bottom-title"><span>资产编号：</span>{{item.moneyid}}</li>
               <li class="common-bottom-title"><span>客户名称：</span>{{item.name}}</li>
               <li class="common-bottom-title"><span>位置：</span>{{item.locations}}</li>
               <li class="common-bottom-title">
               	<span>签收状态：</span>
               	<span v-if="item.state==0" class="ren">未签</span>
               	<span v-if="item.state==1" class="green">以签</span>
              </li>
          </ul>
          <div class="foot">
          	<div class="out" @click="outgoingManagement">出库管理</div>
          	<div class="into" @click="stockManagement">入库管理</div>
          </div>
     </div>
</template>

<script>
	export default{
		name:"outbound",
		data(){
			return {
				tempData:[
				   {
				   	 shopid:"0830424821",
				   	 carid:"冀A1122358",
				   	 typeid:"AB247",
				   	 moneyid:"HB123456",
				   	 name:"阿里批发部",
				   	 locations:"A1-1-11",
				   	 state:0//0为未签，1为已签
				   }
				]
			}
		},
		methods:{
			//出库管理
			outgoingManagement(){

			},
			//入库管理
			stockManagement(){
				this.$router.push({
			        path: '/loadMent/manageMent/intobound',
			  })
			}
		}
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
     .ren{
     	color:#E31D2B
     }
     .green{
     	color:#14BA3B
     }
     .common-page-flex .foot{
     	display: flex;
     	position: fixed;
     	bottom: 0rem;
     	left: 0rem;
     	width: 100%;
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