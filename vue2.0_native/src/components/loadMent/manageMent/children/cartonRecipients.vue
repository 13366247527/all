<template>
	<!--纸箱领用-->
       <div class="common-page-flex">
          <ul class="common-bottom-box" >
          	  <li class="common-bottom-title">
          	  	<div>品名规格</div>
          	  	<div>领用</div>
          	  	<div>存放库</div>
          	  	<div>拍照</div>
          	  </li>
               <li  v-for="(item,index) in tempData" :key="index" class="common-bottom-item">
               	   <div>{{item.artName}}</div>
               	   <div>{{item.number}}</div>
               	   <div>{{item.place}}</div>
               	   <div >
               	   	 <div class="img">
               	   	 	<img src="@/assets/images/common/takePhoto.png"/>
               	   	 </div>
               	   </div>
               </li>
          </ul>
          <div class="foot">
          	<div class="out" @click="collarUse">领用</div>
          	<div class="into" @click="deposit">存放</div>
          </div> 
     </div>
</template>

<script>
	export default{
		name:"cartonRecipients",
		data(){
			return {
				tempData:[
				   {
				   	  code: 0,
			          artName: "123456",
			          number: "30",
			          place:"1号库"
				   },
				   {
				   	 code: 1,
			          artName: "123456",
			          number: "30",
			          place:"2号库"
				   }
				]
			}
		},
		methods:{
			//领用
			collarUse(){

			},
			//存放
			deposit(){

			}
		},
		components:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.common-bottom-box{
     	padding: 0rem 0.16rem;	
     }
     .common-bottom-box  li{
     	display: flex;
     	justify-content: space-around;
     	align-items: center;
     	font-size: 0.14rem;
     	padding: 0.15rem 0;
     	border-bottom: solid 1px #D9D9D9;
     } 
     .common-bottom-box  li div{
     	width: 25%;
     	text-align: center;
     }
    .common-bottom-box li:nth-of-type(1){
     	font-size: 0.15rem;
     	font-weight: 600;
     }
     .common-bottom-box .img{
     	width: 0.6rem;
     	height: 0.31rem;
     	line-height: 0.31rem;
     	background:#F9F9F9 ;
     	border: solid 1px #DFDFDF;
     	border-radius: 0.05rem;
     	margin: auto;
     }
     .common-bottom-box  li img{
     	width: 30%;
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