<template>
	<!--//工作统计-->
		<div class="common-page-flex" >
		     <mt-loadmore :top-method="loadTop"  @top-status-change="handleTopChange" ref="loadmore" class="loadmoreCss">  
		         <ul class="common-bottom-box  wookStatistics">
		          	<li class="box-select">
		            	<span>月份查询：</span>
		          	    <select-box1 class="wid156"  :selectDataList="equirymonthList" @vehtypnams="fn" :value="value"></select-box1>
                    </li>
		             <li class="common-content-title  tab" v-show="tempData.length > 0">
		               <div>模式</div>
		               <div>重量</div>
		               <div>作业</div>
		               <div>休息</div>
		             </li>
		            
		             <li v-for="(item,index) in tempData" :key="index">
		               <div>{{item.pattern}}</div>
		               <div>{{item.weight}}</div>
		               <div>{{item.workTime | minuteDate}}</div>
		               <div>{{item.restTime | minuteDate}}</div>
		             </li>

		            <ul class="box-title" >
		          	<li class="common-content-title tab" v-show="tempData1.length > 0">
		               <div>日</div>
		               <div>类别</div>
		               <div>重量</div>
		               <div>作业</div>
		               <div>休息</div>
		             </li>
		             <li v-for="(v,i) in tempData1" :key="i">
		               <div>{{v.day | formatDate}}</div>
		               <div>{{v.type}}</div>
		               <div>{{v.weight}}</div>
		               <div>{{v.workTime | minuteDate}}</div>
		               <div>{{v.restTime | minuteDate}}</div>
		             </li>
		            </ul>
		          </ul>
		         </mt-loadmore>
		     </div>
</template>

<script>
	import SelectBox1 from "@/components/common/SelectBox1"
		import native from "@/native/bridge.js";
import { setTimeout } from 'timers';
	export default{
		name:"wookStatistics",
		data(){
			return {
				tempData:[],
				tempData1:[],
				value:"",
 				equirymonthList:[
				     {
				     	flex: 1,
	                     values: ['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035'],
						textAlign: 'center',
						defaultIndex:0,
	                    className: 'slot1',
	                    content:""
				    },
				     {
				          flex: 1,
				          values: ['-'],
				          className: 'slot2',
				          textAlign: 'center',
				          content:""
			        },
	                {
	                    flex: 1,
	                    values: ['1','2','3','4','5','6','7','8','9','10','11','12'],
						textAlign: 'center',
						defaultIndex:0,
	                    className: 'slot3',
	                    content:""
                   }
			   ],
			   data:''//下拉时间
			}
		},
		mounted(){
			let data = new Date()
				let y =parseInt(data.getFullYear())
				let m = parseInt(data.getMonth()+1)
				if(y >= 2019){
					this.equirymonthList[0].defaultIndex = 7 +(y-2019)
				}
				this.equirymonthList[2].defaultIndex = m - 1
			 this.getData()
		},
		methods:{
			getData(){
				 this.$loading.open();
				let data = new Date()
				let y = data.getFullYear()
				let m = data.getMonth()+1
				this.value = y +'-'+m
				this.data = y +'-'+m
				let params = {
					time:new Date(this.value).getTime(),
				}
				this.$http.post('wms/work/record/statistics/list',params).then(res=>{
					console.log(res)
					 this.$loading.close();
					if(res.data.ret_code == '0'){
						this.tempData = res.data.data.monthInfos
						this.tempData1 = res.data.data.dayInfos
					}
				})
			},	
			//获取后台数据
			fn(data){
				let ss = document.getElementsByClassName('mint-loadmore-content')
				
				if(ss){
					for (let i = 0; i < ss.length; i++) {
					ss[i].style.position='relative'
                    }
				 }
				 document.getElementsByClassName('wookStatistics')[0].style.height='-webkit-fill-available'
				setTimeout(function(){
					document.getElementsByClassName('wookStatistics')[0].style.height=''
				},300)
				if(data != 1){
					this.data = data
					this.$loading.open();
					let params = {
						time:new Date(data).getTime(),
					}
					this.$http.post('wms/work/record/statistics/list',params).then(res=>{
						console.log(res)
						this.$loading.close();
						if(res.data.ret_code == '0'){
							this.tempData = res.data.data.monthInfos
							this.tempData1 = res.data.data.dayInfos
						}
					})
				}
			},
			handleTopChange(status) {
        		this.topStatus = status;
    		},
    		dispatchList(flag) {
			    let params = {
					time:new Date(this.data).getTime(),
				}
				this.$http.post('wms/work/record/statistics/list',params).then(res=>{
					console.log(res)
					if(res.data.ret_code == '0'){
						this.tempData = res.data.data.monthInfos
						this.tempData1 = res.data.data.dayInfos
						 if (flag == 1) {
							this.$toast("刷新成功");
							 native.callhandler("showVoice", "刷新成功");
							this.$refs.loadmore.onTopLoaded();
			             }
					}
				}).catch(res => {
			          console.log(res);
			  });    
   			 },
			loadTop() {
     		 //传1说明是下拉刷新
      		   this.dispatchList(1);
    		}
		},
		filters: {
			//转换日
			formatDate: function (value) {
				if(value){
					let a =  parseInt(value)
					let date = new Date(a);
					var d = date.getDate(); 
					return d 		
				}
			},
			//毫秒转分钟
			minuteDate: function (value) {
				if(value){
					var m = (value/60/1000).toFixed(1)
					return   m  ;     		
				}
			}
        },
		components:{
			SelectBox1
		}
	}
</script>

<style lang="scss" scoped> 
	.loadmoreCss {
	position: absolute;
	top: 0rem;
	bottom: 0.05rem;
	right: 0;
	left: 0;
	}
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
    .common-page-flex .common-bottom-box .box-select{
      padding:0.10rem  0.09rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
     .common-bottom-box  li .wid156{
     	 width: 1rem;
     }
     .common-bottom-box  .box-select div{ 
     	text-align: left;
     }
    .common-bottom-box .tab{
    	background: #F1F1F0;
    	border: none;
    	 font-weight: 600;
    }
    .box-title{
    	margin-top: 0.05rem;
    }
    .common-page-flex ul:nth-of-type(2) div{
    	width: 20%;
     	text-align: center;
    }
</style>