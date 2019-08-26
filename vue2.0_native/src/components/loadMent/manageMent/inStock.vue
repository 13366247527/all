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
               	<span>名称：</span>
               	<span class="context">{{item.shopname}}</span>
               	<span class="spnum">数量：</span>
               	<span class="context">{{item.shopnum}}包</span>
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
          	  <span>入库拍照</span>
          	</div>
          	<div class="into">确认</div>
          </div>
     </div>
</template>

<script>
	import HeaderDefault from "@/components/common/HeaderDefault"
	import SelectBox from '@/components/common/SelectBox'
	export default{
		name:"inStock",
		data(){
			return {
				title:"市场物资入库",
			    tempData:[
				   {
				   	 shopid:"0830424822",
				   	 carid:"冀A162288",
				   	 shopname:"清风促销纸抽",
				   	 shopnum:1000,
				   	 storequ:"H",
				   	 storeku:"1-2",
				   	 storeloction:8
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
     .common-bottom-box .spnum{
     	margin-left: 0.7rem;
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