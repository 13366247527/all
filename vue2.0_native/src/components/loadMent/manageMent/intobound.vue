<template>
  <div class="common-page-flex">
  	<header-default :title="title"></header-default>
          <ul class="common-bottom-box" v-for="(item,index) in tempData" :key="index">
               <li class="common-bottom-title">
               	<span>单号：</span>
               	<span class="context">{{item.shopid}}</span>
               </li>
               <li class="common-bottom-title">
               	<span>车号：</span>
               	<span class="context">{{item.carid}}</span>
               </li>
               <li class="common-bottom-title">
               	<span>型号：</span>
               	<span class="context">{{item.typeid}}</span>
               </li>
               <li class="common-bottom-title">
               	<span>资产编号：</span>
               	<span class="context">{{item.moneyid}}</span>
               </li>
               <li class="common-bottom-title">
               	<span>货物来源：</span>
               	<span class="context">{{item.goodsource}}</span>
               </li>
               <li class="common-bottom-title">
               	<span>货物状态：</span>
               	<select-box class="wid110" :selectDataList='nameList'></select-box>
               </li>
               <li class="common-bottom-title">
               	<span>存放库区：</span>
               	<select-box class="wid110" :selectDataList='nameList'></select-box>
              </li>
               <li class="common-bottom-title">
               	<span>存放库位：</span>
               	<select-box class="wid110" :selectDataList='nameList'></select-box>
              </li>
               <li class="common-bottom-title">
               	<span>存放位置：</span>
               <select-box class="wid110" :selectDataList='nameList'></select-box>
              </li>
          </ul>
          <div class="foot">
          	<div class="out">
          	  <img src="@/assets/images/common/takePhoto.png" alt>
          	  <span>清洗记录拍照</span>
          	</div>
          	<div class="into">确认</div>
          </div>
     </div>
</template>

<script>
	import HeaderDefault from "@/components/common/HeaderDefault"
	import SelectBox from '@/components/common/SelectBox'
	export default{
		name:"intobound",
		data(){
			return {
				title:"冰箱入库",
				tempData:[
				   {
				   	 shopid:"0830424822",
				   	 carid:"冀A1122388",
				   	 typeid:"AB247",
				   	 moneyid:"HB12339",
				   	 goodsource:"海尔工厂",
				   	 state:"新货",
				   	 storequ:"A",
				   	 storeku:"1-1",
				   	 storeloction:1
				   }
				],
				nameList:[
					{
		                flex: 1,
		                values: ["1","2"],
		                textAlign: 'center',
		            }
				]
			}
		},
		methods:{
			
		},
		components:{
			HeaderDefault,
			SelectBox
		}
	}
</script>

<style lang="scss" scoped>
	 .common-page-flex{
	 	overflow: hidden;
	 }
    .common-bottom-box{
     	padding: 0rem 0.16rem;
     }
     .common-bottom-box  li{
     	font-size: 0.14rem;
     	padding: 0.15rem 0;
     	border-bottom: solid 1px #D9D9D9;
     } 
     .context{
     	  color: #E31D2B;
	 }
	 .common-bottom-title{
		 display: flex;
		 align-items: center;
	 }
    .wid110{
	    width: 1rem;
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
     .out img{
     	width: 12%;
     	vertical-align: middle;
     	margin-right: 0.04rem;
     }
     .into{
     	background: #E31D2B;
     }
     
</style>