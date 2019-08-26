<template>
   <!--破损记录-->
   <div class="common-page-flex">
   	<mt-loadmore :top-method="loadTop"  @top-status-change="handleTopChange" ref="loadmore" class="loadmoreCss"> 
          <ul class="common-bottom-box brokenRecord">
             <li class="box-select">
		            	<span>月份查询：</span>		            	
		          	    <select-box1 class="wid156"  :selectDataList="equirymonthList" @vehtypnams="getData" :value="monthQuery"></select-box1> 
              </li>
             <li class="common-content-title" v-show="tempData.length > 0">
               <div>日</div>
               <div>瓶数</div>
               <div>包装数</div>
             </li>
			  <li v-for="(item,index) in tempData" :key="index">
               <div><span class="day" @click="dayShow(index)">{{item.day | formatDate}}</span></div>
               <div>{{item.bottleNum}}</div>
               <div>{{item.packageNum}}</div>
             </li>
          </ul>
        </mt-loadmore>
          <div class="box-foot footer" >
          	 <div class="text" @click="damagedDetail()" v-show="isShow">当月破损明细</div>
          </div>
     </div>
</template>

<script>
	import SelectBox1 from "@/components/common/SelectBox1"
	import native from "@/native/bridge.js";
	export default{
		name:"brokenRecord",
		data(){
			return {
				tempData:[],//后台数据
				monthQuery:'',//日期
				isShow:false,//是否显示
				 equirymonthList:[
				     {
				     	flex: 1,
	                    values: ['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035'],
						defaultIndex:0,
						textAlign: 'center',
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
						defaultIndex:0,
	                    textAlign: 'center',
	                    className: 'slot3',
	                    content:""
                   }
			   ],
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
			    this.getData1()
		},
		methods:{
			handleTopChange(status) {
				this.topStatus = status;
    		},
    		dispatchList(flag) {
				let params = {
						time:new Date(this.monthQuery).getTime(),
				}
				this.$http.post('wms/damage/record/list',params).then(res=>{
						console.log(res)
						if(res.data.ret_code == '0'){
							this.tempData = res.data.data
							this.isShow = true
							 if (flag == 1) {
								this.$toast("刷新成功");
								native.callhandler("showVoice", "刷新成功");
								this.$refs.loadmore.onTopLoaded();

			                }
						}else{
							this.tempData = ""
							this.isShow = false
							this.$toast("未找到物品组！")
							native.callhandler("showVoice", "未找到物品组！");	
						}
					}).catch(err => {
			          console.log(err);
			        });    
   			 },
			loadTop() {
     		 //传1说明是下拉刷新
      		   this.dispatchList(1);
			},
		    //获取后台数据
			getData(n){ 
				console.log(n)
				let ss = document.getElementsByClassName('mint-loadmore-content')
				if(ss){
					for (let i = 0; i < ss.length; i++) {
					ss[i].style.position='relative'
                    }
				 }
				 document.getElementsByClassName('brokenRecord')[0].style.height='-webkit-fill-available'
				setTimeout(function(){
					document.getElementsByClassName('brokenRecord')[0].style.height=''
				},300)
				if(n != 1){
					localStorage.setItem("monthQuery", n);
					this.monthQuery = n
					let params = {
						time:new Date(this.monthQuery).getTime(),
					}
					this.$loading.open();
					this.$http.post('wms/damage/record/list',params).then(res=>{
						console.log(res)
						 this.$loading.close();
						if(res.data.ret_code == '0'){
							this.tempData = res.data.data
							console.log(res.data.data.length)
							if(res.data.data.length > 0){
								this.isShow = true
							}else{
								this.isShow = false
							}
						}else{
							this.tempData = ""
							this.isShow = false
							this.$toast("未找到物品组！")
							native.callhandler("showVoice", "未找到物品组！",data => {});	
						}
					})
				}
			},
			getData1(){
				if(localStorage.getItem("key") == 4){
					this.monthQuery =  localStorage.getItem("monthQuery")
				  if(this.monthQuery != ""){
					  let params = {
						time:new Date(this.monthQuery).getTime(), 
					}
					 this.$loading.open();
					this.$http.post('wms/damage/record/list',params).then(res=>{
						console.log(res)
						 this.$loading.close();
						if(res.data.ret_code == '0'){
							this.tempData = res.data.data
							localStorage.removeItem('key')
							if(res.data.data.length > 0){
								this.isShow = true
							}
						}
					})
				  }
				}else{
					let data = new Date()
					let y = data.getFullYear()
					let m = data.getMonth()+1
					this.monthQuery = y +'-'+m
					localStorage.setItem("monthQuery",this.monthQuery);
					let params = {
						time:new Date(this.monthQuery).getTime(),
					}
					 this.$loading.open();
					this.$http.post('wms/damage/record/list',params).then(res=>{
						console.log(res)
						 this.$loading.close();
						if(res.data.ret_code == '0'){
							this.tempData = res.data.data
							if(res.data.data.length > 0){
								this.isShow = true
							}
						}
					})
				}	 
			},
			//当日破损明细
			dayShow(index){
			  this.$router.push({
				  path: '/loadMent/jobRecord/damagedDetail',
				  query:{
					  monthQuery:this.tempData[index].ids,
					  type:1  //1代表日
				   }
              })
			},
			//当月破损明细
			damagedDetail(){
			 if(this.monthQuery){
				this.$router.push({
			      path: '/loadMent/jobRecord/damagedDetail',
			      query:{
					   monthQuery:this.monthQuery,
					   type:2 //2代表月
					  }
                 })
			   }else{
				   this.$toast("请先选择月份！")
			   }
			}
		},
		components:{
			SelectBox1
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
			}
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
		overflow: hidden;
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
    .common-page-flex .common-bottom-box .box-select{
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
     .day{
     	width: 0.5rem;
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
     .box-foot{
     	position: absolute;
     	bottom: 0rem;
     	left: 0rem;
     	width: 100%;
     	text-align: center;
		z-index: 1;
     }
     .box-foot .text{
     	background:#E31D2B ;
     	color: #FFFFFF;
     	font-size: 0.2rem;
     	height: 0.48rem;
     	line-height: 0.48rem;
     }
    
</style>
