<template>
	<!--违规记录-->
	   <div class="common-page-flex">
	   	<mt-loadmore :top-method="loadTop"  @top-status-change="handleTopChange" ref="loadmore" class="loadmoreCss"> 
	          <ul class="common-bottom-box criminalRecords">
	             <li class="box-select">
			            	<span>月份查询：</span>			            
			          	    <select-box1 class="wid156"  :selectDataList="equirymonthList"  @vehtypnams="fn" :value="value"></select-box1>    
	              </li>
	             <li class="common-content-title" v-show="tempData.length > 0">
	               <div>日</div>
	               <div>原因</div>
	               <div>扣分</div>
	               <div>照片</div>
	             </li>
	             <li v-for="(item,index) in tempData" :key="index">
	               <div>{{item.day}}</div>
	               <div>{{item.region}}</div>
	               <div class="num">{{item.cause}}</div>
	               <div><span class="photo" @click="photoDetail(item.picPath)">照片</span></div>
	             </li>
	          </ul>
	         </mt-loadmore>
	    </div>
</template>

<script>
	import SelectBox1 from "@/components/common/SelectBox1"
		import native from "@/native/bridge.js";
import { setTimeout } from 'timers';
	export default{
		name:"criminalRecords",
		data(){
			return {
				tempData:[],
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
				if(localStorage.getItem("key") == 5){
					this.data =  localStorage.getItem("dataTime")
					this.$loading.open();
					let data = new Date()
					let params = {
						dateMonth:this.data
					}
					this.$http.get('wms/site/inspection/getMonthViolation',params).then(res=>{
						console.log(res)
						this.$loading.close();
						if(res.data.ret_code == '0'){
							this.tempData = res.data.data
							   
						}
					})
				}else{
					this.$loading.open();
					let data = new Date()
					let y = data.getFullYear()
					let m = data.getMonth()+1
					this.value = y +'-'+m
					this.data =  y +'-'+m
					localStorage.setItem("dataTime",this.data);
					let params = {
						dateMonth:this.value
					}
					this.$http.get('wms/site/inspection/getMonthViolation',params).then(res=>{
						console.log(res)
						this.$loading.close();
						if(res.data.ret_code == '0'){
							this.tempData = res.data.data
						}
					})
				}
			},
			//获取后台数据
			fn(data){
				let ss = document.getElementsByClassName('mint-loadmore-content')
				if(ss){
					for (let i = 0; i < ss.length; i++) {
					ss[i].style.position='relative'
                    }
				 }
				document.getElementsByClassName('criminalRecords')[0].style.height='-webkit-fill-available'
				setTimeout(function(){
					document.getElementsByClassName('criminalRecords')[0].style.height=''
				},300)
				if(data != 1){
					localStorage.setItem("dataTime", data);
					this.data = data
					this.$loading.open();
					let params = {
						dateMonth:data
					}
					this.$http.get('wms/site/inspection/getMonthViolation',params).then(res=>{
						console.log(res)
						 this.$loading.close();
						if(res.data.ret_code == '0'){
							this.tempData = res.data.data
						}
					})
				}	
			},
			handleTopChange(status) {
        		this.topStatus = status;
    		},
    		dispatchList(flag) {
			    let params = {
					dateMonth:this.data
				}
				this.$http.get('wms/site/inspection/getMonthViolation',params).then(res=>{
					console.log(res)
					if(res.data.ret_code == '0'){
						this.tempData = res.data.data
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
			,
			photoDetail(img){
			  	console.log("img",img)
			   this.$router.push({
                path: '/loadMent/jobRecord/photoDetail',
                query:{img:img}
               })
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
		// height: -webkit-fill-available;
     }
     .common-bottom-box  li{
     	display: flex;
     	justify-content: space-around;
     	padding: 0.07rem 0rem;
     	align-items: center;
     	font-size: 0.14rem;
     	border-bottom: solid 1px #D9D9D9;
     } 
    .common-page-flex  .common-bottom-box .box-select{
      padding:0.10rem  0.09rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    
     .common-bottom-box  li div{
     	width: 25%;
     	text-align: center;
     }
      .common-bottom-box  li .wid156{
     	 width: 1rem;
     }
     .common-bottom-box  li:nth-of-type(1) div{ 
     	text-align: left;
     }
     .common-bottom-box .common-content-title{
     	 background: #F1F1F0;
    	 border: none;
    	 font-weight: 600;
    	 padding: 0.145rem 0rem;
     }
     .num{
     	color:#E31D2B ;
     }
     .photo{
     	width: 0.6rem;
     	height: 0.31rem;
     	line-height: 0.31rem;
     	text-align: center;
     	display: block;
     	border: solid 1px #E31D2B;
     	background: #FFECEC;
     	border-radius: 0.05rem;
     	color:#E31D2B ;
     	margin: auto;
     }
    
</style>