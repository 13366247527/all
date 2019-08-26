<template>
     <div class="common-page-flex">
          <ul class="common-bottom-box">
            <li class="box-select">
		            	<span>月份查询：</span>
		          	    <select-box1 class="wid156"  :selectDataList="equirymonthList" @vehtypnams="okFn" :value="value"></select-box1>
            </li>
            <li class="common-content-title">
               <div>日</div>
               <div>生产停机</div>
               <div>仓库停机</div>
             </li>
             <li v-for="(item,index) in tempData" :key="index" class="common-content-item">
               <div><span class="day">{{item.time | formatDate}}</span></div>
               <div>{{item.shTime | minuteDate}}</div>
               <div>{{item.ptTime | minuteDate}}</div>
             </li>
          </ul>
     </div>
</template>

<script>
	import SelectBox1 from "@/components/common/SelectBox1"
	export default{
		name:"monthly",
		components:{
			SelectBox1
		},
		data(){
			return {
				tempData:[],
				value:"",
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
			this.getDate()
		},
		methods:{	
			getDate(){
				this.$loading.open();
				let data = new Date()
				let y = data.getFullYear()
				let m = data.getMonth()+1
				this.value = y +'-'+m
				let params = {
					time:new Date(this.value).getTime(),
					type: 1 //1：日统计；2：月统计
				}
				this.$http.post('wms/producer/anomaly/record',params).then(res=>{
					console.log(res)
					this.$loading.close();
					if(res.data.ret_code == '0'){
						this.tempData = res.data.data
					}
				})
			},	
			//下拉确定事件
			okFn(data){
				let params = {
					time:new Date(data).getTime(),
					type: 1 //1：日统计；2：月统计
				}
				this.$loading.open();
				this.$http.post('wms/producer/anomaly/record',params).then(res=>{
					console.log(res)
					this.$loading.close();
					if(res.data.ret_code == '0'){
						this.tempData = res.data.data
					}
				})
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
					return   m +"分" ;     		
				}
			}
        }
	}
</script>

<style lang="scss" scoped>
	.common-bottom-box{
     	padding: 0rem 0.16rem;
		overflow-y: scroll;
     }
     .common-bottom-box  li{
     	display: flex;
     	font-size: 0.15rem;
     	padding: 0.15rem 0;
		align-items: center;
     } 
	 .common-bottom-box .box-select{
      padding:0.10rem  0.09rem;
      display: flex;
      align-items: center;
      justify-content: initial;
    }
     .common-bottom-box  li .wid156{
     	 width: 1rem;
     }
     .common-bottom-box  .box-select div{ 
     	text-align: left;
     }
     .common-content-title{
     	font-weight: 600;
     	justify-content: space-around;
     	background: #F1F1F0;
     }
     .common-bottom-box  .common-content-item{
     	justify-content: space-around;
     	border-bottom: solid 1px #D9D9D9;
     	align-items: center;
     	padding: 0.1rem 0;
     }
    .common-content-item .day{
    	display: block;
    	width: 0.5rem ;
    	height: 0.31rem;
    	border: solid 1px #E31D2B;
    	line-height: 0.34rem;
    	border-radius: 0.05rem;
    	background: #FFECEC;
    	margin: auto;
    }
    .common-bottom-box  li div{
     	width: 25%;
     	text-align: center;
     }
</style>