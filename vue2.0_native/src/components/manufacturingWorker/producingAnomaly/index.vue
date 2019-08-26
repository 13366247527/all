<template>
      <div> 
      	<header-default :title="title"></header-default>
	      	<div  v-for="(item,index) in tempData" :key="index">
	      		<ul class="common-box">
	      		<li class="common-title">{{item.type}}</li>
	      		<li class="common-item">
	      			<div v-for="(v,i) in item.list" :key="i" class="common-img" @click="typeCode(index,i,v.typeCode)">
	      				<img :src="v.img" alt="" style="width: 0.9rem;height: 0.9rem;"/>
	      				<span>{{v.text}}</span>
	      			</div>
	      		</li>
	      	</ul>
	      	<BlankSpace v-show=" index!= tempData.length-1"></BlankSpace>
	      	</div>
	      	<!--开始时间弹框-->
		    <mt-datetime-picker
			    ref="picker"
			    type="time"
			    hourFormat="{value} 时"
			    minuteFormat="{value} 分"
			    v-model="pickerValue" 
			    @confirm="handleConfirm">
			  </mt-datetime-picker>
			  <!--结束时间弹框-->
		    <mt-datetime-picker
			    ref="picker1"
			    type="time"
			    hourFormat="{value} 时"
			    minuteFormat="{value} 分"
			    v-model="pickerValue1"
			    @confirm="handleConfirm1">
			  </mt-datetime-picker>
			<!--换产弹框-->
			<mt-popup v-model="popupVisible"  class="mint-popup1">
				<div>
					<div class="head" v-if="shopList.length > 0">换产</div>
					<div class="head" v-if="shopList.length == 0">换产</div>
		           <ul class="mint-popup-ul" v-if="shopList.length > 0" >
		           	   <li v-for="(item,index) in shopList" :key="index">
		           	   	<div @click="changeOrderSelectStatus(index)" >
			                    <template v-if="orderListsStatus==index">
			                        <img src="@/assets/images/common/checked.png" alt="">
			                    </template>
			                    <template v-else>
			                        <img src="@/assets/images/common/check.png" alt="">
			                    </template>
               			 </div>
               			 <div class="text">
               			 	{{item.info}}
               			 </div>
		           	   </li>
		           </ul>
				   <ul class="mint-popup-ul  nopopup" v-if="shopList.length == 0" >
		           	   <li>暂无换产计划</li>
		           </ul>
		           <div class="foot"  @click="checked()" v-if="shopList.length > 0">确定</div>
				   <div class="foot"  @click="nochecked()" v-if="shopList.length == 0">确定</div>
				</div>
            </mt-popup>
			  
      </div>
</template>

