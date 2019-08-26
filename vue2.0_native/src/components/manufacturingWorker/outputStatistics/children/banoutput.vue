<template>
   <div class="common-page-flex">
   	  <ul class="common-bottom-box">
            <li class="common-content-select" >
            	<span class="text">物品</span>
                <select-box1 class="wid156" :selectDataList="selectlist" @vehtypnams="fn" :value="value"></select-box1> 
            </li>	    
   	        <li class="common-content-title" v-show="this.tempData.length > 0">
   	            <div>库位</div>
   	            <div>托数</div>
   	            <div>库位</div>
   	            <div>托数</div>
   	        </li>
   	        <li class="aaaa">
   	        	<div v-for="(item,index) in tempData" :key="index" class="common-content-item">
					<div>{{item.binnum}}</div>
					<div>{{item.number}}</div>
   	        	</div>
   	        </li>
   	        <li class="common-content-title" v-show="this.tempData1.length > 0">
   	            <div>库位</div>
   	            <div>托数</div>
   	            <div>层数</div>
   	            <div>箱数</div>
   	        </li>
   	        <li>
   	        	<div v-for="(item,index) in tempData1" :key="index" class="common-content-item1">
   	        		<div>{{item.binnum}}</div>
   	        		<div>{{item.pallet}}</div>
   	        		<div>{{item.layer}}</div>
   	        		<div>{{item.box}}</div>
   	        	</div>
   	        </li>
		   	<li class="common-content-total allnum">
		   	  	<span class="total">合计</span>
		   	  	<div class="torr">托数：<span>{{torrnum}}</span>托</div>
		   	  	<div>箱数：<span>{{boxnum}}</span>箱</div>
		   	</li>
   	  </ul>
   	  <div class="foot" @click="confirm">
   	  	 <span class="confirm"  >交班确认</span>
   	  </div>
   </div>
</template>

<script>
	import SelectBox1 from "@/components/common/SelectBox1"
	export default{
		components: {SelectBox1},
		name:"banoutout",
		inject:['reload'],//页面刷新
		data(){
			return {
				tempData:[],//库托集合
				tempData1:[],//托层箱集合
				torrnum:0,
				boxnum:0,
				getDataArr:[],//后台获取数据
				artnum:'',//货物编号
				selectlist:[],//下拉列表
				ids:"",//后台需要的所有id
				value:""//下拉框
			}
		},
		created(){
            this.getData()
		},
		methods:{
			// 获取下拉框的值
			fn(value){
				this.$loading.open();
				  for (let i = 0; i < this.getDataArr.length; i++) {
					 if(this.getDataArr[i].artnam.indexOf(value) != -1){
						 this.artnum = this.getDataArr[i].artnum
					 }					  
				  }
				  let params = {artnum:this.artnum}
				  this.$http.get('wms/yield/management/getYieldBin',params).then(res=>{
					  console.log(res) 
					  this.$loading.close();
					  if(res.data.ret_code == 0){
						   this.tempData =[]
						   this.tempData1 =[]
						//库托集合
						if(res.data.data.binNumberResultList.length > 0){
							for (let i = 0; i < res.data.data.binNumberResultList.length; i++) {
							this.tempData.push(res.data.data.binNumberResultList[i])
							this.ids += res.data.data.binNumberResultList[i].id+","	
						   }
						}
						//托层箱集合
						if(res.data.data.BinNumberDetailedResultList.length > 0 ){
							for (let i = 0; i < res.data.data.BinNumberDetailedResultList.length; i++) {
							this.tempData1.push(res.data.data.BinNumberDetailedResultList[i])
							this.ids += res.data.data.BinNumberDetailedResultList[i].id+","	
						   }
						}
						this.torrnum=res.data.data.countPalletNumber
						this.boxnum=res.data.data.countNumber
					  }
				  }).catch(err=>{
				      console.log(err)
			     })
			},
			// 产量确认-查询物品
			getData(){
				this.$loading.open();
               this.$http.get('wms/yield/management/getYieldArt',{}).then(res=>{
				 console.log(res)
				 this.$loading.close();
				 if (res.data.ret_code == 0) {
					this.getDataArr = res.data.data 
					let obj =  {
		                flex: 1,
		                values: [],
		                textAlign: 'center',
					}
					let arr = []
					for(let i = 0;i<res.data.data.length;i++){
		                arr.push(res.data.data[i].artnam)               	
					}
					 obj.values = arr
					 this.selectlist = [obj] 
					 //下拉框默认为第一项，并调接口
					 this.value = res.data.data[0].artnam
					  for (let i = 0; i < this.getDataArr.length; i++) {
							if(this.getDataArr[i].artnam.indexOf(this.value) != -1){
								this.artnum = this.getDataArr[i].artnum
							}					  
				     }				
							let params = {artnum:this.artnum}
							this.$http.get('wms/yield/management/getYieldBin',params).then(res=>{
								console.log(res) 
								if(res.data.ret_code == 0){
									 this.tempData =[]
						             this.tempData1 =[]
									//库托集合
									if(res.data.data.binNumberResultList.length > 0){
										for (let i = 0; i < res.data.data.binNumberResultList.length; i++) {
										this.tempData.push(res.data.data.binNumberResultList[i])
										this.ids += res.data.data.binNumberResultList[i].id+","	
									}
									}
									//托层箱集合
									if(res.data.data.BinNumberDetailedResultList.length > 0 ){
										for (let i = 0; i < res.data.data.BinNumberDetailedResultList.length; i++) {
										this.tempData1.push(res.data.data.BinNumberDetailedResultList[i])
										this.ids += res.data.data.BinNumberDetailedResultList[i].id+","	
									}
									}
									this.torrnum=res.data.data.countPalletNumber
									this.boxnum=res.data.data.countNumber
								}
							}).catch(err=>{
								console.log(err)
							})
							}
						}).catch(err=>{
							console.log(err)
						})
			        },
			//交班确认
			confirm(){
				let params = {ids:this.ids.substring(0,this.ids.length-1)}
				this.$http.get('wms/yield/management/saveBinYield',params).then(res=>{
				 console.log(res)
				 if (res.data.ret_code == 0) {
                    this.reload()//页面刷新
				 }
			   }).catch(err=>{
				console.log(err)
			   })	
			}
		}
	}
