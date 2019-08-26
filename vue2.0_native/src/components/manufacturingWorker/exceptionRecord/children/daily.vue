<template>
     <div class="common-page-flex">
          <ul class="common-bottom-box">
             <li class="common-content-title">
               <div>原因</div>
               <div>开始</div>
               <div>结束</div>
               <div>用时</div>
             </li>
             <li v-for="(item,index) in tempData" :key="index">
               <div>{{item.reason}}</div>
               <div>{{item.startTime | formatDate}}</div>
               <div>{{item.endTime | formatDate}}</div>
               <div>{{item.consumeTime | minuteDate}}</div>
             </li>
          </ul>
     </div>
</template>

<script>
	export default{
		name:"daily",
		data(){
			return {
				tempData:[]
			}
		},
		mounted(){
			this.getData()
		},
		methods:{
			//获取后台数据
			getData(){
				this.$loading.open();
				this.$http.post('wms/producer/anomaly/record/day',{}).then(res=>{
					this.$loading.close();
				   if(res.data.ret_code == '0'){
					   this.tempData = res.data.data
					}
				})
			}
		},
		filters: {
			//转换时分
			formatDate: function (value) {
				if(value){
					let date = new Date(value);
					let h = date.getHours();
					h = h < 10 ? ('0' + h) : h;
					let m = date.getMinutes();
					m = m < 10 ? ('0' + m) : m;
					return  h + ':' + m ;     		
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
     	justify-content: space-around;
		align-items: center;
     	font-size: 0.14rem;
     	padding: 0.15rem 0;
     	border-bottom: solid 1px #D9D9D9;
     } 
     .common-content-title{
     	font-weight: 600;
     }
     .common-bottom-box  li div{
     	width: 25%;
     	text-align: center;
     }
</style>