<script>
	import HeaderDefault from "@/components/common/HeaderDefault"
    import BlankSpace from "@/components/common/BlankSpace"
	import SelectBox from "@/components/common/SelectBox"
	import native from '@/native/bridge.js'
	export default{
		name:"producingAnomaly",
		data(){
			return {
				title:"生产员异常提示",
				indexarr:[0,1,2],
				pickerValue:"",//开始时间
				pickerValue1:"",//结束时间
				popupVisible:false,//换产弹框是否显示
				orderListsStatus:null,
				tempData:[
				   {  
				   	  type:"物流停机",
				   	  list:[
				   	  {
						  	 img:require('@/assets/images/producingAnomaly/堵线.png'),
							 text:"堵线",
							 typeCode:'01'
							   
						},
				   	    {						  	
						  	 img:require('@/assets/images/producingAnomaly/卡托盘.png'),
						  	 text:"卡托盘",
							 typeCode:'10'
						},
				   	    {						  	
						  	 img:require('@/assets/images/producingAnomaly/缺托盘.png'),
						  	 text:"缺托盘",
							 typeCode:'02'
						}
				   	  ]
				   },
				   {
				   	 type:"生产停机",
				   	  list:[
				   	  {
						  	 img:require('@/assets/images/producingAnomaly/设备故障.png'),
						  	 text:"设备故障",
							 typeCode:'07'
						},
				   	    {						  	
						  	 img:require('@/assets/images/producingAnomaly/换标签.png'),
						  	 text:"换标签",
							 typeCode:'08'
						},
				   	    {						  	
						  	 img:require('@/assets/images/producingAnomaly/缺辅料.png'),
						  	 text:"缺辅料",
							 typeCode:'11'
						}
				   	  ]
				   },
				   {
				   	 type:"生产通知",
				   	  list:[
				   	  {
						  	 img:require('@/assets/images/producingAnomaly/开机.png'),
						  	 text:"开机",
							 typeCode:'PN'
						},
				   	    {						  	
						  	 img:require('@/assets/images/producingAnomaly/换产.png'),
						  	 text:"换产",
							 typeCode:'12'
						},
				   	    {						  	
						  	 img:require('@/assets/images/producingAnomaly/停产.png'),
						  	 text:"停产",
							 typeCode:'PF'
						}
				   	  ]
				   }
				],
				shopList:[],
				id:'',//存在的异常id。当exist为false时，id=null
				exist:false,//异常id是否存在。true：存在；false：不存在
			}
		},
		mounted(){
			this.getData()
		},
		methods:{
			//九个图片点击事件
			typeCode(index,i,type){
				//console.log(index,i,type)
				//console.log(this.id)
				if(this.id){
					if(i==0 && index ==2){
					//开机
					 this.$refs.picker.open();
					 var date = new Date();
					 var h = date.getHours() < 10 ? "0" + date.getHours():date.getHours();
					 var f = date.getMinutes() < 10 ? "0" + date.getMinutes():date.getMinutes();
					 this.pickerValue = h+ ":"  + f
				    }else{
						this.$toast("存在未结束的异常,请开机结束！")
						native.callhandler("showVoice", "存在未结束的异常,请开机结束！");
					}
				}else{
					if(i==0 && index ==2){
					//开机
					 this.$refs.picker.open();
					 var date = new Date();
					 var h = date.getHours() < 10 ? "0" + date.getHours():date.getHours();
					 var f = date.getMinutes() < 10 ? "0" + date.getMinutes():date.getMinutes();
					 this.pickerValue = h+ ":"  + f

					}else if(i==2 && index ==2){
						//关机
						this.$refs.picker1.open();
						var date = new Date();
						var h = date.getHours() < 10 ? "0" + date.getHours():date.getHours();
						var f = date.getMinutes() < 10 ? "0" + date.getMinutes():date.getMinutes();
						this.pickerValue1 = h+ ":"  + f
					}else if(i==1 && index ==2){
						//换产
						this.popupVisible = true
						this.$http.post('wms/producer/anomaly/change/production/info',{}).then(res=>{
							 console.log(res)
							 if(res.data.ret_code == '0'){
								 this.shopList = res.data.data
							 }
						 })
					}else{
						let params = {
							typeCode:type,
					    }
					    //console.log(params)
						this.$http.post('wms/producer/anomaly/handle',params).then(res=>{
							console.log(res)
							if(res.data.ret_code == '38500'){
								this.$toast("存在未结束的异常,请开机结束！")
								native.callhandler("showVoice", "存在未结束的异常,请开机结束！");
							}else if(res.data.ret_code == '0'){
								//如果有id,点击生产之后需再掉获取id接口
								this.$http.post('wms/producer/anomaly/judge/exit',{}).then(res=>{
									console.log(res)
									if(res.data.ret_code == '0'){
										this.id = res.data.data.id
										this.exist = res.data.data.exist
									}
								})
							}
						})
					}
				}
			},
			//开始时间确认
			handleConfirm(){
				var myDate = new Date();
				var y = myDate.getFullYear();    //获取完整的年份
				var m = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
				var d = myDate.getDate();        //获取当前日(1-31)
				var time = y +'-'+m+'-'+d+' '+this.pickerValue
				var data = new Date(time).getTime()
				if(this.id){
					let params = {
						anomalyId:this.id,
						typeCode:'PN',
						time:data
					}
					 this.$http.post('wms/producer/anomaly/handle',params).then(res=>{
						 console.log(res)
						 if(res.data.ret_code == '0'){
								//如果有id,点击生产之后需再掉获取id接口
								this.$http.post('wms/producer/anomaly/judge/exit',{}).then(res=>{
								console.log(res)
								if(res.data.ret_code == '0'){
									this.id = res.data.data.id
									this.exist = res.data.data.exist
								}
				            })
						 }
					 })
				}else{
					let params = {
						typeCode:'PN',
						time:data
					}
					//console.log(params)
					 this.$http.post('wms/producer/anomaly/handle',params).then(res=>{
					 	console.log(res)
					 })
				}
			},
			//结束时间确认
			handleConfirm1(){
				var myDate = new Date();
				var y = myDate.getFullYear();    //获取完整的年份
				var m = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
				var d = myDate.getDate();        //获取当前日(1-31)
				var time = y +'-'+m+'-'+d+' '+this.pickerValue1
				var data = new Date(time).getTime()
				let params = {
					typeCode:'PF',
					time:data
				}
				//console.log(params)
				this.$http.post('wms/producer/anomaly/handle',params).then(res=>{
					  console.log(res)
					  if(res.data.ret_code == '0'){
								//如果有id,点击生产之后需再掉获取id接口
								this.$http.post('wms/producer/anomaly/judge/exit',{}).then(res=>{
								console.log(res)
								if(res.data.ret_code == '0'){
									this.id = res.data.data.id
									this.exist = res.data.data.exist
								}
				            })
						 }
				})
			},
			//单选
			changeOrderSelectStatus(index){
				this.orderListsStatus = index
			},
			//换产确定
			checked(){
				if(this.orderListsStatus){
					this.popupVisible = false
					let params = {
						typeCode:'12',
						planId:this.shopList[this.orderListsStatus].id
					}
					console.log(params)
					this.$http.post('wms/producer/anomaly/handle',params).then(res=>{
					   console.log(res)
					   if(res.data.ret_code == '0'){
								//如果有id,点击生产之后需再掉获取id接口
								this.$http.post('wms/producer/anomaly/judge/exit',{}).then(res=>{
								console.log(res)
								if(res.data.ret_code == '0'){
									this.id = res.data.data.id
									this.exist = res.data.data.exist
								}
				            })
						 }
					})	
				}					
			},
			//暂无换产确定
			nochecked(){
				this.popupVisible = false
			},
			//判断是否有未结束的异常工作，并返回相关信息
			getData(){
				this.$http.post('wms/producer/anomaly/judge/exit',{}).then(res=>{
					console.log(res)
					if(res.data.ret_code == '0'){
						this.id = res.data.data.id
						this.exist = res.data.data.exist
					}
				})
			}
		},
		components:{
			HeaderDefault,
			BlankSpace,
			SelectBox
		}
	}