</script>

<style lang="scss" scoped>
       .common-bottom-box{
     	padding: 0.05rem 0.16rem;
     	padding-bottom: 0rem;
     	overflow-y: scroll;
     	margin-bottom: 0.96rem;
     }
      .common-bottom-box li{
      	font-size: 0.14rem;
		align-items: center;
      }
      .common-bottom-box .common-content-select{
      	display: flex;
      	justify-content: space-between;
      	align-items: center;
      	padding: 0.05rem 0;
      }
      .common-content-select .text{
      	  font-size: 0.16rem;
      	  font-weight: 600;
      }
      .wid156{
      	width: 3rem;
      }
     .common-bottom-box  .common-content-title{
	    padding: 0.13rem 0;
     	display: flex;
     	justify-content: space-around;
     	font-size: 0.15rem;
     	margin-top: 0.05rem;
     	font-weight: 600;
        background:rgba(241,241,240,1);
     } 
     .common-bottom-box  .aaaa{
     	display: flex;
     	flex-wrap: wrap;
     	padding: 0 0;
		border-bottom: solid 1px #ECECEC;
     }
     .common-content-item{
     	display: flex;
     	justify-content: space-around;
     	width: 50%;
     	border-bottom: solid 1px #ECECEC;
     	color: #333333;
     	// font-family:PingFangSC-Regular;
     }
	 .common-content-item:nth-of-type(2){
		padding: 0.01rem 0;
	 }
	 .common-content-item:nth-last-child(1){
		border-bottom: none;
	 }
     .common-content-item div{
     	text-align: center;
     	padding: 0.13rem 0rem;
     }
     .common-content-item1{
     	display: flex;
     	justify-content: space-around;
     	color: #333333;
		border-bottom: solid 1px #ECECEC;
     }
     .common-content-item1 div{
     	width: 25%;
     	text-align: center;
		padding: 0.13rem 0rem;
     }
       .common-bottom-box .common-content-total{
      	display: flex;
      	padding: 0.10rem 0rem;
      	font-size: 0.14rem;
      }
      .common-content-total span{
      	color:#E31D2B ;
      	padding: 0rem 0.05rem;
      }
      .common-content-total .total{
      	margin-right:0.26rem ;
      }
      .common-content-total .torr{
      	margin-right:0.48rem ;
      }
	  .allnum{
		position: fixed;
      	bottom: 0.48rem;
		left: 0.2rem;
		background: #FFFFFF;
	  }
      .foot{
      	height:0.48rem;
      	background:#E31D2B ;
      	text-align: center;
      	line-height: 0.48rem;
      	color: #FFFFFF;
      	font-size: 0.15rem;
      	width: 100%;
      	position: fixed;
      	bottom: 0rem;
      	left: -0.01rem;
      	right: 0rem;
      	overflow: hidden;
      }
	  .picker .picker-toolbar .sure {
          right: 0.2rem;
      }
</style>