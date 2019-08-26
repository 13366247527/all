<template>
  <div class="common-page-flex">
	   <mt-loadmore :top-method="loadTop"  @top-status-change="handleTopChange" ref="loadmore" class="loadmoreCss" >
          <ul class="common-bottom-box outdaily">
          	<li class="box-select">
		            <span>日查询：</span>
		          	<select-box1 class="wid156"  :selectDataList="equirymonthList" @vehtypnams="okFn" :value="value"></select-box1>
            </li>
             <li class="common-content-title">
               <div>品名规格</div>
               <div>数量</div>
               <div>托数</div>
             </li>
             <li v-for="(item,index) in tempData" :key="index" class="common-content-item">
               <div >
                	<span class="img">
                		<img :src="item.artUrl" alt=""/>
                	</span>
                	<span class="text">{{item.artName}}</span>
                </div>
               <div>{{item.box}}</div>
               <div>{{item.tray}}</div>
             </li>
          </ul>
		  </mt-loadmore>
          <div class="common-content-total footer">
		   	  	<span class="total">合计</span>
		   	  	<div class="torr">托数：<span>{{torrnum}}</span>托</div>
		   	  	<div>箱数：<span>{{boxnum}}</span>箱</div>
		   	  </div>
     </div>
</template>

<script>	
	import SelectBox1 from "@/components/common/SelectBox1"
	import native from "@/native/bridge.js";
	export default{
		name:"outdaily",
		data(){
			return {
				tempData:[],
				torrnum:0,//托数
				boxnum:0,//箱数
				value:'',
				dataTime:"",//下拉时间
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
	                    values: ["1","2","3","4","5","6","7",'8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','18','29','30','31'],
					    defaultIndex:0,
					    textAlign: 'center',
	                    className: 'slot3',
	                    content:""
                   }
			   ]
			}
		},
		mounted(){
			    let data = new Date()
				let y =parseInt(data.getFullYear())
				let m = parseInt(data.getMonth()+1)
				let r = parseInt(data.getDate())
				if(y >= 2019){
					this.equirymonthList[0].defaultIndex = 7 +(y-2019)
				}
				this.equirymonthList[2].defaultIndex = m - 1
				this.equirymonthList[4].defaultIndex = r - 1
			   this.getDate()
		},
		methods:{	
			getDate(){
				this.$loading.open();
				let data = new Date()
				let y = data.getFullYear()
				let m = data.getMonth()+1
				let r = data.getDate()
				this.value = y +'-'+ m +'-'+r
				this.dataTime = y +'-'+ m +'-'+r
				let params = {
					time:new Date(this.value).getTime(),
					type: 1 //1：日统计；2：月统计
				}
				this.$http.post('wms/producer/anomaly/output/statistics',params).then(res=>{
					console.log(res)
					this.$loading.close();
					if(res.data.ret_code == '0'){
						this.tempData = res.data.data.list
						this.torrnum =  res.data.data.totalTray
						this.boxnum = res.data.data.totalBox
					}
				})
			},
			//确定事件
			okFn(data){
				console.log(data)
				let ss = document.getElementsByClassName('mint-loadmore-content')
				console.log(ss)
				 if(ss){
				 	for (let i = 0; i < ss.length; i++) {
				 	  ss[i].style.position='relative'
                    }
				 }
				document.getElementsByClassName('outdaily')[0].style.height='-webkit-fill-available'
				setTimeout(function(){
					document.getElementsByClassName('outdaily')[0].style.height=''
				},300)
				if(data != 1){
					this.$loading.open();
					this.dataTime = data
					let params = {
						time:new Date(data).getTime(),
						type: 1 //1：日统计；2：月统计
					}
				//console.log(params)
					this.$http.post('wms/producer/anomaly/output/statistics',params).then(res=>{
						console.log(res)
						this.$loading.close();
						if(res.data.ret_code == '0'){
							this.tempData = res.data.data.list
							this.torrnum =  res.data.data.totalTray
							this.boxnum = res.data.data.totalBox
						}
					})
				}
				
			},
			handleTopChange(status) {
        		this.topStatus = status;
    		},
    		dispatchList(flag) {
			    this.$loading.open();
				let params = {
					time:new Date(this.dataTime).getTime(),
					type: 1 //1：日统计；2：月统计
				}
				//console.log(params)
					this.$http.post('wms/producer/anomaly/output/statistics',params).then(res=>{
						console.log(res)
						this.$loading.close();
						if(res.data.ret_code == '0'){
							this.tempData = res.data.data.list
							this.torrnum =  res.data.data.totalTray
							this.boxnum = res.data.data.totalBox
							if (flag == 1) {
						 			 this.$toast("刷新成功");
						  			 native.callhandler("showVoice", "刷新成功");
			            			  this.$refs.loadmore.onTopLoaded();
			      			}
						}
					})
   			 },
			loadTop() {
     		 //传1说明是下拉刷新
      		   this.dispatchList(1);
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
		font-size: 0.15rem;
		overflow-y: scroll;
     }
     .common-bottom-box  li{
     	display: flex;
     	justify-content: space-around;
		align-items: center;
     	padding: 0.15rem 0;
     	border-bottom: solid 1px #D9D9D9;
     } 
	 .common-bottom-box .box-select{
      padding:0.10rem  0.09rem;
      display: flex;
      align-items: center;
      justify-content: initial;
    }
     .common-bottom-box  li .wid156{
     	 width: 1.2rem;
     }
     .common-bottom-box  .box-select div{ 
     	text-align: left;
     }
     .common-content-title{
     	font-weight: 600;
     	font-size: 0.15rem;
     }
     .common-bottom-box  li div{
     	width: 33%;
     	text-align: center;
     }
     .common-bottom-box .common-content-item{
     	font-size: 0.14rem;
     }
	.common-content-item div:nth-of-type(1){
    	display: flex;
		flex-wrap: wrap;
		justify-content: center;
    }
    .img{
    	display: block;
    	width:0.8rem;
		height:0.45rem;
		background:rgba(224,224,224,1);
		line-height: 0.42rem;
    }
    .img img{
    	width:0.55rem;
		height:0.35rem;
    }
    .common-content-box  .text{
    	font-size: 0.12rem;
    	padding-top:0.02rem;
    	width:100%;
     	display: inline-block;
     	word-break: break-all;
    }
      .common-content-total{
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
      	display: flex;
      	padding: 0.10rem 0.3rem;
      	font-size: 0.14rem;
      	justify-content:flex-start;
		background: white;
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
</style>