</script>

<style lang="scss" scoped>
    .common-box{
    	 padding: 0rem 0.16rem;
    }
   .common-title{
   	 display: flex;
   	 justify-content: center;
   	 font-size: 0.16rem;
   	 font-weight: 600;
   	  padding: 0.15rem 0rem;
   }
   .common-item{
   	 display: flex;
   	 justify-content: space-between;
   	 padding: 0.15rem 0.1rem;
   	 border-top: solid 1px #ECECEC;
   }
   .common-img{
   	 text-align: center;
   	 position: relative;
   }
   .common-item span{
   	  display: block;
   	  font-size: 0.15rem;
   	  width: 100%;
   	  position: absolute;
   	  bottom: 0.05rem;
   	  left:50%;
   	  transform: translateX(-50%);
   	  color: #FFFFFF;
   }
  .mint-popup1{
   	width: 90%;
   	border-radius: 0.05rem 0.05rem 0.05rem 0.05rem;
   }
    .mint-popup1 .head,
    .mint-popup1 .foot{
    	width: 100%;
    	height: 0.39rem;
    	line-height: 0.39rem;
    	text-align: center;
    	background:#E31D2B ;
    	font-size: 0.16rem;
    	color: #FFFFFF;
    }
    .mint-popup1 .head{
    	border-radius: 0.05rem 0.05rem 0 0;
    }
    .mint-popup1 .foot{
    	border-radius: 0 0 0.05rem 0.05rem ;
    }
    .mint-popup1 li{
    	display: flex;
    	font-size: 0.16rem;
    	padding: 0.15rem  0.54rem;
    	border-bottom: solid 1px #ECECEC;
    }
	.mint-popup1 .nopopup  li{
		justify-content:center;
	}
    .mint-popup1 li:last-child{ 	
    	border-bottom: none;
    }
    .mint-popup1 .text{
      margin-left: 0.2rem;
    }
    .mint-popup1 img{
    	width: 0.16rem;
    	height: 0.16rem;
    }
</style>
<style >
	.picker .picker-toolbar span {
	    display: inline-block;
	    color: #ffffff;
	    height: 40px;
	    line-height: 40px;
	    padding: 0 0;
   }
</style>